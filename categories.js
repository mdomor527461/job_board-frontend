const loadCategories = () => {
    fetch('https://job-board-backend-zxvu.onrender.com/api/categories/')
        .then(res => res.json())
        .then(data => insertCategories(data))
        .catch(error => console.error('Error fetching categories:', error));
}

const insertCategories = (data) => {
    console.log(data);
    data.forEach((element) => {
        const parent = document.getElementById("categories");
        const div = document.createElement("div"); // Corrected from 'ootion' to 'option'
        div.classList.add("col-lg-3");
        div.innerHTML = `
        <a href="" class="btn btn-primary p-3 mx-2 my-2" onclick="getid(${element.id})">${element.name}</a>
        `;
        parent.appendChild(div);
    });
}
const getid = (id) =>{
    localStorage.setItem('category_id',id);
}

loadCategories();


