var unicorn,
    the_unicorn,
    unicorn_jumped,
    unicorn_x = 25,
    unicorn_y = 125;

function Unicorn() {
  this.x = unicorn_x;
  this.y = unicorn_y;

  this.speed = 1.3;
  this.jumped = false;

  this.show = function() {
    if (this.jumped) {
      image(unicorn_jumped, this.x, this.y, 100, 65);
    } else {
      image(unicorn, this.x, this.y, 100, 65);
    }
  }

  this.down = function() {
    this.y = this.y + this.speed * 1.5;
    if (this.y > 90) {
      this.y = 90;
      this.jumped = false;
    }
  }

  this.jump = function() {
    if (!this.jumped) {
      this.y = this.y - this.speed * 95;
      press_sound.setVolume(0.5);
      press_sound.play();
      if (this.y < -25) {
        this.y = -25;
      }
    }
    
    this.jumped = true;
  }
}

