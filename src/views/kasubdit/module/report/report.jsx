import React, { useState, useEffect } from "react";
import "../../../../views/ptki/admin.css";
import ContentContainer from "../../../../components/card-container/ContentContainer";
import ContentCard from "../../../../components/card-content/ContentCard";
import Checkbox from "@mui/material/Checkbox";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { Helmet } from "react-helmet";
import DetailReport from "../report/detail/detail-report";
import api from "../../../service/api";
import LoadingComponent from "../../../../components/loader/loader";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import * as XLSX from 'xlsx';
import Swal from "sweetalert2";
import { useMediaQuery } from "@mui/material";
import { motion } from 'framer-motion';
import { jsPDF } from 'jspdf';
import html2pdf from 'html2pdf.js';
import { useDarkMode } from "../../../../utils/DarkModeContext";
import { getToken, getRole, getUserId } from "../../../../utils/token";
const Report = () => {
  const [view, setView] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { darkMode } = useDarkMode();
  const [isReadyForExport, setIsReadyForExport] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  useEffect(() => {
    setIsReadyForExport(true);
  }, []);

  const handleExportClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleExportClose = () => {
    setAnchorEl(null);
  };
  const exportToPDF = () => {
    handleExportClose();
    setIsExporting(true);
    const element = document.getElementById('riwayatModalContent');
    if (element) {
      // Create a deep clone of the element to modify for export
      const elementClone = element.cloneNode(true);

      // Remove input date fields and buttons
      const dateInputs = elementClone.querySelectorAll('input[type="date"]');
      dateInputs.forEach(input => input.parentNode.removeChild(input));

      const buttons = elementClone.querySelectorAll('button');
      buttons.forEach(button => button.parentNode.removeChild(button));

      // Modify "Periode :" and "Sampai :" text to include the actual dates
      const paragraphs = elementClone.querySelectorAll('p');
      paragraphs.forEach(p => {
        if (p.textContent.includes('Periode :')) {
          p.textContent = `Periode : ${startDate}`;
        } else if (p.textContent.includes('Sampai :')) {
          p.textContent = `Sampai : ${endDate}`;
        }
      });

      // Remove rows that are not selected, the "Detail" column, and the checkbox column
      const tableBody = elementClone.querySelector('tbody');
      const tableHead = elementClone.querySelector('thead');
      if (tableBody && tableHead) {
        // Remove the "Detail" column header and the checkbox column header
        const headers = tableHead.querySelectorAll('th');
        if (headers.length > 1) {
          headers[headers.length - 1].remove(); // Remove "Detail" column
          headers[0].remove(); // Remove checkbox column
        }

        // Remove rows that are not selected, the "Detail" column, and the checkbox column
        Array.from(tableBody.children).forEach((row, index) => {
          if (selectedRows.length > 0 && !selectedRows.includes(rows[index].id)) {
            tableBody.removeChild(row);
          } else {
            // Remove the last cell (Detail button) and the first cell (checkbox)
            const cells = row.querySelectorAll('td');
            if (cells.length > 1) {
              cells[cells.length - 1].remove(); // Remove "Detail" column
              cells[0].remove(); // Remove checkbox column
            }
          }
        });
      }

      const opt = {
        margin: 0.5,
        filename: `report_evaluator_${startDate}_to_${endDate}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all'] },
      };

      html2pdf().set(opt).from(elementClone).save().then(() => {
        setIsExporting(false);
      });
    } else {
      console.log('Element not found!');
      setIsExporting(false);
    }
  };

  const exportToExcel = () => {
    handleExportClose();
    const fileName = 'report_evaluator.xlsx';
    const exportData = selectedRows.length > 0
      ? rowsexcel.filter(row => selectedRows.includes(row.id))
      : rowsexcel;

    const exportDataFormatted = exportData.map((row) => ({
      nama: row.fullName,
      tawarantugas: row.offerCount,
      konfirmasitugas: row.acceptCount,
      selesaipenilaian: row.completeCount,
      honorariumterbayar: row.honorCount,
    }));

    const ws = XLSX.utils.json_to_sheet(exportDataFormatted);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, fileName);
  };

  const handleRowSelect = (id) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };
  const columns = [
    {
      id: "select",
      label: "Pilih",
      flex: 0.5,
      align: "center",
      render: (row) => (
        <Checkbox
          checked={selectedRows.includes(row.id)}
          onChange={() => handleRowSelect(row.id)}
        />
      ),
    },
    {
      id: "nama",
      label: "Nama Evaluator",
      flex: 2,
      align: "left",
    },  
    {
      id: "usulanPenilaianProdi",
      label: "Tawaran Tugas",
      flex: 1,
      align: "left",
    },
    {
      id: "ptki",
      label: "Konfirmasi Tugas",
      flex: 1,
      align: "left",
    },
    {
      id: "tanggalKonfirmasi",
      label: "Selesai Penilaian",
      flex: 1,
      align: "left",
    },
    {
      id: "honorarium",
      label: "Honorarium Terbayar",
      flex: 1,
      align: "left",
    },
    {
      id: "aksi",
      label: "",
      flex: 1,
      align: "center",
    },
  ];

  const isScreenSizeLowerThanMD = useMediaQuery(("(max-width: 550px"))
  // get report asesor
  const [rows, setRows] = useState([]);
  const [rowsexcel, setRowsexcel] = useState([]);
  const today = new Date();
  const fiveDaysAgo = new Date(today);
  fiveDaysAgo.setDate(today.getDate() - 5);
  const defaultStartDate = fiveDaysAgo.toISOString().split("T")[0];
  const defaultEndDate = today.toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [loading, setLoading] = useState(false);
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };
  const fetchData = async () => {
    setLoading(true);
    const accessToken = getToken()
    setTimeout(async () => {
      try {
        const response = await api.get(`/prodi-assesment/asesor-report`, {
          params: {
            startDate: startDate + "T00:00:00Z",
            endDate: endDate + "T23:59:59Z",
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        const data = response.data.data;
        const updatedRows = data.map((item, index) =>
          createData(
            item.id,
            item.fullName,
            item.offerCount,
            item.acceptCount,
            item.completeCount,
            formatCurrency(item.honorCount),
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                setSelectedItem(item.id);
                setView(true);
              }}
            >
              <AssignmentIndIcon fontSize="small" />
              Detail
            </Button>
          )
        );

        setRows(updatedRows);
        setRowsexcel(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `${error.message}`
        });
      }
    }, 1000);
  };

  const handleSearch = () => {
    if (startDate && endDate) {
      fetchData();
    }
  };
  const createData = (
    id,
    nama,
    usulanPenilaianProdi,
    ptki,
    tanggalKonfirmasi,
    honorarium,
    aksi
  ) => {
    return {
      id,
      nama,
      usulanPenilaianProdi,
      ptki,
      tanggalKonfirmasi,
      honorarium,
      aksi,
    };
  };


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Kemenag | Report Evaluator </title>
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="ms-4">
          <div className="d-flex">
            <h2
              className="jdl mb-3 mt-3"
              data-aos="zoom-in-right"
              data-aos-duration="1000"
              style={{ color: darkMode ? "white" : "" }}
            >
              Report Evaluator
            </h2>
          </div>
        </div>
        <ContentCard>
          <div>
            <div className="card-body mx-4">
              {view ? (
                <DetailReport selectedItem={selectedItem} setView={setView} startDate1={startDate} endDate1={endDate} />
              ) : (
                <>
                  {isReadyForExport && (
                    <div id="riwayatModalContent">
                      <h4 style={{ color: darkMode ? "white" : "" }} className="text-center fw-bold mb-4 mt-2 px-3 py-3">
                        LAPORAN KINERJA EVALUATOR
                      </h4>
                      <div className="d-flex flex-md-row flex-column px-3 py-3">
                        <p style={{ color: darkMode ? "white" : "" }} className="me-2">Periode :</p>
                        <input
                          type="date"
                          className="form-control mb-md-0 mb-3 input-date-w100"
                          style={{ width: "200px"}}
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                        />
                        <p style={{ color: darkMode ? "white" : "" }} className="me-2 ms-2">Sampai : </p>
                        <input
                          type="date"
                          className="form-control me-3 mb-md-0 mb-3 input-date-w100"
                          style={{ width: "200px" }}
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                        />

                        {!isExporting && (
                          <React.Fragment>
                            <Button
                              variant="contained"
                              size="small"
                              onClick={handleSearch}
                              sx={{
                                "@media (max-width: 600px)": {
                                  width: "100%",
                                  marginTop: "10px",
                                },
                              }}
                            >
                              <PersonSearchIcon />
                              Proses
                            </Button>
                              <Button
                                variant="outlined"
                                style={{ color: darkMode ? "white" : "grey", borderColor: darkMode ? "white" : "grey" }}
                                className="ms-auto"
                                size="small"
                                onClick={handleExportClick}
                              >
                                <FileUploadIcon />
                                {isScreenSizeLowerThanMD ? '' : 'Export'}
                              </Button>
                              <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleExportClose}
                              >
                                <MenuItem onClick={exportToPDF}>Export to PDF</MenuItem>
                                <MenuItem onClick={exportToExcel}>Export to Excel</MenuItem>
                              </Menu>
                          </React.Fragment>
                        )}
                      </div>
                      <Paper sx={{ width: "100%", overflow: "hidden" }}>
                        <TableContainer component={Paper}>
                          <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow style={{
                                  backgroundColor: darkMode ? "#40679E" : "",
                                  color: darkMode ? "white" : "",
                                }}>
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
                                  rows.map((row) => (
                                    <TableRow
                                      hover
                                      role="checkbox"
                                      tabIndex={-1}
                                      key={row.id}
                                      style={{
                                        backgroundColor: darkMode ? "#40679E" : "",
                                        color: darkMode ? "white" : "",
                                      }}
                                    >
                                      {columns.map((column) => {
                                        if (column.id === "select") {
                                          return (
                                            <TableCell key={column.id} align={column.align}>
                                              {column.render(row)}
                                            </TableCell>
                                          );
                                        }
                                        const value = row[column.id];
                                        return (
                                          <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ color: darkMode ? "white" : "" }}
                                          >
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
                    </div>)}
                </>
              )}
            </div>
          </div>
        </ContentCard>
      </motion.div>
    </>
  );
};

export default Report;
