// system-map.js
(function () {
  const canvas = document.getElementById('systemMap');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const nodes = [
    { x: 90, y: 90, label: 'Adapters' },
    { x: 250, y: 70, label: 'Normalize' },
    { x: 430, y: 100, label: 'Graph' },
    { x: 170, y: 240, label: 'Analyze' },
    { x: 370, y: 235, label: 'Govern' }
  ];

  const edges = [[0,1],[1,2],[1,3],[3,4],[2,4]];

  function roundRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#09111c';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    edges.forEach(([a, b]) => {
      ctx.strokeStyle = 'rgba(106,168,255,0.55)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(nodes[a].x, nodes[a].y);
      ctx.lineTo(nodes[b].x, nodes[b].y);
      ctx.stroke();
    });

    nodes.forEach((node, i) => {
      const w = 120;
      const h = 44;
      roundRect(node.x - w / 2, node.y - h / 2, w, h, 14);
      ctx.fillStyle = i % 2 === 0 ? 'rgba(106,168,255,0.22)' : 'rgba(139,255,214,0.18)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.18)';
      ctx.stroke();
      ctx.fillStyle = '#eef4ff';
      ctx.font = '600 14px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.label, node.x, node.y);
    });
  }

  draw();
})();