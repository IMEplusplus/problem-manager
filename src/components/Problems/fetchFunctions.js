const RETRY_TIME = 1000
export const REFRESH_TIME = 5000

export const createProblem = async (problem) => {
  try {
    let response = await fetch('/.netlify/functions/problems-create', {
      body: JSON.stringify(problem),
      method: 'POST'
    })
    response = await response.json()
    return response.ref['@ref'].id;
  } catch {
    //TODO: improve this, fix what happens when the data is already in the database, probably duplicates
    //Error trying to create the problem
    setTimeout(() => createProblem(problem), RETRY_TIME)
  }
}

export const readAll = async () => {
  try {
    let response = await fetch('/.netlify/functions/problems-read-all')
    response = await response.json()
    response = response.map(row => ({...row.data, id: row.ref['@ref'].id}))

    return response
  } catch {
    return await setTimeout(() => createProblem(), RETRY_TIME)
  }
}

export const updateProblem = async (problemId, data) => {
  try {
    let response = await fetch(`/.netlify/functions/problems-update/${problemId}`, {
      body: JSON.stringify(data),
      method: 'POST'
    })
  } catch {
    setTimeout(() => updateProblem(problemId, data), RETRY_TIME)
  }
}

export const deleteProblems = async (problemIds) => {
  try {
    let response = await fetch(`/.netlify/functions/problems-delete-batch`, {
      body: JSON.stringify({
        ids: problemIds
      }),
      method: 'POST'
    })
  } catch {
    setTimeout(() => deleteProblems(problemIds), RETRY_TIME)
  }
}

