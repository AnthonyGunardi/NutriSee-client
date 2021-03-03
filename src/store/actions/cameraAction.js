export const setPhotoUri = payload => {
  return dispatch => {
    dispatch({
      type: 'SET_PHOTO_URI',
      payload
    })
  }
}

export const setClarifaiPredictions = payload => {
  return dispatch => {
    dispatch({
      type: 'SET_CLARIFAI_PREDICTIONS',
      payload
    })
  }
}

export const setClarifaiPredictionsSeveralItems = payload => {
  return dispatch => {
    dispatch({
      type: 'SET_CLARIFAI_PREDICTIONS_SEVERAL_ITEMS',
      payload
    })
  }
}

export const cameraData = payload => {
  return dispatch => {
    dispatch({
      type: 'SET_DATA_CAMERA',
      payload
    })
  }
}

export const setIngredients = payload => {
  return dispatch => {
    dispatch({
      type: 'SET_INGREDIENTS',
      payload
    })
  }
}

export const setFood = payload => {
  return dispatch => {
    dispatch({
      type: 'SET_FOOD',
      payload
    })
  }
}
