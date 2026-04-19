
if(document.body.classList.contains("infection-enabled")){

    const canvas = document.createElement("canvas");
    canvas.id = "infection-canvas";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

   // let greenAlpha = 0.5; // subtle glow

    // --- PARTICLES ---
    const particles = [];
    for (let i = 0; i < 60; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            size: 2 + Math.random() * 2
        });
    }

function draw() {

  let pulseSpeed = 1000;
  let nextSpeedChange = Date.now() + 2000;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // redish background
  //This should make the canvas breathe
 /* let pulse = 0.1 + Math.sin(Date.now() /1000) * 0.1;
  ctx.fillStyle = `rgba(200, 80, 0, ${pulse})`;//change green back to 50 if 80 is too much*/

  //random breathing
  if(Date.now() > nextSpeedChange){
       pulseSpeed = 500 + Math.random() * 2000;
       nextSpeedChange = Date.now() + 2000 + Math.random() * 2000;
  }

  let pulse = 0.1 + Math.sin(Date.now() / pulseSpeed) * 0.1;
  ctx.fillStyle = `rgba(200, 50, 0, ${pulse})`;

  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // particles
  ctx.fillStyle = "rgba(255,0,0,0.8)";
  for (const p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();

    p.x += p.vx;
    p.y += p.vy;

    // soft bounce
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
  }

  requestAnimationFrame(draw);
}

draw();
}

