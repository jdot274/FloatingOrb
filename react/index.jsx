/**
 * React Package Entry Point
 * 
 * This file re-exports the React Three Fiber components for npm package usage.
 * 
 * Usage:
 *   import { FloatingOrb, CONFIG } from 'floating-orb-component/react';
 */

export { default as FloatingOrb, CONFIG } from '../src/FloatingOrb.jsx';

// Re-export App components for convenience
export { default as App } from '../src/App.jsx';
export { default as AppWithBackground } from '../src/AppWithBackground.jsx';

