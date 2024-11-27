import React, { useState, useEffect } from "react";
import "../../../../views/kasubdit/admin-kasubdit.css";
import penilaian from "../../../../assets/penilaian.svg";
import penugasan from "../../../../assets/penugasan.svg";
import ContentContainer from "../../../../components/card-container/ContentContainer";
import ContentCard from "../../../../components/card-content/ContentCard";
import { useNavigate } from "react-router-dom";
import FormTugaskanPenilai from "../../module/penugasan-penilai/form-tugaskan-penilai/formPenugasanPenilai";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import Button from "@mui/material/Button";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Helmet } from "react-helmet";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import InfoIcon from "@mui/icons-material/Info";
import { getToken, getRole, getUserId } from "../../../../utils/token";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Box from "@mui/material/Box";
import api from "../../../service/api";
import * as XLSX from "xlsx";
import { Typography, useMediaQuery } from "@mui/material";
import PenawaranStatusName from "../../../../utils/penawaranStatusName";
import PenawaranStatusIcon from "./utils/PenawaranStatusIcon";
import LoadingComponent from '../../../../components/loader/loader'
import FormTugaskanPenunjukanAl from '../penugasan-penilai/form-tugaskan-lapangan/formPenugasanLapangan'
import WaveIcon from "../../../../components/icons/WaveIcon";
import { motion } from 'framer-motion';
import { ClipLoader } from "react-spinners";
import { useDarkMode } from "../../../../utils/DarkModeContext";
const BerandaKasubdit = () => {
  // assesor
  const { darkMode } = useDarkMode();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 800,
    width: '90%',
    height: '350px',
    bgcolor: darkMode ? "#3C5B6F" : "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
  };
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("penawaran");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryAl, setSearchQueryAl] = useState("");
  const [searchQuery1, setSearchQuery1] = useState("");
  const [filteredRows, setFilteredRows] = useState([]);
  const [filteredRowsAl, setFilteredRowsAl] = useState([]);
  const [filteredRows1, setFilteredRows1] = useState([]);
  const isScreenSizeLowerThanMD = useMediaQuery(("(max-width: 550px"))
  const [data1, setData1] = useState([]);
  const navigate = useNavigate();
  const handleViewChange = (index) => {
    setView(index);
    setLoading(true);
  };

  // export data penawaran
  const exportDataToExcel = () => {
    const data = filteredRows.length > 0 ? filteredRows : rows;
    const exportedData = data.map((row, index) => {
      let konfirmasi;
      if (Array.isArray(row.konfirmasi)) {
        const hasNullAssessmentTime = row.konfirmasi.some(
          (icon) => icon.props.style.color === "red"
        );
        konfirmasi = hasNullAssessmentTime
          ? "Belum Konfirmasi"
          : "Sudah Konfirmasi";
      } else {
        konfirmasi = "Belum Konfirmasi";
      }

      let asesor = "";
      if (Array.isArray(row.asesor)) {
        asesor = row.asesor.map((asesor) => asesor.props.children).join(", ");
      }

      return {
        ...row,
        no: index + 1,
        asesor: asesor,
        konfirmasi: konfirmasi,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(exportedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const dataBlob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const filename = "data.xlsx";

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(dataBlob, filename);
    } else {
      const downloadLink = document.createElement("a");
      downloadLink.href = window.URL.createObjectURL(dataBlob);
      downloadLink.download = filename;
      downloadLink.click();
      window.URL.revokeObjectURL(downloadLink.href);
    }
  };
  // search penawaran
  const handleSearchQueryChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    const filteredPenawaranRows = rows.filter(
      (row) =>
        row.prodi.toLowerCase().includes(query.toLowerCase()) ||
        row.noReg.toLowerCase().includes(query.toLowerCase()) ||
        row.jenjang.toLowerCase().includes(query.toLowerCase()) ||
        row.lembaga.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRows(filteredPenawaranRows);
  };
  // Penawaran AK
  const [rows, setRows] = useState([]);
  const token = getToken();
  const columns = [
    { id: "no", label: "#", minWidth: 40 },
    { id: "noReg", label: "No Registrasi", minWidth: 100 },
    { id: "prodi", label: "Program Studi", minWidth: 120 },
    {
      id: "lembaga",
      label: "Lembaga",
      minWidth: 200,
      align: "center",
    },
    {
      id: "jenjang",
      label: "Jenjang",
      minWidth: 180,
      align: "center",
    },
    {
      id: "asesor",
      label: "Nama Asesor",
      minWidth: 210,
      align: "left",
    },
    {
      id: "action",
      label: "Aksi",
      minWidth: 80,
      align: "center",
    },
  ];
  function createData(no, noReg, prodi, lembaga, jenjang, asesor, action) {
    return { no, noReg, prodi, lembaga, jenjang, asesor, action };
  }
  const getPenawaran = async () => {
    setLoading(true)
    try {
      const response = await api.get("/prodi-assesment", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = response.data.data;
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
      const penawaranRows = data.map((item, index) => {
        const ids = item.id;
        localStorage.setItem("ids", ids);
        const studiId = localStorage.getItem("ids");
        const asesorCount = item.asesors.length;
        // Check if this item's requestTime is within the last 3 days
        const requestDate = new Date(item.requestTime);
        const isWithinLastThreeDays = requestDate >= threeDaysAgo;
        return createData(
          index + 1,
          item.nomorRegistrasi,
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {item.namaProdi}
            {isWithinLastThreeDays && (
              <div
                style={{
                  marginLeft: '10px',
                  backgroundColor: 'green',
                  color: 'white',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '0.8em'
                }}
              >
                Baru
              </div>
            )}
          </div>,
          item.lembaga,
          item.jenjang,
          asesorCount > 0 ? (
            <div>
              {item.asesors.map((asesor, index) => (
                <div key={index} className="d-flex">
                  <div className=" d-flex">
                    {index + 1}. {asesor.asesorFullName}
                    {asesor.status === PenawaranStatusName.AssesmentOffering ? (
                      <PenawaranStatusIcon status={asesor.status} />
                    ) : asesor.status >= PenawaranStatusName.AssesmentOfferAccepted ? (
                      <PenawaranStatusIcon status={asesor.status} />
                    ) : asesor.status === PenawaranStatusName.Rejected ? (
                      <PenawaranStatusIcon status={asesor.status} />
                    ) : asesor.status === PenawaranStatusName.Requested ? (
                      <PenawaranStatusIcon status={asesor.status} />
                    ) : asesor.status === PenawaranStatusName.DocumentCompleted ? (
                      <PenawaranStatusIcon status={asesor.status} />
                    ) : asesor.status === PenawaranStatusName.Confirmed ? (
                      <PenawaranStatusIcon status={asesor.status} />
                    ) : asesor.status === PenawaranStatusName.FixConfirmed ? (
                      <PenawaranStatusIcon status={asesor.status} />
                    ) : asesor.status === PenawaranStatusName.AssesmentInprogress ? (
                      <PenawaranStatusIcon status={asesor.status} />
                    ) : asesor.status === PenawaranStatusName.AssesmentCompleted ? (
                      <PenawaranStatusIcon status={asesor.status} />
                    ) : asesor.status === PenawaranStatusName.AssesmentLocationInProgress ? (
                      <PenawaranStatusIcon status={asesor.status} />
                    ) : asesor.status === PenawaranStatusName.AssesmentLocationCompleted ? (
                      <PenawaranStatusIcon status={asesor.status} />
                    ) : asesor.status === PenawaranStatusName.AssesmentAllCompleted ? (
                      <PenawaranStatusIcon status={asesor.status} />
                    ) : asesor.status === PenawaranStatusName.AssesmentBackToUser ? (
                      <PenawaranStatusIcon status={asesor.status} />
                    ) : asesor.status === PenawaranStatusName.AssesmentExpired ? (
                      <PenawaranStatusIcon status={asesor.status} />
                    ) : asesor.status === PenawaranStatusName.AssesmentCanceled ? (
                      <PenawaranStatusIcon status={asesor.status} />
                    ) : asesor.status === PenawaranStatusName.ValidSK ? (
                      <PenawaranStatusIcon status={asesor.status} />
                    ) : asesor.status === PenawaranStatusName.Approved ? (
                      <PenawaranStatusIcon status={asesor.status} />
                    ) : asesor.status === PenawaranStatusName.AllProcessDone ? (
                      <PenawaranStatusIcon status={asesor.status} />
                    ) : asesor.status === PenawaranStatusName.DalamValidasi ? (
                      <PenawaranStatusIcon status={asesor.status} />
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: "red", fontStyle: "italic", marginTop: "20px" }}>
              Penilai Belum ditugaskan
            </p>
          ),

          <Button
            size="small"
            sx={{
              backgroundColor: "green",
              color: "white",
              paddingX: "10px",
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "translateY(-3px)",
                backgroundColor: "transparent",
                color: "green",
                border: "1px solid green",
                boxShadow: "2px 4px 10px rgba(0, 0, 0, 0.3)",
              },
            }}
            onClick={() => {
              localStorage.setItem("ids", ids);
              localStorage.setItem("studiId", studiId);
              navigate(`/kasubdit/penawaran/${studiId}`);
              handleViewChange(2);
            }}
          >
            <AssignmentIndIcon />
          </Button>
        );
      });
      // await new Promise((resolve) => setTimeout(resolve, 100));
      setRows(penawaranRows);
    } catch (error) {
      console.log("Error fetching Penawaran data:", error);
    } finally {
      setLoading(false);
    };
  };
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //  penunjukan AL
  const [rowsAl, setRowsAl] = useState([]);
  const columnsAl = [
    { id: "no", label: "#", minWidth: 40 },
    { id: "noReg", label: "No Registrasi", minWidth: 100 },
    { id: "prodi", label: "Program Studi", minWidth: 120 },
    {
      id: "lembaga",
      label: "Lembaga",
      minWidth: 200,
      align: "center",
    },
    {
      id: "jenjang",
      label: "Jenjang",
      minWidth: 180,
      align: "center",
    },
    {
      id: "asesor",
      label: "Nama Asesor",
      minWidth: 210,
      align: "left",
    },
    {
      id: "action",
      label: "Aksi",
      minWidth: 80,
      align: "center",
    },
  ];
  function createData(no, noReg, prodi, lembaga, jenjang, asesor, action) {
    return { no, noReg, prodi, lembaga, jenjang, asesor, action };
  }
  const getPenawaranAL = async () => {
    setLoading(true)
    try {
      const response = await api.get("/prodi-assesment-al", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = response.data.data;
      console.log('AL', data);
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
      const penawaranRowsAl = data.map((item, index) => {
        if (item.jenjang === "Sarjana") {
          return null;
        }

        const idsAl = item.id;
        localStorage.setItem("idsAl", idsAl);
        const studiIdAl = localStorage.getItem("idsAl");
        const asesorCount = item.asesorALs ? item.asesorALs.length : 0;
        // Check if this item's requestTime is within the last 3 days
        const requestDate = new Date(item.requestTime);
        const isWithinLastThreeDays = requestDate >= threeDaysAgo;
        return createData(
          index + 1,
          item.nomorRegistrasi,
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {item.namaProdi}
            {isWithinLastThreeDays && (
              <div
                style={{
                  marginLeft: '10px',
                  backgroundColor: 'green',
                  color: 'white',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '0.8em'
                }}
              >
                Baru
              </div>
            )}
          </div>,
          item.lembaga,
          item.jenjang,
          asesorCount > 0 ? (
            <div>
              {item.asesorALs.map((asesor, index) => (
                <div key={index} className="d-flex">
                  <div className="d-flex">
                    {index + 1}. {asesor.asesorFullName}
                    {asesor.status === PenawaranStatusName.AssesmentOffering ? (
                      <PenawaranStatusIcon status={asesor.status} />
                    ) : asesor.status >= PenawaranStatusName.AssesmentOfferAccepted ? (
                      <PenawaranStatusIcon status={asesor.status} />
                    ) : asesor.status === PenawaranStatusName.Rejected ? (
                      <PenawaranStatusIcon status={asesor.status} />
                    ) : asesor.status === PenawaranStatusName.Requested ? (
                      <PenawaranStatusIcon status={asesor.status} />
                    ) : asesor.status === PenawaranStatusName.DocumentCompleted ? (
                      <PenawaranStatusIcon status={asesor.status} />
                    ) : asesor.status === PenawaranStatusName.Confirmed ? (
                      <PenawaranStatusIcon status={asesor.status} />
                    ) : asesor.status === PenawaranStatusName.FixConfirmed ? (
                      <PenawaranStatusIcon status={asesor.status} />
                    ) : asesor.status === PenawaranStatusName.AssesmentInprogress ? (
                      <PenawaranStatusIcon status={asesor.status} />
                    ) : asesor.status === PenawaranStatusName.AssesmentCompleted ? (
                      <PenawaranStatusIcon status={asesor.status} />
                    ) : asesor.status === PenawaranStatusName.AssesmentLocationInProgress ? (
                      <PenawaranStatusIcon status={asesor.status} />
                    ) : asesor.status === PenawaranStatusName.AssesmentLocationCompleted ? (
                      <PenawaranStatusIcon status={asesor.status} />
                    ) : asesor.status === PenawaranStatusName.AssesmentAllCompleted ? (
                      <PenawaranStatusIcon status={asesor.status} />
                    ) : asesor.status === PenawaranStatusName.AssesmentBackToUser ? (
                      <PenawaranStatusIcon status={asesor.status} />
                    ) : asesor.status === PenawaranStatusName.AssesmentExpired ? (
                      <PenawaranStatusIcon status={asesor.status} />
                    ) : asesor.status === PenawaranStatusName.AssesmentCanceled ? (
                      <PenawaranStatusIcon status={asesor.status} />
                    ) : asesor.status === PenawaranStatusName.ValidSK ? (
                      <PenawaranStatusIcon status={asesor.status} />
                    ) : asesor.status === PenawaranStatusName.Approved ? (
                      <PenawaranStatusIcon status={asesor.status} />
                    ) : asesor.status === PenawaranStatusName.AllProcessDone ? (
                      <PenawaranStatusIcon status={asesor.status} />
                    ) : asesor.status === PenawaranStatusName.DalamValidasi ? (
                      <PenawaranStatusIcon status={asesor.status} />
                    ) : asesor.status === PenawaranStatusName.AssesmentLocationAssigned ? (
                      <PenawaranStatusIcon status={asesor.status} />
                    ) : asesor.status === PenawaranStatusName.AssesmentLocationInProgress ? (
                      <PenawaranStatusIcon status={asesor.status} />
                    ) : asesor.status === PenawaranStatusName.AssesmentLocationCompleted ? (
                      <PenawaranStatusIcon status={asesor.status} />
                    ) : asesor.status === PenawaranStatusName.AssesmentLocationAllCompleted ? (
                      <PenawaranStatusIcon status={asesor.status} />
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: "red", fontStyle: "italic", marginTop: "20px" }}>
              Penilai Belum ditugaskan
            </p>
          ),
          <Button
            size="small"
            sx={{
              backgroundColor: "green",
              color: "white",
              paddingX: "10px",
              boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "translateY(-3px)",
                backgroundColor: "transparent",
                color: "green",
                border: "1px solid green",
                boxShadow: "2px 4px 10px rgba(0, 0, 0, 0.3)",
              },
            }}
            onClick={() => {
              localStorage.setItem("idsAl", idsAl);
              localStorage.setItem("studiIdAl", studiIdAl);
              navigate(`/kasubdit/penugasan/${studiIdAl}`);
              handleViewChange(3);
            }}
          >
            <AssignmentIndIcon />
          </Button>
        );
      }).filter(Boolean);
      // await new Promise((resolve) => setTimeout(resolve, 100));
      setRowsAl(penawaranRowsAl);
    } catch (error) {
      console.log("Error fetching Penawaran data:", error);
    } finally {
      setLoading(false);
    };
  }
  const [pageAl, setPageAl] = React.useState(0);
  const [rowsPerPageAl, setRowsPerPageAl] = React.useState(5);
  const handleChangePageAl = (event, newPage) => {
    setPageAl(newPage);
  };
  const handleChangeRowsPerPageAl = (event) => {
    setRowsPerPageAl(+event.target.value);
    setPageAl(0);
  };
  // export data Al
  const exportDataToExcelAl = () => {
    const data = filteredRowsAl.length > 0 ? filteredRowsAl : rowsAl;
    const exportedData = data.map((row, index) => {
      let konfirmasi;
      if (Array.isArray(row.konfirmasi)) {
        const hasNullAssessmentTime = row.konfirmasi.some(
          (icon) => icon.props.style.color === "red"
        );
        konfirmasi = hasNullAssessmentTime
          ? "Belum Konfirmasi"
          : "Sudah Konfirmasi";
      } else {
        konfirmasi = "Belum Konfirmasi";
      }

      let asesor = "";
      if (Array.isArray(row.asesor)) {
        asesor = row.asesor.map((asesor) => asesor.props.children).join(", ");
      }

      return {
        ...row,
        no: index + 1,
        asesor: asesor,
        konfirmasi: konfirmasi,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(exportedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const dataBlob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const filename = "dataAl.xlsx";

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(dataBlob, filename);
    } else {
      const downloadLink = document.createElement("a");
      downloadLink.href = window.URL.createObjectURL(dataBlob);
      downloadLink.download = filename;
      downloadLink.click();
      window.URL.revokeObjectURL(downloadLink.href);
    }
  };
  // search Al
  const handleSearchQueryChangeAl = (event) => {
    const query = event.target.value;
    setSearchQueryAl(query);
    const filteredPenawaranRowsAl = rowsAl.filter(
      (row) =>
        row.prodi.toLowerCase().includes(query.toLowerCase()) ||
        row.noReg.toLowerCase().includes(query.toLowerCase()) ||
        row.jenjang.toLowerCase().includes(query.toLowerCase()) ||
        row.lembaga.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRowsAl(filteredPenawaranRowsAl);
    console.log('search al', filteredPenawaranRowsAl);
  };


  // Daftar penilai Asesor
  const exportDataToExcel1 = () => {
    const dataToExport = filteredRows1.length > 0 ? filteredRows1 : rows1;
    const exportedData = dataToExport.map((row, index) => {
      return {
        no: index + 1,
        asesor: row.asesor,
        prodi: row.prodi,
        jenjang: row.jenjang,
        lembaga: row.lembaga,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(exportedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const dataBlob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const filename = "data.xlsx";
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(dataBlob, filename);
    } else {
      const downloadLink = document.createElement("a");
      downloadLink.href = window.URL.createObjectURL(dataBlob);
      downloadLink.download = filename;
      downloadLink.click();
      window.URL.revokeObjectURL(downloadLink.href);
    }
  };
  const [rows1, setRows1] = useState([]);
  const handleSearchQueryChange1 = (event) => {
    const query = event.target.value;
    setSearchQuery1(query);
    const filteredPenilaiRows1 = rows1.filter((row) => {
      const asesorLowerCase = row.asesor.toLowerCase();
      const jenjangLowerCase = String(row.jenjang).toLowerCase();
      const lembagaLowerCase = String(row.lembaga).toLowerCase();

      return (
        asesorLowerCase.includes(query.toLowerCase()) ||
        jenjangLowerCase.includes(query.toLowerCase()) ||
        lembagaLowerCase.includes(query.toLowerCase())
      );
    });
    setFilteredRows1(filteredPenilaiRows1);
  };
  const columns1 = [
    { id: "no", label: "#", minWidth: 40 },
    { id: "asesor", label: "Nama Asesor", minWidth: 130, align: "left" },
    {
      id: "prodi",
      label: "Program Studi",
      minWidth: 200,
      align: "center",
    },
    {
      id: "jenjang",
      label: "Jenjang",
      minWidth: 100,
      align: "left",
    },
    {
      id: "lembaga",
      label: "Lembaga",
      minWidth: 100,
      align: "center",
    },

    {
      id: "action",
      label: "Aksi",
      minWidth: 130,
      align: "center",
    },
  ];
  function createData1(no, asesor, prodi, jenjang, lembaga, status, action) {
    return { no, asesor, prodi, jenjang, lembaga, status, action };
  }
  const getPenilai = async () => {
    setLoading(true)
    try {
      const response = await api.get("/prodi-assesment", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = response.data.data;
      const penilaiRows1 = [];
      data.forEach((item) => {
        if (item.asesors.length > 0) {
          item.asesors.forEach((asesor) => {
            const namaProdi = item.namaProdi || (
              <span style={{ color: "red", fontStyle: "italic" }}>
                Data Not Found
              </span>
            );
            const jenjang = item.jenjang || (
              <span style={{ color: "red", fontStyle: "italic" }}>
                Data Not Found
              </span>
            );
            const lembaga = item.lembaga || (
              <span style={{ color: "red", fontStyle: "italic" }}>
                Data Not Found
              </span>
            );
            const statusIcon =
              asesor.assesmentAcceptedTime === null ? (
                <ContactSupportIcon color="error" />
              ) : (
                <CheckCircleIcon color="success" />
              );
            const rowData = createData1(
              penilaiRows1.length + 1,
              asesor.asesorFullName,
              namaProdi,
              jenjang,
              lembaga,
              <div>{statusIcon}</div>,
              <Button
                size="small"
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  paddingX: "10px",
                  boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    backgroundColor: "transparent",
                    color: "green",
                    border: "1px solid green",
                    boxShadow: "2px 4px 10px rgba(0, 0, 0, 0.3)",
                  },
                }}
                onClick={() => handleOpen(item)}
              >
                <InfoIcon />
              </Button>
            );

            penilaiRows1.push(rowData);
          });
        }
      });
      // await new Promise((resolve) => setTimeout(resolve, 100));
      setRows1(penilaiRows1);
    } catch (error) {
      console.log("Error fetching Daftar Penilai Asesor data:", error);
    } finally {
      setLoading(false);
    };
  };
  const handleOpen = async (item) => {
    try {
      const response = await api.get(`/prodi-assesment/${item.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData1(response.data.data);
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  };
  const [page1, setPage1] = React.useState(0);
  const [rowsPerPage1, setRowsPerPage1] = React.useState(5);
  const handleChangePage1 = (event, newPage) => {
    setPage1(newPage);
  };
  const handleChangeRowsPerPage1 = (event) => {
    setRowsPerPage1(+event.target.value);
    setPage1(0);
  };

  useEffect(() => {
    if (loading) {
      getPenawaran(view);
      getPenilai(view);
      getPenawaranAL(view)
    }
  }, [loading, view]);
  useEffect(() => {
    getPenawaran(view);
    getPenilai(view);
    getPenawaranAL(view)
  }, []);
  return (
    <>
      <Helmet>
        <title>Kemenag | Penawaran </title>
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {view === "penawaran" ? (
          <>
            <div className="ms-4">
              <div className="d-flex mb-2">
                <h2
                  className="jdl"
                  data-aos="zoom-in-right"
                  data-aos-duration="1000"
                  style={{ color: darkMode ? "white" : "" }}
                >
                  Penawaran Penilai
                </h2>
              </div>
            </div>
            <div className="d-flex">
              <button
                className="btn border-0 d-flex align-items-center justify-content-center"
                style={{
                  boxShadow: "none",
                  background: view === "penawaran"
                    ? (darkMode ? "#3C5B6F" : "#FFF")
                    : (darkMode ? "transparent" : null),
                  borderRadius: "8px 8px 0px 0px",
                  width: "224px",
                  height: "48px",
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: view === "penawaran"
                    ? (darkMode ? "white" : "#0F56B3")
                    : (darkMode ? "white" : "#1C1C1C"),
                  gap: "5px",
                }}
                onClick={() => handleViewChange("penawaran")}
              >
                <span style={{ fontSize: '22px' }} role="img" aria-label="Penawaran" className="me-2">📋</span>
                Penugasan Validator
                {loading && view === "penawaran" && <ClipLoader size={18} className="ms-1 mt-2" />}
              </button>
              {/* <button
                className="btn border-0 d-flex align-items-center justify-content-center"
                style={{
                  boxShadow: "none",
                  background: view === "penugasanal"
                    ? (darkMode ? "#3C5B6F" : "#FFF")
                    : (darkMode ? "transparent" : null),
                  borderRadius: "8px 8px 0px 0px",
                  width: "224px",
                  height: "48px",
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: view === "penugasanal"
                    ? (darkMode ? "white" : "#0F56B3")
                    : (darkMode ? "white" : "#1C1C1C"),
                  gap: "5px",
                }}
                onClick={() => handleViewChange("penugasanal")}
              >
                <span style={{ fontSize: '22px' }} role="img" aria-label="Penugasan AL" className="me-2">📝</span>
                Penugasan Validator
                {loading && view === "penugasanal" && <ClipLoader size={18} className="ms-1 mt-2" />}
              </button> */}
              <button
                className="btn border-0 d-flex align-items-center justify-content-center"
                style={{
                  boxShadow: "none",
                  background: view === "penilai"
                    ? (darkMode ? "#3C5B6F" : "#FFF")
                    : (darkMode ? "transparent" : null),
                  borderRadius: "8px 8px 0px 0px",
                  width: "270px",
                  height: "48px",
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: view === "penilai"
                    ? (darkMode ? "white" : "#0F56B3")
                    : (darkMode ? "white" : "#1C1C1C"),
                  gap: "5px",
                }}
                onClick={() => handleViewChange("penilai")}
              >
                <span style={{ fontSize: '22px' }} role="img" aria-label="Daftar Penilai / Asesor">👥</span>
                Daftar Validator
                {loading && view === "penilai" && <ClipLoader size={18} className="ms-1 mt-2" />}
              </button>
            </div>

            <ContentCard>
              <div className=" col-12 px-3 py-3">
                <h3 className="mb-3" style={{ color: darkMode ? "white" : "" }}>Daftar Penawaran yang di Tugaskan</h3>
              </div>
              <div className="row d-flex mb-4  py-3 px-3">
                <div className="col-md-6 col-3">
                  <Button
                    variant="outlined"
                    style={{ color: darkMode ? "white" : "grey", borderColor: darkMode ? "white" : "grey" }}
                    size="small"
                    onClick={exportDataToExcel}
                  >
                    <FileUploadIcon />
                    {isScreenSizeLowerThanMD ? '' : 'Export data'}
                  </Button>
                </div>

                <div className="col-6">
                  <div
                    className="input-group flex-nowrap"
                    data-aos="zoom-in-left"
                    data-aos-duration="1000"
                  >
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Pencarian"
                      aria-label="UserName"
                      aria-describedby="addon-wrapping"
                      value={searchQuery}
                      onChange={handleSearchQueryChange}
                    />
                  </div>
                </div>
              </div>
              <Paper
                sx={{
                  width: "97.8%",
                  overflow: "hidden",
                  marginTop: "20px",
                }}
                className="m-3"
              >
                <TableContainer >
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
                      <TableRow>
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
                        (searchQuery !== "" ? filteredRows : rows)
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((row, index) => (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={row.code || index}
                              style={{ backgroundColor: darkMode ? "#40679E" : "", color: darkMode ? "white" : "" }}
                            >
                              {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ color: darkMode ? "white" : "" }}
                                  >
                                    {column.format && typeof value === "number" ? column.format(value) : value}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          ))
                      )}
                    </TableBody>

                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, 100]}
                  component="div"
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  style={{
                    backgroundColor: darkMode ? "#40679E" : "",
                    color: darkMode ? "white" : "",
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
            </ContentCard>

          </>
        ) : view === "penilai" ? (
          <>
            <div className="container  ">
              <div className="d-flex mb-5">
                <h2
                  className="jdl"
                  data-aos="zoom-in-right"
                  data-aos-duration="1000"
                  style={{ color: darkMode ? "white" : "" }}
                >
                  Penawaran Penilai
                </h2>
              </div>
            </div>
            <div className="d-flex">
              <button
                className="btn border-0 d-flex align-items-center justify-content-center"
                style={{
                  boxShadow: "none",
                  background: view === "penawaran"
                    ? (darkMode ? "#3C5B6F" : "#FFF")
                    : (darkMode ? "transparent" : null),
                  borderRadius: "8px 8px 0px 0px",
                  width: "224px",
                  height: "48px",
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: view === "penawaran"
                    ? (darkMode ? "white" : "#0F56B3")
                    : (darkMode ? "white" : "#1C1C1C"),
                  gap: "5px",
                }}
                onClick={() => handleViewChange("penawaran")}
              >
                <span style={{ fontSize: '22px' }} role="img" aria-label="Penawaran" className="me-2">📋</span>
                Penugasan Validator
                {loading && view === "penawaran" && <ClipLoader size={18} className="ms-1 mt-2" />}
              </button>
              {/* <button
                className="btn border-0 d-flex align-items-center justify-content-center"
                style={{
                  boxShadow: "none",
                  background: view === "penugasanal"
                    ? (darkMode ? "#3C5B6F" : "#FFF")
                    : (darkMode ? "transparent" : null),
                  borderRadius: "8px 8px 0px 0px",
                  width: "224px",
                  height: "48px",
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: view === "penugasanal"
                    ? (darkMode ? "white" : "#0F56B3")
                    : (darkMode ? "white" : "#1C1C1C"),
                  gap: "5px",
                }}
                onClick={() => handleViewChange("penugasanal")}
              >
                <span style={{ fontSize: '22px' }} role="img" aria-label="Penugasan AL" className="me-2">📝</span>
                Penugasan Validator
                {loading && view === "penugasanal" && <ClipLoader size={18} className="ms-1 mt-2" />}
              </button> */}
              <button
                className="btn border-0 d-flex align-items-center justify-content-center"
                style={{
                  boxShadow: "none",
                  background: view === "penilai"
                    ? (darkMode ? "#3C5B6F" : "#FFF")
                    : (darkMode ? "transparent" : null),
                  borderRadius: "8px 8px 0px 0px",
                  width: "270px",
                  height: "48px",
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: view === "penilai"
                    ? (darkMode ? "white" : "#0F56B3")
                    : (darkMode ? "white" : "#1C1C1C"),
                  gap: "5px",
                }}
                onClick={() => handleViewChange("penilai")}
              >
                <span style={{ fontSize: '22px' }} role="img" aria-label="Daftar Penilai / Asesor">👥</span>
                Daftar Validator
                {loading && view === "penilai" && <ClipLoader size={18} className="ms-1 mt-2" />}
              </button>
            </div>
            <ContentCard>
              <div className=" col-12  ">
                <h3 style={{ color: darkMode ? "white" : "" }} className="mb-3 px-3 py-3">Daftar Seluruh Penilai</h3>
              </div>
              <div className="row d-flex mb-4 px-3 py-3">
                <div className="col-md-6 col-3">
                  <Button
                    variant="outlined"
                    style={{ color: darkMode ? "white" : "grey", borderColor: darkMode ? "white" : "grey" }}
                    size="small"
                    onClick={exportDataToExcel1}
                  >
                    <FileUploadIcon />
                    {isScreenSizeLowerThanMD ? '' : 'Export data'}
                  </Button>
                </div>

                <div className="col-6">
                  <div
                    className="input-group flex-nowrap"
                    data-aos="zoom-in-left"
                    data-aos-duration="1000"
                  >
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Pencarian"
                      aria-label="UserName"
                      aria-describedby="addon-wrapping"
                      value={searchQuery1}
                      onChange={handleSearchQueryChange1}
                    />
                  </div>
                </div>
              </div>
              <Paper
                sx={{
                  width: "97.8%",
                  overflow: "hidden",
                  marginTop: "20px",
                }}
                className="m-3"
              >
                <TableContainer >
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow style={{
                        backgroundColor: darkMode ? "#40679E" : "",
                        color: darkMode ? "white" : "",
                      }}>
                        {columns1.map((column1) => (
                          <TableCell
                            key={column1.id}
                            align={column1.align}
                            style={{
                              minWidth: column1.minWidth, backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                              border: "none",
                              color: darkMode ? "white" : "",
                            }}
                          >
                            {column1.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {loading ? (
                        <LoadingComponent columns={columns} />
                      ) : rows1.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={columns.length} align="center" style={{ color: darkMode ? "" : "" }}>
                            DATA TIDAK TERSEDIA
                          </TableCell>
                        </TableRow>
                      ) : (
                        (searchQuery1 !== "" ? filteredRows1 : rows1)
                          .slice(page1 * rowsPerPage1, page1 * rowsPerPage1 + rowsPerPage1)
                          .map((row, index) => (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={row.code || index}
                              style={{ backgroundColor: darkMode ? "#40679E" : "", color: darkMode ? "white" : "" }}
                            >
                              {columns1.map((column1) => {
                                const value = row[column1.id];
                                return (
                                  <TableCell
                                    key={column1.id}
                                    align={column1.align}
                                    style={{ color: darkMode ? "white" : "" }}
                                  >
                                    {column1.format && typeof value === "number" ? column1.format(value) : value}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, 100]}
                  component="div"
                  count={rows1.length}
                  rowsPerPage={rowsPerPage1}
                  page={page1}
                  style={{
                    backgroundColor: darkMode ? "#40679E" : "",
                    color: darkMode ? "white" : "",
                  }}
                  onPageChange={handleChangePage1}
                  onRowsPerPageChange={handleChangeRowsPerPage1}
                />
              </Paper>
            </ContentCard>
          </>
        ) : view === "penugasanal" ? (
          <>
            <div className="ms-4">
              <div className="d-flex mb-5">
                <h2
                  className="jdl"
                  data-aos="zoom-in-right"
                  data-aos-duration="1000"
                  style={{ color: darkMode ? "white" : "" }}
                >
                  Penugasan AL
                </h2>
              </div>
            </div>
            <div className="d-flex">
              <button
                className="btn border-0 d-flex align-items-center justify-content-center"
                style={{
                  boxShadow: "none",
                  background: view === "penawaran"
                    ? (darkMode ? "#3C5B6F" : "#FFF")
                    : (darkMode ? "transparent" : null),
                  borderRadius: "8px 8px 0px 0px",
                  width: "224px",
                  height: "48px",
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: view === "penawaran"
                    ? (darkMode ? "white" : "#0F56B3")
                    : (darkMode ? "white" : "#1C1C1C"),
                  gap: "5px",
                }}
                onClick={() => handleViewChange("penawaran")}
              >
                <span style={{ fontSize: '22px' }} role="img" aria-label="Penawaran" className="me-2">📋</span>
                Penugasan Validator
                {loading && view === "penawaran" && <ClipLoader size={18} className="ms-1 mt-2" />}
              </button>
              {/* <button
                className="btn border-0 d-flex align-items-center justify-content-center"
                style={{
                  boxShadow: "none",
                  background: view === "penugasanal"
                    ? (darkMode ? "#3C5B6F" : "#FFF")
                    : (darkMode ? "transparent" : null),
                  borderRadius: "8px 8px 0px 0px",
                  width: "224px",
                  height: "48px",
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: view === "penugasanal"
                    ? (darkMode ? "white" : "#0F56B3")
                    : (darkMode ? "white" : "#1C1C1C"),
                  gap: "5px",
                }}
                onClick={() => handleViewChange("penugasanal")}
              >
                <span style={{ fontSize: '22px' }} role="img" aria-label="Penugasan AL" className="me-2">📝</span>
                Penugasan Validator
                {loading && view === "penugasanal" && <ClipLoader size={18} className="ms-1 mt-2" />}
              </button> */}
              <button
                className="btn border-0 d-flex align-items-center justify-content-center"
                style={{
                  boxShadow: "none",
                  background: view === "penilai"
                    ? (darkMode ? "#3C5B6F" : "#FFF")
                    : (darkMode ? "transparent" : null),
                  borderRadius: "8px 8px 0px 0px",
                  width: "270px",
                  height: "48px",
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: view === "penilai"
                    ? (darkMode ? "white" : "#0F56B3")
                    : (darkMode ? "white" : "#1C1C1C"),
                  gap: "5px",
                }}
                onClick={() => handleViewChange("penilai")}
              >
                <span style={{ fontSize: '22px' }} role="img" aria-label="Daftar Penilai / Asesor">👥</span>
                Daftar Validator
                {loading && view === "penilai" && <ClipLoader size={18} className="ms-1 mt-2" />}
              </button>
            </div>
            <ContentCard>
              <div className=" col-12 px-3 py-3">
                <h3 className="mb-3" style={{ color: darkMode ? "white" : "" }}>Daftar Penugasan AL</h3>
              </div>
              <div className="row d-flex mb-4  py-3 px-3">
                <div className="col-md-6 col-3">
                  <Button
                    variant="outlined"
                    style={{ color: darkMode ? "white" : "grey", borderColor: darkMode ? "white" : "grey" }}
                    size="small"
                    onClick={exportDataToExcelAl}
                  >
                    <FileUploadIcon />
                    {isScreenSizeLowerThanMD ? '' : 'Export data'}
                  </Button>
                </div>

                <div className="col-6">
                  <div
                    className="input-group flex-nowrap"
                    data-aos="zoom-in-left"
                    data-aos-duration="1000"
                  >
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Pencarian"
                      aria-label="UserName"
                      aria-describedby="addon-wrapping"
                      value={searchQueryAl}
                      onChange={handleSearchQueryChangeAl}
                    />
                  </div>
                </div>
              </div>
              <Paper
                sx={{
                  width: "97.8%",
                  overflow: "hidden",
                  marginTop: "20px",

                }}
                className="m-3"
              >
                <TableContainer >
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow style={{
                        backgroundColor: darkMode ? "#40679E" : "",
                        color: darkMode ? "white" : "",
                      }}>
                        {columnsAl.map((column) => (
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
                      <TableRow>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {loading ? (
                        <LoadingComponent columns={columns} />
                      ) : rowsAl.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={columns.length} align="center" style={{ color: darkMode ? "" : "" }}>
                            DATA TIDAK TERSEDIA
                          </TableCell>
                        </TableRow>
                      ) : (
                        (searchQueryAl !== "" ? filteredRowsAl : rowsAl)
                          .slice(pageAl * rowsPerPageAl, pageAl * rowsPerPageAl + rowsPerPageAl)
                          .map((row, index) => (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={row.code || index}
                              style={{ backgroundColor: darkMode ? "#40679E" : "", color: darkMode ? "white" : "" }}
                            >
                              {columnsAl.map((column) => {
                                const value = row[column.id];
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ color: darkMode ? "white" : "" }}
                                  >
                                    {column.format && typeof value === "number" ? column.format(value) : value}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, 100]}
                  component="div"
                  count={rowsAl.length}
                  rowsPerPage={rowsPerPageAl}
                  page={pageAl}
                  style={{
                    backgroundColor: darkMode ? "#40679E" : "",
                    color: darkMode ? "white" : "",
                  }}
                  onPageChange={handleChangePageAl}
                  onRowsPerPageChange={handleChangeRowsPerPageAl}
                />
              </Paper>
            </ContentCard>
          </>
        ) : null}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {view === 2 ? <FormTugaskanPenilai setView={setView} /> : null}
        {view === 3 ? <FormTugaskanPenunjukanAl setView={setView} /> : null}
      </motion.div>
      {/* detail */}
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
              textAlign: "center",
              fontSize: "23px",
              fontWeight: "600",
              marginTop: "30px",
              color: darkMode ? "white" : "",
            }}
          >
            Data Penilai
          </Typography>
          <Box sx={{ padding: 4 }}>
            {data1.map((item) => (
              <div key={item.id}>
                <Typography style={{ color: darkMode ? "white" : "", }}>
                  Nomor Registrasi : <b>{item.nomorRegistrasi}</b>
                </Typography>
                <br />
                <Typography style={{ color: darkMode ? "white" : "", }}>
                  Lembaga : <b>{item.lembaga}</b>
                </Typography>
                <br />
                <Typography style={{ color: darkMode ? "white" : "", }}>
                  Nama Prodi : <b>{item.namaProdi}</b>
                </Typography>
                <br />
                <Typography style={{ color: darkMode ? "white" : "", }}>
                  Jenjang : <b>{item.jenjang}</b>
                </Typography>

              </div>
            ))}
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default BerandaKasubdit;
