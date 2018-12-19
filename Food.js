class Food {
    constructor(index) {
        this.position = {x: random(window.innerWidth*0.1, window.innerWidth*0.9), y: random(window.innerHeight*0.1, window.innerHeight*0.9)};
        this.radius = 8;
        this.index = index;
        this.attractionRadius = window.innerWidth/3;
        this.deltaPos = {x: random(-10,10)/50, y: random(-10,10)/50}
        this.fill = color(70, 70, 80);
        this.spawnedByPlayer = false;
        this.willExplode = false;
        this.exploding = false;
        this.originalRadius = this.radius;
        this.explosionRadius = 100;
        this.explodeDelay = 40;
        this.explodeDecay = 5;
        this.originalExplodeDelay = this.explodeDelay;
        this.originalExplodeDecay = this.explodeDecay;
        this.isBomb = false;

        if(random()>0.9) {
            this.isBoost = true;
            this.fill = color(60,70,50);
            this.radius = 12;
        } else {
            this.isBoost = false;
            if(random() > 0.95) {
                this.isBomb = true;
                this.fill = color(70, 90, 80);
                this.radius = 12;
            }
        }
    }
    draw() {
        ellipseMode(CENTER);
        fill(this.fill);
        if(this.exploding) {

        }
        ellipse(this.position.x, this.position.y, this.radius);
    }
    update() {
        this.position.x += this.deltaPos.x;
        this.position.y += this.deltaPos.y;

        if(this.position.x < 0 || this.position.x > window.innerWidth) {
            this.deltaPos.x *= -1;
        }
        if(this.position.y < 0 || this.position.y > window.innerHeight) {
            this.deltaPos.y *= -1;
        }
        if(this.willExplode) {
            this.explodeDelay--;
            if(this.explodeDelay < 0) {
                this.explode();
            }
        }
        if(this.exploding) {
            this.explodeDecay -= 1;
            this.fill = color(0, 0, 100, 20*this.explodeDecay/5);
            this.radius = this.explosionRadius;
        }
        if(this.explodeDecay < 0) {
            food.splice(this.index, 1);
        }
    }
    explode() {
        this.exploding = true;
        this.radius = this.originalRadius + (this.originalExplodeDecay - this.explodeDecay/this.originalExplodeDecay) * this.explosionRadius;
        this.fill = color(100,100,100, 20);
    }
}