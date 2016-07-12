// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);

var score = 0;

var player;


var labelScore;

var pipes = [];

score = -3;

/*
 * Loads all resources for the game and gives them names.
 */

function preload() {
  game.load.image("playerImg", "assets/flappybirdappicon.gif");
  game.load.image("spriteImg", "assets/mariosprite.png");
  game.load.audio("score", "assets/point.ogg");

  game.load.image("pipeBlock","assets/football.png");
  game.load.image("backgroundImg", "assets/background.jpg");
}

var pipeasdsad = game.add.sprite(0, 0 , "pipeBlock");
//pipeasdsad.scale.setTo(0.25, 0.25);

/*
 * Initialises the game. This function is only called once.
 */
backgroundImg.scale.setTo(0.5, 0.5);

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
  game.input
  .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
  .onDown.add(spaceHandler);


  //alert(score);

  game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
  .onDown.add(moveRight);

  game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
  .onDown.add(moveLeft);

  game.input.keyboard.addKey(Phaser.Keyboard.UP)
  .onDown.add(moveUp);

  game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
  .onDown.add(moveDown);


  player = game.add.sprite(100, 200, "spriteImg");
  player.height = 90;
  player.width = 60;

  generatePipe();

  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.enable(player);

  player.body.velocity.x = 0;
  player.body.gravity.y = 500;



  var pipeInterval = 1.5 * Phaser.Timer.SECOND;
  game.time.events.loop(
    pipeInterval,
    generatePipe
  );
}


/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
  game.physics.arcade.overlap(
    player,
    pipes, gameOver);
  //  changeScore();

}

function gameOver() {
  //alert("haha u lost");

  location.reload();
  //location.reload();
}

function clickHandler(event) {
var playerSprite = game.add.sprite(event.x-25, event.y-25, "playerImg");
playerSprite.width = 10;
playerSprite.height = 10;
}

  //alert("You just clicked in the position: " + event.x + " , " + event.y);

function spaceHandler() {
  game.sound.play("score");
  player.body.velocity.y = -250;
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

  for (count=0; count<8; count++) {
    if (count != gap && count != gap+1 &&  count != gap+2) {
      addPipeBlock(790, count * 50);
  //game.add.sprite(100, 50 * count, "pipeBlock");
    }
  }
  changeScore();

}

function addPipeBlock(x, y) {
  var pipeBlock = game.add.sprite(x,y,"pipeBlock");
  pipeBlock.scale.setTo(0.05, 0.05);
  pipes.push(pipeBlock);
  game.physics.arcade.enable(pipeBlock);
  pipeBlock.body.velocity.x = -200;
}
