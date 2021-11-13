<template>
   <body>
      <div id="restaurantpage">
         <div class="ligne">
            <div class=desc>Price</div>
            <div class = "name">
               <Price/>
            </div>
         </div>
         <div class="ligne">
            <div class=desc>Rate</div>
            <div class="name">
               <Stars/>
            </div>
         </div>
         <div class="operating_hours">
            <div class= "desc">Operating Hours</div>
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
      </div>
      <div class="localisation">
         <Map />
      </div>
   </body>
</template>
<script>
   import Map from './map.vue'
   import Stars from './stars.vue'
   import Price from './price.vue'
   export default {
    name: 'Restaurant',
    components: {
      Map,
      Stars,
      Price
    },
   mounted() {
      //remise1();
   
   const restaurant = {
   "id": 1,
   "name": "Mission Chinese Food",
   "neighborhood": "Manhattan",
   "photograph": "1.jpg",
   "address": "171 E Broadway, New York, NY 10002",
   "latlng": {
    "lat": 40.713829,
    "lng": -73.989667
   },
   "cuisine_type": "Asian",
   "operating_hours": {
    "Monday": "5:30 pm - 11:00 pm",
    "Tuesday": "5:30 pm - 12:00 am",
    "Wednesday": "5:30 pm - 12:00 am",
    "Thursday": "5:30 pm - 12:00 am",
    "Friday": "5:30 pm - 12:00 am",
    "Saturday": "12:00 pm - 4:00 pm, 5:30 pm - 12:00 am",
    "Sunday": "12:00 pm - 4:00 pm, 5:30 pm - 11:00 pm"
   },
   "reviews": [{
      "name": "Steve",
      "date": "October 26, 2016",
      "rating": 4,
      "comments": "Mission Chinese Food has grown up from its scrappy Orchard Street days into a big, two story restaurant equipped with a pizza oven, a prime rib cart, and a much broader menu. Yes, it still has all the hits — the kung pao pastrami, the thrice cooked bacon —but chef/proprietor Danny Bowien and executive chef Angela Dimayuga have also added a raw bar, two generous family-style set menus, and showstoppers like duck baked in clay. And you can still get a lot of food without breaking the bank."
    },
    {
      "name": "Morgan",
      "date": "October 26, 2016",
      "rating": 4,
      "comments": "This place is a blast. Must orders: GREEN TEA NOODS, sounds gross (to me at least) but these were incredible!, Kung pao pastrami (but you already knew that), beef tartare was a fun appetizer that we decided to try, the spicy ma po tofu SUPER spicy but delicous, egg rolls and scallion pancake i could have passed on... I wish we would have gone with a larger group, so much more I would have liked to try!"
    },
    {
      "name": "Jason",
      "date": "October 26, 2016",
      "rating": 3,
      "comments": "I was VERY excited to come here after seeing and hearing so many good things about this place. Having read much, I knew going into it that it was not going to be authentic Chinese. The place was edgy, had a punk rock throwback attitude, and generally delivered the desired atmosphere. Things went downhill from there though. The food was okay at best and the best qualities were easily overshadowed by what I believe to be poor decisions by the kitchen staff."
    }
   ]
   };
      function describeRestaurant(text, className, before){
          let pageres = document.getElementById('restaurantpage');
                  let ligne = document.createElement('div');
                  let name=document.createElement('div');
                  let desc=document.createElement('div');
   
                  name.innerHTML = text ;  
                  name.className = "name" ;  
                  desc.innerHTML = className ; 
                  desc.className = "desc";
                  ligne.appendChild(desc); 
                  ligne.appendChild(name); 
                  ligne.className = 'ligne';
                  if (before){pageres.prepend(ligne); }
                  else {pageres.appendChild(ligne); }
                                            
      
      };
   
      
   
    function addImage(className, link){
   
      let pageres = document.getElementById('restaurantpage');
      let imglist = document.createElement('div');
      for (let i=0; i<6; i++){
        let img = document.createElement('img');
        img.src = link;
        img.className = className;
        imglist.appendChild(img);
        imglist.className = 'list'+className;
      }
      
      pageres.prepend(imglist);
    }
   
      // create name
     
      describeRestaurant(restaurant.cuisine_type, 'Cuisine', 1);
      
       addImage('imgres', "https://source.unsplash.com/1000x1000/?food,"+restaurant.cuisine_type);
       
        describeRestaurant(restaurant.name, 'Restaurant', 1);
   
       
       
      describeRestaurant("546 678 234", 'Tel', 0);
     
      describeRestaurant(restaurant.address, 'Address', 0);
    
      
   
   }
   }
</script>
<style>
   /*page restaurant*/
   html, body {
   height: 100%;
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
   .ligne .desc {
   flex:1;
   color:white;
   padding:10px;
   background-color: rgb(20, 56, 56);
   align-items: center;
   font-size: 20px;
   border-top-left-radius: 10px;
   }
   .ligne .name {
   flex:2;
   display:flex;
   background-color: #f1f1f1;
   align-items: center;
   border-bottom-right-radius: 10px;
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
   .operating_hours {
   width:100%;
   padding:20px;
   display:flex;
   flex-direction: column;
   }
   .operating_hours .desc {
   border-top-left-radius: 10px;
   border-top-right-radius: 10px;
   flex:1;
   color:white;
   padding:10px;
   background-color: rgb(20, 56, 56);
   align-items: center;
   font-size: 20px;
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
   canvas {
   width:100%;
   }
</style>