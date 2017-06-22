

/****** ABOUT ******

StateLearner

	Author: Tom Lamb, Lambyte.com
	Created: 2006.07.13
	Released: 
	Description: An object that takes input and stores into history, which it uses to try to predict the next input.
	
	
****** ***** ******/
import { ArrayMap } from './ArrayMap.js';
import { PredictionData } from "./PredictionData.js";
import { StateLine } from "./StateLine.js";


/******** CONSTRUCTOR ********/

export class StateLearner {

	constructor (recall)
	{
		this.recall = recall || Infinity;
		this._stateLine = new StateLine();
	}


	/******** PROPERTIES ********/

	//Maximum length for a sequence of states to be stored or retrieved
	public recall:number;
	//This state learner's state line
	private _stateLine:StateLine;


	/******** METHODS ********/

	public append (state)
	{
		this._stateLine.add(state);

		return;
	}

	public makePrediction ():PredictionData
	{
		//???: potentials should really be a set, but I just don't have one made yet. But isn't an array sufficient, even better? I'm pretty sure that direct access to an element of an array would be faster than a getter method on a set object by orders of magnitude.

		var historyFragment = this._stateLine.history.slice(0);
		//we know we won't be able to find any states that have come after the entire history, start with the second-longest history by removing the most distant state
		historyFragment.shift();
		//only search for as much history as this instance can recall. Since the state that is potentially to be found in incidence is counted when counting recall capacity, history fragment can only be recall-1
		while (historyFragment.length > this.recall-1)
		{
			historyFragment.shift();
		}
		
		var potentials = new Array();

		let matchLength : number;
		let states : Array<any>;

		while (historyFragment.length >= 0)
		{
			//at the end of each round, if there is only one potential state, that means that all other potential states have been eliminated in previous iterations, so we return that. As a result, if at the beginning of an iteration, potentials is non-empty, that means that there must have been more than one left at the end of the last iteration. When there is more than one left, that means there was a tie at the end of the last iteration, so we settle that by finding a maximum among potentials in the incidence of this iteration. If potentials is empty, however, we fill it with the maxima of incidence. If we fill potentials with all of incidence when it is empty, we can use the same algorithm when potentials is empty as when it is non-empty.
			var incidence = this._stateLine.incidenceFollowing(historyFragment);

			if (potentials.length == 0)
			{
				incidence.forEach(function (value, key) {
					potentials.push(key);
				});
				
				if (potentials.length >= 1) matchLength = historyFragment.length;
			}
			var max = 0;
			var newPotentials = new Array();
			for (var i = 0; i <= potentials.length-1; i++)
			{
				var currentState = potentials[i];
				var stateCount = incidence.get(currentState);
				if (stateCount > max)
				{
					max = stateCount;
					newPotentials = new Array();
					newPotentials.push(currentState);
				}
				else if (stateCount == max)
				{
					newPotentials.push(currentState);
				}
			}
			potentials = newPotentials;

			if (potentials.length == 1)
			{
				return new PredictionData(matchLength, potentials);
			}
			else if (historyFragment.length == 0)
			{
				if (potentials.length == 0)
				{
					//because all history including null history has been checked for a match and potentials is still empty, we can infer that there was never any input to begin with.
					return undefined;
				}
				else
				{
					//since there hasn't been a solitary maximum found at any level of detail, and the list of potentials is non-empty, we know that there must be a tie between two or more states. By returning the potentials array, the user can choose what to do with the all the relevant information available.
					return new PredictionData(matchLength, potentials);
				}
			}
			
			historyFragment.shift();
		}
		
		//recall is 0, so it's impossible to predict anything
		return undefined;
	}
}