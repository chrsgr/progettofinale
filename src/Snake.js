import LinkedList from "./LinkedList";
import { EventDispatcher, Mesh, SphereGeometry, MeshStandardMaterial, Vector2, Vector3 } from "three";
import ListNode from "./ListNode";
import Entity from "./Entity";


// Geometria e materiale per il nodo della sfera
const NODE_GEOMETRY = new SphereGeometry(0.45, 32, 32);
const NODE_MATERIAL = new MeshStandardMaterial({
    color: 0x00BFFF, // azzurro
});


// Direzione di movimento del serpente
const UP = new Vector3(0, 0, -1);
const DOWN = new Vector3(0, 0, 1);
const LEFT = new Vector3(-1, 0, 0);
const RIGHT = new Vector3(1, 0, 0); 

export default class Snake extends EventDispatcher {
    direction = RIGHT;
    newDirection = null;

    

    constructor({ scene, resolution = new Vector2(10, 10) }) {
		// creare la testa
		super(); 

		this.scene = scene;
		this.resolution = resolution;

		this.init();
	}


    get head() {
        return this.body.head;
    }

    get end() {
        return this.body.end;
    }


    //occhi
    createHeadMesh() {
		const headMesh = this.body.head.data.mesh;

		const leftEye = new Mesh(
			new SphereGeometry(0.2, 10, 10),
			new MeshStandardMaterial({ color: 0xffffff })
		)
		leftEye.scale.x = 0.1;
		leftEye.position.x = 0.5;
		leftEye.position.y = 0.12;
		leftEye.position.z = -0.1;

		let leftEyeHole = new Mesh(
			new SphereGeometry(0.22, 10, 10),
			new MeshStandardMaterial({ color: 0x333333 })
		)
		leftEyeHole.scale.set(1, 0.6, 0.6);
		leftEyeHole.position.x += 0.05;
		leftEye.add(leftEyeHole);

		const rightEye = leftEye.clone();

		rightEye.position.x = -0.5;
		rightEye.rotation.y = Math.PI;

		headMesh.add(rightEye, leftEye);

		headMesh.lookAt(headMesh.position.clone().add(this.direction));
	}

    //mi serve per rigenerare il serpente in caso di morte
    init(){

        this.direction = UP;
         //creare la testa
         const head = new ListNode(new SnakeNode(this.resolution));
         
         //parte dal centro
         head.data.mesh.position.x = this.resolution.x / 2;
         head.data.mesh.position.z = this.resolution.y / 2;
 
         this.body = new LinkedList(head);

         this.createHeadMesh ();

 
         this.indexes = [];
 
         this.indexes.push(this.head.data.getIndexByCoord());
         for (let i = 0; i < 3; i++) {
             const position = this.end.data.mesh.position.clone();
             position.sub(this.direction);
             this.addTailNode();
             this.end.data.mesh.position.copy(position);
 
             this.indexes.push(this.end.data.getIndexByCoord());
         }
 
         this.scene.add(head.data.mesh); 
    }

    

    setDirection(keyCode) {
        switch (keyCode) {
            case 'ArrowUp':
                this.newDirection = UP
                break
            case 'ArrowDown':
                this.newDirection = DOWN
                break
            case 'ArrowLeft':
                this.newDirection = LEFT
                break
            case 'ArrowRight':
                this.newDirection = RIGHT
                break
        }

        if (this.newDirection) {
            const dot = this.direction.clone().normalize().dot(this.newDirection.clone().normalize())
            if (dot !== 0) {
                this.newDirection = null
            }
        }
    }

    update() {


        if (this.newDirection) {
            this.direction = this.newDirection;
            this.newDirection = null;
        }

        let currentNode = this.end;

        if (this.end.data.candy){
            this.end.data.candy = null;
            this.end.data.mesh.scale.setScalar(1);

            this.addTailNode()

        }

        while (currentNode.prev) {

            const candy = currentNode.prev.data.candy

            //se esiste la caramella nel pezzo precedente (prev), la aggiungiamo nella coda
            if(candy){
                currentNode.data.candy = candy; //passo la caramello dal nodo precendente al nodo corrente
                currentNode.data.mesh.scale.setScalar(1.20); //se ingerico ingrandisco il passaggio della caramella
                currentNode.data.mesh.color = 0x0000ff;
                currentNode.prev.data.candy = null; //la tolgo in quello precedente
                currentNode.prev.data.mesh.scale.setScalar(1); //il nodo precedente deve ritornare dinuovo normale

            }
            const position = currentNode.prev.data.mesh.position;
            currentNode.data.mesh.position.copy(position);
            currentNode = currentNode.prev;
        }

        const headPos = this.head.data.mesh.position;
        headPos.add(this.direction);

        const headMesh = this.body.head.data.mesh;
		headMesh.lookAt(headMesh.position.clone().add(this.direction));

        
        
         //VERTICALE
        //se si trova alla fine della verticale deve ritornare nella posizione finale -1.
        //Ovvero, non appena arriva nell'ultimo quadratino, la testa spunta dall'altro lato 
        if (headPos.z < 0) {
            headPos.z = this.resolution.y - 1;
        } else if (headPos.z >= this.resolution.y) {
            headPos.z = 0;
        }

        // Orizzontale
        if (headPos.x < 0) {
            headPos.x = this.resolution.x - 1;
        } else if (headPos.x >= this.resolution.x) {
            headPos.x = 0;
        }

        this.head.data.mesh.position.copy(headPos);  // Update head position

        this.updateIndexes();

        this.dispatchEvent ({type: 'updated'});

    }

    die(){
        let node = this.body.head;
        do{
            this.scene.remove(node.data.mesh);
            node = node.next;

        }while(node)

            this.init();
            this.addEventListener({type: 'die'});
    }

    checkSelfCollision(){
        const headIndex = this.indexes.pop(); //prendo l'ultimo indice della testa
        const collide = this.indexes.includes(headIndex); //serpente muore e dvorà essere rigenerato
        this.indexes.push(headIndex);

        return collide;
    }

    checkEntitiesCollision(entities){
        const headIndex = this.indexes.at(-1);

        const entity = entities.find(entity => entity.getIndexByCoord()=== headIndex);

        //return valore booleano
        return !!entity; //doppia negazione. Se trova un oggetto ritorna true, se non trova nulla-> false

    }

    updateIndexes() {
		this.indexes = [];

		let node = this.body.end;

		while (node) {
			this.indexes.push(node.data.getIndexByCoord());
			node = node.prev;
		}
	}


    addTailNode(position) {
		const node = new ListNode(new SnakeNode(this.resolution));

		if (position) {
			node.data.mesh.position.copy(position);
		} else {
			node.data.mesh.position.copy(this.end.data.mesh.position);
		}

		this.body.addNode(node);
		this.scene.add(node.data.mesh);
	}
  
    }


class SnakeNode extends Entity {
    constructor(resolution) {
        const mesh = new Mesh(NODE_GEOMETRY, NODE_MATERIAL);
        super(mesh, resolution);

        
    }
}
