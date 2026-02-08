
import * as THREE from 'three';

export interface Waypoint {
  pos: THREE.Vector3;
  look: THREE.Vector3;
}

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  tris: string;
  texture: string;
  color: string;
  accent: string;
  type: 'box' | 'sphere' | 'torus';
  position: [number, number, number];
  scale: number;
}
