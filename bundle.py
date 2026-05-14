"""Bundle the site into a single self-contained HTML file.

Inlines styles.css and every <script src="..."></script> into one HTML page
that runs offline from `file://` with no external dependencies. Output:
`dist/praxis.html`.

Run:  python bundle.py
"""
import re
import sys
from pathlib import Path


def inline_html(src_dir: Path, html_path: Path) -> str:
    html = html_path.read_text(encoding="utf-8")

    # Inline <link rel="stylesheet" href="X.css">  -> <style>...</style>
    def link_repl(m):
        href = m.group(1)
        path = src_dir / href
        if not path.exists():
            return m.group(0)  # leave external links alone
        css = path.read_text(encoding="utf-8")
        return f"<style>\n{css}\n</style>"

    html = re.sub(
        r'<link\s+[^>]*rel=["\']stylesheet["\'][^>]*href=["\']([^"\']+)["\'][^>]*/?>',
        link_repl,
        html,
        flags=re.IGNORECASE,
    )

    # Inline <script src="X.js"></script>  -> <script>...</script>
    def script_repl(m):
        src = m.group(1)
        path = src_dir / src
        if not path.exists():
            return m.group(0)  # leave external scripts alone
        js = path.read_text(encoding="utf-8")
        # Defensive: any literal "</script>" inside a JS string would close
        # our inlined <script> tag. Escape it to "<\/script>".
        js = js.replace("</script>", "<\\/script>")
        return f"<script>\n{js}\n</script>"

    html = re.sub(
        r'<script\s+src=["\']([^"\']+)["\'][^>]*></script>',
        script_repl,
        html,
        flags=re.IGNORECASE,
    )

    return html


def main():
    here = Path(__file__).parent
    out_dir = here / "dist"
    out_dir.mkdir(exist_ok=True)
    bundled = inline_html(here, here / "index.html")
    out = out_dir / "praxis.html"
    out.write_text(bundled, encoding="utf-8")
    size_kb = out.stat().st_size / 1024
    print(f"Wrote {out}  ({size_kb:.1f} KB)")
    # Quick sanity
    if "<script src=" in bundled or '<link rel="stylesheet" href' in bundled:
        print("WARNING: some <script src> or stylesheet links were not inlined.", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
