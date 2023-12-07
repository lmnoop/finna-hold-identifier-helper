// ==UserScript==
// @name        Finna Hold Identifier Helper
// @namespace   raina
// @match       https://*.finna.fi/Holds/List
// @grant       none
// @version     1.0
// @author      raina
// @description 12/7/2023, 8:49:15 AM
// ==/UserScript==
let heading = document.querySelector(`h2`);
let span = document.createElement("span");
span.style.float = "right";
span.style.lineHeight = 2;
span.style.fontSize = "smaller";
span.textContent = localStorage.holdIdentifier ?? "";
heading.append(span);
fetch("/MyResearch/Profile")
.then(response => response.text())
.then(html => {
	const parser = new DOMParser();
	const sampleDoc = parser.parseFromString(html, "text/html");
	const content = sampleDoc.querySelector(`#profile_library_form`);
	let profile_email = content.querySelector(`[name="profile_email"]`);
	span.textContent = profile_email.parentElement.nextElementSibling.textContent;
	span.textContent += " ";
	span.textContent += profile_email.parentElement.nextElementSibling.nextElementSibling.textContent;
	localStorage.holdIdentifier = span.textContent;
});
