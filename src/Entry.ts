/****** ABOUT ******

Entry

	Author: Tom Lamb, Lambyte.com
	Created: 2007.07.29
	Released: 
	Description: A key-value pair.
	

****** ***** ******/

export class Entry {
  
  constructor (key:any, value:any)
  {
  	this.key = key;
  	this.value = value;
  }

  /******** PROPERTIES ********/

  public key:any;
  public value:any;


  /******** METHODS ********/

  public clone ()
  {
  	return new Entry(this.key.clone(), this.value.clone());
  };

  public toString () : string
  {
  	return this.key+"\t=>\t"+this.value;
  };
  
}