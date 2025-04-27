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
const base_beep_duration = 250

const global_state = (() => {
	let state = {
		isplaying: false,
		short_beep: null,
		long_beep: null,
		sleep: null,
	};

	return {
		getState: () => state,

		isPlaying: () => state.isplaying,

		setPlaying: (isPlay) => {
			state.isplaying = isPlay
		},

		setBeep: (short, long, sleep) => {
			state.short_beep = short
			state.long_beep = long
			state.sleep = sleep
		},
	}
})();

/** Initialize beep sounds
 * @param {Number} duration = milliseconds
*/
function init_beep(duration = base_beep_duration) {
	const short = () => getBeep(duration)
	const long = () => getBeep(duration * 3)
	const sleep = async () => {
		await new Promise(resolve => {
			setTimeout(resolve, duration)
		})
	}
	global_state.setBeep(short, long, sleep)
}

/**
 * Create beep sound with duration
 * @param {Number} duration - milliseconds
 * @return {AudioContext} beep sounds
 */
async function getBeep(duration = base_beep_duration) {
	const soundCtx = new AudioContext()
	const oscillator = soundCtx.createOscillator()
	const gainNode = soundCtx.createGain()
	oscillator.frequency.setValueAtTime(800, soundCtx.currentTime)
	oscillator.connect(gainNode)
	gainNode.connect(soundCtx.destination)

	oscillator.start()
	const promise = new Promise(resolve =>
		setTimeout(() => {
			oscillator.stop()
			global_state.setPlaying(false)
			resolve()
		}, duration)
	)
	await promise
}


/**
 * Emitting sound for specific strings of "." or "-"
 * @param {String} morseStr - the morse code
*/
async function playMorseSound(morseStr) {
	const state = global_state.getState()
	const short_beep = state.short_beep
	const long_beep = state.long_beep
	const sleep = state.sleep

	for (let i = 0; i < morseStr.length; i++) {
		const c = morseStr[i];
		if (c === ".") {
			await short_beep()
		} else if (c === "-") {
			await long_beep()
		}
		if (i === morseStr.length - 1) {
			break
		}
		await sleep()
	}
}

/**
 * Play morse code sound of a character
 * @param {ChracterData} char
*/
async function playSound(char) {
	console.log(global_state.isPlaying())
	if (global_state.isPlaying()) {
		console.log("The sound is playing...")
		return
	}
	global_state.setPlaying(true)
	console.log(global_state.isPlaying())
	const state = global_state.getState()
	console.log(state)
	if (!state.sleep || !state.short_beep || !state.long_beep) {
		init_beep()
	}
	if (!(char in morseCode)) {
		console.error("This character is not in Morse code")
	}
	await playMorseSound(morseCode[char])
	global_state.setPlaying(false)
}

export default playSound;
