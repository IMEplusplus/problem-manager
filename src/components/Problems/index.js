import React from "react";
import GenericTable from "../GenericTable";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import { create } from "jss";

const createDatum = rawData => {
  const datum = [];
  columns.forEach((column, i) => (datum[column.id] = rawData[i]));
  datum.key = createDatum.idCounter++;

  return datum;
};
createDatum.idCounter = 0;

const columns = [
  { id: "judge", label: "Judge" },
  { id: "id", label: "Id" },
  { id: "name", label: "Name" },
  { id: "difficulty", label: "Difficulty" },
  { id: "description", label: "Description" },
  { id: "tags", label: "tags" },
  { id: "solution", label: "Solution" }
];

const createLink = (link, label = "Link") => (
  <Typography>
    <Link
      target="_blank"
      color="secondary"
      rel="noopener noreferrer"
      href={link}
    >
      {label}
    </Link>
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

const data = [
  createDatum([
    "CodeForces",
    "203C",
    createLink("https://google.com", "Adda and the array2"),
    4,
    "HW2",
    createChips(["Binary Search"]),
    "asdfdf"
  ]),
  createDatum([
    "CodeForces",
    "203B",
    "Adda and the array",
    4,
    "HW2",
    createChips(["Prefix sum", "Bit", "SegmentTree"]),
    "asdfdf",
    "asdfasdf"
  ]),
  createDatum([
    "CodeForces",
    "203D",
    "Adda and the array3",
    4,
    "HW3",
    createChips(["Prefix sum", "Bit", "SegmentTree"]),
    "asdfdf",
    "asdfasdf"
  ]),
  createDatum([
    "CodeForces",
    "203E",
    "Adda and the array4",
    4,
    "HW5",
    createChips(["Prefix sum", "Bit", "SegmentTree"]),
    "asdfdf",
    "asdfasdf"
  ]),
  createDatum([
    "CodeForces",
    "203E",
    "Adda and the array4",
    4,
    "HW5",
    createChips(["Prefix sum", "Bit", "SegmentTree"]),
    "asdfdf",
    "asdfasdf"
  ]),
  createDatum([
    "CodeForces",
    "203E",
    "Adda and the array4",
    4,
    "HW5",
    createChips(["Prefix sum", "Bit", "SegmentTree"]),
    "asdfdf",
    "asdfasdf"
  ])
];

export default () => (
  <GenericTable data={data} columns={columns} title="Problems" />
);
