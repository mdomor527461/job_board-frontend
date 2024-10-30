var token = localStorage.getItem('token');
var user_id = localStorage.getItem('user_id');
var payment = () =>{
    fetch(`https://job-board-backend-lemon.vercel.app/api/users/payment/`,{
        method: 'POST',
        headers:{
            'content-type': 'application/json',
            'Authorization' : `Token ${token}`
        },
        body: JSON.stringify({
            user_id : user_id,
        })
    })
    .then(res => res.json())
    .then(data => {
        localStorage.setItem("payment","yes");
        window.location.href = data;
    })
    .catch(error => console.log(error));
}