var user_id = localStorage.getItem("user_id");
var token = localStorage.getItem("token");
console.log(user_id);

//payment status check
var payment = localStorage.getItem("payment")
console.log(payment);
if(payment == "yes"){
    fetch(`https://job-board-backend-lemon.vercel.app/api/users/?id=${user_id}`)
    .then(res => res.json())
    .then(data => {
        if(data[0].is_premium == true){
            localStorage.setItem('is_premium',true);
            alert("Congratulations!! you get premium membership");
            window.location.reload();
        }
        else{
            alert("Payment failed or Cancelled");
            window.location.reload();
        }
    })
    localStorage.removeItem("payment");
}


const loadUsers = () => {
    fetch(`https://job-board-backend-lemon.vercel.app/api/users/?id=${user_id}`)
    .then(res => res.json())
    .then(data => insertProfile(data))
}
loadUsers();
//insert main profile data
const insertProfile = (data) =>{
    // console.log(data);
    const parent = document.getElementById('parent');
    const div = document.createElement("div");
    div.innerHTML = `
    <section class="vh-100" style="background-color: #f4f5f7;">
            <div class="container py-5 h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col col-lg-6 mb-4 mb-lg-0">
                    <div class="card mb-3" style="border-radius: .5rem;">
                    <div class="row g-0">
                        <div class="col-md-4 gradient-custom text-center text-white"
                        style="border-top-left-radius: .5rem; border-bottom-left-radius: .5rem;">
                        <img src="${data[0].image_url? data[0].image_url : `https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp`} " style="border-radius:50%;"
                            alt="Avatar" class="img-fluid my-5" style="width: 80px;" />
                        <h5>${data[0].username}</h5>
                        <p>${data[0].user_type}</p>
                        <i class="far fa-edit mb-5"></i>
                        </div>
                        <div class="col-md-8">
                        <div class="card-body p-4">
                            <h6>Information</h6>
                            <hr class="mt-0 mb-4">
                            <div class="row pt-1">
                            <div class="col-6 mb-3">
                                <h6>Email</h6>
                                <p class="text-muted">${data[0].email}</p>
                            </div>
                           
                            </div>
                            <h6>${user_type === "employer" ? "Jobs" : "Application"}</h6>
                            <hr class="mt-0 mb-4">
                            <div class="row pt-1">
                            <div class="col-6 mb-3">
                                <h6 id="recent-title">${user_type === "employer" ? "Recent Jobs" : "Recent Application"}</h6>
                                <p class="text-muted" id="recent"></p>
                            </div> 
                            <div class="col-6 mb-3">
                                <h6>${user_type === "employer" ? "Total Jobs" : "Total Application"}</h6>
                                <p class="text-muted" id="total"></p>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </section>
    `;
    parent.appendChild(div);
}
//load jobs
const loadUsersJob = (user_id) =>{
    fetch(`https://job-board-backend-lemon.vercel.app/api/jobs/?employer=${user_id}`)
    .then(res => res.json())
    .then(data => {if(data.length > 0){
        insertProfileData(data)
    }
    });
}
//insert jobs data
const insertProfileData = (data) => {
    console.log(data);
    document.getElementById('recent').innerText = `${data[0].title}`;
    document.getElementById('total').innerText = `${data.length} jobs`;
}
//load application data by using dashboard api
const loadUsersApplications = () => {
    fetch('https://job-board-backend-lemon.vercel.app/api/job-seeker/dashboard/', {
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(data => {
            if(data.length > 0){
            insertApplicationsData(data);
            }
        })
        .catch(error => console.error('Error:', error));
}
//insert applications data
const insertApplicationsData = (data) => {
    console.log(data);
    document.getElementById('recent').innerText = `${data[data.length -1].job}`;
    document.getElementById('total').innerText = `${data.length} applications`;
}
//conditional profile data inserting
if(user_type == "employer"){
    loadUsersJob(user_id);
}
else{
    loadUsersApplications();
}
