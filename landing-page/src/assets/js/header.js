const header = document.querySelector("#header");
let headerNav = document.querySelector(".header-c");

let lastScrollPos = 0;
const SCROLL_THRESHOLD = 55;

window.addEventListener("load", () => {
	const currentScrollPos =
		window.pageYOffset || document.documentElement.scrollTop;
	const headerHeight = header.getBoundingClientRect().height;
	if (currentScrollPos > headerHeight) {
		header.classList.add("headerBg");
	}
});
window.addEventListener("scroll", () => {
	const currentScrollPos =
		window.pageYOffset || document.documentElement.scrollTop;
	const headerHeight = header.getBoundingClientRect().height;

	// Check if the user has scrolled far enough
	if (Math.abs(lastScrollPos - currentScrollPos) <= SCROLL_THRESHOLD) {
		return;
	}

	// Throttle the scroll event
	if (currentScrollPos > headerHeight) {
		header.classList.add("headerBg");
	} else {
		header.classList.remove("headerBg");
	}

	// Store the current scroll position
	lastScrollPos = currentScrollPos;
});
