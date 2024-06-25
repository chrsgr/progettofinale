import { IcosahedronGeometry, Mesh, MeshStandardMaterial } from 'three';
import Entity from './Entity';


const GEOMETRY = new IcosahedronGeometry(0.3, 1); //tronco
GEOMETRY.rotateX(Math.random() * Math.PI * 2);
GEOMETRY.scale(1, 6, 1); // Aumentata la scala per rendere il tronco più robusto

// Materiale per il tronco con un colore marrone
const MATERIAL = new MeshStandardMaterial({
  flatShading: true,
  color: 0x8B4513, // Colore marrone per il tronco
  roughness: 0.8,
  metalness: 0.2
});

export default class Tree extends Entity {
  constructor(resolution, color) {

    // Creazione del mesh con geometria e materiale modificati
    const mesh = new Mesh(GEOMETRY, MATERIAL);
    mesh.scale.setScalar(0.6 + Math.random() * 0.6);
    mesh.rotation.y = Math.random() * Math.PI * 2;

   

    super(mesh, resolution);

    // Aggiunta di una chioma all'albero
    this.addLeaves();
  }

  addLeaves() {
    const leavesGeometry = new IcosahedronGeometry(0.6, 1);
    const leavesMaterial = new MeshStandardMaterial({
      flatShading: true,
      color: 0x008000, //0x00ff00 Verde per le foglie
      roughness: 0.5,
      metalness: 0.1
    });

    const leavesMesh = new Mesh(leavesGeometry, leavesMaterial);
    leavesMesh.position.y = 2; // Posizionamento della chioma sopra il tronco
    leavesMesh.scale.setScalar(0.8 + Math.random() * 0.4); // Variazione nella dimensione della chioma

    this.mesh.add(leavesMesh);
  }
}
