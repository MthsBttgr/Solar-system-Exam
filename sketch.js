//making the gravity constant
const G = 1;

//making the time difference every frame
let deltaTime = 3;

//setting up arrays for objects and values
let planets = [];
let p = [];
let mom = [];

//setting up scale variable which is used for zooming in and out
let scale = 0.5;

//setting up the width of the sidebar
let sidebarW = 230

function preload()
{
  merk = loadImage('Pics/merkur.png')
  venus = loadImage('Pics/venus.png')
  jord = loadImage('Pics/jorden.png')
  mars = loadImage('Pics/mars.png')
  jupi = loadImage('Pics/jupiter.png')
  saturn = loadImage('Pics/saturn.png')
  anus = loadImage('Pics/uranus.png')
  nept = loadImage('Pics/neptune.png')
}

function setup() 
{
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.mouseWheel(changeSize)
  translate((width - sidebarW)/2, height/2)

  //making a bunch of different points and momentum(s?) and adding them to the p- and mom-array
  for (s = 0; s <= 9; s += 1)
  {
    p[s] = {
    x: 0 - (200 * s), 
    y: 0
    }

  }
  mom[0] = {x: 0, y: 0}
  mom[1] = {x: 0, y: 38}
  mom[2] = {x: 0, y: 30}
  mom[3] = {x: 0, y: 25}
  mom[4] = {x: 0, y: 22}
  mom[5] = {x: 0, y: 20}
  mom[6] = {x: 0, y: 19}
  mom[7] = {x: 0, y: 17}
  mom[8] = {x: 0, y: 16}

  //creating all the planets in the solar system and adding them to the planets-array
  {
  planets.push(new Planet(10000, 70, p[0], mom[0], color(255, 214, 10), 'Solen'))
  planets.push(new Planet(10, 10, p[1], mom[1], color(70),'Merkur'))  
  planets.push(new Planet(10, 10, p[2], mom[2], color(255, 185, 23),'Venus'))
  planets.push(new Planet(10, 10, p[3], mom[3], color(13, 56, 31),'Jorden'))
  planets.push(new Planet(10, 10, p[4], mom[4], color(186, 100, 50),'Mars'))
  planets.push(new Planet(10, 10, p[5], mom[5], color(186, 136, 50),'Jupiter'))  
  planets.push(new Planet(10, 10, p[6], mom[6], color(224, 176, 92),'Saturn'))
  planets.push(new Planet(10, 10, p[7], mom[7], color(83, 117, 117),'Uranus'))
  planets.push(new Planet(10, 10, p[8], mom[8], color(11, 100, 217),'Neptun'))
  }
  
  Sidebar = new sidebar(sidebarW, color(50,50,50));
  Sidebar.showSidebar(windowWidth, windowHeight);
}

function draw() 
{
  background(0);

  //displaying the planets and calculating movement in a seperated zone
  push()
  {
    //making sure the center of the canvas is always at the center of the screen
    translate((width - sidebarW)/2, height/2)

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

      for (i = 0; i <= 8; i++)
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
  pop()

  fill(50)
  //rect(width - sidebarW, 0, sidebarW, height)
  Sidebar.showSidebar(windowWidth, windowHeight);

}