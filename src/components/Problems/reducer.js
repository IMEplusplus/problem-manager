import { FETCH_PROBLEMS } from './constants'

const problems = (state = [], action) => {
  if(!action.problems) return state;

  switch (action.type){
    case FETCH_PROBLEMS:
      return action.problems;
    default:
      return state;
  }
}

export default problems