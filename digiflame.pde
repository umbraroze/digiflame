
class Spark {
  /// Location of the spark (stored in x and y fields)
  PVector loc;
  /// Velocity vector.
  PVector v;
  /// Remaining life of the particle. Set to maximum in init,
  /// considered dead if hits <=0.
  int life;
  public Spark() {
    loc = new PVector();
    loc.x = (int)random(width);
    loc.y = height;
    v = new PVector();
    float tinyUnit = (float)height/100.0;
    v.x = random(tinyUnit*0.8);
    v.x -= v.x/2.0;
    v.y = -random(tinyUnit*1.2);
    life = (int)random((float)height/20.0);
    //print("New spark: loc=("+loc.x+","+loc.y+"), "+
    //  "v=("+v.x+","+v.y+"), life="+life+"\n"); 
  }
  /// Update a particle's location.
  public void update() {
    // Less life.
    life--;
    if(life <= 0)
      return; // Optomatisation!
    // Move the bastard
    loc.add(v);
    // Fudge the velocity a little bit.
    float tinyUnit = (float)height/400.0;
    PVector fudge = new PVector();
    fudge.x = random(tinyUnit*0.2);
    fudge.x -= fudge.x / 2.0;
    fudge.y = random(tinyUnit*0.7);
    fudge.y -= fudge.y / 2.0;
    fudge.y = -fudge.y;
    v.add(fudge);
  }
  public boolean isDead() {
    return (life <= 0);
  }
}

int numberOfSparks = 200;
Spark[] sparks;

void draw() {
  // Update spark locations.
  for(int i = 0; i < numberOfSparks; i++) {
    sparks[i].update();
    if(sparks[i].isDead()) {
      sparks[i] = new Spark();
    }
  }

  background(0);
  int gridRows = height/20;
  int gridColumns = width/20;
  int gutter = 3;
  int sqW = (width/gridColumns)-(gutter*2);
  int sqH = (height/gridRows)-(gutter*2);
  for(int gridY = 0; gridY < gridRows; gridY++) {
    for(int gridX = 0; gridX < gridColumns; gridX++) {
      // Random colour.
      fill((int)random(255),(int)random(255),int(random(255)));
      
      // Square coordinates.
      int ax = (width/gridColumns*gridX)+gutter;
      int ay = (height/gridRows*gridY)+gutter;
      int bx = ax + sqW;
      int by = ay + sqH;
      
      // Check all sparks.
      boolean lit = true;
      for(int s = 0; s < numberOfSparks; s++) {
        if(sparks[s].loc.x >= ax &&
          sparks[s].loc.x <= bx &&
          sparks[s].loc.y >= ay &&
          sparks[s].loc.y <= by) {
          lit = false;
          continue;
        }
      }
      if(lit)
        rect(ax,ay,sqW,sqH);
    }
  }
  return;
}

void setup() {
  frameRate(25);
  size(640,480,JAVA2D);
  sparks = new Spark[numberOfSparks];
  for(int i = 0; i < numberOfSparks; i++) {
    sparks[i] = new Spark();
  }
}
