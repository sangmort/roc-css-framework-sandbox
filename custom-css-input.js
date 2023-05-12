function previewStylesheet() {
    let stylesheet = document.getElementById("stylesheet").value;
    let head = document.head;
    let style = document.createElement("style");
    style.textContent = stylesheet;
    head.appendChild(style);
}

document.getElementById("preview").addEventListener("click", previewStylesheet);
