class Bullet {
    constructor(x, y, angle) {
        this.position = {x: x, y: y};
        this.speed = 10;
        this.angle = angle;
        this.deltaPos = {x: 0, y: 0};
        this.radius = 2;
        this.dead = false;
        this.fill = white;
        if(shotgun) {
            this.lifespan = 20;
        } else if(octogun) {
            this.lifespan = 20;
        } else {
            this.lifespan = 40;
        }
    }
    update() {
        this.lifespan -= 1;
        this.deltaPos.x = this.speed*sin(this.angle);
        this.deltaPos.y = this.speed*cos(this.angle);
        this.position.x += this.deltaPos.x;
        this.position.y += this.deltaPos.y;        
    }
    draw() {
        ellipseMode(CENTER);
        fill(this.fill);
        ellipse(this.position.x, this.position.y, this.radius);
    }
}