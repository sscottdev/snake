// Get the modal
var modal = document.getElementById("myModal");
var devWarning = document.getElementById("devWarning");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");
var devBtn = document.getElementById("devBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

devBtn.onclick = function() {
    devWarning.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }}
window.onclick = function(event) {
    if (event.target == devWarning) {
        devWarning.style.display = "none";
    }}