let lat = null;
let lon = null;
/*Use Servlets*/
function loginUser(){
    let data = $('#loginForm').serialize();
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'Login?'+data);
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const obj = JSON.parse(xhr.responseText);
            // console.log(obj);
            sessionStorage.setItem("username",document.getElementById("username").value);
            sessionStorage.setItem("id",obj.id);
            switch (obj.type){
                case "student":
                    sessionStorage.setItem("type","student");
                    window.location.replace("http://localhost:8080/home.html");
                    break;
                case "librarian":
                    sessionStorage.setItem("type","librarian");
                    window.location.replace("http://localhost:8080/libHome.html");
                    break;
            }
        } else document.getElementById("log_msg").innerHTML = xhr.responseText;
    };
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.send();
}
function logout(){
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'Logout?');
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.send();
    sessionStorage.clear();
    window.location.replace("http://localhost:8080");
}
function updateUserInfo(){
    let req = $('#updateInfo_form').serialize() +'&type=' + sessionStorage.getItem("type") + '&username=' + sessionStorage.getItem("username") + '&lat=' + lat + '&lon=' + lon;
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

function makeAllHidden_Librarian(){
    document.getElementById("option1").className = "isvisible btn btn-primary";
    document.getElementById("option2").className = "isvisible btn btn-primary";
    document.getElementById("option3").className = "isvisible btn btn-primary";
    document.getElementById("option4").className = "isvisible btn btn-primary";
    document.getElementById("option5").className = "isvisible btn btn-primary";

    document.getElementById("personalData").className = "ishidden";
    document.getElementById("newBook").className = "ishidden";
    document.getElementById("newBook_msg").className = "ishidden";
    document.getElementById("search-isbn").className = "ishidden";
    document.getElementById("requests").className = "ishidden";
    document.getElementById("msg").className = "ishidden";
}
function makeAllHidden_Student(){
    document.getElementById("option1").className = "isvisible btn btn-primary";
    document.getElementById("option2").className = "isvisible btn btn-primary";
    document.getElementById("option3").className = "isvisible btn btn-primary";

    document.getElementById("msg").className = "ishidden";
    document.getElementById("personalData").className = "ishidden";
    document.getElementById("availableBooks").className = "ishidden";
    document.getElementById("borroowingTable").className = "ishidden";
    document.getElementById("reviewForm").className = "ishidden";
    document.getElementById("Studentreview").className = "ishidden";
    document.getElementById("librariestable").className = "ishidden";
    document.getElementById("alertsTable").className = "ishidden";
}
function GoBackToBorrowings(){
    makeAllHidden_Student();
    document.getElementById("borroowingTable").className = "isvisible";
}
function showPersonalData(){
    makeAllHidden_Student();
    document.getElementById("personalData").className = "isvisible";
    document.getElementById("option1").className = "ishidden";

    createFormFromJSON("http://localhost:50350/Library_REST_API/library/student/students/");
}
function showLibPersonalData(){
    makeAllHidden_Librarian();
    document.getElementById("personalData").className = "isvisible";
    document.getElementById("option1").className = "ishidden";
    createFormFromJSON("http://localhost:50350/Library_REST_API/library/librarian/librarians/");
}
/*Called by ShowBooks()*/
function makeBooksRequest_fromFilters(){
    var request = "http://localhost:50350/Library_REST_API/library/book/books/";
    const form = document.getElementById('bookfilters');
    const formData = new FormData(form);
    var object = {};
    formData.forEach(function(value, key){
        object[key] = value;
    });
    for (x in object){
        if (object[x] != "") {
            if (x == "genre") request += object[x] + "?";
            request += x + "=" + object[x] + "&";
        } else if (x == "genre") request += "all?";


    }
    return request;
}
/*Called by studentBorrow()*/
function secondsToMinutes(secs){
    return Math.floor(secs / 60)+'min '+Math.floor(secs % 60) + 'sec';
}
/*https://codingbeautydev.com/blog/javascript-convert-seconds-to-hours-and-minutes/*/
function toHoursAndMinutes(totalSeconds) {
    const totalMinutes = Math.floor(totalSeconds / 60);

    const seconds = totalSeconds % 60;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return hours+'hour ' + minutes + 'min ' + seconds + 'sec';
}
function showAvailableBooks(){
    makeAllHidden_Student();
    document.getElementById("availableBooks").className = "isvisible";
    document.getElementById("option2").className = "ishidden";
    document.getElementById("FiltersMsg").innerHTML = "";

    document.getElementById("bookfilters").innerHTML = "<div><label for='genre'>Genre:</label><br>"+
        "<input id='genre' name='genre' placeholder='all'></div>" +
        "<div><label for='title'>Title:</label><br>" +
        "<input id='title' name='title'></div>" +
        "<div><label for='authors'>Authors:</label><br>" +
        "<input id='authors' name='authors'></div>" +
        "<div><label for='fromYear'>From Year:</label><br>" +
        "<input id='fromYear' name='fromYear' type='number' placeholder='YYYY'></div>" +
        "<div><label for='toYear'>To Year:</label><br>" +
        "<input id='toYear' name='toYear' type='number' placeholder='YYYY'></div>" +
        "<div><label for='fromPageNumber'>From Page Number:</label><br>" +
        "<input id='fromPageNumber' name='fromPageNumber' type='number'></div>" +
        "<div><label for='toPageNumber'>To Page Number:</label><br>" +
        "<input id='toPageNumber' name='toPageNumber' type='number'></div>" +
        "<input type='button' onclick='ShowBooks(\"student\")' value='Search' class='btn btn-primary'><br>";

    ShowBooks("student");
}
/*Called by ShowBorrowings()*/
function addReview(isbn){
    document.getElementById("newreview").className = isbn;
    document.getElementById("borroowingTable").className = "ishidden";
    document.getElementById("reviewForm").className = "isvisible";
}
function GotoLogin(){
    document.getElementById("Login_Mes").className = "ishidden";
    document.getElementById("Register_Mes").className = "ishidden";
    document.getElementById("visitor").className = "ishidden";
    document.getElementById("login").className = "isvisible";
}
function Hide(){
    document.getElementById("btn_hide").className = "ishidden";
    document.getElementById("btn_show").className = "isvisible btn btn-secondary";
    document.getElementById("list_ofAvailableBooks").className = "ishidden";
}
function Show(){
    document.getElementById("btn_show").className = "ishidden";
    document.getElementById("btn_hide").className = "isvisible btn btn-secondary";
    document.getElementById("list_ofAvailableBooks").className = "isvisible";
}
function ShowAlerts(){
    makeAllHidden_Student();
    document.getElementById("alertsTable").className = "isvisible";
    document.getElementById("alert").className = "ishidden";
}
function newBook(){
    makeAllHidden_Librarian();
    document.getElementById("newBook").className = "isvisible";;
    document.getElementById("option2").className = "ishidden";
}
function available(){
    makeAllHidden_Librarian();
    document.getElementById("search-isbn").className = "isvisible";
    document.getElementById("option3").className = "ishidden";
}
function createAlertsTable(data){
    var table = document.getElementById("alerts");
    table.innerHTML = "";
    let thead = table.createTHead();
    let row = thead.insertRow(0);
    // row.insertCell(0).innerHTML = "ID";
    row.insertCell(0).innerHTML = "ISBN";
    row.insertCell(1).innerHTML = "FromDate";
    row.insertCell(2).innerHTML = "ToDate";
    row.insertCell(3).innerHTML = "Library";

    let tbody = table.createTBody();
    var i = 0;
    for(let x in data){
        let row = tbody.insertRow(i);
        row.id = data[x].username;
        row.insertCell(0).innerHTML=data[x].isbn;
        row.insertCell(1).innerHTML=data[x].fromdate;
        row.insertCell(2).innerHTML=data[x].todate;
        row.insertCell(3).innerHTML=data[x].library;
        row.insertCell(4).innerHTML= "<input id='"+data[x].borrowing_id+"' type='button'  class='btn btn-danger' onclick='returnbook(this.id)' value='Return Book'>";
        i++;
    }
}

/*https://www.geeksforgeeks.org/selection-sort*/
function selectionSort(arr,  n, field) {
    var i, j, min_idx;
    // One by one move boundary of unsorted subarray
    for (i = 0; i < n-1; i++)
    {
        // Find the minimum element in unsorted array
        min_idx = i;
        for (j = i + 1; j < n; j++)
            if (arr[j][field] < arr[min_idx][field])
                min_idx = j;

        // Swap the found minimum element with the first element
        swap(arr,min_idx, i);
    }
}
function swap(arr,xp, yp) {
    var tmp_libId = arr[xp][0];
    var tmp_dist = arr[xp][1];
    var tmp_dur = arr[xp][2];
    arr[xp][0] = arr[yp][0];
    arr[xp][1] = arr[yp][1];
    arr[xp][2] = arr[yp][2];
    arr[yp][0] = tmp_libId;
    arr[yp][1] = tmp_dist;
    arr[yp][2] = tmp_dur;
}





