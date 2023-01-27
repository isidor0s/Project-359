function returnbook(id) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            console.log(data);
            document.getElementById(id).value = "Returned";
            document.getElementById(id).className = "btn btn-success";
            document.getElementById(id).disabled = true;
        }else console.log(xhr.responseText);
    };
    xhr.open("PUT", "http://localhost:50350/Library_REST_API/library/borrowing/updateStatus/" + id + "/returned");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}
function ShowBorrowings(){
    makeAllHidden_Student();
    document.getElementById("borroowingTable").className = "isvisible";
    document.getElementById("option3").className = "ishidden";

    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const obj = JSON.parse(xhr.responseText);
            var table = document.getElementById("borrowings");
            table.innerHTML = "";
            let thead = table.createTHead();
            let row = thead.insertRow(0);
            row.insertCell(0).innerHTML = "Title";
            row.insertCell(1).innerHTML="ISBN";
            row.insertCell(2).innerHTML="Library";
            row.insertCell(3).innerHTML="From Date";
            row.insertCell(4).innerHTML="To Date";
            row.insertCell(5).innerHTML="Status";

            let tbody = table.createTBody();
            var i = 0;
            for(let x in obj){
                let row = tbody.insertRow(i);
                row.id = obj[x].username;
                row.insertCell(0).innerHTML=obj[x].book_name;
                row.insertCell(1).innerHTML=obj[x].isbn;
                row.insertCell(2).innerHTML=obj[x].library_name;
                row.insertCell(3).innerHTML=obj[x].fromDate;
                row.insertCell(4).innerHTML=obj[x].toDate;
                row.insertCell(5).innerHTML=obj[x].status;
                if (obj[x].status == "successEnd" && obj[x].reviewExist == "false")
                    row.insertCell(6).innerHTML= "<input id='"+obj[x].isbn+"' type='button'  class='btn btn-success' onclick='addReview(this.id)' value='Add Review'>";
                if (obj[x].status == "successEnd" && obj[x].reviewExist == "true")
                    row.insertCell(6).innerHTML = "<input id='" + obj[x].isbn + "' type='button'  class='btn btn-primary' onclick='ShowReview(this.id)' value='Show Review'>";
                if (obj[x].status == "borrowed")
                    row.insertCell(6).innerHTML= "<button id='"+obj[x].borrowing_id+"'   class='btn btn-danger' onclick='returnBook(this.id)'>Return Book</button>";
                i++;
            }

        } else if (xhr.status !== 200) {
            console.log(xhr.responseText);
        }
    };
    xhr.open("GET", "http://localhost:50350/Library_REST_API/library/borrowing/user/"+sessionStorage.getItem("id"));
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}
function PostReview(){
    let data ='{"user_id":"' + sessionStorage.getItem("id") + '",' +
        '"isbn":"' + document.getElementById("newreview").className+ '",' +
        '"reviewText":"' + document.getElementById("review").value + '",' +
        '"reviewScore":"' + document.getElementById("score").value + '"}';
    // var jsonData=JSON.stringify(data);
    // console.log(jsonData);
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200){
            const obj = JSON.parse(xhr.responseText);
            console.log(xhr.responseText);
            document.getElementById("Post_msg").innerHTML = obj.success;
            document.getElementById("Post_msg").style.color = "green";
        } else {
            const obj = JSON.parse(xhr.responseText);
            document.getElementById("Post_msg").innerHTML = obj.error;
        }
    };
    xhr.open("POST", "http://localhost:50350/Library_REST_API/library/review/newReview");
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(data);
}
function ShowBooks(type){
    document.getElementById("list_ofAvailableBooks").innerHTML = "";
    var req = makeBooksRequest_fromFilters();
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var books = JSON.parse(this.responseText);
            document.getElementById("list_ofAvailableBooks").innerHTML = "";
            document.getElementById("FiltersMsg").innerHTML = "";
            let html = "";

            for (book in books) {
                if (type == "student") {
                    // console.log(books[book]);
                    html += "<div class='card mb-3' style='width: 18rem; '>" +
                        "<img src='" + books[book].photo + "' alt='book cover photo' class='card-img-top'>" +
                        "<div class='card-body'><h3 class='card-title'>" + books[book].title + "</h3>" +
                        "<p class='card-text'>" +
                        "Isbn : " + books[book].isbn + "<br>" +
                        "Authors : " + books[book].authors + "<br>" +
                        "Genre : " + books[book].genre + "<br>" +
                        "Pages : " + books[book].pages + "<br>" +
                        "Publication Year : " + books[book].publicationyear +
                        "<br><a href='" + books[book].url + "' target='_blank'>Buy It</a>" +
                        "</p>" +
                        "<button class='btn btn-primary' onclick='studentBorrow(" + books[book].isbn + ")'>Request Borrow</button>" +
                        "|<button class='btn btn-success' onclick='ShowReviews(" + books[book].isbn + ")'>Reviews</button>" +
                        "<div id='Rev" + books[book].isbn + "'></div>" +
                        "</div>" + "</div>";
                } else {
                    html += "<div class='card mb-3' style='width: 18rem; '>" +
                        "<img src='" + books[book].photo + "' alt='book cover photo' class='card-img-top'>" +
                        "<div class='card-body'><h3 class='card-title'>" + books[book].title + "</h3>" +
                        "<p class='card-text'>" +
                        "Isbn : " + books[book].isbn + "<br>" +
                        "Authors : " + books[book].authors + "<br>" +
                        "Genre : " + books[book].genre + "<br>" +
                        "Pages : " + books[book].pages + "<br>" +
                        "Publication Year : " + books[book].publicationyear +
                        "<br><a href='" + books[book].url + "' target='_blank'>Buy It</a>" +
                        "</p><button class='btn btn-primary' onclick='ShowReviews(" + books[book].isbn + ")'>Reviews</button>" +
                        "<div id='Rev" + books[book].isbn + "'></div>" +
                        "</div>" + "</div>";
                }
            }
            document.getElementById("list_ofAvailableBooks").innerHTML = html;
        } else {
            var response = JSON.parse(this.responseText);
            document.getElementById("FiltersMsg").innerHTML = response.error;
        }
    };
    xhr.open("GET", req);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send();
}
function CheckPending(){
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            console.log(data);
            document.getElementById("alert").className = "isvisible";
            createAlertsTable(data);
        }else console.log(xhr.responseText);
    };
    xhr.open("GET", "http://localhost:50350/Library_REST_API/library/student/Pending/" + sessionStorage.getItem("id"));
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}
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
                            "<textarea class='form-control' id='libraryinfo' rows='1' minlength='3' maxlength='50' name='libraryinfo' placeholder='" + input + "'></textarea></div>";
                        break;
                    }
                    default: {
                        if (label == "email" && sessionStorage.getItem("type") == "librarian") {
                            html += "<div class='mb-3'><div class='col-auto'><label for='email' class='form-label'>Email address</label></div>"+
                                "<div class='col-sm-6' onchange='mail_duplicate()'>"+
                                "<input type='email' class='form-control' id='email' name='email'pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$' value='" + input + "' /></div>"+
                                "<div style='position: relative; top: 0.5em; color: red;' id='mail_msg' class='form-text'></div></div>";
                        } else html += "<label class='form-text' for='" + label + "'>" + label + " : " + input + "</label><br>";
                    }
                }
            }
            html += "<div style='margin-bottom:5px; position: relative; top: 0.5em; color: green;' id='update_msg' class='form-text'></div><br><input type='submit' id='submit' value='Update Personal Info' class='btn btn-primary'></form>";
            $("#personalData").html(html);
        } else if (xhr.status !== 200) console.log(xhr.responseText);
    };
    xhr.open("GET", request + sessionStorage.getItem("username"));
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}
function addBook(){
    let form = document.getElementById("bookForm")
    let formData = new FormData(form);
    let data = {};
    formData.forEach((value, key) => (data[key] = value));
    var jsonData=JSON.stringify(data);
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById("newBook_msg").innerHTML = "Book Added";
        }
    };
    xhr.open("POST", "http://localhost:50350/Library_REST_API/library/book/newbook");
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(jsonData);
}
function availableBook(){
    // let form = document.getElementById("search-form")
    document.getElementById("msg-search").innerHTML = ""
    let isbn = document.getElementById("search").value;
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        const data = JSON.parse(xhr.responseText);
        if (xhr.readyState === 4 && xhr.status === 200){

            flag = data[0]["available"];

            if(flag === "false"){
                document.getElementById("msg-search").style = "color:green";
                document.getElementById("add").removeAttribute("disabled");
                document.getElementById("msg-search").innerHTML = "The book doesn't exist in Library. You can added if you want";
                jsonaddbook = "{\"isbn\":\""+isbn+"\",\"library_id\":\""+sessionStorage.getItem("id")+"\",\"available\":true}";
            }else{
                document.getElementById("msg-search").style = "color:orange";
                document.getElementById("add").setAttribute("disabled","");
                document.getElementById("msg-search").innerHTML = "The book exists in library";
            }

        }
        else{
            document.getElementById("add").setAttribute("disabled","");
            document.getElementById("msg-search").innerHTML = "Book not found in Database.";
            document.getElementById("msg-search").style = "color:red";
            console.log(data);
        }
    };
    xhr.open("GET", "http://localhost:50350/Library_REST_API/library/availability/"+isbn+"/"+sessionStorage.getItem("id"));
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send();

}
function Post_Book_in_Library(){
    // console.log(jsonaddbook);
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200){
            // const data = JSON.parse(xhr.responseText);
            console.log("it works");
        }
    };
    xhr.open("POST", "http://localhost:50350/Library_REST_API/library/availability/newBookinLibrary");
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(jsonaddbook);
}
function showRequests(){
    makeAllHidden_Librarian();
    document.getElementById("requests").className = "isvisible";
    document.getElementById("requests").innerHTML = "";
    document.getElementById("requests").className = "styled-table";

    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const obj = JSON.parse(xhr.responseText);
            var table = document.getElementById("requests");
            let thead = table.createTHead();

            let row = thead.insertRow(0);
            row.insertCell(0).innerHTML = "borrowing_id";
            row.insertCell(1).innerHTML="bookcopy_id";
            row.insertCell(2).innerHTML="user_id";
            row.insertCell(3).innerHTML="isbn";

            row.insertCell(4).innerHTML="status";

            let tbody = table.createTBody();
            var i = 0;
            for(let x in obj){
                let row = tbody.insertRow(i);
                row.id = obj[x].username;
                row.insertCell(0).innerHTML=obj[x]["borrowing_id"];
                row.insertCell(1).innerHTML=obj[x]["bookcopy_id"];
                row.insertCell(2).innerHTML=obj[x]["user_id"];
                row.insertCell(3).innerHTML=obj[x]["isbn"];
                if(obj[x]["status"]==="requested" || obj[x]["status"]==="returned"){
                    row.insertCell(4).innerHTML= "<button id='"+obj[x]["borrowing_id"]+"'  class='btn btn-warning' value='" + obj[x]["status"] + "' onclick=actionLib(this.id,this.value)>" + obj[x]["status"] + "</button>";
                }else {
                    row.insertCell(4).innerHTML= "<button id='"+obj[x]["borrowing_id"]+"'  class='btn btn-warning' value='" + obj[x]["status"] + "' onclick=actionLib(this.id,this.value)>" + obj[x]["status"] + " disabled</button>";
                }
                i++;
            }

        }
        else if (xhr.status !== 200) {
            document.getElementById("msg").innerHTML = "No Request found";
            document.getElementById("msg").className = "isvisible";
        }
    };
    xhr.open("GET", "http://localhost:50350/Library_REST_API/library/borrowing/"+sessionStorage.getItem("id"));
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}
function loans_info(){
    makeAllHidden_Librarian()
    document.getElementById("option5").className = "ishidden";
    document.getElementById("requests").className = "isvisible";
    document.getElementById("requests").innerHTML = "";
    document.getElementById("requests").className = "styled-table";

    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const obj = JSON.parse(xhr.responseText);
            var table = document.getElementById("requests");
            let thead = table.createTHead();

            let row = thead.insertRow(0);
            row.insertCell(0).innerHTML = "borrowing_id";
            row.insertCell(1).innerHTML="bookcopy_id";
            row.insertCell(2).innerHTML="user_id";
            row.insertCell(3).innerHTML="isbn";
            row.insertCell(4).innerHTML="firstname";
            row.insertCell(5).innerHTML="lastname";
            row.insertCell(6).innerHTML="student_id";
            row.insertCell(7).innerHTML="status";

            let tbody = table.createTBody();
            var i = 0;
            for(let x in obj){
                let row = tbody.insertRow(i);
                row.id = obj[x].username;
                row.insertCell(0).innerHTML=obj[x]["borrowing_id"];
                row.insertCell(1).innerHTML=obj[x]["bookcopy_id"];
                row.insertCell(2).innerHTML=obj[x]["user_id"];
                row.insertCell(3).innerHTML=obj[x]["isbn"];
                row.insertCell(4).innerHTML=obj[x]["firstname"];
                row.insertCell(5).innerHTML=obj[x]["lastname"];
                row.insertCell(6).innerHTML=obj[x]["student_id"];

                if(obj[x]["status"]==="borrowed"){
                    row.insertCell(7).innerHTML= "<button id='"+i+"'  class='btn btn-warning' value='" + obj[x]["status"] + "' disabled >" + obj[x]["status"] + "";
                }else {
                    row.insertCell(7).innerHTML= "<button id='"+i+"'  class='btn btn-success' value='" + obj[x]["status"] + "' disabled >" + obj[x]["status"] + " </button>";
                }
                i++;
            }

        } else if (xhr.status !== 200) {

            console.log("error i dont't know");
        }
    };
    xhr.open("GET", "http://localhost:50350/Library_REST_API/library/borrowing/info/"+sessionStorage.getItem("id"));
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}

function drawChart(request,label,div) {
    const xhr = new XMLHttpRequest();
    //Get books Number by Genre
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const obj = JSON.parse(xhr.responseText);

            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Topping');
            data.addColumn('number', 'Slices');
            for(o in obj) data.addRows([[obj[o].name, Number(obj[o].count)]]);

            // Set chart options
            var options = {'title':label,
                'width':600,
                'height':300};

            // Instantiate and draw our chart, passing in some options.
            var chart = new google.visualization.PieChart(document.getElementById(div));
            chart.draw(data, options);


        } else if (xhr.status !== 200) {
            console.log(xhr.responseText);
        }
    };
    xhr.open("GET", request);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}

function showStudent(request){
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const obj = JSON.parse(xhr.responseText);
            var table = document.getElementById("users");
            let thead = table.createTHead();

            let row = thead.insertRow(0);
            row.insertCell(0).innerHTML = "Username";
            row.insertCell(1).innerHTML="Firstname";
            row.insertCell(2).innerHTML="Lastname";
            row.insertCell(3).innerHTML="";

            let tbody = table.createTBody();
            var i = 0;
            for(let x in obj){
                let row = tbody.insertRow(i);
                row.id = obj[x].username;
                row.insertCell(0).innerHTML=obj[x].username;
                row.insertCell(1).innerHTML=obj[x].firstname;
                row.insertCell(2).innerHTML=obj[x].lastname;
                row.insertCell(3).innerHTML= "<button id='"+i+"'  class='btn btn-danger' onclick='deleteU(this.id)' value='" + obj[x].username + "'>delete</button>";
                i++;
            }

        } else if (xhr.status !== 200) {
            console.log(xhr.responseText);
        }
    };
    xhr.open("GET", request);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}
function showLibrarian(request,div){
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const obj = JSON.parse(xhr.responseText);
            var table = document.getElementById("librarians");
            let thead = table.createTHead();

            let row = thead.insertRow(0);
            row.insertCell(0).innerHTML = "Username";
            row.insertCell(1).innerHTML="Firstname";
            row.insertCell(2).innerHTML="Lastname";
            row.insertCell(3).innerHTML="";
            let tbody = table.createTBody();
            var i = 0;
            for(let x in obj){
                let row = tbody.insertRow(i);
                row.id = obj[x].username;
                row.insertCell(0).innerHTML=obj[x].username;
                row.insertCell(1).innerHTML=obj[x].firstname;
                row.insertCell(2).innerHTML=obj[x].lastname;
                row.insertCell(3).innerHTML= "<button id='"+i+"'  class='btn btn-danger' onclick='deleteL(this.id)' value='" + obj[x].username + "'>delete</button>";
                i++;
            }

        } else if (xhr.status !== 200) {
            console.log(xhr.responseText);
        }
    };
    xhr.open("GET", request);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}
/*Called by ShowBooks()*/
function ShowReviews(isbn){
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var reviews = JSON.parse(this.responseText);
            console.log(reviews);
            let html = "";
            reviews.forEach(function(review) {
                html += "<br>" + review.studentFirstName + " " + review.studentLastName +
                    "<br>Wrote : " + review.reviewText + "<br>Score : " + review.reviewScore + "<br>";
            });
            document.getElementById( "Rev" + isbn ).innerHTML = html;
        } else {
            document.getElementById( "Rev" + isbn ).innerHTML = "No Review Found";
        }
    };
    xhr.open("GET", "http://localhost:50350/Library_REST_API/library/review/" + isbn );
    xhr.setRequestHeader('Content-type','application/json');
    xhr.send();
}
function studentBorrow(isbn){
    console.log('studentBorrow(' + isbn + ')');
    makeAllHidden_Student();

    // table.innerHTML = "";
    var array = [];
    const xhr = new XMLHttpRequest();
    //Get user lat and lon
    xhr.onload = function () { //for  Student
        if (xhr.readyState === 4 && xhr.status === 200) {
            const student = JSON.parse(xhr.responseText);
            const xhr2 = new XMLHttpRequest();
            //Get libraries lat and lon
            xhr2.onload = function (){  //for libraries
                if ( xhr2.status == 200 ){
                    document.getElementById("librariestable").className ="isvisible";
                    document.getElementById("Req_msg").innerHTML = "";
                    const libraries = JSON.parse(xhr2.responseText);
                    var Req_str = "";
                    let i = 0 ;
                    for (let x in libraries) {
                        array[i] = [];
                        array[i][0] = libraries[x]["library_id"];
                        Req_str += libraries[x].lat + "%2C" + libraries[x].lon +"%3B"; //Set the coordinates for the request (xhr3)
                        i++ ;
                    }

                    // https://rapidapi.com/trueway/api/trueway-matrix/
                    const xhr3 = new XMLHttpRequest();
                    xhr3.withCredentials = true;
                    xhr3.addEventListener("readystatechange", function () {
                        if (this.readyState === this.DONE) {
                            const distances = JSON.parse(xhr3.responseText);
                            let j = 0;
                            for (let x in libraries){
                                array[j][1] = distances.distances[0][j];
                                array[j][2] = distances.durations[0][j];
                                j++ ;
                            }
                            //Sort by Distance
                            selectionSort(array,libraries.length,1);

                            let table = document.getElementById('librariesTSortedbyDistance');
                            table.innerHTML = "";
                            let thead = table.createTHead();

                            let row = thead.insertRow(0);
                            let tbody = table.createTBody();
                            row.insertCell(0).innerHTML = "Library Name";
                            row.insertCell(1).innerHTML="City";
                            row.insertCell(2).innerHTML="Address";
                            row.insertCell(3).innerHTML="Distance";
                            row.insertCell(4).innerHTML="Duration";
                            row.insertCell(5).innerHTML="Action";
                            let i = 0;
                            for (let j = 0 ; j < array.length ; j++){
                                for (let x in libraries){
                                    if (array[j][0] == libraries[x]["library_id"]) {
                                        let row = tbody.insertRow(i);
                                        row.id = libraries[x].username;
                                        row.insertCell(0).innerHTML=libraries[x]["libraryname"];
                                        row.insertCell(1).innerHTML=libraries[x]["city"];
                                        row.insertCell(2).innerHTML=libraries[x]["address"];
                                        row.insertCell(3).innerHTML=array[j][1]/1000 +"Km";
                                        row.insertCell(4).innerHTML=toHoursAndMinutes(array[j][2]);
                                        row.insertCell(5).innerHTML= "<button id='"+libraries[x]["bookcopy_id"]+"'  class='btn btn-warning' onclick='RequestBook(this.id)'>Request</button>";
                                        i++;
                                    }
                                }
                            }

                            //Sort by Distance
                            selectionSort(array,libraries.length,2);

                            let table2 = document.getElementById('librariesTSortedbyDuration');
                            table2.innerHTML = "";
                            let thead2 = table2.createTHead();

                            let row2 = thead2.insertRow(0);
                            let tbody2 = table2.createTBody();
                            row2.insertCell(0).innerHTML = "Library Name";
                            row2.insertCell(1).innerHTML="City";
                            row2.insertCell(2).innerHTML="Address";
                            row2.insertCell(3).innerHTML="Distance";
                            row2.insertCell(4).innerHTML="Duration";
                            row2.insertCell(5).innerHTML="Action";
                            i = 0;
                            for (let j = 0 ; j < array.length ; j++){
                                for (let x in libraries){
                                    if (array[j][0] == libraries[x]["library_id"]) {
                                        let row2 = tbody2.insertRow(i);
                                        row2.id = libraries[x].username;
                                        row2.insertCell(0).innerHTML=libraries[x]["libraryname"];
                                        row2.insertCell(1).innerHTML=libraries[x]["city"];
                                        row2.insertCell(2).innerHTML=libraries[x]["address"];
                                        row2.insertCell(3).innerHTML=array[j][1]/1000 +"Km";
                                        row2.insertCell(4).innerHTML=toHoursAndMinutes(array[j][2]);
                                        row2.insertCell(5).innerHTML= "<button id='"+libraries[x]["bookcopy_id"]+"'  class='btn btn-warning' onclick='RequestBook(this.id)'>Request</button>";
                                        i++;
                                    }
                                }
                            }
                        }
                    });
                    xhr3.open("GET", "https://trueway-matrix.p.rapidapi.com/CalculateDrivingMatrix?origins=" + lat + "%2C" + lon + "&destinations=" + Req_str );
                    xhr3.setRequestHeader("X-RapidAPI-Key", "8850c2a13fmsh8d8d5df24849f74p138580jsn0562ef4d1dbb");
                    xhr3.setRequestHeader("X-RapidAPI-Host", "trueway-matrix.p.rapidapi.com");
                    xhr3.send();


                }
                else {
                    document.getElementById("msg").innerHTML = "This Book is not available in any library" ;
                    document.getElementById("msg").className = "isvisible";
                }
            };
            xhr2.open("GET", "http://localhost:50350/Library_REST_API/library/availability/"+isbn);
            xhr2.setRequestHeader("Accept", "application/json");
            xhr2.setRequestHeader("Content-Type", "application/json");
            xhr2.send();
            // console.log(student);
            let lat = student[0].lat;
            let lon = student[0].lon;
        }
        else if (xhr.status !== 200) console.log(xhr.responseText);
    };
    xhr.open("GET", "http://localhost:50350/Library_REST_API/library/student/students/"+sessionStorage.getItem("username") );
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}
/*Called by studentBorrow()*/
function RequestBook(bookcopy_id){
    //https://www.freecodecamp.org/news/javascript-get-current-date-todays-date-in-js/
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear();
    let fromDate = `${year}-${month}-${day}`;
    let toDate = `${year}-${month+1}-${day}`;

    let data ='{"user_id":"' + sessionStorage.getItem("id") + '",' +
        '"bookcopy_id":"' + bookcopy_id+ '",' +
        '"fromDate":"' + fromDate + '",' +
        '"toDate":"' + toDate + '",' +
        '"status":"requested"}';
    console.log(data);
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200){
            const obj = JSON.parse(xhr.responseText);
            console.log(xhr.responseText);
            document.getElementById("Req_msg").innerHTML = obj.success;
            document.getElementById("Req_msg").style.color = "green";
        } else {
            const obj = JSON.parse(xhr.responseText);
            document.getElementById("Req_msg").innerHTML = obj.error;
        }
    };
    xhr.open("POST", "http://localhost:50350/Library_REST_API/library/borrowing/borrow");
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(data);
}

/*Called by ShowBorrowings()*/
function returnBook(borrowing_id){
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            ShowBorrowings();
        } else if (xhr.status !== 200) {
            console.log(xhr.responseText);
        }
    };
    xhr.open("PUT", "http://localhost:50350/Library_REST_API/library/borrowing/updateStatus/"+borrowing_id+"/returned");

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}
function ShowReview(isbn){
    console.log("show Review for : " + isbn);
    document.getElementById("borroowingTable").className = "ishidden";
    document.getElementById("Studentreview").className = "isvisible";
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const review = JSON.parse(xhr.responseText);
            document.getElementById("rev").innerHTML = " You Wrote : " + review.reviewText + "<br>Score : " + review.reviewScore + "<br>";
        } else if (xhr.status !== 200) {
            console.log(xhr.responseText);
        }
    };
    xhr.open("GET", "http://localhost:50350/Library_REST_API/library/review/user/"+sessionStorage.getItem("id")+"/isbn/"+isbn);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}

/*Called by createFormFromJSON()*/
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


/*Called in showRequests()*/
function actionLib(req,status){

    let row = document.getElementById(req);

    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const obj = JSON.parse(xhr.responseText);
            row.classList.remove("btn-warning");
            row.classList.add("btn-success");
            row.setAttribute("disabled","");
            if(status==="requested"){
                row.innerHTML = "borrowed";
            }else{
                row.innerHTML = "successEnd";
            }

            console.log("success");
        } else if (xhr.status !== 200) {

        }
    };
    if(status==="requested"){
        xhr.open("PUT", "http://localhost:50350/Library_REST_API/library/borrowing/updateStatus/"+req+"/borrowed");
    }else{
        xhr.open("PUT", "http://localhost:50350/Library_REST_API/library/borrowing/updateStatus/"+req+"/successEnd");
    }

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}

function deleteUser(request,id){

    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let tr = document.getElementsByTagName("tr");
            for(let i in tr){
                if(tr[i].id === id){
                    tr[i].remove();
                }
            }
        } else if (xhr.status !== 200) {
            console.log(xhr.responseText);
        }
    };
    xhr.open("DELETE", request);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}
function deleteLibrarian(request,id){

    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let tr = document.getElementsByTagName("tr");
            for(let i in tr){
                if(tr[i].id === id){
                    tr[i].remove();
                }
            }
        } else if (xhr.status !== 200) {
            console.log(xhr.responseText);
        }
    };
    xhr.open("DELETE", request);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}