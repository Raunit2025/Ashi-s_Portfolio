import React from 'react';
import { Box, Sphere, Torus, Dodecahedron } from "@react-three/drei";

export const skillsData = [
    {
      id: 1,
      title: "3D Modeling",
      category: "Hard Surface & Organic",
      shortDescription: "Creating detailed 3D models of both mechanical and natural objects, focusing on clean topology and efficient UV layouts for game-ready assets.",
      model: (
        <Torus args={[1, 0.2, 16, 100]} rotation={[Math.PI / 2, 0.3, 0]}>
          <meshStandardMaterial color="#8A2BE2" roughness={0.3} metalness={0.9} />
        </Torus>
      ),
    },
    {
      id: 2,
      title: "Sculpting",
      category: "Character & Environment",
      shortDescription: "High-resolution sculpting in ZBrush to create detailed characters, creatures, and environmental assets with a focus on anatomy and form.",
      model: (
        <Dodecahedron args={[1.2, 0]}>
          <meshStandardMaterial
            color="#40E0D0"
            roughness={0.1}
            metalness={0.95}
            emissive="#003333"
            emissiveIntensity={0.5}
          />
        </Dodecahedron>
      ),
    },
    {
      id: 3,
      title: "Texturing",
      category: "PBR & Hand-Painted",
      shortDescription: "Creating realistic and stylized textures using Substance Painter and Photoshop, with a strong understanding of PBR workflows and material properties.",
      model: (
        <Box args={[1.5, 1.5, 1.5]}>
          <meshStandardMaterial color="#32CD32" wireframe />
        </Box>
      ),
    },
      {
      id: 4,
      title: "Game VFX",
      category: "Real-time Effects",
      shortDescription: "Designing and implementing real-time visual effects such as explosions, magical abilities, and environmental effects in Unreal Engine and Unity.",
      model: (
        <Sphere args={[1, 32, 32]}>
          <meshStandardMaterial color="#FF4500" roughness={0.2} metalness={0.8} />
        </Sphere>
      ),
    },
    {
      id: 5,
      title: "Level Designing",
      category: "Gameplay & Narrative",
      shortDescription: "Crafting engaging and immersive game levels that guide the player, tell a story, and provide a fun and challenging experience.",
      model: (
        <Torus args={[1, 0.4, 8, 50]} rotation={[0, 0, 0]}>
          <meshStandardMaterial color="#FFD700" roughness={0.2} metalness={0.8} />
        </Torus>
      ),
    },
    {
      id: 6,
      title: "Architecture Visualization",
      category: "Realistic Rendering",
      shortDescription: "Creating stunning, photorealistic renderings of architectural designs for real-time and pre-rendered presentations.",
      model: (
        <Box args={[1, 2, 1]}>
          <meshStandardMaterial color="#C0C0C0" roughness={0.1} metalness={1.0} />
        </Box>
      ),
    },
      {
      id: 7,
      title: "Rigging",
      category: "Character & Mechanical",
      shortDescription: "Building robust and intuitive rigs for characters and props, enabling animators to bring them to life with ease and flexibility.",
      model: (
        <Sphere args={[1, 16, 16]}>
          <meshStandardMaterial color="#1E90FF" wireframe />
        </Sphere>
      ),
    },
  ];