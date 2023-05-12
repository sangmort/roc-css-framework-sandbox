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

        // Trigger FileReader when the file has been read
        reader.onload = (event) => {
            css = event.target.result; // Store in css variable
        };
    });

    // Target apply-styles button
    const applyStylesButton = document.getElementById("apply-styles");

    // Wait for apply styles but to be clicked
    applyStylesButton.addEventListener("click", () => {
        // If css variable is initialized, store contents of inputed file in a data URI
        if (css) {
            const cssDataUri =
                "data:text/css;charset=utf-8," + encodeURIComponent(css);

            // Create link rel to the stylesheet ...
            const customStylesheetLink = document.createElement("link");
            customStylesheetLink.setAttribute("rel", "stylesheet");
            customStylesheetLink.setAttribute("href", cssDataUri);

            // ... and append to head element
            const head = document.getElementsByTagName("head")[0];
            head.appendChild(customStylesheetLink);
        }
    });

    // Target remove styles button & wait for it to be clicked
    const removeStylesButton = document.getElementById("remove-styles");

    removeStylesButton.addEventListener("click", () => {
        // Check if link element href starts with "data:text/css"
        const customStylesheetLink = document.querySelector(
            'link[href^="data:text/css"]'
        );

        // If the css is found, remove the stylesheet
        if (customStylesheetLink) {
            customStylesheetLink.parentNode.removeChild(customStylesheetLink);
        }
    });
});
