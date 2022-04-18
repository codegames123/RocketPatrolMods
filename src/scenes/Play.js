//Nathan L.
//Rocket Patrol Mods Project
//4/17/2022
//10 hours to complete

//global timer variables
var timerMsg;
var timedEvent;
//global var high score for persistence
var highScore = 0;

class Play extends Phaser.Scene{
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.spritesheet('spaceship', './assets/spaceshipanimation.png', { frameWidth: 113, frameHeight: 48, startFrame: 0, endFrame: 7 });
        this.load.spritesheet('alienspaceship', './assets/alienship.png', { frameWidth: 69, frameHeight: 32, startFrame: 0, endFrame: 7 });
        this.load.image('starfield', './assets/starfield.png');
        this.load.spritesheet('explosion', './assets/explosion.png', { frameWidth: 73, frameHeight: 32, startFrame: 0, endFrame: 9 });  
        this.load.spritesheet('explosion2', './assets/explosion2.png', { frameWidth: 73, frameHeight: 32, startFrame: 0, endFrame: 9 });
        this.load.spritesheet('explosion3', './assets/explosion3.png', { frameWidth: 73, frameHeight: 32, startFrame: 0, endFrame: 9 });
        this.load.spritesheet('explosion4', './assets/explosion4.png', { frameWidth: 73, frameHeight: 32, startFrame: 0, endFrame: 9 });
        this.load.spritesheet('explosion5', './assets/explosion5.png', { frameWidth: 73, frameHeight: 32, startFrame: 0, endFrame: 9 });
    }

    create() {
        let trumpet = this.sound.add('sfx_trumpet', {loop: true}); 
        trumpet.play();// play background music

        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

        // blue UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x1B81B8).setOrigin(0, 0);

        // add spaceships (x3) all randonmly placed at every start
        this.ship01 = new Spaceship(this, game.config.width + borderUISize * Math.floor(Math.random() * 10), borderUISize * 4, 'alienspaceship', 0, 50, 6).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize * Math.floor(Math.random() * 10), borderUISize * 5 + borderPadding * 2, 'spaceship', 0, 20, 0).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width + Math.floor(Math.random() * 10), borderUISize * 7 + borderPadding * 4, 'spaceship', 0, 10, 0).setOrigin(0, 0);

        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);//top 
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);//bottom
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);//left
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);//right

        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width / 2, game.config.height - borderUISize - borderPadding-20, 'rocket').setOrigin(0.5, 0);

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // animation configs
        this.anims.create({
            key: 'spaceship',
            frames: this.anims.generateFrameNumbers('spaceship', { start: 0, end: 9, first: 0 }),
            frameRate: 7,
            repeat:-1
        });
        this.anims.create({
            key: 'alienship',
            frames: this.anims.generateFrameNumbers('alienspaceship', { start: 0, end: 9, first: 0 }),
            frameRate: 3,
            repeat:-1
        });
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0 }),
            frameRate: 20
        });
        this.anims.create({
            key: 'explode2',
            frames: this.anims.generateFrameNumbers('explosion2', { start: 0, end: 9, first: 0 }),
            frameRate: 30
        });
        this.anims.create({
            key: 'explode3',
            frames: this.anims.generateFrameNumbers('explosion3', { start: 0, end: 9, first: 0 }),
            frameRate: 30
        });
        this.anims.create({
            key: 'explode4',
            frames: this.anims.generateFrameNumbers('explosion4', { start: 0, end: 9, first: 0 }),
            frameRate: 30
        });
        this.anims.create({
            key: 'explode5',
            frames: this.anims.generateFrameNumbers('explosion5', { start: 0, end: 9, first: 0 }),
            frameRate: 30
        });
        
        //play spaceship animations
        this.ship01.anims.play('alienship');
        this.ship02.anims.play('spaceship');
        this.ship03.anims.play('spaceship');

        // initialize score
        this.p1Score = 0;

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: 'lightgreen',
            color: 'black',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        let textConfig = {
            fontFamily: 'Courier',
            fontSize: '13px',
            color: 'white',
            align: 'left',
            padding: {
                top: 10,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize +  borderPadding * 2, this.p1Score, scoreConfig);
        this.highScoreMid = this.add.text(game.config.height - borderUISize + 50, borderUISize + borderPadding * 2, highScore, scoreConfig);
        this.add.text(borderUISize + borderPadding, borderUISize - 13 + borderPadding * 2, 'Score' , textConfig);
        this.add.text(game.config.height - borderUISize + 50, borderUISize - 13 + borderPadding * 2, 'High score', textConfig);
        scoreConfig.align = 'center'
        this.add.text(game.config.width / 2, (game.config.height / 2) - 168, 'Fire', scoreConfig).setOrigin(0.5);
        this.gameOver = true;
        // GAME OVER flag
        this.gameOver = false;
        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        
        //console.log(`${game.settings.gameTimer}`);
        
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            scoreConfig.fontSize = 40;
            this.add.text(game.config.width / 2, game.config.height / 2, 'Time\'s Up!', scoreConfig).setOrigin(0.5);
            scoreConfig.fontSize = 28;
            this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            trumpet.stop(); //stop music when timer ends
            this.gameOver = true;
        }, null, this);

        this.initialTimer = (game.settings.gameTimer/1000);
        //displays timer
        timerMsg = this.add.text(game.config.width/2 - 77,game.config.height/2 - 150, 'Time remaining: ' + this.initialTimer.toString());
        timedEvent = this.time.addEvent({ delay: 1000, callback: this.downTimer, callbackScope: this, loop: true }); //calls downTimer every second to decrement seconds
    }

    downTimer() {
        if(this.initialTimer > 0) {
        this.initialTimer -= 1; // One second
        timerMsg.setText('Time remaining: ' + this.initialTimer.toString());
        }
    }

    update() {
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        this.starfield.tilePositionX -= 4;
        this.p1Rocket.update();

        if (!this.gameOver) {
            this.p1Rocket.update();         // update rocket sprite
            this.ship01.update();           // update spaceships (x3)
            this.ship02.update();
            this.ship03.update();
        }

        // check collisions
        if (this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
            return true;
        } else {
            return false;
        }
    }
    
    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;

        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#1B81B8',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        // create explosion sprite at ship's position
        let fire = this.add.text(game.config.width / 2, (game.config.height / 2) - 168, '    ', scoreConfig).setOrigin(0.5); // blank green text box blocks 'Fire' UI when ship is hit. Is there a better way I can do this?
        if (this.getRandomInt() == 0) {
            let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0); // explosion animation 1
            boom.anims.play('explode');             // play explode animation
            boom.on('animationcomplete', () => {    // callback after anim completes
                ship.reset();                         // reset ship position
                this.sound.play('sfx_explosion');
                ship.alpha = 1;                       // make ship visible again
                boom.destroy();                       // remove explosion sprite
                fire.destroy();
            });
        } else if (this.getRandomInt() == 1) {
            let boom2 = this.add.sprite(ship.x, ship.y, 'explosion2').setOrigin(0, 0); // explosion animation 2
            boom2.anims.play('explode2');             // play explode animation
            boom2.on('animationcomplete', () => {    // callback after anim completes
                ship.reset();                         // reset ship position
                this.sound.play('sfx_explosion1');
                ship.alpha = 1;                       // make ship visible again
                boom2.destroy();                       // remove explosion sprite
                fire.destroy();
            });
        } else if (this.getRandomInt() == 2) {
            let boom3 = this.add.sprite(ship.x, ship.y, 'explosion3').setOrigin(0, 0); // explosion animation 2
            boom3.anims.play('explode3');             // play explode animation
            boom3.on('animationcomplete', () => {    // callback after anim completes
                ship.reset();                         // reset ship position
                this.sound.play('sfx_explosion2');
                ship.alpha = 1;                       // make ship visible again
                boom3.destroy();                       // remove explosion sprite
                fire.destroy();
            });
        }else if (this.getRandomInt() == 3) {
            let boom4 = this.add.sprite(ship.x, ship.y, 'explosion4').setOrigin(0, 0); // explosion animation 2
            boom4.anims.play('explode4');             // play explode animation
            boom4.on('animationcomplete', () => {    // callback after anim completes
                ship.reset();                         // reset ship position
                this.sound.play('sfx_explosion3');
                ship.alpha = 1;                       // make ship visible again
                boom4.destroy();                       // remove explosion sprite
                fire.destroy();
            });
        }else {
            let boom5 = this.add.sprite(ship.x, ship.y, 'explosion5').setOrigin(0, 0); // explosion animation 2
            boom5.anims.play('explode5');             // play explode animation
            boom5.on('animationcomplete', () => {    // callback after anim completes
                ship.reset();                         // reset ship position
                this.sound.play('sfx_explosion4');
                ship.alpha = 1;                       // make ship visible again
                boom5.destroy();                       // remove explosion sprite
                fire.destroy();
            });
        }
        // score add and repaint
        this.p1Score += ship.points;
        if (this.p1Score > highScore) { // adds to high score if current score is >
            highScore += ship.points;
        }
        this.highScoreMid.text = highScore;
        this.scoreLeft.text = this.p1Score;
    }
    getRandomInt() {
        return Math.floor(Math.random() * 4);
      }
}