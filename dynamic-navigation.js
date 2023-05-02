// Creates a custom HTML element and attaches a shadow root with a navigation list to it.
class Navigation extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });

        const navigationList = createNavigationList(headingsWithIDs);
        cleanUpLinkText(navigationList);
        shadow.appendChild(navigationList);

        
    // Create <nav> to insert shadow root
    const container = document.createElement("nav");

    // Create link element for CSS
    const linkElem = document.createElement("link");
    linkElem.setAttribute("rel", "stylesheet");
    linkElem.setAttribute("href", "basic.css");

    // Append navigation & stylesheet to shadow root
    shadow.appendChild(linkElem);
    shadow.appendChild(container);
    shadow.appendChild(navigationList);

    document.body.insertBefore(container, document.body.firstChild);
    }
}

// Dynamically generate navigation after DOM Load using heading ID's for Links
document.addEventListener("DOMContentLoaded", function generateNavigation() {
    const headingsWithIDs = Array.from(document.querySelectorAll("h2[id], h3[id], h4[id], h5[id], h6[id]"));
    const navigationList = createNavigationList(headingsWithIDs);
    cleanUpLinkText(navigationList);
    insertNavigationList(navigationList);


    // insert shadow root at the beginning of the <body>

});

// Create unordered list from array of extrated headings with unique IDs
function createNavigationList(headingsArray) {
    // Create a parent navbar <ul> for the generated heading links
    const navigationList = document.createElement("ul");
    navigationList.classList.add("navbar");

    let currentHeadingList = navigationList;
    let previousHeadingLevel = 2;

    headingsArray.forEach((heading) => {
        const currentHeadingLevel = parseInt(heading.tagName[1]);

        // If current heading has a higher level than previous heading, create a new submenu list
        if (currentHeadingLevel > previousHeadingLevel) {
            currentHeadingList = createSubmenuList(currentHeadingList);
        }

        // If current heading has a lower level than previous heading, go up the tree to the correct parent list
        else if (currentHeadingLevel < previousHeadingLevel) {
            currentHeadingList = navigateToParentList(currentHeadingList, previousHeadingLevel - currentHeadingLevel);
        }

        const navItem = createNavItem(heading);
        currentHeadingList.appendChild(navItem);

        previousHeadingLevel = currentHeadingLevel;
    });

    return navigationList;
}

// Create new <li> for the heading & Add link to it
function createNavItem(heading) {
    const navItem = document.createElement("li");
    navItem.classList.add("nav-item");

    const navLink = createNavLink(heading);
    navItem.appendChild(navLink);

    return navItem;
}

// Create new link anchor text & href for the heading
function createNavLink(heading) {
    const navLink = document.createElement("a");
    navLink.classList.add("nav-link");
    navLink.textContent = heading.textContent;
    navLink.href = `#${heading.id}`;

    return navLink;
}

// Add the <li> containing link to the current <ul>
function createSubmenuList(currentHeadingList) {
    const submenuList = document.createElement("ul");
    submenuList.classList.add("sub-menu");
    currentHeadingList.lastElementChild.appendChild(submenuList);

    return submenuList;
}

// Navigate to the parent list based on the heading level difference
function navigateToParentList(currentHeadingList, headingLevelDifference) {
    let parentList = currentHeadingList.parentElement.parentElement;
    for (let i = 1; i < headingLevelDifference; i++) {
        parentList = parentList.parentElement.parentElement;
    }

    return parentList;
}

// Remove redundant words from navigation links for a cleaner UI
function cleanUpLinkText(navigationList) {
    const navigationLinks = navigationList.querySelectorAll(".nav-link");
    navigationLinks.forEach((link) => {
        link.textContent = link.textContent.replace(/(tags|elements?)/gi, "").trim();
    });
}

// Remove redundant words from navigation links for a cleaner UI
function insertNavigationList(navigationList) {
    document.body.insertBefore(navigationList, document.body.firstChild);
}
