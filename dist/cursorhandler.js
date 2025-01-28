"use strict";
function spark(event) {
    let iElement = document.createElement('i');
    iElement.style.top = (event.pageY) + 'px';
    iElement.style.left = (event.pageX) + 'px';
    iElement.classList.add("mouse-movement");
    iElement.style.scale = `${Math.random() * 2 + 1}`;
    iElement.style.setProperty("--xAxis", pixelPath());
    iElement.style.setProperty("--yAxis", pixelPath());
    document.body.appendChild(iElement);
    setTimeout(() => { document.body.removeChild(iElement); }, 2000);
}
function pixelPath() {
    return `${Math.random() * 400 - 200}px`;
}
let submitBtn = document.querySelector(".submitBtn");
let mainInput = document.querySelector(".messageBox");
function showSubmitBtn() {
    submitBtn.style.opacity = `${1}`;
}
mainInput.addEventListener("keydown", showSubmitBtn);
document.addEventListener('mousemove', spark);
//# sourceMappingURL=cursorhandler.js.map