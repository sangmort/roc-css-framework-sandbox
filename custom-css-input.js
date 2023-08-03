document.addEventListener("DOMContentLoaded", function getUserStyles() {
  // Target the input & create an empty variable to store the css
  const inputUserStylesFile = document.getElementById("input-styles");
  const applyStylesButton = document.getElementById("apply-styles");
  const removeStylesButton = document.getElementById("remove-styles");
  let storeUserStylesFile;

  // Wait for a file to be inputted
  inputUserStylesFile.addEventListener("change", (inputUserStylesEvent) => {
    // Use first file inputted
    const userStylesFile = inputUserStylesEvent.target.files[0];

    // Call FileReader constructor into variable to read file
    const reader = new FileReader();
    reader.readAsText(userStylesFile); // Read the file as text

    // Trigger FileReader when the file has been read
    reader.onload = (loadUserStylesEvent) => {
      storeUserStylesFile = loadUserStylesEvent.target.result; // Store in css variable
    };
  });

  applyStylesButton.addEventListener("click", function applyUserStyles() {
    // When css variable is initialized, store contents of inputed file in a data URI
    if (storeUserStylesFile) {
      const cssDataUri = "data:text/css;charset=utf-8," + encodeURIComponent(storeUserStylesFile);

      // Create link rel to the stylesheet ...
      const linkUserStyles = document.createElement("link");
      linkUserStyles.setAttribute("id", "user-style-sheet");
      linkUserStyles.setAttribute("rel", "stylesheet");
      linkUserStyles.setAttribute("href", cssDataUri);

      // ... and append to head element
      const documentHead = document.getElementsByTagName("head")[0];
      documentHead.appendChild(linkUserStyles);
    }
  });

  removeStylesButton.addEventListener("click", function removeUserStyles() {
    // Check if link element href starts with "data:text/css"
    const userStylesheetLink = document.querySelector("#user-style-sheet");

    // If the css is found, remove the stylesheet
    if (userStylesheetLink) {
      userStylesheetLink.parentNode.removeChild(userStylesheetLink);
    }
  });
});
