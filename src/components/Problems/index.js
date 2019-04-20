import React from 'react';
import GenericTable from '../GenericTable'

const createDatum = (rawData) => {
  const datum = [];
  columns.forEach((column, i) => datum[column.id] = rawData[i]);
  datum.key = createDatum.idCounter++;

  return datum;
};
createDatum.idCounter = 0;

const columns = [
  { id: 'judge', numeric: false, label: 'Judge' },
  { id: 'id', numeric: false, label: 'Id' },
  { id: 'name', numeric: false, label: 'Name' },
  { id: 'difficulty', numeric: true, label: 'Difficulty' },
  { id: 'description', numeric: false, label: 'Description' },
  { id: 'tags', numeric: false, label: 'tags' },
  { id: 'solution', numeric: false, label: 'Solution' },
  { id: 'link', numeric: false, label: 'Problem Link' },
];

const createLink = (link, label = 'Link') => <a target="_blank" rel="noopener noreferrer" href={link}>{label}</a>;

const data = [
  createDatum(['CodeForces', '203C', 'Adda and the array2', 4, 'HW2', 'Binary Search', 'asdfdf', createLink('https://google.com')]),
  createDatum(['CodeForces', '203B', 'Adda and the array', 4, 'HW2', 'Prefix sum; Bit; SegmentTree', 'asdfdf', 'asdfasdf']),
  createDatum(['CodeForces', '203D', 'Adda and the array3', 4, 'HW3', 'Prefix sum; Bit; SegmentTree', 'asdfdf', 'asdfasdf']),
  createDatum(['CodeForces', '203E', 'Adda and the array4', 4, 'HW5', 'Prefix sum; Bit; SegmentTree', 'asdfdf', 'asdfasdf']),
  createDatum(['CodeForces', '203E', 'Adda and the array4', 4, 'HW5', 'Prefix sum; Bit; SegmentTree', 'asdfdf', 'asdfasdf']),
  createDatum(['CodeForces', '203E', 'Adda and the array4', 4, 'HW5', 'Prefix sum; Bit; SegmentTree', 'asdfdf', 'asdfasdf']),
];

export default () => (
  <GenericTable data={data} columns={columns} title="Problems"/>
);
