class Player {
  constructor(params) {
    this.game = params["game"];
    this.radius = 40
    this.height = this.radius*2;      
    this.width = this.radius*2;       
    this.jumping = false;   // For checking jump. If currently jumping, cannot jump again/
    this.jumpCount = 0;    // For adding in double jump. If
    this.x_pos = 300;      // temporary starting x_pos for demo
    this.y_pos = 100;      // temporary starting y_pos for demo
    this.x_vel = 0;
    this.y_vel = 0;

    this.friction = .95

    this.tempGirl = new Image();
    this.tempGirl.src = '/src/assets/temp_girl_sprite.png';
  }

  draw(ctx) {
    // Temporarily represented as circle. Will later refactor to be a sprite
    // ctx.fillStyle = "#031cfc";
    // ctx.beginPath();
    // ctx.arc(
    //   this.x_pos,
    //   this.y_pos,
    //   this.radius,
    //   0,
    //   2 * Math.PI,
    //   false);
    // ctx.fill();

    // const tempGirl = new Image();
    // tempGirl.src = '/src/assets/temp_girl_sprite.png';
    ctx.drawImage(this.tempGirl, this.x_pos,this.y_pos- this.radius, this.width, this.height );
  
  }

  move(timeDelta) {
    const NORMAL_FRAME_TIME_DELTA = 1200 / 60;
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,

    // horizontal movement
    offsetX = this.x_vel * velocityScale,
    offsetY = this.y_vel * velocityScale;
    
    this.x_pos += offsetX;
    this.x_vel *= this.friction
    this.x_pos += this.x_vel
    
    // vertical movement
    this.y_pos += offsetY;

    // gravity?
    this.y_vel += 1.5
    this.y_vel *= this.friction
    this.y_pos += this.y_vel

    // Stop from going through bottom of screen. Refactor this later to check for collission detection and sit on top of tiles
    if (this.y_pos > this.game.DIM_Y - (this.radius * 2)) {
      this.y_pos = this.game.DIM_Y - this.radius;
      this.y_vel = 0;
      this.jumping = false;
      this.jumpCount = 0;
    }
  }

  updatePos(dir) {
    let [dirX, dirY] = dir

    // horizontal movement
    this.x_vel +=  1.5 * dirX 
    this.x_pos += this.x_vel
    // this.x_vel *= this.friction
  }
  
  jump () {
    if (this.jumping < 2) {
      this.y_vel -= this.height / 3;
      this.jumping = true;
      this.jumpCount += 1;
    }
  }
}

module.exports = Player;