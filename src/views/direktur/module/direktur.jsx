import React, { useEffect, useMemo, useState } from "react";
import "../../../views/kasubdit/admin-kasubdit.css";
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
import logo from '../../../assets/logo.svg'
import logo1 from '../../../assets/pusaka3.png'
import { Helmet } from "react-helmet";
import '../../kasubdit/module/usulan-prodi/usulan.css';
import {
    ErrorSwal,
    StartLoading,
    InputSwal,
    CloseLoading,
} from "../../../utils/swal2";
import { getToken , getRole, getUserId} from "../../../utils/token";
import axios from "axios";
import { GetApiBaseUrl } from "../../../utils/env";
import Box from "@mui/material/Box";
import { ButtonGroup } from '@mui/material';
import { CheckCircle, Visibility } from '@mui/icons-material';

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Link } from "react-router-dom";
import "moment/locale/id";
import FormPenilaianSarjana from "../../kasubdit/module/usulan-prodi/detail-penilaian/form-penilaian-sarjana/edit/editPenilaianAssesor";
import FormPenilaianDoktor from "../../kasubdit/module/usulan-prodi/detail-penilaian/form-penilaian-doctor/edit/editPenilaianAssesor";
import FormPenilaianMagister from "../../kasubdit/module/usulan-prodi/detail-penilaian/form-penilaian-magister/edit/editPenilaianAssesor";
import FormPenilaianProfesi from "../../kasubdit/module/usulan-prodi/detail-penilaian/form-penilaian-profesi/edit/editPenilaianAssesor";
import ProdiActionName from "../../../utils/status";
import Swal from "sweetalert2";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { CardContent, useMediaQuery } from "@mui/material";
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
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Checkbox from '@mui/material/Checkbox';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js';
import { motion } from 'framer-motion';
import { ClipLoader } from "react-spinners";
import SelectOptions from '../../../utils/selectOptions';
import { useDarkMode } from "../../../utils/DarkModeContext";
import { Tooltip } from '@mui/material';
import { styled } from '@mui/system';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { color } from 'framer-motion';


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
    const [view, setView] = useState(0);
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
    const statusOptions = ["banpt", "lamemba", "lamdik"];
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };
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

        return statusValues[status] || '-';
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
                    ErrorSwal(`${response.data.message}`);
                }
            })
            .catch(() => {
                ErrorSwal("Fetching Data Failed");
            });
    };
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };
    const handleNoteChange = (event) => {
        setNote(event.target.value);
    };
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
    const handleApproveSKAndParaf = (id, DocumentDate, note, file, nik, password, documentNo) => {
        StartLoading();
        const formData = new FormData();
        formData.append("note", note);
        formData.append("file", file);
        formData.append("DocumentDate", DocumentDate);
        formData.append("documentNo", documentNo);
        formData.append("nik", nik);
        formData.append("password", password);
        axios
            .post(`${baseUrl}/prodi/paraf1sk/${id}?DocumentDate=${DocumentDate}&documentNo=${documentNo}&nik=${nik}&password=${password}&note=${note}`, formData, {
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
                        text: `${error.response.data.errors.file[0]} - ${error.message}`,
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
    const handleParaf = (id, note, nik, password) => {
        StartLoading();
        const formData = new FormData();
        formData.append("note", note);
        formData.append("nik", nik);
        formData.append("password", password);
        axios
            .post(`${baseUrl}/prodi/parafsk/${id}?nik=${nik}&password=${password}&note=${note}`, formData, {
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
                        text: `${error.response.data.errors.file[0]} - ${error.message}`,
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
                CloseLoading()
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
                CloseLoading()
                if (error.response) {
                    if (
                        error.response.status === 400 &&
                        error.response.data.message === "data cant be rejected"
                    ) {
                        Swal.fire({
                            icon: "error",
                            title: "Gagal",
                            text: `${error.response.status}: Data tidak dapat ditolak`,
                        });
                    } else if (
                        error.response.status === 400 &&
                        error.response.data.errors.note
                    ) {
                        Swal.fire({
                            icon: "error",
                            title: "Gagal",
                            text: error.response.status + error.response.data.errors.note.join(", "),
                        });
                    } else if (
                        error.response.status === 403 &&
                        error.response.data.errors.note
                    ) {
                        Swal.fire({
                            icon: "error",
                            title: "Gagal",
                            text: error.response.status + error.response.data.errors.note.join(", "),
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

                const blob = new Blob([response.data], { type: 'application/pdf' });
                const downloadUrl = window.URL.createObjectURL(blob);

                setTimeout(() => {
                    window.open(downloadUrl, '_blank');
                    setFileUrl(response.data.downloadLink);
                    swal.close();
                }, 1000); // Close swal after a short delay
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
    const progressColumns = [
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
                    <div className="table-manual" style={{ width: '100%' }}>
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
            // flex: 2,
            width: isScreenSizeLowerThanLg ? 250 : '',
            flex: isScreenSizeLowerThanLg ? 0 : 2,
            sortable: false,
            headerAlign: "center",
            renderCell: (params) => {
                return (
                    <div className="table-manual">
                        <ProdiActionName status={params.row.Status} />
                    </div>
                );
            },
        },
        {
            field: "tgldiusulkan",
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
                            {params.row.RequestTime ? formatDate(params.row.RequestTime) : 'Tanggal tidak tersedia'}
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
                const status = params.row.Status;
                return (
                    <>
                        <DropdownAksi
                            itemComponent={
                                <>
                                    <MenuItem onClick={() => fetchProdiHistory(params.row.Id)}>Riwayat</MenuItem>

                                    <Link
                                        to={`/direktur-detail-usulan-ptki/${params?.row?.Id}`}
                                        style={{
                                            textDecoration: "none",
                                            color: "inherit",
                                        }}
                                    >
                                        <MenuItem>
                                            <a
                                                rel="noreferrer"
                                                target="_blank"
                                                style={{
                                                    textDecoration: "none",
                                                    color: "inherit",
                                                }}
                                            >
                                                Detail
                                            </a>
                                        </MenuItem>
                                    </Link>

                                    {/* {status !== 99 && (
                                        <MenuItem
                                            onClick={() => {
                                                Swal.fire({
                                                    title: 'Konfirmasi untuk proses verval',
                                                    html: `
  <div style="margin-bottom: 10px; display: flex; flex-direction: column;">
 <select id="swal-select" class="swal2-select" style="width: 84%;" onchange="showTextarea()">
  <option value="Evaluasi dokumen dapat dilanjutkan">Evaluasi dokumen dapat dilanjutkan</option>
  <option value="other">Lainnya</option>
</select>
    <textarea id="swal-textarea" class="swal2-textarea" placeholder="Konfirmasi dengan catatan" style="width: 84%; margin-top: 10px; display: none;"></textarea>
  </div>
`,
                                                    icon: 'warning',
                                                    inputLabel: 'Konfirmasi dengan catatan (opsional)',
                                                    inputAttributes: {
                                                        'aria-label': 'Placeholder...',
                                                    },
                                                    showCancelButton: true,
                                                    confirmButtonText: 'Konfirmasi',
                                                    cancelButtonText: 'Batal',
                                                    preConfirm: () => {
                                                        const selectedOption = document.getElementById('swal-select').value;
                                                        if (selectedOption === 'other') {
                                                            const textareaValue = document.getElementById('swal-textarea').value;
                                                            handleApprove(params.row.Id, textareaValue);
                                                        } else {
                                                            handleApprove(params.row.Id, selectedOption);
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
                                                        }
                                                    }
                                                });
                                            }}
                                        >
                                            {status === 0 ? (
                                                "Konfirmasi Usulan"
                                            ) : status === 2 ? (
                                                "Konfirmasi untuk proses verval"
                                            ) : null}
                                        </MenuItem>
                                    )}


                                    {status !== 99 && (
                                        <MenuItem
                                            onClick={() => {
                                                InputSwal("Catatan Pengembalian", "Placeholder...", status, (note) => {
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

                        {/* Modal */}
                        {open && (
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <IconButton
                                        sx={{ position: "absolute", top: 5, right: 5, }}
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
                                            style={{ margin: '10px', color: darkMode ? "white" : "" }}
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
                                                        <TableRow style={{
                                                            backgroundColor: darkMode ? "#40679E" : "",
                                                            color: darkMode ? "white" : "",
                                                        }} >
                                                            {/* Other column headers */}
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
                                                            <TableRow tyle={{
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
                    </>
                );
            },
        },
    ];
    const vervalColumns = [
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
            width: isScreenSizeLowerThanLg ? 400 : '',
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
            headerName: "Disetujui oleh",
            // flex: 1,
            width: isScreenSizeLowerThanLg ? 350 : '',
            flex: isScreenSizeLowerThanLg ? 0 : 1,
            sortable: false,
            headerAlign: "center",
            renderCell: (params) => {
                return (
                    <div className="table-manual">
                        {params.row.ApproveVervalBy || "Data tidak ada"}
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
                            {params.row.ApproveVervalTime ? formatDate(params.row.ApproveVervalTime) : 'Tanggal tidak tersedia'}
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
                            {params.row.ModifiedTime ? formatDate(params.row.ModifiedTime) : "Data tidak tersedia"}
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

                const [open1, setOpen1] = useState(false);

                const handleOpen1 = () => {
                    setOpen1(true);
                };

                const handleClose1 = () => {
                    setOpen1(false);
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
                const prodiActions = params.row.ProdiActions || [];
                return (
                    <>
                        <DropdownAksi
                            itemComponent={
                                <>
                                    <MenuItem onClick={() => fetchProdiHistory(params.row.Id)}>Riwayat</MenuItem>

                                    <Link
                                        to={`/detail-usulan-ptki/${params?.row?.Id}`}
                                        style={{
                                            textDecoration: "none",
                                            color: "inherit",
                                        }}
                                    >
                                        <MenuItem>
                                            <a
                                                rel="noreferrer"
                                                target="_blank"
                                                style={{
                                                    textDecoration: "none",
                                                    color: "inherit",
                                                }}
                                            >
                                                Detail
                                            </a>
                                        </MenuItem>
                                    </Link>
                                    {/* <MenuItem
                                        onClick={() => handleOpen1(true)}
                                    >
                                        Konfirmasi ke Penilaian
                                    </MenuItem> */}
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
                                            style={{ margin: '10px', color: darkMode ? "white" : "" }}
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
                                                        <TableRow style={{
                                                            backgroundColor: darkMode ? "#40679E" : "",
                                                            color: darkMode ? "white" : "",
                                                        }}>
                                                            {/* Other column headers */}
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

                        {open1 && (
                            <Modal
                                open={open1}
                                onClose={handleClose1}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style} style={{ width: "50%" }}>
                                    <IconButton
                                        sx={{ position: "absolute", top: 5, right: 5 }}
                                        onClick={handleClose1}
                                        aria-label="close"
                                    >
                                        <HighlightOffIcon color="error" />
                                    </IconButton>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
                                        <XCircleIcon />
                                        <h4 style={{ textAlign: 'center', color: darkMode ? "white" : "" }}>Silakan lakukan penawaran ke asesor untuk penilaian asesor.</h4>
                                    </div>
                                </Box>
                            </Modal>
                        )}
                    </>
                );
            },
        },
    ];
    const columnsKonfirmasiValidasiAkreditasi = [
        { id: "no", label: "Pilih", minWidth: 0, flex: 1 },
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
    const [selectedAsesorIdsToValidate, setSelectedAsesorIdsToValidate] = useState([]);
    const handleCheckboxChangeToValidate = (e, Id) => {
        const checked = e.target.checked;
        setSelectedAsesorIdsToValidate((prevIds) =>
            checked
                ? [...new Set([...prevIds, Id])]
                : prevIds.filter((id) => id !== Id)
        );
    };
    const handleApproveBANPT = (file, nomorSurat, note) => {
        StartLoading();
        const formData = new FormData();
        formData.append("file", file);
        formData.append("note", note);
        formData.append("nomorSurat", nomorSurat);

        const data = selectedAsesorIdsToValidate;
        console.log('selectedAsesorIdsToValidate', selectedAsesorIdsToValidate);

        axios.post(`${baseUrl}/prodi/tovalidate`, formData, {
            headers: {
                'accept': '*/*',
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
            params: {
                selectedProdi: data.join(','),
                suratNo: nomorSurat,
                note: note
            }
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
                    const errorMessage = error.response.data.errors.selectedProdi[0];
                    Swal.fire({
                        icon: "error",
                        title: "Gagal Konfirmasi",
                        text: errorMessage,
                    });
                } else if (error.response === 400) {
                    Swal.fire({
                        icon: "error",
                        title: "Gagal Konfirmasi",
                        text: message,
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Gagal Konfirmasi",
                        text: "Terjadi kesalahan",
                    });
                }
            });
    };
    const openSwalWithSelectedData = () => {
        const selectedDataHtml = selectedAsesorIdsToValidate.map(id => {
            const rowData = rows.find(row => row.Id === id);
            return `
      <div style="border: 1px solid #ccc; padding: 5px; margin-bottom: 10px;">
        <p>${rowData?.NamaProdi || '-'}</p>
        <p>${rowData?.NamaPerguruan || '-'}</p>
      </div>
    `;
        }).join('');
        const status = localStorage.getItem('status');
        console.log(status)
        const selectOptions = SelectOptions[status] || [];
        Swal.fire({
            title: "Konfirmasi validasi Lembaga Akreditasi",
            html: `
      <div class='gap-1' style="display: flex; justify-content: center; overflow: auto;">
        <div style="width: 50%; max-height: 80vh; overflow-y: auto;">
          ${selectedDataHtml}
        </div>
        <div style="width: 40%; max-height: 80vh; overflow-y: auto;">
          <input type="file" accept="application/pdf" id="fileInput" style="display: none;" onchange="document.getElementById('fileLabel').innerText = this.files[0].name;">
          <label for="fileInput" style="padding: 10px; background: green; color: #fff; cursor: pointer; border-radius: 6px; margin: auto;">
            <span id="fileLabel">Upload File Surat Pengantar</span>
          </label>
          <div style="margin-top: 10px;"></div>
          <input type="text" placeholder='Nomor Surat Pengantar' id="nomorSuratInput" class="swal2-input" style="width: 76%;">
          <select id="swal-select" class="swal2-select" style="width: 76%;" onchange="showTextarea()">
            ${selectOptions.map(option => `<option value="${option.value}">${option.label}</option>`).join('')}
          </select>
          <textarea id="swal-textarea" class="swal2-textarea ms-5" placeholder="Konfirmasi dengan catatan" style="width: 72%; margin-top: 10px; display: none;"></textarea>
        </div>
      </div>
    `,
            showCancelButton: true,
            confirmButtonText: "Konfirmasi",
            cancelButtonText: "Batal",
            customClass: {
                popup: 'custom-swal-popup',
            },
            preConfirm: () => {
                const nomorSurat = document.getElementById("nomorSuratInput").value;
                const file = document.getElementById("fileInput").files[0];
                const selectedOption = document.getElementById('swal-select').value;
                if (selectedOption === 'other') {
                    const textareaValue = document.getElementById('swal-textarea').value;
                    handleApproveBANPT(file, nomorSurat, textareaValue);
                } else {
                    handleApproveBANPT(file, nomorSurat, selectedOption);
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
    };
    const penilaianColumns = [
        {
            field: "checkbox",
            headerName: "",
            width: isScreenSizeLowerThanLg ? 50 : '',
            flex: isScreenSizeLowerThanLg ? 0 : 0.3,
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => {
                if (params.row.Status === 40) {
                    return (
                        <div className="table-manual">
                            <Checkbox
                                onChange={(e) => handleCheckboxChangeToValidate(e, params.row.Id)}
                            />
                        </div>
                    );
                } else {
                    return null;
                }
            },
        },
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
            headerName: " Status",
            // flex: 3,
            width: isScreenSizeLowerThanLg ? 300 : '',
            flex: isScreenSizeLowerThanLg ? 0 : 3,
            sortable: false,
            headerAlign: "center",
            renderCell: (params) => {
                // const assessmentCount = params.row.AssesmentCount || ''; // Handle jika nilai null atau undefined

                // Pisahkan string jika memiliki format yang sesuai
                // const assessmentParts = assessmentCount.split('/');
                // const assesmentCount1 = assessmentParts[0] || '';
                // const assesmentCount2 = assessmentParts[1] || '';
                // console.log(params.row.AssesmentCount) // contoh data 1/2
                // const assesmentCount1 = params.row.AssesmentCount.split('/')[0]
                // const assesmentCount2 = params.row.AssesmentCount.split('/')[1]
                return (
                    <div className="table-manual">
                        <ProdiActionName status={params.row.Status} assesmentCount={params.row.AssesmentCount} />
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
                    <div className="table-manual ">
                        <span className="subtitle">
                            {params.row.RequestCompletedTime ? formatDate(params.row.RequestCompletedTime) : 'Tanggal tidak tersedia'}
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

                const handleCloseValid = () => {
                    setOpenValid(false);
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
                const status = params.row.Status;
                const [openValid, setOpenValid] = useState(false);
                const [detailDataKonfirmasi, setDetailDataKonfirmasi] = useState([]);
                const handleOpenValid = (id) => {
                    setOpenValid(true);
                    setIsLoading(true)
                    axios
                        .get(`${baseUrl}/prodi-assesment/${id}`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        })
                        .then((response) => {
                            const result = response.data.data;
                            setDetailDataKonfirmasi(result);
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
                const [note, setNote] = useState('');
                const [selectedAsesorIds, setSelectedAsesorIds] = useState([]);
                const handleCheckboxChange = (e, asesorId) => {
                    const checked = e.target.checked;
                    setSelectedAsesorIds((prevIds) =>
                        checked ? [...prevIds, asesorId] : prevIds.filter((id) => id !== asesorId)
                    );
                };
                useEffect(() => {
                    // Flatten the asesors array and check if there are exactly two asesors
                    const allAsesors = detailDataKonfirmasi.flatMap((asesor) => asesor.asesors);
                    if (allAsesors.length === 2) {
                        // Automatically select both asesors
                        setSelectedAsesorIds(allAsesors.map((innerAsesor) => innerAsesor.asesorId));
                    } else {
                        // Reset selectedAsesorIds if there are more than two asesors
                        setSelectedAsesorIds([]);
                    }
                }, [detailDataKonfirmasi]);
                const handleApproveKonfirmasi = async (id, note) => {
                    const data = selectedAsesorIds
                    StartLoading();
                    try {
                        const response = await axios.post(
                            `${baseUrl}/prodi/akapprove/${id}?note=${note}`,
                            data,
                            {
                                headers: {
                                    'accept': '*/*',
                                    'Authorization': `Bearer ${token}`,
                                    'Content-Type': 'application/json',
                                },
                            }
                        );

                        if (response.data.status === 200) {
                            Swal.fire({
                                icon: "success",
                                title: "Success",
                                text: response.data.message,
                                timer: 3000
                            });
                            fetchProdi();
                        }
                    } catch (error) {
                        if (error.response) {
                            Swal.fire({
                                icon: "error",
                                title: "Gagal Konfirmasi",
                                text: error.response.data.message,
                            });
                            fetchProdi();
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                text: `${error.message}`
                            });
                            fetchProdi();
                        }
                    }
                };
                const rowsKonfirmasi = detailDataKonfirmasi.flatMap((asesor) => {
                    return asesor.asesors.map((innerAsesor,) => {
                        let assignmentButton;
                        // Determine assignmentButton based on asesor.jenjang
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
                                                >
                                                    <span
                                                        onClick={() =>
                                                            handleDownloadFilePenilaian(
                                                                innerAsesor.asesorId,
                                                                innerAsesor.programStudiId
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
                                                        2,
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
                                                >
                                                    <span
                                                        onClick={() =>
                                                            handleDownloadFilePenilaian(
                                                                innerAsesor.asesorId,
                                                                innerAsesor.programStudiId
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
                                                >
                                                    <span
                                                        onClick={() =>
                                                            handleDownloadFilePenilaian(
                                                                innerAsesor.asesorId,
                                                                innerAsesor.programStudiId
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
                                                >
                                                    <span
                                                        onClick={() =>
                                                            handleDownloadFilePenilaian(
                                                                innerAsesor.asesorId,
                                                                innerAsesor.programStudiId
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
                        const isAutoChecked = asesor.asesors.length === 2;
                        return createData(
                            <>
                                <Checkbox
                                    key={innerAsesor.asesorId}
                                    onChange={(e) => handleCheckboxChange(e, innerAsesor.asesorId)}
                                    checked={selectedAsesorIds.includes(innerAsesor.asesorId)}
                                    disabled={isAutoChecked}
                                />
                            </>,
                            innerAsesor.asesorFullName,
                            innerAsesor.asesorEmail,
                            <ProdiActionName status={innerAsesor.status} />,
                            offeringTime,
                            acceptedTime,
                            innerAsesor.totalNilai,
                            innerAsesor.komentar,
                            assignmentButton,
                        );
                    });
                });
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
                                <div>
                                    <MenuItem onClick={() => fetchProdiHistory(params.row.Id)}>Riwayat</MenuItem>
                                    <div>
                                        {params.row.Status !== 26 && (
                                            <MenuItem
                                                onClick={() => handleDetailClick(params.row.Id)}
                                            >
                                                Detail
                                            </MenuItem>
                                        )}
                                        {/* <MenuItem onClick={() => {
                                            const { row } = params;
                                            if (row.Status === 27 || row.Status === 20) {
                                                Swal.fire({
                                                    title: "Konfirmasi proses ke BAN PT",
                                                    input: "textarea",
                                                    icon: "warning",
                                                    inputLabel: "Konfirmasi dengan catatan (opsional)",
                                                    inputAttributes: {
                                                        "aria-label": "Placeholder...",
                                                    },
                                                    showCancelButton: true,
                                                    confirmButtonText: "Konfirmasi",
                                                    cancelButtonText: "Batal",
                                                    preConfirm: (note) => {
                                                        if (note) {
                                                            handleApprove(row.Id, note);
                                                        } else {
                                                            handleApprove(row.Id, "");
                                                        }
                                                    },
                                                });
                                            } else if (row.Status === 26) {
                                                handleOpenValid(params.row.Id);
                                            }
                                        }}>
                                            {params.row.Status === 26 ? "Konfirmasi Proses ke Lembaga Akreditasi" : ''}
                                        </MenuItem>

                                        {status !== 99 && status !== 27 && (
                                            <MenuItem
                                                onClick={() => {
                                                    InputSwal("Catatan Pengembalian", "Placeholder...", status, (note) => {
                                                        handleRejectWithNote(params.row.Id, note)
                                                    });
                                                }}
                                            >
                                                Kembalikan dengan catatan
                                            </MenuItem>
                                        )} */}
                                    </div>
                                </div>
                            }
                        />

                        {openValid && (
                            <Modal
                                open={openValid}
                                onClose={handleCloseValid}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <IconButton
                                        sx={{ position: "absolute", top: 5, right: 5 }}
                                        onClick={handleCloseValid}
                                        aria-label="close"
                                    >
                                        <HighlightOffIcon color="error" />
                                    </IconButton>
                                    <Box sx={{ padding: "13px" }}>
                                        <Typography
                                            id="modal-modal-title"
                                            variant="h6"
                                            component="h2"
                                            style={{ margin: '10px', color: darkMode ? "white" : "" }}
                                        >
                                            Konfirmasi Validasi Lembaga Akreditasi
                                        </Typography>
                                        <div style={{
                                            padding: '5px',
                                            margin: '5px'
                                        }}>
                                            <div style={{ color: darkMode ? "white" : "" }} className="d-flex gap-4">
                                                <div>
                                                    <p>Lembaga</p>
                                                    <p>Nomor Registrasi</p>
                                                    <p>Jenjang</p>
                                                    <p>Program Studi</p>
                                                    <p>Catatan</p>
                                                </div>
                                                <div>
                                                    <p>:</p>
                                                    <p>:</p>
                                                    <p>:</p>
                                                    <p>:</p>
                                                    <p>:</p>
                                                </div>
                                                <div>
                                                    <p>{params.row.NamaPerguruan}</p>
                                                    <p>{params.row.NoReg}</p>
                                                    <p>{params.row.JenjangStr}</p>
                                                    <p>{params.row.NamaProdi}</p>
                                                    <select
                                                        id="swal-select"
                                                        className="swal2-select"
                                                        style={{ width: '100%', padding: '10px', fontSize: '16px' }}
                                                        value={selectedOption}
                                                        onChange={handleSelectChange}
                                                    >
                                                        <option value="Evaluasi Direkomendasi, usul masuk proses validasi pemenuhan syarat akreditasi oleh BANPT/LAMPT">Evaluasi Direkomendasi, usul masuk proses validasi pemenuhan syarat akreditasi oleh BANPT/LAMPT</option>
                                                        <option value="Dokumen usulan sedang dievaluasi oleh Evaluator">Dokumen usulan sedang dievaluasi oleh Evaluator</option>
                                                        <option value="Perguruan Tinggi memperbaiki usul pembukaan prodi ke 3">Perguruan Tinggi memperbaiki usul pembukaan prodi ke 3</option>
                                                        <option value="Perguruan Tinggi memperbaiki usul pembukaan prodi ke 2">Perguruan Tinggi memperbaiki usul pembukaan prodi ke 2</option>
                                                        <option value="Perguruan Tinggi memperbaiki usul pembukaan prodi ke 1">Perguruan Tinggi memperbaiki usul pembukaan prodi ke 1</option>
                                                        <option value="Dokumen usulan sedang dievaluasi oleh Evaluator">Dokumen usulan sedang dievaluasi oleh Evaluator</option>
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
                                            </div>

                                        </div>
                                        <Paper sx={{ width: "100%", overflow: "hidden" }}>
                                            <TableContainer>
                                                <Table stickyHeader aria-label="sticky table">
                                                    <TableHead>
                                                        <TableRow style={{
                                                            backgroundColor: darkMode ? "#40679E" : "",
                                                            color: darkMode ? "white" : "",
                                                        }} >
                                                            {columnsKonfirmasiValidasiAkreditasi.map((column) => (
                                                                <TableCell
                                                                    key={column.id}
                                                                    align={column.align}
                                                                    style={{
                                                                        backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                                                                        border: "none",
                                                                        width: 'auto',
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
                                                                <TableCell style={{ color: darkMode ? "white" : "", }} colSpan={columnsKonfirmasiValidasiAkreditasi.length + 1} align="center">
                                                                    <ClipLoader />
                                                                </TableCell>
                                                            </TableRow>
                                                        ) : (
                                                            <>
                                                                {rowsKonfirmasi?.length === 0 ? (
                                                                    <TableRow style={{
                                                                        backgroundColor: darkMode ? "#40679E" : "",
                                                                        color: darkMode ? "white" : "",
                                                                    }}>
                                                                        <TableCell style={{ color: darkMode ? "white" : "", }} colSpan={columnsKonfirmasiValidasiAkreditasi.length + 1} align="center">
                                                                            <p style={{ color: "red", fontStyle: "italic" }}>
                                                                                Tidak ada data
                                                                            </p>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                ) : (
                                                                    rowsKonfirmasi
                                                                        ?.slice(
                                                                            page2 * rowsPerPage2,
                                                                            page2 * rowsPerPage2 + rowsPerPage2
                                                                        )
                                                                        ?.map((row) => (
                                                                            <TableRow style={{
                                                                                backgroundColor: darkMode ? "#40679E" : "",
                                                                                color: darkMode ? "white" : "",
                                                                            }} key={row.no} hover tabIndex={-1}>
                                                                                {columnsKonfirmasiValidasiAkreditasi.map((column) => {
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
                                        <div className="m-2 gap-4">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleApproveKonfirmasi(params.row.Id, note)}
                                                className="me-3"
                                                disabled={isLoading}
                                            >
                                                {isLoading ? <ClipLoader size={20} color="#fff" /> : 'Konfirmasi'}
                                            </Button>

                                            <Button variant="outlined" onClick={handleCloseValid} >Batal</Button>
                                        </div>
                                    </Box>
                                </Box>
                            </Modal>
                        )}

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
                                                        <TableRow style={{
                                                            backgroundColor: darkMode ? "#40679E" : "",
                                                            color: darkMode ? "white" : "",
                                                        }} >
                                                            {/* Other column headers */}
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
                    </>
                );
            },
        },
    ];
    const penilaianLapanganColumns = [
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
            headerName: " Status",
            // flex: 3,
            width: isScreenSizeLowerThanLg ? 300 : '',
            flex: isScreenSizeLowerThanLg ? 0 : 3,
            sortable: false,
            headerAlign: "center",
            renderCell: (params) => {
                // const assessmentCount = params.row.AssesmentCount || ''; // Handle jika nilai null atau undefined

                // Pisahkan string jika memiliki format yang sesuai
                // const assessmentParts = assessmentCount.split('/');
                // const assesmentCount1 = assessmentParts[0] || '';
                // const assesmentCount2 = assessmentParts[1] || '';
                // console.log(params.row.AssesmentCount) // contoh data 1/2
                // const assesmentCount1 = params.row.AssesmentCount.split('/')[0]
                // const assesmentCount2 = params.row.AssesmentCount.split('/')[1]
                return (
                    <div className="table-manual">
                        <ProdiActionName status={params.row.Status} assesmentCount={params.row.AssesmentCount} />
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
                    <div className="table-manual ">
                        <span className="subtitle">
                            {params.row.RequestCompletedTime ? formatDate(params.row.RequestCompletedTime) : 'Tanggal tidak tersedia'}
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

                const handleCloseValid = () => {
                    setOpenValid(false);
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
                const status = params.row.Status;
                const [openValid, setOpenValid] = useState(false);
                const [detailDataKonfirmasi, setDetailDataKonfirmasi] = useState([]);
                const handleOpenValid = (id) => {
                    setOpenValid(true);
                    setIsLoading(true)
                    axios
                        .get(`${baseUrl}/prodi-assesment-al/${id}`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        })
                        .then((response) => {
                            const result = response.data.data;
                            setDetailDataKonfirmasi(result);
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
                const [note, setNote] = useState('');
                const [selectedAsesorIds, setSelectedAsesorIds] = useState([]);
                const handleCheckboxChange = (e, asesorId) => {
                    const checked = e.target.checked;
                    setSelectedAsesorIds((prevIds) =>
                        checked ? [...prevIds, asesorId] : prevIds.filter((id) => id !== asesorId)
                    );
                };
                useEffect(() => {
                    // Flatten the asesors array and check if there are exactly two asesors
                    const allAsesors = detailDataKonfirmasi.flatMap((asesor) => asesor.asesors);
                    if (allAsesors.length === 2) {
                        // Automatically select both asesors
                        setSelectedAsesorIds(allAsesors.map((innerAsesor) => innerAsesor.asesorId));
                    } else {
                        // Reset selectedAsesorIds if there are more than two asesors
                        setSelectedAsesorIds([]);
                    }
                }, [detailDataKonfirmasi]);
                const handleApproveKonfirmasi = async (id, note) => {
                    const data = selectedAsesorIds
                    StartLoading();
                    try {
                        const response = await axios.post(
                            `${baseUrl}/prodi/akapprove/${id}?note=${note}`,
                            data,
                            {
                                headers: {
                                    'accept': '*/*',
                                    'Authorization': `Bearer ${token}`,
                                    'Content-Type': 'application/json',
                                },
                            }
                        );

                        if (response.data.status === 200) {
                            Swal.fire({
                                icon: "success",
                                title: "Success",
                                text: response.data.message,
                                timer: 3000
                            });
                            fetchProdi();
                        }
                    } catch (error) {
                        if (error.response) {
                            Swal.fire({
                                icon: "error",
                                title: "Gagal Konfirmasi",
                                text: error.response.data.message,
                            });
                            fetchProdi();
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                text: `${error.message}`
                            });
                            fetchProdi();
                        }
                    }
                };
                const rowsKonfirmasi = detailDataKonfirmasi.flatMap((asesor) => {
                    return asesor.asesors.map((innerAsesor,) => {
                        let assignmentButton;
                        // Determine assignmentButton based on asesor.jenjang
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
                                                >
                                                    <span
                                                        onClick={() =>
                                                            handleDownloadFilePenilaian(
                                                                innerAsesor.asesorId,
                                                                innerAsesor.programStudiId
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
                                                        2,
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
                                                >
                                                    <span
                                                        onClick={() =>
                                                            handleDownloadFilePenilaian(
                                                                innerAsesor.asesorId,
                                                                innerAsesor.programStudiId
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
                                                >
                                                    <span
                                                        onClick={() =>
                                                            handleDownloadFilePenilaian(
                                                                innerAsesor.asesorId,
                                                                innerAsesor.programStudiId
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
                                                >
                                                    <span
                                                        onClick={() =>
                                                            handleDownloadFilePenilaian(
                                                                innerAsesor.asesorId,
                                                                innerAsesor.programStudiId
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
                        const isAutoChecked = asesor.asesors.length === 2;
                        return createData(
                            <>
                                <Checkbox
                                    key={innerAsesor.asesorId}
                                    onChange={(e) => handleCheckboxChange(e, innerAsesor.asesorId)}
                                    checked={selectedAsesorIds.includes(innerAsesor.asesorId)}
                                    disabled={isAutoChecked}
                                />
                            </>,
                            innerAsesor.asesorFullName,
                            innerAsesor.asesorEmail,
                            <ProdiActionName status={innerAsesor.status} />,
                            offeringTime,
                            acceptedTime,
                            innerAsesor.totalNilai,
                            innerAsesor.komentar,
                            assignmentButton,
                        );
                    });
                });
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
                                <div>
                                    <MenuItem onClick={() => fetchProdiHistory(params.row.Id)}>Riwayat</MenuItem>
                                    <div>
                                        {params.row.Status !== 26 && (
                                            <MenuItem
                                                onClick={() => handleDetailClick(params.row.Id)}
                                            >
                                                Detail
                                            </MenuItem>
                                        )}
                                        {/* <MenuItem onClick={() => {
                                            const { row } = params;
                                            if (row.Status === 27 || row.Status === 20) {
                                                Swal.fire({
                                                    title: "Konfirmasi proses ke BAN PT",
                                                    input: "textarea",
                                                    icon: "warning",
                                                    inputLabel: "Konfirmasi dengan catatan (opsional)",
                                                    inputAttributes: {
                                                        "aria-label": "Placeholder...",
                                                    },
                                                    showCancelButton: true,
                                                    confirmButtonText: "Konfirmasi",
                                                    cancelButtonText: "Batal",
                                                    preConfirm: (note) => {
                                                        if (note) {
                                                            handleApprove(row.Id, note);
                                                        } else {
                                                            handleApprove(row.Id, "");
                                                        }
                                                    },
                                                });
                                            } else if (row.Status === 26) {
                                                handleOpenValid(params.row.Id);
                                            }
                                        }}>
                                            {params.row.Status === 26 ? "Konfirmasi Proses ke Lembaga Akreditasi" : ''}
                                        </MenuItem>

                                        {status !== 99 && status !== 27 && (
                                            <MenuItem
                                                onClick={() => {
                                                    InputSwal("Catatan Pengembalian", "Placeholder...", status, (note) => {
                                                        handleRejectWithNote(params.row.Id, note)
                                                    });
                                                }}
                                            >
                                                Kembalikan dengan catatan
                                            </MenuItem>
                                        )} */}
                                    </div>
                                </div>
                            }
                        />

                        {openValid && (
                            <Modal
                                open={openValid}
                                onClose={handleCloseValid}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <IconButton
                                        sx={{ position: "absolute", top: 5, right: 5 }}
                                        onClick={handleCloseValid}
                                        aria-label="close"
                                    >
                                        <HighlightOffIcon color="error" />
                                    </IconButton>
                                    <Box sx={{ padding: "13px" }}>
                                        <Typography
                                            id="modal-modal-title"
                                            variant="h6"
                                            component="h2"
                                            style={{ margin: '10px', color: darkMode ? "white" : "" }}
                                        >
                                            Konfirmasi Validasi Lembaga Akreditasi
                                        </Typography>
                                        <div style={{
                                            padding: '5px',
                                            margin: '5px'
                                        }}>
                                            <div style={{ color: darkMode ? "white" : "" }} className="d-flex gap-4">
                                                <div>
                                                    <p>Lembaga</p>
                                                    <p>Nomor Registrasi</p>
                                                    <p>Jenjang</p>
                                                    <p>Program Studi</p>
                                                    <p>Catatan</p>
                                                </div>
                                                <div>
                                                    <p>:</p>
                                                    <p>:</p>
                                                    <p>:</p>
                                                    <p>:</p>
                                                    <p>:</p>
                                                </div>
                                                <div>
                                                    <p>{params.row.NamaPerguruan}</p>
                                                    <p>{params.row.NoReg}</p>
                                                    <p>{params.row.JenjangStr}</p>
                                                    <p>{params.row.NamaProdi}</p>
                                                    <select
                                                        id="swal-select"
                                                        className="swal2-select"
                                                        style={{ width: '100%', padding: '10px', fontSize: '16px' }}
                                                        value={selectedOption}
                                                        onChange={handleSelectChange}
                                                    >
                                                        <option value="Evaluasi Direkomendasi, usul masuk proses validasi pemenuhan syarat akreditasi oleh BANPT/LAMPT">Evaluasi Direkomendasi, usul masuk proses validasi pemenuhan syarat akreditasi oleh BANPT/LAMPT</option>
                                                        <option value="Dokumen usulan sedang dievaluasi oleh Evaluator">Dokumen usulan sedang dievaluasi oleh Evaluator</option>
                                                        <option value="Perguruan Tinggi memperbaiki usul pembukaan prodi ke 3">Perguruan Tinggi memperbaiki usul pembukaan prodi ke 3</option>
                                                        <option value="Perguruan Tinggi memperbaiki usul pembukaan prodi ke 2">Perguruan Tinggi memperbaiki usul pembukaan prodi ke 2</option>
                                                        <option value="Perguruan Tinggi memperbaiki usul pembukaan prodi ke 1">Perguruan Tinggi memperbaiki usul pembukaan prodi ke 1</option>
                                                        <option value="Dokumen usulan sedang dievaluasi oleh Evaluator">Dokumen usulan sedang dievaluasi oleh Evaluator</option>
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
                                            </div>

                                        </div>
                                        <Paper sx={{ width: "100%", overflow: "hidden" }}>
                                            <TableContainer>
                                                <Table stickyHeader aria-label="sticky table">
                                                    <TableHead>
                                                        <TableRow style={{
                                                            backgroundColor: darkMode ? "#40679E" : "",
                                                            color: darkMode ? "white" : "",
                                                        }} >
                                                            {columnsKonfirmasiValidasiAkreditasi.map((column) => (
                                                                <TableCell
                                                                    key={column.id}
                                                                    align={column.align}
                                                                    style={{
                                                                        backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                                                                        border: "none",
                                                                        width: 'auto',
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
                                                                <TableCell style={{ color: darkMode ? "white" : "", }} colSpan={columnsKonfirmasiValidasiAkreditasi.length + 1} align="center">
                                                                    <ClipLoader />
                                                                </TableCell>
                                                            </TableRow>
                                                        ) : (
                                                            <>
                                                                {rowsKonfirmasi?.length === 0 ? (
                                                                    <TableRow style={{
                                                                        backgroundColor: darkMode ? "#40679E" : "",
                                                                        color: darkMode ? "white" : "",
                                                                    }}>
                                                                        <TableCell style={{ color: darkMode ? "white" : "", }} colSpan={columnsKonfirmasiValidasiAkreditasi.length + 1} align="center">
                                                                            <p style={{ color: "red", fontStyle: "italic" }}>
                                                                                Tidak ada data
                                                                            </p>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                ) : (
                                                                    rowsKonfirmasi
                                                                        ?.slice(
                                                                            page2 * rowsPerPage2,
                                                                            page2 * rowsPerPage2 + rowsPerPage2
                                                                        )
                                                                        ?.map((row) => (
                                                                            <TableRow style={{
                                                                                backgroundColor: darkMode ? "#40679E" : "",
                                                                                color: darkMode ? "white" : "",
                                                                            }} key={row.no} hover tabIndex={-1}>
                                                                                {columnsKonfirmasiValidasiAkreditasi.map((column) => {
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
                                        <div className="m-2 gap-4">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleApproveKonfirmasi(params.row.Id, note)}
                                                className="me-3"
                                                disabled={isLoading}
                                            >
                                                {isLoading ? <ClipLoader size={20} color="#fff" /> : 'Konfirmasi'}
                                            </Button>

                                            <Button variant="outlined" onClick={handleCloseValid} >Batal</Button>
                                        </div>
                                    </Box>
                                </Box>
                            </Modal>
                        )}

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
                                                        <TableRow style={{
                                                            backgroundColor: darkMode ? "#40679E" : "",
                                                            color: darkMode ? "white" : "",
                                                        }} >
                                                            {/* Other column headers */}
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
                    </>
                );
            },
        },
    ];
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

                                    {/* {status !== 299 && (
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
                                                    handleOpenKonfirmasi()
                                                }
                                            }}
                                        >
                                            {status === 41 ? " Konfirmasi Validasi" : "Konfirmasi untuk proses Penyiapan KMA Biro"}
                                        </MenuItem>
                                    )} */}
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
    const handleCheckboxChangeToSkInProgress = (e, Id) => {
        const checked = e.target.checked;
        setSelectedAsesorIdsToSkInProgress((prevIds) =>
            checked
                ? [...new Set([...prevIds, Id])]
                : prevIds.filter((id) => id !== Id)
        );
    };
    const handleApproveValidKMA = (file, file2, file3, nik, password, note) => {
        StartLoading();
        const formData = new FormData();
        formData.append("file", file);
        formData.append("file2", file2);
        formData.append("file3", file3);
        formData.append("nik", nik);
        formData.append("password", password);
        formData.append("note", note);
        const data = selectedAsesorIdsToSkInProgress;
        console.log('selectedAsesorIdsToValidate', selectedAsesorIdsToSkInProgress);

        axios.post(`${baseUrl}/prodi/toskinprogress`, formData, {
            headers: {
                'accept': '*/*',
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
            params: {
                selectedProdi: data.join(','),
                nik: nik,
                password: password,
                note: note
            }
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
                    const errorMessage = error.response.data.errors.selectedProdi[0];
                    Swal.fire({
                        icon: "error",
                        title: "Gagal Konfirmasi",
                        text: errorMessage,
                    });
                } else if (error.response === 400) {
                    Swal.fire({
                        icon: "error",
                        title: "Gagal Konfirmasi",
                        text: message,
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Gagal Konfirmasi",
                        text: "Terjadi kesalahan",
                    });
                }
            });
    };
    const openSwalWithSelectedDataValidKMA = () => {
        const selectedDataHtml = selectedAsesorIdsToSkInProgress.map(id => {
            const rowData = rows.find(row => row.Id === id);
            return `
    <div style="border: 1px solid #ccc; padding: 5px; margin-bottom: 10px;">
      <p>${rowData?.NamaProdi || '-'}</p>
      <p>${rowData?.NamaPerguruan || '-'}</p>
    </div>
  `;
        }).join('');
        const status = localStorage.getItem('status');
        console.log(status)
        const selectOptions = SelectOptions[status] || [];
        Swal.fire({
            title: "Pengajuan Draf SK ke Biro Hukum",
            html: `
    <div class='gap-1' style="display: flex; justify-content: center; overflow: auto;">
      <div style="width: 50%; max-height: 80vh; overflow-y: auto;">
        ${selectedDataHtml}
      </div>
      <div style="width: 40%; max-height: 80vh; overflow-y: auto;">
       <div class="mb-3">
        <input class="mb-2" type="file" accept=".pdf,.doc,.docx" id="fileInput" style="display: none;" onchange="document.getElementById('fileLabel').innerText = this.files[0].name;">
        <label for="fileInput" style="padding: 12px; background: green; color: #fff; cursor: pointer; border-radius: 6px; margin: auto;">
          <span id="fileLabel">Upload File1</span>
        </label>
       </div>
       <div class="mb-3">
               <input class="mb-2" type="file" accept=".pdf,.doc,.docx" id="fileInput2" style="display: none;" onchange="document.getElementById('fileLabel2').innerText = this.files[0].name;">
        <label for="fileInput2" style="padding: 12px; background: green; color: #fff; cursor: pointer; border-radius: 6px; margin: auto;">
          <span id="fileLabel2">Upload File2</span>
        </label>
       </div>
       <div class="mb-3">
        <input class="mb-2 mt-3" type="file" accept="application/pdf" id="fileInput3" style="display: none;" onchange="document.getElementById('fileLabel3').innerText = this.files[0].name;">
        <label for="fileInput3" style="padding: 12px; background: green; color: #fff; cursor: pointer; border-radius: 6px; margin: auto;">
          <span id="fileLabel3">Upload File3</span>
        </label>
       </div>
        <input type="text" placeholder='NIK' id="nik" class="swal2-input" style="width: 76%;">
        <input type="text" placeholder='Password' id="password" class="swal2-input" style="width: 76%;">
        <select id="swal-select" class="swal2-select" style="width: 76%;" onchange="showTextarea()">
          ${selectOptions.map(option => `<option value="${option.value}">${option.label}</option>`).join('')}
        </select>
        <textarea id="swal-textarea" class="swal2-textarea ms-5" placeholder="Konfirmasi dengan catatan" style="width: 72%; margin-top: 10px; display: none;"></textarea>
      </div>
    </div>
  `,
            showCancelButton: true,
            confirmButtonText: "Konfirmasi",
            cancelButtonText: "Batal",
            customClass: {
                popup: 'custom-swal-popup',
            },
            preConfirm: () => {
                const nik = document.getElementById("nik").value;
                const password = document.getElementById("password").value;
                const file = document.getElementById("fileInput").files[0];
                const file2 = document.getElementById("fileInput2").files[0];
                const file3 = document.getElementById("fileInput3").files[0];
                const selectedOption = document.getElementById('swal-select').value;
                if (selectedOption === 'other') {
                    const textareaValue = document.getElementById('swal-textarea').value;
                    handleApproveValidKMA(file, file2, file3, nik, password, textareaValue);
                } else {
                    handleApproveValidKMA(file, file2, file3, nik, password, selectedOption);
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
    };
    const penyiapanSK = [
        {
            field: "checkbox",
            headerName: "",
            width: isScreenSizeLowerThanLg ? 50 : '',
            flex: isScreenSizeLowerThanLg ? 0 : 0.3,
            sortable: false,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => {
                if (params.row.Status === 50) {
                    return (
                        <div className="table-manual">
                            <Checkbox
                                onChange={(e) => handleCheckboxChangeToSkInProgress(e, params.row.Id)}
                            />
                        </div>
                    );
                } else {
                    return null;
                }
            },
        },
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
                return (
                    <div className="table-manual">
                        <ProdiActionName status={params.row.Status} />
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
                            {params.row.ValidBanPtTime ? formatDate(params.row.ValidBanPtTime) : "Tanggal tidak tersedia"}
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
                const status = params.row.Status;

                const handleSignParaf = () => {
                    Swal.fire({
                        title: `Konfirmasi Sign ${getStatusText(status + 1)}`,
                        html: `
      <div class="input-group mb-3">
        <p class='me-3'>NIK&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
        <input type="text" class="form-control" id="nikInput" placeholder="Enter NIK">
      </div>
      <div class="input-group mb-3">
        <p class='me-3'>Passphrase</p>
        <input type="password" class="form-control" id="passwordInput" placeholder="Enter password">
      </div>
            <div class="input-group mb-3">
        <p class='me-3'>Anchor&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
        <input type="text" class="form-control" id="anchorInput" placeholder="Enter anchor">
      </div>

       <div class="input-group mb-3">
          <select id="swal-select" class="swal2-select" style="width: 76%;" onchange="showTextarea()">
            <option value="Usul program studi menunggu SK">Usul program studi menunggu SK</option>
  <option value="Surat Keputusan telah terbit">Surat Keputusan telah terbit</option>
  <option value="other">Lainnya</option>
          </select>
          <textarea id="swal-textarea" class="swal2-textarea ms-5" placeholder="Konfirmasi dengan catatan" style="width: 76%; margin-top: 10px; display: none;"></textarea>
        </div>

      
    `,
                        showCancelButton: true,
                        confirmButtonText: "Konfirmasi",
                        cancelButtonText: "Batal",
                        preConfirm: () => {
                            const nik = document.getElementById("nikInput").value;
                            const password = document.getElementById("passwordInput").value;
                            // const note = document.getElementById("noteInput").value;
                            const note = document.getElementById("swal-textarea").value;
                            const anchor = document.getElementById("anchorInput").value;

                            if (!nik || !password || !anchor) {
                                Swal.showValidationMessage("Please enter NIK, password, and anchor");
                                return false;
                            }

                            axios
                                .post(`${baseUrl}/prodi/signsk/${params.row.Id}?nik=${nik}&password=${password}&note=${note}&anchor=${anchor}`, null, {
                                    headers: {
                                        Authorization: `Bearer ${token}`,
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
                                        const errorMessage = error.response.data.message || "Terjadi kesalahan";
                                        Swal.fire({
                                            icon: "error",
                                            title: "Gagal Konfirmasi",
                                            text: errorMessage,
                                        });
                                    } else {
                                        Swal.fire({
                                            icon: "error",
                                            title: "Gagal Konfirmasi",
                                            text: "Terjadi kesalahan",
                                        });
                                    }
                                });
                        },
                    });
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
                                    <MenuItem component="a" href={`/detail-usulan-ptki/${params?.row?.Id}`} target="_blank" rel="noreferrer" className="text-decoration-none text-dark">

                                        Detail
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => handleDetailClick(params.row.Id)}
                                    >
                                        Detail Asesment
                                    </MenuItem>
                                    {status >= 524 && status <= 529 && (
                                        <MenuItem onClick={handleSignParaf}>
                                            Sign SK
                                        </MenuItem>
                                    )}

                                    {status !== 50 && (
                                        <MenuItem
                                            onClick={() => {
                                                if (status === 50) {
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
          <option value="Usul program studi menunggu SK">Usul program studi menunggu SK</option>
  <option value="Surat Keputusan telah terbit">Surat Keputusan telah terbit</option>
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
                                                } else {
                                                    Swal.fire({
                                                        title: `Konfirmasi ${getStatusText(status + 1)}`,
                                                        html: `
        ${status === 51 ? `
          <div class="input-group mb-3">
            <input class="form-control w-75 m-auto" type="file" id="fileInput"  accept=".pdf,.doc,.docx" aria-describedby="fileInputAddon">
            <span class='ms-2 text-danger'>Wajib Upload File PDF/Word</span>
          </div>
          <div class="input-group mb-3">
            <p class='me-3'>Tanggal SK&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
            <input type="date" class="form-control" aria-label="Tanggal" id="dateInput">
          </div>
          <div class="input-group mb-3">
            <p class='me-3'>Nomor SK&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
            <input type="number" class="form-control" aria-label="Nomor Dokumen" id="documentNoInput">
          </div>
        ` : ''}
        <div class="input-group mb-3">
          <p class='me-3'>NIK&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
          <input type="number" class="form-control" id="nikInput" placeholder="Enter NIK">
        </div>
        <div class="input-group mb-3">
          <p class='me-3'>Passphrase&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
          <input type="password" class="form-control" id="passwordInput" placeholder="Enter password">
        </div>

        <div class="input-group mb-3">
          <select id="swal-select" class="swal2-select" style="width: 76%;" onchange="showTextarea()">
          <option value="Usul program studi menunggu SK">Usul program studi menunggu SK</option>
  <option value="Surat Keputusan telah terbit">Surat Keputusan telah terbit</option>
  <option value="other">Lainnya</option>
          </select>
          <textarea id="swal-textarea" class="swal2-textarea ms-5" placeholder="Konfirmasi dengan catatan" style="width: 76%; margin-top: 10px; display: none;"></textarea>
        </div>
      `,
                                                        showCancelButton: true,
                                                        confirmButtonText: "Konfirmasi",
                                                        cancelButtonText: "Batal",
                                                        preConfirm: () => {
                                                            const nikInput = document.getElementById("nikInput");
                                                            const nik = nikInput ? nikInput.value : null;
                                                            const passwordInput = document.getElementById("passwordInput");
                                                            const password = passwordInput ? passwordInput.value : null;


                                                            if (!nik || !password) {
                                                                Swal.showValidationMessage("Please enter both NIK and password");
                                                                return false;
                                                            }

                                                            let file = null;
                                                            let documentDate = null;
                                                            let documentNo = null;

                                                            if (status === 51) {
                                                                const fileInput = document.getElementById("fileInput");
                                                                file = fileInput ? fileInput.files[0] : null;
                                                                const dateInput = document.getElementById("dateInput");
                                                                documentDate = dateInput ? dateInput.value : null;
                                                                const documentNoInput = document.getElementById("documentNoInput");
                                                                documentNo = documentNoInput ? documentNoInput.value : null;
                                                                const selectedOption = document.getElementById('swal-select').value;
                                                                if (selectedOption === 'other') {
                                                                    const textareaValue = document.getElementById('swal-textarea').value;
                                                                    handleApproveSKAndParaf(params.row.Id, documentDate, textareaValue, file, nik, password, documentNo);
                                                                } else {
                                                                    handleApproveSKAndParaf(params.row.Id, documentDate, selectedOption, file, nik, password, documentNo);
                                                                }
                                                            } else if ([521, 522, 523, 524, 525, 526, 527, 528, 529].includes(status)) {
                                                                const selectedOption = document.getElementById('swal-select').value;
                                                                if (selectedOption === 'other') {
                                                                    const textareaValue = document.getElementById('swal-textarea').value;
                                                                    handleParaf(params.row.Id, textareaValue, nik, password);
                                                                } else {
                                                                    handleParaf(params.row.Id, selectedOption, nik, password);
                                                                }
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
                                                    });
                                                }
                                            }}
                                        >
                                            Konfirmasi {getStatusText(status + 1)}
                                        </MenuItem>
                                    )}
                                    {status !== 99 && status !== 27 && (
                                        <MenuItem
                                            // onClick={() => {
                                            //   InputSwal("Catatan Pengembalian", "Placeholder...", (note) => {
                                            //     handleRejectWithNote(params.row.Id, note);
                                            //   });
                                            // }}
                                            onClick={() => {
                                                InputSwal("Catatan Pengembalian", "Placeholder...", status, (note) => {
                                                    handleRejectWithNote(params.row.Id, note)
                                                });
                                            }}
                                        >
                                            Kembalikan dengan catatan
                                        </MenuItem>


                                    )}
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

                                        <div style={{ color: darkMode ? "white" : "", }} className="d-flex justify-content-between mb-3">
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
                                        <hr style={{ marginTop: '-10px', color: darkMode ? "white" : "", }} />
                                        <h6 style={{ fontWeight: '1000', color: darkMode ? "white" : "", }} className="mb-4 mt-4">
                                            RIWAYAT PROSES TAHAPAN USULAN PROGRAM STUDI
                                            <Button sx={{ marginLeft: '10px' }} variant="contained" size="small" onClick={exportToPDF}>Export</Button>
                                        </h6>
                                        <div style={{ color: darkMode ? "white" : "", }} className="d-flex">
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
                                                <p>{params.row.NamaPerguruan}</p>
                                                <p>{params.row.NamaProdi}</p>
                                                <p>{params.row.JenjangStr}</p>
                                                <p>{params.row.NoReg}</p>
                                                <p>{tanggalFormatted}</p>
                                            </div>
                                        </div>

                                        <Paper
                                            sx={{
                                                width: "100%",
                                                overflow: "auto",
                                            }}
                                        >
                                            <TableContainer id="tableContainer1" sx={{ maxHeight: 330, overflow: 'auto' }}>
                                                <Table stickyHeader aria-label="sticky table" sx={{ overflow: 'auto' }}>
                                                    <TableHead>
                                                        <TableRow style={{
                                                            backgroundColor: darkMode ? "#40679E" : "",
                                                            color: darkMode ? "white" : "",
                                                        }}>
                                                            <TableCell style={{
                                                                backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                                                                border: "none",
                                                                color: darkMode ? "white" : "",
                                                                fontWeight: '600',
                                                            }}>Status</TableCell>
                                                            <TableCell style={{
                                                                backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                                                                border: "none",
                                                                color: darkMode ? "white" : "",
                                                                fontWeight: '600',
                                                            }}>Oleh</TableCell>
                                                            <TableCell style={{
                                                                backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                                                                border: "none",
                                                                color: darkMode ? "white" : "",
                                                                fontWeight: '600',
                                                            }}>Tanggal</TableCell>
                                                            <TableCell style={{
                                                                backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                                                                border: "none",
                                                                color: darkMode ? "white" : "",
                                                                fontWeight: '600',
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
                                                                    <TableCell style={{ color: darkMode ? "white" : "", }} className="fullName">{prodiAction.actionBy?.fullName || "-"}</TableCell>
                                                                    <TableCell style={{ color: darkMode ? "white" : "", }}>{formatDate(prodiAction.timeCreated || null)}</TableCell>
                                                                    <TableCell style={{ color: darkMode ? "white" : "", }}>{prodiAction.message || "-"}</TableCell>
                                                                </TableRow>
                                                            ))
                                                        ) : (
                                                            <TableRow>
                                                                <TableCell colSpan={4}>Tidak Ada Data</TableCell>
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
                    </>
                );
            },
        },
    ];
    const SKTerbit = [
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
            // flex: 3,
            width: isScreenSizeLowerThanLg ? 350 : '',
            flex: isScreenSizeLowerThanLg ? 0 : 3,
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
                return (
                    <div className="table-manual  m-auto">
                        <ProdiActionName status={params.row.Status} />
                    </div>
                );
            },
        },
        {
            field: "tglkonfirmasi",
            headerName: "Tanggal diusulkan",
            // flex: 2,
            width: isScreenSizeLowerThanLg ? 200 : '',
            flex: isScreenSizeLowerThanLg ? 0 : 2,
            sortable: false,
            headerAlign: "left",
            renderCell: (params) => {
                return (
                    <div className="table-manual">
                        <span className="subtitle">
                            {params.row.SkDoneByTime ? formatDate(params.row.SkDoneByTime) : "Tanggal tidak tesedia"}
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
            flex: isScreenSizeLowerThanLg ? 0 : 2,
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
            headerName: "Dokumen",
            // flex: 1,
            width: isScreenSizeLowerThanLg ? 130 : '',
            flex: isScreenSizeLowerThanLg ? 0 : 1,
            sortable: false,
            headerAlign: "center",
            renderCell: (params) => {
                return (
                    <div className=" m-auto">
                        <a
                            href={fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                        >  <Button
                            variant="contained"
                            color="success"
                            size="small"
                            sx={{ margin: "auto" }}
                            onClick={() =>
                                handleDownloadFile(
                                    params.row.Id,
                                    params.row.Status,
                                )
                            }
                        >
                                <DownloadIcon size="small" sx={{ marginRight: "2px" }} />
                            </Button></a>
                    </div>
                );
            },
        },
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
    const handleViewChange = (index, id) => {
        const openNewTab = (url) => {
            const newTab = window.open();
            newTab.opener = null;
            newTab.location.href = url;
        };

        switch (index) {
            case 0:
                openNewTab(`/sarjana/edit/${id}`);
                break;
            case 1:
                openNewTab(`/magister/edit/${id}`);
                break;
            case 2:
                openNewTab(`/doktor/edit/${id}`);
                break;
            case 3:
                openNewTab(`/profesi/edit/${id}`);
                break;
            default:
                break;
        }
    };
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
            swal({
                icon: 'error',
                title: 'Error!',
                text: error.message,
            });
        }
    };
    // const handleDownloadFilePenilaian = async (asesorId, programStudiId) => {
    //   try {
    //     const response = await api.get(`/prodi-assesment/form-ak-file/${asesorId}/${programStudiId}`, {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //       responseType: 'blob',
    //     });

    //     if (response.status === 200) {
    //       swal({
    //         title: 'Download....',
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
    //       const blob = new Blob([response.data], { type: response.headers['content-type'] });

    //       const downloadUrl = window.URL.createObjectURL(blob);

    //       const link = document.createElement('a');
    //       link.href = downloadUrl;
    //       link.download = 'prodi.xlsx';

    //       link.click();
    //       window.URL.revokeObjectURL(downloadUrl);
    //       setTimeout(() => {
    //         swal.close();
    //       }, 500);
    //     }
    //   } catch (error) {
    //     console.log(error);
    //     swal({
    //       icon: 'error',
    //       title: 'Error!',
    //       text: error.message,
    //     });
    //   }
    // };
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
    const handleStatusChange0 = (event) => {
        setSelectedStatus0(event.target.value);
        // fetchProdi()
    };
    const handleStatusChange2 = (event) => {
        setSelectedStatus2(event.target.value);
        localStorage.setItem('status', event.target.value)

        // fetchProdi()
    };
    useEffect(() => {
        setSelectedStatus0('')
        setSelectedStatus2('')
    }, [view])
    const [prevView, setPrevView] = useState(0);
    const [previousFetchConditions, setPreviousFetchConditions] = useState({});
    const [activePenilaian, setActivePenilaian] = useState('');
    const handleTabClick = (i) => {
        setView(i);
        setPrevView(view);
        setSearchQuery('');
    };
    const StyledBox = styled(Box)(({ theme }) => ({
        display: 'flex',
        gap: '11px',
        padding: '8px',
        background: darkMode ? "linear-gradient(45deg, #050C9C 30%, #7E8EF1 90%)" : "linear-gradient(45deg, #6DC5D1 30%, #344C64  90%)",
        borderRadius: '10px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    }));
    const StyledButton = styled(Button)(({ theme, isSelected }) => ({
        borderRadius: '6px',
        padding: '4px 13px',
        color: isSelected ? '#fff' : '#333',
        background: isSelected ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(5px)',
        transition: 'all 0.3s ease',
        fontWeight: 'bold',
        textTransform: 'none',
        fontSize: '14px',
        '&:hover': {
            background: isSelected ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 1)',
            transform: 'translateY(-3px)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        },
    }));
    const IconWrapper = styled('span')({
        marginRight: '8px',
        display: 'inline-flex',
        verticalAlign: 'middle',
    });

    const [selectedPenilaian, setSelectedPenilaian] = useState('Penilaian Kecukupan');
    const fetchProdi = () => {
        let dateStatus;
        const status = (function () {
            switch (view) {
                case 5:
                    dateStatus = 'SkDoneByTime';
                    return 'terbit';
                case 4:
                    dateStatus = 'ModifiedTime';
                    return 'sk';
                case 3:
                    dateStatus = 'ValidBanPtTime';
                    return selectedStatus;
                case 2:
                    dateStatus = 'RequestCompletedTime';
                    return selectedPenilaian === 'Penilaian Lapangan' ? 'nilaial' : 'nilai';
                case 1:
                    dateStatus = 'ApproveVervalTime';
                    return 'verval';
                default:
                    dateStatus = 'RequestTime';
                    return 'progress';
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
        if (view === 0) {
            return progressColumns;
        } else if (view === 1) {
            return vervalColumns;
        } else if (view === 2 && selectedPenilaian === "Penilaian Kecukupan") {
            return penilaianColumns;
        } else if (view === 2 && selectedPenilaian === "Penilaian Lapangan") {
            return penilaianLapanganColumns;
        } else if (view === 3) {
            return validasiColumns;
        } else if (view === 4) {
            return penyiapanSK;
        } else if (view === 5) {
            return SKTerbit;
        }
    };
    const handlePenilaianChange = (penilaian) => {
        setActivePenilaian(penilaian); // Mengatur tombol yang aktif
        setSelectedPenilaian(penilaian);
        fetchProdi(true); // Memaksa fetchProdi untuk di-refresh
        console.log('Changing penilaian to:', penilaian);
    };
    const PenilaianButtonGroup = ({ selectedPenilaian, handlePenilaianChange }) => {
        return (
            <StyledBox>
                <StyledButton
                    onClick={() => handlePenilaianChange('Penilaian Kecukupan')}
                    isSelected={selectedPenilaian === 'Penilaian Kecukupan'}
                >
                    <IconWrapper>
                        {activePenilaian === 'Penilaian Kecukupan' ? <CircularProgress size={20} style={{ color: 'orange' }} /> : <AssessmentIcon />}
                    </IconWrapper>
                    Penilaian Kecukupan
                </StyledButton>
                <StyledButton
                    onClick={() => handlePenilaianChange('Penilaian Lapangan')}
                    isSelected={selectedPenilaian === 'Penilaian Lapangan'}
                >
                    <IconWrapper>
                        {activePenilaian === 'Penilaian Lapangan' ? <CircularProgress size={20} style={{ color: 'orange' }} /> : <AnalyticsIcon />}
                    </IconWrapper>
                    Penilaian Lapangan
                </StyledButton>
            </StyledBox>
        );
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
                    <HeroTitle title="Usulan Prodi Baru" />
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="d-flex m-auto usulanprodi-nav">
                            {Array.from({ length: 6 }, (_, i) => {
                                const isActive = i === view;
                                const { icon, text } = (function () {
                                    switch (i) {
                                        case 5:
                                            return {
                                                text: "KMA Terbit",
                                                icon: "📜",
                                            };
                                        case 4:
                                            return {
                                                text: "Penyiapan KMA di Biro",
                                                icon: "🏢",
                                            };
                                        case 3:
                                            return {
                                                text: "Validasi Lembaga Akreditasi",
                                                icon: "✅",
                                            };
                                        case 2:
                                            return {
                                                text: "Penilaian",
                                                icon: "📊",
                                            };
                                        case 1:
                                            return {
                                                text: "Dokumen Sudah Verval",
                                                icon: "📋",
                                            };
                                        default:
                                            return {
                                                icon: "🔄",
                                                text: "Progres Dokumen",
                                            };
                                    }
                                })();

                                return (
                                    <button
                                        key={i}
                                        className="btn border-0 d-flex me-4 align-items-center justify-content-center"
                                        style={{
                                            boxShadow: "none",
                                            background: isActive
                                                ? (darkMode ? "#3C5B6F" : "rgb(0, 208, 255)")
                                                : (darkMode ? "transparent" : ""),
                                            borderRadius: "8px 8px 0px 0px",
                                            height: "48px",
                                            fontWeight: 700,
                                            fontSize: "13px",
                                            lineHeight: "24px",
                                            color: isActive
                                                ? "white"
                                                : (darkMode ? "white" : "black"),
                                            gap: "10px",
                                        }}
                                        onClick={() => {
                                            if (i === view) {
                                                fetchProdi(i);
                                            } else {
                                                handleTabClick(i);
                                            }
                                        }}
                                    >
                                        {tableLoading && isActive ? (
                                            <>
                                                <span role="img" aria-label={text} style={{ fontSize: '26px'  }}>{icon}</span>
                                                <span className="text" style={{ fontSize: '14px' }}>
                                                    {isScreenSizeLowerThanLg
                                                        ? (function () {
                                                            // ... (switch case remains unchanged)
                                                        })()
                                                        : text}
                                                </span>
                                                <CircularProgress size={20} color="success" />
                                            </>
                                        ) : (
                                            <>
                                                <span role="img" aria-label={text} style={{ fontSize: '22px' }}>{icon}</span>
                                                <span className="text" style={{ fontSize: '14px' }}>
                                                    {isScreenSizeLowerThanLg
                                                        ? (function () {
                                                            // ... (switch case remains unchanged)
                                                        })()
                                                        : text}
                                                </span>
                                            </>
                                        )}
                                    </button>
                                );
                            })}
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
                                            case 5:
                                                return "Prodi Sudah Terbit KMA";
                                            case 4:
                                                return "Usulan Prodi Dalam Proses Penyiapan KMA";
                                            case 3:
                                                return `Usulan Prodi Dalam Proses Validasi ${selectedStatus.toUpperCase()}`;
                                            case 2:
                                                return "Penilaian Final Usulan Prodi";
                                            case 1:
                                                return "Dokumen Sudah Verifikasi dan Validasi";
                                            default:
                                                return "Progres Dokumen Usulan Prodi";
                                        }
                                    })()}
                                </span>
                                {view === 2 && (
                                    <div
                                        className=" ms-auto m-3 d-flex flex-column align-items-center"
                                    >
                                        <PenilaianButtonGroup
                                            selectedPenilaian={selectedPenilaian}
                                            handlePenilaianChange={handlePenilaianChange}
                                            darkMode={darkMode}
                                        />
                                    </div>
                                )}
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
                                        {view === 0 && (
                                            <div className="me-3">
                                                <select
                                                    className="form-select w-100 h-50"
                                                    aria-label="Select Status"
                                                    value={selectedStatus0}
                                                    onChange={handleStatusChange0}
                                                >
                                                    <option value="" defaultValue>
                                                        Pilih Status
                                                    </option>
                                                    <option value={0}>Permintaan Diajukan</option>
                                                    <option value={2}>Dokumen Dikirim</option>
                                                </select>
                                            </div>
                                        )}
                                        {view === 2 && selectedPenilaian === "Penilaian Kecukupan" && (
                                            <div className="me-3">
                                                <select
                                                    className="form-select w-100 h-50"
                                                    aria-label="Select Status"
                                                    value={selectedStatus2}
                                                    onChange={handleStatusChange2}
                                                >
                                                    <option value="" defaultValue>
                                                        Pilih Status
                                                    </option>
                                                    <option value={27}>Assesment Di Kembalikan ke User</option>
                                                    <option value={26}>Asesment Selesai</option>
                                                    <option value={22}>Asesment Berlangsung</option>
                                                    <option value={3}>Sudah Perbaikan</option>
                                                    <option value={40} >Valid untuk Lembaga Akreditasi</option>
                                                    <option value={299}>Validasi BANPT/LAM dikembalikan</option>
                                                </select>
                                            </div>
                                        )}

                                        {view === 2 && selectedPenilaian === "Penilaian Lapangan" && (
                                            <div className="me-3">
                                                <select
                                                    className="form-select w-100 h-50"
                                                    aria-label="Select Status"
                                                    value={selectedStatus2}
                                                    onChange={handleStatusChange2}
                                                >
                                                    <option value="" defaultValue>
                                                        Pilih Status
                                                    </option>
                                                    <option value={221}>Penugasan Penilaian Lapangan</option>
                                                    <option value={222}>Penilaian Lapangan Sedang Berlangsung</option>
                                                    <option value={223}>Penilaian Lapangan Selesai</option>
                                                    <option value={226}>Semua Penilaian Lapangan Selesai</option>

                                                </select>
                                            </div>
                                        )}

                                        {view === 3 && (
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
                                        {view === 4 && (
                                            <div className="me-3">
                                                <select
                                                    className="form-select w-100 h-50"
                                                    aria-label="Select Status"
                                                    value={selectedStatus2}
                                                    onChange={handleStatusChange2}
                                                >
                                                    <option value="" defaultValue>
                                                        Pilih Status
                                                    </option>
                                                    <option value={50}>Validasi Hasil Assessment Kecukupan oleh BAN PT/LAM</option>
                                                    <option value={51}>Dalam Proses SK</option>
                                                    <option value={521}>SK diunggah dan paraf 1</option>
                                                    <option value={522}>SK diunggah dan paraf 2</option>
                                                    <option value={523}>SK diunggah dan paraf 3</option>
                                                    <option value={524}>SK diunggah dan paraf 4</option>
                                                    {/* <option value={525}>SK diunggah dan paraf 5</option>
                        <option value={526}>SK diunggah dan paraf 6</option>
                        <option value={527}>SK diunggah dan paraf 7</option>
                        <option value={528}>SK diunggah dan paraf 8</option>
                        <option value={529}>SK diunggah dan paraf 9</option> */}

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

                                    {view === 2 && selectedAsesorIdsToValidate.length > 0 && (
                                        <Button style={{ color: darkMode ? "white" : "" }} className="mt-3" variant="contained" onClick={openSwalWithSelectedData}>
                                            Gabungkan surat pengantar validasi lembaga
                                        </Button>
                                    )}
                                    {view === 4 && selectedAsesorIdsToSkInProgress.length > 0 && (
                                        <Button style={{ color: darkMode ? "white" : "" }} className="mt-3" variant="contained" onClick={openSwalWithSelectedDataValidKMA}>
                                            Gabungkan surat pengantar Validasi Hasil Assessment Kecukupan oleh Lembaga Akreditasi
                                        </Button>
                                    )}
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
        </>
    );
};

export default CardUsulan;

