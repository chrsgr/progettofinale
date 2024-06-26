import {IcosahedronGeometry, Mesh, MeshStandardMaterial} from 'three'
import Entity from './Entity'

const GEOMETRY = new IcosahedronGeometry(0.3);
GEOMETRY.rotateX(Math.random() * Math.PI * 2);
GEOMETRY.scale(5, 15, 4);
const MATERIAL = new MeshStandardMaterial({
    //ombre
	flatShading: true,
	color: 0xeeeeee,
})

export default class Mountain extends Entity {
	constructor(resolution, color) {
		const mesh = new Mesh(GEOMETRY, MATERIAL);
		mesh.scale.setScalar(0.6 + Math.random() * 0.6);
		mesh.rotation.y = Math.random() * Math.PI * 2;




		super(mesh, resolution)
	}
}
