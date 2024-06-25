import * as THREE from 'three';
import { gsap } from 'gsap';

export default class Snow {
  constructor(scene, resolution, particleCount = 1000) {
    this.scene = scene;
    this.resolution = resolution;
    this.particleCount = particleCount;
    this.particles = [];
    this.init();
  }

  init() {
    const geometry = new THREE.SphereGeometry(0.1, 10, 10);
    const material = new THREE.MeshBasicMaterial({
      color: 0xadd8e6,
      transparent: true,
      opacity: 0,
    });

    for (let i = 0; i < this.particleCount; i++) {
      const particle = new THREE.Mesh(geometry, material);
      const index = this.getFreeIndex(); //distribuisco le particelle
      particle.position.x = index % this.resolution.x; //le distibuisco lungo la resolution
      particle.position.z = Math.floor(index / this.resolution.x);
      particle.position.y = Math.random() * this.resolution.y;
      this.scene.add(particle);
      this.particles.push(particle);
    }
  }

  getFreeIndex() {
    return Math.floor(Math.random() * this.resolution.x * this.resolution.y);
  }

  animate() {
    this.particles.forEach(particle => {
      particle.position.y -= 0.1;
      if (particle.position.y < -10) {
        particle.position.y = 10;
      }
    });
  }
  
  show() {
    gsap.killTweensOf(this.particles.map(p => p.material)); // Interrompi le animazioni precedenti
    gsap.to(this.particles.map(p => p.material), { opacity: 0.70, duration: 1 });
  }
  
  hide() {
    gsap.killTweensOf(this.particles.map(p => p.material)); // Interrompi le animazioni precedenti
    gsap.to(this.particles.map(p => p.material), { opacity: 0, duration: 1 });
  }
  
}
