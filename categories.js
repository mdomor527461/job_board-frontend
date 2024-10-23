const loadCategories = () => {
    fetch('https://job-board-backend-lemon.vercel.app/api/categories/')
        .then(res => res.json())
        .then(data => insertCategories(data))
        .catch(error => console.error('Error fetching categories:', error));
}

const insertCategories = (data) => {
    console.log(data);
    data.forEach((element) => {
        const parent = document.getElementById("categories");
        const div = document.createElement("div");
        div.classList.add('col-lg-2');
        div.classList.add('col-md-4');
        div.classList.add('col-md-6');
        div.classList.add('mb-5');
        const id = element.id;
        const apiUrl = `https://job-board-backend-lemon.vercel.app/api/jobs/?category=${id}`;
        div.innerHTML = `
           <h6 class="text-center"><i class="fa fa-1.6x ${element.icon}" style="background-color: rgb(51, 97, 248);color:white;height: 50px;width: 50px;border-radius: 50%;padding-top: 15px;;"></i></h6>
           <h4 class="text-center mt-4" onclick="getid(${element.id})" style="cursor:pointer;text-decoration:underline;">${element.name}</h4>
           <p class="text-center">Loading...</p>
        `;
        parent.appendChild(div);

        fetch(apiUrl)
            .then(response => response.json()) 
            .then(data => {
                var total = data.length;
                // Update the total available after fetching
                div.querySelector('p.text-center:last-of-type').innerHTML = `${total} Available`;
            });
    });
}
const getid = (id) => {
    localStorage.setItem('category_id', id);
    location.reload();
}


loadCategories();


