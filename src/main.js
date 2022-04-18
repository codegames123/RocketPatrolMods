let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
  }
let game = new Phaser.Game(config);

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;

// set UI sizes
let borderUISize = game.config.height / 15;
//console.log(game.config.height/15);
let borderPadding = borderUISize / 3;

// Requirements I aimed for:
// Track a high score that persists across scenes and display it in the UI (5)
// Implement the 'FIRE' UI text from the original game (5)
// Add your own (copyright-free) background music to the Play scene (5)
// Randomize each spaceship's movement direction at the start of each play (5)
// Create a new scrolling tile sprite for the background (5)
// Allow the player to control the Rocket after it's fired (5)
// Create 4 new explosion SFX and randomize which one plays on impact (10)
// Display the time remaining (in seconds) on the screen (10)
// Create a new animated sprite for the Spaceship enemies (10)
// Create a new title screen (e.g., new artwork, typography, layout) (10)
// Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20)
// Create new artwork for all of the in-game assets (rocket, spaceships, explosion) (20) 

/*
MUSIC:
Epic Cinematic Gaming Cyberpunk | RESET by Alex-Productions | https://www.youtube.com/channel/UCx0_M61F81Nfb-BRXE-SeVA
Music promoted by https://www.chosic.com/free-music/all/
Creative Commons CC BY 3.0
https://creativecommons.org/licenses/by/3.0/
*/