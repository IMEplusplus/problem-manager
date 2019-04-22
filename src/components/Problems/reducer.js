import { FETCH_PROBLEMS } from './constants'

const problems = (state = [], action) => {
  switch (action.type){
    case FETCH_PROBLEMS:
      return action.problems;
    default:
      return state;
  }
}

export default problems