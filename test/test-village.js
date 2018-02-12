import test from 'ava'

import Village from '../lib/village.js'
import Villager from '../lib/vilagger.js'
import Warewolf from '../lib/warewolf.js'

test('Create Village', t => {

	const village = new Village({players: [
		new Villager('Arlene'),
		new Villager('Bret'),
		new Villager('Cindy'),
		new Villager('Don'),
		new Warewolf('Emily')
	]})
})