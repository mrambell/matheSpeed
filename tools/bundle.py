#!/usr/bin/env python3
"""Inline css/ and js/ into one self-contained HTML file (for sending by mail or opening without a server).
Usage: python3 tools/bundle.py [output.html]   (default: dist/matheSpeed.html)"""
import os, re, sys
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
read = lambda p: open(os.path.join(root, p), encoding="utf-8").read()
html = read("index.html")
html = re.sub(r'<link rel="stylesheet" href="([^"]+)">', lambda m: "<style>\n" + read(m.group(1)) + "</style>", html)
html = re.sub(r'<script src="([^"]+)"></script>', lambda m: "<script>\n" + read(m.group(1)) + "</script>", html)
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(root, "dist", "matheSpeed.html")
os.makedirs(os.path.dirname(os.path.abspath(out)), exist_ok=True)
open(out, "w", encoding="utf-8").write(html)
print("wrote", out)
