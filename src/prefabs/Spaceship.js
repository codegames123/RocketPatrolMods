// Rocket prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);
      this.point = pointValue;
      this.moveSpeed = 3;
    }
//rev space class
    update() {
        this.x -= this.moveSpeed;
        if(this.x <= 0 - this.width) {
            this.x = game.config.width;
        }
    }
}