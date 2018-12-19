class Player {
    constructor() {
        this.foodHeld = 10;
        this.maxFoodHeld = 10;
        this.foodHeldInterval = 150;
        this.bombsHeld = 3;
        this.maxBombsHeld = 3;
        this.bombsHeldInterval = 400;
        this.maxBullets = 30;
        this.bullets = this.maxBullets;
        this.bulletInterval = 20;
        this.position = {x: window.innerWidth/2, y: window.innerHeight/2};
        this.deltaPos = {x: 0, y: 0};
        this.speed = 0;
        this.angle = 0;
        this.frames = 0;
        this.maxSpeed = 3;
        this.dead = false;
        this.radius = 10;
        this.isPlayer = true;
        this.attractionRadius = window.innerWidth/6;
        this.biteCount = 0;
        this.maxBiteCount = 10;
        this.visible = true;
        this.sizeFactor = 1.5;
        this.hasWeapon2 = false;
        this.boosting = false;
        this.boost = 75;
        this.maxBoost = 75;
        this.boostPower = 1.013;
    }
    dropFood() {
        if(this.foodHeld > 0) {
            this.foodHeld -= 1;
            var foodDirection = p5.Vector.fromAngle(-this.angle- PI/2);
            foodDirection.setMag(10*this.sizeFactor);
            var foodPoint = { x: this.position.x + foodDirection.x, y: this.position.y + foodDirection.y};
            food.push(new Food());
            food[food.length-1].position = {x:foodPoint.x,y:foodPoint.y};
            food[food.length-1].fill = color(70, 70, 80);
            food[food.length-1].radius = 5;
            food[food.length-1].spawnedByPlayer = true;
            food[food.length-1].attractionRadius = 100;
        }
    }

    dropBomb() {
        if(this.bombsHeld > 0) {
            this.bombsHeld -= 1;
            var foodDirection = p5.Vector.fromAngle(-this.angle- PI/2);
            foodDirection.setMag(10*this.sizeFactor);
            var foodPoint = { x: this.position.x + foodDirection.x, y: this.position.y + foodDirection.y};
            food.push(new Food());
            food[food.length-1].position = {x:foodPoint.x,y:foodPoint.y};
            food[food.length-1].fill = color(70, 70, 80);
            food[food.length-1].spawnedByPlayer = true;
            food[food.length-1].attractionRadius = 100;
            food[food.length-1].willExplode = true;
        }
    }

    stop() {
        this.speed *= 0.95;
    }
    move(direction) {
        if(!this.dead) {
            this.speed = createVector(this.deltaPos.x, this.deltaPos.y).mag();
            if(direction == 0) {
                if(this.boost > 0) {
                    this.boosting = true;
                }
            }
            if(direction == 1) {
                this.angle -= 0.08;
            }
            if(direction == 2) {
                if(this.speed > 0 ) {
                    this.speed *= 0.9;
                }
                this.boosting = false;
            }
            if(direction == 3) {
                this.angle += 0.08;  
            }

        }
    }
    draw() {
        if(this.visible) {
            push();
            translate(this.position.x, this.position.y);
            rotate(-this.angle + PI);
            fill(15, 70, 50);
            beginShape();
            vertex(0, 0);
            vertex(-5, 10);
            vertex(5, 10);
            endShape(CLOSE);
            fill(0, 70, 50);
            beginShape();
            vertex(0, 0);
            vertex(-2, 11);
            vertex(2, 11);
            endShape(CLOSE);
            pop();
        }
    }
    update() {
        if(isBoost) {
            this.boosting = true;
        } else {
            this.boosting = false;
        }
        if(isDown) {
            this.stop();
        }
        if(frames % this.foodHeldInterval == 0 && this.foodHeld < this.maxFoodHeld && !this.dead) {
            this.foodHeld++;
        }
        if(frames % this.bombsHeldInterval == 0 && this.bombsHeld < this.maxBombsHeld && !this.dead) {
            this.bombsHeld++;
        }
        if(frames % this.bulletInterval == 0 && this.bullets < this.maxBullets && !this.dead) {
            this.bullets++;
        }
        if(!this.dead) {
            this.frames++;
        }

        if(this.speed < this.maxSpeed) {
            this.speed += 0.1;
        } else if (this.speed > this.maxSpeed && !this.boosting) {
            this.speed -= 0.1;
        }

        if(this.frames % bubbleInterval == 0) {
            addBubble(this.position.x, this.position.y);
        }

        if(this.boosting) {
            if(this.boost > 0) {
                this.speed *= this.boostPower;
                this.boost --;
                
            } else {
                this.boosting = false;
            }
        }

        this.deltaPos.x = this.speed*sin(this.angle);
        this.deltaPos.y = this.speed*cos(this.angle);

        this.position.x += this.deltaPos.x;
        this.position.y += this.deltaPos.y;

        this.deltaPos.x *= 0.999;
        this.deltaPos.y *= 0.999;

        if(this.dead) {
            this.speed = 0;
            this.deltaPos.x, this.deltaPos.y = 0;
        }

        this.checkFood(food);

        if(isPoison) {
            player1.dropFood();
        }
        if(isBomb) {
            player1.dropBomb();
        }
        if(isShoot) {
            this.shoot();
        }
        if(isLeft) {
            this.move(3);
        }
        if(isRight) {
            this.move(1);
        }

        if(this.position.x <= 0) {
            this.position.x = 0;
        }
        if(this.position.y <= 0) {
            this.position.y = 0;
        }
        if(this.position.x >= window.innerWidth) {
            this.position.x = window.innerWidth;
        }
        if(this.position.y >= window.innerHeight) {
            this.position.y = window.innerHeight;
        }

        if(frames % boostRefillInterval == 0 && !this.boosting && this.boost < this.maxBoost) {
            this.boost += 1;
        }
    }
    shoot() {
        if(this.bullets > 0 && ! this.dead) {
            if(triple) {
                if(frames % 2 == 0) {
                    bullets.push(new Bullet(this.position.x, this.position.y, this.angle - 0.025));
                    bullets.push(new Bullet(this.position.x, this.position.y, this.angle));
                    bullets.push(new Bullet(this.position.x, this.position.y, this.angle + 0.025));
                }
            }
            if(shotgun){
                bullets.push(new Bullet(this.position.x, this.position.y, this.angle + 0.05));
                bullets.push(new Bullet(this.position.x, this.position.y, this.angle + 0.025));
                bullets.push(new Bullet(this.position.x, this.position.y, this.angle));
                bullets.push(new Bullet(this.position.x, this.position.y, this.angle - 0.05));
                bullets.push(new Bullet(this.position.x, this.position.y, this.angle - 0.025));    
            } else if(octogun){
                for(i = 0; i < 8; i++) {
                    bullets.push(new Bullet(this.position.x, this.position.y, this.angle + frames + i*(PI/4)));
                }
            } else {
                bullets.push(new Bullet(this.position.x, this.position.y, this.angle));
            }
            this.bullets --;
        }
    }
    checkFish(fish) {
        for(i = 0; i < fish.lengh; i++) {
            if(this.position.x == fish[i].position.x && this.position.y == fish[i].position.y) {
                this.dead = true;
            }
        }
    }
    checkFood(food) {
        for(i = 0; i < food.length; i++) {
            var foodPos = createVector(food[i].position.x,food[i].position.y);
            var currentDistance = dist(this.position.x, this.position.y, foodPos.x, foodPos.y);

            if(currentDistance < food[i].radius + 3 && !food[i].spawnedByPlayer) {
                if(food[i].isBoost) {
                    this.maxBoost += 5;
                    this.boostPower *= 1.01;
                    this.boost = this.maxBoost;
                }
                if(food[i].isBomb) {
                    if(this.bombsHeld < this.maxBombsHeld) {
                        this.bombsHeld ++;
                    }
                }
                scattering = false;
                food.splice(i,1);
                foodEaten += 1;
                level += 0.015;
                this.bullets += 5;
                if(this.bullets > this.maxBullets) {
                    this.bullets = this.maxBullets;
                }
                console.log("Food Eaten: " + foodEaten);
                this.maxSpeed += 0.02;
                this.sizeFactor += 0.06;
                fishCount++;
                score += 5000;
                this.boost += 10;
                if(this.boost > this.maxBoost) {
                    this.boost = this.maxBoost;
                }
            }        
        }
    }

}
