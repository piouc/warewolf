import test from 'ava'

import {once} from '../lib/utils.js'

test('once', t => {
	let counter = 0
	const fn = once(() => {
		counter++
		return true
	})
	t.true(fn())
	t.is(counter, 1)
	t.throws(fn)
})