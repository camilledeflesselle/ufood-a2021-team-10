<template>
  <canvas id="price_number" height="50" width="500"></canvas>
</template>
<script>
export default {
  props: ["priceTag"],
  mounted() {
    let c = document.getElementById("price_number");
    let canvas = document.getElementById("price_number");
    let ctx = canvas.getContext("2d");

    function strokePrice(priceLevel, doFill) {
      const dollar = "$   ";

      ctx.font = "30px Impact ";

      if (doFill) {
        ctx.fillStyle = "rgb(20, 56, 56)";
        ctx.fillText(
          dollar.repeat(priceLevel),
          canvas.width / 2 - 40,
          canvas.height / 2 + 10
        );
      } else {
        ctx.strokeStyle = "rgb(20, 56, 56)";
        ctx.strokeText(
          dollar.repeat(priceLevel),
          canvas.width / 2 - 40,
          canvas.height / 2 + 10
        );
      }
    }
    strokePrice(this.priceTag, 1);
    strokePrice(4, 0);

    this.vueCanvas = ctx;
  },
};
</script>
