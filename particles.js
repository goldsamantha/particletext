// Global Vars
var speed;
var velocity;
var max_dist = 5;
var max_d_onmouse = 50;
var max_velocity = 2;
var max_per_frame = 2;
var max_radius = 4;
var particleList = [];
var mousePos = new Vector(0,0);
var mouseRange = 20;


var randRange = function(max,min){
  return Math.floor(Math.random()*(max-min)+min);
}

var rand = function(max){
  return Math.floor(Math.random()*max);
}


function Vector(x,y){
  this.x = x || 0;
  this.y = y || 0;
}

// Add a vector to another
Vector.prototype.add = function(vector) {
  this.x += vector.x;
  this.y += vector.y;
}

// Gets the length of the vector
Vector.prototype.getMagnitude = function () {
  return Math.sqrt(this.x * this.x + this.y * this.y);
};

// Gets the angle accounting for the quadrant we're in
Vector.prototype.getAngle = function () {
  return Math.atan2(this.y,this.x);
};

// Allows us to get a new vector from angle and magnitude
Vector.fromAngle = function (angle, magnitude) {
  return new Vector(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
};









function Particle(point, velocity, acceleration) {
  var pos = point || new Vector(0,0);
  // console.log("Position: x: "+pos.x+"y: "+pos.y);
  this.position = point || new Vector(0, 0);
  this.velocity = velocity || new Vector(0, 0);
  this.acceleration = acceleration || new Vector(0, 0);
  this.radius = randRange(1, max_radius);
  this.home = new Vector(pos.x, pos.y); // || new Vector(0,0);
  this.dist = max_dist;
}

Particle.prototype.move = function () {
 // Add our current acceleration to our current velocity
 this.velocity.add(this.acceleration);

 // console.log ("Pos + vel: " + (this.position.x + this.velocity.x) +
 // "\tHome+max_dist: " + (this.home.x +max_dist));

 // need to know if the new position will be within the bounding box of
 // the home position, otherwise, shift velocity.

 var minx = this.home.x - this.dist;
 var maxx = this.home.x + this.dist;
 var x = this.velocity.x + this.position.x;

 var miny = this.home.y - this.dist;
 var maxy = this.home.y + this.dist;
 var y = this.velocity.y + this.position.y;


 var rangeMinX = this.position.x - max_dist;
 var rangeMaxX = this.position.x + max_dist;

 var rangeMinY = this.position.y - max_dist;
 var rangeMaxY = this.position.y + max_dist;


 //applies 30% probability;
 var randomX = (rand(10)>7);
 var randomY = (rand(10)>7);


 // if (!inRange(rangeMinX, rangeMaxX, x)){
 //   randomX = false;
 // }
 // if (!inRange(rangeMinY, rangeMaxY, y)){
 //   randomY = false;
 // }

 if ( !inRange(minx, maxx, x) || (randomX) ){
   this.velocity.x = this.velocity.x*(-1);
 }
 if ( !inRange(miny, maxy, y) || randomY){

    this.velocity.y = this.velocity.y*(-1);
  }


 // if ( (!inRange(minx, maxx, x) && inRange(minx, maxx, this.position.x))  || (randomX) ){
  //  if (this.dist > max_dist){
  //    this.dist = max_dist;
  //  }


 // if ( !inRange(minx, maxx, x) || (randomX) ){
 //   this.velocity.x = this.velocity.x*(-1);
 // }
 //

 // if ( ( !inRange(miny, maxy, y)  && inRange(miny, maxy, this.position.y) ) || randomY){
  //  if (this.dist > max_dist){
  //    this.dist = max_dist;
  //  }
// if ( !inRange(miny, maxy, y) || randomY){
//
//    this.velocity.y = this.velocity.y*(-1);
//  }

 // Add our current velocity to our position
 this.position.add(this.velocity);
};

function inRange(lower, upper, elem){
  if ( (lower < elem) && (upper> elem) ){
    return true;

  }
  else{ return false;}
}




/*
Mouse move stuff

*/

function setMousePos(canvas, evt){
  var rect = canvas.getBoundingClientRect();
  mousePos.x = (evt.clientX - rect.left);
  mousePos.y = (evt.clientY - rect.top);
}

cnv.addEventListener('mousemove', function(evt){
  setMousePos(cnv, evt);
  console.log("X: "+mousePos.x+" Y: "+ mousePos.y);
}, false);
// function getMousePos(canvas, evt) {
//   var rect = canvas.getBoundingClientRect();
//   return {
//     x: evt.clientX - rect.left,
//     y: evt.clientY - rect.top
//   };
// }
// cnv.addEventListener('mousemove', function(evt) {
//   mousePos = getMousePos(cnv, evt);
//   console.log("X: "+mousePos.x+" Y: "+ mousePos.y);
// }, false);



/*

Emitter.prototype.emitParticle = function() {
  // Use an angle randomized over the spread so we have more of a "spray"
  var angle = this.velocity.getAngle() + this.spread - (Math.random() * this.spread * 2);

  // The magnitude of the emitter's velocity
  var magnitude = this.velocity.getMagnitude();

  // The emitter's position
  var position = new Vector(this.position.x, this.position.y);

  // New velocity based off of the calculated angle and magnitude
  var velocity = Vector.fromAngle(angle, magnitude);

  // return our new Particle!
  return new Particle(position,velocity);
};

function update() {
  addNewParticles();
  plotParticles(canvas.width, canvas.height);
}






function Particle(x,y){
  this.x = x;
  this.y = y;
  this.isHover = false;
  this.homeX = x;
  this.homeY = y;
  this.radius = randRange(1,4);
  this.xDir = 1;
  this.yDir = 1;
}


*/






/*
Takes in list of point objects, and generates a list of
particle objects of numParts length taken from randomly
selected nodes in the particle list;

*/
var generateParticles = function(pointList, numParts){
  var cpy = pointList.slice();
  // var particleList = [];
  for (var z=0; z<numParts; z++){
    var coord_index = rand(cpy.length);
    var coord = cpy.splice(coord_index, 1);
    coord = coord[0];
    x = coord[0];
    y = coord[1];
    var vect = new Vector(x,y);
    // var part = new Particle(x,y);
    var vel = new Vector(randRange(1,max_velocity+1),randRange(1, max_velocity +1));

    var part = new Particle(vect, vel);
    // console.log(part);
    particleList.push(part);

    // console.log("("+part.x+", "+part.y +")");

  }

  // return particleList;
}




var makeShape = function(x,y, rad){
    ctx.beginPath();
    // context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    ctx.arc(x,y, rad, 0, 2*Math.PI, false);
    ctx.rect(x, y, 2, 2);
    // console.log("meh i work?");
    ctx.fillStyle="#89c0e0";
    ctx.fill();
}



var draw = function(particles){
  // var cpy = particles.slice();
  for (var z=0; z<particles.length; z++){
    var x = particles[z].position.x;
    var y = particles[z].position.y;
    var part = particles[z];

    // console.log("BEFORE: \tX: "+x+" Y: "+y);

    //TODO: do the checking of the bounding box here or in move?
    // inRange(lower, upper, elem)

    homex = x;// part.home.x;
    homey = y; //part.home.y;
    var xInRange =  inRange(mousePos.x- mouseRange, mousePos.x+mouseRange, homex);
    var yInRange = inRange(mousePos.y- mouseRange, mousePos.y+mouseRange, homey);

    if (xInRange && yInRange){
      part.dist = max_d_onmouse;
    }



    // if (inRange(mousePos.x- mouseRange, mousePos.x+mouseRange, x) ){
    //   part.dist = max_d_onmouse;
    // } else if (  inRange(mousePos.y- mouseRange, mousePos.y+mouseRange, y) ){
    //   part.dist = max_d_onmouse;
    // }


    particles[z].move();

    x = particles[z].position.x;
    y = particles[z].position.y;
    // console.log("AFTER: \tX: "+x+" Y: "+y + "RADIUS: "+particles[z].radius);
    makeShape(x, y, particles[z].radius);
  }
}




function loop(){
  clear();
  draw(particleList);
  // console.log(particleList);
  queue();
}

function queue() {
  window.requestAnimationFrame(loop);
}

function clear() {
  ctx.clearRect(0, 0, cnv.width, cnv.height);
}










var m=0;
