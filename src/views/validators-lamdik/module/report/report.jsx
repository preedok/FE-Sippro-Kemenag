import React, { useState, useEffect } from "react";
import "../../../../views/ptki/admin.css";
import ContentContainer from "../../../../components/card-container/ContentContainer";
import ContentCard from "../../../../components/card-content/ContentCard";
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
import api from "../../../service/api";
import Swal from "sweetalert2";
import LoadingComponent from "../../../../components/loader/loader";
import { motion } from 'framer-motion';
import { useDarkMode } from "../../../../utils/DarkModeContext";
import { getToken, getRole, getUserId } from "../../../../utils/token";
const Report = () => {
  const columns = [
    { id: "no", label: "No.", flex: 1 },
    {
      id: "usulanPenilaianProdi",
      label: "Usulan Penilaian Prodi",
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
      id: "pajakHonorarium",
      label: "Pajak Honorarium (15%)",
      flex: 1,
      align: "left",
    },
    {
      id: "totalAfterTax",
      label: "Total Setelah Pajak",
      flex: 1,
      align: "left",
    },
    {
      id: "pembayaranHonorarium",
      label: "Pembayaran Honorarium",
      flex: 1,
      align: "center",
    },
  ];

  const { darkMode } = useDarkMode()
  // get report asesor
  const [rows, setRows] = useState([]);
  const today = new Date();
  const fiveDaysAgo = new Date(today);
  fiveDaysAgo.setDate(today.getDate() - 5);
  const defaultStartDate = fiveDaysAgo.toISOString().split("T")[0];
  const defaultEndDate = today.toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [loading, setLoading] = useState(false);

  const dateFormatter = (dateStr) => {
    if (!dateStr) return "-";

    const options = { day: "numeric", month: "long", year: "numeric" };
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("id-ID", options).format(date);
  };
  const fetchData = async () => {
    const accessToken = getToken()
    const asesorId = getUserId()
    setLoading(true);
    setTimeout(async () => {
      try {
        const response = await api.get(
          `/prodi-assesment/asesor-report-detail`,
          {
            params: {
              asesorId: Number(asesorId),
              startDate: startDate + "T00:00:00Z",
              endDate: endDate + "T23:59:59Z",
            },
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = response.data.data || [];
        const updatedRows = data.map((item, index) => {
          const honorarium = item.assesmentHonorarium;
          const tax = honorarium ? honorarium * 0.15 : 0;
          const totalAfterTax = honorarium ? honorarium - tax : 0;
          const honorariumFormatted = honorarium
            ? `Rp. ${honorarium.toLocaleString("id-ID")}`
            : <p className="text-danger">Belum di Bayar</p>;
          const taxFormatted = `Rp. ${tax.toLocaleString("id-ID")}`;
          const totalAfterTaxFormatted = `Rp. ${totalAfterTax.toLocaleString("id-ID")}`;
          return createData(
            index + 1,
            item.namaProdi,
            item.lembaga,
            dateFormatter(item.assesmentOfferingTime),
            item.assesmentAcceptedTime
              ? <p className="text-success">Sudah Konfirmasi</p>
              : <p className="text-danger">Belum Konfirmasi</p>,
            item.assesmentCompletedTime || "-",
            honorariumFormatted,
            taxFormatted,
            totalAfterTaxFormatted,
            dateFormatter(item.assessmentHonorariumTime) || "-"
          );
        });

        setRows(updatedRows);
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
    no,
    usulanPenilaianProdi,
    ptki,
    tanggalPenunjukan,
    tanggalKonfirmasi,
    tanggalPenilaian,
    honorarium,
    pajakHonorarium,
    totalAfterTax,
    pembayaranHonorarium
  ) => {
    return {
      no,
      usulanPenilaianProdi,
      ptki,
      tanggalPenunjukan,
      tanggalKonfirmasi,
      tanggalPenilaian,
      honorarium,
      pajakHonorarium,
      totalAfterTax,
      pembayaranHonorarium,
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
              style={{
                color: darkMode ? "white" : ""
              }}
            >
              Report Evaluator
            </h2>
          </div>
        </div>

        <ContentCard>
          <h4 style={{
            color: darkMode ? "white" : ""
          }} className="text-center fw-bold mb-md-4 mb-0 mt-5">
            LAPORAN KINERJA EVALUATOR
          </h4>
          <div className="d-flex flex-md-row flex-column px-3 py-3">
            <p className="me-2" style={{
              color: darkMode ? "white" : ""
            }}>Periode :</p>
            <input
              type="date"
              className="form-control mb-md-0 mb-3 input-date-w100"
              style={{ width: "200px" }}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <p className="me-2 ms-2" style={{
              color: darkMode ? "white" : ""
            }}>Sampai : </p>
            <input
              type="date"
              className="form-control me-3 mb-md-0 mb-3 input-date-w100"
              style={{ width: "200px" }}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />

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
          </div>

          <Paper className="m-3" sx={{ width: "100%", overflow: "hidden" }}>
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
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={index}
                        style={{
                          backgroundColor: darkMode ? "#40679E" : "",
                          color: darkMode ? "white" : "",
                        }}
                      >
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
        </ContentCard>

      </motion.div>
    </>
  );
};

export default Report;
