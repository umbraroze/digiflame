/*
 * A random digital flame animation thing.
 *
 * v.1 - 2012-01-04
 * p5.js port - 2026-02-27
 *
 * Git repository: https://github.com/umbraroze/digiflame
 *
 * (c) Rose Midford 2012,2026. Distributed
 * under MIT license.
 * 
 * SPDX-License-Identifier: MIT
 */


// p5.js port note: using old style classes because p5.js
// web editor didn't like ES6 style classes.

function Spark() {
  var tinyUnit = Math.round(height/100.0);
  // Location.
  this.loc = createVector();
  this.loc.x = Math.round(Math.random() * width);
  this.loc.y = height;
  // Velocity.
  this.v = createVector();
  this.v.x = Math.round(Math.random() * (tinyUnit*0.8));
  this.v.x -= this.v.x/2.0;
  this.v.y = -(Math.round(Math.random() * (tinyUnit*1.2)));
  // Remaining life of the particle. Set to maximum in init,
  // considered dead if hits <=0.
  this.life = Math.round(Math.random() * height / 20.0);  
}

// Update a particle's location.
Spark.prototype.update = function () {
  // Less life.
  this.life--;
  if(this.life <= 0)
    return; // Optomatisation!
  // Move the bastard
  this.loc.add(this.v);
  // Fudge the velocity a little bit.
  var tinyUnit = Math.round(height / 400.0);
  var fudge = createVector();
  fudge.x = Math.round(Math.random() * (tinyUnit*0.2));
  fudge.x -= fudge.x / 2.0;
  fudge.y = Math.round(Math.random() * (tinyUnit*0.7));
  fudge.y -= fudge.y / 2.0;
  fudge.y = -fudge.y;
  this.v.add(fudge);  
}

Spark.prototype.isDead = function () {
  return (this.life <= 0);
}

var colourMode = 0;
const maxColourModes = 2;
const numberOfSparks = 200;
var sparks = [];

function draw() {
  // Update spark locations.
  for(var i = 0; i < numberOfSparks; i++) {
    sparks[i].update();
    if(sparks[i].isDead()) {
      sparks[i] = new Spark();
    }
  }

  background(0);
  var gridRows = height/20;
  var gridColumns = width/20;
  var gutter = 3;
  var sqW = (width/gridColumns)-(gutter*2);
  var sqH = (height/gridRows)-(gutter*2);
  for(var gridY = 0; gridY < gridRows; gridY++) {
    for(var gridX = 0; gridX < gridColumns; gridX++) {
      // Pick a colour mode.
      switch(colourMode) {
        case 0:
        default:
          // Gradient
          var a = color(20,0,0);
          var b = color(200,10,10);
          fill(lerpColor(a,b,(gridY / gridRows)));
          break;
        case 1:
          // Rainbow
          colorMode(HSB,100);
          var rainHue = Math.round((gridX / gridColumns)*100);
          var rain = color(rainHue,100,100);
          // p5js port note: this doesn't look quite right.
          var grayVal = lerp(0.0, 1.0,
                             (gridY / gridRows));
          grayRain = lerpColor(color(0),rain,grayVal);
          fill(grayRain);          
          colorMode(RGB);
          break;
        case 2:
          // Random colour
          fill(Math.round(Math.random()*255),
               Math.round(Math.random()*255),
               Math.round(Math.random()*255));
          break;
      }
      // Square's coordinates.
      var ax = (width/gridColumns*gridX)+gutter;
      var ay = (height/gridRows*gridY)+gutter;
      var bx = ax + sqW;
      var by = ay + sqH;
      
      // Check all sparks if they happen to be in this square.
      var lit = true;
      for(var s = 0; s < numberOfSparks; s++) {
        if(sparks[s].loc.x >= ax &&
          sparks[s].loc.x <= bx &&
          sparks[s].loc.y >= ay &&
          sparks[s].loc.y <= by) {
          lit = false;
          continue;
        }
      }
      // Finally, if so inclined, draw a rectangle.
      if(lit)
        rect(ax,ay,sqW,sqH);
    }
  }
  return;
}

// Mouse clicks just change the colour mode.
function mouseClicked() {
  colourMode++;
  if(colourMode > maxColourModes)
    colourMode = 0;
}

function setup() {
  createCanvas(640,480);
  frameRate(25);
  sparks = new Array(numberOfSparks);
  for(var i = 0; i < numberOfSparks; i++) {
    sparks[i] = new Spark();
  }
}
