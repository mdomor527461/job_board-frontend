const loadJobList = (data) =>{
    console.log(data);
    data.forEach((item) =>{
        const parent = document.getElementById("job-parent");
        const div = document.createElement("div");
        div.classList.add("row");
        div.innerHTML = `
             <div class="col-lg-12 col-md-12">
                <div class="single_jobs white-bg d-flex justify-content-between">
                    <div class="jobs_left d-flex align-items-center">
                        <div class="card" style="width: 18rem;">
                            <div class="card-body">
                                <h5 class="card-title">${item.title}</h5>
                                <p class="card-text">${item.requirements}</p>
                                <p class="card-text">${item.location}</p>
                                <p class="card-text">${item.company_name}</p>
                               
                            </div> <a href="job_details.html?job_id=${item.id}" class="btn btn-primary p-3">Details</a>
                        </div>
                    </div>
                    <div class="jobs_right">
                        <div class="apply_now">
                            
                            <a href="apply.html?job_id=${item.id}" class="boxed-btn3">Apply Now</a>
                        </div>
                    </div>
                </div>
            </div>
        
        `;
        parent.appendChild(div);
    })
}