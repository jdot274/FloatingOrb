/**
 * Icon Generator Script
 * Run with: node icons/generate-icons.js
 * 
 * This creates PNG files that can be converted to .icns using iconutil
 */

const fs = require('fs');
const path = require('path');

// Create SVG icons for both apps
const standaloneSVG = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="silverGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" style="stop-color:#ffffff"/>
      <stop offset="30%" style="stop-color:#e8e8e8"/>
      <stop offset="60%" style="stop-color:#c0c0c0"/>
      <stop offset="100%" style="stop-color:#808080"/>
    </radialGradient>
    <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" style="stop-color:#c0c0d0;stop-opacity:0.6"/>
      <stop offset="70%" style="stop-color:#a0a0b0;stop-opacity:0.2"/>
      <stop offset="100%" style="stop-color:#808090;stop-opacity:0"/>
    </radialGradient>
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="30" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <!-- Outer glow -->
  <circle cx="512" cy="512" r="400" fill="url(#glowGrad)"/>
  <!-- Main silver orb -->
  <circle cx="512" cy="512" r="320" fill="url(#silverGrad)" filter="url(#glow)"/>
  <!-- Highlight -->
  <ellipse cx="420" cy="400" rx="100" ry="80" fill="white" opacity="0.4"/>
</svg>`;

const glassSVG = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="silverGrad2" cx="35%" cy="35%" r="65%">
      <stop offset="0%" style="stop-color:#ffffff"/>
      <stop offset="30%" style="stop-color:#e8e8e8"/>
      <stop offset="60%" style="stop-color:#c0c0c0"/>
      <stop offset="100%" style="stop-color:#808080"/>
    </radialGradient>
    <radialGradient id="glassGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" style="stop-color:#404050;stop-opacity:0.3"/>
      <stop offset="80%" style="stop-color:#303040;stop-opacity:0.5"/>
      <stop offset="100%" style="stop-color:#202030;stop-opacity:0.7"/>
    </radialGradient>
    <filter id="glassBlur" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur stdDeviation="8"/>
    </filter>
    <filter id="innerShadow">
      <feGaussianBlur stdDeviation="15" result="blur"/>
      <feOffset dx="0" dy="5"/>
      <feComposite in="SourceGraphic" operator="over"/>
    </filter>
  </defs>
  <!-- Glass container background -->
  <circle cx="512" cy="512" r="450" fill="url(#glassGrad)" filter="url(#glassBlur)"/>
  <!-- Glass border -->
  <circle cx="512" cy="512" r="448" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="4"/>
  <!-- Inner shadow on glass -->
  <circle cx="512" cy="512" r="420" fill="none" stroke="rgba(0,0,0,0.3)" stroke-width="30" filter="url(#innerShadow)"/>
  <!-- Main silver orb -->
  <circle cx="512" cy="512" r="280" fill="url(#silverGrad2)"/>
  <!-- Highlight on orb -->
  <ellipse cx="440" cy="420" rx="80" ry="65" fill="white" opacity="0.5"/>
  <!-- Glass highlight arc -->
  <path d="M 200 512 Q 512 200, 824 512" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="40" stroke-linecap="round"/>
</svg>`;

// Write SVG files
fs.writeFileSync(path.join(__dirname, 'standalone.svg'), standaloneSVG);
fs.writeFileSync(path.join(__dirname, 'glass.svg'), glassSVG);

console.log('✅ SVG icons created!');
console.log('');
console.log('To convert to .icns, run these commands:');
console.log('');
console.log('# For standalone icon:');
console.log('mkdir -p icons/standalone.iconset');
console.log('for size in 16 32 64 128 256 512 1024; do');
console.log('  sips -z $size $size icons/standalone.svg --out icons/standalone.iconset/icon_${size}x${size}.png 2>/dev/null || \\');
console.log('  rsvg-convert -w $size -h $size icons/standalone.svg -o icons/standalone.iconset/icon_${size}x${size}.png');
console.log('done');
console.log('iconutil -c icns icons/standalone.iconset -o icons/standalone.icns');
console.log('');
console.log('# For glass icon:');
console.log('mkdir -p icons/glass.iconset');
console.log('for size in 16 32 64 128 256 512 1024; do');
console.log('  sips -z $size $size icons/glass.svg --out icons/glass.iconset/icon_${size}x${size}.png 2>/dev/null || \\');
console.log('  rsvg-convert -w $size -h $size icons/glass.svg -o icons/glass.iconset/icon_${size}x${size}.png');
console.log('done');
console.log('iconutil -c icns icons/glass.iconset -o icons/glass.icns');

