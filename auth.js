function signup() {
  let user = document.getElementById("username").value.trim().toLowerCase();
  let pass = document.getElementById("password").value.trim();

  if (!user || !pass) {
    alert("Please fill all fields");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users") || "{}");

  if (users[user]) {
    alert("User already exists. Please login.");
    return;
  }

  users[user] = pass;
  localStorage.setItem("users", JSON.stringify(users));

  alert("Account created successfully! Now login.");
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
}

function login() {
  let user = document.getElementById("username").value.trim().toLowerCase();
  let pass = document.getElementById("password").value.trim();

  let users = JSON.parse(localStorage.getItem("users") || "{}");

  if (!users.hasOwnProperty(user)) {
    alert("Account does not exist. Please create account first.");
    return;
  }

  if (users[user] !== pass) {
    alert("Wrong password. Try again.");
    return;
  }

  localStorage.setItem("currentUser", user);
  window.location.href = "dashboard.html";
}