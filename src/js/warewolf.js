import Player from './player.js'
import Event from './event.js'

export default class Vilagger extends Player {
	constructor(){
		super()
		this.wadrewolf = true
	}
	async action(village){

	}
}

class WatingKillEvent extends Event {
	constructor(options){
		super('watingKill')
	}
}