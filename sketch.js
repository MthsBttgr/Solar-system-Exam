//making the gravity constant
const G = 1;

//making the time difference every frame
let deltaTime = 1;

//setting up arrays for objects and values
let planets = [];
let p = [];
let mom = [];

//setting up scale variable which is used for zooming in and out
let scale = 1;


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.mouseWheel(changeSize)
  translate(width/2, height/2)

  //making a bunch of different points and momentum(s?) and adding them to the p- and mom-array
  for (s = 0; s <= 9; s += 1)
  {
    p[s] = {
    x: 0 - (100 * s), 
    y: 0
    }

    mom[s] = {
      x: 0,
      y: 90 - 12 * s
    }
  }

  mom[0].y = 0

  //creating all the planets in the solar system and adding them to the planets-array
  planets.push(new Planet(10000, 70, p[0], mom[0], color(255, 214, 10), 'sun'))
  planets.push(new Planet(10, 10, p[1], mom[1], color(random(255), random(255), random(255)),'merkury'))  
  planets.push(new Planet(10, 10, p[2], mom[2], color(random(255), random(255), random(255)),'venus'))
  planets.push(new Planet(10, 10, p[3], mom[3], color(random(255), random(255), random(255)),'earth'))
  planets.push(new Planet(10, 10, p[4], mom[4], color(random(255), random(255), random(255)),'mars'))
  planets.push(new Planet(10, 10, p[5], mom[5], color(random(255), random(255), random(255)),'jupiter'))  
  planets.push(new Planet(10, 10, p[6], mom[6], color(random(255), random(255), random(255)),'saturn'))
  planets.push(new Planet(10, 10, p[7], mom[7], color(random(255), random(255), random(255)),'uranus'))
  planets.push(new Planet(10, 10, p[8], mom[8], color(random(255), random(255), random(255)),'neptune'))

}

function draw() 
{
  background(0);

  //making sure the center of the canvas is always at the center of the screen
  translate(width/2, height/2)

  // calculates the force excuded on all bodies excuded by all bodies, and add the result to the placement of all bodies
  for (i = 0; i <= 8; i++)
  {
    for (o = 0; o <= 7; o++)
    {
      if (i === o)
      {
        if (o === 9)
        {
          break
        } else {
          o++
        } 
      }
      p[i].x += calculateplacement(p[i],p[o],i,o).x
      p[i].y += calculateplacement(p[i],p[o],i,o).y
    }
  }

  // U can move the screen by pressing a mousebutton
  if (mouseIsPressed)
  {
    let deltaX = mouseX - pwinMouseX
    let deltaY = mouseY - pwinMouseY

    for (i = 0; i <= 7; i++)
    {
      p[i].x += deltaX / scale;
      p[i].y += deltaY / scale;
    }
  }

  // shows all planets in array
  for (s = 0; s <= 8; s++)
  {
    planets[s].showPlanet(p[s], scale)
  }
}

// calculates the force of gravity excuded on one body from another
function gravity(p1, p2, mass1, mass2)
{
  let r = {x: p1.x - p2.x, y: p1.y - p2.y}
  let distr = sqrt(pow(r.x,2) + pow(r.y,2))
  let rHat = {x: r.x / distr, y: r.y / distr}
  
  let Fg = -G * (mass1 * mass2) / pow(distr, 2)

  let F = {x: Fg * rHat.x, y: Fg * rHat.y}

  return F
}

// calculates placement based on the force of gravity
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

//changes the scale variable when turning the mousewheel
function changeSize(event)
{
  if (event.deltaY < 0)
  {
    scale += 0.05
  } 
  else 
  {
    if (scale > 0.1)
    {
      scale -= 0.05
    } 
    else if (scale >= 0) 
    {
      scale -= 0.001
    } 
    else 
    {
      scale = 0
    }
  }
}