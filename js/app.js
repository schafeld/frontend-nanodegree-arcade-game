var canvasWidth = 505;                  // TODO: make canvas size configurable
var enemyPosY  = [20, 100, 180];        // number of possible bug positions
var enemySpeed = [20, 40, 60, 80, 100, 120]; // possible speed of enemies
var numberEnemies = 6;                  // total number of enemies
var enemy;
var allEnemies = [];
var i = 0;
var playerInitialX = 200;
var playerInitialY = 370;
var playerStepSize = 30;

var Score = function () {
  this.victory = 1;
  this.defeat  = 1;
};

Score.prototype.addVictory = function () {
  document.getElementById("victory").textContent = (this.victory++).toString();
};

Score.prototype.addDefeat = function () {
  document.getElementById("defeat").textContent = (this.defeat++).toString();
};

var score = new Score();

// Enemies our player must avoid
var Enemy = function () {
  // Variables applied to each instance
  // enemy graphic, x-/y-position, and speed
  this.sprite = 'images/enemy-bug.png';
  this.x = -100;
  this.y = enemyPosY[Math.floor(Math.random() * enemyPosY.length)];
  this.speed = enemySpeed[Math.floor(Math.random() * enemySpeed.length)];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x = this.x + (this.speed * dt);
  if (this.x > canvasWidth) {
    this.x = -100;
    this.y = enemyPosY[Math.floor(Math.random() * enemyPosY.length)];
    this.speed = enemySpeed[Math.floor(Math.random() * enemySpeed.length)];
    if (this.y > 220) {
      this.y = 60;
    }
  }
  // collision with bug-enemies means defeat
  if ((Math.abs(this.x - player.x) < 80) && (Math.abs(this.y - player.y) < 60)) {
    player.reset();
    score.addDefeat();
  }
};

// Draw the enemy on the screen
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
  // which image to render player
  this.playerImg = 'images/char-boy.png';
  // TODO: random boy/girl character or allow pick
  // this.sprite = 'images/char-pink-girl.png';
  // initial placement of player image
  this.x = playerInitialX;
  this.y = playerInitialY;
};

Player.prototype.update = function () {
  switch (this.keyPressed) {
  case "up":
    this.y -= playerStepSize;
    break;
  case "right":
    this.x += playerStepSize;
    break;
  case "down":
    this.y += playerStepSize;
    break;
  case "left":
    this.x -= playerStepSize;
    break;
    // TODO: default action for fun like sleep "zzzz" if player idle?
  }

  this.keyPressed = "";

  // spatial boundaries for player
  // player position is reset if it touches upper boundary (water)
  // which counts as victory
  if (this.y < 20) {
    this.reset();
    // console.info("Splash!");
    score.addVictory();
    // TODO: Game Over screen? Player death?
  }

  // player bounces off lateral and lower boundaries
  if (this.x < 0) {
    this.x += playerStepSize;
  }
  if (this.x > canvasWidth - 95) {
    this.x -= playerStepSize;
  }
  if (this.y > playerInitialY + 10) {
    this.y -= playerStepSize;
  }

};

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.playerImg), this.x, this.y);
};

Player.prototype.handleInput = function (key) {
  // console.info(key + ", ");
  this.keyPressed = key;
};

// Reset / restart(?) game
// Move the player to initial position.
Player.prototype.reset = function () {
  this.x = playerInitialX;
  this.y = playerInitialY;
};


// Instantiation of game objects.
// numberEnemies defined at top sets total number of enemy objects.
for (i = 1; i < numberEnemies; i++) {
  enemy = new Enemy();
  allEnemies.push(enemy);
}
// the controllable player object
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
// Added key codes for a, d, s ,and w for left-handed players ;)
document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    65: 'left',     // a
    68: 'right',    // d
    83: 'down',     // s
    87: 'up'        // w
  };
  player.handleInput(allowedKeys[e.keyCode]);
});

// Do not scroll browser window on arrow keys pressed.
document.addEventListener('keydown', function (e) {
  if ([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault();
  }
}, false);
