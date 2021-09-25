<template>
   <body>
      <div id="restaurantpage">
         <div class="ligne">
            <option>Price</option>
            <div>
               <Price/>
            </div>
         </div>
         <div class="ligne">
            <option>Rate</option>
            <div>
               <Stars/>
            </div>
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
   
   let restaurant = {
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
                  let desc=document.createElement('option');
   
                  name.innerHTML = text ;  
                  desc.innerHTML = className ; 
                  ligne.appendChild(desc); 
                  ligne.appendChild(name); 
                  ligne.className = 'ligne';
                  if (before){pageres.prepend(ligne); }
                  else {pageres.appendChild(ligne); }
                                            
      
      }
   
   
      function operatingHours(data, className, i, listhours){
              let operatingHours = document.createElement('div');
              let day=document.createElement('div');
              let hour=document.createElement('div');
              let li = document.createElement('li');
                
              day.innerHTML = i;
              day.classList = 'day';
              hour.innerHTML = data[i] ;
              hour.classList = 'hour';
              li.className = 'hours';
              li.appendChild(day); 
              li.appendChild(hour); 
              operatingHours.appendChild(li);
              listhours.appendChild(li);   
                                            
      
      }
      
    function weekHours(){
      let jours = Object.keys(restaurant.operating_hours);
   
      let listhours = document.createElement('div');
      let desc = document.createElement('option');
      desc.innerHTML = 'Operating Hours' ; 
      listhours.appendChild(desc); 
      for (let i in jours){
          j = jours[i]
          operatingHours(restaurant.operating_hours, 'hour', j, listhours);
      };
    
      let pageres = document.getElementById('restaurantpage');
      
      listhours.className = 'operating_hours';
      pageres.appendChild(listhours); 
    }
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
      
      pageres.appendChild(imglist);
    }
   
      // create name
     
      describeRestaurant(restaurant.cuisine_type, 'Cuisine', 1);
      
      
        describeRestaurant(restaurant.name, 'Restaurant', 1);
   
        addImage('imgres', "https://source.unsplash.com/1000x1000/?food,"+restaurant.cuisine_type);
       
   describeRestaurant("546 678 234", 'Tel', 0);
      describeRestaurant(restaurant.address, 'Address', 0);
     
      let pageres = document.getElementById('restaurantpage');
      let cv = document.createElement('canvas');
      cv.setAttribute('id', 'canvas');
      cv.height = '50';
      cv.width = '400';
      pageres.appendChild(cv);
      
    
      weekHours();
   
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
</style>