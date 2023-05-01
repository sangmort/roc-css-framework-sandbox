"use strict";
// Wait for DOM to finish loading before buidling navigation
document.addEventListener("DOMContentLoaded", function generateNavigation() {
    // Extract headings with an ID and put them in an array
    const headingsWithIDs = Array.from(document.querySelectorAll("h2[id], h3[id], h4[id], h5[id], h6[id]"));

    // Create an unordered list from the headings array
    const navigationList = buildNavigationList(headingsWithIDs);

    // Remove redundant words from navigation links
    cleanUpLinkText(navigationList);

    // Insert dynamically generated navigation at the beginning of the <body> element
    document.body.insertBefore(navigationList, document.body.firstChild);
});

// Create unordered list from array of extrated headings with unique IDs
function buildNavigationList(headingsArray) {
    // Create a navbar <ul> for the generated heading links
    const navigationList = document.createElement("ul");
    navigationList.classList.add("navbar");

    // Variables to track current list & last heading level processed
    let currentParentList = navigationList;
    let prevHeadingLevel = 2;

    // Loop through each heading in the array
    headingsArray.forEach((heading) => {
        // Check the level of the current heading (e.g. h2 = level 2)
        const headingLevel = parseInt(heading.tagName[1]);

        // If current heading has a higher level than previous heading, create a new submenu list
        if (headingLevel > prevHeadingLevel) {
            const submenuList = document.createElement("ul");
            submenuList.classList.add("sub-menu");
            currentParentList.lastElementChild.appendChild(submenuList);
            currentParentList = submenuList;
        }
        // If current heading has a lower level than previous one, go up the tree to the correct parent list
        else if (headingLevel < prevHeadingLevel) {
            const diff = prevHeadingLevel - headingLevel;
            currentParentList = currentParentList.parentElement.parentElement;
            for (let i = 1; i < diff; i++) {
                currentParentList = currentParentList.parentElement.parentElement;
            }
        }

        // Create new <li> and link anchor for the current heading
        const navItem = document.createElement("li");
        navItem.classList.add("nav-item");

        const navLink = document.createElement("a");
        navLink.classList.add("nav-link");
        navLink.textContent = heading.textContent;

        // Create link target from `#` + heading ID
        navLink.href = `#${heading.id}`;

        // Add link to the <li> & then add the <li> to the current <ul>
        navItem.appendChild(navLink);
        currentParentList.appendChild(navItem);

        // Update last level to current level for the next iteration
        prevHeadingLevel = headingLevel;
    });

    // Return the completed navigation list
    return navigationList;
}

// Remove redundant words from navigation links for a cleaner UI
function cleanUpLinkText(navigationList) {
    // Find all links that have the class '.nav-link` & loop through them
    const navigationLinks = navigationList.querySelectorAll(".nav-link");
    navigationLinks.forEach((link) => {
        // Replace "tags" &/or "element(s)" with an empty string & trim whitespace
        link.textContent = link.textContent.replace(/(tags|elements?)/gi, "").trim();
    });
}
