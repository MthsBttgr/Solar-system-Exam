class Planet
{
    constructor(mass, radius, position, momentum, color, name)
    {
        this.mass = mass;
        this.radius = radius;
        this.position = position;
        this.momentum = momentum;
        this.force;

        this.name = name
        
        this.color = color;
        
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
}