import Player from './player.js'
import Event from './event.js'
import Votes from './votes.js'

import {once} from './utils.js'

const WAREWOLF_VOTES = Symbol('WAREWOLF_VOTES')

export default class Warewolf extends Player {
	constructor(name){
		super(name)
		this.warewolf = true
		this.votesForKill = null
		this.master = false
	}
	async action(village){
		// Find master
		if(!village.context[WAREWOLF_VOTES]){
			village.context[WAREWOLF_VOTES] = new Votes()
		}
		return await new Promise((resolve, reject) => {
			this.emit('watingKill', new WatingKillEvent({target: this, village: village}, () => {
				if(this.master){
					
				}
				resolve()
			}))
		})
	}
	async judgeWin(village){
		const playerCount = village.survivalPlayers.length
		const warewolfCount = village.survivalPlayers.filter(player => player.warewolf)
		return warewolfCount >= (playerCount / 2)
	}
	voteForKill(targetPlayer, voter){
		votesForKill.add(voter, targetPlayer)
	}
}

class WatingKillEvent extends Event {
	constructor(options, callback){
		super('watingKill')
		this.target = options.target
		this.village = options.village
		this.killablePlayers = options.village.players.filter(p => !(p instanceof Warewolf | p === this.target))
		this.kill = once(player => {
			player.kill()
			callback()
		})
	}
}