import Player from './player.js'
import TYPE from './constants/type.js'

export default class Seer extends Player {
	constructor(){
		super()
		this.type = TYPE.VILAGGER
	}
	async devine(){

	}
}