


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
                pageres.appendChild(ligne); 
                                          
    
    }


    function operatingHours(data, className, i, listhours){
            let operatingHours = document.createElement('div');
            let day=document.createElement('div');
            let li = document.createElement('li');
              
            day.innerHTML = i + ' : ' + data[i] ;   // Use innerHTML to set the text
              
            li.appendChild(day); 
            operatingHours.appendChild(li);
            listhours.appendChild(li);   
                                          
    
    }
  
 

    // create name
    describeRestaurant(restaurant.name, 'Restaurant');
    describeRestaurant(restaurant.address, 'Address');
    let jours = Object.keys(restaurant.operating_hours);

    let listhours = document.createElement('div');
    for (let i in jours){
        j = jours[i]
        operatingHours(restaurant.operating_hours, 'hour', j, listhours);
    };
  
    let pageres = document.getElementById('restaurantpage');
    pageres.appendChild(listhours); 

    describeRestaurant(restaurant.cuisine_type, 'Cuisine');

    describeRestaurant("546 678 234", 'Tel');

    describeRestaurant("45 $", 'Price');

    describeRestaurant("4.5/5", 'Rate');

    describeRestaurant("itinéraire", 'Itinéraire');


  

  }