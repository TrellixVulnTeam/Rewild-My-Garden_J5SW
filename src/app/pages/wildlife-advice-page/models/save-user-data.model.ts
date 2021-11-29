import { AdviceSave } from "./save-advice.model";

export interface UserDataSave { 
    "type": String,
    "properties": {
      "email": String,
      "savedAdvice": AdviceSave[],
    },
    "geometry": {
      "type": String,
      "coordinates": [ 
          Longitude: Number, 
          Latitude: Number ]
    }
}