import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import ContentContainer from "../../../../components/card-container/ContentContainer";
import ContentCard from "../../../../components/card-content/ContentCard";
import Paper from "@mui/material/Paper";
import { GetApiBaseUrl } from "../../../../utils/env";
import style from "./style.module.css";
import logo from "../../../../assets/logo.svg";
import { getToken , getUserId, getRole} from '../../../../utils/token'
// import {GetApiBaseUrl} from '../../../../utils/env'
import axios from "axios";
import elipse3 from "../../../../assets/Ellipse 3.svg";
import elipse4 from "../../../../assets/Ellipse 4.svg";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TextField from "@mui/material/TextField";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import Stack from "@mui/material/Stack";
import CreateIcon from "@mui/icons-material/Create";
import LoadingComponent from '../../../../components/loader/loader'
import { useDarkMode } from "../../../../utils/DarkModeContext";
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const style1 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  borderRadius: "10px",
};

const configPage = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [idData, setIdData] = useState("")
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [typeInput, setTypeInput] = useState("");
  // const [condition, setCondition] = useState('')
  function createData(no, name, value, type, action) {
    return { no, name, value, type, action };
  }
  const token = getToken();
  const baseUrl = GetApiBaseUrl();
  const [configData, setConfigData] = useState([])
  const getDataConfig = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${baseUrl}/DatabaseSettings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setConfigData(response.data)
      setLoading(false);
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `${error.message}`
      });
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getDataConfig()
  }, [])
  const handleOpen = (id, name, value, type) => {
    setIdData(id)
    setName(name);
    setValue(value);
    setTypeInput(type);
    setOpen(true);
    console.log(`id=${id},  name=${name}, value=${value}, type=${type}`);
    // setHonorarium(rowData.assesmentHonorarium);

    // if (rowData.assessmentHonorariumTime) {
    //   setHonorariumDate(rowData.assessmentHonorariumTime.split("T")[0]);
    // } else {
    //   const today = new Date().toISOString().split("T")[0];
    //   setHonorariumDate(today);
    // }
  };
  const handleClose = () => setOpen(false);

  const handleEditData = async () => {
    try {
      setLoading(true);

      let formattedValue = value; // Nilai default

      if (typeInput === "Date") {
        // Jika typeInput adalah "Date", ubah format value
        const dateObject = new Date(value);
        formattedValue = dateObject.toISOString();
      }

      console.log(`data upddate>> ${formattedValue}, ${idData}, ${name}, ${typeInput}`);

      const updatedData = {
        id: idData,
        name: name,
        value: formattedValue,
        type: typeInput,
      };

      await axios.put(`${baseUrl}/DatabaseSettings/${idData}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Setel state kembali ke nilai awal setelah pembaruan berhasil
      setIdData('');
      setName('');
      setValue('');
      setTypeInput('');

      getDataConfig();
      handleClose();
      setLoading(false);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `${error.message}`
      });
    }
  };
  const columns = [
    { id: "no", label: "No.", flex: 1 },
    {
      id: "name",
      label: "Name",
      flex: 1,
      align: "left",
    },
    {
      id: "value",
      label: "Status",
      flex: 1,
      align: "left",
    },
    {
      id: "action",
      label: "Action",
      flex: 1,
      align: "center",
    },
  ];
  const rows = configData.map((data, index) => {
    // Ubah nilai data.value jika data.type adalah 'Date'
    const displayValue = data.type === 'Date' ? data.value.split('T')[0] : data.value;

    return createData(
      index + 1,
      data.name,
      displayValue,
      data.type,
      <Button
        variant="contained"
        size="small"
        sx={{ fontSize: "12px" }}
        onClick={() => {
          handleOpen(data.id, data.name, displayValue, data.type);
        }}
      >
        <CreateIcon fontSize="small" sx={{ fontSize: "19px" }} />
      </Button>
    );
  });
  const currentUrl = window.location.search;
  const urlParams = new URLSearchParams(currentUrl);
  const { darkMode } = useDarkMode()
  const [valueTab, setValueTab] = React.useState('1');
  const handleChange = (event, newValue) => {
    setValueTab(newValue);
  };
 

  const [activeUsers, setActiveUsers] = useState([]);
  const [totalActiveUsers, setTotalActiveUsers] = useState(0);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [sinceDate, setSinceDate] = useState(
    new Date().toISOString().split('T')[0] // Set default to today's date
  );

  const getActiveUsers = async () => {
    setLoadingUsers(true);
    try {
      const response = await axios.get(`${baseUrl}/audit-logs/active-users?since=${sinceDate}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setActiveUsers(response.data.activeUsers);
      setTotalActiveUsers(response.data.totalActiveUsers);
    } catch (error) {
      console.error('Error fetching active users:', error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Failed to fetch active users: ${error.message}`
      });
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    if (valueTab === '2') {
      getActiveUsers();
    }
  }, [valueTab]);

  const handleDateChange = (event) => {
    setSinceDate(event.target.value);
  };

  const handleFetchUsers = () => {
    getActiveUsers();
  };
  return (
    <>
      <Helmet>
        <title>Kemenag | Config</title>
      </Helmet>

      <div className="ms-4">
        <div className="d-flex">
          <h2
            className="jdl mb-3 mt-3"
            data-aos="zoom-in-right"
            data-aos-duration="1000"
            style={{ color: darkMode ? "white" : "" }}
          >
            Config
          </h2>
        </div>
      </div>
      <div >
        <div className="card-body">
          <ContentCard className="">
            <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={valueTab}>
                <Box sx={{ borderBottom: 1, margin:'30px', borderColor: 'divider' }}>
                  <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Configurasi" value="1" />
                    <Tab label="Pengguna Aktif" value="2" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <Paper sx={{ width: "97.8%", overflow: "hidden", }}>
                    <TableContainer component={Paper}>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow style={{
                            backgroundColor: darkMode ? "#40679E" : "",
                            color: darkMode ? "white" : "",
                          }}  >
                            {columns.map((column) => (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                style={{
                                  minWidth: column.minWidth, backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                                  border: "none",
                                  color: darkMode ? "white" : "",
                                }}
                              >
                                {column.label}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {loading ? (
                            <LoadingComponent columns={columns} />
                          ) : rows.length === 0 ? (
                            <TableRow style={{ backgroundColor: darkMode ? "#40679E" : "", color: darkMode ? "white" : "" }}>
                              <TableCell style={{ color: darkMode ? "white" : "" }} colSpan={columns.length} align="center">
                                DATA TIDAK TERSEDIA
                              </TableCell>
                            </TableRow>
                          ) : (
                            rows.map((row, index) => (
                              <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={index}
                                style={{
                                  backgroundColor: darkMode ? "#40679E" : "",
                                  color: darkMode ? "white" : "",
                                }} >
                                {columns.map((column) => {
                                  const value = row[column.id];
                                  return (
                                    <TableCell style={{ color: darkMode ? "white" : "", }} key={column.id} align={column.align}>
                                      {value}
                                    </TableCell>
                                  );
                                })}
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                </TabPanel>
                <TabPanel value="2">
                  <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                    <input type="date" value={sinceDate}
                      onChange={handleDateChange} className="me-2  form-control p-2" style={{width:'200px'}}/>
                    <Button variant="contained" onClick={handleFetchUsers}>
                      Search
                    </Button>
                  </Box>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Total Pengguna Aktif: {totalActiveUsers} Pengguna
                  </Typography>
                  <Paper sx={{ width: "97.8%", overflow: "hidden" }}>
                    <TableContainer component={Paper}>
                      <Table stickyHeader aria-label="active users table">
                        <TableHead>
                          <TableRow style={{
                            backgroundColor: darkMode ? "#40679E" : "",
                            color: darkMode ? "white" : "",
                          }}>
                            <TableCell style={{ backgroundColor: darkMode ? "#0C359E" : "#F9FAFC", color: darkMode ? "white" : "" }}>User ID</TableCell>
                            <TableCell style={{ backgroundColor: darkMode ? "#0C359E" : "#F9FAFC", color: darkMode ? "white" : "" }}>Email</TableCell>
                            <TableCell style={{ backgroundColor: darkMode ? "#0C359E" : "#F9FAFC", color: darkMode ? "white" : "" }}>Name</TableCell>
                            <TableCell style={{ backgroundColor: darkMode ? "#0C359E" : "#F9FAFC", color: darkMode ? "white" : "" }}>Last Login</TableCell>
                            <TableCell style={{ backgroundColor: darkMode ? "#0C359E" : "#F9FAFC", color: darkMode ? "white" : "" }}>Last Token Refresh</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {loadingUsers ? (
                            <TableRow>
                              <TableCell colSpan={5} align="center">Loading...</TableCell>
                            </TableRow>
                          ) : activeUsers.length === 0 ? (
                              <TableRow style={{ backgroundColor: darkMode ? "#40679E" : "", color: darkMode ? "white" : "" }}>
                                <TableCell style={{ color: darkMode ? "white" : "" }} colSpan={5} align="center">
                                  DATA TIDAK TERSEDIA
                                </TableCell>
                              </TableRow>
                          ) : (
                            activeUsers.map((user, index) => (
                              <TableRow key={index} style={{
                                backgroundColor: darkMode ? "#40679E" : "",
                                color: darkMode ? "white" : "",
                              }}>
                                <TableCell style={{ color: darkMode ? "white" : "" }}>{user.userId}</TableCell>
                                <TableCell style={{ color: darkMode ? "white" : "" }}>{user.email || "-"}</TableCell>
                                <TableCell style={{ color: darkMode ? "white" : "" }}>{user.fullName || "-"}</TableCell>
                                <TableCell style={{ color: darkMode ? "white" : "" }}>{new Date(user.lastLogin).toLocaleString()}</TableCell>
                                <TableCell style={{ color: darkMode ? "white" : "" }}>{user.lastTokenRefresh ? new Date(user.lastTokenRefresh).toLocaleString() : 'N/A'}</TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                </TabPanel>
              </TabContext>
            </Box>
          </ContentCard>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style1}>
          <IconButton
            sx={{ position: "absolute", top: 5, right: 5 }}
            onClick={handleClose}
            aria-label="close"
          >
            <HighlightOffIcon color="error" />
          </IconButton>
          <Box sx={{ padding: 4, marginTop: "10px" }}>
            <div className=" row col-12">
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  value={name}
                  readOnly
                />
              </div>
              {typeInput === "Date" ? (
                <div className="mb-3">
                  <label className="form-label">Value</label>
                  <input
                    type="date"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="form-control"
                    id="exampleFormControlInput1"
                  />
                </div>
              ) : typeInput === "String" ? (
                <div className="mb-3">
                  <label className="form-label">Value</label>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="form-control"
                    id="exampleFormControlInput1"
                  />
                </div>
              ) : (
                <div className="mb-3">
                  <label className="form-label">Value</label>

                  <select
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="form-control"
                    id="exampleFormControlSelect1"
                  >
                    <option value={true}>Buka</option>
                    <option value={false}>Tutup</option>
                  </select>
                </div>
              )}
            </div>
            <Stack direction="row" spacing={2}>
              <Button
                size="small"
                variant="contained"
                sx={{ marginLeft: "auto" }}
                onClick={handleEditData}
              >
                <SaveAsIcon sx={{ marginRight: "5px" }} />
                Simpan
              </Button>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default configPage;
