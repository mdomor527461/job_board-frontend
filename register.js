const handleRegistration = (event) => {
    event.preventDefault(); 
    const username = getValue("username");
    const email = getValue("email");
    const password = getValue("password");
    const confirm_password = getValue("confirm_password");
    const image = document.getElementById("image").files[0];
    const user_type = getValue("user_type");

    // Check if passwords match
    if (password !== confirm_password) {
        document.getElementById("error").innerText = "Password and confirm password do not match";
        alert("Password and confirm password do not match");
        return;
    }

    // Check password strength
    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)) {
        document.getElementById("error").innerText = 
            "Password must contain eight characters, at least one letter, one number, and one special character.";
        return;
    }

    // Clear any previous error messages
    document.getElementById("error").innerText = "";

    // Use FormData to handle the image file
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("user_type", user_type);
    if (image) {
        formData.append("image", image);  // Append the image file
    }

    // Send the form data with the image
    fetch("https://job-board-backend-lemon.vercel.app/api/users/register/", {
        method: "POST",
        body: formData,
    })
    .then((res) => res.json().then(data => ({status: res.status, body: data})))
    .then(({status, body}) => {
        if (status === 201) {  // 201 Created
            alert("Registered successfully");
            window.location.href = "login.html";  // Redirect to login page
        } else {
            // Handle specific errors
            if (body.username) {
                document.getElementById("error").innerText = "Username already exists.";
            } else if (body.user_type) {
                document.getElementById("error").innerText = "Invalid user type.";
            } else {
                document.getElementById("error").innerText = body.message || "Registration failed!";
            }
        }
    })
    .catch((error) => {
        console.error("Error:", error);
        document.getElementById("error").innerText = "An error occurred. Please try again.";
    });
};

// Helper function to get values
const getValue = (id) => {
    return document.getElementById(id).value;
};
