import faunadb from 'faunadb'

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
})

exports.handler = async event => {
  const data = JSON.parse(event.body)
  console.log('data', data)
  console.log('Function `problem-delete-batch` invoked', data.ids)
  // construct batch query from IDs
  const deleteAllCompletedProblemQuery = data.ids.map(id =>
    q.Delete(q.Ref(`classes/problems/${id}`)))

  try{
    let response = await client.query(deleteAllCompletedProblemQuery)
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch(event) {
    return {
      statusCode: 400,
      body: JSON.stringify(event)
    }
  }
}