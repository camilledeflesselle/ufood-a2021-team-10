<template>
<body>
	<div id="restaurantpage">
		<div class="ligne">
   <option>Restaurant</option>
   <div>Mission Chinese Food</div>
</div>
<div class="listimgres"><img src="https://source.unsplash.com/1000x1000/?food,Asian" class="imgres"><img src="https://source.unsplash.com/1000x1000/?food,Asian" class="imgres"><img src="https://source.unsplash.com/1000x1000/?food,Asian" class="imgres"><img src="https://source.unsplash.com/1000x1000/?food,Asian" class="imgres"><img src="https://source.unsplash.com/1000x1000/?food,Asian" class="imgres"><img src="https://source.unsplash.com/1000x1000/?food,Asian" class="imgres"></div>

<div class="ligne">
   <option>Cuisine</option>
   <div>Asian</div>
</div>
<div class="ligne">
   <option>Tel</option>
   <div>546 678 234</div>
</div>
<div class="ligne">
   <option>Price</option>
   <div>10 $ - 45 $</div>
</div>
<div class="ligne">
   <option>Rate</option>
   <div><Stars /></div>

</div>

  
  

<div class="operating_hours">
   <option>Operating Hours</option>
   <li class="hours">
      <div class="day">Monday</div>
      <div class="hour">5:30 pm - 11:00 pm</div>
   </li>
   <li class="hours">
      <div class="day">Tuesday</div>
      <div class="hour">5:30 pm - 12:00 am</div>
   </li>
   <li class="hours">
      <div class="day">Wednesday</div>
      <div class="hour">5:30 pm - 12:00 am</div>
   </li>
   <li class="hours">
      <div class="day">Thursday</div>
      <div class="hour">5:30 pm - 12:00 am</div>
   </li>
   <li class="hours">
      <div class="day">Friday</div>
      <div class="hour">5:30 pm - 12:00 am</div>
   </li>
   <li class="hours">
      <div class="day">Saturday</div>
      <div class="hour">12:00 pm - 4:00 pm, 5:30 pm - 12:00 am</div>
   </li>
   <li class="hours">
      <div class="day">Sunday</div>
      <div class="hour">12:00 pm - 4:00 pm, 5:30 pm - 11:00 pm</div>
   </li>
</div>
<div class="ligne">
   <option>Address</option>
   <div>171 E Broadway, New York, NY 10002</div>
    
</div>
<div class="localisation">
    <Map />
 </div>

</div>

</body>

</template>

<script>
import Map from './map.vue'
import Stars from './stars.vue'
export default {
 name: 'Restaurant',
 components: {
   Map,
   Stars
 }
}
</script>
<style>

/*page restaurant*/


html, body {
  height: 100%;

  background-color: rgb(255, 218, 182);
  font-family: 'Montserrat';

}


  #restaurantpage  {
    display: flex;
    flex-direction: column;
    text-decoration: none; 
    list-style-type: none;
    margin:5%;
    width:80%;
    
  }

  .ligne div {
    display:flex;
    padding:20px;
 
  }
  .ligne {
    display:flex;
    padding:20px;
    text-decoration: none; 
    width:100%;
  
  }

 .ligne div {
    flex:2;
    background-color: #f1f1f1;
    align-items: center;
    border-bottom-right-radius: 10px;
 
  }
  .ligne option {
    flex:1;
    background-color: #f1f1f1;
    align-items: center;
    border-top-left-radius: 10px;
 
  }
  #restaurantpage div option {
    color:white;
    padding:10px;
    background-color: rgb(20, 56, 56);
    font-size: 20px;
 
  }

.operating_hours {
  width:100%;
  padding:20px;
  display:flex;
  flex-direction: column;
}

.operating_hours option {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}


.operating_hours li {
 display:flex;
 flex-direction:row;


 }

  .day {
    background-color: rgb(79, 109, 109);
    color:white;
    flex:2;
    padding:20px;
  }

  .hour {
    background-color:#f1f1f1;
    color: rgb(79, 109, 109);
    flex:6;
    padding:20px;
  }

  .imgres {
    flex:1;
    width: 20%;
    height: 20%;
    padding:2px;

  align-content: center;
}

.listimgres {
  display:flex;
  padding-left:20px;
  padding-right: 20px;
  flex-flow: row wrap;
  justify-content: center;
  width:100%;
  align-content: center;
}

canvas {
  width:100%;
}
.localisation{
  width:100%;
  align-content: center !important;
}
</style>
