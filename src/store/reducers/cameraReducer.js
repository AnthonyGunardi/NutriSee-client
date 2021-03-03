const initialState = {
  clarifaiPredictions: '',
  clarifaiPredictionsSeveralItems: '',
  photoURI: '',
  cameraData: [],

  // new
  ingredients: [],
  food: ''
}

export default (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case 'SET_INGREDIENTS':
      return {
        ...state,
        ingredients: payload
      }
    case 'SET_FOOD':
      return {
        ...state,
        food: payload
      }
    case 'SET_PHOTO_URI':
      return {
        ...state,
        photoURI: payload
      }
    case 'SET_CLARIFAI_PREDICTIONS':
      return {
        ...state,
        clarifaiPredictions: payload
      }
    case 'SET_CLARIFAI_PREDICTIONS_SEVERAL_ITEMS':
      return {
        ...state,
        clarifaiPredictionsSeveralItems: payload
      }
    case 'SET_DATA_CAMERA':
      return {
        ...state,
        cameraData: payload
      }
    default:
      return state
  }
}
