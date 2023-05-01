"use strict";
// Wait for DOM to finish loading before buidling navigation
document.addEventListener("DOMContentLoaded", function extractHeadings() {
    // Extract headings with an ID and put them in an array
    const headings = Array.from(document.querySelectorAll("h2[id], h3[id], h4[id], h5[id], h6[id]"));
    
    // Create an unordered list from the headings array
    const navList = createNavigation(headings);

    // Remove redundant words from navigation links
    removeRedundantWords(navList);

    // Insert dynamically generated navigation at the beginning of the <body> element
    document.body.insertBefore(navList, document.body.firstChild);
});

// Create unordered list from array of extrated headings with unique IDs
function createNavigation(headings) {
    // Create a navbar <ul> for the generated heading links
    const navList = document.createElement("ul");
    navList.classList.add("navbar");

    // Variables to track current list & last heading level processed
    let currentList = navList;
    let lastLevel = 2;

    // Loop through each heading in the array
    headings.forEach((heading) => {
        // Check the level of the current heading (e.g. h2 = level 2)
        const level = parseInt(heading.tagName[1]);

        // If current heading has a higher level than previous heading, create a new submenu list
        if (level > lastLevel) {
            const newList = document.createElement("ul");
            newList.classList.add("has-submenu");
            currentList.lastElementChild.appendChild(newList);
            currentList = newList;
        }
        // If current heading has a lower level than previous one, go up the tree to the correct parent list
        else if (level < lastLevel) {
            const diff = lastLevel - level;
            currentList = currentList.parentElement.parentElement;
            for (let i = 1; i < diff; i++) {
                currentList = currentList.parentElement.parentElement;
            }
        }

        // Create new <li> and link anchor for the current heading
        const listItem = document.createElement("li");
        listItem.classList.add("nav-item");

        const link = document.createElement("a");
        link.classList.add("nav-link");
        link.textContent = heading.textContent;

		// Create link target from `#` + heading ID 
        link.href = `#${heading.id}`;

        // Add link to the <li> & then add the <li> to the current <ul>
        listItem.appendChild(link);
        currentList.appendChild(listItem);

        // Update last level to current level for the next iteration
        lastLevel = level;
    });

    // Return the completed navigation list
    return navList;
}

// Remove redundant words from navigation links for a cleaner UI
function removeRedundantWords(navList) {
	    // Find all links that have the class '.nav-link` & loop through them
    const links = navList.querySelectorAll(".nav-link");
    links.forEach((link) => {
        // Replace "tags" &/or "element(s)" with an empty string & trim whitespace
        link.textContent = link.textContent.replace(/(tags|elements?)/gi, "").trim();
    });
}
