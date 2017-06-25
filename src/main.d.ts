declare class PredictionData {
    constructor (matchLength:number, states:Array) 
}

declare class StateLearner {
  constructor ();

  recall:number;
  
  append(state:any);
  makePrediction():PredictionData?;
}