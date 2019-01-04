let gravity;
let fireworks = [];
let darkness = 2;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    
    gravity = createVector(0, 0.05);
}

function draw() {
    background(0, 0, 0, 25);
    if (random() < 0.01) {
        let x = random(width);
        fireworks.push(new Firework(x));
    }

    for (let i = fireworks.length - 1; i >= 0; i--) {
        const firework = fireworks[i];

        if (firework.done)
            fireworks.splice(i, 1);

        firework.update();
        firework.show();
    }

    if (fireworks.length == 0) {
        background(0, 0, 0, darkness);
        darkness += 2;
    } else
        darkness = 2;
}