// Get the modal
var modal = document.getElementById("myModal");
var devWarning = document.getElementById("devWarning");
var colorModal = document.getElementById("colorModal");
/*
var soundModal = document.getElementById("soundModal");
*/
var bgModal = document.getElementById("bgModal");
var appleModal = document.getElementById("appleModal");
var nameModal = document.getElementById("nameModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");
var devBtn = document.getElementById("devBtn");
var colorBtn = document.getElementById("colorBtn");
var soundBtn = document.getElementById("soundBtn");
var bgButton = document.getElementById("bgButton");
var appleButton = document.getElementById("appleBtn");
var nameButton = document.getElementById("nameButton");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal


btn.onclick = function() {
    modal.style.display = "block";
}

devBtn.onclick = function() {
    devWarning.style.display = "block";
}

colorBtn.onclick = function() {
    colorModal.style.display = "block";
}

/*
soundBtn.onclick = function() {
    soundModal.style.display = "block";
}
*/



bgButton.onclick = function() {
    bgModal.style.display = "block";
}

appleButton.onclick = function() {
    appleModal.style.display = "block";
}

nameButton.onclick = function() {
    nameModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal

span.onclick = function() {
    modal.style.display = "none";
}

span.onclick = function() {
    devWarning.style.display = "none";
}

span.onclick = function() {
    colorModal.style.display = "none";
}

span.onclick = function() {
    nameModal.style.display = "none";
}

span.onclick = function() {
    bgModal.style.display = "none";
}

span.onclick = function() {
    appleModal.style.display = "none";
}

devWarning.onclick = function() {
    devWarning.style.display = "none";
}




// When the user clicks anywhere outside the modal, close it
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }}
window.onclick = function(event) {
    if (event.target === devWarning) {
        devWarning.style.display = "none";
    }}

window.onclick = function(event) {
    if (event.target === colorModal) {
        colorModal.style.display = "none";
    }
}

window.onclick = function(event) {
    if (event.target === soundModal) {
        soundModal.style.display = "none";
    }
}


window.onclick = function(event) {
    if (event.target === bgModal) {
        bgModal.style.display = "none";
    }
}

window.onclick = function(event) {
    if (event.target === appleModal) {
        appleModal.style.display = "none";
    }
}

window.onclick = function(event) {
    if (event.target === nameModal) {
        nameModal.style.display = "none";
    }
}

