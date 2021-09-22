


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
function oneRestaurant(){
  //remise1();
  function describeRestaurant(text, className){
      let pageres = document.getElementById('restaurantpage');
              let ligne = document.createElement('div');
              let name=document.createElement('div');
              let desc=document.createElement('option');

              name.innerHTML = text ;  
              desc.innerHTML = className ; 
              ligne.appendChild(desc); 
              ligne.appendChild(name); 
              ligne.className = 'ligne';
              pageres.appendChild(ligne); 
                                        
  
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
  
function initialisationlocalisation(){
  // On rentre les coordonnées(latitude, longitude) de notre choix dans une letiable
  let maLatlng = new google.maps.LatLng(40.713829, -73.989667);

  // On établit les options de notre choix :
  // la profondeur du zoom, les coordonnées sur lesquelles la carte sera centrée, le type de vue (satellite, plan...)
  let mesOptions = {
     zoom: 10,
     center: maLatlng,
     mapTypeId: google.maps.MapTypeId.ROADMAP
  }

  // On crée notre carte en lui passant toutes nos options en paramètre
  carte = new google.maps.Map(document.getElementById("map_canvas"), mesOptions);

  // On crée un marqueur que l'on positionne grâce au paramètre "position"
  let marker = new google.maps.Marker ({
     position: maLatlng,
     map: carte,
     title: "restaurant"
  });

  // On place un listener sur le marqueur qui contrôle une action qui sera déclenchée lors de l'évènement 'click'
  // Quand on clique sur le marqueur, le zoom de la carte passera à 8
  google.maps.event.addListener(marker, 'click', function(){
     carte.setZoom(8);
  });
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
  describeRestaurant(restaurant.name, 'Restaurant');
  
  addImage('imgres', "https://source.unsplash.com/1000x1000/?food,"+restaurant.cuisine_type);
  describeRestaurant(restaurant.address, 'Address');
  

  describeRestaurant(restaurant.cuisine_type, 'Cuisine');

  describeRestaurant("546 678 234", 'Tel');

  describeRestaurant("10 $ - 45 $", 'Price');

  describeRestaurant("4/5", 'Rate');
  
  let pageres = document.getElementById('restaurantpage');
  let cv = document.createElement('canvas');
  cv.setAttribute('id', 'canvas');
  cv.height = '50';
  cv.width = '400';
  pageres.appendChild(cv);
  


  weekHours();

  let canvas = document.getElementById("canvas");
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
let rate = restaurant.reviews[0].rating;
for(let i= 0; i<5;++i){
  ctx.fillStyle='yellow';
  strokeStar(xi+p*i,25,5,5,2,0);
}
for(let i=0; i<rate; ++i){
  strokeStar(xi+p*i,25,5,5,2,1);

}

function loadScript() {
  let script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "http://maps.google.com/maps/api/js?sensor=false&callback=initialisation$oneRestaurant";

  document.body.appendChild(script);
}
loadScript();
initialisationlocalisation();





}

