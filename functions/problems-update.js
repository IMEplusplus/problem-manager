import faunadb from 'faunadb'

function getId(urlPath) {
  return urlPath.match(/([^\/]*)\/*$/)[0]
}

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
})

exports.handler = async event => {
  const data = JSON.parse(event.body)
  const id = getId(event.path)
  console.log(`Function 'problem-update' invoked. update id: ${id}`)

  try{
    let response = await client.query(q.Update(q.Ref(`classes/problems/${id}`), {data}))
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