document.addEventListener("DOMContentLoaded", function createNavigation() {
	let headings = document.querySelectorAll("h2[id], h3[id], h4[id], h5[id], h6[id]");
	let navList = document.createElement("ul");
	navList.classList.add("navbar");

	let currentList = navList;
	let lastLevel = 2;
	for (let i = 0; i < headings.length; i++) {
		let heading = headings[i];
		let level = parseInt(heading.tagName[1]);
		if (level > lastLevel) {
			let newList = document.createElement("ul");
			newList.classList.add("has-submenu");
			currentList.lastElementChild.appendChild(newList);
			currentList = newList;
		} else if (level < lastLevel) {
			let diff = lastLevel - level;
			for (let j = 0; j < diff; j++) {
				currentList = currentList.parentElement.parentElement;
			}
		}

		let listItem = document.createElement("li");
		listItem.classList.add("nav-item");
		let link = document.createElement("a");
		link.classList.add("nav-link");
		link.textContent = heading.textContent;
		link.href = "#" + heading.id;
		listItem.appendChild(link);
		currentList.appendChild(listItem);
		lastLevel = level;
	}

	setTimeout(function removeRedundantWords() {
		const links = document.querySelectorAll(".nav-link");
		for (let i = 0; i < links.length; i++) {
			const text = links[i].textContent;
			const updatedText = text.replace(/(tags|elements|tag|element)/g, "");
			links[i].textContent = updatedText;
		}
	}, 0);

	document.body.insertBefore(navList, document.body.firstChild);
});
