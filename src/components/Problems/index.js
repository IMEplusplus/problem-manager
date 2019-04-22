import React, { useMemo, useEffect } from "react";
import GenericTable from "../GenericTable";
import { connect } from 'react-redux'
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import { fetchProblems } from "./actions";
import * as fetchFunctions from './fetchFunctions'
window.my = fetchFunctions

const convertData = rows => {
  if(!rows) return [];
  return rows.map(row => ({...row, name: createLink(row.name, row.link), tags: createChips(row.tags), key: row.id}))
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

const Problems = (props) => {
  //useEffect(autoRefresh(props.fetchProblems), [])
  useEffect(props.fetchProblems, [])
  const { problems } = props
  return <GenericTable data={useMemo(() => convertData(problems), [problems])} columns={columns} title="Problems" />
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

