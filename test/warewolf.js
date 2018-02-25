import test from 'ava'

import Warewolf from '../lib/warewolf.js'

test('Kill player', async t => {
	const warewolf = new Warewolf('Alpha')
	const villager = {
		kill: () => t.pass()
	}
	warewolf.on('watingKill', e => {
		e.kill(villager)
	})
	await warewolf.action()
})