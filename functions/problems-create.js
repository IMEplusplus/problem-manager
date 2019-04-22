/* code from functions/problem-create.js */
import faunadb from 'faunadb' /* Import faunaDB sdk */

/* configure faunaDB Client with our secret */
const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
})

/* export our lambda function as named "handler" export */
exports.handler = async event => {
  /* parse the string body into a useable JS object */
  const data = JSON.parse(event.body)
  console.log("Function `problem-create` invoked", data)
  const problem = {
    data: data
  }
  /* construct the fauna query */
  try{
    const response = await client.query(q.Create(q.Ref("classes/problems"), problem));
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
};