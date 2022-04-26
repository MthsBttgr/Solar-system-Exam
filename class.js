class Planet
{
    constructor(mass, radius, position, momentum, color, name)
    {
        //sets properties for the planet
        this.mass = mass;
        this.radius = radius;
        this.position = position;
        this.momentum = momentum;
        this.force;

        this.d;

        this.color = color;

        this.name = name;
        
    }

    //draws the planet
    showPlanet(position, scale)
    {
        noStroke()
        fill(this.color)

        this.position = position;
        this.scale = scale;

        circle(this.position.x * this.scale, this.position.y * this.scale, this.radius * this.scale)

        textAlign(CENTER)
        textSize(15)
        text(this.name, this.position.x * this.scale, this.position.y * this.scale + this.radius * this.scale  + 20)
    }

    mouseOverPlanet()
    {
        this.d = dist(mouseX, mouseY, this.position.x, this.position.y);
        if(this.d < this.radius)
        {
            return true;
        }
        else 
        {
            return false;
        }
    }
}

class sidebar
{
    constructor(sidebarWidth, bgcolor, planeter)
    {
        //properties the sidebar box
        this.sidebarWidth = sidebarWidth;
        this.bgcolor = bgcolor
        this.state = 0;

        //creates array for the list of planets in the sidebar
        this.list = []

        //fills array with list-objects
        for (let p = 0; p < planeter.length; p++)
        {
            this.list[p] = new PlanetList(width - this.sidebarWidth + 10, this.sidebarWidth + 20 + 40 * p, this.sidebarWidth - 20, 35, 5, p)
        }

        //makes it so the first object in the array is "selected"
        this.list[0].selected = true

        this.listColor;

        //creates button for description
        this.descrButton = new ScreenElements(width - this.sidebarWidth + 10, height - 50, this.sidebarWidth - 20, 30, 10, "Deskription")

        //creates slider for manipulating mass
        this.massSlider = new ScreenElements(width - this.sidebarWidth + 35, height - 100, this.sidebarWidth - 110, 6, 12, "masse")
    }

    //draws the sidebar
    showSidebar(descriptions, planetArray)
    {
        fill(this.bgcolor)
        rect(width - this.sidebarWidth,0,this.sidebarWidth, height)

        this.preview()
        this.planetList(planetArray)

        this.descrButton.button()

        if (this.descrButton.isSelected())
        {
            fill(0,0,0, 200)
            rect(0, height / 3, width - this.sidebarWidth, height / 3)

            for(let p = 0; p <= descriptions.length - 1; p++)
            {
                this.state = this.list[p].returnState()
                if (this.state === p)
                {
                    
                    for(let d = 0; d <= descriptions[p].length; d++)
                    {
                        fill(255)
                        text(descriptions[p][d], width / 2 - this.sidebarWidth / 2, height / 2 + 20 * d - 10 * descriptions[p].length)
                    }
                }
            }
        }
    }

    //shows a picture of the "selected" planet from a property called state
    preview()
    {
        fill(40)
        rect(width - this.sidebarWidth + 10, 10, this.sidebarWidth - 20, this.sidebarWidth - 20, 10)
        
        for(let p = 0; p <= 8; p++)
        {
            this.state = this.list[p].returnState()
            if(this.state === p)
            {
                image(pics[p], width - this.sidebarWidth + 10, 10, this.sidebarWidth - 20, this.sidebarWidth - 20)
            } 
        }
    }
    
    //draws the list of the planets
    planetList(planeter)
    {   
        for(let p = 0; p < planeter.length; p++)
        {
            this.list[p].showList(planeter[p].name, planeter[p].color, this.descrButton.mouseoverRECT(), this.massSlider.mouseovercircle())
        }

        for(let p = 0; p <= 8; p++)
        {
            this.state = this.list[p].returnState()
            if(this.state === p)
            {
                this.massSlider.slider(1, 20000, planeter[p].mass, "kg")
                planeter[p].mass = this.massSlider.slidervalue()
            } 
        }
    }
}

class PlanetList
{
    constructor(x, y, Width, Height, bevel, number) 
    {
        this.x = x
        this.y = y
        this.width = Width
        this.height = Height
        this.bevel = bevel

        this.basecol = color(40)
        this.mouseOverCol = color(30)
        this.selectedCol = color(20)
        this.textColor;

        this.selected = false;

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
                this.selected = true;
            }
        } 
        else
        {
            fill(this.basecol)
        }
        
        rect(this.x, this.y, this.width, this.height, this.bevel)
        
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
            return true;
        }
        else
        {
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
    constructor(x, y, Width, Height, radius, tekst)
    {
        this.x = x;
        this.y = y;
        this.width = Width;
        this.height = Height;
        this.radius = radius;

        this.basecol = color(40)
        this.mouseOverCol = color(30)
        this.selectedCol = color(20)

        this.selected = false;

        this.xCircle;
        this.yCircle = this.y
        this.d;
        this.returnvalue;

        this.tekst = tekst
    }

    //draws a slider
    slider(startValue, endValue, value, unit)
    {
        this.xCircle = map(value, startValue, endValue, this.x, this.x + this.width)

        //draws a rektangel (the slider range) and a circle (the slider)
        fill(40);
        rect(this.x, this.y, this.width, 6, 3);

        fill(150);
        circle(this.xCircle, this.yCircle + 3, this.radius);

        fill(255)
        textAlign(RIGHT,CENTER)
        text(startValue + unit, this.x - 5, this.y + 3)
        textAlign(LEFT,CENTER)
        text(endValue + unit, this.x + this.width + 5, this.y + 3)
        textAlign(CENTER,CENTER)
        text(this.tekst, this.x + this.width / 2, this.y - 15)

        //moves the cirkle so it follows your mouse
        if (mouseIsPressed && this.mouseovercircle())
        {
            this.xCircle = mouseX;
        }
        //makes the circle stay within the slider
        if (this.xCircle < this.x)
        {
            this.xCircle = this.x;
        }
        if (this.xCircle > (this.x + this.width))
        {
            this.xCircle = this.x + this.width;
        }

        //assigns the mapped value of the circle's x-value to a variable
        this.returnvalue = map(this.xCircle,this.x,this.x + this.width, startValue, endValue);
    }

    //returns value of the slider
    slidervalue()
    {
        return this.returnvalue
    }
    
    //returns true if mouse is over slider-circle
    mouseovercircle()
    {
        this.d = dist(mouseX, mouseY, this.xCircle, this.yCircle + 3);
        if(this.d < this.radius)
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
            fill(this.mouseOverCol)

            if (mouseIsPressed)
            {
                this.selected = true;
            }
        } 
        else
        {
            fill(this.basecol)
        }

        rect(this.x, this.y, this.width, this.height, this.radius)
        fill(255)
        textAlign(CENTER, CENTER)
        text(this.tekst, this.x + this.width / 2, this.y + this.height / 2)
    }

    //determines if the mouse is over the button
    mouseoverRECT()
    {
        if(mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height)
        {
            return true;
        }
        else 
        {
            return false;
        }
    }

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