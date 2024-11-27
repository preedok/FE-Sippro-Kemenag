import React, { useState, useEffect } from 'react'
import Swal from "sweetalert2";
import api from "../../../service/api";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { getToken, isAuth, getUserId } from "../../../../utils/token";
import PenawaranStatusName from "../../../../utils/penawaranStatusName";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import swal from 'sweetalert';
import LoadingComponent from '../../../../components/loader/loader'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ReplayIcon from '@mui/icons-material/Replay';
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import CancelIcon from "@mui/icons-material/Cancel";
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CachedIcon from '@mui/icons-material/Cached';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';
import OfflinePinIcon from '@mui/icons-material/OfflinePin';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import TimerOffIcon from '@mui/icons-material/TimerOff';
import { Helmet } from "react-helmet";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import VerifiedIcon from '@mui/icons-material/Verified';
import GradingIcon from '@mui/icons-material/Grading';
import RuleIcon from '@mui/icons-material/Rule';
import FunnelIcon from '../../../../components/icons/FunnelIcon';
import WaveIcon from '../../../../components/icons/WaveIcon';
import TextField from '@mui/material/TextField';
import ContentContainer from '../../../../components/card-container/ContentContainer';
import ContentCard from '../../../../components/card-content/ContentCard';
import HeroTitle from '../../../../components/hero-title/HeroTitle';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ProdiActionName from '../../../../utils/status';
import { motion } from 'framer-motion';
import { useDarkMode } from '../../../../utils/DarkModeContext';
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "10px",
};
const Penawaran = () => {
    const auth = isAuth()
    const [anchorEl, setAnchorEl] = useState(null);
    const [year, setYear] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const token = getToken();
    const [searchQuery, setSearchQuery] = useState('');
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    // Handle Modal
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const handleOpen = async (item) => {
        setSelectedItem(item);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)
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
    const getData = async () => {
        setLoading(true)
        try {
            const response = await api.get("/prodi-assesment", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const result = response.data.data;
            const filteredArray = result.filter(item => item.asesors.some(asesor => asesor.asesorId === + getUserId()));

            // Sort the filtered array based on tanggal usulan (newest first)
            const sortedArray = filteredArray.sort((a, b) => {
                const dateA = new Date(a.asesors[0]?.assesmentOfferingTime || 0);
                const dateB = new Date(b.asesors[0]?.assesmentOfferingTime || 0);
                return dateB - dateA;
            });

            if (!year) {
                setData(sortedArray)
            } else {
                const filteredRows = sortedArray.filter((row) => {
                    const noRegYear = row.nomorRegistrasi.split('/')[1];
                    return noRegYear == year;
                });
                setData(filteredRows);
            }
            setLoading(false)
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: `${error.message}`
            });
        }
    };

    // const getData = async () => {
    //     setLoading(true)
    //     try {
    //         const response = await api.get("/prodi-assesment", {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         });
    //         const result = response.data.data;
    //         const filteredArray = result.filter(item => item.asesors.some(asesor => asesor.asesorId === + getUserId()));
    //         if (!year) {
    //             setData(filteredArray)
    //         } else {
    //             const filteredRows = filteredArray.filter((row) => {
    //                 const noRegYear = row.nomorRegistrasi.split('/')[1];
    //                 return noRegYear == year;
    //             });
    //             setData(filteredRows);
    //         }
    //         setLoading(false)
    //     } catch (error) {
    //         console.log(error);
    //         Swal.fire({
    //             icon: "error",
    //             title: "Error",
    //             text: `${error.message}`
    //         });
    //     }
    // };
    const filterData = () => {
        return rows.filter((row) => {
            return Object.values(row).some((value) => {
                if (value !== null && typeof value === 'string') {
                    return value.toLowerCase().includes(searchQuery.toLowerCase());
                }
                return false;
            });
        });
    };
    const handleKonfirmasi = async () => {
        try {
            const asesorId = getUserId();
            const status = PenawaranStatusName.AssesmentOfferAccepted
            const currentDate = new Date().toISOString();
            const payload = {
                data: {
                    asesorId: parseInt(asesorId),
                    asesor: null,
                    programStudiId: selectedItem.id,
                    programStudi: null,
                    status: parseInt(status),
                    statusStr: "Konfirmasi",
                    assesmentOfferingTime: null,
                    assesmentAcceptedTime: currentDate,
                    assesmentInprogressTime: null,
                    assesmentCompletedTime: null,
                    assesmentCanceledTime: null,
                    assesmentRejectedTime: null,
                    timeCreated: "2023-07-20T10:48:18.754191Z",
                    timeUpdated: null,
                    timeDeleted: null,
                },
            };
            const response = await api.put(
                `/prodi-assesment/${selectedItem.id}/${status}`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Success Konfirmasi Status.",
                    showConfirmButton: false,
                    timer: 1000
                });
                handleClose();
                getData();
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Unexpected response status",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: `${error.message}`
            });
            console.log(error);
        }
    };
    const handleTolak = async () => {
        try {
            const asesorId = getUserId();
            const status = PenawaranStatusName.Rejected
            const currentDate = new Date().toISOString();
            const payload = {
                data: {
                    asesorId: parseInt(asesorId),
                    asesor: null,
                    programStudiId: selectedItem.id,
                    programStudi: null,
                    status: parseInt(status),
                    assesmentOfferingTime: null,
                    assesmentAcceptedTime: currentDate,
                    assesmentInprogressTime: null,
                    assesmentCompletedTime: null,
                    assesmentCanceledTime: null,
                    assesmentRejectedTime: null,
                    timeCreated: "2023-07-20T10:48:18.754191Z",
                    timeUpdated: null,
                    timeDeleted: null,
                },
            };
            const response = await api.put(
                `/prodi-assesment/${selectedItem.id}/${status}`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Tolak Status Berhasil",
                    showConfirmButton: false,
                    timer: 1000
                });
                handleClose();
                getData();
            } else {
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: `${error.message}`
            });
            console.log(error);
        }
    };
    useEffect(() => {
        getData();
    }, [year]);
    const formatStatus = (status) => {
        if (status === PenawaranStatusName.AssesmentOffering) {
            return (
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
                        fontSize: "10px",
                    }}
                    className="mt-3"
                >
                    Menunggu Konfirmasi
                    <AccessAlarmsIcon style={{ color: "white", marginLeft: "auto" }} />
                </div>
            );
        } else if (status === PenawaranStatusName.AssesmentOfferAccepted) {
            return (
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
                        fontSize: "12px",
                    }}
                    className="mt-3 me-2"
                >
                    Konfirmasi diterima
                    <CheckCircleIcon style={{ color: "white", marginLeft: "auto" }} />
                </div>
            );
        } else if (status === PenawaranStatusName.Rejected) {
            return (
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
                        fontSize: "10px",
                    }}
                    className="mt-3 me-5"
                >
                    Konfirmasi di Tolak
                    <CancelIcon style={{ color: "white", marginLeft: "auto" }} />
                </div>
            );
        } else if (status === PenawaranStatusName.AssesmentBackToUser) {
            return (
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
                        fontSize: "10px",
                    }}
                    className="mt-3 me-5"
                >
                    Asesmen Kembali ke Pengguna
                    <ReplayIcon style={{ color: "white", marginLeft: "auto" }} />
                </div>
            );
        } else if (status === PenawaranStatusName.Requested) {
            return (
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
                        fontSize: "10px",
                    }}
                    className="mt-3 me-5"
                >
                    Asesmen Kembali ke Pengguna
                    <ReplayIcon style={{ color: "white", marginLeft: "auto" }} />
                </div>
            );
        } else if (status === PenawaranStatusName.DocumentCompleted) {
            return (
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
                        fontSize: "10px",
                    }}
                    className="mt-3 me-5"
                >
                    Dokument Lengkap
                    <DocumentScannerIcon style={{ color: "white", marginLeft: "auto" }} />
                </div>
            );
        } else if (status === PenawaranStatusName.Confirmed) {
            return (
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
                        fontSize: "10px",
                    }}
                    className="mt-3 me-5"
                >
                    Telah dikonfirmasi
                    <DoneAllIcon style={{ color: "white", marginLeft: "auto" }} />
                </div>
            );
        } else if (status === PenawaranStatusName.FixConfirmed) {
            return (
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
                        fontSize: "10px",
                    }}
                    className="mt-3 me-5"
                >
                    Perbaikan konfirmasi
                    <FactCheckIcon style={{ color: "white", marginLeft: "auto" }} />
                </div>
            );
        } else if (status === PenawaranStatusName.AssesmentInprogress) {
            return (
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
                        fontSize: "10px",
                    }}
                    className="mt-3 me-5"
                >
                    Asesmen sedang di proses
                    <CachedIcon style={{ color: "white", marginLeft: "auto" }} />
                </div>
            );
        } else if (status === PenawaranStatusName.AssesmentCompleted) {
            return (
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
                        fontSize: "10px",
                    }}
                    className="mt-3 me-5"
                >
                    Asesmen Selesai
                    <LibraryAddCheckIcon style={{ color: "white", marginLeft: "auto" }} />
                </div>
            );
        } else if (status === PenawaranStatusName.AssesmentLocationInProgress) {
            return (
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
                        fontSize: "10px",
                    }}
                    className="mt-3 me-5"
                >
                    Asesmen Lokasi dalam proses
                    <EditLocationAltIcon style={{ color: "white", marginLeft: "auto" }} />
                </div>
            );
        } else if (status === PenawaranStatusName.AssesmentLocationCompleted) {
            return (
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
                        fontSize: "10px",
                    }}
                    className="mt-3 me-5"
                >
                    Asesmen Lokasi Selesai
                    <WhereToVoteIcon style={{ color: "white", marginLeft: "auto" }} />
                </div>
            );
        } else if (status === PenawaranStatusName.AssesmentAllCompleted) {
            return (
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
                        fontSize: "10px",
                    }}
                    className="mt-3 me-5"
                >
                    Semua Asesmen Selesai
                    <OfflinePinIcon style={{ color: "white", marginLeft: "auto" }} />
                </div>
            );
        } else if (status === PenawaranStatusName.AssesmentExpired) {
            return (
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
                        fontSize: "10px",
                    }}
                    className="mt-3 me-5"
                >
                    Asesmen Kadaluarsa
                    <TimerOffIcon style={{ color: "white", marginLeft: "auto" }} />
                </div>
            );
        } else if (status === PenawaranStatusName.AssesmentCanceled) {
            return (
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
                        fontSize: "10px",
                    }}
                    className="mt-3 me-5"
                >
                    Asesmen dibatalkan
                    <HighlightOffIcon style={{ color: "white", marginLeft: "auto" }} />
                </div>
            );
        } else if (status === PenawaranStatusName.ValidSK) {
            return (
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
                        fontSize: "10px",
                    }}
                    className="mt-3 me-5"
                >
                    SK Valid
                    <BeenhereIcon style={{ color: "white", marginLeft: "auto" }} />
                </div>
            );
        } else if (status === PenawaranStatusName.Approved) {
            return (
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
                        fontSize: "10px",
                    }}
                    className="mt-3 me-5"
                >
                    Terverifikasi ( di setujui )
                    <VerifiedIcon style={{ color: "white", marginLeft: "auto" }} />
                </div>
            );
        } else if (status === PenawaranStatusName.DalamValidasi) {
            return (
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
                        fontSize: "10px",
                    }}
                    className="mt-3 me-5"
                >
                    Dalam Validasi
                    <RuleIcon style={{ color: "white", marginLeft: "auto" }} />
                </div>
            );
        } else if (status === PenawaranStatusName.AllProcessDone) {
            return (
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
                        fontSize: "10px",
                    }}
                    className="mt-3 me-5"
                >
                    Semua Proses Selesai
                    <GradingIcon style={{ color: "white", marginLeft: "auto" }} />
                </div>
            );
        }
    };
    const columns = [
        { id: "no", label: "#", flex: 1 },
        { id: "noregProdi", label: "Nomor Registrasi & Program Studi", flex: 2 },
        {
            id: "lembagaJenjang",
            label: "Lembaga & Jenjang",
            flex: 2,
            align: "left",
        },
        {
            id: "tanggalUsulan",
            label: "Tanggal Usulan ",
            flex: 1,
            align: "left",
        },
        {
            id: "dokumenStatus",
            label: "Status",
            flex: 1,
            align: "center",
        },
        {
            id: "tanggalPenawaran",
            label: "Durasi Penawaran",
            flex: 1.5,
            align: "left",
        },
        {
            id: "waktuPenawaran",
            label: "Durasi Penilaian",
            flex: 1,
            align: "left",
        },
        {
            id: "dokumen",
            label: "Surat Tugas",
            flex: 1,
            align: "left",
        },
        { id: "action", label: "", minWidth: 70, align: "left" },
    ];
    const dateFormatter = (dateStr) => {
        if (!dateStr) return "-";

        const options = { day: "numeric", month: "long", year: "numeric" };
        const date = new Date(dateStr);
        return new Intl.DateTimeFormat("id-ID", options).format(date);
    };
    // download surat tugas
    const [fileUrl, setFileUrl] = useState(null);
    const handleDownloadFile = async (programStudiId) => {
        Swal.fire({
            title: 'Download...',
            text: 'Sedang Proses Download File...',
            html: '<i class="fas fa-spinner fa-spin" style="color: #4CAF50; font-size: 2em;"></i>',
            allowOutsideClick: false,
            showConfirmButton: false,
        });

        const token = getToken()
        localStorage.setItem('programStudiId', programStudiId);
        const asesorId = getUserId()

        try {
            const response = await api.post(
                `/prodi-assesment/surat-tugas/${asesorId}/${programStudiId}`,
                null,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    responseType: 'blob',
                }
            );

            if (response.status === 200) {
                Swal.close();

                const contentDisposition = response.headers['content-disposition'];
                if (contentDisposition) {
                    // Set the entire content-disposition header as the filename
                    const fileName = contentDisposition;

                    const blob = new Blob([response.data], { type: response.headers['content-type'] });
                    const url = window.URL.createObjectURL(blob);

                    const a = document.createElement('a');
                    a.href = url;
                    a.download = fileName;
                    a.style.display = 'none';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);

                    Swal.fire({
                        title: 'Download Selesai',
                        icon: 'success',
                        buttons: false,
                        dangerMode: false,
                        timer: 2000,
                        allowOutsideClick: false,
                        showConfirmButton: false,
                    });
                } else {
                    const blob = new Blob([response.data], { type: response.headers['content-type'] });
                    const url = window.URL.createObjectURL(blob);
                    window.open(url, '_blank');
                    window.URL.revokeObjectURL(url);
                }
            } else {
                console.log('error')
            }
        } catch (error) {
            Swal.close();
            console.log(error.response);
            if (error.response && error.response.status === 404) {
                const errorMessage = error.response.data.message || 'Data Not found';
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    showConfirmButton: true,
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

        }
    };

    const filteredData = data.filter(item => {
        const asesor = item.asesors[0];
        const status = asesor?.status;
        return (
            status === PenawaranStatusName.AssesmentOffering ||
            status === PenawaranStatusName.AssesmentOfferAccepted ||
            status === PenawaranStatusName.Rejected
        );
    });
    const rows = filteredData.map((item, index) => {
        const filteredData = item.asesors.filter((asesor) => asesor.asesorId === + getUserId());
        // const asesorFilter = item.filter(item => item.asesors.some(asesor => asesor.asesorId === +auth.user_id))
        const asesor = filteredData[0];
        const status = asesor?.status;
        // const noregProdi = `${item.nomorRegistrasi} \n ${item.namaProdi}`
        const lembagaJenjang = `${item.lembaga} \n (${item.jenjang})`
        const isNew = (new Date() - new Date(asesor?.assesmentOfferingTime)) / (1000 * 60 * 60 * 24) < 3;
        const noregProdi = (
            <div style={{ display: 'flex', alignItems: 'center' }}>
               
                <div>
                    {item.nomorRegistrasi} <br /> {item.namaProdi}  {isNew && (
                        <span className="ms-1" style={{ backgroundColor: 'green', width: '50px', height: '20px', color: 'white', paddingLeft: '5px', paddingRight: '5px', borderRadius: '3px' }}>Baru</span>
                    )}
                </div>
            </div>
        );
        return createData(
            index + 1,
            noregProdi,
            lembagaJenjang,
            dateFormatter(asesor?.assesmentOfferingTime) || "-",
            <>
                <ProdiActionName status={asesor?.status} />
            </>,
            status !== PenawaranStatusName.Rejected ? (
                asesor?.assesmentOfferExpiredInDays !== PenawaranStatusName.AssesmentOffering ? (
                    <p
                        style={{
                            color: "green",
                            fontStyle: "italic",
                            textAlign: "center",
                        }}
                        className="mt-4"
                    >
                        {asesor?.assesmentOfferingExpiredInDays || "-"} Hari
                    </p>
                ) : (
                    <p style={{ color: "red", fontStyle: "italic", textAlign: "center" }}>
                        belum Berlaku
                    </p>
                )
            ) : null,
            status === PenawaranStatusName.AssesmentCompleted || status === PenawaranStatusName.AssesmentOfferAccepted ? (
                asesor?.assesmentDurationInDays !== PenawaranStatusName.AssesmentOffering ? (
                    <p
                        style={{
                            color: "red",
                            fontStyle: "italic",
                            textAlign: "center",
                        }}
                        className="mt-4"
                    >
                        {asesor?.assesmentDurationInDays || "-"} Hari
                    </p>
                ) : (
                    <p style={{ color: "red", fontStyle: "italic", textAlign: "center" }}>
                        belum Berlaku
                    </p>
                )
            ) : null,
            status === PenawaranStatusName.AssesmentOfferAccepted || status === PenawaranStatusName.AssesmentCompleted ? (
                <a
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                >
                    <Button variant="contained" size="small" color="success" onClick={() =>
                        handleDownloadFile(
                            item.id,
                            item.programStudiId,
                            PenawaranStatusName.AssesmentOfferAccepted
                        )
                    }>
                        <PictureAsPdfIcon size="small" sx={{ marginRight: '2px' }} />
                    </Button>
                </a>
            ) : null,
            <>
                {status === PenawaranStatusName.AssesmentOffering ? (
                    <Button
                        size="small"
                        variant="contained"
                        onClick={() => handleOpen(item)}
                    >
                        <AddTaskIcon sx={{ marginRight: "6px" }} />
                        Konfirmasi
                    </Button>
                ) : null}
            </>
        );
    });
    function createData(
        no,
        noregProdi,
        lembagaJenjang,
        tanggalUsulan,
        dokumenStatus,
        tanggalPenawaran,
        waktuPenawaran,
        dokumen,
        action
    ) {
        return {
            no,
            noregProdi,
            lembagaJenjang,
            tanggalUsulan,
            dokumenStatus,
            tanggalPenawaran,
            waktuPenawaran,
            dokumen,
            action,
        };
    }
    const { darkMode } = useDarkMode()
    return (
        <>
            <Helmet>
                <title>Kemenag | Penawaran </title>
            </Helmet>
            <HeroTitle
                title="Penawaran Usulan Prodi"
            />
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <ContentContainer>
                    <ContentCard>
                        <div className='d-flex'>
                            <button
                                onClick={handleOpenTahun}
                                className="btn btn-none dropdown-toggle d-flex align-items-center border-0"
                                style={{
                                    height: "56px",
                                    boxShadow: "none",
                                    padding: "0px 28px",
                                    gap: "10px",
                                    color: darkMode ? "white" : "", borderRadius: '4px'
                                }}
                            >
                                <FunnelIcon />
                                {year ? year : "Pilih Tahun"}
                            </button>
                            <input
                                type='text'
                                className='form-control h-50 w-50 me-2 mt-3 ms-auto'
                                placeholder='Pencarian'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
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
                            <List sx={{ maxHeight: "200px", }}>
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
                        <div className="col-12" style={{ marginTop: "-20px" }}>
                            <span
                                className="d-block"
                                style={{
                                    padding: "20px",
                                    fontWeight: 500,
                                    fontSize: "24px",
                                    lineHeight: "32px",
                                    color: darkMode ? "white" : ""
                                }}
                            >
                                Penawaran Penilaian Kecukupan Usulan Prodi Baru
                            </span>
                        </div>
                        <div className="col-12 ">
                            <Paper sx={{ width: "100%", overflow: "hidden" }}>
                                <TableContainer>
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
                                            ) : filterData().length === 0 ? (
                                                    <TableRow style={{ backgroundColor: darkMode ? "#40679E" : "", color: darkMode ? "white" : "" }}>
                                                        <TableCell style={{ color: darkMode ? "white" : "" }} colSpan={columns.length} align="center">
                                                            DATA TIDAK TERSEDIA
                                                        </TableCell>
                                                    </TableRow>
                                            ) : (
                                                filterData()
                                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    .map((row, index) => (
                                                        <TableRow style={{
                                                            backgroundColor: darkMode ? "#40679E" : "",
                                                            color: darkMode ? "white" : "",
                                                        }} hover role="checkbox" tabIndex={-1} key={index}>
                                                            {columns.map((column) => {
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
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={[10, 25, 100]}
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
                        </div>
                        {/* <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={value}>
                            <Box className='m-3' sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label="Assessment Kecukupan" value="ak" />
                                    <Tab label="Assessment Lapangan" value="al" />
                                </TabList>
                            </Box>
                            <TabPanel value="ak">
                                <div className='d-flex'>
                                    <button
                                        onClick={handleOpenTahun}
                                        className="btn btn-none dropdown-toggle d-flex align-items-center border-0"
                                        style={{
                                            color: "#717171",
                                            height: "56px",
                                            boxShadow: "none",
                                            padding: "0px 28px",
                                            gap: "10px",
                                        }}
                                    >
                                        <FunnelIcon />
                                        {year ? year : "Pilih Tahun"}
                                    </button>
                                    <input
                                        type='text'
                                        className='form-control h-50 w-50 me-2 mt-3 ms-auto'
                                        placeholder='Pencarian'
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
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
                                <div className="col-12" style={{ marginTop: "-20px" }}>
                                    <span
                                        className="d-block"
                                        style={{
                                            padding: "20px",
                                            fontWeight: 500,
                                            fontSize: "24px",
                                            lineHeight: "32px",
                                        }}
                                    >
                                        Penawaran Penilaian Kecukupan Usulan Prodi Baru
                                    </span>
                                </div>
                                <div className="col-12 ">
                                    <Paper sx={{ width: "100%", overflow: "hidden" }}>
                                        <TableContainer>
                                            <Table stickyHeader aria-label="sticky table">
                                                <TableHead>
                                                    <TableRow>
                                                        {columns.map((column) => (
                                                            <TableCell
                                                                key={column.id}
                                                                align={column.align}
                                                                style={{ minWidth: column.minWidth }}
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
                                                    {loading ? (
                                                        <LoadingComponent columns={columns} />
                                                    ) : (
                                                        filterData()
                                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                            .map((row, index) => (
                                                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                                    {columns.map((column) => {
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
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        <TablePagination
                                            rowsPerPageOptions={[10, 25, 100]}
                                            component="div"
                                            count={rows.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                        />
                                    </Paper>
                                </div>
                            </TabPanel>
                            <TabPanel value="al">
                                <div className='d-flex'>
                                    <button
                                        onClick={handleOpenTahunLapangan}
                                        className="btn btn-none dropdown-toggle d-flex align-items-center border-0"
                                        style={{
                                            color: "#717171",
                                            height: "56px",
                                            boxShadow: "none",
                                            padding: "0px 28px",
                                            gap: "10px",
                                        }}
                                    >
                                        <FunnelIcon />
                                        {year ? year : "Pilih Tahun"}
                                    </button>
                                    <input
                                        type='text'
                                        className='form-control h-50 w-50 me-2 mt-3 ms-auto'
                                        placeholder='Pencarian'
                                        value={searchQueryLapangan}
                                        onChange={(e) => setSearchQueryLapangan(e.target.value)}
                                    />
                                </div>
                                <Popover
                                    open={Boolean(anchorElLapangan)}
                                    anchorEl={anchorElLapangan}
                                    onClose={handleCloseTahunLapangan}
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
                                            onClick={() => handleYearSelectLapangan('')}
                                        >
                                            <ListItemText primary="Semua Data" />
                                        </ListItem>
                                        {Array.from({ length: 10 }, (_, index) => {
                                            const menuItemYearLapangan = new Date().getFullYear() - index;
                                            return (
                                                <ListItem
                                                    key={menuItemYearLapangan}
                                                    button
                                                    onClick={() => handleYearSelectLapangan(menuItemYearLapangan)}
                                                >
                                                    <ListItemText primary={menuItemYearLapangan} />
                                                </ListItem>
                                            );
                                        })}
                                    </List>
                                </Popover>
                                <div className="col-12" style={{ marginTop: "-20px" }}>
                                    <span
                                        className="d-block"
                                        style={{
                                            padding: "20px",
                                            fontWeight: 500,
                                            fontSize: "24px",
                                            lineHeight: "32px",
                                        }}
                                    >
                                        Penawaran Penilaian Lapangan Usulan Prodi Baru
                                    </span>
                                </div>
                                <div className="col-12 ">
                                    <Paper sx={{ width: "100%", overflow: "hidden" }}>
                                        <TableContainer>
                                            <Table stickyHeader aria-label="sticky table">
                                                <TableHead>
                                                    <TableRow>
                                                        {columnsLapangan.map((column) => (
                                                            <TableCell
                                                                key={column.id}
                                                                align={column.align}
                                                                style={{ minWidth: column.minWidth }}
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
                                                    {loadingLapangan ? (
                                                        <LoadingComponent columns={columnsLapangan} />
                                                    ) : (
                                                        filterDataLapangan()
                                                            .slice(pageLapangan * rowsPerPageLapangan, pageLapangan * rowsPerPageLapangan + rowsPerPageLapangan)
                                                            .map((row, index) => (
                                                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                                    {columnsLapangan.map((column) => {
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
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        <TablePagination
                                            rowsPerPageOptions={[10, 25, 100]}
                                            component="div"
                                            count={rowsLapangan.length}
                                            rowsPerPage={rowsPerPageLapangan}
                                            page={pageLapangan}
                                            onPageChange={handleChangePageLapangan}
                                            onRowsPerPageChange={handleChangeRowsPerPageLapangan}
                                        />
                                    </Paper>
                                </div>
                            </TabPanel>
                        </TabContext>
                    </Box> */}
                    </ContentCard>
                </ContentContainer>
            </motion.div>
            {/* Modal Handle Penilaian kecukupan  */}
            {selectedItem && (
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
                                fontSize: "19px",
                                fontWeight: "600",
                                marginTop: "28px",
                            }}
                        >
                            Konfirmasi Penawaran Penilaian Kecukupan Usulan Prodi Baru
                        </Typography>
                        <Box sx={{ padding: 4 }}>
                            {selectedItem && (
                                <div key={selectedItem.id}>
                                    <Typography className="mb-3">
                                        Program Studi : <b>{selectedItem.namaProdi}</b>
                                    </Typography>
                                    <Typography className="mb-3">
                                        Lembaga : <b> {selectedItem.lembaga}</b>
                                    </Typography>
                                    <Typography className="mb-3">
                                        Jenjang : <b>{selectedItem.jenjang}</b>
                                    </Typography>
                                    <Typography className="mb-3">
                                        Tanggal Usulan :
                                        <b className="ms-2">
                                            {dateFormatter(
                                                selectedItem.asesors[0]?.assesmentOfferingTime || "-"
                                            )}
                                        </b>
                                    </Typography>

                                    <Typography className="mb-2">
                                        Durasi Penawaran :
                                        <span style={{ color: "green" }} className="ms-2 ">
                                            {selectedItem.asesors[0]
                                                ?.assesmentOfferingExpiredInDays || "-"}
                                            Hari
                                        </span>
                                    </Typography>
                                    <Typography>
                                        Durasi Penilaian :{" "}
                                        <span style={{ color: "red" }} className="ms-2">
                                            {selectedItem.asesors[0]?.assesmentDurationInDays || "-"}{" "}
                                            Hari
                                        </span>
                                    </Typography>
                                </div>
                            )}
                            <div className="d-flex justify-content-center mt-3">
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        handleClose();
                                        handleKonfirmasi();
                                    }}
                                >
                                    Terima
                                </Button>
                                <Button
                                    sx={{ marginLeft: "10px" }}
                                    color="error"
                                    variant="contained"
                                    onClick={() => {
                                        handleClose();
                                        handleTolak();
                                    }}
                                >
                                    Tolak
                                </Button>
                            </div>
                        </Box>
                    </Box>
                </Modal>
            )}

            {/* modal penilaian lapangan */}
            {/* {selectedItemLapangan && (
                <Modal
                    open={openLapangan}
                    onClose={handleCloseLapangan}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <IconButton
                            sx={{ position: "absolute", top: 5, right: 5 }}
                            onClick={handleCloseLapangan}
                            aria-label="close"
                        >
                            <HighlightOffIcon color="error" />
                        </IconButton>
                        <Typography
                            sx={{
                                textAlign: "center",
                                fontSize: "19px",
                                fontWeight: "600",
                                marginTop: "28px",
                            }}
                        >
                            Konfirmasi Penawaran Penilaian Lapangan Usulan Prodi Baru
                        </Typography>
                        <Box sx={{ padding: 4 }}>
                            {selectedItemLapangan && (
                                <div key={selectedItemLapangan.id}>
                                    <Typography className="mb-3">
                                        Program Studi : <b>{selectedItemLapangan.namaProdi}</b>
                                    </Typography>
                                    <Typography className="mb-3">
                                        Lembaga : <b> {selectedItemLapangan.lembaga}</b>
                                    </Typography>
                                    <Typography className="mb-3">
                                        Jenjang : <b>{selectedItemLapangan.jenjang}</b>
                                    </Typography>
                                    <Typography className="mb-3">
                                        Tanggal Assign :
                                        <b className="ms-2">
                                            {dateFormatterLapangan(
                                                selectedItemLapangan.asesorALs[0]?.assesmentAssignedTime || "-"
                                            )}
                                        </b>
                                    </Typography>
                                    <Typography>
                                        Durasi Penilaian :{" "}
                                        <span style={{ color: "red" }} className="ms-2">
                                            {selectedItemLapangan.asesorALs[0]?.assesmentDurationInDays || "-"}{" "}
                                            Hari
                                        </span>
                                    </Typography>
                                </div>
                            )}
                            <div className="d-flex justify-content-center mt-3">
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        handleCloseLapangan();
                                        handleKonfirmasiLapangan();
                                    }}
                                >
                                    Terima
                                </Button>
                                <Button
                                    sx={{ marginLeft: "10px" }}
                                    color="error"
                                    variant="contained"
                                    onClick={() => {
                                        handleCloseLapangan();
                                        handleTolakLapangan();
                                    }}
                                >
                                    Tolak
                                </Button>
                            </div>
                        </Box>
                    </Box>
                </Modal>
            )} */}
        </>
    )
}

export default Penawaran