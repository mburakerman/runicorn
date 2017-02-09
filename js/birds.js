var birds=[],
    the_birds=[],
    bird_x = 1800,
    bird_y = 70,
    bird_speed = 2.5;

function Birds() {
  this.x = bird_x;
  this.y = bird_y;
 
  var r = floor(random(0, birds.length));
  var i = birds[r];

  this.speed = bird_speed;

  this.show = function() {
    image(i, this.x, this.y, 35, 30);
  }
  
  this.left = function() {
    this.x = this.x - this.speed * 1.5;
  }
}