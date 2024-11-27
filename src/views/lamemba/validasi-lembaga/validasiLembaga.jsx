import React, { useEffect, useMemo, useState } from "react";
import banpt from "../../../assets/banpt.svg";
import HeroTitle from "../../../components/hero-title/HeroTitle";
import ContentContainer from "../../../components/card-container/ContentContainer";
import ContentCard from "../../../components/card-content/ContentCard";
import AsyncTable from "../../../components/table/AsyncTable";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import DropdownAksi from "../../../components/dropdown/DropdownAksi";
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
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Helmet } from "react-helmet";
import {
  ErrorSwal,
  StartLoading,
  InputSwal,
} from "../../../utils/swal2";
import { getToken, getUserId, getRole } from "../../../utils/token";
import axios from "axios";
import { GetApiBaseUrl } from "../../../utils/env";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Link } from "react-router-dom";
import "moment/locale/id";
import ProdiActionName from "../../../utils/status";
import Swal from "sweetalert2";
import swal from "sweetalert";
import { useMediaQuery } from "@mui/material";
import * as XLSX from 'xlsx';
import api from "../../service/api";
import DownloadIcon from '@mui/icons-material/Download';
import XCircleIcon from "../../../components/icons/XCircleIcon";
import FunnelIcon from "../../../components/icons/FunnelIcon";
import CircularProgress from '@mui/material/CircularProgress';
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js';
import { useDarkMode } from "../../../utils/DarkModeContext";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: '80%',
  overflow: 'auto',
  maxWidth: 1500,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
};

const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: '96%',
  maxWidth: 1800,
  height: 760,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
};

const CardValidasiLembaga = () => {
  const view = 3;
  const [page, setPage] = useState(localStorage.getItem("currentPage") || null);
  const [tableLoading, setTableLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const isScreenSizeLowerThanLg = useMediaQuery("(max-width: 990px)");
  const isScreenSizeLowerThanMD = useMediaQuery(("(max-width: 550px"))
  const selectedStatus = "lamemba"
  const { darkMode } = useDarkMode()
  useEffect(() => {
    if (page !== null) {
      localStorage.setItem("currentPage", page);
    }
  }, [page]);
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

  // filter data
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
  const fetchProdi = () => {
    let dateStatus = 'ValidBanPtTime';
    const status = selectedStatus

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
          const sortedResponseData = result.sort((a, b) => new Date(b[dateStatus]) - new Date(a[dateStatus]))
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
      .catch(() => {
        ErrorSwal("Fetching Data Failed");
      })
      .finally(() => setTableLoading(false));
  };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };


  useEffect(() => {
    fetchProdi();
  }, [view, selectedStatus, searchQuery, year, startDate, endDate]);
  const getStatusText = (status) => {
    const statusValues = {
      0: { text: 'Dokumen Belum Lengkap' },
      1: { text: 'Dokumen Selesai' },
      2: { text: 'Dokumen Sudah Lengkap' },
      3: { text: 'Sudah Perbaikan' },
      9: { text: 'Permintaan Dibatalkan' },
      10: { text: 'Dokumen Usulan Lengkap' },
      19: { text: 'Dokumen dikembalikan' },
      20: { text: 'Penawaran Assessment' },
      21: { text: 'Assessment Kecukupan oleh Evaluator' },
      22: { text: 'Assessment Berlangsung' },
      23: { text: 'Assessment Evaluator Selesai' },
      24: { text: 'Lokasi Assessment Progress' },
      26: { text: 'Assessment selesai' },
      27: { text: 'Usulan di Kembalikan ke User' },
      28: { text: 'Assessment Kadaluarsa' },
      29: { text: 'Assessment Dibatalkan' },
      40: { text: 'Valid untuk Lembaga Akreditasi' },
      41: { text: 'Dalam validasi' },
      50: { text: 'Validasi Ban PT / LAM' },
      51: { text: 'Dalam Proses SK' },
      52: { text: 'SK diunggah dan paraf 1' },
      53: { text: 'SK diunggah dan paraf 2' },
      54: { text: 'SK diunggah dan paraf 3' },
      55: { text: 'SK diunggah dan paraf 4' },
      60: { text: 'Penerbitan Izin' },
      99: { text: 'di Kembalikan' },
      221: { text: 'Penugasan Penilaian Lapangan' },
      222: { text: 'Penilaian Lapangan Sedang Berlangsung' },
      223: { text: 'Penilaian Lapangan Selesai' },
      226: { text: 'Semua Penilaian Lapangan Selesai' },
      227: { text: 'Penilaian Lapangan dikembalikan' },
      299: { text: 'Validasi BANPT/LAM dikembalikan' },
      521: { text: 'KMA diunggah dan paraf 1' },
      522: { text: 'KMA diunggah dan paraf 2' },
      523: { text: 'KMA diunggah dan paraf 3' },
      524: { text: 'KMA diunggah dan paraf 4' },
      525: { text: 'KMA Final' },
      526: { text: 'KMA diunggah dan paraf 6' },
      527: { text: 'KMA diunggah dan paraf 7' },
      528: { text: 'KMA diunggah dan paraf 8' },
      529: { text: 'KMA diunggah dan paraf 9' }
    };

    return statusValues[status] || 'Unknown';
  };
  const exportToExcel = () => {
    const fileName = 'dataUsulanProdi.xlsx';

    const filteredData = rows.filter((row) => {
      const requestTime = new Date(row.RequestTime);
      return requestTime >= new Date(startDate) && requestTime <= new Date(endDate);
    });
    const exportData = filteredData.map((row) => ({
      NoReg: row.NoReg,
      NamaProdi: row.NamaProdi,
      NamaPerguruan: row.NamaPerguruan,
      JenjangStr: row.JenjangStr,
      Status: getStatusText(row.Status),
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

  const handleApprove = (id, note) => {
    StartLoading();
    axios
      .post(
        `${baseUrl}/prodi/approve/${id}?note=${note}`,
        {
          note: note,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.data.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: response.data.message,
            timer: 3000
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
  const handleApproveBANPT = (id, note, file) => {
    StartLoading();
    const formData = new FormData();
    formData.append("note", note);
    formData.append("file", file);
    axios
      .post(`${baseUrl}/prodi/approvetobanpt/${id}?note=${note}`, formData, {
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
            timer: 3000
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
  const handleApproveSK = (id, note, fileDrafKMA, fileSuratPengantar, fileNotaDinas) => {
    StartLoading();
    const formData = new FormData();
    formData.append("note", note);
    // formData.append("fileDrafKMA", fileDrafKMA);
    formData.append("file", fileDrafKMA);
    formData.append("fileSuratPengantar", fileSuratPengantar);
    formData.append("fileNotaDinas", fileNotaDinas);

    axios
      .post(`${baseUrl}/prodi/approvetosk/${id}?note=${note}`, formData, {
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
  const handleDoneClick = (index) => {
    const selectedId = prodiData[index].id;

    // Tambahkan ke prodiValid jika belum ada di sana
    if (!prodiValid.includes(selectedId)) {
      setProdiValid([...prodiValid, selectedId]);
    }

    // Hapus dari prodiFail jika ada di sana
    if (prodiFail.includes(selectedId)) {
      setProdiFail(prodiFail.filter((id) => id !== selectedId));
    }
  };
  const handleErrorClick = (index) => {
    const selectedId = prodiData[index].id;

    // Tambahkan ke prodiFail jika belum ada di sana
    if (!prodiFail.includes(selectedId)) {
      setProdiFail([...prodiFail, selectedId]);
    }

    // Hapus dari prodiValid jika ada di sana
    if (prodiValid.includes(selectedId)) {
      setProdiValid(prodiValid.filter((id) => id !== selectedId));
    }
  };
  const handleOpenKonfirmasi = () => {
    setOpenKonfirmasi(true);
  };
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
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
        // Swal.fire({
        //   icon: "error",
        //   title: "Gagal",
        //   text: error.message,
        // });
      });
  };
  const handleApproveSKDone = (id, note, file) => {
    StartLoading();
    const formData = new FormData();
    formData.append("note", note);
    formData.append("file", file);
    axios
      .post(`${baseUrl}/prodi/approveskdone/${id}?note=${note}`, formData, {
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
            timer: 3000
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

  const handleRejectWithNote = (id, note) => {
    StartLoading();
    axios
      .post(
        `${baseUrl}/prodi/reject/${id}?note=${note}`,
        {
          note: note,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.data.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: response.data.message,
            timer: 3000
          });
          fetchProdi();
        }
      })
      .catch((error) => {
        if (error.response) {
          if (
            error.response.status === 400 &&
            error.response.data.message === "data cant be rejected"
          ) {
            Swal.fire({
              icon: "error",
              title: "Gagal",
              text: "Data tidak dapat ditolak",
            });
          } else if (
            error.response.status === 400 &&
            error.response.data.errors.note
          ) {
            Swal.fire({
              icon: "error",
              title: "Gagal",
              text: error.response.data.errors.note.join(", "),
            });
          } else if (
            error.response.status === 403 &&
            error.response.data.errors.note
          ) {
            Swal.fire({
              icon: "error",
              title: "Gagal",
              text: error.response.data.errors.note.join(", "),
            });
          }
        } else {
          ErrorSwal("Gagal", "Terjadi kesalahan");
        }
      });
  };

  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const handleCloseDetailModalOpen = () => setDetailModalOpen(false);
  ////////////////////////////////////////////////////
  const [detailData, setDetailData] = useState([]);
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
  // const handleDownloadFile = async (programStudiId, status) => {
  //   try {
  //     const response = await api.get(`/prodi/actionfile/${programStudiId}/${status}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (response.status === 200) {
  //       swal({
  //         title: 'Download...',
  //         text: 'Sedang Proses Download File...',
  //         content: {
  //           element: "i",
  //           attributes: {
  //             className: "fas fa-spinner fa-spin",
  //             style: "color: #4CAF50; font-size: 2em;",
  //           },
  //         },
  //         buttons: false,
  //         dangerMode: false,
  //         closeOnClickOutside: false,
  //         closeOnEsc: false,
  //       });

  //       setTimeout(() => {
  //         window.open(response.data.downloadLink, '_blank');
  //         setFileUrl(response.data.downloadLink);
  //         swal.close();
  //       }, 1000);
  //     } else {
  //     }
  //   } catch (error) {
  //     if (error.response && error.response.status === 404) {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Error',
  //         showConfirmButton: true,
  //         text: `Error: ${error.response.data.message}`,
  //       });
  //     } else {
  //       // Handle other types of errors
  //       Swal.fire({
  //         icon: "error",
  //         title: "Error",
  //         text: `${error.message}`
  //       });
  //     }
  //   }
  // };
  const [isLoading, setIsLoading] = useState(false)
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
      })
      .finally(() => {
        setIsLoading(false)
      })
  };
  const [data, setData] = useState([]);
  const getData = async () => {
    const programStudiId = localStorage.getItem("programStudiId");
    setIsSubmitted(true);
    try {
      const response = await api.get(
        `/prodi-assesment/${programStudiId}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const documentMasterList = response.data.data.prodiDocuments;
      setData(response.data.data);
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
    getData();
  }, []);
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
    }
  ];

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
      catatan,
      action,
    };
  }
  const handleViewChange = (index, asesorId) => {
    handleCloseDetailModalOpen(true);
    localStorage.setItem("testAsesorId", asesorId);
    localStorage.setItem("newView", "detailform");
    setPage(index);
    switch (index) {
      case 0:
        navigate(`usulan/sarjana/edit/:id`);
        break;
      case 1:
        navigate(`usulan/magister/edit/:id`);
        break;
      case 2:
        navigate(`usulan/doktor/edit/:id`);
        break;
      case 3:
        navigate(`usulan/profesi/edit/:id`);
        break;
      default:
        break;
    }
  };

  const [fileUrl1, setFileUrl1] = useState(null);
  const handleDownloadFilePenilaian = async (asesorId, programStudiId) => {
    try {
      const response = await api.get(`/prodi-assesment/form-ak-file/${asesorId}/${programStudiId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      });

      if (response.status === 200) {
        swal({
          title: 'Download....',
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

        const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        const downloadUrl = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'prodi.xlsx';

        // Simulate a click event
        const clickEvent = new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: false
        });
        link.dispatchEvent(clickEvent);

        window.URL.revokeObjectURL(downloadUrl);

        setTimeout(() => {
          swal.close();
        }, 500);
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
                      innerAsesor.asesorId,
                      localStorage.getItem("testAsesorId")
                    );
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

  const getColumnsByView = () => {
    return validasiColumns;
  };

  return (
    <>
      <Helmet>
        <title>Kemenag | Usulan Prodi </title>
      </Helmet>

      {page !== null && window.location.pathname !== "/kasubdit" ? (
        <ContentContainer>
          <ContentCard>
          </ContentCard>
        </ContentContainer>
      ) : (
        <>
          <HeroTitle title="Usulan Prodi Baru" />
          <div className="d-flex ms-0">
            {Array.from({ length: 1 }, (_, i) => {
              const isActive = i === view;
              const { src, text } = (function () {
                return {
                  text: "Validasi Lembaga Akreditasi",
                  src: banpt,
                };
              })();

              return (
                <button
                  key={i}
                  className="btn btn-white border-0 d-flex me-4 align-items-center justify-content-center"
                  style={{
                    boxShadow: "none",
                    background: "rgb(0, 208, 255)",
                    borderRadius: "8px 8px 0px 0px",
                    height: "48px",
                    fontWeight: 700,
                    fontSize: "13px",
                    lineHeight: "24px",
                    color: "white",
                    gap: "10px",
                  }}
                >
                  <img src={src} alt="" />
                  <span className="text" style={{ fontSize: '14px' }}>
                    {isScreenSizeLowerThanLg
                      ? "Validasi" : text}
                  </span>
                  {tableLoading && isActive ? (
                    <CircularProgress size={20} color="success" />
                  ) : null}
                </button>
              );
            })}
          </div>
          <ContentCard>
            <div className="col-12">
              <span
                className="d-block"
                style={{
                  padding: "21px",
                  fontWeight: 500,
                  fontSize: "24px",
                  lineHeight: "32px",
                }}
              >Usulan Prodi Dalam Proses Validasi
              </span>
            </div>

            <div className="col-12">
              <div className="row d-flex" style={{ padding: "20px" }}>
                <div className="col-md-3 col-3 d-flex gap-3">
                  <Button
                    variant="outlined"
                    style={{ color: "grey", borderColor: "grey" }}
                    size="small"
                    onClick={exportToExcel}
                  >
                    <FileUploadIcon />
                    {isScreenSizeLowerThanMD ? '' : 'Export'}
                  </Button>
                </div>
                <div className="col-9 d-flex">
                  <div className="input-group flex-nowrap ">
                    <div className="d-flex">
                      <div className="d-flex gap-4 me-3">
                        <span>Periode</span>
                        <input type='date' className="form-control" value={startDate} onChange={handleStartDateChange} />
                      </div>
                      <div className="d-flex gap-4 me-3">
                        <span>Sampai</span>
                        <input type='date' className="form-control" value={endDate} onChange={handleEndDateChange} />
                      </div>
                    </div>
                    <Button
                      variant="outlined" onClick={handleOpenTahun} style={{
                        color: "#717171",
                        boxShadow: "none",
                        gap: "13px",
                        border: '1px solid #717171',
                        marginRight: '15px',
                        borderRadius: '6px'
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
                      className="form-control"
                      placeholder="Pencarian"
                      aria-label="UserName"
                      aria-describedby="addon-wrapping"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12" style={{ width: '100%' }}>
              <AsyncTable
                loading={tableLoading}
                rows={indexedRows}
                columns={getColumnsByView()}
              />
            </div>
          </ContentCard>
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
            sx={{ position: "absolute", top: 2, right: 2 }}
            onClick={handleCloseDetailModalOpen}
            aria-label="close"
          >
            <HighlightOffIcon color="error" />
          </IconButton>
          <Box sx={{ padding: "13px" }}>
            <div className="row d-flex g-2">
              <div className="col-sm-12 col-md-10 ">
                <div
                  style={{
                    backgroundColor: "rgb(255, 241, 118)",
                    width: "auto",
                    height: "48px",
                    borderRadius: "10px",
                  }}
                  className="d-flex align-items-center "
                >
                  <div className="m-auto d-flex align-items-center text-center">
                    <h4>INSTRUMEN PENILAIAN PROGRAM STUDI BARU</h4>
                  </div>
                </div>
              </div>
              <div className=" col-sm-12 col-md-2">
                <div
                  style={{
                    width: "auto",
                    height: "48px",
                    borderRadius: "10px",
                    backgroundColor: "rgb(221, 221, 221)",
                  }}
                  className="align-items-center d-flex "
                >
                  <div className="m-auto">
                    <h4 className="text-center">VERSI 2023</h4>

                  </div>
                </div>
              </div>

              <div className="mt-4 d-flex gap-3">
                <h4>Data Program Studi Yang Di Evaluasi</h4>

              </div>
            </div>
            <div className="row container mt-4" style={{ lineHeight: "5px" }}>
              <div className="col-sm-12 col-md-3">
                <p>No. Registrasi :</p>
              </div>
              <div className="col-sm-12 col-md-9 mb-4">
                <p>{data.noReg}</p>
              </div>

              <div className="col-sm-12 col-md-3">
                <p>Nama Perguruan Tinggi:</p>
              </div>
              <div className="col-sm-12 col-md-9 mb-4">
                <p>{data.lembaga}</p>
              </div>


              <div className="col-sm-12 col-md-3">
                <p>Program Studi:</p>
              </div>
              <div className="col-sm-12 col-md-9 mb-4">
                <p>{data.namaProdi}</p>
              </div>

              <div className="col-sm-12 col-md-3">
                <p>Program :</p>
              </div>
              <div className="col-sm-12 col-md-9 mb-4">
                <p>{data.jenjangStr}</p>
              </div>
            </div>
            <div className="d-flex">
              <div>
                <h4 className="mt-3">Data Evaluator 1</h4>
                <div className="row container mt-4" style={{ lineHeight: "5px" }}>
                  <div className="col-sm-12 col-md-3">
                    <p>Nama:</p>
                  </div>
                  <div className="col-sm-12 col-md-9 mb-4">
                    <p>{data.asesorProgramStudis?.asesorEvaluator ? data.asesorProgramStudis?.asesorEvaluator : '-'}</p>
                  </div>
                  <div className="col-sm-12 col-md-3">
                    <p>Total Nilai:</p>
                  </div>
                  <div className="col-sm-12 col-md-9 mb-4">
                    <p>{data.asesorProgramStudis?.totalNilai ? data.asesorProgramStudis?.totalNilai : '-'}</p>
                  </div>
                  <div className="col-sm-12 col-md-3">
                    <p>Catatan:</p>
                  </div>
                  <div className="col-sm-12 col-md-9 mb-4">
                    <p>{data.asesorProgramStudis?.komentar ? data.asesorProgramStudis?.komentar : '-'}</p>
                  </div>
                  <div className="col-sm-12 col-md-3">
                    <p>Tanggal:</p>
                  </div>
                  <div className="col-sm-12 col-md-9">
                    <p>
                      {data.asesorProgramStudis?.assesmentAcceptedTime
                        ? new Date(data.asesorProgramStudis.assesmentAcceptedTime).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })
                        : '-'}
                    </p>
                  </div>
                  <div className="col-sm-12 col-md-3 mt-4">
                    <p>Upload:</p>
                  </div>
                  <div className="col-sm-12 col-md-9 mb-4 mt-4">
                    <input type="file" />
                  </div>
                </div>
                <button className="btn btn-primary px-5">Submit</button>
              </div>
              <div>
                <h4 className="mt-3">Data Evaluator 2</h4>
                <div className="row container mt-4" style={{ lineHeight: "5px" }}>
                  <div className="col-sm-12 col-md-3">
                    <p>Nama:</p>
                  </div>
                  <div className="col-sm-12 col-md-9 mb-4">
                    <p>{data.asesorProgramStudis?.asesorEvaluator ? data.asesorProgramStudis?.asesorEvaluator : '-'}</p>
                  </div>
                  <div className="col-sm-12 col-md-3">
                    <p>Total Nilai:</p>
                  </div>
                  <div className="col-sm-12 col-md-9 mb-4">
                    <p>{data.asesorProgramStudis?.totalNilai ? data.asesorProgramStudis?.totalNilai : '-'}</p>
                  </div>
                  <div className="col-sm-12 col-md-3">
                    <p>Catatan:</p>
                  </div>
                  <div className="col-sm-12 col-md-9 mb-4">
                    <p>{data.asesorProgramStudis?.komentar ? data.asesorProgramStudis?.komentar : '-'}</p>
                  </div>
                  <div className="col-sm-12 col-md-3">
                    <p>Tanggal:</p>
                  </div>
                  <div className="col-sm-12 col-md-9">
                    <p>
                      {data.asesorProgramStudis?.assesmentAcceptedTime
                        ? new Date(data.asesorProgramStudis.assesmentAcceptedTime).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })
                        : '-'}
                    </p>
                  </div>
                  <div className="col-sm-12 col-md-3 mt-4">
                    <p>Upload:</p>
                  </div>
                  <div className="col-sm-12 col-md-9 mb-4 mt-4">
                    <input type="file" />
                  </div>
                </div>
                <button className="btn btn-primary px-5">Submit</button>
              </div>
              <div>
                <h4 className="mt-3">Data Evaluator 3</h4>
                <div className="row container mt-4" style={{ lineHeight: "5px" }}>
                  <div className="col-sm-12 col-md-3">
                    <p>Nama:</p>
                  </div>
                  <div className="col-sm-12 col-md-9 mb-4">
                    <p>{data.asesorProgramStudis?.asesorEvaluator ? data.asesorProgramStudis?.asesorEvaluator : '-'}</p>
                  </div>
                  <div className="col-sm-12 col-md-3">
                    <p>Total Nilai:</p>
                  </div>
                  <div className="col-sm-12 col-md-9 mb-4">
                    <p>{data.asesorProgramStudis?.totalNilai ? data.asesorProgramStudis?.totalNilai : '-'}</p>
                  </div>
                  <div className="col-sm-12 col-md-3">
                    <p>Catatan:</p>
                  </div>
                  <div className="col-sm-12 col-md-9 mb-4">
                    <p>{data.asesorProgramStudis?.komentar ? data.asesorProgramStudis?.komentar : '-'}</p>
                  </div>
                  <div className="col-sm-12 col-md-3">
                    <p>Tanggal:</p>
                  </div>
                  <div className="col-sm-12 col-md-9">
                    <p>
                      {data.asesorProgramStudis?.assesmentAcceptedTime
                        ? new Date(data.asesorProgramStudis.assesmentAcceptedTime).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })
                        : '-'}
                    </p>
                  </div>

                  <div className="col-sm-12 col-md-3 mt-4">
                    <p>Upload:</p>
                  </div>
                  <div className="col-sm-12 col-md-9 mb-4 mt-4">
                    <input type="file" />
                  </div>
                </div>
                <button className="btn btn-primary px-5">Submit</button>
              </div>
            </div>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default CardValidasiLembaga;
