import Player from './player.js'
import Event from './event.js'

import {once} from './utils.js'

export default class Warewolf extends Player {
	constructor(name){
		super(name)
		this.warewolf = true
	}
	async action(village){
		return await new Promise((resolve, reject) => {
			this.emit('watingKill', new WatingKillEvent({village: village}, resolve))
		})
	}
	async judgeWin(village){
		const playerCount = village.survivalPlayers.length
		const warewolfCount = village.survivalPlayers.filter(player => player.warewolf)
		return warewolfCount >= (playerCount / 2)
	}
}

class WatingKillEvent extends Event {
	constructor(options, callback){
		super('watingKill')
		this.kill = player => {
			player.kill()
			callback()
		}
	}
}