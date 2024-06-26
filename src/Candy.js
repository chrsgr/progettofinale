import { Mesh, MeshStandardMaterial, SphereGeometry } from 'three';
import Entity from './Entity';

const GEOMETRY = new SphereGeometry(0.35, 64, 64); // Maggior dettaglio con 64 segmenti
const MATERIAL = new MeshStandardMaterial({
	color: '#0000CD', // blu
	roughness: 0.1, // Meno ruvido per riflessi più evidenti
	//metalness: 0, // riflessi realistici
	clearcoat: 10.0, // strato di lucentezza
	clearcoatRoughness: 0.1 // ruvidità dello strato di lucentezza
});

export default class Candy extends Entity {
	constructor(resolution, color) {
		const mesh = new Mesh(GEOMETRY, MATERIAL)
		super(mesh, resolution)

		this.points = 1 
		this.mesh.scale.setScalar(0.5 + (this.points * 0.5) / 3)
	}
}
