const loadJobDetails = (id) =>{
    fetch(`https://job-board-backend-zxvu.onrender.com/api/jobs/${id}`)
    .then(res => res.json())
    .then(data => insertData(data))
}

const insertData = (job) =>{
    document.getElementById('job-title').textContent = job.title;
    document.getElementById('employer-name').textContent = job.employer_name;
    document.getElementById('job-description').textContent = job.description;
    document.getElementById('job-requirements').textContent = job.requirements;
    document.getElementById('job-location').textContent = job.location;
    document.getElementById('company-name').textContent = job.company_name;
    document.getElementById('category-name').textContent = job.category_name;
    document.getElementById('date-posted').textContent = new Date(job.date_posted).toLocaleDateString();
    const parent = document.getElementById('apply');
    const div = document.createElement("div");
    div.classList.add("text-center");
    div.innerHTML = `
        <a href="apply.html?job_id=${job.id}" class="btn btn-primary btn-lg">Apply Now</a>    
    `;
    parent.appendChild(div);
}