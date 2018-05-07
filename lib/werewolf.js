import Player from './player.js'
import Event from './event.js'
import Votes from './votes.js'

import {once, count, top} from './utils.js'

const WAREWOLF_VOTES = Symbol('WAREWOLF_VOTES')

export default class Werewolf extends Player {
	constructor(name){
		super(name)
		this.werewolf = true
		this.votesForKill = null
		this.master = false
	}
	async action(village){
		let v = null
		if(!village.context[WAREWOLF_VOTES]){
			v = new Promise((resolve, reject) => {
				const votes = new Votes(filterSurvivalWerewolves(village))
				votes.on('end', res => {
					randomPop(top(count(res.values()))).kill()
					resolve()
				})
				village.context[WAREWOLF_VOTES] = votes
			})
		}
		await new Promise((resolve, reject) => {
			this.emit('watingKill', new WatingKillEvent({target: this, village: village}, () => {
				resolve()
			}))
		})
		await v
	}
	async isWin(village){
		const playerCount = village.survivalPlayers.length
		const werewolfCount = village.survivalPlayers.filter(player => player.werewolf)
		return werewolfCount >= (playerCount / 2)
	}
	voteForKill(targetPlayer, voter){
		votesForKill.add(voter, targetPlayer)
	}
}

function filterSurvivalWerewolves(village){
	return village.survivalPlayers.filter(player => player instanceof Werewolf)
}

function randomPop(arr){
	return arr[Math.floor(Math.random() * arr.length)]
}

class WatingKillEvent extends Event {
	constructor(options, callback){
		super('watingKill')
		this.target = options.target
		this.village = options.village
		this.killablePlayers = options.village.players.filter(p => !(p instanceof Werewolf | p === this.target))
		this.kill = once(player => {
			this.village.context[WAREWOLF_VOTES].vote(player, this.target)
			callback()
		})
	}
}