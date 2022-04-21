// calculates the force of gravity excuded on one body from another
// inputs two points and two masses, which the points represents
// returns an object, F, with an x- and a y-component representing a vector representing the force of gravity towards another
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
// inputs two points and two indexes for the planets-array
// returns the amount a planet should move as an object, dddd, with an x- and a y-component, representing a vector
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

// changes the scale variable when turning the mousewheel
// inputs the mousewheel event, when the mousewheel is turned
// changes the scale-value
function changeSize(event)
{
  if (event.deltaY < 0)
  {
    scale = scale / 0.9
  } 
  else 
  {
    scale = scale * 0.9
    
  }
}