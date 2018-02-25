export function once(fn){
	let counter = 0
	return (...args) => {
		if(counter > 0) {
			throw new Error('This function called once only')
		} else {
			counter++
			return fn(...args)
		}
	}
}