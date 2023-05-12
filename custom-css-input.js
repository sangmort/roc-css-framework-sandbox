// Wait for DOM to load before executing user-styling script
document.addEventListener("DOMContentLoaded", () => {
    // Target the input & create an empty variable to store the css
    const fileInput = document.getElementById("file-input");
    let css;

    // Wait for a file to be inputted
    fileInput.addEventListener("change", (event) => {
        // Use first file inputted
        const file = event.target.files[0];

        // Call FileReader constructor into variable to read file
        const reader = new FileReader();
        reader.readAsText(file); // Read the file as text

        reader.onload = (event) => {
            css = event.target.result;
        };
    });

    const applyStylesButton = document.getElementById("apply-styles");

    applyStylesButton.addEventListener("click", () => {
        if (css) {
            const cssDataUri =
                "data:text/css;charset=utf-8," + encodeURIComponent(css);

            const customStylesheetLink = document.createElement("link");
            customStylesheetLink.setAttribute("rel", "stylesheet");
            customStylesheetLink.setAttribute("href", cssDataUri);

            const head = document.getElementsByTagName("head")[0];
            head.appendChild(customStylesheetLink);
        }
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
});
