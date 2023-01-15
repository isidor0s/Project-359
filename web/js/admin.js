function loginAdmin(){
    var user = document.getElementById("username");
    var pwd = document.getElementById("password")
    if(user.value === "admin" && pwd.value === "admin12"){
        window.location.replace("http://localhost:8080/adminHome.html");
    }
}