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

export function count(array){
	const map = new Map()
	for(let entry of array){
		if(map.has(entry)){
			map.set(entry, map.get(entry) + 1)
		} else {
			map.set(entry, 1)
		}
	}
	return map
}

export function top(map){
	const kv = Array.from(map)
	const top = Math.max(...kv.map(([key, value]) => value))
	return kv.filter(([key, value]) => value === top).map(([key, value]) => key)
}