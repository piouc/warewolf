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
		this.context = null
	}

	get survivalPlayers(){
		return this.players.filter(player => !player.dead)
		this.executedPlayers = []
	}

	async start(){
		await this.next()
		while(this.ended){
			this.next()
		}
		await end()
	}

	async next(){

		if(this.phase === PHASE.DAY){
			this.phase = PHASE.NIGHT
		} else {
			this.day = this.day + 1
			this.phase = PHASE.DAY
		}

		this.context = {}
		this.emit('phaseChange', new PhaseChangeEvent({phase: this.phase, village: this, context: this.context}))
		this.emit('phaseStart', new PhaseStartEvent({phase: this.phase, village: this, context: this.context}))
		this.phase === PHASE.NIGHT ? await this.night() : await this.daytime()
		this.emit('phaseEnded', new PhaseEndedEvent({phase: this.phase, village: this, context: this.context}))
		this.context = null
	}

	async daytime(){
		// Tally votes
		const votes = await Promise.all(this.survivalPlayers.map(player => player.vote(this.survivalPlayers)))
		const mostVotedPlayers = top(count(votes))
		// Execution player
		const toBeExecutedPlayer = mostVotedPlayers[Math.floor(Math.random() * mostVotedPlayers.length)]
		this.executedPlayers.push(toBeExecutedPlayer)
		toBeExecutedPlayer.kill()
	}

	async night(){
		// Execute action each players
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


class PhaseEvent extends Event {
	constructor(type, {phase, village, context}){
		super(type)
		this.phase = phase
		this.village = village
		this.context = context
	}
}

class PhaseChangeEvent extends PhaseEvent{
	constructor(option){
		super('phaseChange', option)
	}
}

class PhaseStartEvent extends PhaseEvent{
	constructor(option){
		super('pahesStart', option)
	}
}

class PhaseEndedEvent extends PhaseEvent{
	constructor(option){
		super('phaseEnded', option)
	}
}

class EndedEvent extends Event{
	constructor(){
		super('ended')
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

