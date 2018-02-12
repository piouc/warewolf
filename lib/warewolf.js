import Player from './player.js'
import Event from './event.js'

export default class Vilagger extends Player {
	constructor(){
		super()
		this.warewolf = true
	}
	async action(village){
		this.emit('watingKill', new WatingKillEvent({village: village}))
	}
	async judgeWin(village){
		const playerCount = village.survivalPlayers.length
		const warewolfCount = village.survivalPlayers.filter(player => player.warewolf)
		return warewolfCount >= (playerCount / 2)
	}
}

class WatingKillEvent extends Event {
	constructor(options){
		super('watingKill')
		this.kill = player => player.kill()
	}
}