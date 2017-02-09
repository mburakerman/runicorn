var bg;
var start_seconds_timer;

var start_button,
    the_start_button;

var init_button,
    the_init_button;

var press_sound,
    reached_sound,
    hit_sound;

var hi_score = 0,
     seconds = 0;

var game_speed = 2.5,
    game_over,
    game_finished;

function preload() {
  bg = loadImage("images/bg.jpg");

  unicorn = loadGif('images/unicorn.gif');
  unicorn_jumped = loadImage("images/unicorn_jumped.png");

  birds[0] = loadGif('images/bird.gif');
  birds[1] = loadGif('images/bee.gif');
  birds[2] = loadGif('images/eagle.gif');

  obstacles[0] = loadImage('images/tree0.png');
  obstacles[1] = loadImage('images/tree1.png');
  obstacles[2] = loadImage('images/tree2.png');
  obstacles[3] = loadImage('images/tree3.png');
  obstacles[4] = loadImage('images/tree4.png');

  cloud = loadImage("images/cloud.png");

  press_sound = loadSound('sounds/press.mp3');
  hit_sound = loadSound('sounds/hit.mp3');
  reached_sound = loadSound('sounds/reached.mp3');
  reached_sound = loadSound('sounds/reached.mp3');
}

function Start_Button() {
  this.show = function() {
    start_button = createButton("Start Game");
    start_button.position(0, 30);
    start_button.addClass("start_game");
    start_button.mousePressed(start_game);
    start_button.parent("buttons");
  }
}

function start_game() {
  var runnicorn_canvas=createCanvas(600, 170);
  runnicorn_canvas.parent("canvas_wrapper");
  loop();
  start_button.addClass("disable_button");
  start_seconds_timer = setInterval(function() {
    seconds = seconds + 1;
    if (seconds % 100 == 0) {
      reached_sound.setVolume(0.5);
      reached_sound.play();
    }
  }, 100);
}


function Init_Button() {
  this.show = function() {
    init_button = createButton("Restart");
    init_button.position(200, 30);
    init_button.style("position","relative");
    init_button.addClass("init_game disable_button");
    init_button.mousePressed(init);
    init_button.parent("buttons");
  }
}

function init() {
  the_obstacles.splice(0,the_obstacles.length);
  the_cloud.splice(0,the_cloud.length);
  the_birds.splice(0,the_birds.length);
  init_button.addClass("disable_button");

  seconds = 0;
  clearInterval(start_seconds_timer);

  start_seconds_timer = setInterval(function() {
    seconds = seconds + 1;

    if (seconds % 100 == 0) {
      reached_sound.setVolume(0.5);
      reached_sound.play();
    }
  
  }, 100);

  //Save high score to localStorage
  if (localStorage.getItem('hi_score')) {
    hi_score = localStorage.getItem('hi_score');
  }


  //setup();
  //draw();
  loop();
  start_button.addClass("disable_button");
}

function Game_Over() {
  this.show = function() {
    noStroke();
    textSize(20);
    textStyle(BOLD);
    textFont("Helvetica");
    fill("#565656");
    text("GAME OVER", 250, 75, 200, 20);
  }
}

function Game_Finished() {
  this.show=function() {
    noStroke();
    textSize(20);
    textStyle(BOLD);
    textFont("Helvetica");
    fill("#B06AB3");
    text("CONGRATULATIONS! YOU HAVE FINISHED THE GAME.",30, 75, 550, 20);
  }
}


//Press space button to jump
function keyPressed() {
  if (key == ' ') {
    the_unicorn.jump();
  }
}

function setup() {
  var runnicorn_canvas=createCanvas(600, 170);
  runnicorn_canvas.parent("canvas_wrapper");
  noLoop();
  
  the_unicorn = new Unicorn();
  the_obstacles.push(new Obstacles());
  the_birds.push(new Birds());
  the_cloud.push(new Cloud());

  the_start_button = new Start_Button();
  the_start_button.show();

  the_init_button = new Init_Button();
  the_init_button.show();

  game_over = new Game_Over();
  game_finished=new Game_Finished();
}

function draw() {
  background(bg);

  the_unicorn.down();
  the_unicorn.show();
  
  //Road line
  stroke("#565656");
  line(0, 153, 600, 153);
 
  //High score text
  noStroke();
  textSize(14);
  textStyle(NORMAL);
  textFont("Arial");
  fill("#fff");
  text("HI " + hi_score, 480, 5, 100, 20);
  
  //Seconds 
  noStroke();
  textSize(14);
  textStyle(NORMAL);
  textFont("Arial");
  fill("#fff");
  text(seconds, 550, 5, 100, 20);
 
  //Loop clouds
  for (i = 0; i < the_cloud.length; i++) {
    the_cloud[i].show();
    the_cloud[i].left();
    if (the_cloud[i].x < 110) {
      the_cloud.splice(i, 1);
    }
  }
    //Every 900 frame we add new cloud
   if (frameCount % 990 == 0) {
    the_cloud.push(new Cloud());
  }

  //Loop birds
  for (i = 0; i < the_birds.length; i++) {
    the_birds[i].show();
    the_birds[i].left();

     //Check if birds hit the unicorn
    if (the_unicorn.y > 25 && the_unicorn.y < 90 && the_birds[i].x < 84 && the_birds[i].x > 12) {
      hit_sound.setVolume(0.5);
      hit_sound.play();
      game_over.show();
      noLoop();
      clearInterval(start_seconds_timer);
      init_button.removeClass("disable_button");
    }

    if (the_birds[i].x < 0-the_birds[i].width) {
     the_birds.splice(i, 1);
    }
  }
  
  //Loop obstacles
  for (i = 0; i < the_obstacles.length; i++) {
    the_obstacles[i].show();
    the_obstacles[i].left();

    //Check if obstacles hit the unicorn
    if (the_obstacles[i].x < 83 && the_obstacles[i].x > 35 - the_obstacles[i].width && the_unicorn.y > 68 /* the_unicorn.y -the_obstacles[i].height=65 */ ) {
      hit_sound.setVolume(0.5);
      hit_sound.play();
      game_over.show();
      noLoop();
      clearInterval(start_seconds_timer);
      init_button.removeClass("disable_button");
      
      //Set localStorage item for high score
      if (seconds > hi_score) {
        localStorage.setItem('hi_score', seconds);
        hi_score = seconds;
      }

    }

    //Remove obstacles if they are off-screen
    if (the_obstacles[i].x < 0 - the_obstacles[i].width) {
      the_obstacles.splice(i, 1);
    }

  }
  

  if(seconds > 0 && 100 > seconds) {
   
  if (frameCount % 120 == 0) {
    the_obstacles.push(new Obstacles());
  }

  }else if(seconds > 100 && 150 > seconds) {

  if (frameCount % 60 == 0) {
    the_obstacles.push(new Obstacles());
  }

  }else if(seconds > 160 && 250 > seconds) {
    game_speed=3;
    bird_speed=3;

    if (frameCount % 110 == 0) {
      the_obstacles.push(new Obstacles());
      the_birds.push(new Birds());
    }
  }else if(seconds > 260 && 350 > seconds) {
    game_speed=3.5;
    bird_speed=3.5;

    if (frameCount % 270 == 0) {
      the_birds.push(new Birds());
    }
    if (frameCount % 110 == 0) {
      the_obstacles.push(new Obstacles());
    }

  }else if(seconds > 360 && 450 > seconds) {
    game_speed=3;
    bird_speed=3.5;

    if (frameCount % 70 == 0) {
      the_obstacles.push(new Obstacles());
    }

  }else if(seconds > 460 && 550 > seconds) {
    game_speed=4.5;
    bird_speed=4.5;

    if (frameCount % 200 == 0) {
      the_obstacles.push(new Obstacles());
    }

  }else if(seconds > 560 && 700 > seconds){
    game_speed=2.5;


    if (frameCount % 300 == 0) {
      the_birds.push(new Birds());
    }

    if (frameCount % 120 == 0) {
      the_obstacles.push(new Obstacles());
    }

  }else if(seconds > 710 && 850 > seconds){
    game_speed=3;

    if (frameCount % 140 == 0) {
      the_obstacles.push(new Obstacles());
    }

  }else if(seconds > 860 && 970 > seconds) {
    game_speed=4;
    bird_speed=3;

    if (frameCount % 250 == 0) {
      the_birds.push(new Birds());
    }

    if (frameCount % 200 == 0) {
      the_obstacles.push(new Obstacles());
    }

  }else if(seconds > 999) {
    noLoop();
    seconds=0;
    clearInterval(start_seconds_timer);
    game_finished.show();
    init_button.removeClass("disable_button");
    localStorage.setItem('hi_score', "1000");
  }

}

//Save high score to localStorage
if (localStorage.getItem('hi_score')) {
  hi_score = localStorage.getItem('hi_score');
}
