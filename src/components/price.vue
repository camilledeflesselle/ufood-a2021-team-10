<template>
   <canvas id="price_number" height="50" weight="400"></canvas>
</template>
<script>
   export default {
    mounted() {
     let c = document.getElementById("price_number");  
      let canvas = document.getElementById("price_number");
         let ctx = canvas.getContext("2d");
     
         function strokePrice(priceLevel, doFill) {
       const dollar = '$   ';
   
   
   ctx.font = "30px Impact ";
   
   if (doFill){
     ctx.fillStyle="rgb(20, 56, 56)";
     ctx.fillText(dollar.repeat(priceLevel), canvas.width/2-40, canvas.height/2+10);
   }
   else {
   ctx.strokeStyle="rgb(20, 56, 56)";
   ctx.strokeText(dollar.repeat(priceLevel), canvas.width/2-40, canvas.height/2+10);
   }
       }
       let priceLevel = 2;
        
         strokePrice(2,1);
         strokePrice(3,0);
     
       
     this.vueCanvas = ctx;
   
   },
   }
</script>