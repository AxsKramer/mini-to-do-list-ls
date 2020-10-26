// Variables
const form = document.querySelector('#form');
const toDoList = document.querySelector('#toDoList');
let list = [];

// Events
document.addEventListener('DOMContentLoaded', readStorage);
form.addEventListener('submit', addItem);

// Functions
function readStorage(){
    //read local storage
    list = JSON.parse( localStorage.getItem('list')) || [];
    createHTML();
}

function addItem(e) {
    e.preventDefault();
    const todo = document.querySelector('#todo').value;

    if(todo === '') {
        showError('Sorry, this field can not be empty');
        return;
    }

    const todoObj = { id: Date.now(), todo }
    list = [...list, todoObj];
    createHTML();
    form.reset();
}


function showError(error) {
    const messageError = document.createElement('p');
    messageError.textContent = error;
    messageError.classList.add('alert', 'alert-danger', 'font-weight-bold', 'text-center');

    const container = document.querySelector('#container');
    container.appendChild(messageError);

    setTimeout(() => {
        messageError.remove();
    }, 3000);
}

function createHTML() {
    cleanHTML();
    if(list.length > 0 ) {
        list.forEach( item => {
            const deleteBtn = document.createElement('a');
            deleteBtn.classList.add('btn', 'btn-danger');
            deleteBtn.innerText = 'X';
            //delete on local storage
            deleteBtn.onclick = () => deleteItem(item.id);

            const span = document.createElement('span');
            span.innerText = item.todo;

            const li = document.createElement('li');
            li.appendChild(span);
            li.appendChild(deleteBtn);
            toDoList.appendChild(li);
        });
    }

    SyncStorage();
}

function SyncStorage() {
    //add item to local storage
    localStorage.setItem('list', JSON.stringify(list));
}

function deleteItem(id) {
    list = list.filter( item => item.id !== id);
    createHTML();
}

function cleanHTML() {
    while( toDoList.firstChild) {
        toDoList.removeChild(toDoList.firstChild);
    }
}