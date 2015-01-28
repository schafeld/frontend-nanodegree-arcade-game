var canvasWidth = 505;
var enemyPosY  = [60, 140, 220];        // number of possible bug positions
var enemySpeed = [10,20,40,60];         // possible speed of enemies/bugs
var numberEnemies = 10;                 // total number of enemies
var enemy;
var allEnemies = [];
var i = 0;
var playerInitialX = 200;
var playerInitialY = 400;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.x = -100;
    this.y = enemyPosY[Math.floor(Math.random() * enemyPosY.length)];
    this.speed = enemySpeed[Math.floor(Math.random() * enemySpeed.length)];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);
    if (this.x > canvasWidth) {
        this.x = -100;
        this.y = enemyPosY[Math.floor(Math.random() * 3)];
        this.speed = enemySpeed[Math.floor(Math.random() * 2)];
        if (this.y > 220) {
            this.y = 60;
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // which image to render player
    this.playerImg = 'images/char-boy.png';
    // TODO: random boy/girl character or allow pick
    // this.sprite = 'images/char-pink-girl.png';
    
    // initial placement of player image
    this.x = playerInitialX;
    this.y = playerInitialY;
  
};

Player.prototype.update = function() {
    switch (this.keyPressed) {
    case "up":
        this.y -= 10;
        break;
    case "right":
        this.x += 10;
        break;
    case "down":
        this.y += 10;
        break;
    case "left":
        this.x -= 10;
        break;
        // sleep zzzz ?
    }

    this.keyPressed = "";

    //spatial boundaries for player, here water at playing field top
    if (this.y < 60) {
        this.reset();
        console.info("Splash!");
        // Todo: Game Over screen? Player death?
    }    

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.playerImg), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
  console.info( key + ", ");
  this.keyPressed = key;
};

/**
 * Reset / restart(?) game
 * Move the player to initial position.
 */
Player.prototype.reset = function() {
  this.x = playerInitialX;
  this.y = playerInitialY;
}


// Instantiation of game objects.
// numberEnemies defined at top sets total number of enemy objects.

for (i =1; i < numberEnemies; i++) {
    enemy = new Enemy();
    allEnemies.push(enemy);
}

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
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

// Do not scroll window on arrow keys pressed. Todo: Loop?
document.addEventListener('keydown', function(e) {
  if ([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault();
  }  
}, false);
