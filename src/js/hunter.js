import Player from './player.js'
import Event from './event.js'

import TYPE from './constants/type.js'

export default class Hunter extends Player {
	constructor(){
		super()
	}
	async action(village){
		const protectedPlayer = await new Promise((resolve, reject) => {
			this.emit('watingProtectPlayer', new WatingProtectPlayerEvent({players: village.players}, player => {
				player.protect = true
				resolve(player)
			}))
		})

		village.addCleanup(() => player.protect = false)
		return
	}
}

class WatingProtectPlayerEvent extends Event {
	constructor(option, callback){
		super('watingProtectPlayer')
		this.players = options.players
		this.protect = player => callback(player)
	}
}