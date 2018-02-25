import EventEmitter from 'events'
import Event from './event.js'

// Constants
import PHASE from './constants/phase.js'

export default class Village extends EventEmitter {
	constructor(option){
		super()
		const {players} = option
		this.day = 0
		this.phase = PHASE.DAY
		this.players = players
		this.executedPlayers = []
		this.ended = false
	}

	get survivalPlayers(){
		return this.players.filter(player => !player.dead)
		this.executedPlayers = []
	}

	async start(){
		await this.next()
		while(await this.detectEnd()){
			this.next()
		}
		await end()
	}

	async next(){
		console.log(this.day, this.phase)
		if(this.phase === PHASE.DAY){
			// Forward to night
			this.phase = PHASE.NIGHT
			this.emit('phaseChange', new PhaseChangeEvent(PHASE.NIGHT))
			await this.night()
		} else {
			// Forward to next day
			this.day = this.day + 1
			this.phase = PHASE.DAY
			this.emit('phaseChange', new PhaseChangeEvent(PHASE.DAY))
			await this.daytime()
		}



	}

	async daytime(){
		// Tally votes
		const votes = await Promise.all(this.survivalPlayers.map(player => player.vote(this.survivalPlayers)))
		console.log(top(count(votes)))
		const mostVotedPlayers = top(count(votes))
		// Execution player
		const toBeExecutedPlayer = mostVotedPlayers[Math.floor(Math.random() * mostVotedPlayers.length)]
		this.executedPlayers.push(toBeExecutedPlayer)
		toBeExecutedPlayer.kill()
	}

	async night(){
		// Execute action each players
		console.log('start night')
		await Promise.all(this.survivalPlayers.map(player => player.action(this)))

	}

	async end(){
		await Promise.all(this.players.map(player => player.end()))
		this.ended = true
	}



	async detectEnd(){
		const playerCount = this.survivalPlayers.length
		const warewolfCount = this.survivalPlayers.filter(p => p.warewolf)
		if(warewolfCount >= (playerCount / 2)){
			return true
		}
		if(warewolfCount < 1){
			return true
		}
		return false
	}


	execute(player){
		this.executedPlayers.push(player)
		player.kill()
	}
}

class PhaseChangeEvent extends Event{
	constructor(phase){
		super('phaseChange')
		this.phase = phase
	}
}

function count(array){
	const map = new Map()
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
	const kv = Array.from(map)
	const top = Math.max(...kv.map(([key, value]) => value))
	return kv.filter(([key, value]) => value === top).map(([key, value]) => key)
}

