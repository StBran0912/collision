import * as lb2d from './lib2d.js';
import * as phys from './physics.js';

const balls = [];
const boxes = [];
const arrow = {
    index: null,
    base: lb2d.createVector(0, 0)
}


function start() {
    lb2d.init( 600, 300);
    for (let i = 0; i < 2; i++) {
        balls.push(phys.createBall(lb2d.random(0, 500), 60, lb2d.random(10, 40)));
    }    
    balls[0].mass *= 2;
    balls[1].mass *= 2;
    lb2d.startAnimation(draw);    
}

function draw() {
    lb2d.background(235);
   
    for (let i = 0; i < balls.length-1; i++) {
        phys.detectCollisionBalls(balls[i], balls[i+1])
    }
        
    balls.forEach((element)=> {
        element.applyFriction();
        element.update();
        element.display();
        console.log(element.mass, element.velocity.x, element.angVelocity)
    })
    
    if (lb2d.isMouseDown() && arrow.index == null) {
        balls.forEach((element, index) => {
            if (element.location.dist(lb2d.createVector(lb2d.mouseX, lb2d.mouseY)) < element.mass) {
              arrow.base.set(element.location.x, element.location.y);
              arrow.index = index;
            }
        })    
    }

    if (lb2d.isMouseDown() && arrow.index != null) {
        lb2d.drawArrow(arrow.base, lb2d.createVector(lb2d.mouseX, lb2d.mouseY), 100);
    }  

    if (lb2d.isMouseUp() && arrow.index != null) {
        balls[arrow.index].kicking();
        arrow.index = null;
      }
  
}

start();