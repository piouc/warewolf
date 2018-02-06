import EventEmitter from 'events'
import Event from './event.js'

export default class Player {
	constructor(){
		this.warewolf = false
		this.dead = false
	}
	async action(){
		return
	}
	async vote(players){
		return new Promise((resolve, reject) => {
			this.emit('watingVote', new WatingVoteEvent({players: players}, resolve))
		}
	}
	kill(){
		this.dead = true
		this.emit('die', new DieEvent())
	}
}

class WatingVoteEvent extends Event {
	constructor(options, callback){
		super('watingVote')
		this.players = options.players
		this.vote = player => callback(player)
	}
}

class DieEvent extends Event {
	constructor(options){
		super('die')
	}
}

function once(fn){
	let i = 0
	return (...args) => {
		if(i < 1) {
			i++
			return fn(...args)
		} else {
			throw new Error('This function executable once only')
		}
	}
}