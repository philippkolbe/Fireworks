function randomizeColors(colors) {
    if (colors == "RAINBOW") //RAINBOW
        return [round(random(75, 255)), round(random(75, 255)), round(random(75, 255))];

    colors = JSON.parse(JSON.stringify(colors));//clone

    let c = random(colors);
    if (typeof c === "number") {//One colored firework
        let rdm = round(random(colors.length - 1));
        colors[rdm] += round(random(-40, 40));;
        return colors;
    } else {//several colored firework
        let rdm = random();
        for (c of colors) {
            if (rdm < c.prob) {
                let rdm2 = round(random(c.color.length - 1));
                c.color[rdm2] += round(random(-40, 40));;
                return c.color;
            }
        }
    }
}

class Firework {
    constructor(x) {
        this.sparkles = [];
        this.base = new Base(x);

        this.done = false;

        this.nrOfExplosions = round(getRandomNrOfExplosions());
        console.log(this.nrOfExplosions);
        this.colors = getRandomColors(this.nrOfExplosions);
        this.shape = getRandomShape();
        this.nrOfSparkles = getRandomNrOfSparkles(this.nrOfExplosions);

        this.lifeloss = -0.002*this.nrOfSparkles + 4.546;
        
        this.currentExplosion = 0;
        this.timeSinceLastExplosion = 0;
    }

    update() {
        if (this.allExploded() && this.sparkles.length == 0) {
            this.done = true;
            return;
        }

        if (this.base.vel.y >= 0 && this.timeSinceLastExplosion > 15 && !this.allExploded())
            this.explode();
        else
            this.timeSinceLastExplosion++;

        if (this.currentExplosion == 0) {
            this.base.applyForce(gravity);
            this.base.update();
        } else {
            for (let i = this.sparkles.length - 1; i >= 0; i--) {
                const sparkle = this.sparkles[i];

                if (sparkle.done)
                    this.sparkles.splice(i, 1);

                sparkle.applyForce(gravity);
                sparkle.update();
            }
        }
    }

    show() {
        if (this.currentExplosion == 0) {
            this.base.show();
        } else {
            for (let s of this.sparkles)
                s.show();
        }
    }

    explode() {
        for (let i = 0; i < this.nrOfSparkles; i++)
            this.sparkles.push(new Sparkle(this.base.pos.x, this.base.pos.y, randomizeColors(this.colors[this.currentExplosion]), this.shape, this.lifeloss));
        
        this.timeSinceLastExplosion = 0;
        this.currentExplosion++;
        this.base.done = true;
    }

    allExploded() {
        return (this.currentExplosion >= this.nrOfExplosions);
    }
}

function getRandomColors(nrOfExplosions) {
    let colorArray = [];
    for (let i = 0; i < nrOfExplosions; i++) {
        const rdm1 = random(),
            rdm2 = random();
        if (rdm1 < 2/3) {
            if (rdm2 < 0.1)
                colorArray.push([251, 176, 20]);//orange
            else if (rdm2 < 0.2)
                colorArray.push([255, 255, 255]); //white/silver
            else if (rdm2 < 0.3)
                colorArray.push([253, 209, 20]); //gold/yellow
            else if (rdm2 < 0.4)
                colorArray.push([128, 255, 0]); //lime
            else if (rdm2 < 0.5)
                colorArray.push([150, 0, 150]); //purple
            else if (rdm2 < 0.6)
                colorArray.push([0, 50, 255]); //blue
            else if (rdm2 < 0.7)
                colorArray.push([255, 0, 0]); //red
            else if (rdm2 < 0.8)
                colorArray.push([0, 255, 255]); //cyan
            else if (rdm2 < 0.9)
                colorArray.push([0, 255, 50]); //darkgreen
            else
                colorArray.push("RAINBOW");
        } else {
            if (rdm2 < 0.1)
                colorArray.push([ //red white
                    {
                        color: [255, 0, 0], 
                        prob: 0.8
                    },
                    {
                        color: [255, 255, 255],
                        prob: 1
                    }
                ]);
            else if (rdm2 < 0.2)
                colorArray.push([ //red purple
                    {
                        color: [255, 0, 0],
                        prob: 0.5
                    },
                    {
                        color: [150, 0, 150],
                        prob: 1
                    }
                ]);
            else if (rdm2 < 0.3)
                colorArray.push([ //red yellow orange
                    {
                        color: [255, 0, 0],
                        prob: 0.33
                    },
                    {
                        color: [251, 176, 20],
                        prob: 0.66
                    },
                    {
                        color: [253, 209, 20],
                        prob: 1
                    }
                ]);
            else if (rdm2 < 0.4)
                colorArray.push([ //blue white
                    {
                        color: [0, 50, 255],
                        prob: 0.8
                    },
                    {
                        color: [255, 255, 255],
                        prob: 1
                    }
                ]);
            else if (rdm2 < 0.5)
                colorArray.push([ //blue cyan
                    {
                        color: [0, 50, 255],
                        prob: 0.5
                    },
                    {
                        color: [0, 255, 255],
                        prob: 1
                    }
                ]);
            else if (rdm2 < 0.6)
                colorArray.push([ //blue purple
                    {
                        color: [0, 50, 255],
                        prob: 0.5
                    },
                    {
                        color: [150, 0, 150],
                        prob: 1
                    }
                ]);
            else if (rdm2 < 0.7)
                colorArray.push([ //green lime
                    {
                        color: [0, 255, 50],
                        prob: 0.5
                    },
                    {
                        color: [128, 255, 0],
                        prob: 1
                    }
                ]);
            else if (rdm2 < 0.8)
                colorArray.push([ //green blue
                    {
                        color: [0, 255, 50],
                        prob: 0.5
                    },
                    {
                        color: [0, 50, 255],
                        prob: 1
                    }
                ]);
            else if (rdm2 < 0.9)
                colorArray.push([ //green yellow
                    {
                        color: [0, 255, 50],
                        prob: 0.5
                    },
                    {
                        color: [251, 176, 20],
                        prob: 1
                    }
                ]);
            else
                colorArray.push([ //green white
                    {
                        color: [0, 50, 255],
                        prob: 0.8
                    },
                    {
                        color: [255, 255, 255],
                        prob: 1
                    }
                ]);
        }
    }
    
    return colorArray;
}

function getRandomNrOfExplosions() {
    let rdm = random();
    
    if (rdm < 2/3)
        return 1;
    else if (rdm < 5/6)
        return 2;
    else if (rdm < 11/12)
        return 3;
    else
        return 4;
}

function getRandomNrOfSparkles(nrOfExplosions) {
    let nr;

    do {
        let rdm = pow(random(0, 1), 3);
        nr = round(constrain(rdm * 1000, 50, 1000));
    } while (nr*nrOfExplosions > 2500);

    return nr;
}

function getRandomShape() {
    let rdm = random();
    if (rdm < 2/3) {
        return {
            name: "NORMAL",
            size: "rdm"
        }
    } else if (rdm < 5/6)
        return {
            name: "CIRCLE",
            size: random(2, 5)
        }
    else
        return {
            name: "HEART",
            size: random(2, 5)
        }
}
