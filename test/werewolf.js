import test from 'ava'

import Village from '../lib/village.js'
import Werewolf from '../lib/werewolf.js'
import Villager from '../lib/villager.js'

test('Kill player', async t => {
	const werewolf = new Werewolf('Alpha')
	const villager = new Villager('Beta')
	const village = new Village({players: [
		werewolf,
		villager
	]})

	werewolf.on('watingKill', e => {
		e.kill(e.killablePlayers[0])
	})
	village.context = {}
	await werewolf.action(village)
	t.false(village.survivalPlayers.includes(village))
})