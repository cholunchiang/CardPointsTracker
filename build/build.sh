#!/bin/bash

# CardPointsTracker Build Script
# Combines CSS and main.js into a single HTML file

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
SRC_DIR="$PROJECT_ROOT/src"
DIST_DIR="$PROJECT_ROOT/dist"

mkdir -p "$DIST_DIR"

echo "🔨 Building CardPointsTracker..."

python3 << 'PYTHON_BUILD'
import os
import glob
from datetime import datetime

src_dir = '/Users/cholunchiang/Desktop/CardPointsTracker/src'
dist_dir = '/Users/cholunchiang/Desktop/CardPointsTracker/dist'

print(f"  Source: {src_dir}")
print(f"  Output: {dist_dir}")

# 1. Combine CSS
print("📋 Combining CSS...")
css_content = ""
for css_file in sorted(glob.glob(f"{src_dir}/styles/*.css")):
    print(f"  ✓ {os.path.basename(css_file)}")
    with open(css_file, 'r', encoding='utf-8') as f:
        css_content += f"/* === {os.path.basename(css_file)} === */\n"
        css_content += f.read() + "\n"

# 2. Read main.js ONLY (not the broken modular files)
print("📋 Reading main.js...")
js_file = f"{src_dir}/js/main.js"
with open(js_file, 'r', encoding='utf-8') as f:
    js_content = f.read()
print(f"  ✓ main.js ({len(js_content):,} bytes)")

# 3. Read template
print("📋 Reading template...")
with open(f"{src_dir}/index.html", 'r', encoding='utf-8') as f:
    template = f.read()
print("  ✓ Template loaded")

# 4. Inject CSS
print("🎨 Inlining CSS...")
css_block = f"<style>\n{css_content}\n</style>"
template = template.replace('<!-- CSS -->', css_block)

# 5. Inject JS
print("⚙️  Inlining JavaScript...")
js_block = f"<script>\n{js_content}\n</script>"
template = template.replace('<!-- JS -->', js_block)

# 6. Write HTML output
html_path = f"{dist_dir}/CardPointsTracker.html"
print(f"💾 Writing: {html_path}")
with open(html_path, 'w', encoding='utf-8') as f:
    f.write(template)
print(f"  ✓ HTML created ({len(template):,} bytes)")

# 7. Create EML version
eml_path = f"{dist_dir}/CardPointsTracker.eml"
print(f"📧 Creating: {eml_path}")
eml_content = f"""Date: {datetime.now().strftime('%a, %d %b %Y %H:%M:%S')} -0700
From: CardPointsTracker
To: 
Subject: Card Points Tracker
MIME-Version: 1.0
Content-Type: text/html; charset=UTF-8
Content-Transfer-Encoding: 8bit

{template}
"""
with open(eml_path, 'w', encoding='utf-8') as f:
    f.write(eml_content)
print(f"  ✓ EML created ({len(eml_content):,} bytes)")

print("")
print("✅ Build complete!")
print(f"   📄 {html_path}")
print(f"   📧 {eml_path}")
PYTHON_BUILD

echo ""
echo "To open: open '$DIST_DIR/CardPointsTracker.html'"
