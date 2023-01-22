"use strict";
//password checking similarity between pswd and repeat
function passwordsEqual() {
  var confirmPwd = document.getElementById("confirm").value;
  var password = document.getElementById("password").value;

  if (confirmPwd === "" || password === "") {
    document.getElementById("msg").innerHTML = "";
    return "";
  }
  if (password !== confirmPwd) {
    document.getElementById("msg").style.color = "red";
    document.getElementById("msg").style.fontSize = "18px";
    document.getElementById("msg").classList.remove("ph-check-bold");
    document.getElementById("msg").innerHTML = "Doesn't match with Password";
  } else {
    document.getElementById("msg").innerHTML = "";
    document.getElementById("msg").style.color = "green";
    document.getElementById("msg").style.fontSize = "24px";
    document.getElementById("msg").classList.toggle("ph-check-bold");
  }
}
//function tha converts input type for password visibility
function show_password() {
  var pwd = document.getElementById("password");

  var eye = document.getElementById("eye");
  eye.classList.toggle("ph-eye-closed-bold");
  if (pwd.type === "password") {
    pwd.type = "text";
  } else {
    pwd.type = "password";
  }
}

//check how strong psw is
var flag1 = true;
var flag2 = true;
var flagpassword = true;
function check_strength() {
  var pwd = document.getElementById("password").value;
  if (pwd.includes("helmepa") || pwd.includes("uoc") || pwd.includes("tuc")) {
    document.getElementById("strength_msg").style.color = "red";
    document.getElementById("strength_msg").innerHTML = "Weak Password";
    flag1 = false;
  }
  //default state
  if (pwd === "") {
    document.getElementById("strength_msg").innerHTML = "";
  } else {
    document.getElementById("strength_msg").style.color = "orange";
    document.getElementById("strength_msg").innerHTML = "Medium Password";
    flagpassword = true;
    document.getElementById("submit").disabled = false;
  }

  var numbers = pwd.match(/[0-9]+/); //match returns an object with the found matches

  var percent = (pwd.length * 50) / 100;

  if (numbers[0].length >= percent) {
    document.getElementById("strength_msg").style.color = "red";
    flag2 = false;
    document.getElementById("strength_msg").innerHTML = "Weak Password";
  } else {
    flag2 = true;
  }
  if (flag1 !== false && flag2 !== false) {
    var strength = 0;
    if (pwd.match(/[A-Z]+/)) {
      strength += 1;
    }
    if (pwd.match(/[$@#&!]+/)) {
      strength += 1;
    }
    if (strength >= 2) {
      document.getElementById("strength_msg").style.color = "green";
      document.getElementById("strength_msg").innerHTML = "Strong Password";
    } else {
      document.getElementById("strength_msg").style.color = "orange";
      document.getElementById("strength_msg").innerHTML = "Medium Password";
    }
    flagpassword = true;
    document.getElementById("submit").disabled = false;
  } else {
    flagpassword = false;
    document.getElementById("strength_msg").innerHTML = "Weak Password";
    document.getElementById("submit").disabled = true;
  }
}

//mail
var flagmail = true;
var flagpass = true;
function student_checkes() {
  var email = document.getElementById("email").value;

  var unimail = email.substring(email.indexOf(".") + 1, email.lastIndexOf("."));
  var uniselection = document.getElementById("uni").value;

  if (unimail !== uniselection) {
    document.getElementById("unimsg").innerHTML =
        "University doesn't match with email's";
    flagmail = false;
  } else {
    document.getElementById("unimsg").innerHTML = "";
    flagmail = true;
  }

  //date
  var start = new Date(document.getElementById("startDate").value);
  var end = new Date(document.getElementById("expirationDate").value);
  var diffDays = parseInt((end - start) / (1000 * 60 * 60 * 24), 10);
  var studentType = document.getElementById("studentType").value;
  //set limit for each student category
  if (studentType === "PSc") {
    var limit = 6 * 365;
  } else if (studentType === "BSc") {
    var limit = 2 * 365;
  } else {
    var limit = 5 * 365;
  }

  //because minimum start date is 2016
  //  we have 366 day every four years so
  var startYear = start.getFullYear();
  var endYear = end.getFullYear();
  var i = startYear;
  var count = 0;
  //calculate days with 366 days in a year
  while (i <= endYear) {
    if (i % 4 === 0) {
      count++;
    }
    i++;
  }
  //substract those days from the difference so we have it in 365 format
  diffDays = diffDays - count;
  if (diffDays > limit) {
    document.getElementById("datemsg").innerHTML =
        "the pass length must be smaller " + limit / 365 + " years";
    flagpass = false;
  } else {
    document.getElementById("datemsg").innerHTML = "";
    flagpass = true;
  }


}

function selection() {
  var userType = document.getElementById("userType").value;
  if (userType === "librarian") {
    var element = document.querySelector("#studentType");
    var label = document.querySelector("label[for=studentType]");
    element.style.display = "none";
    label.style.display = "none";
    element = document.querySelector("#passNumber");
    label = document.querySelector("label[for=passNumber]");
    element.style.display = "none";
    label.style.display = "none";
    element = document.querySelector("#startDate");
    label = document.querySelector("label[for=startDate]");
    element.style.display = "none";
    label.style.display = "none";
    element = document.querySelector("#expirationDate");
    label = document.querySelector("label[for=expirationDate]");
    element.style.display = "none";
    label.style.display = "none";
    element = document.querySelector("#uni");
    label = document.querySelector("label[for=uni]");
    element.style.display = "none";
    label.style.display = "none";
    element = document.querySelector("#dept");
    label = document.querySelector("label[for=dept]");
    element.style.display = "none";
    label.style.display = "none";
    //change name
    label = document.querySelector("label[for=address]");
    label.innerHTML = "Library Address";
    element = document.querySelector("#address");

    //library name
    element = document.querySelector("#libraryName");
    element.setAttribute("required", ""); //change required state
    label = document.querySelector("label[for=libraryName]");
    element.style.display = "block";
    label.style.display = "block";

    element = document.querySelector("#information");
    element.style.display = "block";
    element = document.querySelector("#info");
    element.setAttribute("required", ""); //change required state
  } else if (userType === "student") {
    var element = document.querySelector("#studentType");
    var label = document.querySelector("label[for=studentType]");
    element.style.display = "block";
    label.style.display = "block";
    element = document.querySelector("#passNumber");
    label = document.querySelector("label[for=passNumber]");
    element.style.display = "block";
    label.style.display = "block";
    element = document.querySelector("#startDate");
    label = document.querySelector("label[for=startDate]");
    element.style.display = "block";
    label.style.display = "block";
    element = document.querySelector("#expirationDate");
    label = document.querySelector("label[for=expirationDate]");
    element.style.display = "block";
    label.style.display = "block";
    element = document.querySelector("#uni");
    label = document.querySelector("label[for=uni]");
    element.style.display = "block";
    label.style.display = "block";
    element = document.querySelector("#dept");
    label = document.querySelector("label[for=dept]");
    element.style.display = "block";
    label.style.display = "block";
    //removes of librarian
    label = document.querySelector("label[for=address]");
    label.innerHTML = "Address";
    element = document.querySelector("#address");
    element.removeAttribute("required"); //change required state
    //library name
    element = document.querySelector("#libraryName");
    label = document.querySelector("label[for=libraryName]");
    element.style.display = "none";
    label.style.display = "none";
    element = document.querySelector("#information");
    element.style.display = "none";
    element = document.querySelector("#info");
    element.removeAttribute("required");
  }
}
function positionSetup(lat, lon) {
  var fromProjection = new OpenLayers.Projection("EPSG:4326");
  var toProjection = new OpenLayers.Projection("EPSG:900913");
  var position = new OpenLayers.LonLat(lon, lat).transform(
      fromProjection,
      toProjection
  );
  return position;
}

function handler(position, message) {
  var popup = new OpenLayers.Popup.FramedCloud(
      "Popup",
      position,
      null,
      message,
      null,
      true // <-- true if we want a close (X) button, false otherwise
  );
  map.addPopup(popup);
  var div = document.getElementById("divID");
  div.innerHTML += "Energopoitihike o Handler<br>";
}
function checkLocationExists() {
  const data = null;
  var lat = document.getElementById("lat");
  var lon = document.getElementById("lon");

  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  document.getElementById("Map").style.display = "block";
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      console.log(this.responseText);
      if (this.responseText === "{}") {
        document.getElementById("msgloc").innerHTML = "does not exist!";
      } else {
        let [tmp] = JSON.parse(this.responseText);
        if (tmp.display_name.includes("Crete")) {
          document.getElementById("msgLoc").innerHTML =
              "location exists in Crete";
        } else {
          document.getElementById("msgLoc").innerHTML =
              "doesnt't exist in Crete";
          document.getElementById("msgLoc").style.color = "red";
        }

        var map = new OpenLayers.Map("Map");
        var mapnik = new OpenLayers.Layer.OSM();
        map.addLayer(mapnik);
        var markers = new OpenLayers.Layer.Markers("Markers");
        map.addLayer(markers);
        lat.value = tmp.lat;
        lon.value = tmp.lon;
        var position = positionSetup(tmp.lat, tmp.lon);
        var mar = new OpenLayers.Marker(position);
        markers.addMarker(mar);
        mar.events.register("mousedown", mar, function (evt) {
          handler(position, "You are here!");
        });

        const zoom = 10;
        map.setCenter(position, zoom);
      }
    }
  });

  var address =
      document.getElementById("address").value +
      " " +
      document.getElementById("city").value +
      " " +
      document.getElementById("country").value;

  xhr.open(
      "GET",
      "https://forward-reverse-geocoding.p.rapidapi.com/v1/search?q=" +
      address +
      "&accept-language=en&polygon_threshold=0.0"
  );
  xhr.setRequestHeader(
      "X-RapidAPI-Key",
      "736c87a1ffmshe2d179efe60edb9p1b3e61jsn4a575defc8a9"
  );
  xhr.setRequestHeader(
      "X-RapidAPI-Host",
      "forward-reverse-geocoding.p.rapidapi.com"
  );

  xhr.send(data);
}


function newUser(){
  let userType = document.getElementById("userType").value;
  if ((flagpass && flagmail && flagpassword ) || userType ==="librarian") {
    let form = document.getElementById("signup")
    let formData = new FormData(form);
    let data = {};
    formData.forEach((value, key) => (data[key] = value));

    let xhr = new XMLHttpRequest();
    xhr.onload = function (){
      if(xhr.readyState === 4 && xhr.status === 200){
        console.log("ok");
      }
      else if(xhr.status!==200){
        console.log("not success");
        console.log(xhr.status);
        console.log(xhr.readyState);
      }
    }
    if(userType === "student"){
      xhr.open('POST', 'PostStudent');
      xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');

      xhr.send(JSON.stringify(data))
    }else if (userType === "librarian"){
      xhr.open('POST', 'PostLibrarian');
      xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
      xhr.send(JSON.stringify(data));
    }
    document.getElementById("submitmsg").innerHTML = "Submitted";
    setTimeout(switch_page, 6000)
  } else {
    document.getElementById("submitmsg").innerHTML = "";
  }
}
function switch_page(){
  window.location.replace("http://localhost:8080/");
}
function switch_reg(){
  window.location.replace("http://localhost:8080/signup.html");
}