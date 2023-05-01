"use strict";
// wait for DOM to load
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

	// Loop over each heading link and append it to the <nav> ID
	headingLink.forEach((link) => {
		linksContainer.appendChild(link);
		linksContainer.appendChild(document.createElement("br"));
	});
});
