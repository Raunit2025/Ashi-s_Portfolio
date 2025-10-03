import React from 'react';
import { Box, Sphere, Torus, Dodecahedron } from "@react-three/drei";

export const projectsData = [
  {
    id: 1,
    skillIds: [1, 3],
    title: "Sci-Fi Crate",
    description: "A game-ready, hard-surface model of a sci-fi crate, textured with PBR materials.",
    longDescription: "This project was an exercise in hard-surface modeling and PBR texturing. The goal was to create a game-ready asset with optimized topology and realistic materials. The modeling was done in Blender, focusing on clean edges and efficient UV unwrapping. Texturing was completed in Substance Painter, utilizing procedural masks and hand-painted details to achieve a worn, industrial look.",
    tools: ["Blender", "Substance Painter", "Marmoset Toolbag"],
    model: (
      <Box args={[2, 2, 2]}>
        <meshStandardMaterial color="#8A2BE2" roughness={0.3} metalness={0.9} />
      </Box>
    ),
    imageRender: "https://placehold.co/1200x800/1a1a1a/ffffff?text=Sci-Fi+Crate+Render",
    imageWireframe: "https://placehold.co/1200x800/e0e0e0/000000?text=Wireframe+View",
  },
  {
    id: 2,
    skillIds: [2],
    title: "Creature Bust",
    description: "A high-poly sculpt of a fantasy creature, created in ZBrush.",
    longDescription: "This fantasy creature bust was sculpted entirely in ZBrush. The focus was on creating a strong silhouette and detailed organic forms. I explored various sculpting techniques, including dynamic subdivision and custom alpha brushes, to bring the character's features to life. The final render was done in ZBrush with post-processing in Photoshop.",
    tools: ["ZBrush", "Photoshop", "Keyshot"],
    model: (
      <Dodecahedron args={[1.5, 0]}>
        <meshStandardMaterial
          color="#40E0D0"
          roughness={0.1}
          metalness={0.95}
        />
      </Dodecahedron>
    ),
    imageRender: "https://placehold.co/1200x800/1a1a1a/ffffff?text=Creature+Render",
    imageWireframe: "https://placehold.co/1200x800/e0e0e0/000000?text=Wireframe+View",
  },
  // ... (Add imageRender and imageWireframe to other projects as needed)
];

