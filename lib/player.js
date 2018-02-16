import EventEmitter from 'events'
import Event from './event.js'

export default class Player extends EventEmitter {
	constructor(name){
		super()
		this.name = name
		this.warewolf = false
		this.dead = false
		this.win = Promise.resolve(null)
	}

	async action(){
		return
	}

	async vote(players){
		return await new Promise((resolve, reject) => {
			// Without myself
			console.log()
			this.emit('watingVote', new WatingVoteEvent({players: players.filter(p => p !== this)}, resolve))
		})
	}

	async judgeWin(village){
		return false
	}

	async end(village){
		this.win = this.isWin(village)
		this.emit('end', new EndEvent())
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
		this.vote = once(player => callback(player))
	}
}

class DieEvent extends Event {
	constructor(options){
		super('die')
	}
}

class EndEvent extends Event {
	constructor(options){
		super('end')
	}
}

function once(fn){
	let executed = false
	return (...args) => {
		if(executed) {
			throw new Error('This function called once only')
		} else {
			executed = true
			return fn(...args)
		}
	}
}