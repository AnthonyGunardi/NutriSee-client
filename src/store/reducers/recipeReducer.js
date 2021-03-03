const initialState = {
  recipes: [],
  recipe: ''
}

export default (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case 'FETCH_RECIPES':
      return {
        ...state,
        recipes: payload
      }
    case 'FETCH_RECIPE':
      return {
        ...state,
        recipe: payload
      }
    default:
      return state
  }
}