class BGCircle {
    constructor(x, y, radius, fill, index) {
        this.fill = fill;
        this.position = {x: x, y: y};
        this.radius = radius;
        this.index = index;
    }
    update() {
        this.radius = abs(sin(frames/512 + this.index/2)*window.innerWidth/2)+window.innerHeight/6;
        this.fill = color((sin(frames/180 + this.index/2)*50+50)%100, 40, 20, 4);
    }
    draw() {
        fill(this.fill);
        ellipse(this.position.x + 20*sin(frames/(12 + this.index)), this.position.y + 20*cos(frames/(12 + this.index)), this.radius);
    }
}