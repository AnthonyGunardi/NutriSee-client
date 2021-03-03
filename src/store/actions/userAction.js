import AsyncStorage from '@react-native-async-storage/async-storage'

export const signIn = (data) => {
  return async (dispatch) => {
    // wiring backend fetch post
    try {
      // ganti url dengan wifi IP. cek IP di command prompt - ipconfig
      const response = await fetch('https://nutrisee-server.herokuapp.com/login', 
      { 
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password
        })
      })
      let result = await response.json()
      await AsyncStorage.setItem('access_token', result.access_token)
      let res = await AsyncStorage.getItem('access_token')
      // console.log(res, "ini access_token")
      const userData = await fetch(`https://nutrisee-server.herokuapp.com/users/${result._id}`, {
        method: 'GET',
        headers: {
          'access_token': result.access_token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      let userOutput = await userData.json()
      // console.log(userOutput.data, "dari userAction")
      dispatch({
        type: 'SIGN_IN',
        payload: userOutput.data
      })
    }
    catch(err) {
      console.log(err)
    }
  }
}

export const signOut = () => {
  return async (dispatch) => {
    await AsyncStorage.clear()
    dispatch({
      type: 'SIGN_OUT'
    })
  }
}

export const register = (data) => {
  console.log(data, "ini dari action")
  return async(dispatch) => {
    try {
      const response = await fetch('https://nutrisee-server.herokuapp.com/register', 
      { 
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
    }
    catch(err) {
      console.log(err)
    }
  }
}

export const setProfile = (data) => {
  
  return async(dispatch) => {
    dispatch({
      type: 'SET_PROFILE',
      payload: data
    })
  }
}

export const updateProfile = (data) => {
  // console.log(data, "ini dari update")
  return async(dispatch) => {
    try {
      const access_token = await AsyncStorage.getItem('access_token')
      const userData = await fetch(`https://nutrisee-server.herokuapp.com/users/${data.id}`, {
        method: 'GET',
        headers: {
          'access_token': access_token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      let output = await userData.json()
      console.log(output, "userData")
           
      const this_year = new Date().getFullYear()
      const age = new Date(output.data.birthday).getFullYear() - this_year
      const bmr = 10 * output.data.bodystats.weight + 6.25 * output.data.bodystats.height - 5 * +age
      if(output.data.gender === 'female'){
        bmr + 161
      } else {
        bmr + 5
      }
      console.log(bmr)

      const response = await fetch(`https://nutrisee-server.herokuapp.com/users/${data.id}`, 
        { 
          method: 'PUT',
          headers: {
            'access_token': access_token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            bmr: bmr,
            bodystats:{
              weight: data.weight,
              height: data.height
            }
        })
      })
      let result = await response.json()
      dispatch({
        type: 'EDIT_PROFILE',
        payload: result
      })
    }
    catch(err) {
      console.log(err)
    }
  }
}