const fileInput = document.getElementById("file-input");

fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = (event) => {
        // Store content of CSS file in a variable
        const css = event.target.result;
    };
});

const applyStylesButton = document.getElementById("apply-styles");

applyStylesButton.addEventListener("click", () => {
    const cssDataUri = "data:text/css;charset=utf-8," + encodeURIComponent(css);

    const customStylesheetLink = document.createElement("link");
    customStylesheetLink.setAttribute("rel", "stylesheet");
    customStylesheetLink.setAttribute("href", cssDataUri);

    const head = document.getElementsByTagName("head")[0];
    head.appendChild(customStylesheetLink);
});

const removeStylesButton = document.getElementById("remove-styles");

removeStylesButton.addEventListener("click", () => {
    const customStylesheetLink = document.querySelector(
        'link[href^="data:text/css"]'
    );

    if (customStylesheetLink) {
        customStylesheetLink.parentNode.removeChild(customStylesheetLink);
    }
});
