const canvas = document.querySelector('#canvas');
const context = canvas.getContext("2d");

let w, h, particles;
let particleDistance = 40;
let mouse = {
  x: undefined,
  y: undefined,
  radius: 100,
}

const init = () => {
  resizeReset();
  animationLoop();
};

const resizeReset = () => {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  console.log(`w: ${w}, h: ${h}`);

  particles = [];

  for (let y = (((h - particleDistance) % particleDistance) + particleDistance) / 2; y < h; y += particleDistance) {
    for (let x = (((w - particleDistance) % particleDistance) + particleDistance) / 2; x < w; x += particleDistance) {
      particles.push(new Particle(x, y));
    };
  };
};

const animationLoop = () => {
  context.clearRect(0, 0, w, h);
  drawScene();
  requestAnimationFrame(animationLoop);
};

const drawScene = () => {
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
  };
  drawLine();
};

// remove this for just dots
const drawLine = () => {
  for (let a = 0; a < particles.length; a++) {
    for (let b = a; b < particles.length; b++) {
      let dx = particles[a].x - particles[b].x;
      let dy = particles[a].y - particles[b].y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < particleDistance * 1.5) {
        opacity = 1 - (distance / (particleDistance * 1.5));
        context.strokeStyle = "rgba(255,255,255" + opacity + ")";
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(particles[a].x, particles[a].y);
        context.lineTo(particles[b].x, particles[b].y);
        context.stroke();
      };
    };
  };
};

const mouseMovement = (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
  // console.log(`Mouse x: ${mouse.x}, mouse y: ${mouse.y}`);
};

const mouseOut = (e) => {
  mouse.x = undefined;
  mouse.y = undefined;
};


class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 4;
    this.baseX = this.x;
    this.baseY = this.y;
    this.speed = (Math.random() * 25) + 5;
  };
  draw() {
    context.fillStyle = "rgba(255,255,255,1)";
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    context.closePath();
    context.fill();
  };
  update() {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    // console.log(`Distance: ${distance}, dx: ${dx}`);

    let maxDistance = mouse.radius;
    let force = (maxDistance - distance) / maxDistance
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    let directionX = forceDirectionX * force * this.speed;
    let directionY = forceDirectionY * force * this.speed;

    if (distance < mouse.radius) {
      this.x -= directionX;
      this.y -= directionY;
    } else {
      if (this.x !== this.baseX) {
        let dx = this.x - this.baseX;
        this.x -= dx / 10;
      }
      if (this.y !== this.baseY) {
        let dy = this.y - this.baseY;
        this.y -= dy / 10;
      }
    }
  };
};

init();

window.addEventListener('resize', resizeReset);
window.addEventListener('mousemove', mouseMovement);
window.addEventListener('mouseout', mouseOut);
