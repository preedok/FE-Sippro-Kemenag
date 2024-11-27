import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import "./AsyncTable.css";
import LoadingComponent from '../loader/loader1';
import { useDarkMode } from '../../utils/DarkModeContext';
import notfound from '../../assets/datanotfound.png'
import AOS from 'aos';
import 'aos/dist/aos.css';
const AsyncTable = ({ rows, loading, columns, ...other }) => {
    const { darkMode } = useDarkMode();
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true
        });
    }, []);
    const renderNoDataMessage = () => (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: darkMode ? 'white' : 'black'
        }}>
            <img
                src={notfound}
                width="440px"
                height='auto'
                alt=""
                data-aos="fade-down"
                data-aos-delay="100"
            />
            <p style={{
                fontSize: '23px',
                fontWeight: '600',
                letterSpacing: '6.5px',
                textTransform: 'uppercase',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color:'#FF4C4C'
            }}
                // data-aos="fade-up"
                // data-aos-delay="300"
            >
                Data tidak tersedia
            </p>
        </div>
    );
    return (
        <div style={{ background: darkMode ? "#3C5B6F" : "#FFFFFF" }}>
            {loading ? (
                <div className='m-auto' style={{ background: darkMode ? 'rgba(255, 255, 255, 0.5)' : "#F9FAFC", borderRadius: '10px' }}>
                    <LoadingComponent />
                </div>
            ) : rows.length === 0 ? (
                renderNoDataMessage()
            ) : (
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
                    rows={rows}
                    getRowHeight={() => 'auto'}
                    disableColumnMenu
                    columns={columns}
                    pageSize={5}
                    style={{
                        backgroundColor: darkMode ? "#40679E" : "",
                        color: darkMode ? "white" : "",
                    }}
                    rowsPerPageOptions={[5]}
                    getRowId={(row) => row.Id || row.id}
                    {...other}
                />
            )}
        </div>
    );
};

export default AsyncTable;