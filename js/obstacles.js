var obstacles = [],
    the_obstacles = [],
    obstacles_x = 600,
    obstacles_y = 128;

function Obstacles() {
    this.x = obstacles_x;
    this.y = obstacles_y;

    this.speed = game_speed;

    var r = floor(random(0, obstacles.length));
    var i = obstacles[r];

    if(i == obstacles[4]) {
       this.width = 40;
       this.height = 25;
    }else { 
       this.width = 20;
       this.height = 25;
    }

    this.show = function() {
       image(i, this.x, this.y, this.width, this.height);
    }

    this.left = function() {
       this.x = this.x - this.speed * 1.5;
    }
}
