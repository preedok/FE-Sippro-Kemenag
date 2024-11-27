import React, { useState, useEffect } from "react";
import "../../../../views/ptki/admin.css";
import ContentContainer from "../../../../components/card-container/ContentContainer";
import ContentCard from "../../../../components/card-content/ContentCard";
import Popover from "@mui/material/Popover";
import ProdiAction from '../../../../utils/status'
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import FormUpdateSarjana from "./ak/sarjana/form-penilaian-sarjana/edit/editPenilaianAssesor";
import FormUpdateMagister from "./ak/magister/form-penilaian-magister/edit/editPenilaianAssesor";
import FormUpdateDoctor from "./ak/doktor/form-penilaian-doctor/edit/editPenilaianAssesor";
import FormUpdateProfesi from './ak/profesi/form-penilaian-profesi/edit/editPenilaianAssesor'
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { Helmet } from "react-helmet";
import { getToken, isAuth, getUserId, getRole } from "../../../../utils/token";
import api from "../../../service/api";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PenawaranStatusName from "../../../../utils/penawaranStatusName";
import LoadingComponent from '../../../../components/loader/loader'
import HeroTitle from "../../../../components/hero-title/HeroTitle";
import ReplayIcon from '@mui/icons-material/Replay';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import GetAppIcon from '@mui/icons-material/GetApp';
import DownloadIcon from '@mui/icons-material/Download';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DropdownAksi from "../../../../components/dropdown/DropdownAksi";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import FunnelIcon from "../../../../components/icons/FunnelIcon";
import Swal from "sweetalert2";
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from "axios";
import ProdiActionName from "../../../../utils/status";
import { saveAs } from 'file-saver';
import { ClipLoader } from "react-spinners";
import { GetApiBaseUrl } from "../../../../utils/env";
import { motion } from 'framer-motion';
import { useDarkMode } from "../../../../utils/DarkModeContext";
const CardPenilaian = () => {
  const [view, setView] = useState(null);
  const auth = isAuth()
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
  const navigate = useNavigate();
  const baseUrl = GetApiBaseUrl();
  useEffect(() => {
    const storedViewIndex = localStorage.getItem("selectedViewIndex");
    if (storedViewIndex) {
      setView(parseInt(storedViewIndex));
    }
  }, []);
  const [anchorEl, setAnchorEl] = useState(null);
  const [year, setYear] = useState('');
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
  ////////////////////////////////////////////////////////////////
  const getDetailRiwayat = async (id) => {
    try {
      const response = await api.get(`prodi-assesment/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      setDetailRiwayat(response.data.data[0].asesors)

    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `${error.message}`
      });
    }
  }
  const [detailRiwayat, setDetailRiwayat] = useState([])
  const token = getToken();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);
  const handleOpen = (id) => {
    getDetailRiwayat(id)
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const getData = async () => {
    setLoading(true)
    setTimeout(async () => {
      try {
        const response = await api.get("/prodi-assesment", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.data && response.data.data.length > 0) {
          const filteredArray = response.data.data.filter(item => item.asesors.some(asesor => asesor.asesorId === + getUserId()));
          if (!year) {
            setData(filteredArray);
          } else {
            const filteredRows = filteredArray.filter((row) => {
              const noRegYear = row.nomorRegistrasi.split('/')[1];
              return noRegYear == year;
            });
            setData(filteredRows);
          }
          setLoading(false)
        } 
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `${error.message}`
        });
      } finally {
        setLoading(false)
      }
    }, 1000);

  };
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
  useEffect(() => {
    getData();
  }, [year]);

  const formatStatus = (status) => {
    if (status === PenawaranStatusName.Requested) {
      return (
        <p
          style={{
            backgroundColor: "orange",
            padding: "4px 10px",
            borderRadius: "5px",
            color: "white",
            width: "80%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "10px",
          }}
          className="mt-3"
        >
          Menunggu Konfirmasi
          <AccessAlarmsIcon style={{ color: "white", marginLeft: "auto" }} />
        </p>
      );
    } else if (status === PenawaranStatusName.AssesmentOfferAccepted) {
      return (
        <p
          style={{
            backgroundColor: "green",
            padding: "4px 10px",
            borderRadius: "5px",
            color: "white",
            width: "80%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "10px",
          }}
          className="mt-3 me-2"
        >
          Asesmen Kecukupan oleh Asesor
          <CheckCircleIcon style={{ color: "white", marginLeft: "auto" }} />
        </p>
      );
    } else if (status === PenawaranStatusName.Rejected) {
      return (
        <p
          style={{
            backgroundColor: "rgb(213, 16, 16)",
            padding: "4px 10px",
            borderRadius: "5px",
            color: "white",
            width: "80%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "10px",
          }}
          className="mt-3 me-5"
        >
          Konfirmasi di Tolak
          <CancelIcon style={{ color: "white", marginLeft: "auto" }} />
        </p>
      );
    } else if (status === PenawaranStatusName.ValBANPTLAMRejected) {
      return (
        <p
          style={{
            backgroundColor: "rgb(213, 16, 16)",
            padding: "4px 10px",
            borderRadius: "5px",
            color: "white",
            width: "80%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "10px",
          }}
          className="mt-3 me-5"
        >
          Validasi BANPT/LAM Dikembalikan
          <CancelIcon style={{ color: "white", marginLeft: "auto" }} />
        </p>
      );
    } else if (status === PenawaranStatusName.AssesmentBackToUser) {
      return (
        <p
          style={{
            backgroundColor: "rgb(213, 16, 16)",
            padding: "4px 10px",
            borderRadius: "5px",
            color: "white",
            width: "80%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "10px",
          }}
          className="mt-3 me-5"
        >
          Usulan di Kembalikan ke User
          <ReplayIcon style={{ color: "white", marginLeft: "auto" }} />
        </p>
      );
    } else if (status === PenawaranStatusName.AssesmentCompleted) {
      return (
        <p
          style={{
            backgroundColor: "green",
            padding: "4px 10px",
            borderRadius: "5px",
            color: "white",
            width: "80%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "10px",
          }}
          className="mt-3 me-5"
        >
          Asesmen Selesai
          <LibraryAddCheckIcon style={{ color: "white", marginLeft: "auto" }} />
        </p>
      );
    } else if (status === PenawaranStatusName.AssesmentExpired) {
      return (
        <p
          style={{
            backgroundColor: "rgb(213, 16, 16)",
            padding: "4px 10px",
            borderRadius: "5px",
            color: "white",
            width: "80%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "10px",
          }}
          className="mt-3 me-5"
        >
          Asesmen Kadaluarsa
          <AccessAlarmsIcon style={{ color: "white", marginLeft: "auto" }} />
        </p>
      );
    }
  };
  const dateFormatter = (dateStr) => {
    if (!dateStr) return "-";

    const options = { day: "numeric", month: "long", year: "numeric" };
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("id-ID", options).format(date);
  };
  const columns = [
    { id: "no", label: "#", flex: 1 },
    { id: "noregProdi", label: "Nomor Registrasi & Program Studi", flex: 3 },
    {
      id: "lembagaJenjang",
      label: "Lembaga & Jenjang",
      flex: 3,
      align: "left",
    },
    {
      id: "tanggalKonfirmasi",
      label: "Tanggal Usulan",
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
      id: "masaPenilaian",
      label: "Durasi Penilaian",
      flex: 1,
      align: "left",
    },
    {
      id: "penilaianAsesor",
      label: "Penilaian Dari Evaluator",
      flex: 1,
      align: "left",
    },
    {
      id: "action",
      label: "",
      flex: 1,
      align: "left",
    },
  ];
  const [fileUrl1, setFileUrl1] = useState(null);

  const handleDownloadFilePenilaian = async (programStudiId) => {
    const asesorId = getUserId();
    try {
      const response = await api.get(`/prodi-assesment/form-ak-file/${asesorId}/${programStudiId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      });
      console.log('response>>', response);

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
        const contentDisposition = response.headers['content-disposition'];
        let filename = 'prodi.xlsx'; // default filename

        if (contentDisposition) {
          const filenameMatch = contentDisposition.match(/filename=(.*)/);
          if (filenameMatch && filenameMatch[1]) {
            filename = filenameMatch[1].replace(/['"]/g, '').trim();
          }
        }

        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = filename;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

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
  const handleDownloadFilePenilaianAllAsesment = async (asesorId, programStudiId) => {
    try {
      const response = await api.get(`/prodi-assesment/form-ak-file/${asesorId}/${programStudiId}`, {
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
        setDetailModalOpen(false)
      } else if (error.response && error.response.status === 403) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          showConfirmButton: true,
          text: `Error: Insufficient permissions`,

        });
        setDetailModalOpen(false)
      } else {
        // Handle other types of errors
        setDetailModalOpen(false)
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `${error.message}`
        });
      }
    }
  };

  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const handleCloseDetailModalOpen = () => setDetailModalOpen(false);
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
  const [detailData, setDetailData] = useState([]);
  const columns1 = [
    { id: "no", label: "No.", minWidth: 0, flex: 1 },
    {
      id: "namaAsesor",
      label: "Nama Evaluator",
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
  function createData1(
    no,
    namaAsesor,
    email,
    status,
    durasipenawaran,
    selesaipenawaran,
    penilaianlapangan,
    catatan,
    action,
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
  const handleViewChangeAsesment = (index, id) => {
    const openNewTab = (url) => {
      const newTab = window.open();
      newTab.opener = null;
      newTab.location.href = url;
    };

    switch (index) {
      case 0:
        openNewTab(`validator-banpt/sarjana/edit/${id}`);
        break;
      case 1:
        openNewTab(`validator-banpt/magister/edit/${id}`);
        break;
      case 2:
        openNewTab(`validator-banpt/doktor/edit/${id}`);
        break;
      case 3:
        openNewTab(`validator-banpt/profesi/edit/${id}`);
        break;
      default:
        break;
    }
  };
  const [page2, setPage2] = useState(0);
  const [rowsPerPage2, setRowsPerPage2] = React.useState(5);
  const handleChangePage2 = (event, newPage) => {
    setPage2(newPage);
  };
  const handleChangeRowsPerPage2 = (event) => {
    setRowsPerPage2(+event.target.value);
    setPage2(0);
  };
  const [isLoading, setIsLoading] = useState(false)
  const rows11 = detailData.flatMap((asesor) => {
    return asesor.asesors.map((innerAsesor, innerIndex) => {
      let assignmentButton;
      console.log('button', asesor.jenjang)
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
                      handleDownloadFilePenilaianAllAsesment(
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
                    handleViewChangeAsesment(
                      2,
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
                      handleDownloadFilePenilaianAllAsesment(
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
                    handleViewChangeAsesment(
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
                      handleDownloadFilePenilaianAllAsesment(
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
                    handleViewChangeAsesment(
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
                      handleDownloadFilePenilaianAllAsesment(
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
                    handleViewChangeAsesment(
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
                      handleDownloadFilePenilaianAllAsesment(
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
                    handleViewChangeAsesment(
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

      return createData1(
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

  const rows = data
    .filter((item) => {
      // const status = item.asesors?.[0]?.status;
      const filter = item.asesors.filter((asesor) => asesor.asesorId === + getUserId());
      const status = filter[0].status
      return status !== PenawaranStatusName.Rejected && status !== PenawaranStatusName.AssesmentOffering;
    })
    .map((item, index) => {
      const jenjang = item.jenjang;
      // const status = item.asesors?.[0]?.status;
      const filter = item.asesors.filter((asesor) => asesor.asesorId === + getUserId());
      const status = filter[0].status
      const totalNilai = filter[0]?.totalNilai;
      const assignmentButton =
        status === PenawaranStatusName.AssesmentBackToUser || status === PenawaranStatusName.Rejected ? "" : (
          <DropdownAksi
            itemComponent={
              <>
                <MenuItem
                  onClick={() =>
                    handleViewChange(getViewChangeArg(jenjang), item.id)
                  }
                >
                  Validasi Usulan
                </MenuItem>

                <MenuItem
                  onClick={() => handleOpen(item.id)}
                >
                  Riwayat
                </MenuItem>


                <MenuItem
                  onClick={() => handleDetailClick(item.id)}
                >
                  Detail Asesment AK dan AL
                </MenuItem>
              </>
            }
          />
        );

      const nilaiSection =
        totalNilai !== undefined ? (
          <div style={{ display: status === 27 ? "none" : "block" }}>
            <p
              className="mt-3 fw-bold"
              style={{ display: status === 27 ? "none" : "block" }}
            >
              Nilai :{" "}
              <span style={{ color: "green" }}>
                {totalNilai === null ? "-" : totalNilai}
              </span>
            </p>
            <a
              href={fileUrl1}
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              <Button
                variant="contained"
                size="small"
                onClick={() =>
                  handleDownloadFilePenilaian(
                    item.id,
                    item.programStudiId
                  )
                }
              >
                <DownloadIcon />
              </Button>
            </a>
          </div>
        ) : '-';
      const asesor = filter[0];
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
      const lembagaJenjang = `${item.lembaga} (${jenjang})`
      return createData(
        index + 1,
        noregProdi,
        lembagaJenjang,
        dateFormatter(filter[0]?.assesmentOfferingTime) || "-",
        <>
          <ProdiActionName status={status} />
        </>,
        status === PenawaranStatusName.AssesmentOfferAccepted ? (
          filter[0]?.assesmentDurationInDays !== 0 ? (
            <p
              style={{
                color: "red",
                fontStyle: "italic",
                textAlign: "center",
              }}
              className="mt-3"
            >
              {filter[0]?.assesmentDurationInDays || "-"} Hari
            </p>
          ) : (
            <p style={{ color: "red", fontStyle: "italic", textAlign: "center" }}>
              belum Berlaku
            </p>
          )
        ) : null,
        <>{nilaiSection}</>,
        <>{assignmentButton}</>
      );
    });

  const handleViewChange = (index, programStudiId) => {
    localStorage.setItem("selectedViewIndex", index);
    localStorage.setItem("programStudiId", programStudiId);
    setView(index);
    switch (index) {
      case 1:
        navigate("validasi/validator-banpt/sarjana/edit/:id");
        break;
      case 4:
        navigate("validasi/validator-banpt/magister/edit/:id");
        break;
      case 7:
        navigate("validasi/validator-banpt/doktor/edit/:id");
        break;
      case 10:
        navigate("validasi/validator-banpt/profesi/edit/:id");
        break;
      default:
        break;
    }
  };
  const getViewChangeArg = (jenjang) => {
    switch (jenjang) {
      case "Doktor":
        return 7;
      case "Profesi":
        return 10;
      case "Sarjana":
        return 1;
      case "Diploma IV/Sarjana Terapan":
        return 1;
      case "Magister":
        return 4;
      default:
        return 0;
    }
  };

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", options);
  }

  function createData(
    no,
    noregProdi,
    lembagaJenjang,
    tanggalKonfirmasi,
    dokumenStatus,
    masaPenilaian,
    penilaianAsesor,
    action
  ) {
    return {
      no,
      noregProdi,
      lembagaJenjang,
      tanggalKonfirmasi,
      dokumenStatus,
      masaPenilaian,
      penilaianAsesor,
      action,
    };
  }

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Helmet>
        <title>Kemenag | Penilaian </title>
      </Helmet>
      <HeroTitle
        title="Penilaian Kecukupan Usulan Prodi"
      />

      <div className="row">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >

          {view !== null && window.location.pathname !== "/asesor" ? (
            <ContentCard>

              {view === 1 ? <FormUpdateSarjana /> : null}

              {view === 4 ? <FormUpdateMagister /> : null}

              {view === 7 ? <FormUpdateDoctor /> : null}

              {view === 10 ? <FormUpdateProfesi /> : null}

            </ContentCard>
          ) : (
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
                  color: darkMode ? "white" : "#717171", borderRadius: '4px'
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
            <div className="col-12 px-3  py-2">
              <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow style={{
                        backgroundColor: darkMode ? "#40679E" : "",
                        color: darkMode ? "white" : "",
                      }}>
                        {columns.map((column, index) => (
                          <TableCell
                            key={index}
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
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((row, index) => {
                            return (
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
                                  const targetDate = new Date(row.tanggalKonfirmasi);
                                  const today = new Date();
                                  const threeDaysAgo = new Date(today);
                                  threeDaysAgo.setDate(today.getDate() - 3);

                                  const shouldDisplay = value === 'noregProdi' && targetDate <= today && targetDate >= threeDaysAgo;
                                  return (
                                    <TableCell
                                      key={column.id}
                                      align={column.align}
                                      style={{ color: darkMode ? "white" : "", }}
                                    >
                                      {column.format &&
                                        typeof value === "number"
                                        ? column.format(value)
                                        : value}
                                      {shouldDisplay && (
                                        <span className="ms-1" style={{ backgroundColor: 'green', width: '50px', height: '20px', color: 'white', paddingLeft: '5px', paddingRight: '5px', borderRadius: '3px' }}>Baru</span>
                                      )}
                                    </TableCell>
                                  );
                                })}
                              </TableRow>
                            );
                          })
                      )}

                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[2, 5, 10, 25, 100]}
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
          </ContentCard>
          )}
          
        </motion.div>


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
            <Box sx={{ padding: 2 }}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                style={{ color: darkMode ? "white" : "" }}
              >
                Riwayat Penilaian
              </Typography>
              <Paper
                sx={{
                  width: "100%",
                  overflow: "hidden",
                }}
              >
                <TableContainer>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead >
                      <TableRow style={{
                        backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                        border: "none",
                        color: darkMode ? "white" : "",
                      }} >
                        <TableCell style={{
                          backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                          border: "none",
                          color: darkMode ? "white" : "",
                        }}>No</TableCell>
                        <TableCell style={{
                          backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                          border: "none",
                          color: darkMode ? "white" : "",
                        }}>Nama Asesor</TableCell>
                        <TableCell style={{
                          backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                          border: "none",
                          color: darkMode ? "white" : "",
                        }}>Email</TableCell>
                        <TableCell style={{
                          backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                          border: "none",
                          color: darkMode ? "white" : "",
                        }}>Durasi Penawaran</TableCell>
                        <TableCell style={{
                          backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                          border: "none",
                          color: darkMode ? "white" : "",
                        }}>Total Nilai</TableCell>
                        <TableCell style={{
                          backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                          border: "none",
                          color: darkMode ? "white" : "",
                        }}>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {detailRiwayat.map((detail, index) => (
                        <TableRow style={{
                          backgroundColor: darkMode ? "#40679E" : "",
                          color: darkMode ? "white" : "",
                        }} hover key={index}>
                          <TableCell style={{ color: darkMode ? "white" : "", }} >{index + 1}</TableCell>
                          <TableCell style={{ color: darkMode ? "white" : "", }}>{detail.asesorFullName}</TableCell>
                          <TableCell style={{ color: darkMode ? "white" : "", }}>{detail.asesorEmail}</TableCell>
                          <TableCell style={{ color: darkMode ? "white" : "", }}>{formatDate(detail.assesmentOfferingTime)}</TableCell>
                          <TableCell style={{ color: darkMode ? "white" : "", }}>{detail.totalNilai}</TableCell>
                          <TableCell style={{ color: darkMode ? "white" : "", }}><ProdiAction status={detail.status} /></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Box>
          </Box>
        </Modal>

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
              <Typography style={{ color: darkMode ? "white" : "", }} id="modal-modal-title" variant="h6" component="h2">
                Riwayat Asesment Form Penilaian Evaluator
              </Typography>
              <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow style={{
                        backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                        border: "none",
                        color: darkMode ? "white" : "",
                      }}>
                        {columns1.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{
                              backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                              border: "none",
                              color: darkMode ? "white" : "",
                              width: 'auto'
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
      </div>
    </>
  );
};

export default CardPenilaian;
