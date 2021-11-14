<template>
  <canvas id="stars" height="50" width="400"></canvas>
</template>
<script>
export default {
  props: ["rating"],
  mounted() {
    let c = document.getElementById("stars");
    let canvas = document.getElementById("stars");
    let ctx = canvas.getContext("2d");

    function strokeStar(x, y, r, n, inset, doFill, half) {
      ctx.save();
      ctx.beginPath();
      ctx.translate(x, y);
      ctx.moveTo(0, 0 - r);
      let loop = n;
      if (half) {
        loop = 2;
      }
      for (let i = 0; i < loop; i++) {
        ctx.rotate(-Math.PI / n);
        ctx.lineTo(0, 0 - r * inset);
        ctx.rotate(-Math.PI / n);
        ctx.lineTo(0, 0 - r);
      }
      if (half) {
        ctx.rotate(-Math.PI / n);
        ctx.lineTo(0, 0 - r * inset);
      }
      ctx.closePath();
      if (!doFill) {
        ctx.stroke();
      } else {
        ctx.fill();
      }
      ctx.restore();
    }
    let xi = 100;
    let p = 50;
    ctx.fillStyle = "yellow";
    for (let i = 0; i < 5; ++i) {
      strokeStar(xi + p * i, 25, 5, 5, 2, 0);
    }
    for (let i = 0; i < this.rating - 1; ++i) {
      strokeStar(xi + p * i, 25, 5, 5, 2, 1);
    }
    if (this.rating - (Math.ceil(this.rating) - 1) > 0.5) {
      strokeStar(xi + p * (Math.ceil(this.rating) - 1), 25, 5, 5, 2, 1, 1);
    }
    this.vueCanvas = ctx;
  },
};
</script>
