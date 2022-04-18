class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_explosion1', './assets/explosion39.mp3');
        this.load.audio('sfx_explosion2', './assets/explosion40.wav');
        this.load.audio('sfx_explosion3', './assets/explosion41.wav');
        this.load.audio('sfx_explosion4', './assets/explosion42.wav');//additional 4 explosions
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.audio('sfx_trumpet', './assets/cybermusic.mp3');
        this.load.image('menubackground', './assets/menubackground.png'); 
    }
    create() {
        //menu text configuration
        let menuConfig = {
            fontFamily: 'Impact',
            fontSize: '30px',
            backgroundColor: '',
            color: '#1BB829',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.add.image(game.config.width/2,game.config.height/2,'menubackground');
        this.add.text(game.config.width/2,game.config.height/2 - borderUISize - borderPadding - 170, 'EARTH ALIEN DEFENSE', menuConfig).setOrigin(0.5);
        menuConfig.fontFamily = 'Tahoma';
        menuConfig.fontSize = 19;
        this.add.text(game.config.width/2 - 150, game.config.height - 10, 'Movement: <- -> arrows keys to move', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2 + 250, game.config.height-10, 'Firing: (F) to fire', menuConfig).setOrigin(0.5);
        //menuConfig.backgroundColor = '#0CC6F8';
        menuConfig.fontSize = 50;
        menuConfig.color = 'lightgreen';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize -120, 'Difficulty:', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = 50;
        this.add.text(game.config.width/2 - 180, game.config.height/2 + borderUISize - 50, '<- for Novice', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2 + 180, game.config.height/2 + borderUISize - 50, 'for Expert ->', menuConfig).setOrigin(0.5);
        menuConfig.color = 'red';
        menuConfig.fontSize = 20;
        menuConfig.backgroundColor = '';
        this.add.text(game.config.width/2, game.config.height/2 + 80, 'PREVENT AS MANY ALIENS FROM ENTERING AS YOU CAN', menuConfig).setOrigin(0.5);

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000    
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');   
        }
        
    }
}