import EventEmitter from 'events'
import Event from './event.js'

// Constants
import PHASE from './constants/phase.js'

export class Village extends EventEmitter {
	constructor(opt){
		super()
		const {players} = opt
		this.day = 0
		this.phase = PHASE.NIGHT
		this.players = players
	}
	async next(){
		if(this.pahes === PHASE.DAY){
			// Forward to night
			this.phase = PHASE.NIGHT
			await this.night()
		} else {
			// Forward to next day
			this.day = this.day + 1
			this.phase = PHASE.DAY
			await this.day()
		}

	}
	async day(){
		// Tally votes
		const votes = await Promise.all(this.survivalPlayers.map(player => player.vote(this.survivalPlayers)))
		const topVotesPlayers = top(count(votes))

		// Execution player
		topVotesPlayers[Math.floor(Math.random() * topVotesPlayers.length)].kill()

		return
	}
	async night(){
		// Execute action each players
		await Promise.all(this.survivalPlayers.map(player => player.action(this)))
		return
	}

	async detectEndOfTheGame(){

	}

	get survivalPlayers(){
		return this.players.filter(player => !player.dead)
	}
}

function count(array){
	const map = new Map
	for(let entry of array){
		if(map.has(entry)){
			map.set(entry, map.get(entry) + 1)
		} else {
			map.set(entry, 1)
		}
	}
	return map
}

function top(map){
	const res = []
	for(let [key, value] of){
		if(res.length < 1){
			res.push(key)
		} else {

		}
	}
}

