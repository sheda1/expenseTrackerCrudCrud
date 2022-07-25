var user_id = undefined;
var iddd = '8f9ea829eeb04f4da17c9eb7ff0e4df6'


window.addEventListener('DOMContentLoaded', () => {
    axios.get(`https://crudcrud.com/api/${iddd}/expense-data`)
        .then(res => {
            for (let i = 0; i < res.data.length; i++) {
                showResponse(res.data[i]);
            }
        })
        .catch(err => console.error(err));
})



document.getElementById('form')
    .addEventListener('submit', addUser);

function addUser(event) {
    event.preventDefault();
    let amount = event.target.amount.value;
    let description = event.target.description.value;
    let category = event.target.category.value;
    const obj = {
        amount,
        description,
        category
    }
    if (user_id === undefined) {
        console.log(user_id);
        axios.post(`https://crudcrud.com/api/${iddd}/expense-data`, obj)
            .then(res => {
                showResponse(res.data)
                console.log('added');
            })
            .catch(err => console.error(err));
    } else {
        console.log(user_id);
        axios.put(`https://crudcrud.com/api/${iddd}/expense-data/${user_id}`, obj)
            .then(res => {

                let userList = document.getElementById('item_list');
                let list = document.createElement('li');
                list.id = user_id;
                list.innerHTML = `${amount} - ${category} - ${description} `;
                let deleteBtn = document.createElement('button');
                deleteBtn.appendChild(document.createTextNode('Delete'));
                deleteBtn.className = 'deleted';
                list.append(deleteBtn);

                let editBtn = document.createElement('button');
                editBtn.appendChild(document.createTextNode('Edit'));
                editBtn.className = 'edited';
                list.appendChild(editBtn);
                userList.appendChild(list);

                let user_List = document.getElementById('item_list');
                let lists = document.getElementById(user_id);
                if (lists) {
                    user_List.removeChild(lists);
                }
                user_id = undefined;

            })
            .catch(err => console.log(err));
    }

    document.getElementById('number').value = '';
    document.getElementById('detail').value = '';
    document.getElementById('category').value = '';

}

function showResponse(data) {
    let userList = document.getElementById('item_list');
    let list = document.createElement('li');
    list.id = data._id;
    list.innerHTML = `${data.amount} - ${data.category} - ${data.description} `;
    let deleteBtn = document.createElement('button');
    deleteBtn.appendChild(document.createTextNode('Delete'));
    deleteBtn.className = 'deleted';
    list.append(deleteBtn);

    let editBtn = document.createElement('button');
    editBtn.appendChild(document.createTextNode('Edit'));
    editBtn.className = 'edited';
    list.appendChild(editBtn);

    userList.appendChild(list);
}

document.getElementById('item_list')
    .addEventListener('click', deleteORedit)

function deleteORedit(event) {
    if (event.target.classList.contains('deleted')) {
        axios.delete(`https://crudcrud.com/api/${iddd}/expense-data/${event.target.parentElement.id}`)
            .then(res => {
                console.log('deleted')
                removeList(event.target.parentElement.id);
            })
            .catch(err => console.error(err));
    }
    if (event.target.classList.contains('edited')) {
        axios.get(`https://crudcrud.com/api/${iddd}/expense-data/${event.target.parentElement.id}`)
            .then(res => {
                document.getElementById('number').value = res.data.amount;
                document.getElementById('detail').value = res.data.description;
                document.getElementById('category').value = res.data.category;
                user_id = res.data._id;
                console.log('edited');
            })
            .catch(err => console.error(err));

    }

    function removeList(event) {
        let userList = document.getElementById('item_list');
        let childDeleted = document.getElementById(event);
        if (childDeleted) {
            userList.removeChild(childDeleted);
        }
    }
}