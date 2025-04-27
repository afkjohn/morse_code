import playSound from "./sound.js"

init()

/**
 * Initialize all websites and all sounds
*/
function init() {
	const allButtons = document.getElementById("alphabets").childNodes;
	allButtons.forEach(c => {
		c.onclick = () => playSound(c.innerHTML)
	})
}
