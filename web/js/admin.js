function loginAdmin(){
    var user = document.getElementById("username");
    var pwd = document.getElementById("password")
    if(user.value === "admin" && pwd.value === "admin12"){
        window.location.replace("http://localhost:8080/adminHome.html");
    }
}
function adminLogout(){
    window.location.replace("http://localhost:8080/admin.html");
}

//show stats
new google.charts.load('current', {'packages':['corechart']});
var flag = true;

function showChart(){
    document.getElementById("showUsers").style.display = "initial";
    document.getElementById("showStats").style.display = "none";
    document.getElementById("stats").style.display = "initial";
    document.getElementById("users").style.display = "none";
    document.getElementById("librarians").style.display = "none";
    drawChart("http://localhost:50350/Library_REST_API/library/availability/chart","How Much Books exist in every Library","chart_div1");
    drawChart("http://localhost:50350/Library_REST_API/library/book/chart","How Much Books exist in every Genre","chart_div2");
    drawChart("http://localhost:50350/Library_REST_API/library/student/chart","How Much Students exist in every Student Type","chart_div3");
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

//show users
var flag = true;
function showUsers(){
    document.getElementById("showUsers").style.display = "none";
    document.getElementById("showStats").style.display = "initial";
    document.getElementById("stats").style.display = "none";
    document.getElementById("users").style.display = "table";
    document.getElementById("librarians").style.display = "table";
    if(flag){
        flag = false;
        showStudent("http://localhost:50350/Library_REST_API/library/student/students/all");
        showLibrarian("http://localhost:50350/Library_REST_API/library/librarian/librarians/all");
    }else {
        console.log("ok")
        var x = document.getElementById("users");
        x.innerHTML = ""
        var x = document.getElementById("librarians");
        x.innerHTML = ""

        showStudent("http://localhost:50350/Library_REST_API/library/student/students/all");
        showLibrarian("http://localhost:50350/Library_REST_API/library/librarian/librarians/all");
    }

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
                row.insertCell(3).innerHTML= "<button id='"+i+"'  class='btn btn-danger' onclick='deleted(this.id)' value='" + obj[x].username + "'>delete</button>";
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
                row.insertCell(3).innerHTML= "<button id='"+i+"'  class='btn btn-danger' onclick='deleted2(this.id)' value='" + obj[x].username + "'>delete</button>";
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
function deleted(id){
    let x = document.getElementById(id).value;
    console.log(x);
    // let tr = document.getElementsByTagName("tr");
    // for(let i in tr){
    //     if(tr[i].id === x){
    //         tr[i].remove();
    //     }
    // }
    let url = 'http://localhost:50350/Library_REST_API/library/student/studentdeletion/'+x;
    deleteUser(url,x);
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
function deleted2(id){
    let x = document.getElementById(id).value;
    console.log(x);
    // let tr = document.getElementsByTagName("tr");
    // for(let i in tr){
    //     if(tr[i].id === x){
    //         tr[i].remove();
    //     }
    // }
    let url = 'http://localhost:50350/Library_REST_API/library/librarian/librariandeletion/'+x;
    deleteLibrarian(url,x);


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