import Player from './player.js'
import TYPE from './constants/type.js'

export default class Villager extends Player {
	constructor(name){
		super(name)
	}
	async judgeWin(village){
		const warewolfCount = village.survivalPlayers.filter(player => player.warewolf)
		return warewolfCount < 1
	}
}