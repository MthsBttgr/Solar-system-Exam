class Planet
{
    constructor(mass, radius, position, momentum, color, name, index)
    {
        this.mass = mass;
        this.radius = radius;
        this.position = position;
        this.momentum = momentum;
        this.force;

        this.color = color;

        this.name = name;
        
        this.index = index;
        
    }

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

    mouseovercircle()
    {
        //returns true if mouse is over the planet
        this.d = dist(mouseX, mouseY, this.position.x, this.position.y);
        if(mouseIsPressed && this.d < 15)
        {
            return true;
        }
    }
}

class sidebar
{
    constructor(sidebarWidth, bgcolor, planeter)
    {
        this.sidebarWidth = sidebarWidth;
        this.bgcolor = bgcolor
        this.state = 0;

        this.list = []

        for (let p = 0; p < planeter.length; p++)
        {
            this.list[p] = new Buttons(width - this.sidebarWidth + 10, this.sidebarWidth + 20 + 40 * p, this.sidebarWidth - 20, 35, 5, p)
        }

        console.log(this.list)

        this.listColor;
    }

    showSidebar(width, height)
    {
        fill(this.bgcolor)
        rect(width - this.sidebarWidth,0,this.sidebarWidth,height)
    }

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

    planetList(planeter)
    {
        for(let p = 0; p < planeter.length; p++)
        {
            this.list[p].showButton(planeter[p].name, planeter[p].color)
            this.list[p].mouseoverRECT()
        }
    }
}

class Buttons
{
    constructor(x, y, Width, Height, bevel, number) 
    {
        this.x = x
        this.y = y
        this.width = Width
        this.height = Height
        this.bevel = bevel

        this.xCircle = this.x + this.width / 2
        this.yCircle = this.y
        this.d;
        this.returnvalue;

        this.basecol = color(40)
        this.mouseOverCol = color(30)
        this.selectedCol = color(20)
        this.textColor;

        console.log('basecol = ' + this.basecol)
        console.log('mouseOverCol = ' + this.mouseOverCol)
        console.log('selectedCol = ' + this.selectedCol)

        this.selected = false;

        this.number = number;
        this.name;
    }

    showButton(name, textColor)
    {
        this.name = name;
        this.textColor = textColor;
        
        
        if (this.selected)
        {
            fill(this.selectedCol);

            if (mouseIsPressed && !this.mouseoverRECT() && mouseX > width - sidebarW)
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
    
    mouseoverRECT()
    {
        if(mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height)
        {
            return true;
        }
    }

    returnState()
    {
        if (this.selected)
        {
            return this.number;
        }
    }

    slider(startValue, endValue, tekst)
    {
        //tegner aflang rektangel (sliderens ramme) og cirkel (slideren)
        fill(50);
        rect(this.x, this.y, this.width, 6, 3);

        fill(150);
        circle(this.xCircle, this.yCircle + 3, 12);

        textAlign(CENTER,CENTER)
        fill(255)
        text(startValue + "x", this.x - 15, this.y + 3)
        text(endValue + "x", this.x + this.width + 15, this.y + 3)
        text(tekst, this.x + this.width / 2, this.y - 15)

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

        //asigner circlens x-værdi mapped til en anden værdi
        this.returnvalue = map(this.xCircle,this.x,this.x+this.width, startValue, endValue);
    }

    slidervalue()
    {
        return this.returnvalue
    }

    mouseovercircle()
    {
        //returns true if mouse is over circle
        this.d = dist(mouseX, mouseY, this.xCircle, this.yCircle + 3);
        if(this.d < 15)
        {
            return true;
        }
    }
}