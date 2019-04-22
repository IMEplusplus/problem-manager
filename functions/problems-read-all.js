/* code from functions/problems-read-all.js */
import faunadb from 'faunadb'

const q = faunadb.query
const client = new faunadb.Client({
  secret: "fnADMda2C8ACB0ghMMbtb2q5QbIhIgp0hDZBCb2O",
})

exports.handler = async event => {
  try {
    console.log("Function `problem-read-all` invoked")
    const response = await client.query(q.Paginate(q.Match(q.Ref("indexes/all_problems"))))

    const problemRefs = response.data
    console.log("Todo refs", problemRefs)
    console.log(`${problemRefs.length} problems found`)
    // create new query out of problem refs. http://bit.ly/2LG3MLg
    const getAllTodoDataQuery = problemRefs.map((ref) => {
      return q.Get(ref)
    })
    // then query the refs
    const ret = await client.query(getAllTodoDataQuery)

    return {
      statusCode: 200,
      body: JSON.stringify(ret)
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(error)
    }
  }
}