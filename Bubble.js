class Bubble {
    constructor(x, y) {
        this.position = {x: x, y: y};
        this.radius = 2;
        this.fill = color(75, 30, 90, 30);
        this.lifespan = 200;
        this.originalLifespan = 200;
        this.index = 0;
        this.dead = false;
    }
    draw() {
        if(!this.dead) {
            ellipseMode(CENTER);
            this.fill = color(75, 30, 90, 30*(this.lifespan/this.originalLifespan));
            fill(this.fill);
            ellipse(this.position.x, this.position.y, this.radius);
        }
    }
    update() {
        this.position.x += random() - 0.5;
        this.position.y += random() - 0.5;
        this.lifespan -= 1;

        if(this.lifespan < 0) {
            this.dead = true;
        }
    }
}