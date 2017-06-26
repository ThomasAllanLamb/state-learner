/****** ABOUT ******

StateLine

	Author: Tom Lamb, Lambyte.com
	Created: 2007.08.25
	Released: 
	Description: An object that stores a sequence of states and can return the incidence of which states follow given state sequences.
	
	

****** ***** ******/

import { ArrayMap } from "./ArrayMap";
import { IncidenceMap } from "./IncidenceMap";

export class StateLine<State>
{
	/******** CONSTRUCTOR ********/

	constructor ()
	{
		this.history = new Array<State>();
		this._ledger = new ArrayMap<State, IncidenceMap<State, number>>();
	}


	/******** PROPERTIES ********/

	//Structure of history: history[n] = input of the nth turn*/
	public history:Array<State>;
	//Structure of ledger: ledger.get(history fragment) => incidence.get(state N) = number of times that state N occurs after the given "history fragment"
	private _ledger:ArrayMap<State, IncidenceMap<State, number>>;


	/******** METHODS ********/

	public add (state:State):State
	{
		//start with clone of entire history
		var historyFragment = this.history.slice(0);
		
		//???: each iteration removes an element from historyFragment. exit condition is when historyFragment is empty. Can the loop be refactored to make this clearer?
		while (true)
		{
			//increment the incidence count for the number of times that "historyFragment" has preceded "state"
			var incidence = this._ledger.get(historyFragment);
			
			if (incidence == undefined)
			{
				//this history fragment has not occurred yet, so create a new incidence map
				var newIncidence = new IncidenceMap();
				newIncidence.set(state, 1);
				//NOTE: We have to clone historyFragment, because we are creating a new entry in the map. If it were left uncloned, we might modify the array being used for the purposes of this loop, and at the same time modify the array being used as an index in the map.
				this._ledger.set(historyFragment.slice(0), newIncidence);
			}
			else
			{
				incidence.increment(state);
				//incidence is an object, and therefore a reference, so we don't need to call ledger.set(historyFragment, incidence)
			}
			
			if (historyFragment.length == 0)
			{
				this.history.push(state);
				return state;
			}
			historyFragment.shift();
		}
	}

	public incidenceFollowing (sequence):IncidenceMap<State, number>
	{
		//NOTE: sequence should be an array
		var incidence = this._ledger.get(sequence);
		if (incidence == undefined)
		{
			return new IncidenceMap<State, number>();
		}
		else
		{
			return incidence;
		}
	}
}