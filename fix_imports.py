import re

with open('src/app/page.tsx', 'r') as f:
    content = f.read()

# Cari import section
if 'import' in content and 'Envelope' not in content:
    # Tambah Envelope ke import
    content = content.replace(
        'import {',
        'import {\n  Envelope,'
    )
    print("✓ Added Envelope import")
    
with open('src/app/page.tsx', 'w') as f:
    f.write(content)
