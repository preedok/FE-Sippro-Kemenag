import React, { useState, useEffect, useMemo } from "react";
import { TablePagination, Box, Chip, Autocomplete, Grid, TextField, Typography, Avatar, Tabs, Tab, Select, MenuItem, FormControl, InputLabel, InputAdornment, OutlinedInput, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from '@mui/material';

import { useTheme } from '@mui/material';
import api from '../../../service/api';
import CardContent from "../../../../components/card-content/ContentCard";
import HeroTitle from './../../../../components/hero-title/HeroTitle';
import { isAuth, getToken, getRole, getUserId } from "../../../../utils/token";
import SchoolIcon from '@mui/icons-material/School';
import { ClipLoader } from 'react-spinners';
import { motion } from 'framer-motion';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonIcon from '@mui/icons-material/Person';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SearchIcon from '@mui/icons-material/Search';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileAlt, faCheckCircle, faPaperPlane, faRedo, faBan,
  faHandshake, faUserCheck, faHourglassHalf, faMapMarkerAlt, faUndoAlt,
  faClock, faTimesCircle, faUniversity, faCertificate, faFileSignature,
  faFileUpload, faFileContract, faIdCard, faArrowCircleLeft, faClipboardCheck,
  faTasks, faBusinessTime, faLaptop, faCommentDots
} from '@fortawesome/free-solid-svg-icons';
import FunnelIcon from '../../../../components/icons/FunnelIcon';
import { useDarkMode } from "../../../../utils/DarkModeContext";
import ContentCard from "../../../../components/card-content/ContentCard";
import { styled } from '@mui/system';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import Button from "@mui/material/Button";
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import axios from "axios";
import DropdownAksi from "../../../../components/dropdown/DropdownAksi";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Bar } from 'react-chartjs-2';
import ProdiActionName from "../../../../utils/status";
import { getFullname } from "../../../../utils/token";
import LoadingComponent from "../../../../components/loader/loader1";
import { Chart as ChartJS, CategoryScale, ArcElement, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, ArcElement, LinearScale, BarElement, Title, Tooltip, Legend);

// const styles = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: '90%',
//   maxWidth: 1500,
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   borderRadius: "10px",
// };
const stylePopupCardBeranda = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: 2000,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '12px',
  p: 4,
};
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

const statusOrder = [0, 2, 10, 19, 3, 20, 21, 22, 23, 99, 24, 27, 28, 29, 26, 221, 222, 223, 226, 40, 41, 50, 299, 51, 521, 522, 523, 524, 525, 60];
const BerandaKasubdit = () => {
  // get penilaian asesor
  // const [page2, setPage2] = useState(0);
  // const [rowsPerPage2, setRowsPerPage2] = React.useState(5);
  // const handleChangePage2 = (event, newPage) => {
  //   setPage2(newPage);
  // };
  // const handleChangeRowsPerPage2 = (event) => {
  //   setRowsPerPage2(+event.target.value);
  //   setPage2(0);
  // };
  const { darkMode } = useDarkMode();
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
            cursor: 'pointer'
          }}
          onClick={() => handlePopupCardBeranda(status)}
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
  const StatCardUser = ({ icon, title, value, status, fullWidth }) => {
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
  const StatCardTotal = ({ icon, title, value, status, fullWidth }) => {
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
  const auth = isAuth();
  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  const [responseData, setResponseData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const token = getToken()
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
      setResponseData(response.data.programStudiStatusCounts);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const sortedResponseData = useMemo(() => {
    return [...responseData]
      .filter(item => item.status !== 52)
      .sort((a, b) => {
        return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
      });
  }, [responseData]);
  const totalUsulanProdi = responseData.reduce((total, item) => total + item.count, 0);
  const [userCount, setUserCount] = useState(0);
  const [assessorCount, setAssessorCount] = useState(0);
  const [assessorTasks, setAssessorTasks] = useState([]);
  const [adminCount, setAdminCount] = useState(0);
  const fetchUserCount = async () => {
    try {
      const token = getToken()
      const response = await api.get('/user/user', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      setUserCount(response.data.data.length);
    } catch (error) {
      console.error('Error fetching user count:', error);
    }
  };
  const fetchAssessorCount = async () => {
    try {
      const token = getToken()
      const response = await api.get('/user/asesor', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      setAssessorCount(response.data.data.length);
      console.log('Data fetched successfully:', response.data.data); // Debug log
      setAssessorTasks(response.data.data);
    } catch (error) {
      console.error('Error fetching assessor count:', error);
    }
  };
  const fetchAdminCount = async () => {
    try {
      const token = getToken()
      const response = await api.get('/user/admin', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      setAdminCount(response.data.data.length);
    } catch (error) {
      console.error('Error fetching admin count:', error);
    }
  };
  const [selectedYear, setSelectedYear] = useState('');
  const getYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const startYear = 2019;
    const years = Array.from({ length: currentYear - startYear + 1 }, (_, index) => currentYear - index);
    return [{ value: '', label: 'Pilih Tahun' }, ...years.map(year => ({ value: year.toString(), label: year.toString() }))];
  };
  useEffect(() => {
    fetchData();
    fetchUserCount();
    fetchAssessorCount();
    fetchAdminCount();
  }, [selectedYear]);
  const AssessorBarChart = ({ tasks }) => {
    const theme = useTheme();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMetrics, setSelectedMetrics] = useState([]);

    const metrics = [
      { key: 'listApprovedAsesor', label: 'Approved Assessors' },
      { key: 'listCreatedAsesor', label: 'Created Assessors' },
      { key: 'listDeletedAsesor', label: 'Deleted Assessors' },
      { key: 'listRejectedAsesor', label: 'Rejected Assessors' },
      { key: 'listApprovedUser', label: 'Approved Users' },
      { key: 'listRejectedUser', label: 'Rejected Users' },
      { key: 'listDeletedUser', label: 'Deleted Users' },
      { key: 'listProdiVerval', label: 'Prodi Verifications' },
      { key: 'listProdiAssessment', label: 'Prodi Assessments' },
      { key: 'listProdiBanPt', label: 'Prodi BAN-PT' },
      { key: 'listProdiSk', label: 'Prodi SK' },
      { key: 'listProdiSkDone', label: 'Prodi SK Done' },
    ];

    const formatData = (data) => {
      return data.map(assessor => ({
        name: assessor.fullName,
        ...metrics.reduce((acc, metric) => ({
          ...acc,
          [metric.key]: assessor.approvedBy?.[metric.key] || 0
        }), {})
      })).sort((a, b) => {
        const sumA = metrics.reduce((sum, metric) => sum + a[metric.key], 0);
        const sumB = metrics.reduce((sum, metric) => sum + b[metric.key], 0);
        return sumB - sumA;
      });
    };

    const formattedData = useMemo(() => formatData(tasks), [tasks]);

    const filteredData = useMemo(() => {
      return formattedData.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }, [formattedData, searchTerm]);

    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
      '#FF9FF3', '#54A0FF', '#5CD859', '#FF5E57', '#D2DAEA',
      '#FEA47F', '#25CCF7'
    ];

    const chartData = {
      labels: filteredData.map(item => item.name),
      datasets: (selectedMetrics.length > 0 ? selectedMetrics : metrics).map((metric, index) => ({
        label: metric.label,
        data: filteredData.map(item => item[metric.key]),
        backgroundColor: colors[index % colors.length],
        borderColor: 'rgba(255, 255, 255, 0.5)',
        borderWidth: 1,
      })),
    };

    const options = {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
        },
      },
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    };

    return (
      <div className="p-3" style={{ background: darkMode ? "#F5F7F8" : "", borderRadius: '10px' }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: darkMode ? "black" : "primary.main" }}>
          Rekapitulasi Penyelesaian Tugas Asesor
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>
              <div className="p-2 gap-2" style={{ backgroundColor: theme.palette.mode === 'dark' ? "#4793AF" : "", borderRadius: '4px' }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Pencarian Assessor"
                  value={searchTerm}
                  className="mb-2"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: <SearchIcon color="action" />,
                  }}
                />
                <Autocomplete
                  multiple
                  options={metrics}
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => <TextField {...params} variant="outlined" label="Select Status" />}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        variant="outlined"
                        label={option.label}
                        {...getTagProps({ index })}
                        key={option.key}
                      />
                    ))
                  }
                  onChange={(event, newValue) => {
                    setSelectedMetrics(newValue);
                  }}
                />
              </div>
              <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'flex-end' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <InfoOutlinedIcon color="action" sx={{ mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    Tips: Gunakan kotak pencarian untuk menemukan penilai tertentu dan pilih metrik untuk menyesuaikan diagram.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box sx={{ width: '100%', height: 600, overflowY: 'auto', color: theme.palette.mode === 'dark' ? "white" : "", backgroundColor: theme.palette.mode === 'dark' ? "#4793AF" : "", borderRadius: '4px' }}>
              {filteredData.length > 0 ? (
                <Bar data={chartData} options={options} />
              ) : (
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                  <Typography variant="body1" color="text.secondary">No data available</Typography>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </div>
    );
  };
  const PieChartComponent = ({ data }) => {
    const { darkMode } = useDarkMode();
    const theme = useTheme();

    const chartData = {
      labels: statusOrder.map(status => statusValues[status]?.text || 'Unknown'),
      datasets: [
        {
          data: statusOrder.map(status => {
            const item = data.find(d => d.status === status);
            return item ? item.count : 0;
          }),
          backgroundColor: statusOrder.map(status => getColorForStatus(status)),
          borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          borderWidth: 2,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            font: {
              size: 13,
              weight: 'bold',
            },
            color: darkMode ? 'white' : 'black',
            padding: 30,
          },
        },
        tooltip: {
          backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          titleColor: darkMode ? 'white' : 'black',
          bodyColor: darkMode ? 'white' : 'black',
          borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          borderWidth: 1,
          cornerRadius: 8,
          padding: 12,
          boxPadding: 5,
          usePointStyle: true,
        },
        datalabels: {
          color: darkMode ? 'white' : 'black',
          font: {
            weight: 'bold',
          },
          formatter: (value, context) => {
            return value;
          },
          anchor: 'end',
          align: 'start',
          offset: 10,
          borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
          borderWidth: 2,
          borderRadius: 4,
          backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          padding: {
            top: 6,
            bottom: 6,
            left: 10,
            right: 10,
          },
        },
      },
      cutout: '50%',
      elements: {
        arc: {
          borderWidth: 2,
          hoverOffset: 10,
          shadowOffsetX: 3,
          shadowOffsetY: 3,
          shadowBlur: 10,
          shadowColor: darkMode ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.2)',
        },
      },
    };

    return (
      <Box sx={{
        width: '100%',
        height: 700,
        mt: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: darkMode ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
        borderRadius: 4,
        padding: 3,
      }}>
        <Doughnut data={chartData} options={options} />
      </Box>
    );
  };
  const [selectedPenilaian, setSelectedPenilaian] = useState('card');
  const handlePenilaianChange = (penilaian) => {
    setSelectedPenilaian(penilaian);
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
    padding: '0px 8px',
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
  const PenilaianButtonGroup = ({ selectedPenilaian, handlePenilaianChange }) => {
    return (
      <StyledBox>
        <StyledButton
          onClick={() => handlePenilaianChange('card')}
          isSelected={selectedPenilaian === 'card'}
        >
          <IconWrapper>
            <span role="img" aria-label="Tampilan Card" style={{ fontSize: '22px' }}>📚</span>
          </IconWrapper>
          Tampilan Card
        </StyledButton>
        <StyledButton
          onClick={() => handlePenilaianChange('chart')}
          isSelected={selectedPenilaian === 'chart'}
        >
          <IconWrapper>
            <span role="img" aria-label="Tampilan Chart" style={{ fontSize: '22px' }}>📊</span>
          </IconWrapper>
          Tampilan Chart
        </StyledButton>
      </StyledBox>
    );
  };
  const [dataCardPopup, setDataCardPopup] = useState([])
  const [statusCard, setStatudCard] = useState('');
  const [openPopupCardBeranda, setOpenPopupCardBeranda] = useState(false)
  const [tableLoading, setTableLoading] = useState(false);
  const handleClodePopupCardBeranda = () => {
    setStatudCard('')
    setDataCardPopup([])
    setOpenPopupCardBeranda(false)
  }
  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", options);
  }
  const handlePopupCardBeranda = (status) => {
    setStatudCard(status);
    setOpenPopupCardBeranda(true);
  };
  const getUsulanProdi = async () => {
    const token = getToken()
    try {
      let statusData;
      switch (statusCard) {
        case 0:
        case 2:
        case 19:
          statusData = 'progress';
          break;
        case 10:
          statusData = 'verval';
          break;
        case 3:
        case 20:
        case 22:
        case 27:
        case 26:
        case 40:
          statusData = 'nilai';
          break;
        case 299:
        case 41:
          statusData = 'banpt';
          break;
        case 50:
        case 51:
        // case 40:
        // case 41:
        case 521:
        case 522:
        case 523:
        case 524:
        case 525:
        case 526:
        case 527:
        case 528:
        case 529:
          statusData = 'sk'
          break;
        case 60:
          statusData = 'terbit'
          break;
      }
      setTableLoading(true)
      const response = await api.get(`/prodi?status=${statusData}${selectedYear ? `&year=${selectedYear}` : ''}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const filteredData = response.data.data.filter((item) => item.Status == statusCard)
      setDataCardPopup(filteredData)
    } catch (error) {
      console.log(error.message)
    } finally {
      setTableLoading(false)
    }
  }
  useEffect(() => {
    getUsulanProdi()
  }, [statusCard])
  return (
    <>
      <HeroTitle
        title="Beranda"
        subtitle={`Selamat datang, ${getFullname()}`}
      />

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="d-flex">
          <button
            className="btn border-0 d-flex align-items-center justify-content-center"
            style={{
              boxShadow: "none",
              background: activeTab === 0
                ? (darkMode ? "#3C5B6F" : "#FFF")
                : (darkMode ? "transparent" : ""),
              borderRadius: "8px 8px 0px 0px",
              width: "320px",
              height: "48px",
              fontWeight: 500,
              fontSize: "15px",
              lineHeight: "23px",
              color: activeTab === 0
                ? (darkMode ? "white" : "#0F56B3")
                : (darkMode ? "white" : "#1C1C1C"),
              gap: "5px",
            }}
            onClick={() => setActiveTab(0)}
          >
            <span role="img" aria-label="Rekapitulasi Usulan Program Studi" style={{ marginRight: "5px", fontSize: "22px" }}>📋</span>
            Rekapitulasi Usulan Program Studi
          </button>
        </div>
        <ContentCard>
          <Box sx={{ flexGrow: 1, p: 4 }}>
            {activeTab == 0 ? (
              <>
                <div
                  className="ms-auto m-3 d-flex gap-4"
                >
                  <FormControl sx={{ width: '11%', color: darkMode ? "white" : "", backgroundColor: darkMode ? "#4793AF" : "", borderRadius: '4px' }} variant="outlined">
                    <Select
                      labelId="year-select-label"
                      id="year-select"
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      displayEmpty
                      renderValue={(selected) => {
                        if (selected === '') {
                          return <em>Pilih Tahun</em>;
                        }
                        return selected;
                      }}
                      input={<OutlinedInput
                        startAdornment={
                          <InputAdornment position="start">
                            <FunnelIcon />
                          </InputAdornment>
                        }
                      />}
                    >
                      {getYearOptions().map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <div className="ms-auto d-flex align-items-end">
                    <PenilaianButtonGroup
                      selectedPenilaian={selectedPenilaian}
                      handlePenilaianChange={handlePenilaianChange}
                      darkMode={darkMode}
                    />
                  </div>
                </div>

                {selectedPenilaian === "card" ? (
                  <>
                    <Grid container spacing={4} className="mt-4">
                      <Grid item xs={12}>
                        <Typography variant="h6" className="mb-3" gutterBottom sx={{ fontWeight: 'bold', color: darkMode ? "white" : "primary.main" }}>Data Rekapitulasi Usulan Program Studi</Typography>
                        <StatCardTotal
                          icon={<SchoolIcon fontSize="large" />}
                          title="Total Usulan Program Studi"
                          value={isLoading ? <ClipLoader size={24} /> : totalUsulanProdi}
                          fullWidth
                        />
                      </Grid>
                      {sortedResponseData.map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                          <StatCard
                            icon={getIconForStatus(item.status)}
                            title={statusValues[item.status]?.text || item.statusString}
                            value={isLoading ? <ClipLoader size={24} /> : item.count}
                            status={item.status}
                          />
                        </Grid>
                      ))}
                    </Grid>
                    <Typography variant="h6" className="mb-3 mt-5" gutterBottom sx={{ fontWeight: 'bold', color: darkMode ? "white" : "primary.main" }}>Data Total Pengguna</Typography>
                    <Grid container spacing={4}>
                      <Grid item xs={12} sm={6} md={4}>
                        <StatCardUser
                          icon={<PersonIcon fontSize="large" />}
                          title="Total Users"
                          value={isLoading ? <ClipLoader size={24} /> : userCount}
                          status={0}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6} md={4}>
                        <StatCardUser
                          icon={<AssessmentIcon fontSize="large" />}
                          title="Total Asessor"
                          value={isLoading ? <ClipLoader size={24} /> : assessorCount}
                          status={2}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6} md={4}>
                        <StatCardUser
                          icon={<AdminPanelSettingsIcon fontSize="large" />}
                          title="Total Admin"
                          value={isLoading ? <ClipLoader size={24} /> : adminCount}
                          status={10}
                        />
                      </Grid>
                    </Grid>
                  </>
                ) : (
                  <Grid container spacing={4}>
                    <Grid item xs={12} md={12}>
                      <PieChartComponent data={sortedResponseData} />
                    </Grid>
                  </Grid>
                )}
              </>
            ) : (
              <>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <AssessorBarChart tasks={assessorTasks} />
                  </Grid>
                </Grid>
              </>
            )}
          </Box>
        </ContentCard>
      </motion.div>
      <Modal
        open={openPopupCardBeranda}
        onClose={handleClodePopupCardBeranda}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={stylePopupCardBeranda}>
          <IconButton
            sx={{ position: "absolute", top: 5, right: 5 }}
            onClick={handleClodePopupCardBeranda}
            aria-label="close"
          >
            <HighlightOffIcon color="error" />
          </IconButton>
          <Paper
            sx={{
              width: "100%",
              overflow: "auto",
            }}
          >
            <TableContainer sx={{ maxHeight: 440, overflow: 'auto' }}>
              <Table stickyHeader aria-label="sticky table" sx={{ overflow: 'auto' }}>
                <TableHead>
                  <TableRow>
                    {/* Other column headers */}
                    <TableCell sx={{ backgroundColor: "#F9FAFC" }}>Nomor Registrasi</TableCell>
                    <TableCell sx={{ backgroundColor: "#F9FAFC" }}>Oleh</TableCell>
                    <TableCell sx={{ backgroundColor: "#F9FAFC" }}>Lembaga</TableCell>
                    <TableCell sx={{ backgroundColor: "#F9FAFC" }}>Program Studi</TableCell>
                    <TableCell sx={{ backgroundColor: "#F9FAFC" }}>Jenjang</TableCell>
                    <TableCell sx={{ backgroundColor: "#F9FAFC" }}>Status</TableCell>
                    <TableCell sx={{ backgroundColor: "#F9FAFC" }}>Tanggal</TableCell>
                    <TableCell sx={{ backgroundColor: "#F9FAFC" }}>Catatan</TableCell>
                    {/* <TableCell sx={{ backgroundColor: "#F9FAFC" }}>Aksi</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody id="riwayatTableBody">
                  {tableLoading ? (
                    <TableRow>
                      <TableCell colSpan={6}>
                        <LoadingComponent />
                      </TableCell>
                    </TableRow>
                  ) : (
                    dataCardPopup.map((action) => (
                      <TableRow key={action?.Id} hover>
                        <TableCell>{action.NoReg}</TableCell>

                        <TableCell>{action?.FullName || "-"}</TableCell>
                        <TableCell>{action?.NamaPerguruan || "-"}</TableCell>
                        <TableCell>{action?.NamaProdi || "-"}</TableCell>
                        <TableCell>{action?.JenjangStr || "-"}</TableCell>
                        <TableCell> <ProdiActionName status={action?.Status} assesmentCount={action?.AssesmentCount} /></TableCell>
                        <TableCell>{formatDate(action?.RequestTime || null)}</TableCell>
                        <TableCell>{action?.Notes || "-"}</TableCell>
                        {/* <TableCell><button
                          onClick={() => handleDetailClick(action?.Id)}
                        >
                          Detail Asesment
                        </button></TableCell> */}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </Modal>


      {/* <Modal
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
      </Modal> */}
    </>
  );
};

export default BerandaKasubdit;