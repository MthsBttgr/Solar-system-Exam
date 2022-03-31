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

    showPlanet(position, scale)
    {
        noStroke()
        fill(this.color)

        this.position = position;
        this.scale = scale;

        circle(this.position.x * this.scale, this.position.y * this.scale, this.radius * this.scale)
    }
}