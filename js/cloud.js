var cloud,
    the_cloud = [],
    cloud_x = 600,
    cloud_y = 25;

function Cloud() {
  this.x = cloud_x;
  this.y = cloud_y;

  this.speed = 0.1;

  this.show = function() {
    image(cloud, this.x, this.y, 40, 20);
  }
  this.left = function() {
    this.x = this.x - this.speed * 1.5;
  }
}