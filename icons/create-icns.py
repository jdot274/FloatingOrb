#!/usr/bin/env python3
"""
Generate .icns files for macOS apps from SVG icons
"""

import os
import subprocess
import cairosvg

ICONS_DIR = os.path.dirname(os.path.abspath(__file__))

# Icon sizes needed for macOS .iconset
SIZES = [16, 32, 64, 128, 256, 512, 1024]

def create_iconset(svg_name, output_name):
    svg_path = os.path.join(ICONS_DIR, f'{svg_name}.svg')
    iconset_dir = os.path.join(ICONS_DIR, f'{output_name}.iconset')
    icns_path = os.path.join(ICONS_DIR, f'{output_name}.icns')
    
    # Create iconset directory
    os.makedirs(iconset_dir, exist_ok=True)
    
    # Generate PNGs for each size
    for size in SIZES:
        # Regular size
        png_path = os.path.join(iconset_dir, f'icon_{size}x{size}.png')
        cairosvg.svg2png(url=svg_path, write_to=png_path, output_width=size, output_height=size)
        print(f'  Created {size}x{size}')
        
        # @2x retina size (except for 1024 which doesn't need @2x)
        if size <= 512:
            png_path_2x = os.path.join(iconset_dir, f'icon_{size}x{size}@2x.png')
            cairosvg.svg2png(url=svg_path, write_to=png_path_2x, output_width=size*2, output_height=size*2)
            print(f'  Created {size}x{size}@2x')
    
    # Convert iconset to icns using iconutil
    result = subprocess.run(['iconutil', '-c', 'icns', iconset_dir, '-o', icns_path], capture_output=True)
    if result.returncode == 0:
        print(f'✅ Created {icns_path}')
    else:
        print(f'❌ Failed to create icns: {result.stderr.decode()}')
    
    return icns_path

if __name__ == '__main__':
    print('🎨 Generating Standalone icon...')
    create_iconset('standalone', 'standalone')
    
    print('\n🎨 Generating Glass icon...')
    create_iconset('glass', 'glass')
    
    print('\n✅ All icons generated!')

