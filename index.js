/*/////////////////////
    VARIABLES
/////////////////////*/
const tasksContainer = document.getElementById("tasks-container");
const totalEl = document.getElementById("total-el");
const noteEl = document.getElementById("note-el");
const totalAmountEl = document.getElementById("total-amount-el");
const taskInput = document.getElementById("task-input");
const taskPriceOptions = document.getElementById("task-price-options");
const addTaskBtn = document.getElementById("add-task-btn");
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

let id = 4;
let stretchGoalsVisible = false;

/*/////////////////////
    FUNCTIONS
/////////////////////*/

function handleClick(e) {
    if (e.target.parentNode.id === "task-btns-container" && !tasks.includes(getObject(e, data))) {
        addObject(e);
    } else if (e.target.parentNode.parentNode.id === "tasks-container") {
        removeObject(e);
    } else if (e.target.id === "send-invoice-btn" && tasks.length) {
        sendInvoice(e);
    } else if (
        e.target.id === "add-task-btn" &&
        taskInput.value.trim() &&
        !tasks.includes(tasks.filter(obj => obj.name == taskInput.value.trim())[0])) {
        addCustomObject();
    } else if (e.target.id === "show-stretch-goals") {
        showStretchGoals(e);
    } else if (e.target.id === "toggle-darkmode-container") {
        document.body.classList.toggle("darkmode");
    }
}

function addObject(e) {
    tasks.unshift(getObject(e, data));
    renderContent();
}

function addCustomObject() {
    tasks.unshift({
        name: taskInput.value,
        price: Number(taskPriceOptions.value),
        id: id++ // an easy way to get nonrepeating IDs
    });
    taskInput.value = "";
    taskInput.focus();
    renderContent();
}

function removeObject(e) {
    tasks.splice(tasks.indexOf(getObject(e, tasks)), 1);
    renderContent();
}

function sendInvoice(e) {
    tasks.splice(0);
    renderContent();
    e.target.blur();
    alert("Congratulations, your Invoice was sent to the Ether");
}

function renderTasks() {
    const string = tasks.map(task => `
        <div class="task">
            <p class="task-title">${task.name}</p>
            <button class="task-remove-btn" data-id="${task.id}">remove</button>
            <p>$<span class="task-price">${task.price}</span></p>
        </div>
    `).join('');
    tasksContainer.innerHTML = string;
}

function renderTotal() {
    const total = tasks.reduce((total, task) => total + task.price, 0);
    totalEl.innerHTML = total;
}

function renderContent() {
    renderTasks();
    renderTotal();
    noteEl.classList.toggle("hidden", tasks.length === 0);
    totalAmountEl.classList.toggle("zero", tasks.length === 0);
}

function getObject(e, arr) {
    return arr.filter(obj => obj.id === +e.target.dataset.id)[0];
}

function showStretchGoals(e) {
    stretchGoalsVisible = !stretchGoalsVisible
    document.getElementById("task-inputs-container").classList.toggle("hidden", !stretchGoalsVisible);
    e.target.innerText = stretchGoalsVisible ? "Hide Custom Invoice" : "Add Custom Invoice";
}

function handleKeydown(e) {
    if (
        e.key === "Enter" &&
        taskInput.value.trim() &&
        !tasks.includes(tasks.filter(obj => obj.name == taskInput.value.trim())[0])
    ) {
        addCustomObject();
    }
}

/*/////////////////////
    EVENT LISTENERS
/////////////////////*/

document.addEventListener("click", handleClick);
document.addEventListener("keydown", handleKeydown);