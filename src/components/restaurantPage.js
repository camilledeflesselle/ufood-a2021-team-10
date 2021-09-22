function remise1(){
  
  function updateUserList(reset=0/* reset to true when you want to show each option*/
      ) {
        // Declare letiables
        let input, filter, ul, li, option, i, txtValue, inlist;
        input = document.getElementById('myInput');
        filter = input.value.toUpperCase();
        ul = document.getElementById("myDropdown");
        li = ul.getElementsByTagName('li');
        inlist=0;

        // Loop through all list items, and hide those who don't match the search
        for (i = 0; i < li.length; i++) {
          option = li[i].getElementsByTagName("option")[0];
          txtValue = option.textContent || option.innerText;
          if (reset || txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
            inlist++;
            let j=i;
            if ( li[j].classList.contains('onlyone')) {
              li[j].classList.remove('onlyone');
            }
          } else {
            li[i].style.display = "none";
        }
      }
      if(inlist<1){
          document.getElementById("noresult").classList.toggle("show2", force=true);
          document.getElementById("noresult").innerHTML = "No result found";
      }
        else{
          document.getElementById("noresult").classList.remove("show2");

          if (inlist==1){
            li[j].classList.add("onlyone"); // add class to change style when there is only one choice
           }
        } 
  }

  function resetFunction() {
      document.getElementById(inputname).value = '';
      updateUserList(1);
  }

  function updateChoices() {
      updateUserList(0);
  }

  function updateSelection(selected){
    document.getElementById(inputname).value = this.children[0].innerText;
  }

  function createData(data){
      let listDiv = document.getElementById('myDropdown');
  
      for (let j = 0; j < data.length; ++j) {
              let li=document.createElement('li');
              let restaurant=document.createElement('option');
              
              restaurant.innerHTML = data[j].name ;   // Use innerHTML to set the text
            
              ali.addEventListener('click', updateSelection);
              li.appendChild(restaurant);
              
    
              listDiv.appendChild(li); 
                                        
      }
  }

  function createInput(inputname, textplaceholder){

      let searchinput = document.createElement('input');
      searchinput.type =  "text";
      searchinput.id = inputname;
      searchinput.placeholder = textplaceholder;
      searchinput.addEventListener('keyup', updateChoices);

      return searchinput
  }

  function createReset(){
     
      let resetinput = document.createElement('input');
      resetinput.addEventListener('click', resetFunction);
      resetinput.type =  "reset";
      resetinput.id =  "reset";
      resetinput.class = "reset";
      resetinput.value =  "X";

      return resetinput
  }

  function resultSelected(){}
  function showChoices() {
      document.getElementById("myDropdown").classList.toggle("show", force=true);
  }

  let classname = "dropbtn"; let inputname = "myInput"; let textplaceholder = "Select a restaurant";

  let dropdown = document.getElementById(classname);

  let searchinput = createInput(inputname, textplaceholder);
  let resetinput = createReset();

  // create html searchbar
  dropdown.appendChild(searchinput);
  dropdown.appendChild(resetinput);

  // show choices corresponding to user's search
  dropdown.addEventListener('click', showChoices);

  // create choices
  createData(restaurants);

  window.onclick = function(event) {
      if (!event.target.matches('#myInput') && !event.target.matches('#reset') && !event.target.matches('.dropbtn')) {
        let dropdowns = document.getElementsByClassName("dropdown-content");
        let i;
        for (i = 0; i < dropdowns.length; i++) {
          let openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
  }
}

export remise1;