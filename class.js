class Planet
{
    constructor(mass, diameter, position, momentum, color, name)
    {
        //sets properties for the planet
        this.mass = mass;
        this.diameter = diameter;
        this.position = position;
        this.momentum = momentum;
        this.force;

        this.trail = []

        this.color = color;

        this.name = name;
        
    }

    //draws the planet
    showPlanet(position, scale)
    {
        noStroke();
        fill(this.color);

        //updates position based on input
        this.position = position;
        this.scale = scale;

        //draws the planet
        circle(this.position.x * this.scale, this.position.y * this.scale, this.diameter * this.scale);

        //draws the planet's name
        textAlign(CENTER);
        textSize(15);
        text(this.name, this.position.x * this.scale, (this.position.y + this.diameter) * this.scale  + 20);

        //stores the positions of the planet into the trail-array
        this.trail.push([this.position.x, this.position.y]);

        stroke(this.color);

        //draws the trail
        if(this.trail.length > 1)
        {
            for (let t = 0; t <= this.trail.length - 2; t++)
            {
                //changes position of the trails when moving the screen
                this.trail[t][0] += deltaX / this.scale;
                this.trail[t][1] += deltaY / this.scale;

                //thins out the trail at it's end
                strokeWeight(t / this.diameter * scale);

                //draws a line between a stored position and the next stored positon in the trail-array
                line(this.trail[t][0] * this.scale, this.trail[t][1] * this.scale, this.trail[t+1][0] * this.scale, this.trail[t+1][1] * this.scale);
            }
        }

        //sets the length of the trail too 100 by deleting the first value in the trail-array when it surpasses that value
        //this creates the effect that the trail is following the planet
        if(this.trail.length > 100)
        {
            this.trail.splice(0,1);
        }        
    }
}

class Sidebar
{
    constructor(sidebarWidth, bgcolor, planeter)
    {
        //properties the sidebar box
        this.sidebarWidth = sidebarWidth;
        this.bgcolor = bgcolor;
        this.state = 0;

        //creates array for the list of planets in the sidebar
        this.list = [];

        //fills array with list-objects
        for (let p = 0; p < planeter.length; p++)
        {
            this.list[p] = new PlanetList(width - this.sidebarWidth + 10, this.sidebarWidth + 20 + 40 * p, this.sidebarWidth - 20, 35, 5, p);
        }

        //makes it so the first object in the array is "selected"
        this.list[0].selected = true;

        this.listColor;

        //creates button for description
        this.descrButton = new ScreenElements(width - this.sidebarWidth + 10, height - 50, this.sidebarWidth - 20, 30, 10, "Beskrivelse");

        //creates slider for manipulating mass
        this.massSlider = new ScreenElements(width - this.sidebarWidth + 35, height - 100, this.sidebarWidth - 110, 6, 12, "masse");
    }

    //draws the sidebar
    showSidebar(descriptions, planetArray)
    {
        fill(this.bgcolor);
        rect(width - this.sidebarWidth, 0, this.sidebarWidth, height);

        //draws the preview and list of planets using the preview()- and planetList()-functions
        this.preview();
        this.planetList(planetArray);

        //draws the description of chosen planet, when the descrButton is selected
        if (this.descrButton.isSelected())
        {
            fill(0,0,0, 200);
            rect(0, height / 3, width - this.sidebarWidth, height / 3);

            for(let p = 0; p <= descriptions.length - 1; p++)
            {
                this.state = this.list[p].returnState();
                if (this.state === p)
                {
                    for(let d = 0; d <= descriptions[p].length; d++)
                    {
                        fill(255);
                        text(descriptions[p][d], width / 2 - this.sidebarWidth / 2, height / 2 + 20 * d - 10 * descriptions[p].length);
                    }
                }
            }
        }
    }

    //shows a picture of the "selected" planet from a property called state
    preview()
    {
        //draws the frame for the picture of a planet
        fill(40);
        rect(width - this.sidebarWidth + 10, 10, this.sidebarWidth - 20, this.sidebarWidth - 20, 10);
        
        //draws a picture of the selected planet
        for(let p = 0; p <= 8; p++)
        {
            this.state = this.list[p].returnState();
            if(this.state === p)
            {
                image(pics[p], width - this.sidebarWidth + 10, 10, this.sidebarWidth - 20, this.sidebarWidth - 20);
            } 
        }
    }
    
    //draws the list of the planets
    planetList(planeter)
    {   
        //draws a list of all the planets
        for(let p = 0; p < planeter.length; p++)
        {
            this.list[p].showList(planeter[p].name, planeter[p].color, this.descrButton.mouseoverRECT(), this.massSlider.mouseovercircle());
        }

        //draws a slider manipulating mass and the descrButton when a planet is selected
        for(let p = 0; p <= 8; p++)
        {
            this.state = this.list[p].returnState();
            if(this.state === p)
            {
                this.massSlider.slider(1, 20000, planeter[p].mass, "kg");
                planeter[p].mass = this.massSlider.slidervalue();
                this.descrButton.button();
            } 
        }
    }
}

class PlanetList
{
    constructor(x, y, Width, Height, bevel, number) 
    {
        //setting properties
        this.x = x
        this.y = y
        this.width = Width
        this.height = Height
        this.bevel = bevel

        //setting the different colors
        this.basecol = color(40)
        this.mouseOverCol = color(30)
        this.selectedCol = color(20)
        this.textColor;

        //setting up booleans
        this.playedClick = false;
        this.playedClicked = false;

        this.selected = false;

        //other properties
        this.number = number;
        this.name;
    }
    
    //makes square based on some given properties (name and textcolor) and can change color based on mouseplacement and the property "selected"
    showList(name, textColor, buttonselect, sliderselect)
    { 
        this.name = name;
        this.textColor = textColor;
        
        //changes the fill color based on mouseplacement and the property "selected"
        if (this.selected)
        {
            fill(this.selectedCol);
            
            if (mouseIsPressed && mouseX > width - sidebarW && !this.mouseoverRECT() && !buttonselect && !sliderselect)
            {

                this.selected = false;
            }
        }    
        else if (this.mouseoverRECT())
        {
            fill(this.mouseOverCol)

            if (mouseIsPressed)
            {
                if(this.playedClicked === false)
                {
                    clicked.play(0,1,0.3)
                    this.playedClicked = true;
                }
                this.selected = true;
            }
        } 
        else
        {
            fill(this.basecol)
        }
        
        //draws a rectangle
        rect(this.x, this.y, this.width, this.height, this.bevel)
        
        //draws text in the middle of the rectangle
        fill(this.textColor)
        textAlign(CENTER, CENTER);
        textSize(16)
        text(this.name, this.x + this.width / 2, this.y + this.height / 2)
    }
    
    //determines if the mouse is over the rectangle
    mouseoverRECT()
    {
        if(mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height)
        {
            //plays a sound once
            if(this.playedClick === false)
            {
                click.play(0, 1, 0.2)
                this.playedClick = true;
            }

            return true;
        }
        else
        {
            //restores booleans to original values
            this.playedClick = false;
            this.playedClicked = false;

            return false;
        }
    }

    //returns a property called "number", which is used in the sidebar-preview
    returnState()
    {
        if (this.selected)
        {
            return this.number;
        }
    }
}

class ScreenElements
{
    constructor(x, y, Width, Height, diameter, tekst)
    {
        //setting properties
        this.x = x;
        this.y = y;
        this.width = Width;
        this.height = Height;
        this.diameter = diameter;

        //setting the different colors
        this.basecol = color(40);
        this.mouseOverCol = color(30);
        this.selectedCol = color(20);

        //setting up booleans
        this.playedClick = false;
        this.playedClicked = false;

        this.selected = false;

        this.mouseIsDown = false;

        //other properties
        this.deltaXcircle1 = 0;
        this.xCircle;
        this.yCircle = this.y;
        this.d;
        this.returnvalue;

        this.tekst = tekst;
    }

    //draws a slider
    slider(startValue, endValue, value, unit)
    {
        //sets the circle at a position representing the value inputted
        this.xCircle = map(value, startValue, endValue, this.x, this.x + this.width);
   
        //draws a rektangel (the slider range) and a circle (the slider)
        fill(40);
        rect(this.x, this.y, this.width, 6, 3);

        //colors the circle and plays sound based on mouse placement and events
        fill(150);
        if (this.mouseovercircle())
        {
            fill(110);
            if (this.playedClick === false)
            {
                click.play(0, 1, 0.3);
                this.playedClick = true;
            }
        }
        else 
        {
            //restores boolean
            this.playedClick = false;
        }

        //moves the cirkle so it follows your mouse and plays sound based on mouse placement and events
        if (mouseIsPressed && this.mouseovercircle() || this.mouseIsDown)
        {
            if (!clicked.isPlaying() && (this.xCircle > this.deltaXcircle1 + 10 || this.xCircle < this.deltaXcircle1 - 10))
            {
                clicked.play(0, 1, 0.3);
                this.deltaXcircle1 = this.xCircle;
            }
            if (mouseIsPressed)
            {
                this.mouseIsDown = true;
            }
            else 
            {
                this.mouseIsDown = false;
            }
            this.xCircle = mouseX;
            
            //makes the circle stay within the slider
            if (this.xCircle < this.x)
            {
                this.xCircle = this.x;
            }
            if (this.xCircle > (this.x + this.width))
            {
                this.xCircle = this.x + this.width;
            }

            fill(80);
        }

        //draws the circle
        circle(this.xCircle, this.yCircle + 3, this.diameter);

        //draws text to the right, left and above the slider
        fill(255);
        textAlign(RIGHT,CENTER);
        text(startValue + unit, this.x - 5, this.y + 3);
        textAlign(LEFT,CENTER);
        text(endValue + unit, this.x + this.width + 5, this.y + 3);
        textAlign(CENTER,CENTER);
        text(this.tekst, this.x + this.width / 2, this.y - 15);
        
        //assigns the mapped value of the circle's x-value to a variable
        this.returnvalue = map(this.xCircle,this.x,this.x + this.width, startValue, endValue);
    }

    //returns value of the slider
    slidervalue()
    {
        return this.returnvalue;
    }
    
    //returns true if mouse is over slider-circle
    mouseovercircle()
    {
        this.d = dist(mouseX, mouseY, this.xCircle, this.yCircle + 3);
        if(this.d < this.diameter || this.mouseIsDown)
        {
            return true;
        }
        else 
        {
            return false;
        }
    }

    button()
    {
        //changes the fill color based on mouseplacement and the property "selected"
        if (this.selected)
        {
            fill(this.selectedCol);

            if (mouseIsPressed && !this.mouseoverRECT())
            {
                this.selected = false;
            }
        }    
        else if (this.mouseoverRECT())
        {
            fill(this.mouseOverCol);

            if (mouseIsPressed)
            {
                //plays sound once
                if(this.playedClicked === false)
                {
                    clicked.play(0,1,0.3);
                    this.playedClicked = true;
                }

                this.selected = true;
            }
        } 
        else
        {
            fill(this.basecol);
        }

        //draws rectangle with text in it
        rect(this.x, this.y, this.width, this.height, this.diameter);
        fill(255);
        textAlign(CENTER, CENTER);
        text(this.tekst, this.x + this.width / 2, this.y + this.height / 2);
    }

    //determines if the mouse is over the button
    mouseoverRECT()
    {
        if(mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height)
        {
            //plays sound once
            if(!this.playedClick && !this.selected)
            {
                click.play(0, 1, 0.2);
                this.playedClick = true;
            }

            return true;
        }
        else 
        {
            //restores booleans to original value
            this.playedClick = false;
            this.playedClicked = false;

            return false;
        }
    }

    //returns true if the object is selected
    isSelected()
    {
        if (this.selected)
        {
            return true;
        }
        else 
        {
            return false;
        }
    }
}