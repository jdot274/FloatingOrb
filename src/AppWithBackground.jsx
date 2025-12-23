/**
 * ============================================================================
 * FLOATING ORB APP - Glass Edition (Rounded Rectangle Background)
 * ============================================================================
 * 
 * Production Features:
 * - WebGL support detection
 * - Graceful fallback UI on error
 * - Premium glassmorphism rounded rectangle
 * - ACES tone mapping
 * - Backdrop blur + saturation
 * 
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import FloatingOrb from './FloatingOrb';

// ============================================================================
// GLASSMORPHISM STYLES - Rounded Rectangle
// ============================================================================
const GLASSMORPHISM_STYLES = {
  container: {
    width: '100vw',
    height: '100vh',
    background: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glassRectangle: {
    width: '420px',
    height: '420px',
    borderRadius: '32px',  // Rounded rectangle, not circle
    overflow: 'hidden',
    background: 'rgba(60, 60, 70, 0.25)',
    backdropFilter: 'blur(40px) saturate(150%)',
    WebkitBackdropFilter: 'blur(40px) saturate(150%)',
    boxShadow: `
      0 8px 32px rgba(0, 0, 0, 0.4),
      inset 0 0 60px rgba(255, 255, 255, 0.05)
    `,
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  canvas: {
    background: 'transparent',
    width: '100%',
    height: '100%',
  },
};

// ============================================================================
// FALLBACK UI - Shown when WebGL fails
// ============================================================================
function FallbackUI({ message }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      width: '100vw',
      background: 'transparent',
    }}>
      <div style={{
        width: '420px',
        height: '420px',
        borderRadius: '32px',
        background: 'rgba(60, 60, 70, 0.4)',
        backdropFilter: 'blur(40px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        color: 'white',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        textAlign: 'center',
        padding: '40px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}>
        <div style={{ fontSize: '64px', marginBottom: '20px' }}>🌐</div>
        <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '10px' }}>
          WebGL Not Available
        </div>
        <div style={{ fontSize: '14px', opacity: 0.7 }}>
          {message || 'Your browser or device does not support WebGL.'}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// WEBGL SUPPORT CHECK
// ============================================================================
function checkWebGLSupport() {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!gl;
  } catch (e) {
    return false;
  }
}

// ============================================================================
// MAIN APP COMPONENT - GLASS EDITION (ROUNDED RECTANGLE)
// ============================================================================
function AppWithBackground() {
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [error, setError] = useState(null);

  // Check WebGL support on mount
  useEffect(() => {
    if (!checkWebGLSupport()) {
      setWebGLSupported(false);
      setError('WebGL is not supported on this device');
    }
  }, []);

  // Show fallback if WebGL not supported
  if (!webGLSupported) {
    return <FallbackUI message={error} />;
  }

  return (
    <div style={GLASSMORPHISM_STYLES.container}>
      <div style={GLASSMORPHISM_STYLES.glassRectangle}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{
            alpha: true,
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.5,
            powerPreference: 'high-performance',
          }}
          style={GLASSMORPHISM_STYLES.canvas}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
          }}
          onError={(error) => {
            console.error('[FloatingOrb] Canvas error:', error);
            setError(error.message);
            setWebGLSupported(false);
          }}
        >
          <FloatingOrb color="#e8e8e8" size={1.5} autoRotate={true} />
        </Canvas>
      </div>
    </div>
  );
}

export default AppWithBackground;
