
import * as THREE from 'three';
import { Waypoint, ProjectData } from './types';

export const LOADING_MIN_MS = 2500;

export const PROFILE = {
  name: 'Ashi Saxena',
  role: '3D Game Environment & Prop Artist',
  location: 'Gwalior, M.P., India',
  email: 'aashisaxena09076@gmail.com',
  phone: '+91-7389563886',
  linkedin: 'https://linkedin.com/in/ashi-saxena',
  artstation: 'https://artstation.com/ashisaxena',
  summary:
    'Designing cinematic real-time environments and hero props with a focus on atmospheric storytelling, technical optimization, and next-gen lighting workflows.',
};

export const SKILLS = [
  {
    title: 'Technical Skills',
    items: [
      '3D Modeling (hard-surface & organic)',
      'Sculpting',
      'Texturing & hand-painted texturing',
      'Lighting & compositing',
      'Rigging & animation',
      'Game VFX',
      'Level design',
      'Architectural visualization',
      'Rendering',
    ],
  },
  {
    title: 'Software & Platforms',
    items: [
      'Blender',
      'Autodesk Maya',
      '3D Studio Max',
      'ZBrush (Maxon)',
      'Substance Painter',
      'Substance Designer',
      'Unreal Engine',
      'Unity',
      'Adobe Photoshop',
      'Adobe Illustrator',
      'Figma',
      'Adobe Premiere Pro',
      'Adobe After Effects',
    ],
  },
  {
    title: 'Languages',
    items: ['Hindi', 'English'],
  },
  {
    title: 'Soft Skills',
    items: ['Problem-solving', 'Team collaboration', 'Adaptability'],
  },
];

export const CERTIFICATIONS = [
  {
    title: 'Game assets or prop creation',
    issuer: 'Udemy',
    date: 'Dec 2023',
  },
  {
    title: 'Video Editing',
    issuer: 'Udemy',
    date: 'Dec 2025',
  },
];

export const ACTIVITIES = [
  {
    title: 'KRAFTON - Better Grounds Program 2025',
    location: 'Online',
    date: 'Present',
    details: [
      'Participated in a competitive ideation event focused on game development.',
      'Collaborated in a team to brainstorm and present game design documents.',
    ],
  },
  {
    title: 'Multiverse - Video Editing Seminar',
    location: 'LPU, Jalandhar',
    date: 'Aug 2023',
    details: [
      'Organized and coordinated a seminar focused on video editing techniques and tools.',
      'Managed logistics, promotions, and participant engagement for a successful event.',
    ],
  },
];

export const EDUCATION = [
  {
    school: 'Lovely Professional University',
    location: 'Punjab, India',
    program: 'Bachelor of Design - Gaming',
    details: 'CGPA: 7.4',
    date: 'Since Aug 2022',
  },
  {
    school: 'Carmel Convent Senior Secondary School',
    location: 'Gwalior, M.P.',
    program: 'Intermediate',
    details: 'Percentage: 70%',
    date: 'Apr 2020 - Mar 2022',
  },
  {
    school: 'Carmel Convent Senior Secondary School',
    location: 'Gwalior, M.P.',
    program: 'Matriculation',
    details: 'Percentage: 71%',
    date: 'Apr 2018 - Mar 2020',
  },
];

export const PROJECTS: ProjectData[] = [
  {
    id: '01',
    title: 'BLACKOUT',
    description:
      'A 3D interactive horror game environment built to guide players through layered exploration and tension beats.',
    timeline: 'Mar 2025 - Jun 2025',
    tools: 'Autodesk Maya, Substance Painter, Unreal Engine',
    focus: 'Environment design & cinematic lighting',
    color: '#0ea5e9',
    accent: '#38bdf8',
    type: 'torus',
    modelPath: '/models/asset1.glb',
    position: [-12, 0, -8],
    scale: 2.5
  },
  {
    id: '02',
    title: 'ARCHITECTURAL VISUALIZATION',
    description:
      'A 3D visualization of a 4-BHK floor plan focusing on spatial accuracy, daylight studies, and modern material palettes.',
    timeline: 'Jan 2025 - Mar 2025',
    tools: '3D Studio Max',
    focus: 'Architectural visualization',
    color: '#22c55e',
    accent: '#4ade80',
    type: 'sphere',
    modelPath: '/models/asset2.glb',
    position: [12, 0, -8],
    scale: 3
  },
  {
    id: '03',
    title: 'INTERIOR DESIGN',
    description:
      'A luxurious interior environment inspired by Roman architecture, composed with hero assets and atmospheric detailing.',
    timeline: 'Sept 2024 - Dec 2024',
    tools: 'Photoshop, Maya, 3Ds Max, ZBrush, Substance Painter, Marmoset Toolbag, Unreal Engine',
    focus: 'Interior environment art',
    color: '#a855f7',
    accent: '#c084fc',
    type: 'box',
    modelPath: '/models/asset3.glb',
    position: [0, -12, 0],
    scale: 3.2
  },
  {
    id: '04',
    title: 'WEAPON DESIGN',
    description:
      'Designed conceptual weapons for hero assets, iterating on silhouettes, materials, and game-ready topology.',
    timeline: 'Feb 2024 - May 2024',
    tools: 'Maya, 3ds Max, ZBrush, Substance Painter',
    focus: 'Hero prop design',
    color: '#f97316',
    accent: '#fb923c',
    type: 'torus',
    modelPath: '/models/asset4.glb',
    position: [-14, -6, -18],
    scale: 2.8
  },
  {
    id: '05',
    title: 'PRODUCT REDESIGN',
    description:
      'Created a digital pen concept for both paper and pen tablet workflows using the SCAMPER methodology.',
    timeline: 'Sept 2023 - Dec 2023',
    tools: 'Concept ideation & 3D visualization',
    focus: 'Industrial design exploration',
    color: '#ef4444',
    accent: '#f87171',
    type: 'sphere',
    modelPath: '/models/asset5.glb',
    position: [14, -8, -16],
    scale: 2.4
  }
];

export const SCROLL_PAGES = PROJECTS.length + 4;

export const WAYPOINTS: Waypoint[] = [
  { pos: new THREE.Vector3(0, 0, 12), look: new THREE.Vector3(0, 0, 0) }, // Intro
  { pos: new THREE.Vector3(0, 2, 8), look: new THREE.Vector3(0, 0, -4) }, // About
  { pos: new THREE.Vector3(-8, 2, 5), look: new THREE.Vector3(-12, 0, -8) }, // Project 1
  { pos: new THREE.Vector3(8, -2, 5), look: new THREE.Vector3(12, 0, -8) }, // Project 2
  { pos: new THREE.Vector3(0, -10, 8), look: new THREE.Vector3(0, -12, 0) }, // Project 3
  { pos: new THREE.Vector3(-12, -8, -12), look: new THREE.Vector3(-14, -6, -18) }, // Project 4
  { pos: new THREE.Vector3(12, -8, -12), look: new THREE.Vector3(14, -8, -16) }, // Project 5
  { pos: new THREE.Vector3(0, -4, 14), look: new THREE.Vector3(0, -6, 0) }, // Resume
  { pos: new THREE.Vector3(0, 0, 18), look: new THREE.Vector3(0, -2, -6) }, // Contact
];
