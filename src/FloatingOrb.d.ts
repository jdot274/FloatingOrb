/**
 * TypeScript Definitions for Floating Orb Component
 * 
 * Both the vanilla Web Component and React component are typed here.
 */

// ============================================================================
// REACT COMPONENT TYPES
// ============================================================================

export interface FloatingOrbProps {
  /** Orb color (hex string) - default: '#c084fc' */
  color?: string;
  /** Orb radius - default: 1.5 */
  size?: number;
  /** Material metalness (0-1) - default: 0.88 */
  metalness?: number;
  /** Material roughness (0-1) - default: 0.06 */
  roughness?: number;
  /** Enable auto-rotation - default: true */
  autoRotate?: boolean;
  /** Sphere geometry segments - default: 128 */
  segments?: number;
  /** Callback when rotation changes */
  onRotationChange?: (rotation: Rotation) => void;
}

export interface Rotation {
  x: number;
  y: number;
  z: number;
}

export interface MaterialConfig {
  color: number;
  metalness: number;
  roughness: number;
  transmission: number;
  thickness: number;
  ior: number;
  clearcoat: number;
  clearcoatRoughness: number;
  envMapIntensity: number;
  reflectivity: number;
  sheen: number;
  sheenRoughness: number;
  sheenColor: number;
}

export interface LightConfig {
  color: string;
  intensity: number;
  position?: [number, number, number];
}

export interface GlowLayerConfig {
  scale: number;
  color: string;
  opacity: number;
}

export interface CONFIG {
  MATERIAL: MaterialConfig;
  LIGHTS: {
    ambient: LightConfig;
    key1: LightConfig;
    key2: LightConfig;
    fill1: LightConfig;
    fill2: LightConfig;
    rim1: LightConfig;
    rim2: LightConfig;
    accent1: LightConfig;
    accent2: LightConfig;
  };
  GLOW: {
    inner: GlowLayerConfig;
    middle: GlowLayerConfig;
    outer: GlowLayerConfig;
  };
  ROTATION_SPEED: number;
  DRAG_SENSITIVITY: number;
  RESUME_DELAY: number;
}

/** React Three Fiber Floating Orb Component */
declare const FloatingOrb: React.FC<FloatingOrbProps>;
export default FloatingOrb;

export { CONFIG };

// ============================================================================
// WEB COMPONENT TYPES (Vanilla JS)
// ============================================================================

export interface FloatingOrbElementAttributes {
  /** Size in pixels - default: 400 */
  size?: string | number;
  /** Color (hex string) - default: '#c084fc' */
  color?: string;
  /** Metalness (0-1) - default: 0.88 */
  metalness?: string | number;
  /** Roughness (0-1) - default: 0.06 */
  roughness?: string | number;
  /** Enable auto-rotation - default: 'true' */
  'auto-rotate'?: 'true' | 'false';
  /** Enable bloom effect - default: 'true' */
  bloom?: 'true' | 'false';
}

export interface FloatingOrbElement extends HTMLElement {
  /** Current size in pixels */
  readonly size: number;
  /** Current color */
  readonly color: string;
  /** Current metalness */
  readonly metalness: number;
  /** Current roughness */
  readonly roughness: number;
  /** Auto-rotate enabled */
  readonly autoRotate: boolean;
  /** Bloom enabled */
  readonly bloom: boolean;

  /** Set the orb color */
  setColor(color: string): void;
  /** Set auto-rotation */
  setAutoRotate(enabled: boolean): void;
  /** Rotate the orb to specific angles (radians) */
  rotateTo(x: number, y: number): void;
  /** Get current rotation */
  getRotation(): { x: number; y: number };
  /** Destroy the component and free resources */
  destroy(): void;
}

// Extend HTMLElementTagNameMap for TypeScript to recognize the custom element
declare global {
  interface HTMLElementTagNameMap {
    'floating-orb': FloatingOrbElement;
  }

  namespace JSX {
    interface IntrinsicElements {
      'floating-orb': React.DetailedHTMLProps<
        React.HTMLAttributes<FloatingOrbElement> & FloatingOrbElementAttributes,
        FloatingOrbElement
      >;
    }
  }
}

// ============================================================================
// EVENTS
// ============================================================================

export interface FloatingOrbReadyEvent extends CustomEvent {
  type: 'orb-ready';
}

export interface FloatingOrbDestroyedEvent extends CustomEvent {
  type: 'orb-destroyed';
}

declare global {
  interface GlobalEventHandlersEventMap {
    'orb-ready': FloatingOrbReadyEvent;
    'orb-destroyed': FloatingOrbDestroyedEvent;
  }
}

