// Global Vars
var speed;
var velocity;
var max_dist = 20;
var max_per_frame = 2;



var randRange = function(max,min){
  return Math.floor(Math.random()*(max-min)+min);
}

var rand = function(max){
  return Math.floor(Math.random()*max);
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
  // console.log("X: "+this.x+" Y: "+this.y+" RAD: "+ this.radius);
}

// function Point(pos){
//   this.pos = pos;
//   this.direction = 1;
// }


/*
Takes in list of point objects, and generates a list of
particle objects of numParts length taken from randomly
selected nodes in the particle list;

*/
var generateParticles = function(pointList, numParts){
  var cpy = pointList.slice();
  var particleList = [];
  for (var z=0; z<numParts; z++){
    var coord_index = rand(cpy.length);
    var coord = cpy.splice(coord_index, 1);
    coord = coord[0];
    x = coord[0];
    y = coord[1];
    var part = new Particle(x,y);
    particleList.push(part);

    // console.log("("+part.x+", "+part.y +")");

  }

  return particleList;
}




var makeShape = function(x,y, rad){
    ctx.beginPath();
    // context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    ctx.arc(x,y, rad, 0, 2*Math.PI, false);
    ctx.rect(x, y, 2, 2);
    ctx.fillStyle="#89c0e0";
    ctx.fill();
}



var draw = function(particles){
  // var cpy = particles.slice();
  for (var z=0; z<particles.length; z++){
    var x = particles[z].x;
    var y = particles[z].y;
    var rad = particles[z].radius;

    // console.log("X: "+ x+" Y: "+ y+" RAD: " +particles[z].rad);
    nextPos(particles[z]);
    x = particles[z].x;
    y = particles[z].y;
    // x = point[0];
    // y = point[1];
    // x = nextPos(x, cpy[z].homeX, cpy[z].xDir);
    // y = nextPos(y, cpy[z].homeY, cpy[z].yDir);
    // // y = nextPos(y, cpy[z].homeY, max_dist);
    // makeShape(x, y, cpy[z].radius);

    // x = nextPos(x, cpy[z].homeX, max_dist);
    // y = nextPos(y, cpy[z].homeY, max_dist);


    // console.log("X: "+ x+" Y: "+ y+" RAD: "+ particles[z].radius);
    makeShape(x, y, particles[z].radius);
  }
}

var nextPos = function(particle) {
  var currX, homeX, dirX, currY, currY, dirY;
  currX = particle.x;
  currY = particle.y;
  particle.x = randRange( (particle.homeX - max_dist), ( particle.homeX + max_dist)); //currX+1;
  particle.y = randRange( (particle.homeY - max_dist), ( particle.homeY + max_dist)); //currX+1;
  //particle.y = currY+1;
  // return;

  // var xdata = posAndDir(currX, particle.homeX, particle.dirX);
  // var ydata = posAndDir(currY, particle.homeY, particle.dirY);
  // console.log("XDATA: "+xdata+" YDATA: "+ydata);
  // particle.x = xdata[0];
  // particle.xDir = xdata[1];
  // particle.y = ydata[0];
  // particle.yDir = ydata[1];


  // var moveX = randRange(1,max_per_frame+1)*dirX;

  // var moveX = randRange(1,max_per_frame+1)*dirX;
  // if ( ( (curr+moveX) > (homeX +max_dist) ) || ( (curr+moveAmt) < (home - moveAmt) ) ){
  //   dir = dir*(-1);
  //   return (curr-moveAmt);
  // }
  // else{
  //   return (curr+moveAmt);
  // }
}

// var posAndDir = function(curr, home, dir){
//   var move = randRange(1,max_per_frame+1)*dir;
//   var ls = [0,0];
//   if ( ( (curr+move) > (home+max_dist) ) || ( (curr+move) < (home - move) ) ){
//     dir = dir*(-1);
//     ls[0] = (curr-move);
//     ls[1] = dir;
//     return ls;
//     // return [(curr-move),dir];
//   }
//   else{
//     ls[0] = (curr+move);
//     ls[1] = dir;
//     return ls; //[(curr+move),dir];
//   }
// }


// var nextPos = function(curr, home, maxd){
//   var moveAmt = randRange(-max_per_frame, max_per_frame+1);
//   var mv = curr+moveAmt;
//   console.log("OLD: "+curr+" NEW: "+mv);
//   if  ( ( (curr + moveAmt) > (home+maxd) ) || ((curr+moveAmt) < (home-maxd) ) ){
//           // console.log("OLD: "+curr+" NEW: "+curr+moveAmt);
//           return curr + moveAmt;
//   }
//   else{
//     return curr - moveAmt;
//   }
// }
  // if (Math.abs(curr + randRange(-, maxd)) > Math.abs(home+  )
















var m=0;
