import { gsap } from "gsap";

// TITOLO
function animateTitle() {
    const title = document.getElementById('snakeTitle');

    gsap.from(title, {
        opacity: 0,
        y: -50,
        scale: 0.5,
        rotation: -360,
        duration: 3,
        ease: 'elastic.out(1, 0.5)' //effetto di elasticità
    });

    // secondo effetto dopo il primo completamento
    gsap.to(title, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 3,
        ease: 'back.out(1.4)' // Effetto di ritorno con uno scatto extra
    });
}


//FLOWER
function animateFlowers() {
    gsap.from(".blueFlower", { duration: 2, rotation: 360, opacity: 0, y: -200, ease: "bounce", delay: 0.2 });
    gsap.from(".fucsiaFlower", { duration: 2, rotation: 360, opacity: 0, y: -200, ease: "bounce", delay: 0.4 });
    gsap.from(".redFlower", { duration: 2, rotation: 360, opacity: 0, y: -200, ease: "bounce", delay: 0.6 });
    gsap.from(".greenFlower", { duration: 2, rotation: 360, opacity: 0, y: -200, ease: "bounce", delay: 0.8 });
}

// SCALE SNAKE
function animateSnakeImage() {
    const snakeImage = document.getElementById('snakeImage');

    gsap.from(snakeImage, {
        opacity: 0,         // Inizia con opacità 0
        scale: 0.5,         // Inizia con metà della dimensione
        rotation: -180,     // Rotazione iniziale di -180 gradi
        duration: 1.5,      
        ease: 'back.out(1.7)'  // Tipo di easing con effetto di rimbalzo
    });

    // Animazione al passaggio del mouse
    snakeImage.addEventListener('mouseover', () => {
        gsap.to(snakeImage, { scale: 1.3, duration: 0.5, ease: "power1.inOut" });
    });

    // Animazione quando il mouse esce dall'immagine
    snakeImage.addEventListener('mouseout', () => {
        gsap.to(snakeImage, { scale: 1, duration: 0.5, ease: "power1.inOut" });
    });
}

// SCALE FLOWER
function animateFlowerHover() {
    const flowers = document.querySelectorAll('.blueFlower, .fucsiaFlower, .redFlower, .greenFlower');

    flowers.forEach(flower => {
        flower.addEventListener('mouseover', () => {
            gsap.to(flower, { 
                scale: 1.5,             // Ingrandimento
                rotation: '+=360',      // Rotazione di 360 gradi
                duration: 0.5,          
                ease: "power1.inOut"    // Easing per una transizione fluida
            });
        });

        flower.addEventListener('mouseout', () => {
            gsap.to(flower, { 
                scale: 1,               // Ripristina la dimensione originale
                rotation: '+=360',      // Continua a ruotare di altri 360 gradi
                duration: 0.5,          
                ease: "power1.inOut"    
            });
        });
    });
}




document.addEventListener("DOMContentLoaded", function() {
    
    var audio = document.getElementById('audio');
    var volumButton = document.getElementById('volumButtom');

    volumButton.addEventListener('click', function() {
        if (audio.paused) {
            // Se l'audio è in pausa, riprendi la riproduzione
            audio.play();
        } else {
            // Se l'audio è in riproduzione, metti in pausa
            audio.pause();
        }
    });
});


function animateVolum() {
    const volumButtom = document.getElementById('volumButtom');

    gsap.from(volumButtom, {
        opacity: 0,        
        duration: 1.5,      
        ease: 'power1.inOut' // Easing -->transizione più fluida
    });
}

function animateInfo() {
    const info = document.getElementById('info');

    gsap.from(info, {
        opacity: 0,     
        duration: 1.5,      
        ease: 'power1.inOut' 
    });
}


function animateStartHome() {
    const startHome = document.getElementById('startHome');

    gsap.from(startHome, {
        opacity: 0,        
        duration: 1.5,      
        ease: 'power1.inOut' 
    });


       // Animazione al passaggio del mouse
       startHome.addEventListener('mouseover', () => {
        gsap.to(startHome, { scale: 1.3, duration: 0.5, ease: "power1.inOut" });
    });

    // Animazione quando il mouse esce dall'immagine
    startHome.addEventListener('mouseout', () => {
        gsap.to(startHome, { scale: 1, duration: 0.5, ease: "power1.inOut" });
    });

    
}

// Chiamata alle funzioni di animazione quando la pagina è caricata
window.onload = function() {
    animateTitle();
    animateFlowers();
    animateSnakeImage();
    animateFlowerHover();
    animateStartHome();
    animateVolum();
    animateInfo();  
    

};



function goToIndexPage() {
    // Effetto di uscita all'elemento principale
    gsap.to('body', {
        opacity: 0,
        duration: 2, 
        ease: 'power1.inOut', 
        onComplete: function() {
            // Una volta completata l'animazione, cambia la pagina to game.html
            window.location.href = "game.html";
        }
    });
}


document.addEventListener('DOMContentLoaded', function () {
    const startHome = document.getElementById('startHome');
    startHome.addEventListener('click', goToIndexPage);
  });


  //POPUP
  function goToPopUp() {
    //elemento div per il pop-up
    var popup = document.createElement('div');
    popup.id = 'popup';
    popup.style.width = 'auto'; 
    popup.style.height = 'auto'; 
    popup.style.backgroundColor = '#ffffff'; 
    popup.style.border = '5px solid lightblue'; 
    popup.style.opacity = '0'; 
    popup.style.borderRadius = '50px'; 


    //pop-up orizzontale
    popup.style.position = 'fixed';
    popup.style.left = '50%';
    popup.style.top = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.padding = '20px';
    popup.style.textAlign = 'center';
    popup.style.transition = 'opacity 0.3s ease-in'; //transizione per l'opacità



    popup.innerHTML = `
        <h2>Developed by:</h2>
        <h3>Chiara Segretario</h3>
        <p>Engineering in Computer Science</p>
        <p>2023/2024</p>
        <p>"Sapienza" University of Rome</p>
        <button id="closePopUp">CLOSE</button>
    `;
    
    // add pop-up alla pagina
    document.body.appendChild(popup);
    
    // Triggers a reflow, flushing the CSS changes of the pop-up
    popup.offsetHeight;
    
    popup.style.opacity = '1';
    
    //CLOSE
    var closeBtn = document.getElementById('closePopUp');
    closeBtn.addEventListener('click', function() {
        popup.style.opacity = '0'; // Gradualmente riduce l'opacità per nascondere il pop-up
        setTimeout(function() {
            if (popup.parentNode) {
                popup.parentNode.removeChild(popup);
            }
        }, 300); // Tempo corrispondente alla durata della transizione
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const info = document.getElementById('info');
    info.addEventListener('click', goToPopUp);
});
