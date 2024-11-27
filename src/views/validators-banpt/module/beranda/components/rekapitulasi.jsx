import React, { useState, useEffect, useMemo } from 'react'
import api from '../../../../service/api';
import { ClipLoader } from 'react-spinners';
import { motion } from 'framer-motion';
import SchoolIcon from '@mui/icons-material/School';
import { Box, Chip, Autocomplete, Grid, TextField, Typography, Paper, Avatar, Tabs, Tab, styled, Select, MenuItem, FormControl, InputLabel, InputAdornment, OutlinedInput } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFileAlt, faCheckCircle, faPaperPlane, faRedo, faBan,
    faHandshake, faUserCheck, faHourglassHalf, faMapMarkerAlt, faUndoAlt,
    faClock, faTimesCircle, faUniversity, faCertificate, faFileSignature,
    faFileUpload, faFileContract, faIdCard, faArrowCircleLeft, faClipboardCheck,
    faTasks, faBusinessTime, faLaptop, faCommentDots
} from '@fortawesome/free-solid-svg-icons';
import FunnelIcon from '../../../../../components/icons/FunnelIcon';
import { useDarkMode } from '../../../../../utils/DarkModeContext';
import ContentCard from '../../../../../components/card-content/ContentCard';
import { getRole, getToken  } from '../../../../../utils/token';
const statusValues = {
    0: { text: 'Dokumen Belum Lengkap'},
    1: { text: 'Dokumen Selesai'},
    2: { text: 'Dokumen Sudah Lengkap'},
    3: { text: 'Sudah Perbaikan'},
    9: { text: 'Permintaan Dibatalkan'},
    10: { text: 'Dokumen Usulan Lengkap' },
    20: { text: 'Penawaran Assessment' },
    21: { text: 'Assessment Kecukupan oleh Evaluator'},
    22: { text: 'Assessment Berlangsung'},
    23: { text: 'Assessment Evaluator Selesai'},
    24: { text: 'Lokasi Assessment Progress'},
    27: { text: 'Usulan di Kembalikan ke User'},
    28: { text: 'Assessment Kadaluarsa'},
    29: { text: 'Assessment Dibatalkan'},
    26: { text: 'Assessment selesai'},
    40: { text: 'Valid untuk Lembaga Akreditasi'},
    50: { text: 'Validasi Ban PT / LAM'},
    51: { text: 'Dalam Proses SK' },
    521: { text: 'KMA diunggah dan paraf 1'},
    522: { text: 'KMA diunggah dan paraf 2'},
    523: { text: 'KMA diunggah dan paraf 3'},
    524: { text: 'KMA diunggah dan paraf 4' },
    525: { text: 'KMA Final'},
    526: { text: 'KMA diunggah dan paraf 6' },
    527: { text: 'KMA diunggah dan paraf 7'},
    528: { text: 'KMA diunggah dan paraf 8'},
    529: { text: 'KMA diunggah dan paraf 9' },
    60: { text: 'Penerbitan Izin'},
    99: { text: 'di Kembalikan' },
    41: { text: 'Dalam validasi'},
    19: { text: 'Dokumen dikembalikan'},
    299: { text: 'Validasi BANPT/LAM dikembalikan' },
    221: { text: 'Penugasan Penilaian Lapangan' },
    222: { text: 'Penilaian Lapangan Sedang Berlangsung'},
    223: { text: 'Penilaian Lapangan Selesai'},
    226: { text: 'Semua Penilaian Lapangan Selesai'},
    227: { text: 'Penilaian Lapangan dikembalikan'},
};
const statusOrder = [0, 2, 10, 19, 3, 20, 21, 22, 23, 99, 24, 27, 28, 29, 26, 221, 222, 223, 226, 40, 41, 50, 299, 51, 521, 522, 523, 524, 60];
const Rekapitulasi = () => {
    const [responseData, setResponseData] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [selectedYear, setSelectedYear] = useState('Pilih Tahun');
    const totalUsulanProdi = responseData.reduce((total, item) => total + item.count, 0);
    const getYearOptions = () => {
        const currentYear = new Date().getFullYear();
        const startYear = 2019;
        const years = Array.from({ length: currentYear - startYear + 1 }, (_, index) => currentYear - index);
        return ['Pilih Tahun', ...years];
    };

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const token = getToken();
            let url = '/stats/status-counts';
            if (selectedYear !== 'Pilih Tahun') {
                url += `?year=${selectedYear}`;
            }
            const response = await api.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });
            setResponseData(response.data.asesorProgramStudiStatusCounts);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedYear]);

    
    const getIconForStatus = (status) => {
        switch (status) {
            case 0:
                return <FontAwesomeIcon icon={faFileAlt} size="1x" />;
            case 1:
                return <FontAwesomeIcon icon={faCheckCircle} size="1x" />;
            case 2:
                return <FontAwesomeIcon icon={faPaperPlane} size="1x" />;
            case 3:
                return <FontAwesomeIcon icon={faRedo} size="1x" />;
            case 9:
                return <FontAwesomeIcon icon={faBan} size="1x" />;
            case 10:
                return <FontAwesomeIcon icon={faFileAlt} size="1x" />;
            case 19:
                return <FontAwesomeIcon icon={faArrowCircleLeft} size="1x" />;
            case 20:
                return <FontAwesomeIcon icon={faHandshake} size="1x" />;
            case 21:
                return <FontAwesomeIcon icon={faUserCheck} size="1x" />;
            case 22:
                return <FontAwesomeIcon icon={faHourglassHalf} size="1x" />;
            case 23:
                return <FontAwesomeIcon icon={faCheckCircle} size="1x" />;
            case 24:
                return <FontAwesomeIcon icon={faMapMarkerAlt} size="1x" />;
            case 26:
                return <FontAwesomeIcon icon={faCheckCircle} size="1x" />;
            case 27:
                return <FontAwesomeIcon icon={faUndoAlt} size="1x" />;
            case 28:
                return <FontAwesomeIcon icon={faClock} size="1x" />;
            case 29:
                return <FontAwesomeIcon icon={faTimesCircle} size="1x" />;
            case 40:
                return <FontAwesomeIcon icon={faUniversity} size="1x" />;
            case 41:
                return <FontAwesomeIcon icon={faClipboardCheck} size="1x" />;
            case 50:
                return <FontAwesomeIcon icon={faCertificate} size="1x" />;
            case 51:
                return <FontAwesomeIcon icon={faFileSignature} size="1x" />;
            case 521:
            case 522:
            case 523:
            case 524:
            case 526:
            case 527:
            case 528:
            case 529:
                return <FontAwesomeIcon icon={faFileUpload} size="1x" />;
            case 525:
                return <FontAwesomeIcon icon={faFileContract} size="1x" />;
            case 60:
                return <FontAwesomeIcon icon={faIdCard} size="1x" />;
            case 99:
            case 299:
                return <FontAwesomeIcon icon={faArrowCircleLeft} size="1x" />;
            case 221:
                return <FontAwesomeIcon icon={faTasks} size="1x" />;
            case 222:
                return <FontAwesomeIcon icon={faBusinessTime} size="1x" />;
            case 223:
                return <FontAwesomeIcon icon={faCheckCircle} size="1x" />;
            case 226:
                return <FontAwesomeIcon icon={faLaptop} size="1x" />;
            default:
                return <FontAwesomeIcon icon={faCommentDots} size="1x" />;
        }
    };
    const getColorForStatus = (status) => {
        switch (status) {
            case 0: return '#FFA500';
            case 1: return '#4CAF50';
            case 2: return '#719FB0';
            case 3: return '#52057B';
            case 9: return '#FFFF00';
            case 10: return '#008080';
            case 19: return '#FF0000';
            case 20: return '#FFA500';
            case 21: return '#4CAF50';
            case 22: return '#687EFF';
            case 23: return '#4CAF50';
            case 24: return '#FFA500';
            case 26: return '#4CAF50';
            case 27: return '#952323';
            case 28: return '#800080';
            case 29: return '#FFFF00';
            case 40: return '#008080';
            case 41: return '#FFA500';
            case 50: return '#4CAF50';
            case 51: return '#219C90';
            case 60: return '#4CAF50';
            case 99: return '#FF0000';
            case 221: return '#FFA500';
            case 222: return '#A52A2A';
            case 223: return '#4CAF50';
            case 226: return '#0000FF';
            case 299: return '#FF0000';
            case 521:
            case 522:
            case 523:
            case 524:
            case 525:
            case 526:
            case 527:
            case 528:
            case 529:
                return '#91DDCF';
            default: return '#95a5a6';
        }
    };
    const StatCard = ({ icon, title, value, status, fullWidth }) => {
        const color = getColorForStatus(status);
        return (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Paper
                    elevation={3}
                    sx={{
                        p: 3,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        borderLeft: `6px solid ${color}`,
                        borderRadius: '12px',
                        background: darkMode ? "#10439F" : "linear-gradient(145deg, #ffffff, #f0f0f0)",
                        boxShadow: `0 4px 20px 0 rgba(0,0,0,0.1)`,
                        transition: 'all 0.3s',
                        overflow: 'hidden',
                        position: 'relative',
                        ...(fullWidth && { gridColumn: '1 / -1' }),
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Avatar sx={{ bgcolor: color, width: 36, height: 36 }}>
                            {icon}
                        </Avatar>
                        <Typography
                            variant="h2"
                            sx={{
                                fontWeight: 'bold',
                                color: darkMode ? "white" : "text.secondary",
                                fontSize: '0.9rem',
                                maxWidth: '120%',
                                textAlign: 'right'
                            }}
                        >
                            {title}
                        </Typography>
                    </Box>
                    <Typography
                        component="h2"
                        variant="h4"
                        sx={{
                            fontWeight: 'bold',
                            color: darkMode ? "white" : "text.primary",
                            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                        }}
                    >
                        {value}
                    </Typography>
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            width: '30%',
                            height: '30%',
                            bgcolor: color,
                            opacity: 0.1,
                            borderTopLeftRadius: '100%'
                        }}
                    />
                </Paper>
            </motion.div>
        );
    };
    const sortedResponseData = useMemo(() => {
        return [...responseData].sort((a, b) => {
            return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
        });
    }, [responseData]);
    const {darkMode} = useDarkMode()
    return (
        <Box sx={{ flexGrow: 1, p: 2 }}>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: darkMode? "white": "primary.main" }}>
                            Data Rekapitulasi Penawaran Penilai Usulan Prodi Baru
                        </Typography>
                        <Box>
                            <FormControl sx={{ width: '83%', ml: 4, backgroundColor: darkMode ? "#4793AF" : "", borderRadius: '4px' }} variant="outlined">
                                <Select
                                    labelId="year-select-label"
                                    id="year-select"
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                    label="Pilih Tahun"
                                    input={<OutlinedInput
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <FunnelIcon />
                                            </InputAdornment>
                                        }
                                    />}
                                >
                                    {getYearOptions().map((year) => (
                                        <MenuItem key={year} value={year}>{year}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <StatCard
                        icon={<SchoolIcon fontSize="large" />}
                        title="Total Usulan Program Studi"
                        value={isLoading ? <ClipLoader size={24} /> : totalUsulanProdi}
                        fullWidth
                    />
                </Grid>

                {sortedResponseData.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <StatCard
                            icon={getIconForStatus(item.status)}
                            title={statusValues[item.status]?.text || item.statusString}
                            value={isLoading ? <ClipLoader size={24} /> : item.count}
                            status={item.status}
                            fullWidth
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}


export default Rekapitulasi;