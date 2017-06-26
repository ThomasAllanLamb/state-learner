/****** ABOUT ******

IncidenceMap

	Author: Tom Lamb, Lambyte.com
	Created: 2007.08.27
	Released: 
	Description: An object which stores the number of times that a value is encountered. The difference between this and a plain map is that .get(index) returns 0 when no entry with that key exists, and this object adds the .increment(key, [times]) function which increments the count of the key the given number of times, or once if times is undefined.
	

****** ***** ******/

//try using native Map	
//const Map = require("./Map.js");


/******* CONSTRUCTOR *******/

export class IncidenceMap<K, V> {

	constructor () {
		this._map = new Map();
		this.size = 0;
	}


	/******* PROPERTIES *******/

	private _map;
	public size;


	/******* METHODS *******/

	public increment (key, times=1)
	{
		var count = this.set(key, this.get(key)+times);
		return count;
	}

	public addMap (incidence)
	{
		var result = new IncidenceMap();
		
		function count (entry)
		{
			result.increment(entry.key, entry.value);
		}
		
		this.forEach(count);
		incidence.forEach(count);
		
		return result;
	}

	public getMaxima ()
	{
		var maxima = new Array();
		var maxCount = 0;
		this.forEach(function (entry)
			{
				if (entry.value > maxCount)
				{
					maxima = new Array();
					maxima.push(entry.key);
					maxCount = entry.value;
				}
				else if (entry.value == maxCount)
				{
					maxima.push(entry.key);
				}
			});
		return maxima;
	}

	public get (index)
	{
		var count = this._map.get(index);
		if (count == undefined)
		{
			count = 0;
		}
		
		return count;
	}

	public set (indexName, newValue)
	{
		this._map.set(indexName, newValue);
		this.size = this._map.size;
		return newValue;
	}

	public contains (indexName)
	{
		return this._map.contains(indexName);
	}

	public forEach (f)
	{
		this._map.forEach(f);
	}

	public clone ()
	{
		var emptyMap = new IncidenceMap();
		var spawn = emptyMap.addMap(this._map.clone());
		
		return spawn;
	}

	public toString ()
	{
		return this._map.toString();
	}
}