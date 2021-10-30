const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

//variavel irá ser usada para evitar saltos duplos
let isAlreadyJumping = false;

//Posição inicial do dinosauro
let position = 0;

function pressSpaceBar(event) {
    //Quando a barra de espaço for pressionada
    if(event.keyCode === 32) {
        if(!isAlreadyJumping){
            jump();
        }
    }
}

function jump() {
    //posição inicial do dino
    
    //trocando o valo de isAlreadyJumping
    isAlreadyJumping = true;

    let upInterval = setInterval(() => {
        if(position >= 150) {
            //responsável por limitar o salto do dino
            clearInterval(upInterval);
            
            //Responsável pela descima do dino após o pulo
            let downInterval = setInterval(() =>{
                if(position <= 0) {
                    //limita a descida do dinosauro
                    clearInterval(downInterval);
                    
                    //quando ele descer o isAlreadyJumping volta a ser falso
                    isAlreadyJumping = false;
                    
                } else {
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 20); //código será executado a cada 20 ms
            
        } else {
            //ir pra cima quando pular
            position += 20;
            dino.style.bottom = position + 'px';
        }        
    }, 20); //código será executado a cada 20 ms
}


function createCactus() {
    //criando a div que conterá os cactus
    const cactus = document.createElement('div');
    let cactusPosition = 1000;

    //aleatoriedade de aparecimento do cactus
    let randomCactusTime = Math.random() * 6000;
    
    //adicionando sua classe
    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';    
    background.appendChild(cactus); //adicionando o cactu no background

    //movimento cactus
    let leftInterval = setInterval(() => {
        if(cactusPosition < -60) {
            //removendo o cactu após sair da tela
            clearInterval(leftInterval);
            background.removeChild(cactus);

        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            //game over
            clearInterval(leftInterval);
            document.body.innerHTML = `<h1 class="game-over">GAME OVER</h1> `
        } else { //else pro cactu continuar aparecendo
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

    //responsável por chamar a  createCactus novamente de maneira aleatoria
    setTimeout(createCactus, randomCactusTime)
}

createCactus();
document.addEventListener('keyup',pressSpaceBar);