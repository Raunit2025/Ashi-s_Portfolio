
import * as THREE from 'three';
import { Waypoint, ProjectData } from './types';

export const LOADING_MIN_MS = 2500;

export const WAYPOINTS: Waypoint[] = [
  { pos: new THREE.Vector3(0, 0, 12), look: new THREE.Vector3(0, 0, 0) }, // Intro
  { pos: new THREE.Vector3(-8, 2, 5), look: new THREE.Vector3(-12, 0, -8) }, // Project 1
  { pos: new THREE.Vector3(8, -2, 5), look: new THREE.Vector3(12, 0, -8) }, // Project 2
  { pos: new THREE.Vector3(0, -10, 8), look: new THREE.Vector3(0, -12, 0) }, // Project 3
  { pos: new THREE.Vector3(0, -2, 20), look: new THREE.Vector3(0, -4, -10) }, // Conclusion
];

export const PROJECTS: ProjectData[] = [
  {
    id: '01',
    title: 'MODULAR_CYBER_STRUCTURE',
    description: 'A complex modular building kit optimized for urban sprawling. Features high-density mesh modeling and custom PBR material pipelines.',
    tris: '12,450',
    texture: '4K PBR',
    color: '#0ea5e9',
    accent: '#38bdf8',
    type: 'torus',
    position: [-12, 0, -8],
    scale: 2.5
  },
  {
    id: '02',
    title: 'ORGANIC_SYNTHESIS',
    description: 'Procedural deformation study using custom vertex shaders. Designed for real-time physics interaction in open-world environments.',
    tris: '8,200',
    texture: 'Procedural',
    color: '#f59e0b',
    accent: '#fbbf24',
    type: 'sphere',
    position: [12, 0, -8],
    scale: 3
  },
  {
    id: '03',
    title: 'ARCHIVE_PROP',
    description: 'A high-fidelity environmental asset utilizing Nanite-level detailing techniques. Baked using industry-standard raytracing workflows.',
    tris: '2.5M (Virtual)',
    texture: '8K UDIM',
    color: '#ef4444',
    accent: '#f87171',
    type: 'box',
    position: [0, -12, 0],
    scale: 3.5
  }
];
