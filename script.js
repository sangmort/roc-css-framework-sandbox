"use strict";
// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function createNav() {
	// Grab all headings that have an ID
	const headings = document.querySelectorAll("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]");

	// Create an array of links where the href is the heading ID
	const headingLink = Array.from(headings).map((heading) => {
		const link = document.createElement("a");
		link.href = `#${heading.id}`;
		link.textContent = heading.textContent;
		return { level: Number(heading.nodeName.charAt(1)), link };
	});

	// Add created links to <nav> ID
	const linksContainer = document.getElementById("html-tag-group-links");

	// Create an unordered list for navigation
	const navigationList = document.createElement("ul");

	// Add a `nav-menu` class to outermost unordered list
	navigationList.classList.add("nav-menu");
	let parentListItems = [navigationList];

	// Loop over each heading link and create a list item for it
	headingLink.forEach(({ level, link }) => {
		const navigationItem = document.createElement("li");
		navigationItem.classList.add("nav-item"); // Add class to list item
		navigationItem.appendChild(link);

		// Check parent heading level
		if (level > 1) {
			const parentListItem = parentListItems[level - 2];
			if (!parentListItem || !parentListItem.lastChild || parentListItem.lastChild.tagName !== "UL") {
				const newUl = document.createElement("ul");

				// Add `nav-menu` class to every `ul` element
				newUl.classList.add("nav-menu");

				if (level === 2) {
					const newLi = document.createElement("li");
					newLi.appendChild(newUl);
					parentListItem.appendChild(newLi);
				} else {
					parentListItem.appendChild(newUl);
				}
				parentListItems[level - 1] = newUl;
			}
			parentListItems[level - 1].appendChild(navigationItem);
		} else {
			navigationList.appendChild(navigationItem);
			parentListItems = [navigationList];
		}
	});

	// Append navigationList to the <nav> ID
	linksContainer.appendChild(navigationList);
});
