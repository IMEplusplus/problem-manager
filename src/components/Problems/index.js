import React, { useMemo, useEffect, useState } from "react";
import GenericTable from "../GenericTable";
import { connect } from 'react-redux'
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import { fetchProblems } from "./actions";
import * as fetchFunctions from './fetchFunctions'
import TextField from '@material-ui/core/TextField';
window.my = fetchFunctions

const convertData = (rows, isEditing, setEditingRow, editingRow, handleChangeEdit) => {
  if(!rows) return [];

  return rows.map(row => {
    if(isEditing !== row.id){
      return {...row, name: createLink(row.name, row.link), tags: createChips(row.tags), key: row.id, rawData:row}
    }
    else{
      return {...row, name: <TextField id="standard-name" label="Name" value = {editingRow.name} style={{width:175}} multiline onChange={(event) => handleChangeEdit("name", event)} />, 
        judge: <TextField id="standard-name" label="Judge" value = {editingRow.judge} onChange={(event) => handleChangeEdit("judge", event)}/>,
        difficulty: <TextField id="standard-name" label="Difficulty" value = {editingRow.difficulty} onChange={(event) => handleChangeEdit("difficulty", event)}/>,
        problemId: <TextField id="standard-name" label="ID" value = {editingRow.problemId} onChange={(event) => handleChangeEdit("problemId", event)}/>,
        description: <TextField id="standard-name" label="Description" value = {editingRow.description} onChange={(event) => handleChangeEdit("description", event)}/>,
        tags: <TextField id="standard-name" label="Tags" value = {editingRow.tags} multiline onChange={(event) => handleChangeEdit("tags", event)}/>,
        solution: <TextField id="standard-name" label="Solution" value = {editingRow.solution} onChange={(event) => handleChangeEdit("solution", event)}/>,
        rawData:row
      }
    }
  }
  );
};

const columns = [
  { id: "judge", label: "Judge" },
  { id: "problemId", label: "Id" },
  { id: "name", label: "Name" },
  { id: "difficulty", label: "Difficulty" },
  { id: "description", label: "Description" },
  { id: "tags", label: "tags" },
  { id: "solution", label: "Solution" }
];

const createLink = (label, link) => (
  <Typography>
    {link ? (
      <Link
        target="_blank"
        color="secondary"
        rel="noopener noreferrer"
        href={link}
      >
        {label}
      </Link>
    ) :
    label
    }
  </Typography>
);

const style = {
  background: 'FF8C00',
  borderRadius: 10,
  border: 0,
  color: 'white',
  height: 20,
  padding: '0 0px',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
};

const createChips = tags => (
  <div>
    {tags.map(tag => (
      <Chip className="mb1 mr1" style={style} label={tag} color="secondary" key={tag} />
    ))}
  </div>
);

/*
Disabled to decrease internet traffic

const autoRefresh = fetchProblems => () => {
  fetchProblems()
  const refreshTimer = setTimeout(autoRefresh(fetchProblems), fetchFunctions.REFRESH_TIME)
  return () => clearTimeout(refreshTimer)
}
 */
const handleDelete = fetchProblems => async selected => {
  await fetchFunctions.deleteProblems(selected)
  await fetchProblems()
}

const Problems = (props) => {
  //useEffect(autoRefresh(props.fetchProblems), [])
  useEffect(props.fetchProblems, [])
  const [isEditing, setIsEditing]=useState(null);
  const [editingRow, setEditingRow] = useState({})
  const { problems } = props

  const handleEdit = key => {
    problems.forEach(problem => {
      if(problem.id === key){
        problem.name = problem.name + ", " + problem.link
        setEditingRow(problem);
      }
    })
    setIsEditing(key);
  }

  const handleChangeEdit = (category, event) =>{
    let nature={};
    nature = {...editingRow}
    nature[category]=event.target.value;
    nature.link = "";
    setEditingRow(nature)
    }

  const handleSave = fetchProblems => async () =>{
    const nameAndLink = editingRow.name.split(", ")
    editingRow.name = nameAndLink[0]
    editingRow.link = nameAndLink[1]
    if(typeof(editingRow.tags) === "string") editingRow.tags = editingRow.tags.split(",")
    await fetchFunctions.updateProblem(isEditing, editingRow)
    await fetchProblems()
    setIsEditing(null)
   }

  return <GenericTable
    data={useMemo(() => convertData(problems, isEditing, setEditingRow, editingRow, handleChangeEdit), [problems, isEditing, editingRow])}
    columns={columns} title="Problems"
    handleDelete={handleDelete(props.fetchProblems)}
    handleEdit={handleEdit}
    isEditing={isEditing}
    handleSave={handleSave(props.fetchProblems)}
  />
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProblems: () => dispatch(fetchProblems())
  }
};

const mapStateToProps = (state) => {
  return { problems : state.problems }
};

export default connect(mapStateToProps, mapDispatchToProps)(Problems);

