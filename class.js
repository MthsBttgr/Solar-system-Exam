class Planet
{
    constructor(mass, radius, position, momentum, color)
    {
        this.mass = mass;
        this.radius = radius;
        this.position = position;
        this.momentum = momentum;
        this.force;
        
        this.color = color;
    }

    showPlanet(position)
    {
        noStroke()
        fill(this.color)

        this.position = position;

        circle(this.position.x, this.position.y, this.radius)
    }
}