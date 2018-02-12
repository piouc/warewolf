import Player from './player.js'
import Event from './event.js'

export default class Seer extends Player {
	constructor(){
		super()
	}
	async action(village){
		this.emit('watingDevine', new WatingDevineEvent({village: village}))
	}
	async devine(){

	}
}

class WatingDevineEvent extends Event {
	constructor(options){
		super('watingDevine')
		this.players = option.vilagge.survivalPlayers()
		this.distinguishWarewolf = player => player.warewolf
	}
}