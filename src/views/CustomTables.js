import React from 'react'
import { useTable, usePagination } from 'react-table'

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import { PencilSquare, XSquare } from 'react-bootstrap-icons'

import { NavLink } from "react-router-dom";

import {
    Table,
    Button
} from "reactstrap";



function CustomTable({ columns, data, edit, remove, paginationSize, onEdit, onDelete }) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page

        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        state: { pageIndex },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: paginationSize ?? 10 },
        },
        usePagination
    )

    const deleteService = (index) => {
        var dataToRemove = data[index];
        if(onDelete){
            onDelete(dataToRemove);
        }
    };


    const handleOnClick = (row) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Do you want to permanently delete? This action cannot be undone.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () =>  deleteService(row.index)
                },
                {
                    label: 'No',
                }
            ]
        });
    };

    const GetEditColumn = (row) => {
        if (!edit && !remove) {
            return;

        }

        return <td>
            <Button
                onClick={() => handleOnClick(row)}
                hidden={!remove}
                className="btn-link btn-danger"
                color="primary">
                <XSquare />
            </Button>
            <NavLink
                to={"/admin/updateLearning?operation=" + JSON.stringify(data[row.index].Operation)}>

                <Button
                    hidden={!edit}
                    onClick={() => gotoPage(0)}
                    className="btn-link btn-warn"
                    color="primary">
                    <PencilSquare />
                </Button>

            </NavLink>


        </td>;
    }

    // Render the UI for your table
    return (
        <>

            <Table responsive {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}

                                { GetEditColumn(row)}

                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <div>
                <div style={{ textAlign: "left" }}>
                    <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                        {'<<'}
                    </Button>
                    <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
                        {'<'}
                    </Button>
                    <Button onClick={() => nextPage()} disabled={!canNextPage}>
                        {'>'}
                    </Button>
                    <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                        {'>>'}
                    </Button>
                    <label style={{ paddingLeft: 30 }}> Go to page:{' '}</label>
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(page)
                        }}
                        style={{ width: '100px', paddingLeft: 10 }}
                    />
                </div>
                <div style={{ textAlign: "right" }}>
                    <label>Page{' '}<strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{'  '}</label>


                </div>
            </div>

            <div className="pagination">
                {' '}

            </div>
        </>
    )
}

export default CustomTable;