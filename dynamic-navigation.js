class DynamicNavigation extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });

        const container = document.createElement("nav");
        const linkElem = document.createElement("link");
        linkElem.setAttribute("rel", "stylesheet");
        linkElem.setAttribute("href", "basic.css");

        container.appendChild(linkElem);
        container.appendChild(this.createNavigationList([]));
        shadow.appendChild(container);
    }


    connectedCallback() {
        const headingsWithIDs = Array.from(document.querySelectorAll("h2[id], h3[id], h4[id], h5[id], h6[id]"));
        const navigationList = this.createNavigationList(headingsWithIDs);
        this.cleanUpLinkText(navigationList);
        const container = this.shadowRoot.querySelector("nav");
        container.appendChild(navigationList);
    }

    // Dynamically generate navigation after DOM Load using heading ID's for Links
    createNavigationList(headingsArray) {
        // Create a parent navbar <ul> for the generated heading links
        const navigationList = document.createElement("ul");
        navigationList.classList.add("navbar");

        let currentHeadingList = navigationList;
        let previousHeadingLevel = 2;

        
        // If current heading has a higher level than previous heading, create a new submenu list
        headingsArray.forEach((heading) => {
            const currentHeadingLevel = parseInt(heading.tagName[1]);
            if (currentHeadingLevel > previousHeadingLevel) {
                currentHeadingList = this.createSubmenuList(currentHeadingList);
            } else if (currentHeadingLevel < previousHeadingLevel) {
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

    cleanUpLinkText(navigationList) {
        const navigationLinks = navigationList.querySelectorAll(".nav-link");
        navigationLinks.forEach((link) => {
            link.textContent = link.textContent.replace(/(tags|elements?)/gi, "").trim();
        });
    }
}

customElements.define("dynamic-navigation", DynamicNavigation);
