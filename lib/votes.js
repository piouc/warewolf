import EventEmitter from 'events'
import Event from './event.js'

export default class Votes extends EventEmitter {
	constructor(){
		super()
		this.votes = new Map()
	}
	vote(target, voter){
		this.votes.add(voter, target)
		this.emit('vote', new VoteEvent())
	}
}

class VoteEvent extends Event {
	constructor(){
		super('vote')
	}
}