"use strict";
// wait for DOM to load
document.addEventListener("DOMContentLoaded"),
	function createNav() {
		// Grab all headings that have an ID
		const headings = document.querySelectorAll("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]");

		// Create an array of links where the href is the heading ID
		const links = Array.from(headings).map((heading) => {
			const link = document.createElement(a);
		});
	};
