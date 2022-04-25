//making the gravity constant
const G = 1;

//making the time difference every frame
let deltaTime = 1;

//setting up arrays for objects and values
let planets = [];
let p = [];
let mom = [];

let pics = [];
let planetDescriptions = [];

//setting up scale variable which is used for zooming in and out
let scale = 0.5;

//setting up the width of the sidebar and scrolling on sidebar
let sidebarW = 260
let scrollwheelY = 0

function preload()
{
  pics.push(loadImage('Pics/solen.png'))
  pics.push(loadImage('Pics/merkur.png'))
  pics.push(loadImage('Pics/venus.png'))
  pics.push(loadImage('Pics/jorden.png'))
  pics.push(loadImage('Pics/mars.png'))
  pics.push(loadImage('Pics/jupiter.png'))
  pics.push(loadImage('Pics/saturn.png'))
  pics.push(loadImage('Pics/uranus.png'))
  pics.push(loadImage('Pics/neptune.png'))

  planetDescriptions.push(loadStrings('PlanetDescriptions/sun.txt'))
  planetDescriptions.push(loadStrings('PlanetDescriptions/merkur.txt'))
  planetDescriptions.push(loadStrings('PlanetDescriptions/venus.txt'))
  planetDescriptions.push(loadStrings('PlanetDescriptions/jorden.txt'))
  planetDescriptions.push(loadStrings('PlanetDescriptions/mars.txt'))
  planetDescriptions.push(loadStrings('PlanetDescriptions/jupiter.txt'))
  planetDescriptions.push(loadStrings('PlanetDescriptions/saturn.txt'))
  planetDescriptions.push(loadStrings('PlanetDescriptions/uranus.txt'))
  planetDescriptions.push(loadStrings('PlanetDescriptions/neptun.txt'))
}

function setup() 
{
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.mouseWheel(scrollWheel)
  noStroke()
  translate((width - sidebarW)/2, height/2)

  console.log(planetDescriptions)

  //making a bunch of different points and momentum(s?) and adding them to the p- and mom-array
  for (let s = 0; s <= 9; s += 1)
  {
    p[s] = {
    x: 0 - (200 * s), 
    y: 0
    }

  }

  //making all the momentum object variables
  {
  mom[0] = {x: 0, y: 0}
  mom[1] = {x: 0, y: 38}
  mom[2] = {x: 0, y: 30}
  mom[3] = {x: 0, y: 25}
  mom[4] = {x: 0, y: 22}
  mom[5] = {x: 0, y: 20}
  mom[6] = {x: 0, y: 19}
  mom[7] = {x: 0, y: 17}
  mom[8] = {x: 0, y: 16}
  }

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

  //creates the sidebar
  Sidebar = new sidebar(sidebarW, color(50,50,50), planets);

  //creates sliders for manipulating parameters
  slider = new ScreenElements(35,35,150,6,12,"speed:")
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
    for (let i = 0; i <= 8; i++)
    {
      for (let o = 0; o <= 7; o++)
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
    if (mouseIsPressed && mouseX < width - sidebarW && !slider.mouseovercircle())
    {
      let deltaX = mouseX - pwinMouseX
      let deltaY = mouseY - pwinMouseY
      
      for (let i = 0; i <= 8; i++)
      {
        p[i].x += deltaX / scale;
        p[i].y += deltaY / scale;
      }
    }

    // shows all planets in array
    for (let s = 0; s <= 8; s++)
    {
      planets[s].showPlanet(p[s], scale)
    }

    
  }
  pop()

  Sidebar.showSidebar(planetDescriptions);
  Sidebar.preview();
  Sidebar.planetList(planets)

  this.slider.slider(0, 2, "speed:")
  deltaTime = this.slider.slidervalue()
}