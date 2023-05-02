// Creates a custom HTML element and attaches a shadow root with a navigation list to it.
class Navigation extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });

        const container = document.createElement("nav");
        const linkElem = document.createElement("link");
        linkElem.setAttribute("rel", "stylesheet");
        linkElem.setAttribute("href", "basic.css");

        shadow.appendChild(linkElem);
        shadow.appendChild(container);
        this.navigationList = this.createNavigationList([]);
        shadow.appendChild(this.navigationList);

        document.body.insertBefore(container, document.body.firstChild);
    }

    connectedCallback() {
        const headingsWithIDs = Array.from(document.querySelectorAll("h2[id], h3[id], h4[id], h5[id], h6[id]"));
        const navigationList = this.createNavigationList(headingsWithIDs);
        this.cleanUpLinkText(navigationList);
        this.insertNavigationList(navigationList);
    }

    createNavigationList(headingsArray) {
        // Create a parent navbar <ul> for the generated heading links
        const navigationList = document.createElement("ul");
        navigationList.classList.add("navbar");

        let currentHeadingList = navigationList;
        let previousHeadingLevel = 2;

        headingsArray.forEach((heading) => {
            const currentHeadingLevel = parseInt(heading.tagName[1]);

            // If current heading has a higher level than previous heading, create a new submenu list
            if (currentHeadingLevel > previousHeadingLevel) {
                currentHeadingList = this.createSubmenuList(currentHeadingList);
            }

            // If current heading has a lower level than previous heading, go up the tree to the correct parent list
            else if (currentHeadingLevel < previousHeadingLevel) {
                currentHeadingList = this.navigateToParentList(
                    currentHeadingList,
                    previousHeadingLevel - currentHeadingLevel
                );
            }

            const navItem = this.createNavItem(heading);
            currentHeadingList.appendChild(navItem);

            previousHeadingLevel = currentHeadingLevel;
        });

        return navigationList;
    }

    createNavItem(heading) {
        const navItem = document.createElement("li");
        navItem.classList.add("nav-item");

        const navLink = this.createNavLink(heading);
        navItem.appendChild(navLink);

        return navItem;
    }

    createNavLink(heading) {
        const navLink = document.createElement("a");
        navLink.classList.add("nav-link");
        navLink.textContent = heading.textContent;
        navLink.href = `#${heading.id}`;

        return navLink;
    }

    createSubmenuList(currentHeadingList) {
        const submenuList = document.createElement("ul");
        submenuList.classList.add("sub-menu");
        currentHeadingList.lastElementChild.appendChild(submenuList);

        return submenuList;
    }

    navigateToParentList(currentHeadingList, headingLevelDifference) {
        let parentList = currentHeadingList.parentElement.parentElement;
        for (let i = 1; i < headingLevelDifference; i++) {
            parentList = parentList.parentElement.parentElement;
        }

        return parentList;
    }

    // Remove redundant words from navigation links for a cleaner UI
    cleanUpLinkText(navigationList) {
        const navigationLinks = navigationList.querySelectorAll(".nav-link");
        navigationLinks.forEach((link) => {
            link.textContent = link.textContent.replace(/(tags|elements?)/gi, "").trim();
        });
    }

    // Remove redundant words from navigation links for a cleaner UI
    insertNavigationList(navigationList) {
        document.body.insertBefore(navigationList, document.body.firstChild);
    }
}

customElements.define("navigation", Navigation);
