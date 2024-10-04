const loadJobList = (data) =>{
    console.log(data);
    data.forEach((item) =>{
        const parent = document.getElementById("job-parent");
        const div = document.createElement("div");
        div.classList.add("my-3");
        div.classList.add("mx-2");
        div.classList.add("col-lg-3.6");
        div.classList.add("job-item");
        div.innerHTML = `
                <div class="single_jobs d-flex justify-content-between">
                    <div class="jobs_left d-flex align-items-center">
                        <div class="card" style="width: 18rem; background-color: rgb(175, 221, 223);border:none">
                            <div class="card-body">
                                <h5 class="card-title">${item.title}</h5>
                                <p class="card-text text-dark" >${item.requirements}</p>
                                <p class="card-text text-dark" >${item.location}</p>
                                <p class="card-text text-dark" >${item.company_name}</p>
                               
                            </div> 
                            <div class="d-flex justify-content-center">
                            <a href="job_details.html?job_id=${item.id}" class="boxed-btn4 p-3 mx-3">Details</a>
                            <a href="apply.html?job_id=${item.id}" class="boxed-btn4">Apply Now</a>
                            </div>
                        </div>
                    </div>
                </div>

        
        `;
        parent.appendChild(div);
    })
}