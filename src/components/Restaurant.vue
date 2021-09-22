<template>
  <div id="restaurantpage">
    <h1>Restaurant</h1>
    <div><option>Restaurant</option><div>Mission Chinese Food</div></div><div><option>Address</option><div>171 E Broadway, New York, NY 10002</div></div><div><li><div>Monday : 5:30 pm - 11:00 pm</div></li><li><div>Tuesday : 5:30 pm - 12:00 am</div></li><li><div>Wednesday : 5:30 pm - 12:00 am</div></li><li><div>Thursday : 5:30 pm - 12:00 am</div></li><li><div>Friday : 5:30 pm - 12:00 am</div></li><li><div>Saturday : 12:00 pm - 4:00 pm, 5:30 pm - 12:00 am</div></li><li><div>Sunday : 12:00 pm - 4:00 pm, 5:30 pm - 11:00 pm</div></li></div><div><option>Cuisine</option><div>Asian</div></div><div><option>Tel</option><div>546 678 234</div></div><div><option>Itinéraire</option><div>itinéraire</div></div><div><option>Price</option><div>45 $</div></div><div><option>Rate</option><div>4.5/5</div></div>
    </div>
</template>

<style>

pageres{
    display:flex;
    align-content:center;
    justify-items:center;
    flex-direction:column;
   
    margin-right:10%;
}




  
   /* Dropdown button on hover & focus */
   #restaurantpage li:hover,  #restaurantpage li:focus, #restaurantpage li:hover,  #restaurantpage li {
    background-color:  rgb(13, 80, 80);
    color:white;

  }

 .onlyone {
    background-color:  rgb(13, 80, 80) !important;
    color:white !important;

  }

 

  #restaurantpage  {
  
    display:flexbox;
    list-style-type: none;
    color:rgb(29, 24, 24);
  
    padding: 0;
    margin: 0;
    width:100%;
    overflow: auto;
   
    position: absolute;
    
    box-shadow: 0% 5% 10% 0% rgba(0,0,0,0.2);
    z-index: 1;

  }

  #restaurantpage div {
   
    position: relative;
    padding: 2%; /* Add some padding */
    text-decoration: none; /* Remove default text underline */
    
  }
  #restaurantpage div div {
    flex:5;
    position: relative;
    background-color: #f1f1f1;
 
  }

  #restaurantpage div option {
    flex:5;
    color:white;
    position: relative;
    background-color: rgb(20, 56, 56);
 
  }

  #restaurantpage div li {
    flex:5;
    color:rgb(179, 59, 59);
    
    background-color: rgb(20, 56, 56);
 
  }
</style>
