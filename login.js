const handleLogin = (event) => {
    event.preventDefault();  
    const username = getValue("username");
    const password = getValue("password");
    const info = {
        username,
        password,
    };
    fetch("https://job-board-backend-lemon.vercel.app/api/users/login/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(info),
    })
    .then((res) => res.json().then(data => ({status: res.status, body: data})))
    .then(({status, body}) => {
        if (status === 200) { 
            const token = body.token;
            localStorage.setItem("username", username);
            localStorage.setItem("token",token);
            localStorage.setItem("user_type",body.user_type);
            localStorage.setItem("employer_id",body.user_id);
            window.location.href = "dashboard.html";
            alert("login successfully");
        } else {
            document.getElementById("error").innerText = body.detail || "Login failed! Please check your username and password.";
        }
    })
    .catch((error) => {
        console.error("Error:", error);
        document.getElementById("error").innerText = "An error occurred. Please try again.";
    });
};
const getValue = (id) => {
    return document.getElementById(id).value;
};
