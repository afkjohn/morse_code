init()

/**
 * Initialize all websites and all sounds
*/
function init() {
	const allButtons = document.getElementById("alphabets").childNodes;
	allButtons.forEach(c => {
		console.log(c.innerHTML)
	})
}


const morseCode = {
	A: ".-",
	B: "-...",
	C: "-.-.",
	D: "-..",
	E: ".",
	F: "..-.",
	G: "--.",
	H: "....",
	I: "..",
	J: ".---",
	K: "-.-",
	L: ".-..",
	M: "--",
	N: "-.",
	O: "---",
	P: ".--.",
	Q: "--.-",
	R: ".-.",
	S: "...",
	T: "-",
	U: "..-",
	V: "...-",
	W: ".--",
	X: "-..-",
	Y: "-.--",
	Z: "--.."
};


/**
	* Get sound for specific character
	* @param {CharacterData} c - the character
	* @return {AudioContext} the sound
	*/
function getSound(c) {
	if (!(c in morseCode)) {
		console.error("this character is not in Morse code")
		return
	}

}

/**
 * Generate sound for specific strings of "." or "-"
 * @param {String} morseStr - the morse code
 * @return {AudioContext} the sound
*/
function generateSound(morseStr) {
}
