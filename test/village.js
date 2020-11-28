import test from 'ava'

import Village from '../lib/village.js'
import Villager from '../lib/villager.js'
import Werewolf from '../lib/werewolf.js'

import PHASE from '../lib/constants/phase.js'

test.beforeEach(t => {
	t.context.village = new Village({players: [
		new Villager('Cindy'),
		new Villager('Don'),
		new Werewolf('Emily')
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

test('Village step', async t => {
	const village = t.context.village
	const werewolf = village.players.find(p => p.werewolf)

	// Always Kill first Villager
	werewolf.on('watingKillPlayerVote', e => {
		e.vote(e.killablePlayers[0])
	})

	village.players.forEach(p => p.on('watingVote', e => {
		e.vote(e.players.filter(v => v !== p)[0])
	}))

	t.is(village.day, 0)
	t.is(village.phase, PHASE.DAY)
	t.is(village.survivalPlayers.length, 3)
	await village.next() // first night

	t.is(village.day, 0)
	t.is(village.phase, PHASE.NIGHT)
	t.is(village.survivalPlayers.length, 3)
	await village.next() // day 1 daytime

	t.is(village.day, 1)
	t.is(village.phase, PHASE.DAY)
	t.is(village.survivalPlayers.length, 2)
	await village.next() // day 1 night

	t.is(village.day, 1)
	t.is(village.phase, PHASE.NIGHT)
	t.is(village.survivalPlayers.length, 1)

	t.true(await village.detectEnd())
})

test('play', async t => {
	const village = t.context.village
	const werewolf = village.players.find(p => p.werewolf)
	// Always Kill first Villager
	werewolf.on('watingKillPlayerVote', e => {
		e.vote(e.killablePlayers[0])
	})

	village.players.forEach(p => p.on('watingVote', e => {
		e.vote(e.players.filter(v => v !== p)[0])
	}))
	await village.start()
	t.true(village.ended)
})

test('Detect end', async t => {
	const village = t.context.village
	t.false(await village.detectEnd())
	// kill all warewolves
	village.survivalPlayers.filter(p => p.werewolf).forEach(p => p.kill())
	t.true(await village.detectEnd())
})