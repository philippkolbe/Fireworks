class Particle {
    constructor(lifeloss) {
        this.acc = createVector(0, 0);
        this.done = false;
        this.lifespan = 255;
        this.lifeloss = lifeloss || 0;
    }

    applyForce(force) {
        this.acc.add(force);
    }

    update() {
        if (!this.done) {
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);

            if (this.lifespan < 0)
                this.done = true;

            this.lifespan -= this.lifeloss;
        }
    }
}

class Sparkle extends Particle {
    constructor(x, y, color, shape, lifeloss) {
        super(lifeloss);

        this.pos = createVector(x, y);
        this.vel = p5.Vector.random2D();

        if (shape.name == "NORMAL") {
            this.vel.mult(random(2, 5));
        } else if (shape.name == "HEART") {
            if (this.vel.y > 0) {
                if (this.vel.x < 0) {
                    this.vel.y = -0.4*pow(this.vel.x, 2) + 0.6*this.vel.x + 1;
                } else {
                    this.vel.y = -0.4*pow(this.vel.x, 2) - 0.6*this.vel.x + 1;
                }
            } else {
                if (this.vel.x < 0) {
                    this.vel.y = 2*pow(this.vel.x, 2) + 2*this.vel.x;                    
                } else {
                    this.vel.y = 2*pow(this.vel.x, 2) - 2*this.vel.x;
                }
            }
            this.vel.mult(shape.size*random(0.8, 1.2));
        } else if (shape.name == "CIRCLE") {
            this.vel.mult(shape.size*random(0.8, 1.2));
        }

        this.color = color;
    }

    show() {
        strokeWeight(4);
        stroke(this.color[0], this.color[1], this.color[2], this.lifespan);
        point(this.pos.x, this.pos.y);
    }
}

class Base extends Particle {
    constructor(x) {
        super();
        this.pos = createVector(x, height);
        this.vel = createVector(0, random(-8, -10));
    }

    show() {
        strokeWeight(8);
        stroke(255, random(153, 255), 0);
        point(this.pos.x, this.pos.y);
    }
}