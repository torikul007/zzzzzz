function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!username || !password) {
        alert("Please fill in all fields");
        return;
    }

    fetch("/admin-login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success && data.token) {
            localStorage.setItem("authToken", data.token);
            localStorage.setItem("adminUser", username);
            window.location.href = "dashboard.html";
        } else {
            alert(data.error || "Wrong credentials");
        }
    })
    .catch(error => {
        console.error("Login error:", error);
        alert("Network error. Please try again.");
    });
}