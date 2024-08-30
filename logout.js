const handleLogout = (event) => {
    event.preventDefault();  // Prevent the default anchor behavior

    fetch("https://job-board-backend-zxvu.onrender.com/api/users/logout/", {
        method: "POST",  // Correct method
        headers: {
            "Content-Type": "application/json",
            // Include any required authentication headers if needed
        },
    })
    .then((response) => {
        // Check if the response status is OK
        console.log("Response Status:", response.status);
        if (response.ok) {
            return response.json();  // Convert the response to JSON
        } else {
            return response.json().then((data) => {
                throw new Error(data.detail || "Logout failed.");
            });
        }
    })
    .then((data) => {
        console.log("Response Data:", data);
        // Logout successful, remove user info from localStorage
        localStorage.removeItem("username");
        localStorage.removeItem("user_type");
        localStorage.removeItem("token");
        // Redirect the user to login.html
        window.location.href = "login.html";
        alert("logout successfully");
    })
    .catch((error) => {
        console.error("Error during logout:", error);
        alert(error.message || "An error occurred. Please try again.");
    });
};
