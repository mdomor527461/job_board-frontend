const handleRegistration = (event) => {
  event.preventDefault(); 
  const username = getValue("username");
  const email = getValue("email");
  const password = getValue("password");
  const confirm_password = getValue("confirm_password");
  const user_type = getValue("user_type");
  
  const info = {
      username,
      password,
      user_type,
      email,
  };

  if (password === confirm_password) {
      document.getElementById("error").innerText = "";
      
      if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)) {
          fetch("https://job-board-backend-zxvu.onrender.com/api/users/register/", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify(info),
          })
          .then((res) => res.json().then(data => ({status: res.status, body: data})))
          .then(({status, body}) => {
              if (status === 201) {  // 201 Created
                  // Registration successful, redirect to login page
                  window.location.href = "login.html";
                  alert("register successfylly");
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
      } else {
          document.getElementById("error").innerText =
              "Password must contain eight characters, at least one letter, one number, and one special character.";
      }
  } else {
      document.getElementById("error").innerText =
          "Password and confirm password do not match";
      alert("Password and confirm password do not match");
  }
};

const getValue = (id) => {
  return document.getElementById(id).value;
};
