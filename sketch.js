//making the gravity constant
const G = 6.67430e-11;

//making the time difference every frame
let deltaTime = 0.01;

//setting up arrays for objects and values
let planets = [];
let p = [
  {x: 0,y: 0},
  {x: -57900000,y: 0}, 
  {x: -108000000,y: 0}, 
  {x: -149600000,y: 0}, 
  {x: -228000000,y: 0}, 
  {x: -778000000,y: 0}, 
  {x: -1434000000,y: 0}, 
  {x: -2872000000,y: 0}, 
  {x: -4495000000,y: 0}
]
let mom = [];
let mass = [
  1.989e30,
  3.302e23,
  4.8685e24,
  5.97219e24,
  6.4185e23,
  1.899e27,
  5.6846e26,
  8.6832e25,
  1.0243e26
]
let dia = [
  1392000,
  4879,
  12104,
  12756.1,
  6794,
  139822,
  120536,
  51118,
  49244
]

let pics = [];
let planetDescriptions = [];

//setting up scale variable which is used for zooming in and out
let scale = 1 / 5000000;

//setting up the width of the sidebar and scrolling on sidebar
let sidebarW = 260
let scrollwheelY = 0

//creates variable for startscreen
let screen = true

//loads all the pictures and descriptions
//function preload()


function setup() 
{
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.mouseWheel(scrollWheel)
  noStroke()
  translate((width - sidebarW)/2, height/2)

  //making all the momentum object variables
  for (let m = 1; m <= 8; m++)
  {
    mom[m] = {x: 0, y: calculateSpeed(mass[0], mass[m], -p[m].x)}
  }
  mom[0] = {x:0, y:0}
  mom[1] = {x:0, y: 47.9 * mass[1]}
  

  //creating all the planets in the solar system and adding them to the planets-array
  {
  planets.push(new Planet(mass[0], dia[0], p[0], mom[0], color(255, 214, 10), 'Solen'))
  planets.push(new Planet(mass[1], dia[1], p[1], mom[1], color(70),'Merkur'))  
  planets.push(new Planet(mass[2], dia[2], p[2], mom[2], color(255, 185, 23),'Venus'))
  planets.push(new Planet(mass[3], dia[3], p[3], mom[3], color(13, 56, 31),'Jorden'))
  planets.push(new Planet(mass[4], dia[4], p[4], mom[4], color(186, 100, 50),'Mars'))
  planets.push(new Planet(mass[5], dia[5], p[5], mom[5], color(186, 136, 50),'Jupiter'))  
  planets.push(new Planet(mass[6], dia[6], p[6], mom[6], color(224, 176, 92),'Saturn'))
  planets.push(new Planet(mass[7], dia[7], p[7], mom[7], color(83, 117, 117),'Uranus'))
  planets.push(new Planet(mass[8], dia[8], p[8], mom[8], color(11, 100, 217),'Neptun'))
  }

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

  //creates the sidebar
  Sidebar = new sidebar(sidebarW, color(50,50,50), planets);

  //creates sliders for manipulating parameters
  speedSlider = new ScreenElements(35,35,250,6,12,"speed:")
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
    if (mouseIsPressed && mouseX < width - sidebarW && !speedSlider.mouseovercircle())
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

  Sidebar.showSidebar(planetDescriptions, planets);

  this.speedSlider.slider(0, 10, deltaTime, "x")
  deltaTime = this.speedSlider.slidervalue()

  restart()
  startScreen()
}
