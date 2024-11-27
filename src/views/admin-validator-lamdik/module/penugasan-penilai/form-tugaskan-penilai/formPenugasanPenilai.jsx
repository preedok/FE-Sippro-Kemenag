import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../../../views/kasubdit/admin-kasubdit.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import api from "../../../../service/api";
import Swal from "sweetalert2";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ContentCard from "../../../../../components/card-content/ContentCard";
import { LineWave } from "react-loader-spinner";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { getToken, getUserId, getRole } from "../../../../../utils/token";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import ContentContainer from "../../../../../components/card-container/ContentContainer";
import IconButton from "@mui/material/IconButton";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Typography, useMediaQuery } from "@mui/material";
import PenawaranStatusName from "../../../../../utils/penawaranStatusName";
import logo from '../../../../../assets/logo.svg'
import '../../../../../App.css'
import ReplayIcon from '@mui/icons-material/Replay';
import WaveIcon from "../../../../../components/icons/WaveIcon";
import { useDarkMode } from "../../../../../utils/DarkModeContext";
import ProdiActionName from "../../../../../utils/status";
import RefreshIcon from '@mui/icons-material/Refresh';
import LoadingComponent from "../../../../../components/loader/loader";
const Index = ({ setView }) => {
  const { darkMode } = useDarkMode();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 1000,
    width: '90%',
    height: '80vh',
    bgcolor: darkMode ? "#3C5B6F" : "background.paper",
    overflow: 'scroll',
    borderRadius: "10px",
    boxShadow: 24,
  };
  const isScreenSizeLowerThanLG = useMediaQuery("(max-width: 990px)");
  const isScreenSizeLowerThanSM = useMediaQuery("(max-width: 576px)");
  const token = getToken();
  const [data, setData] = useState(null);
  const [selectedData, setSelectedData] = useState([]);
  const [searchOptions, setSearchOptions] = useState([]);
  const [newData, setNewData] = useState("");
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const [penawaranTime, setPenawaranTime] = useState(new Date().toISOString().slice(0, 10));
  const handleClose = (resetData = false) => {
    setOpen(false);
    if (resetData) {
      setSelectedData([]);
    }
  };
  const [validationErrors, setValidationErrors] = useState({
    penawaranTime: '',
    durasiPenawaran: '',
    lamaPenawaran: '',
    assesmentSkNo: ''
  });

  const [assesmentOfferingExpiredInDays, setAssesmentOfferingExpiredInDays] = useState("");
  const [assesmentDurationInDays, setAssesmentDurationInDays] = useState("");
  const [role, setAssesmentRole] = useState('');
  const [assesmentSkNo, setassesmentSkNo] = useState('');
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  const [loading, setLoading] = useState(false)
  const prodiAsesment = async () => {
    setLoading(true)
    try {
      const programStudiId = localStorage.getItem("studiId");
      const response = await api.get(`/prodi-assesment/${programStudiId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(response.data.data);
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setLoading(false)
    }
  };

  const dataAsesor = async () => {
    try {
      const response = await api.get("/user/asesorlist", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = response.data.data;
      setSearchOptions(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchDataAgain = () => {
    // dataAsesor();
    prodiAsesment();
  };
  const handleRefresh = () => {
    fetchDataAgain();
  };
  useEffect(() => {
    dataAsesor();
    prodiAsesment();
  }, []);

  if (!data) {
    return (
      <div
        style={{
          paddingLeft: "50px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: darkMode ? "#3C5B6F" : "#f4feff",
        }}
      >
        <img
          src={logo}
          alt="Deskripsi Gambar Anda"
        />
        <span className="loader"></span>
      </div>
    );
  }

  const handleDeleteData = (index) => {
    const updatedData = [...selectedData];
    updatedData.splice(index, 1);
    setSelectedData(updatedData);
  };
  const getLatestDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const dateFormatter = (dateStr) => {
    if (!dateStr)
      return (
        <>
          <p style={{ fontStyle: "italic", color: "red" }} className="mt-3">
            Belum Tersedia
          </p>
        </>
      );

    const options = { day: "numeric", month: "long", year: "numeric" };
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("id-ID", options).format(date);
  };
  const handleKirimPenawaran = async () => {
    let hasErrors = false;
    const newValidationErrors = {};

    if (!penawaranTime) {
      newValidationErrors.penawaranTime = 'Tanggal Penawaran harus diisi.';
      newValidationErrors.lamaPenawaran = 'Lama Penawaran harus diisi.';
      newValidationErrors.durasiPenawaran = 'Durasi Penawaran harus diisi.';
      hasErrors = true;
    }
    if (hasErrors) {
      setValidationErrors(newValidationErrors);
      return;
    }
    try {
      const asesorIds = selectedData.map((data) => data.id);
      const asesorFullNames = selectedData.map((data) => data.fullName);
      const asesorEmails = selectedData.map((data) => data.email);
      const programStudiId = localStorage.getItem("studiId");
      const isoPenawaranTime = new Date(penawaranTime).toISOString();
      const payload = {
        asesorId: asesorIds[0],
        programStudiId: Number(programStudiId),
        asesorFullName: asesorFullNames[0],
        asesorEmail: asesorEmails[0],
        assesmentOfferingTime: isoPenawaranTime,
        status: 0,
        assesmentOfferingExpiredInDays: Number(assesmentOfferingExpiredInDays),
        assesmentDurationInDays: Number(assesmentDurationInDays),
      };
      const response = await api.post("/prodi-assesment", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200 || response.status === 201) {
        setSelectedData([]);
        setAssesmentOfferingExpiredInDays("");
        setAssesmentDurationInDays("");
        setPenawaranTime("");
        setNewData("");
        setSelectedData(false);
        setValidationErrors({});
        handleClose(true);
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Penawaran Berhasil dikirimkan ke Asesor",
          showConfirmButton: false,
          timer: 1000
        }).then(() => {
          setSelectedData(false);
          handleClose(true);
          fetchDataAgain();
          navigate("/kasubdit/penawaran");
        });
      } else {
        handleClose(true);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Terjadi kesalahan saat mengirim penawaran.",
        });
      }
    } catch (error) {
      handleClose(true);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Data asesor dengan informasi yang sama sudah ada.",
      });
    }
  };

  const handleBatalKonfirmasi = async (asesorId, status) => {
    try {
      const programStudiId = localStorage.getItem("studiId");
      if (status === 99) {
        await api.delete(`/prodi-assesment/${programStudiId}/${asesorId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Assessment berhasil dihapus karena status Konfirmasi di Tolak.",
          showConfirmButton: false,
          timer: 1000
        }).then(() => {
          fetchDataAgain();
        });
      } else if (status === 0) {
        const confirmResult = await Swal.fire({
          icon: "warning",
          title: "Konfirmasi",
          text: "Apakah Anda yakin hapus assessment ini?",
          showCancelButton: true,
          confirmButtonText: "OK",
          cancelButtonText: "Batal",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          reverseButtons: true,
        });
        if (confirmResult.isConfirmed) {
          const response = await api.delete(
            `/prodi-assesment/${programStudiId}/${asesorId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Berhasil",
              text: "Assessment berhasil dihapus karena status Konfirmasi di Tolak.",
              showConfirmButton: false,
              timer: 1000
            }).then(() => {
              fetchDataAgain();
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Terjadi kesalahan saat menghapus assessment.",
            });
          }
        }
      } else if (status === 28) {
        const confirmResult = await Swal.fire({
          icon: "warning",
          title: "Konfirmasi",
          text: "Apakah Anda yakin hapus assessment ini?",
          showCancelButton: true,
          confirmButtonText: "OK",
          cancelButtonText: "Batal",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          reverseButtons: true,
        });
        if (confirmResult.isConfirmed) {
          const response = await api.delete(
            `/prodi-assesment/${programStudiId}/${asesorId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Berhasil",
              text: "Assessment berhasil dihapus karena status Konfirmasi di Tolak.",
              showConfirmButton: false,
              timer: 1000
            }).then(() => {
              fetchDataAgain();
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Terjadi kesalahan saat menghapus assessment.",
            });
          }
        }
      } else if (status === 29) {
        const confirmResult = await Swal.fire({
          icon: "warning",
          title: "Konfirmasi",
          text: "Apakah Anda yakin hapus assessment ini?",
          showCancelButton: true,
          confirmButtonText: "OK",
          cancelButtonText: "Batal",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          reverseButtons: true,
        });
        if (confirmResult.isConfirmed) {
          const response = await api.delete(
            `/prodi-assesment/${programStudiId}/${asesorId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Berhasil",
              text: "Assessment berhasil dihapus karena status Konfirmasi di Tolak.",
              showConfirmButton: false,
              timer: 1000
            }).then(() => {
              fetchDataAgain();
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Terjadi kesalahan saat menghapus assessment.",
            });
          }
        }
      }
    } catch (error) {
      console.log("Error deleting assessment:", error);
    }
  };

  const handleBatalKonfirmasi1 = async (asesorId, status) => {
    try {
      const programStudiId = localStorage.getItem("studiId");
      if (status === 20) {
        await api.delete(`/prodi-assesment/${programStudiId}/${asesorId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Assessment Berhasil Di batalkan",
          showConfirmButton: false,
          timer: 1000
        }).then(() => {
          fetchDataAgain();
        });
      } else if (status === 0) {
        const confirmResult = await Swal.fire({
          icon: "warning",
          title: "Konfirmasi",
          text: "Apakah Anda yakin Batalkan assessment ini?",
          showCancelButton: true,
          confirmButtonText: "OK",
          cancelButtonText: "Batal",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          reverseButtons: true,
        });
        if (confirmResult.isConfirmed) {
          const response = await api.delete(
            `/prodi-assesment/${programStudiId}/${asesorId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Berhasil",
              text: "Assessment berhasil dihapus karena status Konfirmasi di Tolak.",
              showConfirmButton: false,
              timer: 1000
            }).then(() => {
              fetchDataAgain();
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Terjadi kesalahan saat menghapus assessment.",
            });
          }
        }
      }
    } catch (error) {
      console.log("Error deleting assessment:", error);
    }
  };
  return (
    <>
      <h2
        className="mt-3 text3 ms-4 mb-3"
        data-aos="zoom-in-left"
        data-aos-duration="1000"
        style={{ color: darkMode ? "white" : "" }}
      >
        Form Penawaran Penilai
      </h2>


      <ContentCard>
        <Button className="mt-2" variant="outlined" color="error" onClick={() => setView('penawaran')} sx={{ width: '80px', marginLeft: '10px' }}>
          Kembali
        </Button>
        <div className="p-4">
          <div className="d-flex  mb-4">
            <div className="col-4 mt-4">
              <p style={{ color: darkMode ? "white" : "" }}>No.Registrasi</p>
            </div>
            <div className="col-8 mt-4">
              <p style={{ color: darkMode ? "white" : "" }}>{data[0]?.nomorRegistrasi}</p>
            </div>
          </div>
          <div className="d-flex  mb-4">
            <div className="col-4">
              <p style={{ color: darkMode ? "white" : "" }}>Program Studi</p>
            </div>
            <div className="col-8">
              <p style={{ color: darkMode ? "white" : "" }}>{data[0]?.namaProdi}</p>
            </div>
          </div>
          <div className="d-flex  mb-4">
            <div className="col-4">
              <p style={{ color: darkMode ? "white" : "" }}>Lembaga</p>
            </div>
            <div className="col-8">
              <p style={{ color: darkMode ? "white" : "" }}>{data[0]?.lembaga}</p>
            </div>
          </div>
          <div className="d-flex ">
            <div className="col-4">
              <p style={{ color: darkMode ? "white" : "" }}>Jenjang</p>
            </div>
            <div className="col-8">
              <p style={{ color: darkMode ? "white" : "" }}>{data[0]?.jenjang}</p>
            </div>
          </div>
        </div>

        <div>
          <div className="d-flex">
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleRefresh}
              sx={{
                marginBottom: "10px",
                display: "flex",
                marginLeft: "10px",
                marginRight: "auto",
              }}
            >
              <RefreshIcon fontSize="small" sx={{ marginRight: "5px" }} />  Refresh
            </Button>
            <Button
              size="small"
              variant="contained"
              color="success"
              sx={{
                marginBottom: "10px",
                display: "flex",
                marginLeft: "auto",
                marginRight: "10px",
              }}
              onClick={handleOpen}
            >
              <AddBoxIcon fontSize="small" sx={{ marginRight: "5px" }} />
              Tambah
            </Button>
          </div>

          <TableContainer component={Paper} className="m-2">
            <Table aria-label="simple table">
              <TableHead style={{
                backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                border: "none",
                color: darkMode ? "white" : "",
              }} >
                <TableRow style={{
                  backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                  border: "none",
                  color: darkMode ? "white" : "",
                }} >
                  <TableCell style={{ color: darkMode ? "white" : "", }}>#</TableCell>
                  <TableCell style={{ color: darkMode ? "white" : "", }} className="text-left" width={160}>
                    Nama{" "}
                  </TableCell>
                  <TableCell style={{ color: darkMode ? "white" : "", }} className="text-center">Email </TableCell>
                  <TableCell style={{ color: darkMode ? "white" : "", }} className="text-center">Jabatan</TableCell>
                  <TableCell style={{ color: darkMode ? "white" : "", }} className="text-center" width={200}>
                    Tanggal Penawaran
                  </TableCell>
                  <TableCell style={{ color: darkMode ? "white" : "", }} className="text-center" width={175}>
                    Status Konfirmasi
                  </TableCell>

                  <TableCell style={{ color: darkMode ? "white" : "", }} className="text-center" width={170}>
                    Durasi Penawaran
                  </TableCell>
                  <TableCell style={{ color: darkMode ? "white" : "", }} className="text-center" width={170}>
                    Durasi Asesment
                  </TableCell>
                  <TableCell style={{ color: darkMode ? "white" : "", }} className="text-center" width={170}>

                  </TableCell>
                  {data.map((item) => {
                    let isAksiRendered = false;
                    return (
                      <React.Fragment key={item.id}>
                        {item.asesors.map((asesor) => {
                          if (
                            (asesor.status === 99 || asesor.status === 0) &&
                            !isAksiRendered
                          ) {
                            isAksiRendered = true;
                            return (
                              <TableCell
                                key={asesor.id}
                                className="text-center"
                              >

                              </TableCell>
                            );
                          }
                          return null;
                        })}
                      </React.Fragment>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  data.map((item, index) => (
                    <React.Fragment key={index}>
                      {item.asesors.map((asesor, asesorIndex) => {
                        const uniqueIndex =
                          index * item.asesors.length + asesorIndex + 1;
                        return (
                          <TableRow key={uniqueIndex} style={{
                            backgroundColor: darkMode ? "#40679E" : "",
                            color: darkMode ? "white" : "",
                          }}>
                            <TableCell style={{ color: darkMode ? "white" : "", }}>{uniqueIndex}</TableCell>
                            <TableCell style={{ color: darkMode ? "white" : "", }} className="text-left">
                              {asesor.asesorFullName || ""}
                            </TableCell>
                            <TableCell style={{ color: darkMode ? "white" : "", }} className="text-center">
                              {asesor.asesorEmail || ""}
                            </TableCell>
                            <TableCell style={{ color: darkMode ? "white" : "", }} className="text-center">
                              {asesor.role || ""}
                            </TableCell>
                            <TableCell style={{ color: darkMode ? "white" : "", }} className="text-center">
                              {dateFormatter(asesor.assesmentOfferingTime)}
                            </TableCell>
                            <TableCell className="text-center">
                              {/* {asesor.status === PenawaranStatusName.AssesmentOffering ? (
                                <div
                                  style={{
                                    backgroundColor: "orange",
                                    padding: "4px 10px",
                                    borderRadius: "5px",
                                    color: "white",
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                  className="mt-3"
                                >
                                  <p style={{ margin: 0, fontSize: "10px" }}>
                                    Menunggu Konfirmasi
                                  </p>
                                  <AccessAlarmsIcon
                                    style={{
                                      color: "white",
                                      marginLeft: "auto",
                                    }}
                                  />
                                </div>
                              ) : asesor.status === PenawaranStatusName.AssesmentOfferAccepted ? (
                                <div
                                  style={{
                                    backgroundColor: "green",
                                    padding: "4px 10px",
                                    borderRadius: "5px",
                                    color: "white",
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                  className="mt-3 me-2"
                                >
                                  <p style={{ margin: 0, fontSize: "10px" }}>
                                    Konfirmasi diterima
                                  </p>
                                  <CheckCircleIcon
                                    style={{ marginLeft: "auto" }}
                                  />
                                </div>
                              ) : asesor.status === PenawaranStatusName.AssesmentCompleted ? (
                                <div
                                  style={{
                                    backgroundColor: "green",
                                    padding: "4px 10px",
                                    borderRadius: "5px",
                                    color: "white",
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                  className="mt-3 me-5"
                                >
                                  <p style={{ margin: 0, fontSize: "10px" }}>
                                    Asesmen Selesai
                                  </p>
                                  <CheckCircleIcon style={{ marginLeft: "auto" }} />
                                </div>
                              ) : asesor.status === PenawaranStatusName.Rejected ? (
                                <div
                                  style={{
                                    backgroundColor: "rgb(213, 16, 16)",
                                    padding: "4px 10px",
                                    borderRadius: "5px",
                                    color: "white",
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                  className="mt-3 me-5"
                                >
                                  <p style={{ margin: 0, fontSize: "10px" }}>
                                    Konfirmasi di Tolak
                                  </p>
                                  <CancelIcon style={{ marginLeft: "auto" }} />
                                </div>
                              ) : asesor.status === PenawaranStatusName.AssesmentBackToUser ? (
                                <div
                                  style={{
                                    backgroundColor: "rgb(213, 16, 16)",
                                    padding: "4px 10px",
                                    borderRadius: "5px",
                                    color: "white",
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                  className="mt-3 me-5"
                                >
                                  <p style={{ margin: 0, fontSize: "10px" }}>
                                    Usulan di Kembalikan ke User
                                  </p>
                                  <ReplayIcon style={{ marginLeft: "auto" }} />
                                </div>
                              ) : asesor.status === PenawaranStatusName.AssesmentExpired ? (
                                <div
                                  style={{
                                    backgroundColor: "rgb(213, 16, 16)",
                                    padding: "4px 10px",
                                    borderRadius: "5px",
                                    color: "white",
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                  className="mt-3 me-5"
                                >
                                  <p style={{ margin: 0, fontSize: "10px" }}>
                                    Asesmen Kadaluarsa
                                  </p>
                                  <AccessAlarmsIcon style={{ marginLeft: "auto" }} />
                                </div>
                              ) : null} */}
                              <ProdiActionName status={asesor.status} assesmentCount={asesor.AssesmentCount} />
                            </TableCell>
                            {asesor.status !== 99 ? (
                              <>
                                <TableCell className="text-center ">
                                  {asesor.assesmentOfferingExpiredInDays !==
                                    0 ? (
                                    <p
                                      style={{
                                        color: "green",
                                        fontStyle: "italic",
                                      }}
                                    >
                                      {asesor.assesmentOfferingExpiredInDays}
                                      Hari
                                    </p>
                                  ) : (
                                    <p
                                      style={{
                                        fontStyle: "italic",
                                        color: "red",
                                      }}
                                    >
                                      Belum Berlaku
                                    </p>
                                  )}
                                </TableCell>
                                <TableCell className="text-center">
                                  {asesor.assesmentDurationInDays !== 0 ? (
                                    <p
                                      style={{
                                        color: "green",
                                        fontStyle: "italic",
                                      }}
                                    >
                                      {asesor.assesmentDurationInDays}
                                      Hari
                                    </p>
                                  ) : (
                                    <p
                                      style={{
                                        fontStyle: "italic",
                                        color: "red",
                                      }}
                                    >
                                      Belum Berlaku
                                    </p>
                                  )}
                                </TableCell>
                              </>
                            ) : (
                              <>
                                <TableCell
                                  style={{
                                    color: "red",
                                    fontStyle: "italic",
                                  }}
                                  className="text-center"
                                >
                                  Di Tolak
                                </TableCell>
                                <TableCell
                                  style={{
                                    color: "red",
                                    fontStyle: "italic",
                                  }}
                                  className="text-center"
                                >
                                  Di Tolak
                                </TableCell>
                              </>
                            )}

                            <TableCell className="text-center">
                              {(asesor.status === 99) || (asesor.status === 28) || (asesor.status === 29) ? (
                                <Button
                                  size="small"
                                  variant="contained"
                                  sx={{ backgroundColor: "orange" }}
                                  onClick={() =>
                                    handleBatalKonfirmasi(
                                      asesor.asesorId,
                                      asesor.status
                                    )
                                  }
                                >
                                  <DoDisturbOnIcon
                                    sx={{ marginRight: "5px" }}
                                  />
                                  Hapus
                                </Button>
                              ) : asesor.status === 20 ? (
                                <Button
                                  size="small"
                                  variant="contained"
                                  color="error"
                                  onClick={() =>
                                    handleBatalKonfirmasi1(
                                      asesor.asesorId,
                                      asesor.status
                                    )
                                  }
                                >
                                  <DisabledByDefaultIcon
                                    sx={{ marginRight: "5px" }}
                                  />
                                  Batal
                                </Button>
                              ) : null}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </React.Fragment>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </ContentCard>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <IconButton
            sx={{ position: "absolute", top: 5, right: 5 }}
            onClick={handleClose}
            aria-label="close"
          >
            <HighlightOffIcon color="error" />
          </IconButton>

          <Typography
            sx={{
              fontSize: isScreenSizeLowerThanSM ? "16px" : "26px",
              textAlign: "center",
              fontWeight: "600",
              color: darkMode ? "white" : "",
              marginTop: "30px",
            }}
          >
            Form Penawaran Penilai
          </Typography>

          <Box sx={{ padding: 4, color: darkMode ? "white" : "", }}>
            <div className="d-flex flex-sm-row flex-column mb-3">
              <div className="col-12 col-sm-4">
                <p>Lama Penawaran</p>
              </div>
              <div className="col-12 col-sm-8">
                <select
                  className="form-select  w-100"
                  aria-label="Default select example"
                  onChange={(e) => {
                    setAssesmentOfferingExpiredInDays(e.target.value);
                    setValidationErrors({
                      ...validationErrors,
                      lamaPenawaran: '',
                    });
                  }}
                  defaultValue={assesmentOfferingExpiredInDays}
                >
                  <option selected>pilih Jumlah Hari</option>
                  <option value={3}>3 Hari</option>
                  <option value={4}>4 Hari</option>
                  <option value={5}>5 Hari</option>
                  <option value={6}>6 Hari</option>
                  <option value={7}>7 Hari</option>
                </select>
                {validationErrors.lamaPenawaran && (
                  <p className="text-danger">{validationErrors.lamaPenawaran}</p>
                )}
              </div>
            </div>
            <div className="d-flex flex-sm-row flex-column mb-3">
              <div className="col-12 col-sm-4">
                <p>Tanggal Penawaran</p>
              </div>
              <div className="col-12 col-sm-8">
                <input
                  type="date"
                  style={{ height: "55px" }}
                  className="form-control w-100"
                  value={penawaranTime}
                  onChange={(e) => {
                    setPenawaranTime(e.target.value);
                    setValidationErrors({
                      ...validationErrors,
                      penawaranTime: '',
                    });
                  }}
                />
                {validationErrors.penawaranTime && (
                  <p className="text-danger">{validationErrors.penawaranTime}</p>
                )}
              </div>
            </div>
            <div className="d-flex flex-sm-row flex-column mb-3">
              <div className="col-12 col-sm-4">
                <p>Durasi Asesment</p>
              </div>
              <div className="col-12 col-sm-8">
                <div className="d-flex">
                  <select
                    className="form-select  w-100"
                    aria-label="Default select example"
                    value={assesmentDurationInDays}
                    onChange={(e) => {
                      setAssesmentDurationInDays(e.target.value);
                      setValidationErrors({
                        ...validationErrors,
                        durasiPenawaran: '',
                      });
                    }}
                  >
                    <option selected>pilih Jumlah Hari</option>
                    <option value={3}>3 Hari</option>
                    <option value={4}>4 Hari</option>
                    <option value={5}>5 Hari</option>
                    <option value={6}>6 Hari</option>
                    <option value={7}>7 Hari</option>
                    <option value={8}>8 Hari</option>
                    <option value={9}>9 Hari</option>
                    <option value={10}>10 Hari</option>
                    <option value={11}>11 Hari</option>
                    <option value={12}>12 Hari</option>
                    <option value={13}>13 Hari</option>
                    <option value={14}>14 Hari</option>
                  </select>
                  <span
                    className="ms-2"
                    style={{
                      fontSize: "17px",
                      marginTop: "13px",
                      fontWeight: "700",
                    }}
                  >
                    Hari
                  </span>
                </div>

                {validationErrors.durasiPenawaran && (
                  <p className="text-danger">{validationErrors.durasiPenawaran}</p>
                )}
              </div>
            </div>
            <div className="d-flex flex-sm-row flex-column mb-3">
              <div className="col-12 col-sm-4">
                <p>Nomor SK</p>
              </div>
              <div className="col-12 col-sm-8">
                <div className="d-flex">
                  <input
                    type="text"
                    style={{ height: "55px" }}
                    className="form-control w-100"
                    value={assesmentSkNo}
                    onChange={(e) => {
                      setassesmentSkNo(e.target.value);
                      setValidationErrors({
                        ...validationErrors,
                        assesmentSkNo: '',
                      });
                    }}
                  />
                  {validationErrors.assesmentSkNo && (
                    <p className="text-danger">{validationErrors.assesmentSkNo}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="d-flex flex-sm-row flex-column mb-3">
              <div className="col-12 col-sm-4">
                <p>Jabatan</p>
              </div>
              <div className="col-12 col-sm-8">
                <div style={{ color: darkMode ? "white" : "", }} className="d-flex">
                  <select
                    className="form-select  w-100"
                    aria-label="Default select example"
                    value={role}
                    onChange={(e) => {
                      setAssesmentRole(e.target.value);
                      setValidationErrors({
                        ...validationErrors,
                        assesmentSkNo: '',
                      });
                    }}
                  >
                    <option selected>pilih Jabatan</option>
                    <option value='AsessorKepala'>Kepala</option>
                    <option value='AsessorAnggota'>Anggota</option>
                  </select>
                </div>

                {validationErrors.role && (
                  <p className="text-danger">{validationErrors.role}</p>
                )}
              </div>
            </div>
            <div style={{ color: darkMode ? "white" : "", }} className="d-flex  mt-5">
              <Autocomplete
                value={newData === "" ? null : newData}
                onChange={(e, newValue) => setNewData(newValue)}
                style={{ background: darkMode ? "white" : "", height: darkMode ? "55px" : "" }}
                options={searchOptions.map(
                  (option) =>
                    option.fullName +
                    " | " +
                    option.email +
                    " | " +
                    option.mobileNumber
                )}
                sx={{ marginTop: "-30px", width: "100%" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Search Data..."
                    sx={{ height: "20px" }}
                  />
                )}
                onInputChange={(event, value) => {
                  if (!value) {
                    setNewData("");
                  } else {
                    const selectedOption = searchOptions.find(
                      (option) =>
                        option.fullName +
                        " | " +
                        option.email +
                        " | " +
                        option.mobileNumber ===
                        value
                    );
                    if (selectedOption) {
                      setSelectedData([...selectedData, selectedOption]);
                      setSearchOptions(
                        searchOptions.filter(
                          (option) => option !== selectedOption
                        )
                      );
                      setNewData("");
                    }
                  }
                }}
              />
            </div>

            <div className="mt-4">
              {selectedData.length > 0 ? (
                <Table sx={{ marginTop: "50px", overflow: 'scroll' }}>
                  <TableHead style={{ backgroundColor: "#F9FAFC" }}>
                    <TableRow style={{
                      backgroundColor: darkMode ? "#40679E" : "",
                      color: darkMode ? "white" : "",
                    }}>
                      <TableCell style={{
                        backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                        border: "none",
                        color: darkMode ? "white" : "",
                      }}>#</TableCell>
                      <TableCell style={{
                        backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                        border: "none",
                        color: darkMode ? "white" : "",
                      }} className="text-left">Nama Assesor</TableCell>
                      <TableCell style={{
                        backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                        border: "none",
                        color: darkMode ? "white" : "",
                      }} className="text-center">
                        Email Assesor
                      </TableCell>
                      <TableCell style={{
                        backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                        border: "none",
                        color: darkMode ? "white" : "",
                      }} className="text-center">Telepon</TableCell>
                      <TableCell style={{
                        backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                        border: "none",
                        color: darkMode ? "white" : "",
                      }} className="text-left"></TableCell>
                      <TableCell style={{
                        backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                        border: "none",
                        color: darkMode ? "white" : "",
                      }} className="text-center"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedData.map((data, index) => (
                      <TableRow style={{
                        backgroundColor: darkMode ? "#40679E" : "",
                        color: darkMode ? "white" : "",
                      }} key={index}>
                        <TableCell style={{ color: darkMode ? "white" : "", }}>{index + 1}</TableCell>
                        <TableCell style={{ color: darkMode ? "white" : "", }}>{data.fullName}</TableCell>
                        <TableCell style={{ color: darkMode ? "white" : "", }} className="text-center">
                          {data.email}
                        </TableCell>
                        <TableCell style={{ color: darkMode ? "white" : "", }} className="text-center">
                          {data.mobileNumber}
                        </TableCell>
                        <TableCell style={{ color: darkMode ? "white" : "", }} className="text-center"></TableCell>
                        <TableCell style={{ color: darkMode ? "white" : "", }} className="justify-content-end d-flex">
                          <div className="mt-4">
                            <Button
                              size="small"
                              variant="contained"
                              color="error"
                              sx={{ marginRight: "10px" }}
                              onClick={() => handleDeleteData(index)}
                            >
                              <DeleteIcon fontSize="small" />
                              Hapus
                            </Button>
                            <Button
                              variant="contained"
                              size="small"
                              onClick={handleKirimPenawaran}
                            >
                              <SendIcon fontSize="small" />
                              Kirim
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p
                  className="text-center mt-5"
                  style={{ color: "red", fontStyle: "italic" }}
                >
                  Tidak Ada Data
                </p>
              )}
            </div>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Index;
