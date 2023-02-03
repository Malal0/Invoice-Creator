/*/////////////////////
    VARIABLES
/////////////////////*/
const tasksContainer = document.getElementById("tasks-container");
const totalEl = document.getElementById("total-el");
const data = [
    {
        name: "wash car",
        price: 10,
        id: 1
    },
    {
        name: "mow lawn",
        price: 20,
        id: 2
    },
    {
        name: "pull weeds",
        price: 30,
        id: 3
    }
];

const tasks = [];

/*/////////////////////
    FUNCTIONS
/////////////////////*/

function handleClick(e) {
    if (e.target.parentNode.id === "task-btns-container") {
        addObject(e);
    } else if (e.target.parentNode.parentNode.id === "tasks-container") {
        removeObject();
    } else if (e.target.id === "send-invoice-btn") {
        sendInvoice();
    }
}

function addObject(e) {
    tasks.unshift(getObject(e.target.dataset.id));
    console.log("object added");

    renderContent();
}

function removeObject() {
    console.log("object removed");
}

function sendInvoice() {
    console.log("Invoice sent");
}

function renderTasks() {
    const string = tasks.map(task => `
        <div class="task">
            <p class="task-title">${task.name}</p>
            <button class="task-remove-btn">remove</button>
            <p>$<span class="task-price">${task.price}</span></p>
        </div>
    `).join('');
    tasksContainer.innerHTML = string;
    console.log("Tasks rendered");
}

function renderTotal() {
    const total = tasks.reduce((total, task) => total + task.price, 0);
    totalEl.innerHTML = total;
    console.log("Total rendered");
}

function renderContent() {
    renderTasks();
    renderTotal();

    console.log("Content rendered");
}

function getObject(id) {
    return data.filter(obj => obj.id == id)[0];
}

/*/////////////////////
    EVENT LISTENER
/////////////////////*/

document.addEventListener("click", handleClick);

renderContent();