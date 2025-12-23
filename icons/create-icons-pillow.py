#!/usr/bin/env python3
"""
Generate .icns files for macOS apps using Pillow
Creates silver orb icons with different styles
"""

import os
import subprocess
import math
from PIL import Image, ImageDraw, ImageFilter

ICONS_DIR = os.path.dirname(os.path.abspath(__file__))
SIZES = [16, 32, 64, 128, 256, 512, 1024]

def create_gradient_circle(size, center_color, edge_color, highlight=True):
    """Create a radial gradient sphere"""
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    cx, cy = size // 2, size // 2
    radius = int(size * 0.4)
    
    # Draw radial gradient for main sphere
    for r in range(radius, 0, -1):
        # Interpolate color
        t = r / radius
        # Offset gradient for 3D effect (light from top-left)
        offset_x = -radius * 0.15
        offset_y = -radius * 0.15
        
        color = tuple([
            int(edge_color[i] + (center_color[i] - edge_color[i]) * (1 - t))
            for i in range(3)
        ]) + (255,)
        
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=color)
    
    # Add highlight
    if highlight:
        highlight_size = int(radius * 0.3)
        highlight_x = cx - radius * 0.3
        highlight_y = cy - radius * 0.35
        
        # Create highlight with gradient
        for hr in range(highlight_size, 0, -1):
            alpha = int(180 * (1 - hr / highlight_size) ** 2)
            draw.ellipse([
                highlight_x - hr * 0.8, 
                highlight_y - hr * 0.6,
                highlight_x + hr * 0.8, 
                highlight_y + hr * 0.6
            ], fill=(255, 255, 255, alpha))
    
    return img

def create_standalone_icon(size):
    """Silver orb with subtle glow - standalone version"""
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    
    # Create glow layer
    glow_size = int(size * 0.9)
    glow = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    
    cx, cy = size // 2, size // 2
    for r in range(int(size * 0.45), int(size * 0.35), -1):
        alpha = int(30 * (1 - (r - size * 0.35) / (size * 0.1)))
        glow_draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(180, 180, 200, alpha))
    
    if size >= 64:
        glow = glow.filter(ImageFilter.GaussianBlur(radius=size * 0.05))
    
    img.paste(glow, (0, 0), glow)
    
    # Main silver orb
    silver_orb = create_gradient_circle(
        size,
        center_color=(255, 255, 255),  # Bright center
        edge_color=(100, 100, 110),     # Dark silver edge
        highlight=True
    )
    
    img.paste(silver_orb, (0, 0), silver_orb)
    
    return img

def create_glass_icon(size):
    """Silver orb inside glass container"""
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    cx, cy = size // 2, size // 2
    
    # Glass container (darker, semi-transparent circle)
    glass_radius = int(size * 0.45)
    for r in range(glass_radius, int(glass_radius * 0.85), -1):
        t = (r - glass_radius * 0.85) / (glass_radius * 0.15)
        alpha = int(80 + 50 * (1 - t))
        color = (50, 50, 60, alpha)
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=color)
    
    # Glass inner area
    inner_radius = int(glass_radius * 0.85)
    draw.ellipse([cx - inner_radius, cy - inner_radius, cx + inner_radius, cy + inner_radius], 
                 fill=(40, 40, 50, 100))
    
    # Glass border highlight
    draw.ellipse([cx - glass_radius, cy - glass_radius, cx + glass_radius, cy + glass_radius], 
                 outline=(255, 255, 255, 60), width=max(1, size // 128))
    
    # Glass reflection arc at top
    arc_width = max(2, size // 64)
    draw.arc([cx - glass_radius + size*0.1, cy - glass_radius + size*0.05, 
              cx + glass_radius - size*0.1, cy + glass_radius - size*0.3],
             start=200, end=340, fill=(255, 255, 255, 40), width=arc_width)
    
    # Inner silver orb (smaller)
    orb_size = int(size * 0.65)
    orb_offset = (size - orb_size) // 2
    
    silver_orb = create_gradient_circle(
        orb_size,
        center_color=(255, 255, 255),
        edge_color=(90, 90, 100),
        highlight=True
    )
    
    img.paste(silver_orb, (orb_offset, orb_offset), silver_orb)
    
    return img

def create_iconset(icon_func, name):
    """Create iconset folder and icns file"""
    iconset_dir = os.path.join(ICONS_DIR, f'{name}.iconset')
    icns_path = os.path.join(ICONS_DIR, f'{name}.icns')
    
    os.makedirs(iconset_dir, exist_ok=True)
    
    for size in SIZES:
        # Regular size
        img = icon_func(size)
        png_path = os.path.join(iconset_dir, f'icon_{size}x{size}.png')
        img.save(png_path, 'PNG')
        print(f'  Created {size}x{size}')
        
        # @2x retina (skip 1024 as it's already max)
        if size <= 512:
            img_2x = icon_func(size * 2)
            png_path_2x = os.path.join(iconset_dir, f'icon_{size}x{size}@2x.png')
            img_2x.save(png_path_2x, 'PNG')
            print(f'  Created {size}x{size}@2x')
    
    # Convert to icns
    result = subprocess.run(['iconutil', '-c', 'icns', iconset_dir, '-o', icns_path], 
                          capture_output=True)
    if result.returncode == 0:
        print(f'✅ Created {icns_path}')
        return True
    else:
        print(f'❌ iconutil failed: {result.stderr.decode()}')
        return False

if __name__ == '__main__':
    print('🎨 Generating Standalone icon (silver orb)...')
    create_iconset(create_standalone_icon, 'standalone')
    
    print('\n🎨 Generating Glass icon (silver orb in glass)...')
    create_iconset(create_glass_icon, 'glass')
    
    print('\n✅ All icons generated!')
    print(f'\nIcons saved to: {ICONS_DIR}')

