import test from 'ava'

import Village from '../lib/village.js'
import Villager from '../lib/vilagger.js'
import Warewolf from '../lib/warewolf.js'

import PHASE from '../lib/constants/phase.js'

test.beforeEach(t => {
	t.context.village = new Village({players: [
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
	t.is(village.players.length, 3)
})

test('Village has survivalPlayers', t => {
	const village = t.context.village
	t.is(village.survivalPlayers.length, 3)

	village.players[0].kill()

	t.is(village.survivalPlayers.length, 2)
})

test('Play game', async t => {
	const village = t.context.village
	const warewolf = village.players.find(p => p instanceof Warewolf)

	// Always Kill first Villager
	warewolf.on('watingKill', e => {
		e.kill(village.players.filter(p => p instanceof Villager)[0])
	})

	village.players.forEach(p => p.on('watingVote', e => {
		e.vote(e.players.filter(v => v !== p)[0])
	}))


	t.is(village.day, 0)
	t.is(village.phase, PHASE.DAY)
	t.is(village.survivalPlayers.length, 3)



	await village.next()
	t.is(village.day, 0)
	t.is(village.phase, PHASE.NIGHT)
	t.is(village.survivalPlayers.length, 2)
	await village.next()

})

test('Detect end', async t => {
	const village = t.context.village
	t.false(await village.detectEnd())
	// kill all warewolves
	village.survivalPlayers.filter(p => p.warewolf).forEach(p => p.kill())
	t.true(await village.detectEnd())
})