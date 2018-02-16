import test from 'ava'
import Player from '../lib/player.js'

test.beforeEach('Create Player', t => {
	t.context.player = new Player('Arlene')
})

test('Create player', t => {
	const player = t.context.player
	t.true(player instanceof Player)
})

test('player has name', t => {
	const player = t.context.player
	t.is(player.name, 'Arlene')
})

test('Kill player', t => {
	const player = t.context.player
	player.kill()
	t.true(player.dead)
})

test('Vote', async t => {
	const player = t.context.player
	const votablePlayers = [
		new Player('A'),
		new Player('B'),
		new Player('C'),
		new Player('D'),
		player
	]

	player.on('watingVote', e => {
		t.pass('called watingVote event')
		t.is(e.players.length, 4, 'without myself')
		e.vote(e.players[0])

		t.throws(() => e.vote(e.players[0]))
	})
	t.is(await player.vote(votablePlayers), votablePlayers[0], 'voted 1st player')

})

