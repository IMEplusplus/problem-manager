import * as fetchFunctions from './fetchFunctions'
import {FETCH_PROBLEMS} from './constants'

export function fetchProblems() {
  return (dispatch) => {
    fetchFunctions.readAll().then(
      problems => dispatch(fetchProblemsSuccess(problems))
    )
  }
}

export function fetchProblemsSuccess(problems) {
  return {
    type: FETCH_PROBLEMS,
    problems
  };
}