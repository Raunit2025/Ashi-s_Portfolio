
import * as THREE from 'three';

export interface Waypoint {
  pos: THREE.Vector3;
  look: THREE.Vector3;
}

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  timeline: string;
  tools: string;
  focus: string;
  color: string;
  accent: string;
  type: 'box' | 'sphere' | 'torus';
  modelPath?: string;
  position: [number, number, number];
  scale: number;
}
