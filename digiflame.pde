
class Spark {
  /// x coordinate of the particle.
  int x;
  /// y coordinate of the particle.
  int y;
  /// Angle the particle is currently heading to, radians.
  float th;
  /// Velocity of the particle in pixels per frame.
  int v;
  /// Remaining life of the particle. Set to maximum in init,
  /// considered dead if hits <=0.
  int life;
  public Spark() {
    x = (int)random(width);
    y = height;
    th = radians(random(180)-90);
    v = (int)random((float)height/10.0);
    life = (int)random((float)height/2.0);
  }
  /// Update a particle's location.
  public void update() {
    
  }
  public boolean isDead() {
    return (life <= 0);
  }
}

void draw() {
  background(0);
}

int numberOfSparks = 32;
Spark[] sparks;

void setup() {
  sparks = new Spark[numberOfSparks];
  frameRate(25);
  size(640,480);
}
