import React, { useEffect, useMemo, useState } from "react";
import "../../../../views/kasubdit/admin-kasubdit.css";
import penilaian from "../../../../assets/penilaian.svg";
import doc from "../../../../assets/doc.svg";
import banpt from "../../../../assets/banpt.svg";
import penyiapan from "../../../../assets/penyiapan.svg";
import terbit from "../../../../assets/certificate.svg";
import progress from "../../../../assets/progress.svg";
import HeroTitle from "../../../../components/hero-title/HeroTitle";
import ContentContainer from "../../../../components/card-container/ContentContainer";
import ContentCard from "../../../../components/card-content/ContentCard";
import AsyncTable from "../../../../components/table/AsyncTable";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import DropdownAksi from "../../../../components/dropdown/DropdownAksi";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import IconButton from "@mui/material/IconButton";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import logo from '../../../../assets/logo.svg'
import logo1 from '../../../../assets/pusaka3.png'
import { Helmet } from "react-helmet";
import './usulan.css';
import {
  ErrorSwal,
  StartLoading,
  InputSwal,
  CloseLoading,
} from "../../../../utils/swal2";
import { getToken, getUserId, getRole } from "../../../../utils/token";
import axios from "axios";
import { GetApiBaseUrl } from "../../../../utils/env";
import Box from "@mui/material/Box";
import { ButtonGroup } from '@mui/material';
import { CheckCircle, Visibility } from '@mui/icons-material';

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Link } from "react-router-dom";
import "moment/locale/id";
import FormPenilaianSarjana from "../../module/usulan-prodi/ui-form-val/penilaian-validator/ak/sarjana/form-penilaian-sarjana/edit/editPenilaianAssesor";
import FormPenilaianDoktor from "../../module/usulan-prodi/ui-form-val/penilaian-validator/ak/doktor/form-penilaian-doctor/edit/editPenilaianAssesor";
import FormPenilaianMagister from "../../module/usulan-prodi/ui-form-val/penilaian-validator/ak/magister/form-penilaian-magister/edit/editPenilaianAssesor";
import FormPenilaianProfesi from "../../module/usulan-prodi/ui-form-val/penilaian-validator/ak/profesi/form-penilaian-profesi/edit/editPenilaianAssesor";
import ProdiActionName from "../../../../utils/status";
import Swal from "sweetalert2";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { CardContent, useMediaQuery } from "@mui/material";
import * as XLSX from 'xlsx';
import api from "../../../service/api";
import DownloadIcon from '@mui/icons-material/Download';
import XCircleIcon from "../../../../components/icons/XCircleIcon";
import FunnelIcon from "../../../../components/icons/FunnelIcon";
import CircularProgress from '@mui/material/CircularProgress';
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Checkbox from '@mui/material/Checkbox';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js';
import { motion } from 'framer-motion';
import { ClipLoader } from "react-spinners";
import SelectOptions from '../../../../utils/selectOptions';
import { useDarkMode } from "../../../../utils/DarkModeContext";
import { Tooltip } from '@mui/material';
import { styled } from '@mui/system';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { color } from 'framer-motion';
import DokumenKMAIzin from '../../../../components/dokumen/DokumenKMAIzin'
const CardUsulan = () => {
  const { darkMode } = useDarkMode();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: '80%',
    overflow: 'auto',
    maxWidth: 1500,
    bgcolor: darkMode ? "#3C5B6F" : "background.paper",
    boxShadow: 24,
    borderRadius: "10px",
  };
  const styles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: '90%',
    maxWidth: 1500,
    bgcolor: darkMode ? "#3C5B6F" : "background.paper",
    boxShadow: 24,
    borderRadius: "10px",
  };
  const [view, setView] = useState(1);
  const [page, setPage] = useState(localStorage.getItem("currentPage") || null);
  const [tableLoading, setTableLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const isScreenSizeLowerThanLg = useMediaQuery("(max-width: 990px)");
  const isScreenSizeLowerThanMD = useMediaQuery(("(max-width: 550px"))
  const [selectedStatus, setSelectedStatus] = useState("banpt");
  const [selectedStatus0, setSelectedStatus0] = useState('');
  const [selectedStatus2, setSelectedStatus2] = useState('');
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const tanggalTerikini = new Date();
  const tanggalFormatted = tanggalTerikini.toLocaleDateString('id-ID', options);
  useEffect(() => {
    if (page !== null) {
      localStorage.setItem("currentPage", page);
    }
  }, [page]);
  const handleClick = () => {
    navigate("/ketentuan");
  };
  const token = getToken();
  const baseUrl = GetApiBaseUrl();
  const indexedRows = useMemo(() => {
    return rows.map((item, i) => ({
      ...item,
      rowIndex: i,
    }));
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [year, setYear] = useState('');
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
  const handleOpenTahun = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseTahun = () => {
    setAnchorEl(null);
  };
  const handleYearSelect = (selectedYear) => {
    setYear(selectedYear);
    handleCloseTahun();
  };
  const getDefaultDate = () => {
    const currentDate = new Date();
    const oneYearAgo = new Date(currentDate.getFullYear() - 5, currentDate.getMonth(), currentDate.getDate());
    return oneYearAgo.toISOString().split('T')[0];
  };
  const [startDate, setStartDate] = useState(getDefaultDate());
  const currentDate = new Date();
  const oneYearLater = new Date(currentDate);
  oneYearLater.setFullYear(currentDate.getFullYear() + 1);
  oneYearLater.setDate(currentDate.getDate() + 1);
  const [endDate, setEndDate] = useState(oneYearLater.toISOString().split('T')[0]);
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };
  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };
  const statusOptions = ["banpt", "lamemba", "lamdik"];
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const getStatusTextExcel = (status) => {
    const statusValues = {
      0: 'Dokumen Belum Lengkap',
      1: 'Dokumen Selesai',
      2: 'Dokumen Sudah Lengkap',
      3: 'Sudah Perbaikan',
      9: 'Permintaan Dibatalkan',
      10: 'Dokumen Usulan Lengkap',
      19: 'Dokumen dikembalikan',
      20: 'Penawaran Assessment',
      21: 'Assessment Kecukupan oleh Evaluator',
      22: 'Assessment Berlangsung',
      23: 'Assessment Evaluator Selesai',
      24: 'Lokasi Assessment Progress',
      26: 'Assessment selesai',
      27: 'Usulan di Kembalikan ke User',
      28: 'Assessment Kadaluarsa',
      29: 'Assessment Dibatalkan',
      40: 'Valid untuk Lembaga Akreditasi',
      41: 'Dalam validasi',
      50: 'Validasi Ban PT / LAM',
      51: 'Dalam Proses SK',
      52: 'SK diunggah dan paraf 1',
      53: 'SK diunggah dan paraf 2',
      54: 'SK diunggah dan paraf 3',
      55: 'SK diunggah dan paraf 4',
      60: 'Penerbitan Izin',
      99: 'di Kembalikan',
      221: 'Penugasan Penilaian Lapangan',
      222: 'Penilaian Lapangan Sedang Berlangsung',
      223: 'Penilaian Lapangan Selesai',
      226: 'Semua Penilaian Lapangan Selesai',
      227: 'Penilaian Lapangan dikembalikan',
      299: 'Validasi BANPT/LAM dikembalikan',
      521: 'KMA diunggah dan paraf 1',
      522: 'KMA diunggah dan paraf 2',
      523: 'KMA diunggah dan paraf 3',
      524: 'KMA diunggah dan paraf 4',
      525: 'KMA Final',
      526: 'KMA diunggah dan paraf 6',
      527: 'KMA diunggah dan paraf 7',
      528: 'KMA diunggah dan paraf 8',
      529: 'KMA diunggah dan paraf 9'
    };
    const statusKey = status.toString();
    return statusValues[statusKey] || '-';
  };

  const exportToExcel = () => {
    const fileName = 'UsulanProdi.xlsx';

    const filteredData = rows.filter((row) => {
      const requestTime = new Date(row.RequestTime);
      return requestTime >= new Date(startDate) && requestTime <= new Date(endDate);
    });

    const exportData = filteredData.map((row) => ({
      NoReg: row.NoReg,
      NamaProdi: row.NamaProdi,
      NamaPerguruan: row.NamaPerguruan,
      JenjangStr: row.JenjangStr,
      Status: `${getStatusTextExcel(row.Status)}${row.AssesmentCount ? ` (${row.AssesmentCount})` : ''}`,
      TanggalUsulan: row.RequestTime ? format(new Date(row.RequestTime), 'd MMMM yyyy', { locale: id }) : '',
      TanggalUpdate: row.ModifiedTime
        ? format(new Date(row.ModifiedTime), 'd MMMM yyyy', { locale: id })
        : '',
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, fileName);
  };
  const handleApproveSK = (id, note, fileDrafKMA, fileSuratPengantar, fileNotaDinas) => {
    StartLoading();
    const formData = new FormData();
    formData.append("note", note);
    formData.append("file", fileDrafKMA);
    formData.append("file2", fileSuratPengantar);
    formData.append("file3", fileNotaDinas);

    axios
      .post(`${baseUrl}/prodi/toskinprogress?${id}&note=${note}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.data.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: response.data.message,
            timer: 3000,
          });
          fetchProdi();
        }
      })
      .catch((error) => {
        if (error.response) {
          Swal.fire({
            icon: "error",
            title: "Gagal Konfirmasi",
            text: error.response.data.message,
          });
        } else {
          ErrorSwal("Gagal Konfirmasi", "Terjadi kesalahan");
        }
      });
  };
  const [file, setFile] = useState(null);
  const [note, setNote] = useState("");
  const [prodiData, setProdiData] = useState([]);
  const [openKonfirmasi, setOpenKonfirmasi] = useState(false);
  const [prodiValid, setProdiValid] = useState([]);
  const [prodiFail, setProdiFail] = useState([]);
  const handleOpenKonfirmasi = () => {
    setOpenKonfirmasi(true);
  };
  const fetchProdiData = (prodiId) => {
    axios
      .get(`${baseUrl}/prodi/akreditasibundle/${prodiId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.status === 200) {
          setProdiData(response.data.data);
          handleOpenKonfirmasi();
        } else {
          setOpenKonfirmasi(false);
          Swal.fire({
            icon: "error",
            title: "Gagal Konfirmasi",
            text: `${error.response.data.message}`,
          });
        }
      })
      .catch((error) => {
        setOpenKonfirmasi(false);
        Swal.fire({
          icon: "error",
          title: "Gagal Konfirmasi",
          text: `${error.response.data.message}`,
        });
      })
  };
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const handleDoneClick = (index) => {
    const selectedId = prodiData[index].id;
    if (!prodiValid.includes(selectedId)) {
      setProdiValid([...prodiValid, selectedId]);
    }
    if (prodiFail.includes(selectedId)) {
      setProdiFail(prodiFail.filter((id) => id !== selectedId));
    }
  };
  const handleErrorClick = (index) => {
    const selectedId = prodiData[index].id;
    if (!prodiFail.includes(selectedId)) {
      setProdiFail([...prodiFail, selectedId]);
    }
    if (prodiValid.includes(selectedId)) {
      setProdiValid(prodiValid.filter((id) => id !== selectedId));
    }
  };
  const handleApproveSKValidate = (id, note, file) => {
    if (!file) {
      Swal.fire({
        icon: "error",
        title: "Gagal Konfirmasi",
        text: "The file field is required.",
      });
      return;
    }

    StartLoading();
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post(`${baseUrl}/prodi/validate?prodiValid=${prodiValid.join(",")}&prodiFail=${prodiFail.join(",")}&note=${note}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.data.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: response.data.message,
            timer: 3000,
          });
          fetchProdi();
        }
      })
      .catch((error) => {
        if (error.response) {
          Swal.fire({
            icon: "error",
            title: "Gagal",
            text: error.response.data.message,
          });
        } else {
          ErrorSwal("Gagal Konfirmasi", "Terjadi kesalahan");
        }
      });
  };
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const handleCloseDetailModalOpen = () => setDetailModalOpen(false);
  const [detailModalOpenAL, setDetailModalOpenAL] = useState(false);
  const handleCloseDetailModalOpenAL = () => setDetailModalOpenAL(false);
  ////////////////////////////////////////////////////
  const [detailData, setDetailData] = useState([]);
  const [detailDataAL, setDetailDataAL] = useState([]);
  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", options);
  }
  const [fileUrl, setFileUrl] = useState(null);
  const handleDownloadFile = async (programStudiId, status) => {
    try {
      const response = await api.get(`/prodi/actionfile/${programStudiId}/${status}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      });

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

        // Get the filename from the Content-Disposition header
        const contentDisposition = response.headers['content-disposition'];
        let filename = 'downloaded_file.zip';
        if (contentDisposition) {
          const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
          const matches = filenameRegex.exec(contentDisposition);
          if (matches != null && matches[1]) {
            filename = matches[1].replace(/['"]/g, '');
          }
        }

        const blob = new Blob([response.data], { type: 'application/octet-stream' });
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = filename;

        setTimeout(() => {
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(downloadUrl);
          setFileUrl(filename);
          swal.close();
        }, 1000);
      } else {
        const errorResponse = await response.json();
        console.error('Failed to download file. Status:', response.status);
        swal({
          title: 'Error!',
          text: `Gagal : ${response.status}. ${errorResponse.message}`,
          icon: 'error',
        });
      }
    } catch (error) {
      console.log('Error while downloading file:', error);
      swal({
        icon: 'error',
        title: 'Error!',
        text: error.message,
      });
    }
  };
  const [selectedAsesorIdsToValidate, setSelectedAsesorIdsToValidate] = useState([]);

  const validasiColumns = [
    {
      field: "no",
      headerName: "#",
      // flex: 0.3,
      width: isScreenSizeLowerThanLg ? 50 : '',
      flex: isScreenSizeLowerThanLg ? 0 : 0.3,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className="table-manual">
            <div className="subtitle">{params.row.rowIndex + 1}</div>
          </div>
        );
      },
    },
    {
      field: "namaProdi",
      headerName: "Program Studi & Jenjang",
      // flex: 2,
      width: isScreenSizeLowerThanLg ? 350 : '',
      flex: isScreenSizeLowerThanLg ? 0 : 2,
      sortable: false,
      headerAlign: "center",
      renderCell: (params) => {
        const targetDate = new Date(params.row.ModifiedTime);
        const today = new Date();
        const threeDaysAgo = new Date(today);
        threeDaysAgo.setDate(today.getDate() - 3);

        const shouldDisplay = targetDate <= today && targetDate >= threeDaysAgo;

        return (
          <div className="table-manual" style={{ textAlign: 'left', width: '100%' }}>
            <div className="subtitle">{params.row.NamaProdi}</div>
            <div className="subtitle">{params.row.JenjangStr}
              {shouldDisplay && (
                <span className="ms-1" style={{ backgroundColor: 'green', width: '50px', height: '20px', color: 'white', paddingLeft: '5px', paddingRight: '5px', borderRadius: '3px' }}>Baru</span>
              )}
            </div>
          </div>
        );
      },
    },
    {
      field: "lembaga",
      headerName: "Lembaga & Noreg",
      // flex: 4,
      width: isScreenSizeLowerThanLg ? 350 : '',
      flex: isScreenSizeLowerThanLg ? 0 : 4,
      sortable: false,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className="table-manual">
            <div className="subtitle" style={{ textTransform: "capitalize" }}>
              {params.row.NamaPerguruan}
            </div>
            <div className="subtitle">{params.row.NoReg}</div>
          </div>
        );
      },
    },
    {
      field: "dokstatus",
      headerName: "Status",
      // flex: 3,
      width: isScreenSizeLowerThanLg ? 350 : '',
      flex: isScreenSizeLowerThanLg ? 0 : 3,
      sortable: false,
      headerAlign: "center",
      renderCell: (params) => {
        const selectedStatuss = selectedStatus
        return (
          <div className="table-manual  m-auto d-flex gap-2">
            <div>
              <ProdiActionName status={params.row.Status} />
            </div>
            <p style={{ color: darkMode ? "white" : "green", }} className=" text-uppercase fw-bold mt-2">
              {selectedStatuss}
            </p>
          </div>
        );
      },
    },
    {
      field: "tglkonfirmasi",
      headerName: "Tanggal diusulkan",
      // flex: 1.6,
      width: isScreenSizeLowerThanLg ? 200 : '',
      flex: isScreenSizeLowerThanLg ? 0 : 1.6,
      sortable: false,
      headerAlign: "left",
      renderCell: (params) => {
        return (
          <div className="table-manual">
            <span className="subtitle">
              {params.row.ValidBanPtTime ? formatDate(params.row.ValidBanPtTime) : 'Tanggal tidak tesedia'}
            </span>
          </div>
        );
      },
    },
    {
      field: "tglUpdate",
      headerName: "Tanggal Update",
      // flex: 1.6,
      width: isScreenSizeLowerThanLg ? 200 : '',
      flex: isScreenSizeLowerThanLg ? 0 : 1.6,
      sortable: false,
      headerAlign: "left",
      renderCell: (params) => {
        return (
          <div className="table-manual">
            <span className="subtitle">
              {params.row.ModifiedTime ? formatDate(params.row.ModifiedTime) : "Tanggal tidak tersedia"}
            </span>
          </div>
        );
      },
    },
    {
      field: "aksi",
      headerName: "",
      // flex: 1,
      width: isScreenSizeLowerThanLg ? 130 : '',
      flex: isScreenSizeLowerThanLg ? 0 : 1,
      sortable: false,
      headerAlign: "center",
      renderCell: (params) => {
        const [open, setOpen] = useState(false);
        const handleOpen = () => {
          setOpen(true);
        };
        const handleClose = () => {
          setOpen(false);
        };
        const [historyData, setHistoryData] = useState([]);
        const fetchProdiHistory = (prodiId) => {
          axios
            .get(`${baseUrl}/prodi/${prodiId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              if (response.data.status === 200) {
                const prodiHistory = response.data.data;
                setHistoryData(prodiHistory?.prodiActions);
                handleOpen();
              } else {
                ErrorSwal(`${response.data.message}`);
              }
            })
            .catch(() => {
              ErrorSwal("Fetching Data Failed");
            });
        };


        const [openKonfirmasi, setOpenKonfirmasi] = useState(false);
        const handleOpenKonfirmasi = () => {
          setOpenKonfirmasi(true);
        };
        const handleCloseKonfirmasi = () => {
          setOpenKonfirmasi(false);
        };
        const [note, setNote] = useState('');
        const status = params.row.Status;

        const [selectedOption, setSelectedOption] = useState('');

        const [status1, setStatus1] = useState(params.row.Status);

        const handleSelectChange = (e) => {
          setSelectedOption(e.target.value);
          if (e.target.value !== 'other') {
            setNote(e.target.value);
          } else {
            setStatus1(e.target.value);
          }
        };


        return (
          <>
            <DropdownAksi
              itemComponent={
                <>
                  <MenuItem onClick={() => fetchProdiHistory(params.row.Id)}>Riwayat</MenuItem>
                  <MenuItem>
                    <a
                      href={fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      style={{ color: 'black', textDecoration: 'underline' }}
                    >  <span
                      style={{ cursor: 'pointer' }}
                      onClick={() =>
                        // handleDownloadFileZip(
                        //   params.row.Id,
                        //   params.row.Status,
                        // )
                        handleDownloadFile(
                          params.row.Id,
                          params.row.Status,
                        )

                      }
                    >
                        Lihat File
                      </span>
                    </a>
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleDetailClick(params.row.Id)}
                  >
                    Detail Asesment
                  </MenuItem>
                  {status !== 299 && (
                    <MenuItem
                      onClick={() => {
                        if (status === 51 || status === 50) {
                          Swal.fire({
                            title: "Konfirmasi Validasi Lembaga Selesai",
                            html: `
        <div class="form-group">
            <label for="file" class="form-label">Upload Draf KMA</label>
            <input class="form-control w-75 m-auto" type="file" id="file">
        </div>
        <div class="form-group">
            <label for="file2" class="form-label mt-4">Upload Surat Pengantar</label>
            <input class="form-control w-75 m-auto" type="file" id="file2">
        </div>
        <div class="form-group">
            <label for="file3" class="form-label mt-4">Upload Nota Dinas</label>
            <input class="form-control w-75 m-auto" type="file" id="file3">
        </div>
        <div>
         <select id="swal-select" class="swal2-select" style="width: 76%;" onchange="showTextarea()">
  <option value="Usulan program studi anda diterima lembaga akreditasi dan diteruskan untuk proses SK">Usulan program studi anda diterima lembaga akreditasi dan diteruskan untuk proses SK</option>
  <option value="Usulan program studi anda belum diterima lembaga akreditasi dan dikembalikan ke Kementerian Agama">Usulan program studi anda belum diterima lembaga akreditasi dan dikembalikan ke Kementerian Agama</option>
  <option value="Usulan program studi anda sedang divalidasi oleh lembaga akreditasi">Usulan program studi anda sedang divalidasi oleh lembaga akreditasi</option>
  <option value="Evaluasi Direkomendasi, usul masuk proses validasi pemenuhan syarat akreditasi oleh BANPT/LAMPT">Evaluasi Direkomendasi, usul masuk proses validasi pemenuhan syarat akreditasi oleh BANPT/LAMPT</option>
  <option value="other">Lainnya</option>
</select>
<textarea id="swal-textarea" class="swal2-textarea ms-5" placeholder="Konfirmasi dengan catatan" style="width: 76%; margin-top: 10px; display: none;"></textarea>
        </div>
    `,
                            inputLabel: "Konfirmasi dengan catatan (opsional)",
                            inputAttributes: {
                              "aria-label": "Placeholder...",
                            },
                            showCancelButton: true,
                            confirmButtonText: "Konfirmasi",
                            cancelButtonText: "Batal",

                            preConfirm: () => {
                              const fileInputDrafKMA = document.getElementById("file").files[0];
                              const fileInputSuratPengantar = document.getElementById("file2").files[0];
                              const fileInputNotaDinas = document.getElementById("file3").files[0];
                              const selectedOption = document.getElementById('swal-select').value;
                              if (selectedOption === 'other') {
                                const textareaValue = document.getElementById('swal-textarea').value;
                                handleApproveSK(params.row.Id, textareaValue, fileInputDrafKMA, fileInputSuratPengantar, fileInputNotaDinas);
                              } else {
                                handleApproveSK(params.row.Id, selectedOption, fileInputDrafKMA, fileInputSuratPengantar, fileInputNotaDinas);
                              }


                            },
                            didOpen: () => {
                              window.showTextarea = function () {
                                const selectedOption = document.getElementById('swal-select').value;
                                const textarea = document.getElementById('swal-textarea');
                                if (selectedOption === 'other') {
                                  textarea.style.display = 'block';
                                } else {
                                  textarea.style.display = 'none';
                                }
                              };
                            }
                          })
                        } else if (status === 41) {
                          fetchProdiData(params.row.Id);
                          // handleOpenKonfirmasi()
                        }
                      }}
                    >
                      {status === 41 ? " Konfirmasi Validasi" : "Konfirmasi untuk proses Penyiapan KMA Biro"}
                    </MenuItem>
                  )}
                  {/* {status !== 99 && status !== 27 && (
                    <MenuItem
                      onClick={() => {
                        InputSwal("Catatan Pengembalian", "Placeholder...", (note) => {
                          handleRejectWithNote(params.row.Id, note);
                        });
                      }}
                    >
                      Kembalikan dengan catatan
                    </MenuItem>
                  )} */}
                </>
              }
            />

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
                  <Box sx={{ padding: 2, overflow: 'auto' }} id="riwayatModalContent">
                    <div style={{
                      padding: '5px',
                      margin: '5px'
                    }}>
                      <div style={{ color: darkMode ? "white" : "", }} className="d-flex gap-4">
                        <div >
                          <p>Nama Perguruan</p>
                          <p>Nama Prodi</p>
                          <p>Jenjang</p>
                          <p>NoReg</p>
                        </div>
                        <div >
                          <p>: </p>
                          <p>: </p>
                          <p>: </p>
                          <p>: </p>
                        </div>
                        <div >
                          <p>{params.row.NamaPerguruan}</p>
                          <p>{params.row.NamaProdi}</p>
                          <p>{params.row.JenjangStr}</p>
                          <p>{params.row.NoReg}</p>
                        </div>
                      </div>
                    </div>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                      style={{ margin: '10px', color: darkMode ? "white" : "", }}
                    >
                      Riwayat Proses Tahapan Usulan Prodi
                      <Button sx={{ marginLeft: '10px' }} variant="contained" size="small" onClick={exportToPDF}>Export</Button>
                    </Typography>
                    <Paper
                      sx={{
                        width: "100%",
                        overflow: "auto",
                      }}
                    >
                      <TableContainer id="tableContainer1" sx={{ maxHeight: 440, overflow: 'auto' }}>
                        <Table stickyHeader aria-label="sticky table" sx={{ overflow: 'auto' }}>
                          <TableHead>
                            <TableRow tyle={{
                              backgroundColor: darkMode ? "#40679E" : "",
                              color: darkMode ? "white" : "",
                            }} >
                              <TableCell style={{
                                backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                                border: "none",
                                color: darkMode ? "white" : "",
                              }}>Status</TableCell>
                              <TableCell style={{
                                backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                                border: "none",
                                color: darkMode ? "white" : "",
                              }}>Oleh</TableCell>
                              <TableCell style={{
                                backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                                border: "none",
                                color: darkMode ? "white" : "",
                              }}>Tanggal</TableCell>
                              <TableCell style={{
                                backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                                border: "none",
                                color: darkMode ? "white" : "",
                              }}>Catatan</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody id="riwayatTableBody">
                            {historyData.length > 0 ? (
                              historyData.map((prodiAction) => (
                                <TableRow style={{
                                  backgroundColor: darkMode ? "#40679E" : "",
                                  color: darkMode ? "white" : "",
                                }} key={prodiAction.id} hover tabIndex={-1}>
                                  <TableCell style={{ color: darkMode ? "white" : "", }}>
                                    <ProdiActionName status={prodiAction.action} />
                                  </TableCell>
                                  <TableCell style={{ color: darkMode ? "white" : "", }}>{prodiAction.actionBy?.fullName || "-"}</TableCell>
                                  <TableCell style={{ color: darkMode ? "white" : "", }}>{formatDate(prodiAction.timeCreated || null)}</TableCell>
                                  <TableCell style={{ color: darkMode ? "white" : "", }}>{prodiAction.message || "-"}</TableCell>
                                </TableRow>
                              ))
                            ) : (
                              <TableRow style={{
                                backgroundColor: darkMode ? "#40679E" : "",
                                color: darkMode ? "white" : "",
                              }}>
                                <TableCell style={{ color: darkMode ? "white" : "", }} colSpan={4}>Tidak Ada Data</TableCell>
                              </TableRow>
                            )}

                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Paper>

                  </Box>
                </Box>
              </Modal>
            )}

            {openKonfirmasi && (
              <Modal open={openKonfirmasi} onClose={handleCloseKonfirmasi} aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                  <IconButton
                    sx={{ position: "absolute", top: 5, right: 5 }}
                    onClick={handleCloseKonfirmasi}
                    aria-label="close"
                  >
                    <HighlightOffIcon color="error" />
                  </IconButton>
                  <Box sx={{ padding: 2, overflow: 'auto' }} >
                    <div style={{
                      padding: '5px',
                      margin: '5px',
                      color: darkMode ? "white" : "",
                    }}>
                      <Typography variant="h6" className="mb-2">Konfirmasi Validasi Lembaga Akreditasi</Typography>
                      <div className="form-group d-flex">
                        <input className="form-control w-full mb-3" accept="application/pdf" type="file" id="fileInput" onChange={handleFileChange} />
                      </div>
                      <TableContainer className="mb-3" id="tableContainer1" sx={{ maxHeight: 440, overflow: 'auto' }}>
                        <Table stickyHeader aria-label="sticky table" sx={{ overflow: 'auto' }}>
                          <TableHead>
                            <TableRow style={{
                              backgroundColor: darkMode ? "#40679E" : "",
                              color: darkMode ? "white" : "",
                            }} >
                              <TableCell style={{
                                backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                                border: "none",
                                color: darkMode ? "white" : "", textAlign: 'center'
                              }}>Nama Prodi</TableCell>
                              <TableCell style={{
                                backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                                border: "none",
                                color: darkMode ? "white" : "", textAlign: 'center'
                              }}>Jenjang</TableCell>
                              <TableCell style={{
                                backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                                border: "none",
                                color: darkMode ? "white" : "", textAlign: 'center'
                              }}>Lembaga</TableCell>
                              <TableCell style={{
                                backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                                border: "none",
                                color: darkMode ? "white" : "", textAlign: 'center'
                              }}>Pilih</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {prodiData.map((prodi, index) => (
                              <TableRow style={{
                                backgroundColor: darkMode ? "#40679E" : "",
                                color: darkMode ? "white" : "",
                              }} key={index}>
                                <TableCell style={{ color: darkMode ? "white" : "", textAlign: 'center' }}>{prodi.namaProdi ? prodi.namaProdi : '-'}</TableCell>
                                <TableCell style={{ color: darkMode ? "white" : "", textAlign: 'center' }}>{prodi.jenjangStr ? prodi.jenjangStr : '-'}</TableCell>
                                <TableCell style={{ color: darkMode ? "white" : "", textAlign: 'center' }}>{prodi.namaPerguruan ? prodi.namaPerguruan : '-'}</TableCell>
                                <TableCell style={{ color: darkMode ? "white" : "", }}>
                                  <div style={{ display: 'flex', justifyContent: 'center', margin: 'auto' }}>
                                    <IconButton
                                      color={prodiValid.includes(prodi.id) ? "primary" : "default"}
                                      onClick={() => handleDoneClick(index)}
                                      disabled={prodiValid.length >= 2 && !prodiValid.includes(prodi.id)}
                                    >
                                      <CheckCircleOutlineIcon />
                                    </IconButton>
                                    <IconButton
                                      color={prodiFail.includes(prodi.id) ? "error" : "default"}
                                      onClick={() => handleErrorClick(index)}
                                      disabled={prodiFail.length >= 2 && !prodiFail.includes(prodi.id)}
                                    >
                                      <HighlightOffIcon />
                                    </IconButton>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <div className="form-group">
                        <select
                          id="swal-select"
                          className="swal2-select"
                          style={{ width: '100%', padding: '10px', fontSize: '16px' }}
                          value={selectedOption}
                          onChange={handleSelectChange}
                        >
                          <option value="Usulan program studi anda diterima lembaga akreditasi dan diteruskan untuk proses SK">Usulan program studi anda diterima lembaga akreditasi dan diteruskan untuk proses SK</option>
                          <option value="Usulan program studi anda belum diterima lembaga akreditasi dan dikembalikan ke Kementerian Agama">Usulan program studi anda belum diterima lembaga akreditasi dan dikembalikan ke Kementerian Agama</option>
                          <option value="Usulan program studi anda sedang divalidasi oleh lembaga akreditasi">Usulan program studi anda sedang divalidasi oleh lembaga akreditasi</option>
                          <option value="other">Lainnya</option>
                        </select>
                        {selectedOption === 'other' && (
                          <TextareaAutosize
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            rowsMin={5}
                            placeholder="Masukkan catatan"
                            style={{ width: '100%', padding: '10px', fontSize: '16px' }}
                          />
                        )}
                      </div>
                      <Button
                        onClick={() => {
                          handleApproveSKValidate(prodiData.Id, note, file);
                          handleCloseKonfirmasi();
                        }}
                        variant="contained"
                        className="mt-3"
                      >
                        Konfirmasi
                      </Button>
                    </div>
                  </Box>
                </Box>
              </Modal>
            )}
          </>
        );
      },
    },
  ];
  const [selectedAsesorIdsToSkInProgress, setSelectedAsesorIdsToSkInProgress] = useState([]);
  // get penilaian asesor
  const [page2, setPage2] = useState(0);
  const [rowsPerPage2, setRowsPerPage2] = React.useState(5);
  const handleChangePage2 = (event, newPage) => {
    setPage2(newPage);
  };
  const handleChangeRowsPerPage2 = (event) => {
    setRowsPerPage2(+event.target.value);
    setPage2(0);
  };
  const columns1 = [
    { id: "no", label: "No.", minWidth: 0, flex: 1 },
    {
      id: "namaAsesor",
      label: "Nama Asesor",
      minWidth: 230,
      align: "left",
      flex: 2,
    },
    {
      id: "email",
      label: "Email",
      minWidth: 170,
      align: "left",
      flex: 2,
    },
    {
      id: "status",
      label: "Status",
      minWidth: 220,
      align: "center",
      flex: 2,
    },
    {
      id: "durasipenawaran",
      label: "Tanggal Penawaran",
      minWidth: 220,
      align: "center",
      flex: 2,
    },
    {
      id: "selesaipenawaran",
      label: "Tanggal Penilaian",
      minWidth: 220,
      align: "center",
      flex: 2,
    },
    {
      id: "penilaianlapangan",
      label: "Total Nilai",
      minWidth: 170,
      align: "center",
      flex: 2,
    },
    {
      id: "rekomendasi,",
      label: "Rekomendasi",
      minWidth: 170,
      align: "center",
      flex: 2,
    },
    {
      id: "catatan",
      label: "Catatan",
      minWidth: 170,
      align: "center",
      flex: 2,
    },
    {
      id: "action",
      label: "",
      minWidth: 100,
      align: "center",
      flex: 1
    },
  ];
  const columnsAL = [
    { id: "no", label: "No.", minWidth: 0, flex: 1 },
    {
      id: "namaAsesor",
      label: "Nama Asesor",
      minWidth: 230,
      align: "left",
      flex: 2,
    },
    {
      id: "email",
      label: "Email",
      minWidth: 170,
      align: "left",
      flex: 2,
    },
    {
      id: "status",
      label: "Status",
      minWidth: 220,
      align: "center",
      flex: 2,
    },
    {
      id: "durasipenawaran",
      label: "Tanggal Penawaran",
      minWidth: 220,
      align: "center",
      flex: 2,
    },
    {
      id: "selesaipenawaran",
      label: "Tanggal Penilaian",
      minWidth: 220,
      align: "center",
      flex: 2,
    },
    {
      id: "penilaianlapangan",
      label: "Total Nilai",
      minWidth: 170,
      align: "center",
      flex: 2,
    },
    {
      id: "catatan",
      label: "Catatan",
      minWidth: 170,
      align: "center",
      flex: 2,
    },
    {
      id: "action",
      label: "",
      minWidth: 100,
      align: "center",
      flex: 1
    },
  ];
  function createData(
    no,
    namaAsesor,
    email,
    status,
    durasipenawaran,
    selesaipenawaran,
    penilaianlapangan,
    rekomendasi,
    catatan,
    action
  ) {
    return {
      no,
      namaAsesor,
      email,
      status,
      durasipenawaran,
      selesaipenawaran,
      penilaianlapangan,
      rekomendasi,
      catatan,
      action,
    };
  }
  const handleViewChange = (index, id) => {
    const openNewTab = (url) => {
      const newTab = window.open();
      newTab.opener = null;
      newTab.location.href = url;
    };

    switch (index) {
      case 0:
        openNewTab(`form-validator-banpt/sarjana/edit/${id}`);
        break;
      case 1:
        openNewTab(`form-validator-banpt/magister/edit/${id}`);
        break;
      case 2:
        openNewTab(`form-validator-banpt/doktor/edit/${id}`);
        break;
      case 3:
        openNewTab(`form-validator-banpt/profesi/edit/${id}`);
        break;
      case 4:
        openNewTab(`form-validator-banpt/div/edit/${id}`);
        break;
      default:
        break;
    }
  };
  const handleViewChangeAL = (index, id) => {
    const openNewTab = (url) => {
      const newTab = window.open();
      newTab.opener = null;
      newTab.location.href = url;
    };

    switch (index) {
      case 11:
        openNewTab(`form-validator-banpt/magister/editLapangan/${id}`);
        break;
      case 12:
        openNewTab(`form-validator-banpt/doktor/editLapangan/${id}`);
        break;
      case 13:
        openNewTab(`form-validator-banpt/profesi/editLapangan/${id}`);
        break;
      case 14:
        openNewTab(`form-validator-banpt/div/editLapangan/${id}`);
        break;
      default:
        break;
    }
  };
  const [isLoading, setIsLoading] = useState(false)
  const [detailAsesment, setDetailAsesment] = useState([])
  const handleDetailClick = (id) => {
    setDetailModalOpen(true);
    setIsLoading(true)
    axios
      .get(`${baseUrl}/prodi-assesment/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const result = response.data.data;
        setDetailData(result);
        setDetailAsesment(result[0]);
        console.log('detail', result[0])
        if (result && Array.isArray(result) && result.length > 0) {
          const asesors = result[0].asesors;
          if (Array.isArray(asesors)) {
            asesors.forEach((asesor) => {
              if (asesor.programStudiId !== undefined) {
                const programStudiId = asesor.programStudiId;
                localStorage.setItem("programStudiId", programStudiId);
              }
            });
          }
        }
      })
      .catch((error) => {
        console.error("Failed to fetch detail data", error);
        swal({
          icon: 'error',
          title: 'Error!',
          text: error.message,
        });
      })
      .finally(() => {
        setIsLoading(false)
      })
  };
  const [fileUrl1, setFileUrl1] = useState(null);
  const handleDownloadFilePenilaian = async (asesorId, programStudiId) => {
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
    try {
      const response = await api.get(`/prodi-assesment/form-ak-file/${asesorId}/${programStudiId}`, {
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

        saveAs(blob, fileName);

        setTimeout(() => {
          swal.close();
        }, 1000);
      } else if (response.status === 404) {
        swal({
          icon: 'error',
          title: `Error`,
          text: `Old assessment file not found.`,
        });
        swal.close();
      }
    } catch (error) {
      swal({
        icon: 'error',
        title: `Error`,
        text: error.message,
      });
    }
  };

  const handleDownloadFileALPenilaian = async (asesorId, programStudiId) => {
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
    try {
      const response = await api.get(`/prodi-assesment-al/form-al-file/${asesorId}/${programStudiId}`, {
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

        saveAs(blob, fileName);

        setTimeout(() => {
          swal.close();
        }, 1000);
      } else if (response.status === 404) {
        swal({
          icon: 'error',
          title: `Error`,
          text: `Old assessment file not found.`,
        });
        swal.close();
      }
    } catch (error) {
      swal({
        icon: 'error',
        title: `Error`,
        text: error.message,
      });
    }
  };
  const rows11 = detailData.flatMap((asesor) => {
    return asesor.asesors.map((innerAsesor, innerIndex) => {
      let assignmentButton;
      if (asesor.jenjang === "Doktor") {
        assignmentButton = (
          <DropdownAksi
            itemComponent={
              <>
                <MenuItem>
                  <a
                    href={fileUrl1}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >  <span
                    onClick={() =>
                      handleDownloadFilePenilaian(
                        innerAsesor.asesorId,
                        innerAsesor.programStudiId,
                      )
                    }
                  >
                      Export
                    </span>
                  </a>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleViewChange(
                      2,
                      innerAsesor.asesorId,
                      localStorage.getItem("testAsesorId")
                    );
                    // window.open('about:blank', '_blank');
                  }}

                >
                  Detail
                </MenuItem>
              </>
            }
          />
        );
      } else if (asesor.jenjang === "Sarjana") {
        assignmentButton = (
          <DropdownAksi
            itemComponent={
              <>
                <MenuItem>
                  <a
                    href={fileUrl1}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >  <span
                    onClick={() =>
                      handleDownloadFilePenilaian(
                        innerAsesor.asesorId,
                        innerAsesor.programStudiId,
                      )
                    }
                  >
                      Export
                    </span>
                  </a>
                </MenuItem>
                <MenuItem
                  onClick={() =>
                    handleViewChange(
                      0,
                      innerAsesor.asesorId,
                      localStorage.getItem("testAsesorId")
                    )
                  }
                >
                  Detail
                </MenuItem>
              </>
            }
          />
        );
      } else if (asesor.jenjang === "Magister") {
        assignmentButton = (
          <DropdownAksi
            itemComponent={
              <>
                <MenuItem>
                  <a
                    href={fileUrl1}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >  <span
                    onClick={() =>
                      handleDownloadFilePenilaian(
                        innerAsesor.asesorId,
                        innerAsesor.programStudiId,
                      )
                    }
                  >
                      Export
                    </span>
                  </a>
                </MenuItem>
                <MenuItem
                  onClick={() =>
                    handleViewChange(
                      1,
                      innerAsesor.asesorId,
                      localStorage.getItem("testAsesorId")
                    )
                  }
                >
                  Detail
                </MenuItem>
              </>
            }
          />
        );
      } else if (asesor.jenjang === "Profesi") {
        assignmentButton = (
          <DropdownAksi
            itemComponent={
              <>
                <MenuItem>
                  <a
                    href={fileUrl1}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >  <span
                    onClick={() =>
                      handleDownloadFilePenilaian(
                        innerAsesor.asesorId,
                        innerAsesor.programStudiId,
                      )
                    }
                  >
                      Export
                    </span>
                  </a>
                </MenuItem>
                <MenuItem
                  onClick={() =>
                    handleViewChange(
                      3,
                      innerAsesor.asesorId,
                      localStorage.getItem("testAsesorId")
                    )
                  }
                >
                  Detail
                </MenuItem>
              </>
            }
          />
        );
      } else if (asesor.jenjang === "Diploma IV/Sarjana Terapan") {
        assignmentButton = (
          <DropdownAksi
            itemComponent={
              <>
                <MenuItem>
                  <a
                    href={fileUrl1}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >  <span
                    onClick={() =>
                      handleDownloadFilePenilaian(
                        innerAsesor.asesorId,
                        innerAsesor.programStudiId,
                      )
                    }
                  >
                      Export
                    </span>
                  </a>
                </MenuItem>
                <MenuItem
                  onClick={() =>
                    handleViewChange(
                      4,
                      innerAsesor.asesorId,
                      localStorage.getItem("testAsesorId")
                    )
                  }
                >
                  Detail
                </MenuItem>
              </>
            }
          />
        )
      }
      const offeringTime = innerAsesor.assesmentOfferingTime
        ? new Date(innerAsesor.assesmentOfferingTime).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
        : "-";

      const acceptedTime = innerAsesor.assesmentAcceptedTime
        ? new Date(innerAsesor.assesmentAcceptedTime).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
        : "-";

      return createData(
        innerIndex + 1,
        innerAsesor.asesorFullName,
        innerAsesor.asesorEmail,
        <ProdiActionName status={innerAsesor.status} />,
        offeringTime,
        acceptedTime,
        innerAsesor.totalNilai,
        innerAsesor.rekomendasi,
        innerAsesor.komentar,
        assignmentButton
      );
    });
  });
  const rowsAL = detailDataAL.flatMap((asesor) => {
    return asesor.asesorALs.map((innerAsesor, innerIndex) => {
      let assignmentButton
      if (asesor.jenjang === "Doktor") {
        assignmentButton = (
          <DropdownAksi
            itemComponent={
              <>
                <MenuItem>
                  <a
                    href={fileUrl1}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >  <span
                    onClick={() =>
                      handleDownloadFileALPenilaian(
                        innerAsesor.asesorId,
                        innerAsesor.programStudiId,
                      )
                    }
                  >
                      Export
                    </span>
                  </a>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleViewChangeAL(
                      12,
                      innerAsesor.asesorId,
                      innerAsesor.programStudiId,
                    );
                    // window.open('about:blank', '_blank');
                  }}

                >
                  Detail
                </MenuItem>
              </>
            }
          />
        );
      } else if (asesor.jenjang === "Magister") {
        assignmentButton = (
          <DropdownAksi
            itemComponent={
              <>
                <MenuItem>
                  <a
                    href={fileUrl1}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >  <span
                    onClick={() =>
                      handleDownloadFileALPenilaian(
                        innerAsesor.asesorId,
                        innerAsesor.programStudiId,
                      )
                    }
                  >
                      Export
                    </span>
                  </a>
                </MenuItem>
                <MenuItem
                  onClick={() =>
                    handleViewChangeAL(
                      11,
                      innerAsesor.asesorId,
                      innerAsesor.programStudiId,
                    )
                  }
                >
                  Detail
                </MenuItem>
              </>
            }
          />
        );
      } else if (asesor.jenjang === "Profesi") {
        assignmentButton = (
          <DropdownAksi
            itemComponent={
              <>
                <MenuItem>
                  <a
                    href={fileUrl1}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >  <span
                    onClick={() =>
                      handleDownloadFileALPenilaian(
                        innerAsesor.asesorId,
                        innerAsesor.programStudiId,
                      )
                    }
                  >
                      Export
                    </span>
                  </a>
                </MenuItem>
                <MenuItem
                  onClick={() =>
                    handleViewChangeAL(
                      13,
                      innerAsesor.asesorId,
                      innerAsesor.programStudiId,
                    )
                  }
                >
                  Detail
                </MenuItem>
              </>
            }
          />
        );
      } else if (asesor.jenjang === "Diploma IV/Sarjana Terapan") {
        assignmentButton = (
          <DropdownAksi
            itemComponent={
              <>
                <MenuItem>
                  <a
                    href={fileUrl1}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >  <span
                    onClick={() =>
                      handleDownloadFileALPenilaian(
                        innerAsesor.asesorId,
                        innerAsesor.programStudiId,
                      )
                    }
                  >
                      Export
                    </span>
                  </a>
                </MenuItem>
                <MenuItem
                  onClick={() =>
                    handleViewChangeAL(
                      14,
                      innerAsesor.asesorId,
                      innerAsesor.programStudiId,
                    )
                  }
                >
                  Detail
                </MenuItem>
              </>
            }
          />
        );
      }
      const offeringTime = innerAsesor.assesmentOfferingTime
        ? new Date(innerAsesor.assesmentOfferingTime).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
        : "-";

      const acceptedTime = innerAsesor.assesmentAcceptedTime
        ? new Date(innerAsesor.assesmentAcceptedTime).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
        : "-";

      return createData(
        innerIndex + 1,
        innerAsesor.asesorFullName,
        innerAsesor.asesorEmail,
        <ProdiActionName status={innerAsesor.status} />,
        offeringTime,
        acceptedTime,
        innerAsesor.totalNilai,
        innerAsesor.komentar,
        assignmentButton
      );
    });
  });
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };
  useEffect(() => {
    setSelectedStatus0('')
    setSelectedStatus2('')
  }, [view])
  const [prevView, setPrevView] = useState(0);
  const [activePenilaian, setActivePenilaian] = useState('');
  const handleTabClick = (i) => {
    setView(i);
    setPrevView(view);
    setSearchQuery('');
  };

  const [selectedPenilaian, setSelectedPenilaian] = useState('Penilaian Kecukupan');
  const fetchProdi = () => {
    let dateStatus;
    const status = (function () {
      switch (view) {
        case 1:
          dateStatus = 'ValidBanPtTime';
          return selectedStatus;
        default:
          break
      }
    })();

    if (!searchQuery) {
      setTableLoading(true);
    }
    axios
      .get(`${baseUrl}/prodi?status=${status}&search=${searchQuery}${year ? `&year=${year}` : ''}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.status === 200) {
          const result = response.data.data;
          let sortedResponseData = result.sort((a, b) => new Date(b[dateStatus]) - new Date(a[dateStatus]))
          if (selectedStatus0 !== '') {
            console.log(selectedStatus0)
            sortedResponseData = sortedResponseData.filter((item) => item.Status == selectedStatus0)
          }
          if (selectedStatus2 !== '') {
            console.log(selectedStatus2)
            sortedResponseData = sortedResponseData.filter((item) => item.Status == selectedStatus2)
          }
          if (!year) {
            const filteredRowsTime = startDate && endDate
              ? sortedResponseData.filter((row) => {
                if (!row[dateStatus]) return sortedResponseData
                const requestTime = new Date(row[dateStatus]);
                return requestTime >= new Date(startDate) && requestTime <= new Date(endDate);
              })
              : sortedResponseData;
            setRows(filteredRowsTime)
          } else {
            const filteredRows = sortedResponseData.filter((row) => {
              const noRegYear = row[dateStatus].split("-")[0]
              return noRegYear == year;
            });
            const filteredRowsTime = startDate && endDate
              ? filteredRows.filter((row) => {
                const requestTime = new Date(row[dateStatus]);
                return requestTime >= new Date(startDate) && requestTime <= new Date(endDate);
              })
              : filteredRows;

            setRows(filteredRowsTime);
          }
        } else {
          ErrorSwal(`${response.data.message}`);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 401) {
          ErrorSwal("Sesi Berakhir, silahkan Login Ulang");
          navigate("/login");
        }

        // else {
        //   ErrorSwal("Fetching Data Failed");
        // }
      })
      .finally(() => {
        setTableLoading(false);
        setActivePenilaian('');
      });
  };
  useEffect(() => {
    fetchProdi();
  }, [view, selectedPenilaian, selectedStatus, selectedStatus0, selectedStatus2, searchQuery, year, startDate, endDate]);
  const getColumnsByView = () => {
    if (view === 1) {
      return validasiColumns;
    }
  };
  return (
    <>
      <Helmet>
        <title>Kemenag | Usulan Prodi </title>
      </Helmet>

      {page !== null && window.location.pathname !== "/kasubdit" ? (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ContentContainer>
            <ContentCard>
              {page == 0 ? <FormPenilaianSarjana /> : null}
              {page == 1 ? <FormPenilaianMagister /> : null}
              {page == 2 ? <FormPenilaianDoktor /> : null}
              {page == 3 ? <FormPenilaianProfesi /> : null}
            </ContentCard>
          </ContentContainer>
        </motion.div>
      ) : (
        <>
          <HeroTitle title="Usulan Prodi Baru di Lembaga Lama" />
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
              <div className="d-flex m-auto">
                <button
                  className="btn border-0 d-flex align-items-center justify-content-center"
                  style={{
                    boxShadow: "none",
                    background: view === 1 // Active tab styling
                      ? (darkMode ? "#3C5B6F" : "#A0DEFF")
                      : (darkMode ? "transparent" : ""),
                    borderRadius: "8px 8px 0px 0px",
                    height: "48px",
                    fontWeight: 700,
                    fontSize: "13px",
                    lineHeight: "24px",
                    color: view === 1
                      ? "white"
                      : (darkMode ? "white" : "black"),
                    gap: "10px",
                  }}
                  onClick={() => handleTabClick(1)} // Set this tab active on click
                >
                  <span role="img" aria-label="Validasi Lembaga Akreditasi" style={{ fontSize: '19px' }}>
                    ✅
                  </span>
                  <span className="text" style={{ fontSize: '14px' }}>
                    Validasi Lembaga Akreditasi
                  </span>
                </button>
              </div>

            <ContentCard>
              <div className="d-flex col-12">
                <span
                  className="d-block"
                  style={{
                    padding: "21px",
                    fontWeight: 500,
                    fontSize: "24px",
                    lineHeight: "32px",
                    color: darkMode ? "white" : ""
                  }}
                >
                  {(() => {
                    switch (view) {
                      case 1:
                        return `Usulan Prodi Dalam Proses Validasi ${selectedStatus.toUpperCase()}`;
                      default:
                        break
                    }
                  })()}
                </span>
                {/* {view === 2 && (
                  <div
                    className=" ms-auto m-3 d-flex flex-column align-items-center"
                  >
                    <PenilaianButtonGroup
                      selectedPenilaian={selectedPenilaian}
                      handlePenilaianChange={handlePenilaianChange}
                      darkMode={darkMode}
                    />
                  </div>
                )} */}
              </div>

              <div className="col-12">
                <div className={`row d-flex flex-sm-row flex-column ${isScreenSizeLowerThanMD ? 'gap-3' : 'align-items-center'}`} style={{ padding: "20px" }}>
                  <div className={`col-md-3 col-12 d-flex  flex-sm-row flex-column gap-3 ${isScreenSizeLowerThanMD ? 'gap-3' : 'align-items-center'}`}>
                    <Button
                      variant="outlined"
                      style={{ color: darkMode ? "white" : "grey", borderColor: darkMode ? "white" : "grey" }}
                      size="small"
                      onClick={exportToExcel}
                    >
                      <FileUploadIcon />
                      {isScreenSizeLowerThanMD ? '' : 'Export'}
                    </Button>

                    {view === 1 && (
                      <div className="me-3">
                        <select
                          className="form-select w-100 h-50"
                          aria-label="Select Status"
                          value={selectedStatus}
                          onChange={handleStatusChange}
                        >
                          <option value="" defaultValue disabled>
                            Pilih Lembaga
                          </option>
                          {statusOptions.map((status) => (
                            <option key={status} value={status}>
                              {status.toUpperCase()}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>

                  <div className="col-9 d-flex flex-sm-row flex-column">
                    <div className={`input-group col-12 d-flex flex-sm-row flex-column ${isScreenSizeLowerThanMD ? 'gap-3' : ''}`}>
                      <div className={`d-flex flex-sm-row flex-column ${isScreenSizeLowerThanMD ? 'gap-3' : ''}`}>
                        <div className="d-flex gap-4 me-3">
                          <span style={{ color: darkMode ? "white" : "" }}>Periode</span>
                          <input type='date' className="form-control" value={startDate} onChange={handleStartDateChange} />
                        </div>
                        <div className="d-flex gap-4 me-3">
                          <span style={{ color: darkMode ? "white" : "" }}>Sampai</span>
                          <input type='date' className="form-control" value={endDate} onChange={handleEndDateChange} />
                        </div>
                      </div>
                      <Button
                        variant="outlined" onClick={handleOpenTahun} style={{
                          color: darkMode ? "white" : "#717171",
                          boxShadow: "none",
                          gap: "13px",
                          border: darkMode ? "1px solid white" : "1px solid #717171",
                          marginRight: '15px',
                          borderRadius: '6px',

                        }}>
                        <FunnelIcon />
                        {year ? year : "Pilih Tahun"}
                      </Button>
                      <Popover
                        open={Boolean(anchorEl)}
                        anchorEl={anchorEl}
                        onClose={handleCloseTahun}
                        anchorOrigin={{
                          vertical: "center",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "center",
                          horizontal: "left",
                        }}
                        sx={{
                          ".MuiPaper-root": {
                            boxShadow: "0px 2px 10px rgba(58, 53, 65, 0.1)",
                          },
                        }}
                      >
                        <List sx={{ maxHeight: "200px" }}>
                          <ListItem
                            key="Semua Data"
                            button
                            onClick={() => handleYearSelect('')}
                          >
                            <ListItemText primary="Semua Data" />
                          </ListItem>
                          {Array.from({ length: 10 }, (_, index) => {
                            const menuItemYear = new Date().getFullYear() - index;
                            return (
                              <ListItem
                                key={menuItemYear}
                                button
                                onClick={() => handleYearSelect(menuItemYear)}
                              >
                                <ListItemText primary={menuItemYear} />
                              </ListItem>
                            );
                          })}
                        </List>
                      </Popover>
                      <input
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className={`form-control ${isScreenSizeLowerThanMD ? 'w-100' : ''}`}
                        placeholder="Pencarian"
                        aria-label="UserName"
                        aria-describedby="addon-wrapping"
                      />

                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 mx-3" style={{ width: '99%', backgroundColor: 'white', borderRadius: '4px' }}>
                <AsyncTable
                  loading={tableLoading}
                  rows={indexedRows}
                  columns={getColumnsByView()}
                />
              </div>
            </ContentCard>
          </motion.div>
        </>
      )}

      {/* Modal Detail Form Asesor */}
      <Modal
        open={detailModalOpen}
        onClose={handleCloseDetailModalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles}>
          <IconButton
            sx={{ position: "absolute", top: 5, right: 5 }}
            onClick={handleCloseDetailModalOpen}
            aria-label="close"
          >
            <HighlightOffIcon color="error" />
          </IconButton>
          <Box sx={{ padding: "13px", color: darkMode ? "white" : "", }}>
            <div style={{
              padding: '5px',
              margin: '5px'
            }}>
              <div style={{ color: darkMode ? "white" : "" }} className="d-flex gap-4">
                <div >
                  <p>Nama Perguruan</p>
                  <p>Nama Prodi</p>
                  <p>Jenjang</p>
                  <p>NoReg</p>
                </div>
                <div >
                  <p>: </p>
                  <p>: </p>
                  <p>: </p>
                  <p>: </p>
                </div>
                <div >
                  <p>{detailAsesment?.lembaga}</p>
                  <p>{detailAsesment?.namaProdi}</p>
                  <p>{detailAsesment?.jenjang}</p>
                  <p>{detailAsesment?.nomorRegistrasi}</p>
                </div>
              </div>
            </div>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Riwayat Asesment Form Penilaian Asesor
            </Typography>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow style={{
                      backgroundColor: darkMode ? "#40679E" : "",
                      color: darkMode ? "white" : "",
                    }} >
                      {columns1.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            width: 'auto', backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
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
                    {isLoading ? (
                      <TableRow style={{
                        backgroundColor: darkMode ? "#40679E" : "",
                        color: darkMode ? "white" : "",
                      }}>
                        <TableCell style={{ color: darkMode ? "white" : "", }} colSpan={columns1.length} align="center">
                          <ClipLoader />
                        </TableCell>
                      </TableRow>
                    ) : (
                      <>
                        {rows11?.length === 0 ? (
                          <TableRow style={{
                            backgroundColor: darkMode ? "#40679E" : "",
                            color: darkMode ? "white" : "",
                          }}>
                            <TableCell style={{ color: darkMode ? "white" : "", }} colSpan={columns1.length} align="center">
                              <p style={{ color: "red", fontStyle: "italic" }}>
                                Tidak ada data
                              </p>
                            </TableCell>
                          </TableRow>
                        ) : (
                          rows11
                            ?.slice(
                              page2 * rowsPerPage2,
                              page2 * rowsPerPage2 + rowsPerPage2
                            )
                            ?.map((row) => (
                              <TableRow style={{
                                backgroundColor: darkMode ? "#40679E" : "",
                                color: darkMode ? "white" : "",
                              }} key={row.no} hover tabIndex={-1}>
                                {columns1.map((column) => {
                                  const value = row[column.id];
                                  return (
                                    <TableCell style={{ color: darkMode ? "white" : "", }} key={column.id} align={column.align}>
                                      {column.format && typeof value === "number"
                                        ? column.format(value)
                                        : value}
                                    </TableCell>
                                  );
                                })}
                              </TableRow>
                            ))
                        )}
                      </>
                    )}

                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                rowsPerPage={rowsPerPage2}
                page={page2}
                count={10}
                style={{
                  backgroundColor: darkMode ? "#40679E" : "",
                  color: darkMode ? "white" : "",
                }}
                onPageChange={handleChangePage2}
                onRowsPerPageChange={handleChangeRowsPerPage2}
              />
            </Paper>
          </Box>
        </Box>
      </Modal>
      {/* Modal Detail Form Asesor lapangan */}
      <Modal
        open={detailModalOpenAL}
        onClose={handleCloseDetailModalOpenAL}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles}>
          <IconButton
            sx={{ position: "absolute", top: 5, right: 5 }}
            onClick={handleCloseDetailModalOpenAL}
            aria-label="close"
          >
            <HighlightOffIcon color="error" />
          </IconButton>
          <Box sx={{ padding: "13px", color: darkMode ? "white" : "", }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Riwayat Asesment Form Penilaian Lapangan
            </Typography>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow style={{
                      backgroundColor: darkMode ? "#40679E" : "",
                      color: darkMode ? "white" : "",
                    }} >
                      {columnsAL.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            width: 'auto', backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
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
                    {isLoading ? (
                      <TableRow style={{
                        backgroundColor: darkMode ? "#40679E" : "",
                        color: darkMode ? "white" : "",
                      }}>
                        <TableCell style={{ color: darkMode ? "white" : "", }} colSpan={columns1.length} align="center">
                          <ClipLoader />
                        </TableCell>
                      </TableRow>
                    ) : (
                      <>
                        {rowsAL?.length === 0 ? (
                          <TableRow style={{
                            backgroundColor: darkMode ? "#40679E" : "",
                            color: darkMode ? "white" : "",
                          }}>
                            <TableCell style={{ color: darkMode ? "white" : "", }} colSpan={columns1.length} align="center">
                              <p style={{ color: "red", fontStyle: "italic" }}>
                                Tidak ada data
                              </p>
                            </TableCell>
                          </TableRow>
                        ) : (
                          rowsAL
                            ?.slice(
                              page2 * rowsPerPage2,
                              page2 * rowsPerPage2 + rowsPerPage2
                            )
                            ?.map((row) => (
                              <TableRow style={{
                                backgroundColor: darkMode ? "#40679E" : "",
                                color: darkMode ? "white" : "",
                              }} key={row.no} hover tabIndex={-1}>
                                {columnsAL.map((column) => {
                                  const value = row[column.id];
                                  return (
                                    <TableCell style={{ color: darkMode ? "white" : "", }} key={column.id} align={column.align}>
                                      {column.format && typeof value === "number"
                                        ? column.format(value)
                                        : value}
                                    </TableCell>
                                  );
                                })}
                              </TableRow>
                            ))
                        )}
                      </>
                    )}

                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                rowsPerPage={rowsPerPage2}
                page={page2}
                count={10}
                style={{
                  backgroundColor: darkMode ? "#40679E" : "",
                  color: darkMode ? "white" : "",
                }}
                onPageChange={handleChangePage2}
                onRowsPerPageChange={handleChangeRowsPerPage2}
              />
            </Paper>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default CardUsulan;

