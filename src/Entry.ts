/****** ABOUT ******

Entry

	Author: Tom Lamb, Lambyte.com
	Created: 2007.07.29
	Released: 
	Description: A key-value pair.
	

****** ***** ******/

export class Entry {
  
  constructor (key, value)
  {
  	this.key = key;
  	this.value = value;
  }

  /******** PROPERTIES ********/

  public key;
  public value;


  /******** METHODS ********/

  Entry.prototype.clone = function ()
  {
  	return new Entry(this.key.clone(), this.value.clone());
  };

  Entry.prototype.toString = function ()
  {
  	return this.key+"\t=>\t"+this.value;
  };

}