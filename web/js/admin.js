function loginAdmin(){
    var user = document.getElementById("username");
    var pwd = document.getElementById("password")
    if(user.value === "admin" && pwd.value === "admin12"){
        window.location.replace("http://localhost:8080/adminHome.html");
    } else
        document.getElementById("adm_msg").innerHTML = "Wrong Credentials for admin !";
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
        var x = document.getElementById("users");
        x.innerHTML = ""
        var x = document.getElementById("librarians");
        x.innerHTML = ""

        showStudent("http://localhost:50350/Library_REST_API/library/student/students/all");
        showLibrarian("http://localhost:50350/Library_REST_API/library/librarian/librarians/all");
    }

}
function deleteU(id){
    let x = document.getElementById(id).value;
    let url = 'http://localhost:50350/Library_REST_API/library/student/studentdeletion/'+x;
    deleteUser(url,x);
}
function deleteL(id){
    let x = document.getElementById(id).value;
    let url = 'http://localhost:50350/Library_REST_API/library/librarian/librariandeletion/'+x;
    deleteLibrarian(url,x);
}
