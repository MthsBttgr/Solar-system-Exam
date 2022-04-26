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

function calculateSpeed(masse, radius)
{
  let deez = masse * sqrt((G * masse) / (radius * 1000))
  return deez
}

// changes the scale variable when turning the mousewheel when mouse is in "space"
// scrolls up and down in sidebar when turning the mousewheel when the mouse is in the sidebar
// inputs the mousewheel event, when the mousewheel is turned
// changes the scale-value
function scrollWheel(event)
{
  if(mouseX < width - sidebarW)
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
  else{
    if (event.deltaY < 0)
    {
      scrollWheelY = -10
    } 
    else 
    {
      scrollWheelY = 10
    }
  }
}

//creates the startscreen disclaimer
function startScreen()
{
  if(screen === true)
  {
    background(0)

    textAlign(CENTER, CENTER)
    fill(255)
    textSize(50)
    text("DISCLAIMER:", width / 2, height / 2 - 50)
    textSize(20)
    text("Dette spil er ikke en akkurat repræsentation af solsystemet", width / 2, height / 2 + 15)

    if (mouseIsPressed)
    {
      screen = false;
    }
  }
}

//creates restart button
function restart()
{
  let restart = new ScreenElements((width - sidebarW)/2, 0, 50, 30, 5, "reset")
  restart.button()

  if (restart.selected)
  {
    noLoop()
    p = [
      {x: 0, y: 0},
      {x: -57900000, y: 0}, 
      {x: -108000000, y: 0}, 
      {x: -149600000, y: 0}, 
      {x: -228000000, y: 0}, 
      {x: -778000000, y: 0}, 
      {x: -1434000000, y: 0}, 
      {x: -2872000000, y: 0}, 
      {x: -4495000000, y: 0}
    ]
    

    for (let m = 1; m <= 8; m++)
    {
      planets[m].momentum = {x: 0, y: calculateSpeed(mass[m], -p[m].x)}
    }
    planets[0].momentum = {x:0, y:0}
    loop()
  }
}