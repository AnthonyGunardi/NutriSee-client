const initialState = {
  isLoggedIn: false,
  userData: {},
  userPhoto: ''
}

export default (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case 'SIGN_IN':
      return {
        ...state,
        userData: payload,
        isLoggedIn: true
      }
    case 'SIGN_OUT':
      return {
        ...state,
        userData: '',
        isLoggedIn: false
      }
    case 'SET_PROFILE':
      return {
        ...state,
        userPhoto: payload
      }
    case 'EDIT_PROFILE':
      return {
        ...state,
        userData: payload,
        isLoggedIn: true
      }
    default:
      return state
  }
}