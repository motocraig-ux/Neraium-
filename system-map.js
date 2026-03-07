const map = document.getElementById("systemMap");

if (map) {
  const ctx = map.getContext("2d");
  const w = map.width;
  const h = map.height;

  const nodes = [];
  for (let i = 0; i < 22; i++) {
    nodes.push({
      x: Math.random() * w,
      y: Math.random() * h,
      hot: Math.random() < 0.12
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    // links
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);

        if (d < 220) {
          const a = 1 - d / 220;
          ctx.strokeStyle = `rgba(46,211,255,${0.10 * a})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // nodes
    for (const n of nodes) {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.hot ? 5 : 4, 0, Math.PI * 2);
      ctx.fillStyle = n.hot ? "#ffc857" : "#00a6ff";
      ctx.shadowBlur = 14;
      ctx.shadowColor = n.hot ? "rgba(255,200,87,0.6)" : "rgba(0,170,255,0.55)";
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  draw();
}