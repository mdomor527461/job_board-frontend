document.getElementById('applyForm').onsubmit = async function(event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(); // Create a new FormData object

    const resume = document.getElementById('resume').files[0]; // Get the selected file
    const jobId = new URLSearchParams(window.location.search).get('job_id'); // Get the job ID from the URL query

    if (!resume) {
        alert('Please select a resume file.');
        return;
    }

    formData.append('resume', resume); // Append the resume to the FormData object

    try {
        const response = await fetch(`https://job-board-backend-lemon.vercel.app/api/jobs/${jobId}/apply/`, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}` // Assuming you're using token-based auth
            }
        });

        if (response.ok) {
            alert('Application submitted successfully!');
            // Optionally redirect the user to another page
        } else {
            const errorData = await response.json();
            console.error('Error:', errorData);
            alert('Only Job seeker can applied or any other problem occured please try again with correct information.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while submitting the application.');
    }
};
