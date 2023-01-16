let lat = null;
let lon = null;
// login student and librarian
function loginUser(){
    let data = $('#loginForm').serialize();
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'Login?'+data);
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const obj = JSON.parse(xhr.responseText);
            // console.log(obj);
            localStorage.setItem("username",document.getElementById("username").value);
            switch (obj.type){
                case "student":
                    localStorage.setItem("type","student");
                    window.location.replace("http://localhost:8080/home.html");
                    break;
                case "librarian":
                    localStorage.setItem("type","librarian");
                    window.location.replace("http://localhost:8080/libHome.html");
                    break;
            }
        }
    };
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.send();
}
// show personalData for student
function showPersonalData(){
    document.getElementById("personalData").className = "isvisible";
    document.getElementById("availableBooks").className = "ishidden";
    document.getElementById("option2").className = "isvisible";
    document.getElementById("option1").className = "ishidden";
    createFormFromJSON("http://localhost:50350/Library_REST_API/library/student/students/");
}
// show availablebooks ajax
function showAvailableBooks(){
    document.getElementById("availableBooks").className = "isvisible";
    document.getElementById("personalData").className = "ishidden";
    document.getElementById("option1").className = "isvisible";
    document.getElementById("option2").className = "ishidden";

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'AvailableBooks?');
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var books = JSON.parse(this.responseText);
            books.forEach(function(book) {
                $('#list_ofAvailableBooks').after("<h3>" + book.title + "</h3>"  +
                    "<img src='" + book.photo + "' alt='book cover photo'><br>" +
                    "<a href='" + book.url + "' target='_blank'>Buy It</a><br>" +
                    "Isbn : " + book.isbn + "<br>" +
                    "Authors : " + book.authors + "<br>" +
                    "Genre : " + book.genre + "<br>" +
                    "Pages : " + book.pages + "<br>" +
                    "Publication Year : " + book.publicationyear);
            });
        }
    };
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.send();
}
// ajax createForm
function createFormFromJSON(request) {
    let html = "<br><br><form id='updateInfo_form' name='updateInfo_form' onsubmit='CheckLocation(); return false;'>";
    const xhr = new XMLHttpRequest();
    //Get user info
    xhr.onload = function ajax () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            // console.log(data[0])
            for (const x in data[0]) {
                let label = x;
                let input = data[0][label];
                let maleCheck = '';
                let femaleCheck = '';
                let otherCheck = '';
                switch(label) {
                    case "password": {
                        html += "<div class='g-3 align-items-center'><div class='col-auto'><label for='password' class='col-form-label'>Password</label ></div>" +
                                "<div class='row align-items-center mb-3'><div class='col-sm-3' onkeyup='check_strength()'>" +
                                "<input type='text' id='password' name='password' value='" + input + "' maxlength='12' minlength='8' class='form-control'/></div>" +
                                "<div style='position: relative; top: 0.5em' id='strength_msg' class='form-text' ></div></div></div>";
                        break;
                    }
                    case "firstname": {
                        html += "<div class='col-sm-4 mb-3'><label for='firstname' class='form-label'>First Name</label>" +
                                "<input id='firstname' name='firstname' type='text' class='form-control' aria-label='First name' value='" + input + "' /></div>";
                        break;
                    }
                    case "lastname": {
                        html += "<div class='col-sm-4 mb-3'><label for='lastname' class='form-label'>Last Name</label>" +
                                "<input id='lastname' name='lastname' type='text' class='form-control' aria-label='Last name' value='" + input + "' /></div>";
                        break;
                    }
                    case "birthdate": {
                        html += "<div class='mb-3 col-sm-2'><label for='birthdate' class='form-label'>Date of Birth</label>" +
                                "<input type='date' id='birthdate' name='birthdate' class='form-control date' min='1920-01-01' max='2006-12-31' value='" + input + "' /></div>";
                        break;
                    }
                    case "telephone": {
                        html += "<div class='col-sm-3 mb-5'><label for='telnumber' class='form-label'>Telephone Number</label>" +
                                "<input id='telnumber' type='tel' name='telephone' class='form-control date' aria-label='Pass Number' minlength='10' maxlength='14' value='" + input + "' /></div>";
                        break;
                    }
                    case "personalpage": {
                        html += "<div class='mb-3 col-sm-4'><label for='personalPage' class='form-label'>Personal Page</label>" +
                                "<input class='form-control' type='url' id='personalPage' name='personalpage' value='" + input + "'/></div>";
                        break;
                    }
                    case "gender": {
                        switch (input) {
                            case "Male":
                                maleCheck = "checked";
                                break;
                            case "Female":
                                femaleCheck = "checked";
                                break;
                            case "Other":
                                otherCheck = "checked";
                                break;
                        }
                        html += "<div class='mb-3'><label class='form-label'>Gender</label><div class='row'></div><div class='form-check form-check-inline'>" +
                                "<input class='form-check-input' type='radio' name='gender' id='gender1' value='Male' " + maleCheck + " />" +
                                "<label class='form-check-label' for='gender1'>Male</label></div>" +
                                "<div class='form-check form-check-inline'><input class='form-check-input' type='radio' name='gender' id='gender2' value='Female' " + femaleCheck + " />" +
                                "<label class='form-check-label' for='gender2'>Female</label></div><div class='form-check form-check-inline'>" +
                                "<input class='form-check-input' type='radio' name='gender' id='gender3' value='Other' " + otherCheck + " />" +
                                "<label class='form-check-label' for='gender3'>Other</label></div></div>";
                        break;
                    }
                    case "country": {
                        html += "<div class='mb-3 col-sm-6'><label for='country' class='form-label'>Country</label>" +
                                    "<input class='form-control' id='country' name='country' value='" + input + "'></div>";
                        break;
                    }
                    case "city": {
                        html += "<div class='mb-3 col-sm-6'><label for='city' class='form-label'>City</label>" +
                                "<input class='form-control' id='city' name='city' value='" + input + "'></div>";
                        break;
                    }
                    case "address": {
                        html += "<div class='mb-3 col-sm-6'><label for='address' class='form-label'>Address</label>" +
                            "<input class='form-control' id='address' name='address' minlength='5' maxlength='50' value='" + input + "'></div>"+
                            "<div style='position: relative; top: 0.5em' id='location_msg' class='form-text' ></div>";
                        break;
                    }
                    case "lat": {
                        lat = input;
                        break;
                    }
                    case "lon": {
                        lon = input;
                        break;
                    }
                    case "libraryname": {
                        html += "<div class='col-sm-3 mb-3'><label for='libraryname' class='form-label'>Library Name</label>"+
                                "<input id='libraryname' type='text' class='form-control' aria-label='Pass Number'  name='libraryname' value='" + input + "'/></div>";
                        break;
                    }
                    case "libraryinfo": {
                        html += "<div class='mb-3 col-sm-6' id='libraryinfo'><label for='info' class='form-label'>Opening Hours & Informations</label>"+
                                "<textarea class='form-control' id='libraryinfo' rows='1' minlength='3' maxlength='50' name='libraryinfo' value='" + input + "'></textarea></div>";
                        break;
                    }
                    default: {
                        if (label == "email" && localStorage.getItem("type") == "librarian") {
                            html += "<div class='mb-3'><div class='col-auto'><label for='email' class='form-label'>Email address</label></div>"+
                                    "<div class='col-sm-6' onchange='mail_duplicate()'>"+
                                    "<input type='email' class='form-control' id='email' name='email'pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$' value='" + input + "' /></div>"+
                                    "<div style='position: relative; top: 0.5em; color: red;' id='mail_msg' class='form-text'></div></div>";
                        } else html += "<label class='form-text' for='" + label + "'>" + label + " : " + input + "</label><br>";
                    }
                }
            }
            html += "<div style='margin-bottom:5px; position: relative; top: 0.5em; color: green;' id='update_msg' class='form-text'></div><br><input type='submit' id='submit' value='Update Personal Info'></form>";
            $("#personalData").html(html);
        } else if (xhr.status !== 200) console.log(xhr.responseText);
    };
    xhr.open("GET", request + localStorage.getItem("username"));
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}
function  CheckLocation(){
    document.getElementById("update_msg").style.display="none";
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {

            var json = JSON.parse(this.responseText);
            var name = json[0].display_name;

            if(name.includes("Crete")) {
                // console.log(name);
                document.getElementById("location_msg").innerHTML = name;
                lat = json[0].lat;
                lon = json[0].lon;
                updateUserInfo();
            }
            else {
                document.getElementById("location_msg").innerHTML = "Only addresses in Crete is allowed";
                // console.log("Only addresses in Crete is allowed");
            }
        }
        else{
            document.getElementById("location_msg").innerHTML = "Address can not be found!";
            // console.log("Address can not be found!");
        }
    });

    var addressName = document.getElementById("address").value;
    var city = document.getElementById("city").value;
    var country = document.getElementById("country").value;
    var address = addressName + " " + city + " " + country;
    xhr.open("GET", "https://forward-reverse-geocoding.p.rapidapi.com/v1/search?q=" + address +"&accept-language=en&polygon_threshold=0.0");
    xhr.setRequestHeader("X-RapidAPI-Key", "8850c2a13fmsh8d8d5df24849f74p138580jsn0562ef4d1dbb");
    xhr.setRequestHeader("X-RapidAPI-Host", "forward-reverse-geocoding.p.rapidapi.com");
    xhr.send();
}
function updateUserInfo(){
    let req = $('#updateInfo_form').serialize() +'&type=' + localStorage.getItem("type") + '&username=' + localStorage.getItem("username") + '&lat=' + lat + '&lon=' + lon;
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', 'UpdateInfo?' + req);
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200){
            document.getElementById("update_msg").style.display = "initial";
            document.getElementById("update_msg").innerHTML = "Info Updated";
        }
    };
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send();
}
function logout(){
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'Logout?');
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.send();
    localStorage.clear();
    GoTo_loginPage();
}
function GoTo_loginPage(){
    window.location.replace("http://localhost:8080");
}
function showLibPersonalData(){
    document.getElementById("personalData").className = "isvisible";
    document.getElementById("option1").className = "ishidden";
    document.getElementById("option2").className = "isvisible";
    createFormFromJSON("http://localhost:50350/Library_REST_API/library/librarian/librarians/");
}

function newBook(){
    document.getElementById("personalData").className = "ishidden";
    document.getElementById("option1").className = "isvisible";
    document.getElementById("option2").className = "ishidden";
}

function addBook(request){
    var xhr = new XMLHttpRequest();
}