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

	// Create unordered list for navigation
	const navigationList = document.createElement("ul");
	let parentListItems = [navigationList];

	// Loop over each heading link and create a list item for it
	headingLink.forEach(({ level, link }) => {
		const navigationItem = document.createElement("li");
		navigationItem.appendChild(link);

		// Check parent heading level
		if (level > 1) {
			const parentListItem = parentListItems[level - 2];
			if (!parentListItem.lastChild || parentListItem.lastChild.tagName !== "UL") {
				const newUl = document.createElement("ul");

				// Set a unique id for the new <ul> element, -1
				newUl.id = `list-level-${level - 1}`;
				parentListItem.appendChild(newUl);
			}
			parentListItem.lastChild.appendChild(navigationItem);
			parentListItems[level - 1] = navigationItem;
		} else {
			navigationList.appendChild(navigationItem);
			parentListItems = [navigationList];
		}
	});

	// Append navigationList to the <nav> ID
	linksContainer.appendChild(navigationList);
});
