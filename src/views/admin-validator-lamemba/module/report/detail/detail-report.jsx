import React, { useState, useEffect } from "react";
import "../../../../../views/ptki/admin.css";
import ContentCard from "../../../../../components/card-content/ContentCard";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { Helmet } from "react-helmet";
import api from '../../../../service/api'
import LoadingComponent from '../../../../../components/loader/loader'
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CreateIcon from "@mui/icons-material/Create";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import Swal from 'sweetalert2';
import FileUploadIcon from "@mui/icons-material/FileUpload";
import * as XLSX from 'xlsx';
import { useMediaQuery } from "@mui/material";
import html2pdf from 'html2pdf.js';
import { useDarkMode } from "../../../../../utils/DarkModeContext";
import { getRole, getToken, getUserId } from "../../../../../utils/token";

const Report = ({ selectedItem, setView, endDate1, startDate1 }) => {
  const [open, setOpen] = useState(false);
  const [honorarium, setHonorarium] = useState("");
  const [honorariumDate, setHonorariumDate] = useState("");
  const [saving, setSaving] = useState(false);
  const [isReadyForExport, setIsReadyForExport] = useState(false);
  const [fullName, setFullName] = useState([]);
  useEffect(() => {
    setIsReadyForExport(true);
  }, []);

  const exportToPDF = () => {
    try {
      const element = document.getElementById('riwayatModalContent');
      if (element) {
        const opt = {
          margin: 0.1,
          filename: 'report evaluator.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
          pagebreak: { mode: ['avoid-all'] },
        };
        html2pdf().set(opt).from(element).save();
      } else {
        console.log('Element not found!');
      }
    } catch (error) {
      console.error('Error exporting PDF:', error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `${error.message}`
      });
    }
  };

  const handleOpen = (rowData) => {
    setOpen(true);
    setHonorarium(rowData.assesmentHonorarium);

    if (rowData.assessmentHonorariumTime) {
      setHonorariumDate(rowData.assessmentHonorariumTime.split("T")[0]);
    } else {
      const today = new Date().toISOString().split("T")[0];
      setHonorariumDate(today);
    }
  };
  useEffect(() => {
    const initialRole = fullName?.role;

    if (initialRole === "AsesorKepala") {
      setAssessmentType("Honor Asesment AK");
      setPosition("asesor kepala");
      setHonorarium("1800000");
    } else if (initialRole === "AsesorAnggota") {
      setAssessmentType("Honor Asesment AK");
      setPosition("asesor anggota");
      setHonorarium("1575000");
    } else if (initialRole === "AsesorKepala") {
      setAssessmentType("Honor Asesment Lapangan (AL)");
      setPosition("asesor kepala");
      setHonorarium("2700000");
    } else if (initialRole === "AsesorAnggota") {
      setAssessmentType("Honor Asesment Lapangan (AL)");
      setPosition("asesor anggota");
      setHonorarium("2160000");
    }
  }, [fullName]);
  const formatAsIDR = (value) => {
    if (!value) return '';

    const numericValue = parseInt(value);
    const formattedValue = numericValue.toLocaleString("id-ID");
    return `Rp ${formattedValue}`;
  };
  const handleClose = () => setOpen(false);
  const columns = [
    { id: "no", label: "No.", flex: 1 },
    {
      id: "usulanPenilaianProdi",
      label: "Tawaran Tugas",
      flex: 1,
      align: "left",
    },
    {
      id: "ptki",
      label: "PTKI",
      flex: 1,
      align: "left",
    },
    {
      id: "jabatan",
      label: "Jabatan",
      flex: 1,
      align: "left",
    },
    {
      id: "tanggalPenunjukan",
      label: "Tanggal Penawaran",
      flex: 1,
      align: "left",
    },
    {
      id: "tanggalKonfirmasi",
      label: "Tanggal diusulkan",
      flex: 1,
      align: "left",
    },
    {
      id: "tanggalPenilaian",
      label: "Tanggal Penilaian",
      flex: 1,
      align: "left",
    },
    {
      id: "honorarium",
      label: "Honorarium",
      flex: 1,
      align: "left",
    },
    {
      id: "pembayaranHonorarium",
      label: "Tanggal Pembayaran",
      flex: 1,
      align: "center",
    },
    {
      id: "action",
      label: "",
      flex: 1,
      align: "center",
    },
  ];
  // get report asesor
  const [rows, setRows] = useState([]);
  const [exportt, setExport] = useState([]);
  const today = new Date();
  const fiveDaysAgo = new Date(today);
  fiveDaysAgo.setDate(today.getDate() - 5);
  const [startDate, setStartDate] = useState(startDate1);
  const [endDate, setEndDate] = useState(endDate1);
  const [loading, setLoading] = useState(false);
  const isScreenSizeLowerThanMD = useMediaQuery(("(max-width: 550px"))
  const dateFormatter = (dateStr) => {
    if (!dateStr) return "-";

    const options = { day: "numeric", month: "long", year: "numeric" };
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("id-ID", options).format(date);
  };

  const fetchData = async () => {
    const accessToken = getToken()
    setLoading(true);
    setTimeout(async () => {
      try {
        const response = await api.get(`/prodi-assesment/asesor-report-detail`, {
          params: {
            asesorId: selectedItem,
            startDate: startDate + 'T00:00:00Z',
            endDate: endDate + 'T23:59:59Z',
          },
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        const data = response.data.data
        const updatedRows = data.map((item, index) => {
          const honorariumFormatted = item.assesmentHonorarium
            ? `Rp. ${item.assesmentHonorarium.toLocaleString("id-ID")}`
            : "-";

          return createData(
            index + 1,
            item.namaProdi,
            item.lembaga,
            item.role,
            dateFormatter(item.assesmentOfferingTime),
            item.assesmentAcceptedTime ? <p className="text-success">Sudah Konfirmasi</p> : <p className="text-danger">Belum Konfirmasi</p>,
            item.assesmentCompletedTime || '-',
            honorariumFormatted,
            dateFormatter(item.assessmentHonorariumTime) || "-",
            roles === 'Bendahara' || roles === 'Kasubdit' && (
              <Button
                variant="contained"
                size="small"
                sx={{ fontSize: "12px" }}
                onClick={() => {
                  localStorage.setItem("selectedAssessmentId", item.assesmentId);
                  handleOpen(item);
                }}
              >
                <CreateIcon fontSize="small" sx={{ fontSize: "19px" }} />

              </Button>
            )
          );
        });
        if (data.length > 0) {
          // Assuming role is consistent for all data entries, take the first one
          const initialRole = data[0].role;

          // Set assessmentType based on role
          if (initialRole === "AsessorKepala") {
            setAssessmentType("Honor Asesment AK");
            setPosition("asesor kepala");
            setHonorarium("1800000");
          } else if (initialRole === "AsessorAnggota") {
            setAssessmentType("Honor Asesment AK");
            setPosition("asesor anggota");
            setHonorarium("1575000");
          } else if (initialRole === "AsesorKepala") {
            setAssessmentType("Honor Asesment Lapangan (AL)");
            setPosition("asesor kepala");
            setHonorarium("2700000");
          } else if (initialRole === "AsesorAnggota") {
            setAssessmentType("Honor Asesment Lapangan (AL)");
            setPosition("asesor anggota");
            setHonorarium("2160000");
          }
          // Set honorarium based on position
          if (position === "asesor kepala") {
            setHonorarium("1800000"); // or set based on your business logic
          } else if (position === "asesor anggota") {
            setHonorarium("1575000"); // or set based on your business logic
          }
        }


        setRows(updatedRows);
        setFullName(response.data.data[0]);
        setExport(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `${error.message}`
        });
      }
    }, 1000)
  };
  const [assessmentType, setAssessmentType] = useState('');
  const [position, setPosition] = useState('');
  const handleSaveHonorarium = async () => {
    setSaving(true);
    setLoading(true);
    const accessToken = getToken()
    const tax = honorarium * 0.15; // Menghitung pajak
    try {
      const response = await api.post(
        "/prodi-assesment/asesor-honor",
        {
          id: localStorage.getItem("selectedAssessmentId"),
          asesorId: selectedItem,
          assesmentHonorarium: honorarium,
          assessmentHonorariumTime: honorariumDate + "T00:00:00Z",
          tax: tax // Menambahkan pajak ke data yang dikirim
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: "Tambah Honorarium Asesor Sukses",
          showConfirmButton: false,
          timer: 1000,
        });
        setRows([]);
        setLoading(false);
        handleClose();
        setTimeout(() => {
          setLoading(false);
          fetchData();
        }, 1000);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Unexpected error',
          text: 'An unexpected error occurred while saving the honorarium.',
          showConfirmButton: false,
          timer: 1000,
        });
      }
    } catch (error) {
      console.error("Error saving honorarium:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error saving honorarium',
        text: 'An error occurred while saving the honorarium.',
        showConfirmButton: false,
        timer: 1000,
      });
      handleClose();
    } finally {
      setSaving(false);
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (startDate && endDate && !saving) {
      fetchData();
    }
  };
  const createData = (
    no,
    usulanPenilaianProdi,
    ptki,
    jabatan,
    tanggalPenunjukan,
    tanggalKonfirmasi,
    tanggalPenilaian,
    honorarium,
    pembayaranHonorarium,
    action
  ) => {
    return {
      no,
      usulanPenilaianProdi,
      ptki,
      jabatan,
      tanggalPenunjukan,
      tanggalKonfirmasi,
      tanggalPenilaian,
      honorarium,
      pembayaranHonorarium,
      action
    };
  };
  useEffect(() => {
    fetchData();
  }, []);
  const { darkMode } = useDarkMode();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 550,
    bgcolor: darkMode ? "#3C5B6F" : "background.paper",
    border: "none",
    boxShadow: 24,
    borderRadius: "10px",
  };
  const roles = getRole()
  return (
    <>
      <Helmet>
        <title>Kemenag | Report Evaluator</title>
      </Helmet>
        <button className="btn btn-outline-danger m-2 mt-3" onClick={() => setView(false)}>Kembali</button>
        {isReadyForExport && (
          <>
            <div className="d-flex  px-3 py-3">
              <p className="me-2" style={{ color: darkMode ? "white" : "" }}>Periode :</p>
              <input
                type="date"
                className="form-control"
                style={{ width: "200px" }}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <p className="me-2 ms-2" style={{ color: darkMode ? "white" : "" }}>Sampai : </p>
              <input
                type="date"
                className="form-control me-3"
                style={{ width: "200px" }}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />

              <Button variant="contained" size="small" onClick={handleSearch}>
                <PersonSearchIcon />
                Proses
              </Button>

              <Button
                variant="outlined"
                style={{ color: darkMode ? "white" : "grey", borderColor: darkMode ? "white" : "grey" }}
                className="ms-auto"
                size="small"
                onClick={exportToPDF}
              >
                <FileUploadIcon />
                {isScreenSizeLowerThanMD ? '' : 'Export'}
              </Button>
            </div>
            <hr />
            <div id="riwayatModalContent">
              <h4 className="text-center fw-bold mb-4 mt-2" style={{ color: darkMode ? "white" : "" }}>
                LAPORAN KINERJA VALIDATOR
              </h4>
              <div className="d-flex m-3">
                <p style={{ color: darkMode ? "white" : "" }}>Nama Evaluator</p>
                <p className="me-2" style={{ marginLeft: '45px', color: darkMode ? "white" : "" }}>:</p>
              <p style={{ color: darkMode ? "white" : "" }}>{fullName.fullName}</p>
              </div>
              <div className="d-flex m-3">
                <p style={{ color: darkMode ? "white" : "" }} className="me-5">Periode</p>
                <p className="me-2" style={{ marginLeft: '60px', color: darkMode ? "white" : "" }}>:</p>
                <p style={{ color: darkMode ? "white" : "" }}>{startDate} : {endDate}</p>
              </div>
              <div className="d-flex m-3">
                <p style={{ color: darkMode ? "white" : "" }} className="me-5">Bank</p>
                <p className="me-2" style={{ marginLeft: '78px', color: darkMode ? "white" : "" }}>:</p>
              <p style={{ color: darkMode ? "white" : "" }}>{fullName.namaBankRek}</p>
              </div>
              <div className="d-flex m-3">
                <p style={{ color: darkMode ? "white" : "" }}>Rekening atas nama</p>
                <p className="me-2" style={{ marginLeft: '11px', color: darkMode ? "white" : "" }}>:</p>
              <p style={{ color: darkMode ? "white" : "" }}>{fullName.namaRek}</p>
              </div>
              <div className="d-flex m-3">
                <p style={{ marginRight: '46px', color: darkMode ? "white" : "" }}>Nomor Rekening</p>
                <p className="me-2" style={{ marginLeft: '-11px', color: darkMode ? "white" : "" }}>:</p>
              <p className="me-2" style={{ color: darkMode ? "white" : "" }}>{fullName.noRek}</p>
              </div>
              <Paper className="m-2" sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer component={Paper}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow style={{
                        backgroundColor: darkMode ? "#40679E" : "",
                        color: darkMode ? "white" : "",
                      }} >
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
                          <TableRow style={{
                            backgroundColor: darkMode ? "#40679E" : "",
                            color: darkMode ? "white" : "",
                          }} hover role="checkbox" tabIndex={-1} key={index}>
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
            </div>
          </>
        )
        }
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
          <Box sx={{ padding: 4, marginTop: "10px", color: darkMode ? "white" : "" }}>
            <div className="row col-12">
              <div className="mb-3">
                <label className="form-label">Jenis Asessment</label>
                <select
                  className="form-control"
                  onChange={(e) => {
                    const value = e.target.value;
                    setAssessmentType(value);
                    if (value === "Honor Asesment AK") {
                      setPosition("asesor kepala");
                      setHonorarium("1800000");
                    } else if (value === "Honor Validasi AK") {
                      setPosition("");
                      setHonorarium("300000");
                    } else if (value === "Honor Asesment Lapangan (AL)") {
                      setPosition("asesor kepala");
                      setHonorarium("2700000");
                    } else if (value === "Honor Validasi AL") {
                      setPosition("");
                      setHonorarium("300000");
                    } else {
                      setPosition("");
                      setHonorarium("");
                    }
                  }}
                >
                  <option value="" selected>Pilih Jenis Asessment</option>
                  <option value="Honor Asesment AK">Honor Asesment AK</option>
                  {/* <option value="Honor Validasi AK">Honor Validasi AK</option> */}
                  <option value="Honor Asesment Lapangan (AL)">Honor Asesment Lapangan (AL)</option>
                  {/* <option value="Honor Validasi AL">Honor Validasi AL</option> */}
                </select>
                {["Honor Asesment AK", "Honor Asesment Lapangan (AL)"].includes(assessmentType) && (
                  <>
                    <label className="form-label mt-3">Jabatan</label>
                    <select
                      className="form-control mb-2"
                      value={position}
                      onChange={(e) => {
                        const value = e.target.value;
                        setPosition(value);
                        if (assessmentType === "Honor Asesment AK") {
                          if (value === "asesor kepala") {
                            setHonorarium("1800000");
                          } else if (value === "asesor anggota") {
                            setHonorarium("1575000");
                          }
                        } else if (assessmentType === "Honor Asesment Lapangan (AL)") {
                          if (value === "asesor kepala") {
                            setHonorarium("2700000");
                          } else if (value === "asesor anggota") {
                            setHonorarium("2160000");
                          }
                        }
                      }}
                      disabled
                    >
                      <option value="asesor kepala">Asesor Kepala</option>
                      <option value="asesor anggota">Asesor</option>
                    </select>
                  </>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Honorarium</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  value={formatAsIDR(honorarium)}
                  onChange={(e) => {
                    const inputValue = e.target.value.replace(/[^\d]/g, '');
                    setHonorarium(inputValue);
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Pajak (15%)</label>
                <input
                  type="text"
                  className="form-control"
                  id="taxFormControlInput"
                  value={formatAsIDR(honorarium * 0.15)}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Total Setelah Pajak</label>
                <input
                  type="text"
                  className="form-control"
                  id="totalAfterTaxFormControlInput"
                  value={formatAsIDR(honorarium - (honorarium * 0.15))}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Tanggal Honorarium</label>
                <input
                  type="date"
                  value={honorariumDate}
                  onChange={(e) => setHonorariumDate(e.target.value)}
                  className="form-control"
                  id="exampleFormControlInput1"
                />
              </div>

              {roles === 'Bendahara' || roles === 'Kasubdit' && (
                <div className="mb-3">
                  <label className="form-label">File Honorarium</label>
                  <input
                    type="file"
                    className="form-control"
                    id="exampleFormControlInput1"
                  />
                </div>
              )}
            </div>
            <Stack direction="row" spacing={2}>
              <Button
                size="small"
                variant="contained"
                sx={{ marginLeft: "auto" }}
                onClick={handleSaveHonorarium}
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

export default Report;
