// the selector give me the first class with my-floppy name
    const myCanvas = document.querySelector(".my-floppy"); 
    const ctx = myCanvas.getContext("2d");
    console.log("heee");


// create the constructor

// Game constructor
const Game = function(){  
    this.floppy= {}; // object
    this.obstacles = [] ;
    }

// floppy bird 
const Floppy = function (){
    this.x = 0;
    this.y = 220;
    this.width = 50;
    this.height = 50;
    this.isCrash = false;
    this.image = './images/bird.png';

    }

// using prototype helps to practice
Floppy.prototype.draw= function(){
   // console.log("this outside ",this); //(2)
    const floppyImag = new Image();
    floppyImag.src = this.image; //right now I am not looping 
            // I need to load the image
            //*********************************************************** */
            //  --------------------OLD FASHION ----------------------
            // since we have 2 function scope, the keyword "this" will belong to different scopes inside each of the two function
            // our
            // way of solvin this is reassinging keyword "this" to "that" so it refers to the outer 

            //let that = this ; 
            //floppyImag.onload(){
            //    ctx.drawImage(floppyImag,that.x,that.y,that.width,that.height);
            // }
            //********************************************************** */
            //

    ctx.drawImage(floppyImag,this.x, this.y, this.width , this.height);
 }


Floppy.prototype.fly = function (somekeyCode){
          switch(somekeyCode){
                case 37: // left
                // x to belong to the floppy
                    this.x -= 10;
                    break;
                case 39: 
                    this.x +=10;
                    break;
                case 38:
                    this.y -=10;
                    break;
                case 40:
                    this.y +=10;
                    break;
            // the bird is not moving go to the 11 step
          }
    }

 // create obtacules 
function Obstacles(theX, theY, theWidht, theHeight){
        this.x = theX;
        this.y = theY;
        this.width = theWidht;
        this.height = theHeight;
        this.isTouch = false;
    }
Obstacles.prototype.drawObstacle= function (){
   if(currentGame.floppy.isCrash === false){
        this.x -=2;
        if(this.x < -this.width){
            this.x = 1000;
        }
    }

      if(this.isTouch){
        ctx.fillStyle ="yellow";

      }else {
           ctx.fillStyle ="greeen";
      }
       
        ctx.fillRect(this.x, this.y, this.width, this.height);
}
    
            //1 we   
            //  floppyImag.onload = () => {
                    
                //   console.log("inner this", this);
                // this need to refer to outside the function is not below to the scoope
                // this is refer to draw
                // I need to refere this to the image (1)
                //    ctx.drawImage(floppyImag,this.x, this.y, this.width , this.height);

            //  }

// my  global varialble
let currentGame;
let currentFloppy;

function startGame(){ ///start 
    // I instance the game
    currentGame = new Game(); // call the prototype
   // console.log("====" , currentGame);
    currentFloppy = new Floppy(); // I need to add this floppy to the game 
    currentGame.floppy= currentFloppy; // connect the instances (the constructor functions)
    //currentGame.Floppy.draw(); // inherence  (1) I move to 11
    
    // add obstacles
    currentGame.obstacles=[
        new Obstacles(650, 0, 30, 250),
        new Obstacles(800, 350, 30, 250),
        new Obstacles(970, 0, 30, 250),
        new Obstacles(1120, 0, 30, 250),
        new Obstacles(1127, 0, 30, 250)
     ];
     console.log("current",currentGame.obstacles);
    drawingLoop();
    }


document.onkeydown= function(event){
    currentGame.floppy.fly(event.keyCode);
    }


// 11 

function drawEverything(){  // here I have accesss to each individual object
    currentGame.floppy.draw(); // inherence  (1)
    currentGame.obstacles.forEach((oneObstacle) => {
    oneObstacle.drawObstacle();
    if(checkCollision(currentGame.floppy, oneObstacle)){
        currentGame.floppy.isCrash = true;
        oneObstacle.isTouch = true;
        gameOver();
        }
    }); 
   
    }


function drawingLoop(){
    ctx.clearRect(0, 0, 1000, 1000);
    drawEverything();  //
    requestAnimationFrame(function(){ //thi is a loop that is clear and drawing everytime
    drawingLoop();
    });
    }

function checkCollision(obj1,obj2){
    // call the object 
    return obj1.y + obj1.height - 10 >= obj2.y
    && obj1.y <= obj2.y + obj2.height
    && obj1.x + obj1.width - 10 >= obj2.x
    && obj1.x <= obj2.x + obj2.width
}

function gameOver(){
    ctx.font = "bold 70px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("GAME OVER", 420,220);
}

startGame(); 

// draw functin 