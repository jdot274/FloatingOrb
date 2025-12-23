/**
 * React Three Fiber FloatingOrb TypeScript Definitions
 */

import { FC } from 'react';

export interface FloatingOrbProps {
  /** Orb color (CSS color string) */
  color?: string;
  /** Orb size (Three.js units, default 1.5) */
  size?: number;
  /** Enable auto-rotation */
  autoRotate?: boolean;
}

/**
 * FloatingOrb R3F Component
 * 
 * Use inside a React Three Fiber <Canvas>
 */
export const FloatingOrb: FC<FloatingOrbProps>;

export default FloatingOrb;

