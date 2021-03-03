export const fetchRecipes = () => {
  return async (dispatch) => {
    try {
      const responses = await fetch('https://api.spoonacular.com/recipes/complexSearch?diet=vegetarian,vegan&number=20&addRecipeInformation=true&apiKey=fe253a5e03924c7b95e48192dfdc14ac')
      if (responses.ok) {
        const data = await responses.json()
        // console.log(data.results)
        dispatch({
          type: 'FETCH_RECIPES',
          payload: data.results
        })
      } else {
        throw responses
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchRecipe = (recipeId) => {
  return async (dispatch) => {
    try {
      const responses = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=true&apiKey=fe253a5e03924c7b95e48192dfdc14ac`)
      if (responses.ok) {
        const data = await responses.json()
        console.log(data)
        dispatch({
          type: 'FETCH_RECIPE',
          payload: data
        })
      } else {
        throw responses
      }
    } catch (error) {
      console.log(error)
    }
  }
}