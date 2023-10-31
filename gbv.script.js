document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;


    if (username === "testuser" && password === "testpassword") {
       
        window.location.href = "index.html";
    } else {
        alert("Invalid username or password. Please try again.");
    }
});
