
//code for get theme in sessionStorage and apply the theme
//this function is on onload so gettheme() will start when the page is load.
function getTheme(){
  var webTheme = document.body;
  var icon = document.getElementById("theme-icon");
  //if there is no theme color store in session, use default theme which is light
  if(sessionStorage.getItem("theme") == null){
    sessionStorage.setItem("theme", "light");
  }

  //set theme of webpage to the theme color, store in session
  webTheme.dataset.bsTheme = sessionStorage.getItem("theme");
  
  // change theme-icon according to theme 
  if(sessionStorage.getItem("theme") == 'light'){
    icon.classList.add("bi-sun-fill");
  }
  else{
    icon.classList.add("bi-moon-stars-fill");
  }
}

//code for theme switch
// button function that will change the theme of website on click and the icon of the button change according to the theme
function themeSwitch(){
    var icon = document.getElementById("theme-icon");

    var webTheme = document.body;
    //light mode turn to dark mode
    if(webTheme.dataset.bsTheme == 'light'){
        webTheme.dataset.bsTheme = 'dark';
        icon.classList.replace("bi-sun-fill","bi-moon-stars-fill");
    }
    //dark mode turn to light mode
    else{
        webTheme.dataset.bsTheme = 'light';
        icon.classList.replace("bi-moon-stars-fill","bi-sun-fill");
    }
    sessionStorage.setItem("theme", webTheme.dataset.bsTheme);
}
//end of code for theme switch

//code for timer 
if(window.location.pathname.includes('/pledge')){
// Set the date we're counting down to
var countDownDate = new Date("Jan 1, 2050 24:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var years = Math.floor(distance / (1000 * 60 * 60 * 24 * 365));
  var days = Math.floor(distance  % (1000 * 60 * 60 * 24 * 365) / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("timer").innerHTML = years + "yr " + days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("timer").innerHTML = "EXPIRED";
  }
}, 1000);
}
//end of code for timer

//code for inserting rows in table

if(window.location.pathname.includes('/reason')){
  //data for table
var tableDate = [
  {
    year : '2016', anomalyCelsius : '0.99', anomalyFahrenheit : '1.78'
  },
  {
    year : '2020', anomalyCelsius : '0.98', anomalyFahrenheit : '1.76'
  },
  {
    year : '2019', anomalyCelsius : '0.94', anomalyFahrenheit : '1.69'
  },
  {
    year : '2015', anomalyCelsius : '0.93', anomalyFahrenheit : '1.67'
  },
  {
    year : '2017', anomalyCelsius : '0.91', anomalyFahrenheit : '1.64'
  },
  {
    year : '2022', anomalyCelsius : '0.86', anomalyFahrenheit : '1.55'
  },
  {
    year : '2021', anomalyCelsius : '0.84', anomalyFahrenheit : '1.51'
  },
  {
    year : '2018', anomalyCelsius : '0.82', anomalyFahrenheit : '1.48'
  },
  {
    year : '2014', anomalyCelsius : '0.74', anomalyFahrenheit : '1.33'
  },
  {
    year : '2010', anomalyCelsius : '0.72', anomalyFahrenheit : '1.30'
  },
]

//function to built table with json table data.
//input      : table data (array of objects)
//output     : table in html
function builtTable(tData){
  var table = document.getElementById('tableBody');
  for(let r = 0; r < tData.length; r++){
    var row = `<tr>
              <th scope="row">${(r+1)}</th>
              <td>${tData[r].year}</td>
              <td>${tData[r].anomalyCelsius}</td>
              <td>${tData[r].anomalyFahrenheit}</td>
              </tr>`
    table.innerHTML += row;
  }
}

builtTable(tableDate);
  
}
//end of code for inserting rows in table

//start of code for form submit
if(window.location.pathname.includes('/pledge')){
// Replace default form submit behavior with Bootstrap form submit
(() => {

  
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation');
  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      //validation of input
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      //if data is valid show it in modal
      else{
          event.preventDefault();
          event.stopPropagation();
          //show name in modal 
          document.getElementById("showName").innerHTML = 'Name : ' + document.getElementById('inputName').value;

          //show email in modal 
          document.getElementById("showEmail").innerHTML = 'Email : ' + document.getElementById('inputEmail').value;

          //show phone number in modal 
          document.getElementById("showPhoneNumber").innerHTML = 'Phone No : ' + document.getElementById('phone').value;

          //show status in modal
          document.getElementById("showStatus").innerHTML = 'Status : ' + document.getElementById('statusSelect').value;

          //show date of birth in modal
          document.getElementById("showDOB").innerHTML = 'DOB : ' + document.getElementById('dateOfBirth').value;

          //show gender in modal
          var genderAll = document.getElementsByName('gender');
          //loop over the gender radio and find the one with check
          for (i = 0; i < genderAll.length; i++) {
              if (genderAll[i].checked)
                  document.getElementById("showGender").innerHTML = "Gender: " + genderAll[i].value;
          }

          //show contact by in modal 
          let checkboxes = document.querySelectorAll('input[name="contact"]:checked');
          let contactByResult = [];
          //loop through all checked checkbox and push the value to result.
          checkboxes.forEach((checkbox) => {
              contactByResult.push(checkbox.value);
          });
          //if no contact show none
          if(contactByResult.length == 0){
              document.getElementById("showContactBy").innerHTML= 'contact By : None';
          }
          //show if there is contact
          else{
              document.getElementById("showContactBy").innerHTML= 'contact By : ' + contactByResult.toString();
          }

           //show address in modal
          document.getElementById("showAddr").innerHTML = 'Address : ' + document.getElementById('inputAddress').value;

          //show commitment level in modal
          document.getElementById("showCommitted").innerHTML = 'Commitment Level : ' + document.getElementById('PledgeRange').value;

          //show reason in modal
          document.getElementById("showReason").innerHTML = 'Reason : ' + document.getElementById('reasonTextarea').value;

          //show modal 
          var modal1 = new bootstrap.Modal(document.getElementById('Modal'));
          modal1.toggle();
      }
      
      form.classList.add('was-validated');
    }, false);
  })
})()

}

//end of code for form submit
