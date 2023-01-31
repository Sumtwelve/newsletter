var instructionsBtn = document.getElementById("instructions-btn");
instructionsBtn.addEventListener("click", function() {
    var modal = document.getElementById("modal");
    modal.setAttribute("style", "display: block;");
    //modal.classList.add("modal");
});

var closeModalBtn = document.getElementById("close-modal-btn");
closeModalBtn.addEventListener("click", function() {
    var modal = document.getElementById("modal");
    modal.setAttribute("style", "display: none;");
});