// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)

var width = 790;
var height = 400;
var gameSpeed = 200;
var gameGravity = 500;
var jumpPower = -250;
var gapSize = 150;
var gapMargin = 50;
var blockHeight = 50;



var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);

var score = 0;

var player;


var labelScore;

var pipes = [];
var balloons =[];
var weight =[];
/*
 * Loads all resources for the game and gives them names.
 */
function start(){
  game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
  .onDown.add(spaceHandler);

  game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
  .onDown.add(moveRight);

  game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
  .onDown.add(moveLeft);

  game.input.keyboard.addKey(Phaser.Keyboard.UP)
  .onDown.add(moveUp);

  game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
  .onDown.add(moveDown);

generate();
player.body.velocity.x = 0;
player.body.gravity.y = gameGravity;

var pipeInterval = 1.5 * Phaser.Timer.SECOND;
game.time.events.loop(
  pipeInterval,
  generate
);

var timeToFirstPipe = 2 * Phaser.Timer.SECOND;
game.time.events.add(
  timeToFirstPipe,
  function() {
    game.time.events.loop(
      pipeInterval,
      changeScore
    );
  }
);

}



function preload() {
  game.load.image("playerImg", "assets/flappybirdappicon.gif");
  game.load.image("spriteImg", "assets/mariosprite.png");
  game.load.audio("score", "assets/point.ogg");



  game.load.image("pipeBlock","assets/football.png");
  game.load.image("backgroundImg", "assets/background.jpg");

  game.load.image("balloons","assets/balloons.png");
  game.load.image("weight", "assets/weight.png");


}

/*
 * Initialises the game. This function is only called once.
 */

function create() {
  var backGround = game.add.image(0, 0, "backgroundImg");
  backGround.width = 790;
  backGround.height = 400;

  /*game.add.text(
    429, 19,
    "Hi, this is my version of Flappy Bird",
    {font: "20px Comic Sans MS", fill: "#000080"});
    */

    labelScore = game.add.text(20, 20, "0");

//corner one

  var playerSprite = game.add.sprite(17, 325, "playerImg");
  playerSprite.width = 60;
  playerSprite.height = 60;

  game.input.onDown.add(clickHandler);


  //alert(score);


  player = game.add.sprite(100, 200, "spriteImg");
  player.height = 80;
  player.width = 50;



  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.enable(player);

  player.anchor.setTo(0.5, 0.5);
  game.input.keyboard.addKey(Phaser.Keyboard.ENTER)
  .onDown.add(start);
}


/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
  game.physics.arcade.overlap(
    player,
    pipes, gameOver);

    if(player.body.y < 0) {
      gameOver();
    }

    if (player.body.y > 400){
      gameOver();
    }
  //  changeScore
  player.rotation += 1;
  player.rotation = Math.atan(player.body.velocity.y / 200);
  for(var i = balloons.length - 1; i >= 0; i--){

game.physics.arcade.overlap(player, balloons[i], function(){

          // We need to do something here!
  changeGravity(-50);
  balloons[i].destroy();
  balloons.splice(i, 1); });

}
for(var i = weight.length - 1; i >= 0; i--) {
  game.physics.arcade.overlap(player, weight[i], function(){

      changeGravity(-50);
      weight[i].destroy();
      weight.splice(i, 1); });



    }
}

function gameOver() {
  //alert("haha u lost");

  //addScore(score);
  score = 0;
  game.state.restart();
  //location.reload();
  gameGravity = 500;
}



function clickHandler(event) {
var playerSprite = game.add.sprite(event.x-25, event.y-25, "playerImg");
playerSprite.width = 10;
playerSprite.height = 10;
}

  //alert("You just clicked in the position: " + event.x + " , " + event.y);

function spaceHandler() {
  game.sound.play("score");
  player.body.velocity.y = jumpPower;
}

function changeScore() {
  score = score + 1;
  labelScore.text = score;
}

function moveRight() {
  player.x = player.x +10;
}

function moveLeft() {
  player.x = player.x -10;
}

function moveUp() {
  player.y = player.y -10;
}

function  moveDown() {
  player.y = player.y +10;
}

function generatePipe() {

  var gap = game.rnd.integerInRange(1 ,5);
  var gapStart = game.rnd.integerInRange(gapMargin, height - gapSize - gapMargin);

    for(var y = gapStart; y > 0; y -= blockHeight){
        addPipeBlock(width, y - blockHeight);
    }
    for(y = gapStart + gapSize; y < height; y += blockHeight) {
        addPipeBlock(width, y);
    }
    //  changeScore();


  }

function addPipeBlock(x, y) {
  var pipeBlock = game.add.sprite(x,y,"pipeBlock");
  pipeBlock.scale.setTo(0.05, 0.05);
  pipes.push(pipeBlock);
  game.physics.arcade.enable(pipeBlock);
  pipeBlock.body.velocity.x = -200;
}
function changeGravity(g) {
    gameGravity += g;
    player.body.gravity.y = gameGravity;
}
function generateBalloons(){
    var bonus = game.add.sprite(width, height, "balloons");
    balloons.push(bonus);
    game.physics.arcade.enable(bonus);
    bonus.body.velocity.x = - 200;
    bonus.body.velocity.y = - game.rnd.integerInRange(60, 100);
}
function generateWeight(){
    var bonus = game.add.sprite(width, 0, "weight");
    weight.push(bonus);
    game.physics.arcade.enable(bonus);
    bonus.body.velocity.x = - 200;
    bonus.body.velocity.y =  game.rnd.integerInRange(60, 100);
  }
function generate() {
    var diceRoll = game.rnd.integerInRange(1, 10);
    console.log(diceRoll);
    if(diceRoll==1) {
        generateBalloons();
    } else if(diceRoll==2) {
        generateWeight();
    } else {
        generatePipe();
    }

}
