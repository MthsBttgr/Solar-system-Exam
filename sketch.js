const G = 1;

let t = 0;
let deltaTime = 0.7;

let planets = [];
let p = [];

let mom = [];


function setup() {
  createCanvas(windowWidth, windowHeight);

  for (s = 0; s <= 9; s += 1)
  {
    p[s] = {
    x: width / 2 - 120 * s, 
    y: height / 2
    }

    mom[s] = {
      x: 0,
      y: 150 - 30 * s
    }
  }

  mom[0].y = 0

  planets.push(new Planet(10000, 70, p[0], mom[0], color(255, 214, 10)))
  planets.push(new Planet(10, 10, p[1], mom[1], color(random(255), random(255), random(255))))  
  planets.push(new Planet(10, 10, p[2], mom[2], color(random(255), random(255), random(255))))
  planets.push(new Planet(10, 10, p[3], mom[3], color(random(255), random(255), random(255))))
  planets.push(new Planet(10, 10, p[4], mom[4], color(random(255), random(255), random(255))))

  console.log(planets)
  console.log(p)

}

function draw() 
{
  background(50);


  p[0].x += calculateplacement(p[0],p[1],0,1).x + calculateplacement(p[0],p[2],0,1).x
  p[0].y += calculateplacement(p[0],p[1],0,1).y + calculateplacement(p[0],p[2],0,1).y
  p[1].x += calculateplacement(p[1],p[0],1,0).x + calculateplacement(p[1],p[2],0,1).x
  p[1].y += calculateplacement(p[1],p[0],1,0).y + calculateplacement(p[1],p[2],0,1).y
  p[2].x += calculateplacement(p[2],p[0],2,0).x + calculateplacement(p[2],p[1],0,1).x
  p[2].y += calculateplacement(p[2],p[0],2,0).y + calculateplacement(p[2],p[1],0,1).y

  for (s = 0; s <= 2; s++)
  {
    planets[s].showPlanet(p[s])
    planets[s].showPlanet(p[s])
    planets[s].showPlanet(p[s])
  }
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

function calculateplacement(loc1, loc2, index1, index2)
{
  planets[index1].force = gravity(loc1, loc2, planets[index1].mass, planets[index2].mass)
  
  planets[index1].momentum.x += planets[index1].force.x * deltaTime
  planets[index1].momentum.y += planets[index1].force.y * deltaTime

  let x = planets[index1].momentum.x / planets[index1].mass * deltaTime
  let y = planets[index1].momentum.y / planets[index1].mass * deltaTime

  let dddd = {
  x: x, 
  y: y
  }

  return dddd
}