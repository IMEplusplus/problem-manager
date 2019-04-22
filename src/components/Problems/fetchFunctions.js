const RETRY_TIME = 1000
const RETRY_LIMIT = 1
export const REFRESH_TIME = 5000

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const fetchRetry = async fetchFunction => {
  for (let i = 0; i < RETRY_LIMIT; i++) {
    try {
      return await fetchFunction();
    } catch (err) {
      const isLastAttempt = i + 1 === RETRY_LIMIT;
      if (isLastAttempt) return undefined;
    }
    await sleep(RETRY_TIME)
  }
};

export const createProblem = async (problem) => {
  return fetchRetry(async () => {
    let response = await fetch('/.netlify/functions/problems-create', {
      body: JSON.stringify(problem),
      method: 'POST'
    })
    response = await response.json()
    return response.ref['@ref'].id
  })
}

export const readAll = async () => {
  return fetchRetry(async () => {
    let response = await fetch('/.netlify/functions/problems-read-all')
    response = await response.json()
    response = response.map(row => ({...row.data, id: row.ref['@ref'].id}))

    return response
  })
}

export const updateProblem = async (problemId, data) => {
  return fetchRetry(async () => {
    await fetch(`/.netlify/functions/problems-update/${problemId}`, {
      body: JSON.stringify(data),
      method: 'POST'
    })
  })
}

export const deleteProblems = async (problemIds) => {
  return fetchRetry(async () => {
    await fetch(`/.netlify/functions/problems-delete-batch`, {
      body: JSON.stringify({
        ids: problemIds
      }),
      method: 'POST'
    })
  })
}

