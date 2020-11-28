import EventEmitter from 'events'
import Event from './event.js'

export default class Votes extends EventEmitter {
	constructor(voters){
		super()
		this.votes = new Map()
		this.voters = voters
		this.ended = false
	}
	vote(target, voter){
		if(this.ended){
			throw new Error('Vote was ended')
		}
		if(!this.voters.includes(voter)){
			throw new Error('Voter does not have the right to vote.')
		}
		if(this.votes.has(voter)){
			throw new Error('Voter already voted')
		}
		this.votes.set(voter, target)
		this.emit('vote', new VoteEvent())
		if(this.votes.size >= this.voters.length){
			this.end()
		}
	}
	end(){
		this.ended = true
		this.emit('end', this.votes)
	}
}

class VoteEvent extends Event {
	constructor(){
		super('vote')
	}
}