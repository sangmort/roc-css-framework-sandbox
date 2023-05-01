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
		console.log(link);
		return link;
	});

	// Add created links to <nav> ID
	const linksContainer = document.getElementById("html-tag-group-links");

	// Create unordered list for navigation
	const navigationList = document.createElement("ul");

	// Loop over each heading link and create a list item for i
	headingLink.forEach((link) => {
		const navigationItem = document.createElement("li");
		navigationItem.appendChild(link);
		navigationList.appendChild(navigationItem);
	});

	// Append navigationList to the <nav>
	linksContainer.appendChild(navigationList);
});
