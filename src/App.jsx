/**
 * ============================================================================
 * FLOATING ORB APP - Standalone (Pure Transparent - Sphere Only)
 * ============================================================================
 * 
 * Production Features:
 * - WebGL support detection
 * - Graceful fallback UI on error
 * - ACES tone mapping
 * - TRUE transparency - no background, just the sphere
 * 
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import FloatingOrb from './FloatingOrb';

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
        width: '200px',
        padding: '20px',
        borderRadius: '16px',
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '32px', marginBottom: '10px' }}>🌐</div>
        <div style={{ fontSize: '12px', opacity: 0.8 }}>
          {message || 'WebGL not available'}
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
// MAIN APP COMPONENT - STANDALONE (SPHERE ONLY)
// ============================================================================
function App() {
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
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'transparent',
    }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{
          alpha: true,
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.5,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
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
  );
}

export default App;
