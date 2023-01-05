function gotoLogin(){
    window.location.replace("http://localhost:8080/login.html");
}

function loginUser(){
    let data = $('#loginForm').serialize();
    console.log(data);
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'Login?'+data);
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var student = JSON.parse(this.responseText);
            window.location.replace("http://localhost:8080/home.html");
            console.log(student)
        }
    };
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.send();
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
                    "<img src='" + book.photo + "'></img><br>" +
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

function logout(){
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'Logout?');
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.send();
    GoTo_loginPage()
}

function showPersonalData(){
    console.log("showPersonalData");
}