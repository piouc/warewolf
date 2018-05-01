import test from 'ava'

import Village from '../lib/village.js'
import Warewolf from '../lib/warewolf.js'
import Villager from '../lib/villager.js'

test('Kill player', async t => {
	const warewolf = new Warewolf('Alpha')
	const villager = new Villager('Beta')
	const village = new Village({players: [
		warewolf,
		villager
	]})

	t.plan(3)
	warewolf.on('watingKill', e => {
		t.is(e.killablePlayers.length, 1)
		t.is(e.killablePlayers[0], villager)
		e.kill(e.killablePlayers[0])
		t.true(villager.dead)
	})
	await warewolf.action(village)
})