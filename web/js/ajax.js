
function createTableFromJSON(data) {
    var html = "<table><tr><th>Category</th><th>Value</th></tr>";
    for (const x in data) {
        var category = x;
        var value = data[x];
        html += "<tr><td>" + category + "</td><td>" + value + "</td></tr>";
    }
    html += "</table>";
    return html;
}

function getUser() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            $("#ajaxContent").html(createTableFromJSON(JSON.parse(xhr.responseText)));
          //  $("#ajaxContent").html("Successful Login");
        } else if (xhr.status !== 200) {
             $("#ajaxContent").html("User not exists or incorrect password");
        }
    };
    var data = $('#loginForm').serialize();
    xhr.open('GET', 'GetStudent?'+data);
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.send();
}

function duplicate(){
    var xhr = new XMLHttpRequest();
    let msg_username = document.getElementById("exists")
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            msg_username.innerHTML = "Username available";
            msg_username.style.color = "green"
        } else if (xhr.status !== 200) {
            msg_username.innerHTML = "Username used";
            msg_username.style.color = "red"
        }
    };
    var data = $('#username').serialize();
    xhr.open('GET', 'duplicate?'+data);
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.send();
}
function mail_duplicate(){
    var xhr = new XMLHttpRequest();
    let msg = document.getElementById("mail_msg")
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            msg.innerHTML = "mail ok";
            msg.style.color = "green"
        } else if (xhr.status !== 200) {
            msg.innerHTML = "Email is used";
            msg.style.color = "red"
        }
    };
    let data = $('#email').serialize();
    xhr.open('GET', 'mailDuplicate?'+data);
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.send();
}
function id_duplicate(){
    var xhr = new XMLHttpRequest();
    let msg = document.getElementById("id_msg")
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            msg.innerHTML = "id ok";
            msg.style.color = "green"
        } else if (xhr.status !== 200) {
            msg.innerHTML = "Pass number is used";
            msg.style.color = "red";
        }
    };
    let data = $('#passNumber').serialize();
    xhr.open('GET', 'pass_duplicate?'+data);
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.send();
}

