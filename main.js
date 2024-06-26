import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './style.css';
import Snake from './src/Snake';
import Candy from './src/Candy';
import Rock from './src/Rock';
import Tree from './src/Tree';
import Mountain from './src/Mountain';
import Snow from './src/Snow';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import fontSrc from 'three/examples/fonts/helvetiker_bold.typeface.json?url'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'


// Create a new FontLoader instance
const loader = new FontLoader(); 

// Variable to hold the loaded font
let font; 

// Load the font from the specified source (fontSrc)
loader.load(fontSrc, function (loadedFont) {

  // Assign the loaded font to the 'font' variable
  font = loadedFont;

  //console.log("Font caricato con successo:", font); 

  printScore();
});


// Declare a variable named 'gui' to hold a GUI (Graphical User Interface) object or instance
let gui;


//Creation of three differente colour palettes
const palettes = {
  default: {
    backColor: 0x87CEEB,
    groundColor: 0x87CEEB, //0x0000CD
    fogColor: 0x87CEEB,
    snakeColor: 0x00BFFF,
    candyColor: 0x0000CD,
    rockColor: 0xacacac,
    scoreColor: 0x0000CD,
    mountainColor: 0xeeeeee,
  },

  fucsia: {
    backColor: 0xDDA0DD, 
   //backColor: 0xb04ce6, 
    //groundColor: 0xFF69B4,//'#D8BFD8', // Lavanda
   // groundColor: '#D8BFD8', // Lavanda
    groundColor: 0xd199ff, 
    //fogColor: 0xb04ce6, 
    fogColor: 0xDDA0DD, // Prugna
    //snakeColor: 0x8A2BE2, // Blu viola
    snakeColor: 0xff2ed2, 
    candyColor: 0xff2ed2, 
    //candyColor: 0xFF00FF, // Fucsia
    rockColor: 0xBA55D3, // Orchidea
    scoreColor: 0xff2ed2, 
    //scoreColor: 0x8A2BE2,  // Orchidea media
    mountainColor: 0xFFC0CB, 
  },
  yellow: {
     backColor: 0xFFFACD, 
    groundColor: 0xFFFFE0, // Giallo chiaro
    //groundColor: 0xFF8C00, // Giallo chiaro
    fogColor: 0xFFFACD, // Giallo limone
    snakeColor: 0xFFD700, // Oro
    candyColor: 0xFFD700, // Giallo
    rockColor: 0xFFA500, // Arancione
    scoreColor: 0xFFA500, 
    mountainColor: 0xFFDAB9, // Pesca 
  }
};

// Retrieve the palette name from local storage if it exists, otherwise use 'default'
let paletteName = localStorage.getItem('paletteName') && 'default';

// Retrieve the palette object using the palette name
let selectedPalette = palettes[paletteName];



// Function to apply a specific color palette to the scene
function applyPalette(paletteName) {
  const palette = palettes[paletteName];
  localStorage.setItem('paletteName', paletteName);
  selectedPalette = palette;
  
  if (!palette) return;

  const {
    backColor,
    groundColor,
    fogColor,
    rockColor,
    treeColor,
    candyColor,
    snakeColor,
    mountainColor,
    scoreColor, 
  } = palette;

  // Imposta i colori nel contesto della scena
  planeMaterial.color.set(groundColor);
  scene.fog.color.set(fogColor);
  scene.background.set(backColor);
  
// Find the first entity in the 'entities' array that is an instance of the Rock class
// If a Rock entity is found, set its mesh material color to the specified 'rockColor'
  entities
    .find((entity) => entity instanceof Rock)
    ?.mesh.material.color.set(rockColor);
  
  entities
    .find((entity) => entity instanceof Tree)
    ?.mesh.material.color.set(treeColor);
  
  candies[0].mesh.material.color.set(candyColor);
  snake.body.head.data.mesh.material.color.set(snakeColor);
  
  mountain.mesh.material.color.set(mountainColor); 


  if (scoreEntity) {
    scoreEntity.material.color.set(scoreColor);
  } 
 

}



if (gui) {
	gui
		.addColor( 'groundColor').name('Ground color').onChange((val) => planeMaterial.color.set(val))

	gui
    .addColor( 'fogColor').name('Fog color').onChange((val) =>
     {
			scene.fog.color.set(val)
		
		})

    gui
		.addColor( 'backColor').name('Background color').onChange((val) => {
			scene.background.color.set(val)
		})


	gui
		.addColor( 'rockColor').name('Rock color').onChange((val) => {
			entities
				.find((entity) => entity instanceof Rock)
				?.mesh.material.color.set(val)
		})

	gui
		.addColor( 'treeColor').name('Tree color').onChange((val) => {
			entities
				.find((entity) => entity instanceof Tree)
				?.mesh.material.color.set(val)
		})

	gui
		.addColor( 'candyColor').name('Candy color')
    .onChange((val) => {
			candies[0].mesh.material.color.set(val)
		})

	gui
		.addColor( 'snakeColor').name('Snake color').onChange((val) => {
			snake.body.head.data.mesh.material.color.set(val)
		})

    gui.addColor( 'mountainColor').name('Mountain color')
    ?.mesh.material.color.set(val)
  
    

   
   gui
  .addColor('scoreColor').name('Score color') .onChange((val) => {
    if (scoreEntity) {
      scoreEntity.material.color.set(val); 
    }
  });

    
  }


//console.log(THREE);


// Create a new Scene object using the THREE.js library
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);

//add fog to mix sky and eath
scene.fog = new THREE.Fog(0x87CEEB, 18, 50 ); //near and far. Più indietro vado con la scena, più la nebbia mi ricopre la scena

const resolution = new THREE.Vector2(20, 20); // x and y


// Camera prospettica
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};


const fov = 70; //avvicinammento o meno alla scena
const camera = new THREE.PerspectiveCamera(fov, size.width / size.height, 0.1, 100);
camera.position.set( 6 + resolution.x / 2 + 4, resolution.x / 2 + 1, resolution.y + 7);
camera.lookAt(new THREE.Vector3(0, 2.5, 0));



// Assi
/* const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper); 
*/

// Creating the WebGL renderer
const renderer = new THREE.WebGLRenderer({
  antialias: window.devicePixelRatio < 2,   //improves image quality by reducing edge swelling
  logarithmicDepthBuffer: true,
});


// Setting the renderer size
renderer.setSize(size.width, size.height);

// Adding renderer to HTML document
document.body.appendChild(renderer.domElement); //an HTML <canvas> element specifically created and handled by the Three.js WebGL renderer to display the 3D scene
handleResize(); 

// Resolution update function
function updateResolution() {
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  //Update the camera aspect ratio
  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();

  // Update renderer size
  renderer.setSize(size.width, size.height);
}

// Function that manages window resizing
function handleResize() {

// Calculate the pixel ratio, limiting it to a maximum of 2 for Retina displays
const pixelRatio = Math.min(window.devicePixelRatio, 2);

  // Sets the pixel ratio of the WebGL renderer
  renderer.setPixelRatio(pixelRatio);

  //Update the WebGL renderer size with the new window size
  updateResolution();
}
//listener for the window resize event
window.addEventListener('resize', handleResize, updateResolution());



//adjustment of colors and shadows to adapt them to the pc 
renderer.toneMapping= THREE.ACESFilmicToneMapping; //standard to improve the visual appearance and image fidelity, especially in high contrast scenarios
renderer.toneMappingExposure = 1.2;
renderer.shadowMap.enabled = true; //abilito le ombre
renderer.shadowMap.type = THREE.VSMShadowMap; //sfumare bene l'ombra


// GRID
const gridHelper = new THREE.GridHelper(
	resolution.x,
	resolution.y,
	0xffffff,
	0xffffff
); 

gridHelper.position.set(resolution.x / 2 - 0.5, -0.49, resolution.y / 2 - 0.5);
gridHelper.material.transparent = true;
gridHelper.material.opacity = 0.1;
scene.add(gridHelper);

const planeGeometry = new THREE.PlaneGeometry(
  resolution.x * 50,  
  resolution.y * 50,
); 

planeGeometry.rotateX(-Math.PI * 0.5);


const planeMaterial = new THREE.MeshPhysicalMaterial({
  color: 0x87CEEB,
  roughness: 0.1, // Bassa roughness per una superficie levigata ma non perfettamente riflettente
  metalness: 0.5, // Metalness moderata per riflessioni metalliche
  transmission: 0.8, // Trasmissione moderata per rifrazioni attraverso il materiale
  clearcoat: 0.5, // Spessore del rivestimento trasparente
  clearcoatRoughness: 0.1, // Rugosità del rivestimento trasparente
  reflectivity: 0.8, // Riflettività del materiale
});


//const planeMaterial = new THREE.MeshBasicMaterial({wireframe: true}); //con wireframe tolgo lo sfondo della base
const plane = new THREE.Mesh(planeGeometry, planeMaterial);

//in questo modo il centro del cubo corrisponde con il centro del quadratino della griglia
plane.position.x = resolution.x / 2 - 0.5;
plane.position.z = resolution.y / 2 - 0.5;

//abbasso il terreno
plane.position.y = -0.5;

plane.receiveShadow = true;


scene.add(plane);

//create Snake
const snake = new Snake({ scene, resolution});

// Add snake update listener
snake.addEventListener('updated', function() {
  
  // constrolla le self collision
	if (snake.checkSelfCollision() || snake.checkEntitiesCollision(entities)) {
		snake.die()
		resetGame()
	}

	// controllo se mangia
	const headIndex = snake.indexes.at(-1);
	const candyIndex = candies.findIndex(
		(candy) => candy.getIndexByCoord() === headIndex
	); 
	// console.log(headIndex, candyIndex)
	if (candyIndex >= 0) {
		const candy = candies[candyIndex]; 
		scene.remove(candy.mesh); 
		candies.splice(candyIndex, 1); //remove only one elemet from arrat candy
		snake.body.head.data.candy = candy; 
		addCandy(); 
		score += candy.points; 
		// console.log(candies)
		printScore(); 

    
	}
})


let scoreEntity; 
let score = 0;

function printScore() {
  if (!font) {
    return;
  }

 
  if (scoreEntity) {
    scene.remove(scoreEntity);

    //use 'dispose' causes the release of all memory resources used by the material itself
    //avoid long-term memory loss
    scoreEntity.geometry.dispose(); 
    scoreEntity.material.dispose();
  }

  //SCORE
  const geometry = new TextGeometry(`${score}`, { //$ value to see
    font: font,
    size: 4,
    height: 1,
    curveSegments: 10,
    bevelEnabled: true, //smusso, si attivano i comandi di sotto
    bevelThickness: 0, //profondità rispetto al testo princiapale
    bevelSize: 0.1, //quando il testo si estenda oltre il testo princiaple
    bevelOffset: 0, //spostamento del bevel rispetto al testo principale lungo l'asse Y
    bevelSegments: 10, //Il numero di segmenti utilizzati per creare il bevel. Più segmenti producono un bevel più liscio.
  });
  geometry.center();

  const material = new THREE.MeshStandardMaterial({  
  color: selectedPalette.scoreColor,     
  roughness: 0.2, // Meno ruvido per riflessi più evidenti
  metalness: 2.5, // Più metallico per riflessi realistici
  clearcoat: 1.0, // Aggiunge uno strato di lucentezza
  clearcoatRoughness: 0.1 
});
  const mesh = new THREE.Mesh(geometry, material);
    
  mesh.position.x = resolution.x / 2 - 0.5;
  mesh.position.z = -1;
  mesh.position.y = 4;

  mesh.castShadow = true;
  
  scoreEntity = mesh;

  scene.add(scoreEntity);


  // Animazione GSAP
  scoreEntity= gsap.to(mesh.scale, {
    x: 2, // Scala fino al 120%
    y: -1.2,
    z: 1.2,
    duration: 0.5, // Durata dell'animazione in secondi
    ease: 'power2.out', // Funzione di easing
    yoyo: true, // effetto di rimbalzo
    repeat: 3, // triplo effetto di rimbalzo
    
    //once the previous animation is finished
    onComplete: function() {
      // Rimuovi il punteggio precedente dalla scena
      if (scoreEntity) {
        scene.remove(scoreEntity);
      }
      // Aggiorna il punteggio attuale
      scoreEntity = mesh;
    }
  });
}




//keyboard
window.addEventListener('keyup', function(e){
  //console.log(e)
  const keyCode = e.code

  if (keyCode === 'Space'){
    
      !isRunning ? startGame() : stopGame()

  }

  snake.setDirection (keyCode); 
})

let isRunning = false; 
let intervalId = null;
let updateInterval = 300; // Intervallo iniziale di aggiornamento del serpente 

function startGame(){

    if (!isRunning) {
      // Avvia il gioco se non è già in esecuzione
      isRunning = true;

      // Aggiornamento del serpente con l'intervallo corrente
      intervalId = setInterval(() => {
          snake.update();
      }, updateInterval);

  } else {
      // Metti in pausa il gioco se è già in esecuzione
      stopGame();
  }
}

  function stopGame() {
    clearInterval(intervalId);
    isRunning = false;
}

function resetGame() {
  stopGame(); //premere spazio per ripartire
  
  score = 0; // Resetta il punteggio a zero
  printScore(); 


  //pop() consente di rimuovere l'ultimo elemento dall'array e restituirlo
  let candy = candies.pop(); 

  while(candy){
    scene.remove(candy.mesh);
    candy = candies.pop();
  }

  let entity = entities.pop();
  while(entity){
    scene.remove(entity.mesh);
    entity = entities.pop();
  }

  //aggiungo la candy dopo che restarto il gioco
  addCandy();
  generateEntities();

}

const candies = [];
const entities = []; //alberi e rocce

// Add candy
  function addCandy() {
  const candy = new Candy(resolution);

  let index = getFreeIndex();

  candy.mesh.position.x = index % resolution.x;
  candy.mesh.position.z = Math.floor(index / resolution.x );


  candies.push(candy);

  scene.add(candy.mesh);
}
addCandy();

function getFreeIndex(){
  let index;

  let candyIndexes = candies.map((candy)=> candy.getIndexByCoord() );

  let entityIndexes = entities.map((entity)=> entity.getIndexByCoord() );


  do{
    index= Math.floor(Math.random() * resolution.x * resolution.y); 

  }while (snake.indexes.includes(index) || candyIndexes.includes(index) || entityIndexes.includes(index)); 
  
    return index; 
}

function addEntity() {
	const entity =
		Math.random() > 0.5
			? new Rock(resolution)
			: new Tree(resolution)

	let index = getFreeIndex(); 

	entity.mesh.position.x = index % resolution.x;
	entity.mesh.position.z = Math.floor(index / resolution.x);

	entities.push(entity);

	// console.log(index, entity.getIndexByCoord())

	scene.add(entity.mesh);
}

function generateEntities(){
  for(let i = 0; i<15; i++){
    addEntity()
  }

  gsap.from(
		entities.map((entity) => entity.mesh.scale),
		{
			x: 0,
			y: 0,
			z: 0,
			duration: 1,
			ease: 'elastic.out(1.5, 0.5)',
			stagger: {
				grid: [20, 20],
				amount: 0.7,
			},
		}
	)

}
generateEntities();


// Aggiungi la neve
const snow = new Snow (scene, resolution);

function animate() {
  requestAnimationFrame(animate);

  // Aggiorna la posizione dei fiocchi di neve
  snow.animate();

  renderer.render(scene, camera);
}

animate();



function toggleSnow() {
  const snowImage = document.getElementById("snowImage");
  const isSnowActive = snowImage.classList.contains("snowImage");

  if (!isSnowActive) {
      snowImage.classList.add("snowImage");
      snow.show();
      updateInterval = 130; 
  } else {
      snowImage.classList.remove("snowImage");
      snow.hide(); // Nasconde immediatamente la neve
      updateInterval = 300; 

    
  }

  if (isRunning) {
    clearInterval(intervalId);
    intervalId = setInterval(() => {
        snake.update();
    }, updateInterval);
}
}



document.addEventListener('DOMContentLoaded', function() {
  const snowImage = document.getElementById('snowImage');

  snowImage.addEventListener('click', function() {
    toggleSnow();
  });
});




//LUCI, senza le quali il materiale sarebbe nero
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); //bianca
const dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
dirLight.position.set(20, 20, 20 );

//centrale
dirLight.target.position.set(resolution.x, 0, resolution.y);


//sfocatura ombra
dirLight.shadow.mapSize.set(2048, 2048); //più precisa, se la voglio meno precisa (dettagliata) diminuisco
dirLight.shadow.radius = 6; //sfocarle
dirLight.shadow.blurSamples = 20; //amalgamo il tutto


//fascio proiezione luce
dirLight.shadow.camera.top =30;
dirLight.shadow.camera.bottom = -30;
dirLight.shadow.camera.left = -30;
dirLight.shadow.camera.right = 30;

dirLight.castShadow = true;

scene.add(ambientLight, dirLight);

// Orbit Control
//rotazione finstra
const controls = new OrbitControls(camera, renderer.domElement);

//zoom
controls.enableZoom = true;
controls.zoomSpeed = 1.2; 

//pan (spostamento laterale)
controls.enablePan = false;

//target which represents the point towards which the camera is oriented. 
controls.target.set(resolution.x / 2 + 4, 0, resolution.y / 2 + 4);




// render loop--> managing scene updating and continuous rendering to create smooth, interactive animations
function tic() {
  controls.update();
 
  renderer.render(scene, camera);
  requestAnimationFrame(tic);
}

requestAnimationFrame(tic);



//DECORATIVE MOUNTAIN
const mountainData = [
    new THREE.Vector4(-5, 0, 10, 1),
    new THREE.Vector4(-6, 0, 15, 1.2),
    new THREE.Vector4(-5, 0, 16, 0.8),
    new THREE.Vector4(-10, 0, 4, 1.3),
    new THREE.Vector4(-5, 0, -3, 2),
    new THREE.Vector4(-4, 0, -4, 1.5),
    new THREE.Vector4(-2, 0, -15, 1),
    new THREE.Vector4(5, 0, -20, 1.2),
    new THREE.Vector4(24, 0, -12, 1.2),
    new THREE.Vector4(2, 0, -6, 1.2),
    new THREE.Vector4(3, 0, -7, 1.8),
    new THREE.Vector4(1, 0, -9, 1.0),
    new THREE.Vector4(15, 0, -8, 1.8),
    new THREE.Vector4(17, 0, -9, 1.1),
    new THREE.Vector4(18, 0, -7, 1.3),
    new THREE.Vector4(24, 0, -1, 1.3),
    new THREE.Vector4(26, 0, 0, 1.8),
    new THREE.Vector4(22, 0, 0, 1),
    new THREE.Vector4(28, 0, 6, 1.7),
    new THREE.Vector4(24, 0, 15, 1.1),
    new THREE.Vector4(16, 0, 23, 1.1),
    new THREE.Vector4(12, 0, 24, 0.9),
    new THREE.Vector4(16, 0, 24, 0.9),
    new THREE.Vector4(-10, 0, -10, 0.7),
    new THREE.Vector4(-13, 0, -13, 0.7),
    new THREE.Vector4(-8, 0, 20, 1.5),

  ]
const mountain = new Mountain(resolution);

mountainData.forEach(({ x, y, z, w }) => {
  const clone = mountain.mesh.clone();
  clone.position.set(x, y, z);
  clone.scale.setScalar(0);
  scene.add(clone);

  console.log(mountain)

  gsap.to(clone.scale, {
    x: w, // Scala x alla larghezza desiderata
    y: w, // Scala y alla larghezza desiderata
    z: w, // Scala z alla larghezza desiderata
    duration: 1, // Durata dell'animazione in secondi
    ease: 'power2.out', //  easing dell'animazione
    delay: Math.random(), // Ritardo casuale per creare un effetto di sequenza
});
});



const image = document.querySelector('.image')
const posItems = document.querySelectorAll('.item')


//elementi posItems inizialmente fuori dallo schermo (y: -200) e completamente trasparenti (autoAlpha: 0)
gsap.set(posItems, { y: -200, autoAlpha: 0 })


// Animo l'elemento 'image' per renderlo visibile con un'opacità di 1 e un ritardo di 0.3 secondi
gsap.to(image, {
	opacity: 1,
	delay: 0.3,

  // Quando l'animazione di 'image' è completata, proseguo co ìn quello sotto
	onComplete: () => {

    // Anima gli elementi posItems per farli tornare alla posizione iniziale (y: 0) e renderli completamente visibili (autoAlpha: 1)
		gsap.to(posItems, {
			duration: 1,
			y: 0,
			autoAlpha: 1,	
		})
	},
})
 



const paletteSelectors = document.querySelectorAll('[data-color]')
paletteSelectors.forEach((selector) =>
	selector.addEventListener('click', function () {
		const paletteName = this.dataset.color
		applyPalette(paletteName)
    
	})
)

//START-STOP
document.addEventListener('DOMContentLoaded', function () {
  const startButton = document.getElementById('startButton');
  startButton.addEventListener('click', startGame);
});

document.addEventListener('DOMContentLoaded', function (){
  // Aggiungi qui la logica per avviare il gioco
  const startButton = document.getElementById('stopButton');
  startButton.addEventListener('click', startGame);
}); 

document.addEventListener('DOMContentLoaded', function() {
  // Seleziona l'elemento principale della pagina (per esempio il body)
  const mainElement = document.querySelector('body');

  // Applica un effetto di entrata all'elemento principale della pagina
  gsap.from(mainElement, {
      opacity: 0,
      duration: 3, // Durata dell'animazione in secondi
      ease: 'power1.inOut' // Easing per una transizione fluida
  });
});






//ISTRUZIONI GIOCO 

function goToIstruction() {
  // Crea un elemento div per il pop-up
  var popup = document.createElement('div');
  popup.id = 'istruPopup'; // Aggiungi un id per il pop-up
  popup.style.width = 'auto';
  popup.style.height = 'auto';
  popup.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
  popup.style.border = '5px solid lightblue';
  popup.style.opacity = '0';
  popup.style.borderRadius = '50px';

  // Centra il pop-up orizzontalmente
  popup.style.position = 'fixed';
  popup.style.left = '50%';
  popup.style.top = '50%';
  popup.style.transform = 'translate(-50%, -50%)';
  popup.style.padding = '20px';
  popup.style.textAlign = 'center';
  popup.style.transition = 'opacity 0.3s ease-in';

  // Aggiungi il contenuto al pop-up
  popup.innerHTML = `
  
      <h2>Instructions</h2>
      <p>Pause/Play = start and stop the game (you can also click 'space' in the keyboard )</p>
      <p>Snow = the snake's speed increases</p>
      <p>Home = return to the home page</p>
      <p>Volume = enable/disable audio</p>
      <p>If you click on the colors (blue, fuchsia, orange) it will change color</p>
      <p>Use the keyboard arrows to move the snake</p>
      <button id="closePopUp">Chiudi</button>
  `;
  
  // Aggiungi il pop-up alla pagina
  document.body.appendChild(popup);
  
  // Triggers a reflow, flushing the CSS changes to enable the transition
  popup.offsetHeight;
  
  // Gradualmente aumenta l'opacità per mostrare il pop-up
  popup.style.opacity = '1';
  
  // Aggiungi evento di chiusura al bottone di chiusura
  var closeBtn = document.getElementById('closePopUp');
  closeBtn.addEventListener('click', function() {
      popup.style.opacity = '0'; // Gradualmente riduce l'opacità per nascondere il pop-up
      setTimeout(function() {
          if (popup.parentNode) {
              popup.parentNode.removeChild(popup); // Rimuovi il pop-up dalla pagina dopo l'animazione
          }
      }, 300); // Tempo corrispondente alla durata della transizione
  });
}

document.addEventListener('DOMContentLoaded', function () {
  // Aggiungi l'evento per aprire il popup quando l'utente clicca sull'immagine con id 'istru'
  const istruImg = document.getElementById('istru');
  istruImg.addEventListener('click', goToIstruction);
});


