import React from 'react';
import "./AsyncTable.css"
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { DataGrid } from '@mui/x-data-grid';
import ChevronUpIcon from '../icons/ChevronUpIcon';
import ChevronDownIcon from '../icons/ChevronDownIcon';
import { useDarkMode } from '../../utils/DarkModeContext';
const CollapsibleTable = ({ rows, loading, columns, tableAction, hideCollapsible = () => false,
    getCollabsibleTableRow = (param) => (param?.data ?? []), collabsibleTableColumns = [] }) => {
    const Row = ({ data }) => {
        const [open, setOpen] = React.useState(false);
        const { darkMode } = useDarkMode()
        return (
            <>
                <TableRow sx={{
                    '& > *': {
                        borderBottom: 'unset',
                        backgroundColor: darkMode ? "#40679E" : "",
                        color: darkMode ? "white" : "",
                    }
                }}>
                    <TableCell align='center' sx={{ padding: "0px 8px",  }}>
                        {!hideCollapsible({ row: data }) && (
                            <IconButton size="small" onClick={() => setOpen(!open)}>
                                {open ? (
                                    <ChevronUpIcon/>
                                ) : (
                                    <ChevronDownIcon/>
                                )}
                            </IconButton>
                        )}
                    </TableCell>
                    {columns?.map((col, i) => (
                        <TableCell key={i} align={col?.align} sx={{
                            maxWidth: col?.width,
                            padding: "0px",
                            color: darkMode ? "white" : "",
                        }}>
                            {col?.renderCell({ row: data })}
                        </TableCell>
                    ))}
                    {tableAction && (
                        <TableCell sx={{ padding: "0px" }} />
                    )}
                </TableRow>
                <TableRow sx={{
                    '& > *': {
                        borderBottom: 'unset',
                        
                    }
                }}>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={99}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <div className='table-responsive'>
                                <DataGrid
                                    sx={{
                                        border: "none",
                                        ".MuiDataGrid-virtualScroller": {
                                            flexGrow: 1,
                                            backgroundColor: darkMode ? "#40679E" : "",
                                            color: darkMode ? "white" : "",
                                        },
                                        ".MuiDataGrid-columnHeaders": {
                                            backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                                            border: "none",
                                            color: darkMode ? "white" : "",
                                            boxShadow: "0px 2px 10px rgba(58, 53, 65, 0.1)"
                                        },
                                        ".MuiDataGrid-columnSeparator": {
                                            display: "none",
                                        }
                                    }}
                                    rows={getCollabsibleTableRow(data)}
                                    columns={collabsibleTableColumns}
                                    disableColumnMenu
                                    disableRowSelectionOnClick
                                    disableColumnSelector
                                    pagination={false}
                                    disablePagination
                                />
                            </div>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </>
        )
    }
    const { darkMode } = useDarkMode()
    return (
        <div className='w-100' style={{ minHeight: "400px" }}>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className='table-responsive'>
                    <Table size='small'>
                        <TableHead sx={{
                            ".MuiTableRow-head": {
                                boxShadow: "0px 2px 10px rgba(58, 53, 65, 0.1)",
                                height: "56px",
                                backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                                border: "none",
                                color: darkMode ? "white" : "",
                            },
                            "th.MuiTableCell-root": {
                                padding: "0px",
                                border: "none",
                            }
                        }}>
                            <TableRow >
                                <TableCell />
                                {columns?.map((colHead, i) => (
                                    <TableCell sx={{ minWidth: colHead?.width, color: darkMode ? "white" : "", }} key={i} align={colHead?.headerAlign}>{(function () {
                                        if (colHead?.renderHeader) return colHead.renderHeader();
                                        return colHead?.headerName ?? "";
                                    }())}</TableCell>
                                ))}
                                {tableAction && (
                                    <TableCell width={90} />
                                )}
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {rows?.map((rowData, i) => (
                                <Row data={rowData} key={i} />
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    )
}

export default CollapsibleTable;