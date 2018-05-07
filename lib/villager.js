import Player from './player.js'
import TYPE from './constants/type.js'

export default class Villager extends Player {
	constructor(name){
		super(name)
	}
	async isWin(village){
		const werewolfCount = village.survivalPlayers.filter(player => player.werewolf)
		return werewolfCount < 1
	}
}