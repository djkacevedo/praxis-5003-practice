"""Tiny dev server with auto-reload. Watches HTML/CSS/JS and refreshes the browser.

Usage:
    python -m venv .venv
    .venv\\Scripts\\activate    (Windows)  or  source .venv/bin/activate  (mac/linux)
    pip install -r requirements.txt
    python serve.py

Then open http://localhost:8000.
"""
from livereload import Server

server = Server()
server.watch("*.js")
server.watch("*.css")
server.watch("*.html")
server.serve(root=".", port=8000, open_url_delay=1)
