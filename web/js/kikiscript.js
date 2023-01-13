function gotoLogin(){
    window.location.replace("http://localhost:8080/login.html");
}
function loginUser(){
    let data = $('#loginForm').serialize();
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'Login?'+data);
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            localStorage.setItem("loginuser",this.responseText );
            window.location.replace("http://localhost:8080/home.html");
        }
    };
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.send();
}
function showPersonalData(){
    document.getElementById("personalData").className = "isvisible";
    document.getElementById("availableBooks").className = "ishidden";
    document.getElementById("option2").className = "isvisible";
    document.getElementById("option1").className = "ishidden";

    const obj = JSON.parse(localStorage.getItem("loginuser"));
    // console.log(obj);
    $("#personalData").html(createFormFromJSON(obj));
}
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
function createFormFromJSON(data) {
    let html = "<br><br><form id='updateInfo_form' name='updateInfo_form' onsubmit='updateUserInfo(); return false;'>";
    for (const x in data) {
        let label = x;
        let input = data[x];
        if (label.localeCompare("lat")  && label.localeCompare("lon")  && label.localeCompare("user_id")  ){
            if (label.localeCompare("student_id") == 0  || label.localeCompare("university") == 0  ||
                label.localeCompare("department") == 0  || label.localeCompare("student_id_from_date") == 0  ||
                label.localeCompare("student_id_to_date") == 0  || label.localeCompare("username") == 0  ||
                label.localeCompare("email") == 0  || label.localeCompare("student_type") == 0 )
                html += "<label for='" + label + "'>" + label +" : "+ input + "</label><br>";
            else {
                html += "<label for='" + label + "'>" + label + ":</label><br>";
                html += "<input type='text' id='" + label + "' name='" + label + "' value='" + input + "'><br>";
            }
        }
    }
    html += "<br><input type='submit' value='Update Personal Info'></form>";
    return html;
}
function updateUserInfo(){
    const obj = JSON.parse(localStorage.getItem("loginuser"));
    let username = obj.username;
    console.log(username);

    console.log("data : " + $('#updateInfo_form').serialize());
    // let myForm = document.getElementById('updateInfo_form');
    // let formData = new FormData(myForm);
    // const data = {};
    // formData.forEach((value, key) => (data[key] = value));
    // var jsonData=JSON.stringify(data);
    // console.log(JSON.parse(jsonData));

    let req = $('#updateInfo_form').serialize() + '&username=' + username;
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', 'UpdateStudentInfo?'+ req);
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) console.log("OK")
    };
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.send();
}
function logout(){
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'Logout?');
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.send();
    GoTo_loginPage()
}

function GoTo_loginPage(){
    window.location.replace("http://localhost:8080");
}
