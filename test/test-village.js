import test from 'ava'

import Village from '../lib/village.js'
import Villager from '../lib/vilagger.js'
import Warewolf from '../lib/warewolf.js'

test.beforeEach(t => {
	t.context.village = new Village({players: [
		new Villager('Arlene'),
		new Villager('Bret'),
		new Villager('Cindy'),
		new Villager('Don'),
		new Warewolf('Emily')
	]})
})

test('Create Village', t => {
	const village = t.context.village
	t.pass()
})

test('Village has players', t => {
	const village = t.context.village
	t.is(village.players.length, 5)
})

test('Village has survivalPlayers', t => {
	const village = t.context.village
	t.is(village.survivalPlayers.length, 5)

	village.players[0].kill()

	t.is(village.survivalPlayers.length, 4)
})

test('Play game', t => {
	const village = t.context.village
	village.next()
})