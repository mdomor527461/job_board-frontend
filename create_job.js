document.getElementById('jobCreateForm').onsubmit = async function(event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        requirements: document.getElementById('requirements').value,
        location: document.getElementById('location').value,
        company_name: document.getElementById('company_name').value,
        category: document.getElementById('category').value,
        employer: localStorage.getItem("employer_id")
    };
    console.log(localStorage.getItem("employer_id"));
    try {
        const response = await fetch('https://job-board-backend-zxvu.onrender.com/api/jobs/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}` // Token authentication
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert('Job created successfully!');
            // Optionally redirect to another page or reset the form
            document.getElementById('jobCreateForm').reset();
        } else {
            const errorData = await response.json();
            console.error('Error:', errorData);
            alert('Failed to create the job. Please check your input.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while creating the job.');
    }
};

document.addEventListener('DOMContentLoaded', function () {
    const categorySelect = document.getElementById('category');

    fetch('https://job-board-backend-zxvu.onrender.com/api/categories/')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id; // Assuming 'id' is the unique identifier for the category
                option.textContent = category.name; // Assuming 'name' is the name of the category
                categorySelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching categories:', error);
        });
});