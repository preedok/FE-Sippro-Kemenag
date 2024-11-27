import React, { useState, useRef, useMemo, useEffect } from "react";
import axios from "axios";
import "../../../../views/ptki/admin.css";
import { useForm, Controller } from "react-hook-form";
import { StartLoading, SuccessSwal, ErrorSwal } from "../../../../utils/swal2";
import { GetApiBaseUrl } from "../../../../utils/env";
import { getToken, getUserId, getRole } from "../../../../utils/token";
import HeroTitle from "../../../../components/hero-title/HeroTitle";
import ContentContainer from "../../../../components/card-container/ContentContainer";
import ContentHeader from "../../../../components/header-content/ContentHeader";
import ContentCard from "../../../../components/card-content/ContentCard";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AsyncTable from "../../../../components/table/AsyncTable";
import CollapsibleTable from "../../../../components/table/CollapsibleTable";
import Modal from "@mui/material/Modal";
import StatusProdi from "../StatusProdi";
import DropdownAksi from "../../../../components/dropdown/DropdownAksi";
import MenuItem from "@mui/material/MenuItem";
import moment from "moment";
import { Helmet } from "react-helmet";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import swal from "sweetalert";
import ProdiActionName from '../../../../utils/status'
import PenawaranStatusName from "../../../../utils/status";
import { isAuth } from "../../../../utils/token";
import * as XLSX from 'xlsx';
import ExclamationCircleWarningIcon from "../../../../components/icons/ExclamationCircleWarningIcon";
import ExclamationCircleInfoIcon from "../../../../components/icons/ExclamationCircleInfoIcon";
import ExclamationCircleDangerIcon from "../../../../components/icons/ExclamationCircleDangerIcon";
import PlusIcon from "../../../../components/icons/PlusIcon";
import BoxArrowInUpIcon from "../../../../components/icons/BoxArrowInUpIcon";
import logo from '../../../../assets/logo.svg'
import logo1 from '../../../../assets/pusaka3.png'
import jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js';
import { useMediaQuery } from "@mui/material";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import api from "../../../service/api";
import Select from 'react-select';
import { useDarkMode } from "../../../../utils/DarkModeContext";
import { getFullname } from "../../../../utils/token";
import CloseIcon from '@mui/icons-material/Close'
const statusMapping = {
  0: { text: 'Melengkapi Dokumen', color: '#D89216' },
  1: { text: 'Dokumen Selesai', color: 'green' },
  2: { text: 'Dokumen dikirim', color: '#719FB0' },
  3: { text: 'Sudah Perbaikan', color: '#52057B' },
  9: { text: 'Permintaan Dibatalkan', color: 'yellow' },
  10: { text: 'Dokumen Usulan Lengkap', color: 'teal' },
  19: { text: 'Dokumen dikembalikan', color: "red" },
  20: { text: 'Penawaran Assessment', color: 'orange' },
  21: { text: 'Assessment Kecukupan oleh Evaluator', color: 'green' },
  22: { text: 'Assessment Berlangsung', color: '#687EFF' },
  23: { text: 'Assessment Evaluator Selesai', color: 'green' },
  24: { text: 'Lokasi Assessment Progress', color: 'orange' },
  26: { text: 'Assessment selesai', color: 'green' },
  27: { text: 'Usulan di Kembalikan ke User', color: '#952323' },
  28: { text: 'Assessment Kadaluarsa', color: 'purple' },
  29: { text: 'Assessment Dibatalkan', color: 'yellow' },
  40: { text: 'Valid untuk Lembaga Akreditasi', color: 'teal' },
  41: { text: 'Dalam validasi', color: 'orange' },
  50: { text: 'Validasi Hasil Assessment Kecukupan oleh BAN PT/LAM', color: 'green' },
  51: { text: 'Dalam Proses SK', color: 'blue' },
  52: { text: 'SK diunggah dan paraf 1', color: 'blue' },
  53: { text: 'SK diunggah dan paraf 2', color: 'blue' },
  54: { text: 'SK diunggah dan paraf 3', color: 'blue' },
  55: { text: 'SK diunggah dan paraf 4', color: 'blue' },
  60: { text: 'Penerbitan Izin', color: 'brown' },
  99: { text: 'di Kembalikan', color: 'red' },
  221: { text: 'Penugasan Penilaian Lapangan', color: 'purple' },
  222: { text: 'Penilaian Lapangan Sedang Berlangsung', color: '#687EFF' },
  223: { text: 'Penilaian Lapangan Selesai', color: 'green' },
  226: { text: 'Semua Penilaian Lapangan Selesai', color: 'green' },
  227: { text: 'Penilaian Lapangan dikembalikan', color: '#952323' },
  299: { text: 'Validasi BANPT/LAM dikembalikan', color: "red" },
  521: { text: 'KMA diunggah dan paraf 1', color: 'blue' },
  522: { text: 'KMA diunggah dan paraf 2', color: 'blue' },
  523: { text: 'KMA diunggah dan paraf 3', color: 'blue' },
  524: { text: 'KMA diunggah dan paraf 4', color: 'blue' },
  525: { text: 'KMA Final', color: 'green' },
  526: { text: 'KMA diunggah dan paraf 6', color: 'blue' },
  527: { text: 'KMA diunggah dan paraf 7', color: 'blue' },
  528: { text: 'KMA diunggah dan paraf 8', color: 'blue' },
  529: { text: 'KMA diunggah dan paraf 9', color: 'blue' }
};
function getStatusTextAndColor(statusCode) {
  const statusInfo = statusMapping[statusCode];
  if (statusInfo) {
    return (
      <span style={{ color: statusInfo.color }}>{statusInfo.text}</span>
    );
  } else {
    return (
      <span style={{ color: 'black' }}>Tidak Ada Data</span>
    );
  }
}


const CardUsulan = () => {
  const { darkMode } = useDarkMode()
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: '80%',
    overflow: 'auto',
    maxWidth: 1050,
    bgcolor: darkMode ? "#3C5B6F" : "background.paper",
    boxShadow: 24,
    borderRadius: "10px",
  };
  const auth = isAuth();
  const baseUrl = GetApiBaseUrl();
  const [view, setView] = useState(0);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const handleChange = (_, newValue) => {
    setView(newValue);
  };
  const handleRiwayatClick = (riwayatData) => {
    setRiwayat(riwayatData);
    setOpen(true);
  };
  const token = getToken();
  const [rows, setRows] = useState([]);
  const [rowsAll, setRowsAll] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const handleSearch = () => {
    // Lakukan pencarian berdasarkan searchInput
    const filteredRows = riwayat.filter((row) => {
      return (
        row.noReg.toLowerCase().includes(searchInput.toLowerCase()) ||
        row.namaProdi.toLowerCase().includes(searchInput.toLowerCase()) ||
        row.jenjangStr.toLowerCase().includes(searchInput.toLowerCase()) ||
        dateFormatter(row.requestTime)
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        (row.approveVervalTime &&
          moment(row.approveVervalTime)
            .format("YYYY-MM-DD")
            .toLowerCase()
            .includes(searchInput.toLowerCase())) ||
        ProdiActionName(row.status).toLowerCase().includes(searchInput.toLowerCase())
      );
    });

    setRows(filteredRows);
  };
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', options);
  }
  const dateFormatter = (dateStr) => {
    if (!dateStr) return "-";

    const options = { day: "numeric", month: "long", year: "numeric" };
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("id-ID", options).format(date);
  };
  const [riwayat, setRiwayat] = useState([]);
  const fetchReqProdi = (fetchAll = false) => {
    setTableLoading(true);
    api
      .get(`/${fetchAll ? "req-prodi" : "req-prodi"}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.status === 200) {
          const result = response.data.data.sort((a, b) => new Date(b.requestTime) - new Date(a.requestTime));
          if (fetchAll) {
            setRowsAll(result);
            setRiwayat(result)
          } else {
            setRows(result);
            setRiwayat(result)
          }
        } else {
          ErrorSwal("Fetching Data Failed");
        }
      })
      .catch(() => {
        ErrorSwal("Fetching Data Failed");
      })
      .finally(() => setTableLoading(false));
  };

  const exportToPDF = () => {
    const contentClone = document.getElementById('riwayatModalContent').cloneNode(true);
    const exportButton = contentClone.querySelector('button');
    contentClone.querySelector('#tableContainer1').style.maxHeight = 'none';
    if (exportButton) {
      exportButton.parentNode.removeChild(exportButton);
    }
    const wrapperDiv = document.createElement('div');
    wrapperDiv.appendChild(contentClone);
    const pdf = new jsPDF();
    html2pdf(wrapperDiv, {
      margin: 10,
      filename: 'riwayat_proses_usulan_prodi.pdf',
      image: { type: 'text', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    });
  };

  const exportToPDF1 = () => {
    const contentClone = document.getElementById('buktiDaftarModalContent').cloneNode(true);
    const exportButton = contentClone.querySelector('button');
    const tableContainer1 = contentClone.querySelector('#tableContainer1');
    if (tableContainer1) {
      tableContainer1.style.maxHeight = 'none';
    }
    if (exportButton) {
      exportButton.parentNode.removeChild(exportButton);
    }
    const wrapperDiv = document.createElement('div');
    wrapperDiv.appendChild(contentClone);
    html2pdf(wrapperDiv, {
      margin: 10,
      filename: 'bukti-daftar-usulan-prodi.pdf',
      image: { type: 'text', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    });
  };

  const [fileUrl, setFileUrl] = useState(null);
  const handleDownloadFile = async (programStudiId, status) => {
    const token = getToken();
    try {
      console.log(`Request URL: /req-prodi/${programStudiId}/${status}`);
      const response = await api.get(`/req-prodi/${programStudiId}/${status}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      });
      console.log('response>>', response)
      if (response.status === 200) {
        swal({
          title: 'Download...',
          text: 'Sedang Proses Download File...',
          content: {
            element: "i",
            attributes: {
              className: "fas fa-spinner fa-spin",
              style: "color: #4CAF50; font-size: 2em;",
            },
          },
          buttons: false,
          dangerMode: false,
          closeOnClickOutside: false,
          closeOnEsc: false,
        });

        const contentDispositionHeader = response.headers.get('content-disposition');
        const fileNameMatch = contentDispositionHeader && contentDispositionHeader.match(/filename="?([^"]+)"?/);
        const fileName = fileNameMatch && fileNameMatch[1];

        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = fileName;
        link.click();
        window.URL.revokeObjectURL(downloadUrl);

        // Close the swal modal after the file has been downloaded
        setTimeout(() => {
          swal.close();
        }, 1000); // You can adjust the timeout duration as needed
      } else if (response.status === 404) {
        swal({
          icon: 'error',
          title: `Error`,
          text: `Old assessment file not found.`,
        });
        // Close the loading spinner in case of a 404 error
        swal.close();
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        const errorMessage = error.response.data.message || 'Data Not found';
        swal({
          icon: 'error',
          title: 'Error',
          text: `Error: ${errorMessage}`,
        });
      } else {
        // Handle other types of errors
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `${error.message}`
        });
      }
      swal.close();
      console.log(error.response);
    }
  };
  const isScreenSizeLowerThanLG = useMediaQuery("(max-width: 990px)");
  const isScreenSizeLowerThanSM = useMediaQuery("(max-width: 576px)");

  const tanggalTerikini = new Date();
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const tanggalFormatted = tanggalTerikini.toLocaleDateString('id-ID', options);

  const reqProdiAllColumns = [
    {
      headerName: "Akreditasi",
      // flex: 1,
      width: isScreenSizeLowerThanLG ? 130 : '',
      flex: isScreenSizeLowerThanLG ? 0 : 1,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className="table-manual">
            <div className="subtitle">{params?.row?.akreditasi}</div>
          </div>
        );
      },
    },
    {
      headerName: "Diploma",
      width: isScreenSizeLowerThanLG ? 100 : '',
      flex: isScreenSizeLowerThanLG ? 0 : 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className="table-manual">
            <div className="subtitle">{params?.row?.diploma}</div>
          </div>
        );
      },
    },
    {
      headerName: "S1",
      width: isScreenSizeLowerThanLG ? 100 : '',
      flex: isScreenSizeLowerThanLG ? 0 : 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className="table-manual">
            <div className="subtitle">{params?.row?.s1}</div>
          </div>
        );
      },
    },
    {
      headerName: "S2",
      width: isScreenSizeLowerThanLG ? 100 : '',
      flex: isScreenSizeLowerThanLG ? 0 : 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className="table-manual">
            <div className="subtitle">{params?.row?.s2}</div>
          </div>
        );
      },
    },
    {
      headerName: "S3",
      width: isScreenSizeLowerThanLG ? 100 : '',
      flex: isScreenSizeLowerThanLG ? 0 : 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className="table-manual">
            <div className="subtitle">{params?.row?.s3}</div>
          </div>
        );
      },
    },
    {
      headerName: "Jumlah",
      width: isScreenSizeLowerThanLG ? 100 : '',
      flex: isScreenSizeLowerThanLG ? 0 : 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className="table-manual">
            <div className="subtitle">{params?.row?.jumlah}</div>
          </div>
        );
      },
    },
  ];
  const reqProdiColumns = [
    {
      field: "noReg",
      headerName: "Nomor Registrasi",
      width: 144,
      sortable: false,
      headerAlign: "center",
      align: "center",
      flex: isScreenSizeLowerThanLG ? 0 : 1,
      renderCell: (params) => {
        const targetDate = new Date(params.row.requestTime);
        const today = new Date();
        const threeDaysAgo = new Date(today);
        threeDaysAgo.setDate(today.getDate() - 3);

        const shouldDisplay = targetDate <= today && targetDate >= threeDaysAgo;
        return (
          <div className="table-manual">
            <div className="subtitle">{params.row.noReg}
              {shouldDisplay && (
                <span className="ms-1" style={{ backgroundColor: 'green', width: '50px', height: '20px', color: 'white', paddingLeft: '5px', paddingRight: '5px', borderRadius: '3px' }}>Baru</span>
              )}
            </div>
          </div>
        );
      },
    },
    {
      field: "namaProdi",
      headerName: "Nama Prodi & Jenjang",
      width: isScreenSizeLowerThanLG ? 300 : '',
      flex: isScreenSizeLowerThanLG ? 0 : 2,
      sortable: false,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className="table-manual" style={{ whiteSpace: isScreenSizeLowerThanLG ? 'nowrap' : 'normal', width: '100%', textAlign: 'left' }}>
            <div className="subtitle" >{params.row.namaProdi}</div>
            <div className="subtitle" >{params.row.jenjangStr}</div>
          </div>
        );
      },
    },
    {
      field: "tgldiusulkan",
      headerName: "Tanggal diusulkan",
      width: isScreenSizeLowerThanLG ? 200 : '',
      flex: isScreenSizeLowerThanLG ? 0 : 1,
      sortable: false,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className="table-manual" style={{ whiteSpace: 'normal', width: '100%', textAlign: 'center' }}>
            <span className="subtitle">
              {dateFormatter(params.row.requestTime)}
            </span>
          </div>
        );
      },
    },
    {
      field: "tglkonfirmasi",
      headerName: "Tanggal diusulkan",
      width: isScreenSizeLowerThanLG ? 200 : '',
      flex: isScreenSizeLowerThanLG ? 0 : 1.3,
      sortable: false,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className="table-manual text-truncate m-auto">
            {params?.row?.requestBy?.approvedTime ? (
              <span className="subtitle">
                {dateFormatter(params.row.requestBy.approvedTime)}
              </span>
            ) : (
              <span style={{ fontSize: '14px' }} className="title-danger m-auto">Belum dikonfirmasi</span>
            )}
          </div>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: isScreenSizeLowerThanLG ? 200 : '',
      flex: isScreenSizeLowerThanLG ? 0 : 1.5,
      sortable: false,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className="table-manual m-auto">
            <ProdiActionName status={params.row.status} />
          </div>
        );
      },
    },
    {
      field: "tglUpdate",
      headerName: "Tanggal Update",
      width: isScreenSizeLowerThanLG ? 200 : '',
      flex: isScreenSizeLowerThanLG ? 0 : 1.6,
      sortable: false,
      headerAlign: "left",
      renderCell: (params) => {
        let latestTimeCreated = null; // inisialisasi variabel
        if (params.row.listProdiAction && params.row.listProdiAction.length > 0) {
          latestTimeCreated = params.row.listProdiAction.reduce((latest, current) => {
            return latest.timeCreated > current.timeCreated ? latest : current;
          });
        }
        return (
          <div className="table-manual">
            <span className="subtitle">
              {latestTimeCreated ? formatDate(latestTimeCreated.timeCreated) : "Data tidak tersedia"}
            </span>
          </div>
        );
      },
    },
    {
      field: "aksi",
      headerName: "",
      width: isScreenSizeLowerThanLG ? 120 : '',
      flex: isScreenSizeLowerThanLG ? 0 : 0.7,
      sortable: false,
      headerAlign: "center",
      renderCell: (params) => {
        const [open, setOpen] = useState(false);
        const [open1, setOpen1] = useState(false);
        const [selectedId, setSelectedId] = useState(null);
        const [riwayat, setRiwayat] = useState([]);
        const [buktiDaftar, setBuktiDaftar] = useState([]);
        const handleOpen = (id) => {
          setSelectedId(id);
          setOpen(true);
          api.get(`/req-prodi/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((response) => {
              const actionHistory = response.data.data.prodiActions || [];
              setRiwayat(actionHistory);
            })
            .catch((error) => {
              console.error('Error fetching action history:', error);
            });
        };
        const handleClose = () => {
          setSelectedId(null);
          setOpen(false);
        };


        const handleOpen1 = (id) => {
          setSelectedId(id);
          setOpen1(true);
          api.get(`/req-prodi/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((response) => {
              console.log('API Response:', response.data.data);
              setBuktiDaftar(response.data.data);
            })
            .catch((error) => {
              console.error('Error fetching action history:', error);
            });
        };
        const handleClose1 = () => {
          setOpen1(false);
        };
        const prodiActions = params.row.prodiActions || [];
        return (
          <>
            <DropdownAksi
              itemComponent={
                <>
                  <MenuItem onClick={() => handleOpen(params.row.id)}>
                    <a
                      rel="noreferrer"
                      target="_blank"
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                      }}
                    >
                      Riwayat
                    </a>
                  </MenuItem>
                  {params.row.status === 0 ? (
                    <MenuItem component="a" href={`/detail-usulan/${params?.row?.id}`} target="_blank" rel="noreferrer" className="text-decoration-none text-dark">
                      Lengkapi Dokumen
                    </MenuItem>
                  ) : params.row.status === 2 ? (
                    <MenuItem onClick={() => handleOpen1(params.row.id)}>
                      <a
                        rel="noreferrer"
                        target="_blank"
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                        }}
                      >
                        Bukti Daftar
                      </a>
                    </MenuItem>
                  ) : params.row.status === 60 ? (
                    <MenuItem >
                      <a
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                      >
                        <p
                          variant="contained"
                          color="success"
                          size="small"
                          sx={{ margin: "auto" }}
                          onClick={() => {
                            console.log('fileUrl:', fileUrl);
                            console.log('params.row.id:', params.row.id);
                            console.log('params.row.status:', params.row.status);
                            handleDownloadFile(params.row.id, params.row.status);
                          }}
                        >
                          Download SK
                        </p></a>
                    </MenuItem>
                  ) : (
                    <MenuItem component="a" href={`/detail-usulan/${params?.row?.id}`} target="_blank" rel="noreferrer" className="text-decoration-none text-dark">
                      Detail Usulan
                    </MenuItem>
                  )}
                </>
              }
            />

            {/* Riwayat */}
            {open && (
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
                  <Box sx={{ padding: 2, }} id="riwayatModalContent">
                    <div style={{ color: darkMode ? "white" : "" }} className="mx-4">
                      <div className="d-flex justify-content-between mt-4">
                        <div className="mt-4">
                          <p className="fw-bold" >DIREKTORAT PENDIDIKAN TINGGI KEAGAMAAN ISLAM</p>
                          <p className="fw-bold" style={{ marginTop: '-16px' }}>DIREKTORAT JENDERAL PENDIDIKAN ISLAM</p>
                          <p className="fw-bold" style={{ marginTop: '-16px' }}>KEMENTERIAN AGAMA REPUBLIK INDONESIA</p>
                        </div>
                        <div className="mt-2 text-center d-flex">
                          <img src={logo} alt="logo kemenag" className="mt-1" style={{ width: '80px', height: '80px' }} />
                          <img src={logo1} alt="logo pusaka" style={{ width: '90px', height: '90px' }} />
                        </div>
                      </div>
                      <hr style={{ marginTop: '-10px' }} />
                      <h6 style={{ fontWeight: '1000' }} className="mb-4 mt-4">RIWAYAT PROSES TAHAPAN USULAN PROGRAM STUDI   <Button sx={{ marginLeft: '10px' }} variant="contained" size="small" onClick={exportToPDF}>Export</Button></h6>

                      <div className="d-flex">
                        <div>
                          <p>Nama Perguruan Tinggi</p>
                          <p>Program Studi</p>
                          <p>Jenjang</p>
                          <p>Nomor Registrasi</p>
                          <p>Tanggal Cetak</p>
                        </div>

                        <div className="ms-2">
                          <p>:</p>
                          <p>:</p>
                          <p>:</p>
                          <p>:</p>
                          <p>:</p>
                        </div>

                        <div className="ms-2">
                          <p>{params.row.lembaga}</p>
                          <p>{params.row.namaProdi}</p>
                          <p>{params.row.jenjangStr}</p>
                          <p>{params.row.noReg}</p>
                          <p>{tanggalFormatted}</p>
                        </div>
                      </div>
                    </div>
                    <Paper
                      sx={{
                        width: "100%",
                        overflow: "auto",
                      }}
                    >
                      <TableContainer id="tableContainer1" sx={{ maxHeight: 330, overflow: 'auto' }} >
                        <Table stickyHeader aria-label="sticky table">
                          <TableHead>
                            <TableRow tyle={{
                              backgroundColor: darkMode ? "#40679E" : "",
                              color: darkMode ? "white" : "",
                            }}>
                              <TableCell className="text-center" style={{
                                backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                                border: "none",
                                color: darkMode ? "white" : "",
                              }}>Status</TableCell>
                              <TableCell className="text-center" style={{
                                backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                                border: "none",
                                color: darkMode ? "white" : "",
                              }}>Tanggal</TableCell>
                              <TableCell className="text-center" style={{
                                backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                                border: "none",
                                color: darkMode ? "white" : "",
                              }}>Oleh</TableCell>
                              <TableCell className="text-center" style={{
                                backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                                border: "none",
                                color: darkMode ? "white" : "",
                              }}>Catatan</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody id="riwayatTableBody">
                            {riwayat.map((action) => (
                              <TableRow style={{
                                backgroundColor: darkMode ? "#40679E" : "",
                                color: darkMode ? "white" : "",
                              }} key={action.id} hover tabIndex={-1}>
                                <TableCell style={{ color: darkMode ? "white" : "", }} className="text-center"><ProdiActionName status={action.action} /></TableCell>
                                <TableCell style={{ color: darkMode ? "white" : "", }} className="text-center">{dateFormatter(action.timeCreated)}</TableCell>
                                <TableCell style={{ color: darkMode ? "white" : "", }} className="text-center fw-bold">{action.role || '-'}</TableCell>
                                <TableCell style={{ color: darkMode ? "white" : "", }} className="text-center">{action.message || '-'}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Paper>
                  </Box>
                </Box>
              </Modal>
            )}
            {/* bukti daftar */}
            {open1 && (
              <Modal
                open={open1}
                onClose={handleClose1}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <IconButton
                    sx={{ position: "absolute", top: 5, right: 5 }}
                    onClick={handleClose1}
                    aria-label="close"
                  >
                    <HighlightOffIcon color="error" />
                  </IconButton>
                  <Box sx={{ padding: 2, }} id="buktiDaftarModalContent">
                    <ContentCard style={{
                      padding: '5px',
                      margin: '5px'
                    }}>
                      <Button sx={{ marginLeft: '10px' }} variant="contained" size="small" onClick={exportToPDF1}>Export</Button>
                      <div className="mx-4">
                        <div className="d-flex justify-content-between mt-4">
                          <div className="mt-4">
                            <p className="fw-bold" >DIREKTORAT PENDIDIKAN TINGGI KEAGAMAAN ISLAM</p>
                            <p className="fw-bold" style={{ marginTop: '-16px' }}>DIREKTORAT JENDERAL PENDIDIKAN ISLAM</p>
                            <p className="fw-bold" style={{ marginTop: '-16px' }}>KEMENTERIAN AGAMA REPUBLIK INDONESIA</p>
                          </div>
                          <div className="mt-2 text-center d-flex">
                            <img src={logo} alt="logo kemenag" className="mt-1" style={{ width: '80px', height: '80px' }} />
                            <img src={logo1} alt="logo pusaka" style={{ width: '90px', height: '90px' }} />
                          </div>
                        </div>
                        <hr style={{ marginTop: '-10px' }} />
                        <h4 style={{ fontWeight: '1000' }} className="mb-4 mt-4">BUKTI PENDAFTARAN</h4>

                        <div className="d-flex">
                          <div>
                            <p >Nama Perguruan Tinggi</p>
                            <p >Program Studi</p>
                            <p >Jenjang</p>
                            <p >Nomor Registrasi</p>
                            <p >Nama Pembuat Akun</p>
                            <p >Tanggal Pembuatan Akun</p>
                            <p >Tanggal Pendaftaran</p>
                            <p >Tanggal Update</p>
                          </div>

                          <div className="ms-2">
                            <p>:</p>
                            <p>:</p>
                            <p>:</p>
                            <p>:</p>
                            <p>:</p>
                            <p>:</p>
                            <p>:</p>
                            <p>:</p>
                          </div>

                          <div className="ms-2">
                            <p >{buktiDaftar?.namaPerguruan}</p>
                            <p >{buktiDaftar?.namaProdi}</p>
                            <p >{buktiDaftar?.jenjangStr}</p>
                            <p >{buktiDaftar?.noReg}</p>
                            <p >{buktiDaftar?.fullName}</p>
                            <p >-</p>
                            <p >{dateFormatter(buktiDaftar?.requestTime)}</p>
                            <p >{dateFormatter(buktiDaftar?.requestTime)}</p>
                          </div>
                        </div>
                      </div>
                    </ContentCard>
                  </Box>
                </Box>
              </Modal>
            )}
          </>
        );
      },
    },
  ];
  const renderedRows = useMemo(() => {
    const allCol = [
      "Unggul",
      "A",
      "Baik Sekali",
      "Baik",
      "B",
      "C",
      "Belum",
      "Total",
    ];
    const dataHolder = {};
    allCol.forEach((akr) => {
      dataHolder[akr] = {
        diploma: 0,
        s1: 0,
        s2: 0,
        s3: 0,
        jumlah: 0,
        data: [],
      };
    });

    rowsAll?.forEach((prodi) => {
      let keyAdd = "Belum";
      if (prodi?.akreditasi) {
        keyAdd = prodi.akreditasi;
      }

      let current = dataHolder[keyAdd];
      let currentTotal = dataHolder["Total"];

      switch (prodi?.jenjang) {
        case 1:
          current.s1 = current.s1 + 1;
          currentTotal.s1 = currentTotal.s1 + 1;
          break;
        case 2:
          current.s2 = current.s2 + 1;
          currentTotal.s2 = currentTotal.s2 + 1;
          break;
        case 3:
          current.s3 = current.s3 + 1;
          currentTotal.s3 = currentTotal.s3 + 1;
          break;
        default:
          current.diploma = current.diploma + 1;
          currentTotal.diploma = currentTotal.diploma + 1;
          break;
      }

      current.jumlah = current.jumlah + 1;
      currentTotal.jumlah = currentTotal.jumlah + 1;

      current.data.push(prodi);
      currentTotal.data.push(prodi);

      dataHolder[keyAdd] = current;
      dataHolder["Total"] = currentTotal;
    });

    allCol.forEach((akr) => {
      let current = dataHolder[akr];
      current.data = current.data.map((item, i) => ({
        ...item,
        rowIndex: i,
      }));
      dataHolder[akr] = current;
    });

    const result = allCol.map((akreditasi) => ({
      akreditasi,
      diploma: dataHolder?.[akreditasi]?.diploma,
      s1: dataHolder?.[akreditasi]?.s1,
      s2: dataHolder?.[akreditasi]?.s2,
      s3: dataHolder?.[akreditasi]?.s3,
      jumlah: dataHolder?.[akreditasi]?.jumlah,
      data: dataHolder?.[akreditasi]?.data,
    }));

    return result;
  });
  const indexedRows = useMemo(() => {
    return rows.map((item, i) => ({
      ...item,
      rowIndex: i,
    }));
  });
  const fetchBasedView = () => {
    fetchReqProdi(view == 1);
  };
  useEffect(() => {
    fetchBasedView();
  }, [view]);
  const modalRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const { getValues, control, trigger, reset } = useForm({
    defaultValues: {
      jenjang: "",
      kelompokProdi: "",
    },
  });

  const [selectedRadio, setSelectedRadio] = useState('akademik');
  const [selectedJenjang, setSelectedJenjang] = useState(99);
  const [prodiOptions, setProdiOptions] = useState([]);
  const [selectedProdi, setSelectedProdi] = useState('');
  const [loading, setLoading] = useState(false);
  const handleRadioChange = (event) => {
    setSelectedRadio(event.target.value);
    setSelectedJenjang(99);
    setSelectedProdi('');
  };

  const handleJenjangChange = (event) => {
    setSelectedJenjang(event.target.value);
    setSelectedProdi('');
  };

  const handleProdiChange = (selectedOption) => {
    setSelectedProdi(selectedOption ? selectedOption.value : '');
  };


  const fetchDataProdiJenjang = () => {
    // setTableLoading(true);
    if (selectedJenjang === 99) return
    axios.get(`${baseUrl}/prodi-master/jenjang/${selectedJenjang}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        const data = response.data;
        if (data.status === 200 && data.data && data.data.length > 0) {
          const filteredData = data.data.filter(item => !item.namaProdi.includes('Tadris'));

          setProdiOptions(filteredData);
        } else {
          setProdiOptions(data.data);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setTableLoading(false);
      });
  };

  const handleCreateProdi = () => {
    setLoading(true);
    fetchReqProdi(true)
    const val = {
      namaProdi: selectedProdi,
      bidangProdi: 0,
      jenjang: parseInt(selectedJenjang),
      kelompokProdi: parseInt(selectedProdi),
    };
    axios
      .post(`${baseUrl}/req-prodi?prodiId=${selectedProdi}`, val, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        closeModal();
        if (response.data.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: response.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
          fetchReqProdi()
        } else {
          Swal.fire({
            icon: "error",
            title: "Gagal",
            text: response.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
        fetchReqProdi(false)
      })
      .catch((error) => {
        closeModal();
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: 'Saat ini pendaftaran program studi baru 2024 belum dibuka',
          // showConfirmButton: false,
          // timer: 1500,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const filterData = () => {
    const filtered = rows.filter((row) => {
      return (
        row.noReg.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.namaProdi.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setFilteredData(filtered);
  };
  const handleExport = () => {
    if (filteredData.length > 0) {
      const exportData = filteredData.map((item) => ({
        'Nomor Registrasi': item.noReg,
        'Nama Prodi': item.namaProdi,
        'Status': statusMapping[item.status]?.text || 'Unknown Status',
      }));

      const ws = XLSX.utils.json_to_sheet(exportData);


      const columnWidths = [
        { wch: 15 },
        { wch: 30 },
        { wch: 20 },
      ];
      ws['!cols'] = columnWidths;


      ws['A1'].s = { bold: true, fgColor: { rgb: '#800000' } };
      ws['B1'].s = { bold: true, fgColor: { rgb: '#800000' } };
      ws['C1'].s = { bold: true, fgColor: { rgb: '#800000' } };

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'usulanprodi.xlsx');
    } else {
      alert('No data to export.');
    }
  };

  useEffect(() => {
    filterData();
  }, [searchQuery, rows]);

  useEffect(() => {
    fetchDataProdiJenjang()
  }, [selectedJenjang]);

  const [showWarning, setShowWarning] = useState(false);
  const currentYear = new Date().getFullYear();
  const getDataConfig = async () => {
    const token = getToken()
    try {
      const response = await axios.get(`${baseUrl}/DatabaseSettings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const warningConfig = response.data.find(item => item.name === "App:ReqProdiWarning");
      if (warningConfig && warningConfig.value.toLowerCase() === 'false') {
        setShowWarning(true);
      } else {
        setShowWarning(false);
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `${error.message}`
      });
    }
  };

  useEffect(() => {
    getDataConfig();
  }, []);

  const [showVideoModal, setShowVideoModal] = useState(false);

  useEffect(() => {
    setShowVideoModal(true);
  }, []);
  const handleCloseModal = () => {
    setShowVideoModal(false);
  };

  const handleOpenModal = () => {
    setShowVideoModal(true);
  };

  return (
    <>
      <Helmet>
        <title>Kemenag | Usulan Prodi </title>
      </Helmet>
      <HeroTitle
        title="Usulan Program Studi"
        subtitle={`Selamat datang, ${getFullname()}`}
      />
      <ContentContainer>
        {showWarning && (
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="warning" style={{ fontSize: '22px' }}>Saat ini pendaftaran program studi baru tahun {currentYear} belum dibuka, silahkan tunggu informasi selanjutnya</Alert>
          </Stack>
        )}
        <ContentHeader />

        <ContentCard>
          <div className="col-12" style={{ padding: "20px 20px 0px 20px" }}>
            <Tabs
              sx={{
                ".MuiTab-root": {
                  textTransform: "capitalize",
                },
              }}
              value={view}
              onChange={handleChange}
            >
              <Tab style={{ color: darkMode ? "white" : "" }} label="Program studi yang diusulkan" value={0} />
              <Tab style={{ color: darkMode ? "white" : "" }} label="Program yang sudah dimiliki" value={1} />
              <Tab label="Panduan" value={2} onClick={handleOpenModal} />
            </Tabs>
          </div>
          <div className="col-12" style={{ padding: "20px 20px 0px 20px" }}>
            <span
              style={{
                fontWeight: 500,
                fontSize: "24px",
                lineHeight: "32px",
                color: darkMode ? "white" : ""
              }}
            >
              {view == 0
                ? "Program Studi yang Diusulkan"
                : "Daftar Prodi yang Sudah Dimiliki"}
            </span>
          </div>
          <div
            className="col-12 d-flex flex-sm-row flex-column align-items-start align-items-sm-center jusity-content-between"
            style={{ height: "80px", padding: "0px 20px" }}
          >
            <Button
              style={{
                border: "1px solid #8a8d93 ",
                fontSize: "12px",
                color: darkMode ? "white" : "#8a8d93"
              }}
              className="p-2 btn btn-none exportBtn"
              data-aos="zoom-in-right"
              data-aos-duration="1000"
              onClick={handleExport}
            >
              <BoxArrowInUpIcon />
              <span className="span"> Export Data</span>
            </Button>
            <div
              className="d-flex flex-fill align-items-center justify-content-start justify-content-sm-end"
              style={{ gap: "24px" }}
            >
              <div className="col-6">
                <div
                  className="input-group flex-nowrap"
                  data-aos="zoom-in-left"
                  data-aos-duration="1000"
                >
                  <input
                    type="text"
                    className="form-control"
                    placeholder={view === 0 ? 'Pencarian' : 'Cari Program Studi'}
                    aria-label="Username"
                    aria-describedby="addon-wrapping"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />

                </div>
              </div>

              {view == 0 && (
                <div className="col-3">
                  <button
                    className="btn btnModal btn-none"
                    style={{ backgroundColor: 'rgb(9, 105, 30)', color: 'white' }}
                    type="button"
                    onClick={openModal}
                  >
                    <PlusIcon />
                    <span style={{ fontSize: "10px" }} className="span">
                      Ajukan usulan program Studi Baru
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div
            className="col-12 d-flex flex-sm-row flex-column"
            style={{ padding: "0px 20px", gap: "16px" }}
          >
            {view == 0 && (
              <>
                <div
                  style={{
                    border: "2px solid #FF9800",
                    backgroundColor: "#FFF3E0",
                  }}
                  className="alert alert-danger"
                  role="alert"
                  data-aos="zoom-in-right"
                  data-aos-duration="1000"
                >
                  <p
                    className="text-dark fw-bold"
                    data-aos="zoom-in-right"
                    data-aos-duration="1000"
                  >
                    <ExclamationCircleWarningIcon />
                    Info
                  </p>
                  <p
                    className=" inf"
                    data-aos="zoom-in-left"
                    data-aos-duration="1000"
                  >
                    Prodi yang diusulkan adalah Daftar prodi yang diusulkan
                    Lembaga. Usulan Prodi dapat dihapus selama belum dilengkapi
                    dokumen, atau jika ingin dihapus maka dokumen harus 0. Untuk
                    melanjutkan, pilih menu <b>Lengkapi Dokumen</b> .
                  </p>
                </div>

                <div
                  style={{
                    border: "2px solid #F44336",
                    backgroundColor: "#FFEBEE",
                  }}
                  className="alert alert-danger"
                  role="alert"
                  data-aos="zoom-in-left"
                  data-aos-duration="1000"
                >
                  <p
                    className="text-dark fw-bold"
                    data-aos="zoom-in-right"
                    data-aos-duration="1000"
                  >
                    <ExclamationCircleDangerIcon />
                    Ingat
                  </p>
                  <p
                    className=" inf"
                    data-aos="zoom-in-left"
                    data-aos-duration="1000"
                  >
                    Untuk setiap pengajuan Usulan Prodi pada periode ini,
                    dokumen kelengkapan harus segera dilengkapi sebelum tanggal:
                    <b> Sampai batas pendaftaran ditutup</b>
                  </p>
                </div>
              </>
            )}
            {view == 1 && (
              <div
                style={{
                  border: "2px solid #2196F3",
                  backgroundColor: "#E3F2FD",
                }}
                className="alert alert-danger w-100"
                role="alert"
                data-aos="zoom-in-right"
                data-aos-duration="1000"
              >
                <p
                  className="text-dark fw-bold"
                  data-aos="zoom-in-right"
                  data-aos-duration="1000"
                >
                  <ExclamationCircleInfoIcon />
                  Info
                </p>
                <p
                  className="inf"
                  data-aos="zoom-in-left"
                  data-aos-duration="1000"
                >
                  Bisa usul prodi baru
                </p>
              </div>
            )}
          </div>

          <div className="col-12 ms-1">
            {view === 0 ? (
              <AsyncTable
                loading={tableLoading}
                rows={searchQuery ? filteredData : indexedRows}
                columns={reqProdiColumns}
              />
            ) : (
              <CollapsibleTable
                loading={tableLoading}
                rows={renderedRows}
                columns={reqProdiAllColumns}
                hideCollapsible={(params) => params?.row?.jumlah == 0}
                getCollabsibleTableRow={(akredit) => akredit.data}
                collabsibleTableColumns={[
                  {
                    field: "no",
                    headerName: "#",
                    sortable: false,
                    headerAlign: "center",
                    align: "center",
                    renderCell: (params) => {
                      return (
                        <div className="table-manual">
                          <div className="subtitle">
                            {params.row.rowIndex + 1}
                          </div>
                        </div>
                      );
                    },
                  },
                  {
                    field: "programStudi",
                    headerName: "Program Studi",
                    sortable: false,
                    headerAlign: "center",
                    flex: 1,
                    renderCell: (params) => {
                      return (
                        <div className="table-manual">
                          <div className="subtitle">{params.row.namaProdi}</div>
                        </div>
                      );
                    },
                  },
                  {
                    field: "jenjang",
                    headerName: "Jenjang",
                    sortable: false,
                    headerAlign: "center",
                    align: "center",
                    flex: 1,
                    renderCell: (params) => {
                      return (
                        <div className="table-manual">
                          <div className="subtitle">
                            {params.row.jenjangStr}
                          </div>
                        </div>
                      );
                    },
                  },
                ]}
              />
            )}
          </div>
        </ContentCard>
      </ContentContainer>

      {/* Modal  req prodi*/}
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton
            sx={{ position: "absolute", top: 5, right: 5 }}
            onClick={closeModal}
            aria-label="close"
          >
            <HighlightOffIcon color="error" />
          </IconButton>
          <Box className='p-4'>
            <div>
              <h1 style={{
                color: darkMode ? "white" : ""
              }} className="fs-5" data-aos="zoom-in-right" data-aos-duration="1000">
                Formulir Usulan Prodi Baru
              </h1>
            </div>
            <div
              style={{
                border: "1px solid #FF9800",
                backgroundColor: "#FFF3E0",
                borderRadius: "8px",
              }}
              className="alert alert-danger"
              role="alert"
              data-aos="zoom-in-left"
              data-aos-duration="1000"
            >
              <p className="text-dark" data-aos="zoom-in-right" data-aos-duration="1000">
                <ExclamationCircleWarningIcon />
                Info
              </p>
              <p className="inf ms-4" data-aos="zoom-in-left" data-aos-duration="1000">
                Prodi yang diusulkan harus didaftarkan melalui form ini dan melengkapi seluruh dokumen yang disyaratkan. Pastikan sudah membaca
                <a
                  style={{ cursor: "pointer" }}
                  className="text-success fw-bold ms-2 me-2"
                  data-aos="zoom-in-right"
                  data-aos-duration="1000"
                  href="/ketentuan"
                  target="_blank"
                >
                  Petunjuk Teknis terkait prasyarat
                </a>
                usulan Prodi kaitannya dengan Prodi yang eksisting. Jika tidak memenuhi prasyarat tersebut, maka usulan akan dipending atau dikembalikan.
              </p>
            </div>

            {/* Jenis Pendidikan */}
            <div className="d-flex mb-4 row">
              <div className="col-4">
                <label
                  style={{
                    fontWeight: "600",
                    fontSize: "16px",
                    marginRight: '20px',
                    color: darkMode ? "white" : ""
                  }}
                  className="mt-1 "
                >
                  Jenis Pendidikan
                </label>
              </div>

              <div className="col-8 d-flex flex-sm-row flex-column">
                <div className="form-check me-5">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    value="akademik"
                    checked={selectedRadio === 'akademik'}
                    onChange={handleRadioChange}
                  />
                  <label className="form-check-label" style={{
                    color: darkMode ? "white" : ""
                  }} htmlFor="flexRadioDefault1">
                    Akademik
                  </label>
                </div>

                <div className="form-check me-5">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    value="vokasi"
                    checked={selectedRadio === 'vokasi'}
                    onChange={handleRadioChange}
                  />
                  <label className="form-check-label " style={{
                    color: darkMode ? "white" : ""
                  }} htmlFor="flexRadioDefault2">
                    Vokasi
                  </label>
                </div>

                <div className="form-check me-5">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault3"
                    value="profesi"
                    checked={selectedRadio === 'profesi'}
                    onChange={handleRadioChange}
                  />
                  <label className="form-check-label " style={{
                    color: darkMode ? "white" : ""
                  }} htmlFor="flexRadioDefault3">
                    Profesi
                  </label>
                </div>
              </div>
            </div>

            {/* Jenjang */}
            <div className="mb-4 row">
              <div className="d-flex">
                <div className="col-4">
                  <label
                    style={{
                      fontWeight: "600",
                      fontSize: "16px",
                      marginRight: '20px',
                      color: darkMode ? "white" : ""
                    }}
                    className="mt-1 "
                  >
                    Jenjang
                  </label>
                </div>
                <div className="col-8">
                  <select
                    value={selectedJenjang}
                    onChange={handleJenjangChange}
                    className="form-select me-2 w-100"
                  >
                    <option value={99} disabled>
                      Pilih Jenjang
                    </option>
                    {selectedRadio === 'akademik' && (
                      <>
                        <option value={1}>Sarjana</option>
                        <option value={2}>Magister</option>
                        <option value={3}>Doktor</option>
                      </>
                    )}
                    {selectedRadio === 'vokasi' && (
                      <>
                        <option value={4}>Diploma IV / Sarjana Terapan</option>
                        <option value={5}>Magister Terapan</option>
                        <option value={6}>Doktor Terapan</option>
                      </>
                    )}
                    {selectedRadio === 'profesi' && (
                      <option value={7}>Pendidikan Profesi</option>
                    )}
                  </select>
                </div>
              </div>
            </div>

            {/* Prodi */}
            <div className="row">
              <div className="d-flex">
                <div className="col-4">
                  <label
                    style={{
                      fontWeight: "600",
                      fontSize: "16px",
                      color: darkMode ? "white" : ""
                    }}
                    className="mt-1  me-5"
                  >
                    Prodi
                  </label>
                </div>

                <div className="col-8">

                  <Select
                    value={prodiOptions.find(option => option.value === selectedProdi)}
                    onChange={handleProdiChange}
                    options={prodiOptions.map(prodi => ({
                      value: prodi.id,
                      label: prodi.namaProdi
                    }))}
                    placeholder="Pilih Prodi"
                    isClearable
                    isSearchable
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        minHeight: '50px',
                      }),
                      menu: (baseStyles, state) => ({
                        ...baseStyles,
                        maxHeight: '300px',
                      }),
                      option: (baseStyles, state) => ({
                        ...baseStyles,
                        padding: '10px 12px',
                      }),
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 ms-auto justify-content-end d-flex flex-sm-row flex-column gap-2">
              <Button
                onClick={closeModal}
                type="button"
                size="small"
                variant="outlined"
                color="error"
                sx={{ paddingX: "39px", paddingY: "3.5px", marginRight: "8px" }}
              >
                Batal
              </Button>
              <button
                onClick={handleCreateProdi}
                type="button"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Menyimpan...' : 'Daftar Prodi'}
              </button>
            </div>
          </Box>
        </Box>
      </Modal>


      {/* modal panduan */}
      <Modal
        open={showVideoModal}
        onClose={handleCloseModal}
        aria-labelledby="video-modal-title"
        aria-describedby="video-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          maxWidth: 800,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}>
          <button
            onClick={handleCloseModal}
            style={{
              position: 'absolute',
              right: 8,
              top: 8,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <CloseIcon sx={{ fontSize: 24 }} />
          </button>
          <iframe
            width="100%"
            height="450"
            src="https://www.youtube.com/embed/7nwOKEgw2HY?si=X9hHjN-EUD-Xb18b"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Box>
      </Modal>
    </>
  );
};

export default CardUsulan;
