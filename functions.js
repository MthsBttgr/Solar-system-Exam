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