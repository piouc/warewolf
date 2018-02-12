import EventEmitter from 'events'
import Event from './event.js'

// Constants
import PHASE from './constants/phase.js'

export default class Village extends EventEmitter {
	constructor(option){
		super()
		const {players} = option
		this.day = 0
		this.phase = PHASE.NIGHT
		this.players = players

		this.executedPlayers = []
	}

	get survivalPlayers(){
		return this.players.filter(player => !player.dead)
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

		if(await this.detectEndOfTheGame()){
			this.end()
		} else {
			this.next()
		}

	}

	async day(){
		// Tally votes
		const votes = await Promise.all(this.survivalPlayers.map(player => player.vote(this.survivalPlayers)))
		const topVotedPlayers = top(count(votes))

		// Execution player
		this.execute(topVotedPlayers[Math.floor(Math.random() * topVotesPlayers.length)])
	}

	async night(){
		// Execute action each players
		await Promise.all(this.survivalPlayers.map(player => player.action(this)))
	}

	async end(){
		await Promise.all(this.players.map(player => player.end()))
	}



	async detectEndOfTheGame(){

	}


	execute(player){
		this.executedPlayers.push(player)
		player.kill()
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
	for(let [key, value] of map){
		if(res.length < 1){
			res.push(key)
		} else {

		}
	}
}

