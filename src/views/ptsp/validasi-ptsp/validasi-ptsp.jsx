import React, { useEffect, useMemo, useState } from "react";
import "../../kasubdit/admin-kasubdit.css";
import penilaian from "../../../assets/penilaian.svg";
import doc from "../../../assets/doc.svg";
import banpt from "../../../assets/banpt.svg";
import penyiapan from "../../../assets/penyiapan.svg";
import terbit from "../../../assets/certificate.svg";
import progress from "../../../assets/progress.svg";
import HeroTitle from "../../../components/hero-title/HeroTitle";
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
import { Helmet } from "react-helmet";
import {
    ErrorSwal,
    ConfirmationSwal,
    StartLoading,
    InputSwal,
    ConfirmationSwal1,
    CloseLoading,
} from "../../../utils/swal2";
import { getToken , getUserId, getRole} from "../../../utils/token";
import axios from "axios";
import { GetApiBaseUrl } from "../../../utils/env";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { Link } from "react-router-dom";
import "moment/locale/id";
import ProdiActionName from "../../../utils/status";
import Swal from "sweetalert2";
import swal from "sweetalert";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { useMediaQuery } from "@mui/material";
import * as XLSX from 'xlsx';
import api from "../../service/api";
import DownloadIcon from '@mui/icons-material/Download';
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
import { ClipLoader } from "react-spinners";
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
    width: '90%',
    maxWidth: 1500,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "10px",
};

const CardUsulan = () => {
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
    useEffect(() => {
        if (page !== null) {
            localStorage.setItem("currentPage", page);
        }
    }, [page]);
    const handleClick = () => {
        navigate("/ketentuan");
    };
    const { darkMode } = useDarkMode()
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
    const fetchProdi = () => {
        let dateStatus;
        const status = (function () {
            switch (view) {
                case 5:
                    dateStatus = 'SkDoneByTime'
                    return "terbit";
                case 4:
                    dateStatus = 'SkDoneByTime'
                    return "sk";
                case 3:
                    dateStatus = 'ValidBanPtTime'
                    return selectedStatus;
                case 2:
                    dateStatus = 'RequestCompletedTime'
                    return "nilai";
                case 1:
                    dateStatus = 'ApproveVervalTime'
                    return "verval";
                default:
                    dateStatus = 'RequestTime'
                    return "progress";
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
    }, [view, selectedStatus, selectedStatus0, selectedStatus2, searchQuery, year, startDate, endDate]);
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
    const handleApproveSK = (id, note, file) => {
        StartLoading();
        const formData = new FormData();
        formData.append("note", note);
        formData.append("file", file);
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
                        timer: 3000
                    });
                    fetchProdi();
                }
            })
            .catch((error) => {
                // console.log(error)
                if (error.response) {
                    Swal.fire({
                        icon: "error",
                        title: "Gagal Konfirmasi",
                        text: error.response.data.errors.file[0],
                    });
                } else {
                    ErrorSwal("Gagal Konfirmasi", "Terjadi Kesalahan");
                }
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
                        text: error.response.data.errors.file[0],
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
    //     swal({
    //         title: 'Download...',
    //         text: 'Sedang Proses Download File...',
    //         content: {
    //             element: "i",
    //             attributes: {
    //                 className: "fas fa-spinner fa-spin",
    //                 style: "color: #4CAF50; font-size: 2em;",
    //             },
    //         },
    //         buttons: false,
    //         dangerMode: false,
    //         closeOnClickOutside: false,
    //         closeOnEsc: false,
    //     });
    //     try {
    //         const response = await api.get(`/prodi/actionfile/${programStudiId}/${status}`, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //             responseType: 'blob',
    //         });
    //         console.log('response>>', response)


    //         if (response.status === 200) {
    //             swal({
    //                 title: 'Download...',
    //                 text: 'Sedang Proses Download File...',
    //                 content: {
    //                     element: "i",
    //                     attributes: {
    //                         className: "fas fa-spinner fa-spin",
    //                         style: "color: #4CAF50; font-size: 2em;",
    //                     },
    //                 },
    //                 buttons: false,
    //                 dangerMode: false,
    //                 closeOnClickOutside: false,
    //                 closeOnEsc: false,
    //             });

    //             const contentDispositionHeader = response.headers.get('content-disposition');
    //             const fileNameMatch = contentDispositionHeader && contentDispositionHeader.match(/filename="?([^"]+)"?/);
    //             const fileName = fileNameMatch && fileNameMatch[1];

    //             const blob = new Blob([response.data], { type: response.headers['content-type'] });
    //             const downloadUrl = window.URL.createObjectURL(blob);
    //             const link = document.createElement('a');
    //             link.href = downloadUrl;
    //             link.download = fileName;
    //             link.click();
    //             window.URL.revokeObjectURL(downloadUrl);

    //             // Close the swal modal after the file has been downloaded
    //             setTimeout(() => {
    //                 swal.close();
    //             }, 1000); // You can adjust the timeout duration as needed
    //         } else if (response.status === 404) {
    //             swal({
    //                 icon: 'error',
    //                 title: `Error`,
    //                 text: `Old assessment file not found.`,
    //             });
    //             // Close the loading spinner in case of a 404 error
    //             swal.close();
    //         }
    //     } catch (error) {
    //         if (error.response && error.response.status === 404) {
    //             const errorMessage = error.response.data.message || 'Data Not found';
    //             swal({
    //                 icon: 'error',
    //                 title: 'Error',
    //                 showConfirmButton: true,
    //                 text: `Error: ${errorMessage}`,
    //             });
    //         } else {
    //             // Handle other types of errors
    //             Swal.fire({
    //                 icon: "error",
    //                 title: "Error",
    //                 text: `${error.message}`
    //             });
    //         }
    //         swal.close();
    //         console.log(error.response);
    //     }
    // };

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
                                    {/* <MenuItem
                                        onClick={() => handleDetailClick(params.row.Id)}
                                    >
                                        Detail Asesment
                                    </MenuItem> */}
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

                                    {status !== 99 && (
                                        <MenuItem
                                            onClick={() => {
                                                Swal.fire({
                                                    title: 'Konfirmasi untuk proses verval',
                                                    html: `
  <div style="margin-bottom: 10px; display: flex; flex-direction: column;">
 <select id="swal-select" class="swal2-select" style="width: 84%;" onchange="showTextarea()">
  <option value="Evaluasi dokumen dapat dilanjutkan">Evaluasi dokumen dapat dilanjutkan</option>
  <option value="Usulan dilanjutkan ke evaluasi dokumen">Usulan dilanjutkan ke evaluasi dokumen</option>
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
                                    )}
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
                const status = params.row.Status;
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
                                    <MenuItem
                                        onClick={() => handleOpen1(true)}
                                    >
                                        Konfirmasi ke Penilaian
                                    </MenuItem>
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

    const penilaianColumns = [
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
                const assessmentCount = params.row.AssesmentCount || ''; // Handle jika nilai null atau undefined

                // Pisahkan string jika memiliki format yang sesuai
                const assessmentParts = assessmentCount.split('/');
                const assesmentCount1 = assessmentParts[0] || '';
                const assesmentCount2 = assessmentParts[1] || '';
                // console.log(params.row.AssesmentCount) // contoh data 1/2
                // const assesmentCount1 = params.row.AssesmentCount.split('/')[0]
                // const assesmentCount2 = params.row.AssesmentCount.split('/')[1]
                return (
                    <div className="table-manual">
                        <ProdiActionName status={params.row.Status} /> |{" "}
                        <span style={{ color: assesmentCount1 !== assesmentCount2 ? 'red' : 'green' }}>
                            {params.row.AssesmentCount}
                        </span>
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
                const ProdiAsesors = params.row.ProdiAsesors || [];
                const status = params.row.Status;
                return (
                    <>
                        <DropdownAksi
                            itemComponent={
                                <div>
                                    <MenuItem onClick={() => fetchProdiHistory(params.row.Id)}>Riwayat</MenuItem>

                                    <div>

                                        <MenuItem component="a" href={`/detail-usulan-ptki/${params?.row?.Id}`} target="_blank" rel="noreferrer" className="text-decoration-none text-dark">

                                            Detail
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() => handleDetailClick(params.row.Id)}
                                        >
                                            Detail Asesment
                                        </MenuItem>


                                        <MenuItem
                                            onClick={() => {
                                                const { row } = params;
                                                if (row.Status === 26 || row.Status === 27 || row.Status === 20) {
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
                                                } else if (row.Status === 40) {
                                                    Swal.fire({
                                                        title: "Konfirmasi validasi Lembaga Akreditasi",
                                                        input: "textarea",
                                                        html: `<label style="padding: 10px; background: green; display: table; color: #fff; cursor: pointer; border-radius: 6px; margin: auto">Upload File<input type="file" id="fileInput" style="display: none;"></label>`,
                                                        inputLabel: "Konfirmasi dengan catatan (opsional)",
                                                        inputAttributes: {
                                                            "aria-label": "Placeholder...",
                                                        },
                                                        showCancelButton: true,
                                                        confirmButtonText: "Konfirmasi",
                                                        cancelButtonText: "Batal",
                                                        preConfirm: (note) => {
                                                            const fileInput = document.getElementById("fileInput");
                                                            const file = fileInput.files[0];
                                                            if (note) {
                                                                handleApproveBANPT(row.Id, note, file);
                                                            } else {
                                                                handleApproveBANPT(row.Id, "", file);
                                                            }
                                                        },
                                                    });
                                                }
                                            }}
                                        >
                                            {params.row.Status === 26
                                                ? "Konfirmasi Proses ke Lembaga Akreditasi"
                                                : params.row.Status === 40
                                                    ? "Upload file ke Lembaga Akreditasi"
                                                    : ""}
                                        </MenuItem>

                                        {status !== 99 && status !== 27 && (
                                            <MenuItem
                                                onClick={() => {
                                                    InputSwal("Catatan Pengembalian", "Placeholder...", (note) => {
                                                        handleRejectWithNote(params.row.Id, note);
                                                    });
                                                }}
                                            >
                                                Kembalikan dengan catatan
                                            </MenuItem>
                                        )}
                                    </div>
                                </div>
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
                                        <ContentCard style={{
                                            padding: '5px',
                                            margin: '5px'
                                        }}>
                                            <p>Nama Perguruan: {params.row.NamaPerguruan}</p>
                                            <p>Nama Prodi: {params.row.NamaProdi}</p>
                                            <p>Jenjang: {params.row.JenjangStr}</p>
                                            <p>NoReg: {params.row.NoReg}</p>
                                        </ContentCard>
                                        <Typography
                                            id="modal-modal-title"
                                            variant="h6"
                                            component="h2"
                                            style={{ margin: '10px' }}
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
                                                        <TableRow>
                                                            {/* Other column headers */}
                                                            <TableCell>Status</TableCell>
                                                            <TableCell>Oleh</TableCell>
                                                            <TableCell>Tanggal</TableCell>
                                                            <TableCell>Catatan</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody id="riwayatTableBody">
                                                        {historyData.length > 0 ? (
                                                            historyData.map((prodiAction) => (
                                                                <TableRow key={prodiAction.id} hover tabIndex={-1}>
                                                                    <TableCell>
                                                                        <ProdiActionName status={prodiAction.action} />
                                                                    </TableCell>
                                                                    <TableCell>{prodiAction.actionBy?.fullName || "-"}</TableCell>
                                                                    <TableCell>{formatDate(prodiAction.timeCreated || null)}</TableCell>
                                                                    <TableCell>{prodiAction.message || "-"}</TableCell>
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
            headerName: "Status & Dokumen",
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
                        <p className="text-success fw-bold">
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
                const status = params.row.Status;
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
                                        >  <span
                                            onClick={() =>
                                                handleDownloadFile(
                                                    params.row.Id,
                                                    params.row.Status,
                                                )
                                            }
                                        >
                                                Export
                                            </span>
                                        </a>
                                    </MenuItem>
                                    <MenuItem component="a" href={`/detail-usulan-ptki/${params?.row?.Id}`} target="_blank" rel="noreferrer" className="text-decoration-none text-dark">

                                        Detail
                                    </MenuItem>

                                    <MenuItem
                                        onClick={() => {
                                            Swal.fire({
                                                title: "Konfirmasi validasi Lembaga Akreditasi",
                                                input: "textarea",
                                                html: `
                        <input class="form-control w-75 m-auto" type="file" id="fileInput">
                      `,
                                                inputLabel: "Konfirmasi dengan catatan (opsional)",
                                                inputAttributes: {
                                                    "aria-label": "Placeholder...",
                                                },
                                                showCancelButton: true,
                                                confirmButtonText: "Konfirmasi",
                                                cancelButtonText: "Batal",
                                                preConfirm: (note) => {
                                                    const fileInput =
                                                        document.getElementById("fileInput");
                                                    const file = fileInput.files[0];
                                                    if (note) {
                                                        handleApproveSK(params.row.Id, note, file);
                                                    } else {
                                                        handleApproveSK(params.row.Id, "", file);
                                                    }
                                                },
                                            });
                                        }}
                                    >
                                        Konfirmasi untuk proses Penyiapan KMA Biro
                                    </MenuItem>

                                    {status !== 99 && status !== 27 && (
                                        <MenuItem
                                            onClick={() => {
                                                InputSwal("Catatan Pengembalian", "Placeholder...", (note) => {
                                                    handleRejectWithNote(params.row.Id, note);
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
                                        <ContentCard style={{
                                            padding: '5px',
                                            margin: '5px'
                                        }}>
                                            <p>Nama Perguruan: {params.row.NamaPerguruan}</p>
                                            <p>Nama Prodi: {params.row.NamaProdi}</p>
                                            <p>Jenjang: {params.row.JenjangStr}</p>
                                            <p>NoReg: {params.row.NoReg}</p>
                                        </ContentCard>
                                        <Typography
                                            id="modal-modal-title"
                                            variant="h6"
                                            component="h2"
                                            style={{ margin: '10px' }}
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
                                                        <TableRow>
                                                            <TableCell>Status</TableCell>
                                                            <TableCell>Oleh</TableCell>
                                                            <TableCell>Tanggal</TableCell>
                                                            <TableCell>Catatan</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody id="riwayatTableBody">
                                                        {historyData.length > 0 ? (
                                                            historyData.map((prodiAction) => (
                                                                <TableRow key={prodiAction.id} hover tabIndex={-1}>
                                                                    <TableCell>
                                                                        <ProdiActionName status={prodiAction.action} />
                                                                    </TableCell>
                                                                    <TableCell>{prodiAction.actionBy?.fullName || "-"}</TableCell>
                                                                    <TableCell>{formatDate(prodiAction.timeCreated || null)}</TableCell>
                                                                    <TableCell>{prodiAction.message || "-"}</TableCell>
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
    const penyiapanSK = [
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
            headerName: "Status & Dokumen",
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
                            {params.row.SkDoneByTime ? formatDate(params.row.SkDoneByTime) : "Tanggal tidak tersedia"}
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

                                    <MenuItem>
                                        <a
                                            href={fileUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            download
                                        >  <span
                                            onClick={() =>
                                                handleDownloadFile(
                                                    params.row.Id,
                                                    params.row.Status,
                                                )
                                            }
                                        >
                                                Export
                                            </span>
                                        </a>
                                    </MenuItem>
                                    <MenuItem component="a" href={`/detail-usulan-ptki/${params?.row?.Id}`} target="_blank" rel="noreferrer" className="text-decoration-none text-dark">

                                        Detail
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            Swal.fire({
                                                title: "Konfirmasi Penyiapan KMA Biro",
                                                input: "textarea",
                                                html: `
                        <input class="form-control w-75 m-auto" type="file" id="fileInput">
                      `,
                                                inputLabel: "Konfirmasi dengan catatan (opsional)",
                                                inputAttributes: {
                                                    "aria-label": "Placeholder...",
                                                },
                                                showCancelButton: true,
                                                confirmButtonText: "Konfirmasi",
                                                cancelButtonText: "Batal",
                                                preConfirm: (note) => {
                                                    const fileInput =
                                                        document.getElementById("fileInput");
                                                    const file = fileInput.files[0];
                                                    if (note) {
                                                        handleApproveSKDone(params.row.Id, note, file);
                                                    } else {
                                                        handleApproveSKDone(params.row.Id, "", file);
                                                    }
                                                },
                                            });
                                        }}
                                    >
                                        Konfirmasi untuk Penyiapan KMA Terbit
                                    </MenuItem>

                                    {status !== 99 && status !== 27 && (
                                        <MenuItem
                                            onClick={() => {
                                                InputSwal("Catatan Pengembalian", "Placeholder...", (note) => {
                                                    handleRejectWithNote(params.row.Id, note);
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
                                        <ContentCard style={{
                                            padding: '5px',
                                            margin: '5px'
                                        }}>
                                            <p>Nama Perguruan: {params.row.NamaPerguruan}</p>
                                            <p>Nama Prodi: {params.row.NamaProdi}</p>
                                            <p>Jenjang: {params.row.JenjangStr}</p>
                                            <p>NoReg: {params.row.NoReg}</p>
                                        </ContentCard>
                                        <Typography
                                            id="modal-modal-title"
                                            variant="h6"
                                            component="h2"
                                            style={{ margin: '10px' }}
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
                                                        <TableRow>
                                                            <TableCell>Status</TableCell>
                                                            <TableCell>Oleh</TableCell>
                                                            <TableCell>Tanggal</TableCell>
                                                            <TableCell>Catatan</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody id="riwayatTableBody">
                                                        {historyData.length > 0 ? (
                                                            historyData.map((prodiAction) => (
                                                                <TableRow key={prodiAction.id} hover tabIndex={-1}>
                                                                    <TableCell>
                                                                        <ProdiActionName status={prodiAction.action} />
                                                                    </TableCell>
                                                                    <TableCell>{prodiAction.actionBy?.fullName || "-"}</TableCell>
                                                                    <TableCell>{formatDate(prodiAction.timeCreated || null)}</TableCell>
                                                                    <TableCell>{prodiAction.message || "-"}</TableCell>
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
                                    <MenuItem >
                                        <a
                                            href={fileUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            download
                                        >  <p
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
                                                Download SK
                                            </p></a>
                                    </MenuItem>
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
                                        <ContentCard style={{
                                            padding: '5px',
                                            margin: '5px'
                                        }}>
                                            <p>Nama Perguruan: {params.row.NamaPerguruan}</p>
                                            <p>Nama Prodi: {params.row.NamaProdi}</p>
                                            <p>Jenjang: {params.row.JenjangStr}</p>
                                            <p>NoReg: {params.row.NoReg}</p>
                                        </ContentCard>
                                        <Typography
                                            id="modal-modal-title"
                                            variant="h6"
                                            component="h2"
                                            style={{ margin: '10px' }}
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
                                                        <TableRow>
                                                            <TableCell>Status</TableCell>
                                                            <TableCell>Oleh</TableCell>
                                                            <TableCell>Tanggal</TableCell>
                                                            <TableCell>Catatan</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody id="riwayatTableBody">
                                                        {historyData.length > 0 ? (
                                                            historyData.map((prodiAction) => (
                                                                <TableRow key={prodiAction.id} hover tabIndex={-1}>
                                                                    <TableCell>
                                                                        <ProdiActionName status={prodiAction.action} />
                                                                    </TableCell>
                                                                    <TableCell>{prodiAction.actionBy?.fullName || "-"}</TableCell>
                                                                    <TableCell>{formatDate(prodiAction.timeCreated || null)}</TableCell>
                                                                    <TableCell>{prodiAction.message || "-"}</TableCell>
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
    const [showSelect, setShowSelect] = useState(false);

    const handleButtonClick = (i) => {
        setView(i);
        fetchProdi()
        if (i === 3) {
            setShowSelect(true);
        } else {
            setShowSelect(false);
        }
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
        if (view === 0) {
            return progressColumns;
        } else if (view === 1) {
            return vervalColumns;
        } else if (view === 2) {
            return penilaianColumns;
        } else if (view === 3) {
            return validasiColumns;
        } else if (view === 4) {
            return penyiapanSK;
        } else if (view === 5) {
            return SKTerbit;
        }
    };

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };
    const handleStatusChange0 = (event) => {
        setSelectedStatus0(event.target.value);
        // fetchProdi()
    };
    const handleStatusChange2 = (event) => {
        setSelectedStatus2(event.target.value);
        // fetchProdi()
    };
    useEffect(() => {
        setSelectedStatus0('')
        setSelectedStatus2('')
    }, [view])
    const [prevView, setPrevView] = useState(0);
    const handleTabClick = (i) => {
        setView(i);
        setPrevView(view);
        setSearchQuery('');
        // setSelectedStatut0('')
    };

    return (
        <>
            <Helmet>
                <title>Kemenag | Usulan Prodi </title>
            </Helmet>


            <>
                <HeroTitle title="Usulan Prodi Baru" />
                <div className="d-flex m-auto ">
                    {Array.from({ length: 2 }, (_, i) => {
                        const isActive = i === view;
                        const { src, text } = (function () {
                            switch (i) {
                                case 1:
                                    return {
                                        text: "Dokumen Sudah Verval",
                                        src: doc,
                                    };
                                default:
                                    return {
                                        src: progress,
                                        text: "Progres Dokumen",
                                    };
                            }
                        })();

                        return (
                            <button
                                key={i}
                                className="btn btn-white border-0 d-flex me-4 align-items-center justify-content-center"
                                style={{
                                    boxShadow: "none",
                                    background: isActive ? "rgb(0, 208, 255)" : null,
                                    borderRadius: "8px 8px 0px 0px",
                                    height: "48px",
                                    fontWeight: 700,
                                    fontSize: "13px",
                                    lineHeight: "24px",
                                    color: isActive ? "white" : 'black',
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
                                        <img src={src} alt="" />
                                        <span className="text" style={{ fontSize: '14px' }}>
                                            {isScreenSizeLowerThanLg
                                                ? (function () {
                                                    switch (text) {
                                                        case "Progres Dokumen":
                                                            return "Progres";
                                                        case "Dokumen Sudah Verval":
                                                            return "Verval";
                                                       
                                                    }
                                                })()
                                                : text}
                                        </span>
                                        <CircularProgress size={20} color="success" />
                                    </>

                                ) : (
                                    <>
                                        <img src={src} alt="" />
                                        <span className="text" style={{ fontSize: '14px' }}>
                                            {isScreenSizeLowerThanLg
                                                ? (function () {
                                                    switch (text) {
                                                        case "Progres Dokumen":
                                                            return "Progres";
                                                        case "Dokumen Sudah Verval":
                                                            return "Verval";
                                                       
                                                    }
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
                    <div className="col-12">
                        <span
                            className="d-block"
                            style={{
                                padding: "21px",
                                fontWeight: 500,
                                fontSize: "24px",
                                lineHeight: "32px",
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
                    </div>

                    <div className="col-12">
                        <div className={`row d-flex flex-sm-row flex-column ${isScreenSizeLowerThanMD ? 'gap-3' : 'align-items-center'}`} style={{ padding: "20px" }}>
                            <div className={`col-md-3 col-12 d-flex  flex-sm-row flex-column gap-3 ${isScreenSizeLowerThanMD ? 'gap-3' : 'align-items-center'}`}>
                                <Button
                                    variant="outlined"
                                    style={{ color: "grey", borderColor: "grey" }}
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
                                            <option value={2}>Sudah Submit</option>
                                        </select>
                                    </div>
                                )}
                                {view === 2 && (
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
                                            <option value={40}>Valid untuk Lembaga Akreditasi</option>
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
                            </div>
                            <div className="col-9 d-flex flex-sm-row flex-column">
                                <div className={`input-group col-12 d-flex flex-sm-row flex-column ${isScreenSizeLowerThanMD ? 'gap-3' : ''}`}>
                                    <div className={`d-flex flex-sm-row flex-column ${isScreenSizeLowerThanMD ? 'gap-3' : ''}`}>
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
                                        className={`form-control ${isScreenSizeLowerThanMD ? 'w-100' : ''}`}
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
                    <Box sx={{ padding: "13px" }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Riwayat Asesment Form Penilaian Asesor
                        </Typography>
                        <Paper sx={{ width: "100%", overflow: "hidden" }}>
                            <TableContainer>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            {columns1.map((column) => (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    style={{ width: 'auto' }}
                                                    sx={{
                                                        backgroundColor: "#F9FAFC",
                                                    }}
                                                >
                                                    {column.label}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {isLoading ? (
                                            <TableRow>
                                                <TableCell colSpan={columns1.length} align="center">
                                                    <ClipLoader />
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            <>
                                                {rows11?.length === 0 ? (
                                                    <TableRow>
                                                        <TableCell colSpan={columns1.length} align="center">
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
                                                            <TableRow key={row.no} hover tabIndex={-1}>
                                                                {columns1.map((column) => {
                                                                    const value = row[column.id];
                                                                    return (
                                                                        <TableCell key={column.id} align={column.align}>
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
