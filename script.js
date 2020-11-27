//Initial Setup
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

//Variables
const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
};

const center = {
    x: canvas.width/2,
    y: canvas.height/2
}

let angle = 0;

//Event Listeners
addEventListener('mousemove', e => {
    mouse.x = e.clientX - canvas.width/2;
    mouse.y = e.clientY - canvas.height/2;

    angle = Math.atan2(mouse.y,mouse.x);
});

addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
});

//Objects
function Particle(x, y, radius, color,distanceFromCenter) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.distanceFromCenter = distanceFromCenter;
}

Object.prototype.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
}

Object.prototype.update = function () {
    this.draw();
    this.x = center.x + this.distanceFromCenter*Math.cos(angle);
    this.y = center.y + this.distanceFromCenter*Math.sin(angle);
}

//Implementation
let particles;

function init() {
    particles = [];

    const particleCount = 280;
    const hueIncrement = 360/particleCount;

    for (let i = 0; i < particleCount; i++) {
        const x = canvas.width / 2 + i;
        const y = canvas.height / 2 + i;

        particles.push(new Particle(x, y, 5, `hsl(${hueIncrement*i},50%,50%)`,i));
    }
}

//Animation loop
function animate() {
    requestAnimationFrame(animate);

    c.fillStyle = 'rgba(0,0,0,0.1)';
    c.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
    });
}

init();
animate();
