"use strict";
// Dynamically generate navigation after DOM Load using heading ID's for Links
document.addEventListener("DOMContentLoaded", function generateNavigation() {
    const headingsWithIDs = Array.from(document.querySelectorAll("h2[id], h3[id], h4[id], h5[id], h6[id]"));
    const navigationList = buildNavigationList(headingsWithIDs);
    cleanUpLinkText(navigationList);

    // Insert dynamically generated navigation at the beginning of the <body> element
    document.body.insertBefore(navigationList, document.body.firstChild);
});

// Create unordered list from array of extrated headings with unique IDs
function buildNavigationList(headingsArray) {
    // Create a parent navbar <ul> for the generated heading links
    const navigationList = document.createElement("ul");
    navigationList.classList.add("navbar");

    let currentHeadingList = navigationList;
    let previousHeadingLevel = 2;

    headingsArray.forEach((heading) => {
        const currentHeadingLevel = parseInt(heading.tagName[1]);

        // If current heading has a higher level than previous heading, create a new submenu list
        if (currentHeadingLevel > previousHeadingLevel) {
            const submenuList = document.createElement("ul");
            submenuList.classList.add("sub-menu");
            currentHeadingList.lastElementChild.appendChild(submenuList);
            currentHeadingList = submenuList;
        }
        // If current heading has a lower level than previous heading, go up the tree to the correct parent list
        else if (currentHeadingLevel < previousHeadingLevel) {
            const diff = previousHeadingLevel - currentHeadingLevel;
            currentHeadingList = currentHeadingList.parentElement.parentElement;
            for (let i = 1; i < diff; i++) {
                currentHeadingList = currentHeadingList.parentElement.parentElement;
            }
        }

        // Create new <li> and link anchor for the current heading
        const navItem = document.createElement("li");
        navItem.classList.add("nav-item");

        const navLink = document.createElement("a");
        navLink.classList.add("nav-link");
        navLink.textContent = heading.textContent;
        navLink.href = `#${heading.id}`;

        // Add link to the <li> & then add the <li> to the current <ul>
        navItem.appendChild(navLink);
        currentHeadingList.appendChild(navItem);

        // Update previous level to current level for the next iteration
        previousHeadingLevel = currentHeadingLevel;
    });

    // Return the completed navigation list
    return navigationList;
}

// Remove redundant words from navigation links for a cleaner UI
function cleanUpLinkText(navigationList) {
    const navigationLinks = navigationList.querySelectorAll(".nav-link");
    navigationLinks.forEach((link) => {
        link.textContent = link.textContent.replace(/(tags|elements?)/gi, "").trim();
    });
}
