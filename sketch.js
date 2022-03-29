const G = 1;

let t = 0;
let deltaTime = 1;


function setup() {
  createCanvas(windowWidth-20, windowHeight-10);

  p1 = {x: 400, y: 400}
  p2 = {x: 100, y: 400}


  let mom1 = {x: 0, y: 0}
  let mom2 = {x: 0, y: 50}

  sun = new Planet(10000, 70, p1, mom1, color(255, 214, 10))
  planet = new Planet(10, 10, p2, mom2, color(10, 166, 75))

  

}

function draw() 
{
  background(50);
  
  sun.force = gravity(p1, p2, sun.mass, planet.mass)
  planet.force = gravity(p2, p1, planet.mass, sun.mass)

  sun.momentum.x += sun.force.x * deltaTime
  sun.momentum.y += sun.force.y * deltaTime
  planet.momentum.x += planet.force.x * deltaTime
  planet.momentum.y += planet.force.y * deltaTime

  p1.x += sun.momentum.x / sun.mass * deltaTime
  p1.y += sun.momentum.y / sun.mass * deltaTime

  p2.x += planet.momentum.x / planet.mass * deltaTime
  p2.y += planet.momentum.y / planet.mass * deltaTime

  sun.showPlanet(p1)
  planet.showPlanet(p2)



  t += deltaTime;
}

function gravity(p1, p2, mass1, mass2)
{
  let r = {x: p1.x - p2.x, y: p1.y - p2.y}
  let distr = sqrt(pow(r.x,2) + pow(r.y,2))
  let rHat = {x: r.x / distr, y: r.y / distr}
  
  let Fg = -G * (mass1 * mass2) / pow(distr, 2)

  let F = {x: Fg * rHat.x, y: Fg * rHat.y}

  return F
}
