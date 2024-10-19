const loadDashboard = () => {
    const user_type = localStorage.getItem("user_type");
    const token = localStorage.getItem('token');
    if (user_type == "employer") {
        fetch('https://job-board-backend-lemon.vercel.app/api/employer/dashboard/', {
            method: 'GET',
            headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                insertEmployerData(data);
            })
            .catch(error => console.error('Error:', error));
    }
    else if(user_type == 'job_seeker'){
        fetch('https://job-board-backend-lemon.vercel.app/api/job-seeker/dashboard/', {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                insertJobData(data);
            })
            .catch(error => console.error('Error:', error));
    }
    else{
        alert("No logged in User");
        window.location.href = "index.html";
    }
}
loadDashboard();
// employer data insert
const insertEmployerData = (data) => {
    console.log(data);
    data.forEach((item) => {
        const parent = document.getElementById("dashboard-data");
        const tr = document.createElement("tr");
        tr.innerHTML = `
        <th scope="row">${item.id}</th>
        <td>${item.title}</td>
        <td>${item.company_name}</td>
        <td>${item.location}</td>
        <td>${item.requirements}</td>
        <td>${item.date_posted}</td>
        <td><div class="d-flex justify-content-center">
            <button class="btn btn-success p-2 mx-3" onclick="updateEmployerDashboard(${item.id})">
                update
            </button>
            <button class="btn btn-primary p-2" onclick="viewApplicants(${item.id})">
                view_applicants
            </button>
        </div></td>
         
          `;
        parent.appendChild(tr);
    })
}

//job seeker data 
const insertJobData = (data) => {
    console.log(data);
    data.forEach((item) => {
        const parent = document.getElementById("dashboard-data");
        const tr = document.createElement("tr");
        tr.innerHTML = `
        <th scope="row">${item.id}</th>
        <td>${item.applicant}</td>
        <td>${item.job}</td>
        <td>${item.resume}</td>
        <td>${item.applied_at}</td>  
        <div class="d-flex justify-content-center">
            <button class="btn btn-success p-2 mx-3" onclick="updateJobDashboard(${item.id})">
                update
            </button>
        </div>
          `;
        parent.appendChild(tr);
    })
}
// update employer model
const updateEmployerDashboard = (id) => {
    const token = localStorage.getItem('token');
    const updateModal = document.getElementById("updateModal");
    const form = document.getElementById("updateForm");

    // Modal show
    updateModal.style.display = "block";

    // Fetch the data for the selected job
    fetch(`https://job-board-backend-lemon.vercel.app/api/employer/job/${id}/`, {
        method: 'GET',
        headers: {
            Authorization: `Token ${token}`,
        }
    })
    .then((res) => res.json())
    .then((data) => {
        // Populate form fields with fetched data
        form.title.value = data.title;
        form.company_name.value = data.company_name;
        form.location.value = data.location;
        form.requirements.value = data.requirements;
        // form.description.value = data.description; // Add description field
        // form.employer.value = data.employer; // Add employer field

        // Add event listener to handle form submission
        form.onsubmit = function (event) {
            event.preventDefault(); // Prevent default form submission

            // Prepare updated data including description and employer fields
            const updatedData = {
                title: form.title.value,
                company_name: form.company_name.value,
                location: form.location.value,
                requirements: form.requirements.value,
                description: data.description, // Include description
                employer: data.employer, // Include employer (usually should be the same)
            };

            // Send updated data to the server
            fetch(`https://job-board-backend-lemon.vercel.app/api/employer/job/${id}/`, {
                method: 'PUT',
                headers: {
                    Authorization: `Token ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            })
            .then((res) => res.json())
            .then((data) => {
                console.log("Job updated:", data);
                updateModal.style.display = "none";
                window.location.href = "dashboard.html";
                 // Close the modal after update
                // Optionally, you can refresh the dashboard to show updated data
            })
            .catch((error) => {
                console.error('Error updating job:', error);
            });
        };
    })
    .catch((error) => {
        console.error('Error fetching job data:', error);
    });
};

// Close the modal when the user clicks on <span> (x)
document.querySelector(".close").onclick = function() {
    document.getElementById("updateModal").style.display = "none";
}

const viewApplicants = (id) =>{
    const token = localStorage.getItem("token");
    const modal = document.getElementById("applicants-modal");
    modal.style.display = "block";
    fetch(`https://job-board-backend-lemon.vercel.app/api/employer/job/${id}/applicants/`, {
        method: 'GET',
        headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(data => {
            insertApplicantData(data);
        })
        .catch(error => console.error('Error:', error));
}


const insertApplicantData = (data) => {
    data.forEach((item) => {
        const parent = document.getElementById("data");
        const tr = document.createElement("tr");
        tr.innerHTML = `
             <th scope="col">${item.id}</th>
            <th scope="col">${item.applicant}</th>
            <th scope="col">${item.resume}</th>
            <th scope="col">${item.applied_at}</th>
        `
        console.log(tr);
        console.log(parent);
        parent.appendChild(tr);
    })
    // window.location.href = "applicants.html";
}
document.querySelector("#close").onclick = function() {
    document.getElementById("applicants-modal").style.display = "none";
}
// update job seeker dashboard
const updateJobDashboard = (id) => {
    const token = localStorage.getItem('token');
    const updateModal = document.getElementById("updateJobModal");
    const form = document.getElementById("updateJobForm");

    // Modal show
    updateModal.style.display = "block";

    // Fetch the data for the selected job
    fetch(`https://job-board-backend-lemon.vercel.app/api/job-seeker/dashboard/${id}`, {
        method: 'GET',
        headers: {
            Authorization: `Token ${token}`,
        }
    })
    .then((res) => res.json())
    .then((data) => {
        // Populate form fields with fetched data
        console.log(data);

        // Handle form submission
        form.onsubmit = function (event) {
            event.preventDefault(); // Prevent default form submission

            const formData = new FormData();
            formData.append('applicant', data.applicant);
            formData.append('job', data.job);
            formData.append('resume', document.getElementById('resume').files[0]); // Add resume file
            formData.append('applied_at', data.applied_at);

            // Send updated data to the server
            fetch(`https://job-board-backend-lemon.vercel.app/api/job-seeker/dashboard/${id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Token ${token}`,
                },
                body: formData,
            })
            .then((res) => res.json())
            .then((data) => {
                console.log("Job seeker data updated:", data);
                updateModal.style.display = "none";
                window.location.href = "dashboard.html";
                // Optionally, you can refresh the dashboard to show updated data
            })
            .catch((error) => {
                console.error('Error updating job:', error);
            });
        };
    })
    .catch((error) => {
        console.error('Error fetching job data:', error);
    });
};


document.querySelector(".off").onclick = function() {
    document.getElementById("updateJobModal").style.display = "none";
}
