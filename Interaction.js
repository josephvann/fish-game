var currentDistance = 0;

function checkNeighbours(fish) {
    visibleFish = 0;
    for(j = 0; j < fish.length; j++) {
        if(fish[j].visible && !fish[j].dead) {
            visibleFish += 1;
            for(i = 0; i < fish.length; i++) {
                if(j!=i && fish[i].visible && !fish[i].dead) {

                    currentDistance = dist(fish[i].position.x, fish[i].position.y, fish[j].position.x, fish[j].position.y,);

                    if(currentDistance < repulsionRadius) {
                        repel(fish[i], fish[j]);
                    } else {
                        if(currentDistance < attractionRadius) {
                            if(!fish[i].dead && !fish[j].dead) {
                                if(random(0,100) < 90) {
                                    if(!scattering) {
                                        if(!fish[i].midUTurn) {
                                            if(fish[i].scavenging) {
                                                fish[i].angle += ((fish[j].angle - fish[i].angle) / 800);
                                            } else {
                                                fish[i].angle += ((fish[j].angle - fish[i].angle) / 200);
                                            }
                                        }
                                        if(!fish[j].midUTurn) {
                                            if(fish[i].scavenging) {
                                                fish[j].angle += ((fish[j].angle - fish[i].angle) / 800);
                                            } else {
                                                fish[j].angle += ((fish[j].angle - fish[i].angle) / 200);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }    
        }
    }   
}

function scavenge(fish, food, bullets) {
    for(j = 0; j < fish.length; j++) {

        for(i = 0; i < bullets.length; i++) {
            collided = false;
            if(dist(fish[j].position.x, fish[j].position.y, bullets[i].position.x, bullets[i].position.y) < bullets[i].radius + 2) {
                if(!fish[j].dead) {
                    fishKilled ++;
                    score += 500;
                    player1.maxBullets += 1;
                    level += 0.01;
                }
                fish[j].dead = true;
                collided = true;
            }
            /* adds second collision point on fish */
            var clipDirection = p5.Vector.fromAngle(fish[j].angle + PI/2);
            clipDirection.setMag(3*fish[j].sizeFactor);
            var clipPoint = { x: fish[j].position.x + clipDirection.x, y: fish[j].position.y + clipDirection.y};

            if(!collided && dist(clipPoint.x, clipPoint.y, bullets[i].position.x, bullets[i].position.y) < bullets[i].radius + 2*fish[j].sizeFactor) {
                if(!fish[j].dead) {
                    fishKilled ++;
                    score += 500;
                    player1.maxBullets += 1;
                    level += 0.01;
                }
                fish[j].dead = true;
                collided = true;
            }
            if(collided) {
                bullets.splice(i, 1);
            }
            /* adds third collision point on fish */
            var clipDirection = p5.Vector.fromAngle(fish[j].angle + PI/2);
            clipDirection.setMag(8*fish[j].sizeFactor);
            var clipPoint = { x: fish[j].position.x + clipDirection.x, y: fish[j].position.y + clipDirection.y};

            if(!collided && dist(clipPoint.x, clipPoint.y, bullets[i].position.x, bullets[i].position.y) < bullets[i].radius + 8*fish[j].sizeFactor) {
                if(!fish[j].dead) {
                    fishKilled ++;
                    score += 500;
                    player1.maxBullets += 1;
                    level += 0.01;
                }
                fish[j].dead = true;
                collided = true;
            }
            if(collided) {
                bullets.splice(i, 1);
            }
        }

        if(fish[j].visible){
            fishPos = createVector(fish[j].position.x,fish[j].position.y);
            playerPos = createVector(player1.position.x,player1.position.y);
            currentDistance = dist(fishPos.x, fishPos.y, playerPos.x, playerPos.y);

            if(currentDistance < player1.attractionRadius && currentDistance < fish[j].nearestFoodDist && player1.visible && !fish[j].dead){            
                diff = p5.Vector.sub(fishPos, playerPos);
                desiredAngle = diff.heading() - TWO_PI/4;
                fish[j].nearestFoodDist = currentDistance;

                if((fish[j].angle + PI/2) % TWO_PI < (desiredAngle % TWO_PI) + PI/2) {
                    fish[j].angle += 0.06;
                }
                if(fish[j].angle % TWO_PI > desiredAngle % TWO_PI) {
                    fish[j].angle -= 0.06;
                }
                fish[j].scavenging = true;
            }
            
            if(currentDistance < player1.attractionRadius/4 && !player1.dead && !fish[j].dead) {
                score++;
            }
            if(currentDistance < 5*player1.sizeFactor + 1 && !fish[j].dead) {
                player1.dead = true;
                player1.biteCount += 1;
                if(player1.biteCount > player1.maxBiteCount) {
                    player1.visible = false;
                }
            }
        }    
    }    
}   


function repel(fish0, fish1) {
    if(fish0.position.y < fish1.position.y) {
        fish0.position.y -= 1;
        fish1.position.y += 1;
    } else {
        fish0.position.y += 1;
        fish1.position.y -= 1;
    }
    if(fish0.position.x < fish1.position.x) {
        fish0.position.x -= 1;
        fish1.position.x += 1;
    } else {
        fish0.position.x += 1;
        fish1.position.x -= 1;
    }
}
