import { IcosahedronGeometry, Mesh, MeshStandardMaterial, } from 'three'
import Entity from './Entity'

const GEOMETRY = new IcosahedronGeometry(0.5)
const MATERIAL = new MeshStandardMaterial({
	color: 0xacacac, //grigio
	flatShading: true,
})

export default class Rock extends Entity {
	constructor(resolution, color) {
		const mesh = new Mesh(GEOMETRY, MATERIAL)

        //x y z
		mesh.scale.set(
            Math.random() * 0.6 + 0.4, 
            0.4 + Math.random() *2 * 1.9, 
            1)

        //inclinazione
		mesh.rotation.y = Math.random() * Math.PI * 2
		mesh.rotation.x = Math.random() * Math.PI * 0.1

        //altrimenti l'inclinazione sarebbe 'storta'
		mesh.rotation.order = 'YXZ'
		mesh.position.y = -0.5



		super(mesh, resolution)
	}
}