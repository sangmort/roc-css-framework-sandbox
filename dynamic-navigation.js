document.addEventListener("DOMContentLoaded", function extractHeadings() {
    const headings = Array.from(document.querySelectorAll("h2[id], h3[id], h4[id], h5[id], h6[id]"));
    const navList = createNavigation(headings);
    removeRedundantWords(navList);

    document.body.insertBefore(navList, document.body.firstChild);
});

function createNavigation(headings) {
    const navList = document.createElement("ul");
    navList.classList.add("navbar");

    let currentList = navList;
    let lastLevel = 2;

    headings.forEach((heading) => {
        const level = parseInt(heading.tagName[1]);

        if (level > lastLevel) {
            const newList = document.createElement("ul");
            newList.classList.add("has-submenu");
            currentList.lastElementChild.appendChild(newList);
            currentList = newList;
        } else if (level < lastLevel) {
            const diff = lastLevel - level;
            currentList = currentList.parentElement.parentElement;
            for (let i = 1; i < diff; i++) {
                currentList = currentList.parentElement.parentElement;
            }
        }

        const listItem = document.createElement("li");
        listItem.classList.add("nav-item");

        const link = document.createElement("a");
        link.classList.add("nav-link");
        link.textContent = heading.textContent;
        link.href = `#${heading.id}`;

        listItem.appendChild(link);
        currentList.appendChild(listItem);

        lastLevel = level;
    });

    return navList;
}

function removeRedundantWords(navList) {
    const links = navList.querySelectorAll(".nav-link");
    links.forEach((link) => {
        link.textContent = link.textContent.replace(/(tags|elements?)/gi, "").trim();
    });
}
