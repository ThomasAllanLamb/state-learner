declare namespace StateLearner {
  
  class PredictionData {
    constructor (matchLength:number, states:Array) 
  }

  class StateLearner {
    constructor ();

    recall:number;
    
    append(state:any);
    makePrediction():PredictionData;
  }

}