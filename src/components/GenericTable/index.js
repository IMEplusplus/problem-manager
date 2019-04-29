import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index';
import Table from '@material-ui/core/Table/index';
import TableBody from '@material-ui/core/TableBody/index';
import TableCell from '@material-ui/core/TableCell/index';
import TablePagination from '@material-ui/core/TablePagination/index';
import TableRow from '@material-ui/core/TableRow/index';
import Paper from '@material-ui/core/Paper/index';
import Checkbox from '@material-ui/core/Checkbox/index';
import EnhancedTableHead from './EnhancedTableHead'
import EnhancedTableToolbar from './EnhancedTableToolbar'
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { Icon } from '@material-ui/core';
import {renderToStaticMarkup} from 'react-dom/server'

function desc(a, b, orderBy) {
  if (b.rawData[orderBy] < a.rawData[orderBy]) {
      return -1;
  }
  if (b.rawData[orderBy] > a.rawData[orderBy]) {
      return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});


class EnhancedTable extends React.Component {
    state = {
        order: 'asc',
        orderBy: 'judge',
        selected: [],
        page: 0,
        rowsPerPage: 5,
        searchValue: '',
    };

    handleEdit = (handleEdit, key) => event => { 
      if(this.props.isEditing) return;
      event.stopPropagation()
      handleEdit(key)
    }

    handleSave = async () =>{
      await this.props.handleSave()
    }
    handleRequestSort = (event, property) => {
      if(this.props.isEditing) return;
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order, orderBy });
    };

    handleSelectAllClick = event => {
      if(this.props.isEditing) return;
        if (event.target.checked) {
            this.setState(state => ({ selected: this.props.data.map(n => n.key) }));
            return;
        }
        this.setState({ selected: [] });
    };

    handleDelete = async () => {
      if(this.props.isEditing) return;
      await this.props.handleDelete(this.state.selected);
      this.setState({ selected: [] });
    }

    handleClick = (event, id) => {
      if(this.props.isEditing) return;
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({ selected: newSelected });
    };

    handleChangePage = (event, page) => {
      if(this.props.isEditing) return;
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
      if(this.props.isEditing) return;
        this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    handleChange = event => {
        this.setState({ searchValue: event.target.value });
    }

    isSearchValid = value => {
        let searchValue = this.state.searchValue;
        if(searchValue === '') return true;
        for (let [key, property] of Object.entries(value)){
            // key added for further features
            let aux = React.isValidElement(property) ? renderToStaticMarkup(property).toString().toLowerCase() : property.toString().toLowerCase();
            let res = aux.match(searchValue.toLowerCase());
            if(res != null) return true;
        }
        return false;
      }

    render() {
        const { classes, columns, data, title, handleEdit, handleSave} = this.props;
        const { order, orderBy, selected, rowsPerPage, page, searchValue } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (
            <Paper className={classes.root}>
                <EnhancedTableToolbar numSelected={selected.length} title={title} handleDelete={this.handleDelete} searchValue = {searchValue} handleChange = {this.handleChange} />
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                            columns={columns}
                        />
                        <TableBody>
                            {  
                                stableSort(data, getSorting(order, orderBy))
                                .filter(this.isSearchValid)
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(n => {
                                    const isSelected = this.isSelected(n.key);
                                    return (
                                        <TableRow
                                            hover
                                            onClick={event => this.handleClick(event, n.key)}
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={n.key}
                                            selected={isSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox checked={isSelected} />
                                            </TableCell>
                                            {columns.map(column => <TableCell key={column.id} align="center">{n[column.id]}</TableCell>)}
                                            <TableCell>
                                                {n.key !== undefined 
                                                ? <IconButton className={classes.button} label="Edit" onClick={this.handleEdit(handleEdit, n.key)}>
                                                    <EditIcon/>
                                                  </IconButton>
                                                : <Button variant="outlined" className={classes.button} onClick={this.handleSave}>
                                                    Save
                                                  </Button>}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                              <TableRow style={{ height: 49 * emptyRows }}>
                                  <TableCell colSpan={columns.length + 2} />
                              </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  backIconButtonProps={{
                      'aria-label': 'Previous Page',
                  }}
                  nextIconButtonProps={{
                      'aria-label': 'Next Page',
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Paper>
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);