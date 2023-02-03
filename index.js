/*/////////////////////
    VARIABLES
/////////////////////*/

/*/////////////////////
    FUNCTIONS
/////////////////////*/

function handleClick(e) {
    if (e.target.parentNode.id === "task-btns-container") {
        addObject();
    } else if (e.target.parentNode.parentNode.id === "tasks-container") {
        removeObject();
    } else if (e.target.id === "send-invoice-btn") {
        sendInvoice();
    }
}

function addObject() {
    console.log("object added");
}

function removeObject() {
    console.log("object removed");
}

function sendInvoice() {
    console.log("Invoice sent");
}

/*/////////////////////
    EVENT LISTENER
/////////////////////*/

document.addEventListener("click", handleClick);