<template>
  <canvas id=stars height="50" width="400"></canvas>
</template>
<script>

export default {
 mounted() {
  let c = document.getElementById("stars");  
   let canvas = document.getElementById("stars");
      let ctx = canvas.getContext("2d");
  
      function strokeStar(x, y, r, n, inset, doFill) {
        ctx.save();
        ctx.beginPath();
        ctx.translate(x, y);
        ctx.moveTo(0,0-r);
        for (var i = 0; i < n; i++) {
            ctx.rotate(Math.PI / n);
            ctx.lineTo(0, 0 - (r*inset));
            ctx.rotate(Math.PI / n);
            ctx.lineTo(0, 0 - r);
        }
        ctx.closePath();
        if (!doFill) {ctx.stroke();}
        else {ctx.fill();}
        ctx.restore();
    }
      let xi=100;
    let p = 50;
    let rate = 4;
    for(let i= 0; i<5;++i){
      ctx.fillStyle='yellow';
      strokeStar(xi+p*i,25,5,5,2,0);
    }
    for(let i=0; i<rate; ++i){
      strokeStar(xi+p*i,25,5,5,2,1);
  
    }
  this.vueCanvas = ctx;

},
}
</script>