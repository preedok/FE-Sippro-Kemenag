import React, { useState, useEffect, useCallback, useRef } from "react";
import user from "../../assets/avatarplaceholder.jpg";
import "./navbar.css";
import "../../views/ptki/admin.css";
import { useNavigate } from "react-router";
import { Navbar, Dropdown, DropdownButton } from "react-bootstrap";
import { clearAuth } from "../../utils/token";
import moment from "moment";
import { Autocomplete, useMediaQuery } from "@mui/material";
import Button from "@mui/material/Button";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import logo from "../../assets/blur_on.png";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import api from "../../views/service/api";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import CreateIcon from "@mui/icons-material/Create";
import Swal from "sweetalert2";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Badge from "react-bootstrap/Badge";
import { getToken, getRole } from "../../utils/token";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import IconButton from "@mui/material/IconButton";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useDropzone } from "react-dropzone";
import avatar from "../../assets/avatarplaceholder.jpg";
import SearchIcon from "../icons/SearchIcon";
import BellIcon from "../icons/BellIcon";
import WaveIcon from "../icons/WaveIcon";
import CheckCircleIcon from "../icons/CheckCircleIcon";
import pusaka from '../../assets/pusak.svg'
import kemenag from '../../assets/logo.svg'
import { ClipLoader } from "react-spinners";
import NightsStayIcon from '@mui/icons-material/NightsStay';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { useDarkMode } from '../../utils/DarkModeContext';
import { color } from "framer-motion";
import styled from '../../views/home/style.module.css'
const listBank = [
  "BANK BRI",
  "BANK EKSPOR INDONESIA",
  "BANK MANDIRI",
  "BANK BNI",
  "BANK BNI SYARIAH",
  "BANK DANAMON",
  "PERMATA BANK",
  "BANK BCA",
  "BANK BII",
  "BANK PANIN",
  "BANK ARTA NIAGA KENCANA",
  "BANK NIAGA",
  "BANK BUANA IND",
  "BANK LIPPO",
  "BANK NISP",
  "AMERICAN EXPRESS BANK LTD",
  "CITIBANK N.A.",
  "JP. MORGAN CHASE BANK, N.A.",
  "BANK OF AMERICA, N.A",
  "ING INDONESIA BANK",
  "BANK MULTICOR TBK.",
  "BANK ARTHA GRAHA",
  "BANK CREDIT AGRICOLE INDOSUEZ",
  "THE BANGKOK BANK COMP. LTD",
  "THE HONGKONG & SHANGHAI B.C.",
  "THE BANK OF TOKYO MITSUBISHI UFJ LTD",
  "BANK SUMITOMO MITSUI INDONESIA",
  "BANK DBS INDONESIA",
  "BANK RESONA PERDANIA",
  "BANK MIZUHO INDONESIA",
  "STANDARD CHARTERED BANK",
  "BANK ABN AMRO",
  "BANK KEPPEL TATLEE BUANA",
  "BANK CAPITAL INDONESIA, TBK.",
  "BANK BNP PARIBAS INDONESIA",
  "BANK UOB INDONESIA",
  "KOREA EXCHANGE BANK DANAMON",
  "RABOBANK INTERNASIONAL INDONESIA",
  "ANZ PANIN BANK",
  "DEUTSCHE BANK AG.",
  "BANK WOORI INDONESIA",
  "BANK OF CHINA LIMITED",
  "BANK BUMI ARTA",
  "BANK EKONOMI",
  "BANK ANTARDAERAH",
  "BANK HAGA",
  "BANK IFI",
  "BANK CENTURY, TBK.",
  "BANK MAYAPADA",
  "BANK JABAR",
  "BANK DKI",
  "BPD DIY",
  "BANK JATENG",
  "BANK JATIM",
  "BPD JAMBI",
  "BPD ACEH",
  "BANK SUMUT",
  "BANK NAGARI",
  "BANK RIAU",
  "BANK SUMSEL",
  "BANK LAMPUNG",
  "BPD KALSEL",
  "BPD KALIMANTAN BARAT",
  "BPD KALTIM",
  "BPD KALTENG",
  "BPD SULSEL",
  "BANK SULUT",
  "BPD NTB",
  "BPD BALI",
  "BANK NTT",
  "BANK MALUKU",
  "BPD PAPUA",
  "BANK BENGKULU",
  "BPD SULAWESI TENGAH",
  "BANK SULTRA",
  "BANK NUSANTARA PARAHYANGAN",
  "BANK SWADESI",
  "BANK MUAMALAT",
  "BANK MESTIKA",
  "BANK METRO EXPRESS",
  "BANK SHINTA INDONESIA",
  "BANK MASPION",
  "BANK HAGAKITA",
  "BANK GANESHA",
  "BANK WINDU KENTJANA",
  "HALIM INDONESIA BANK",
  "BANK HARMONI INTERNATIONAL",
  "BANK KESAWAN",
  "BANK TABUNGAN NEGARA (PERSERO)",
  "BANK HIMPUNAN SAUDARA 1906, TBK .",
  "BANK TABUNGAN PENSIUNAN NASIONAL",
  "BANK SWAGUNA",
  "BANK JASA ARTA",
  "BANK MEGA",
  "BANK JASA JAKARTA",
  "BANK BUKOPIN",
  "BANK SYARIAH MANDIRI",
  "BANK BISNIS INTERNASIONAL",
  "BANK SRI PARTHA",
  "BANK BINTANG MANUNGGAL",
  "BANK BUMIPUTERA",
  "BANK YUDHA BHAKTI",
  "BANK MITRANIAGA",
  "BANK AGRO NIAGA",
  "BANK INDOMONEX",
  "BANK ROYAL INDONESIA",
  "BANK ALFINDO",
  "BANK SYARIAH MEGA",
  "BANK INA PERDANA",
  "BANK HARFA",
  "PRIMA MASTER BANK",
  "BANK PERSYARIKATAN INDONESIA",
  "BANK AKITA",
  "LIMAN INTERNATIONAL BANK",
  "ANGLOMAS INTERNASIONAL BANK",
  "BANK DIPO INTERNATIONAL",
  "BANK KESEJAHTERAAN EKONOMI",
  "BANK UIB",
  "BANK ARTOS IND",
  "BANK PURBA DANARTA",
  "BANK MULTI ARTA SENTOSA",
  "BANK MAYORA",
  "BANK INDEX SELINDO",
  "BANK VICTORIA INTERNATIONAL",
  "BANK EKSEKUTIF",
  "CENTRATAMA NASIONAL BANK",
  "BANK FAMA INTERNASIONAL",
  "BANK SINAR HARAPAN BALI",
  "BANK HARDA",
  "BANK FINCONESIA",
  "BANK MERINCORP",
  "BANK MAYBANK INDOCORP",
  "BANK OCBC – INDONESIA",
  "BANK CHINA TRUST INDONESIA",
  "BANK COMMONWEALTH",
  "BANK BJB SYARIAH",
  "BPR KS (KARYAJATNIKA SEDAYA)",
  "INDOSAT DOMPETKU",
  "TELKOMSEL TCASH",
  "LINKAJA",
];
const Index = ({ burgerMenu, notification, handleToggle }) => {
  // Logout
  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", options);
  }
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const token = getToken();
  const role = getRole();
  const handleOpen = () => setOpen(true);
  const handleOpen1 = () => setOpen1(true);
  const handleOpen2 = () => setOpen2(true);
  const handleClose = () => setOpen(false);
  const handleClose1 = () => setOpen1(false);
  const handleClose2 = () => setOpen2(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [asesorProfile, setAsesorProfile] = useState({
    fullName: "",
    frontDegree: "",
    backDegree: "",
    nipNumber: "",
    npwpNumber: "",
    nira: "",
    pangkat: 0,
    gender: 0,
    // role: 0,
    workUnit: "",
    lembaga: "",
    officeAddress: "",
    namaBankRek: "",
    namaRek: "",
    noRek: "",
    phoneNumber: "",
    mobileNumber: "",
    lastEducation: 0,
    bornDate: "",
    bornPlace: "",
  });
  const [ptkiProfile, setPtkiProfile] = useState({
    nsptkiId: "",
    fullName: "",
    gender: 0,
    ktpNumber: "",
    phoneNumber: "",
    mobileNumber:""
  });
  const navigate = useNavigate();

  // tandatangan
  const [open3, setOpen3] = useState(false);
  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);
  const [imageURL, setImageURL] = useState(null);
  const sigCanvas = useRef({});
  const clear = () => sigCanvas.current.clear();
  const save = () => {
    setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));
  }

  const imagePreview = ('');

  const onLogout = () => {
    Swal.fire({
      title: "Sedang memproses..",
      text: "Mohon tunggu sebentar",
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    setTimeout(() => {
      Swal.close();
    }, 1000);
    setTimeout(() => {
      clearAuth();
      navigate("/login");
    }, 1200);
  };

  const isScreenSizeLowerThanLG = useMediaQuery("(max-width: 990px)");
  const isScreenSizeLowerThanMD = useMediaQuery("(max-width: 600px)");
  const [isScrolled, setIsScrolled] = useState(false);

  // burgermenu setting


  useEffect(() => {
    const handleScroll = () => {
      const isTop = window.scrollY < 100;
      setIsScrolled(!isTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [isSearchVisible, setSearchVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage =
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
        100;
      setSearchVisible(scrollPercentage >= 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleChangeProfilePtki = (e) => {
    if (!token) {
      return;
    }
    const name = e.target.name;
    const value = e.target.value;
    setPtkiProfile((values) => ({ ...values, [name]: value }));
  };

  const changePTKIProfile = () => {
    if (!token) {
      return;
    }
    api
      .put(
        `/auth/user-profile`,
        {
          FullName: ptkiProfile.fullName,
          gender: parseInt(ptkiProfile.gender),
          KtpNumber: ptkiProfile.ktpNumber,
          nsptkiId: parseInt(ptkiProfile.nsptkiId),
          PhoneNumber: ptkiProfile.phoneNumber,
          MobileNumber: ptkiProfile.mobileNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          handleClose2(true);
          Swal.fire({
            icon: "success",
            title: "Edit Profile PTKI",
            text: "Edit Profile PTKI Success!",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Edit Profil PTKI Failed",
            showConfirmButton: false,
            timer: 1500,
            text: response.data.message || "Something went wrong!",
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          showConfirmButton: false,
          timer: 1500,
          text: "Error changing profile ptki. Please try again later.",
        });
        handleClose2(true);
        console.error("Error edit profile ptki:", error);
      });
  };

  const handleChangeProfileAsesor = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "bornDate") {
    }
    setAsesorProfile((values) => ({ ...values, [name]: value }));
  };

  const [currentPTKIData, setCurrentPTKIData] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    const getDataPTKI = async () => {
      setIsLoading(true)
      try {
        const response = await api.get(`/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setCurrentPTKIData(response.data.data);
        setPtkiProfile((prevState) => ({
          ...prevState,
          fullName: response.data.data.fullName,
          gender: response.data.data.gender,
          nsptkiId: response.data.data.nsptkiId,
          ktpNumber: response.data.data.ktpNumber,
          phoneNumber: response.data.data.phoneNumber,
          mobileNumber: response.data.data.mobileNumber,
        }));
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `${error.message}`
        });
      } finally {
        setIsLoading(false)
      }

    };
    getDataPTKI();
  }, [open2]);

  const [currentAsesorData, setCurrentAsesorData] = useState([]);
  useEffect(() => {
    const getDataAsesor = async () => {
      try {
        const response = await api.get(`/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setCurrentAsesorData(response.data.data);
        setAsesorProfile((prevState) => ({
          ...prevState,
          fullName: response.data.data.fullName,
          frontDegree: response.data.data.frontDegree,
          backDegree: response.data.data.backDegree,
          nipNumber: response.data.data.nipNumber,
          npwpNumber: response.data.data.npwpNumber,
          nira: response.data.data.nira,
          pangkat: response.data.data.pangkat,
          gender: response.data.data.gender,
          role: response.data.data.role,
          workUnit: response.data.data.workUnit,
          lembaga: response.data.data.lembaga,
          officeAddress: response.data.data.officeAddress,
          namaBankRek: response.data.data.namaBankRek,
          namaRek: response.data.data.namaRek,
          noRek: response.data.data.noRek,
          phoneNumber: response.data.data.phoneNumber,
          mobileNumber: response.data.data.mobileNumber,
          lastEducation: response.data.data.lastEducation,
          bornDate: formatDateToMMDDYYYY(response.data.data.bornDate),
          bornPlace: response.data.data.bornPlace,
        }));
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `${error.message}`
        });
      }
    };
    getDataAsesor();
  }, [open1]);

  function formatDateToMMDDYYYY(isoDateString) {
    if (isoDateString) {
      const date = new Date(isoDateString);
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${year}-${month}-${day}`;
    }
  }
  function formatDateToMMDDYYYYPut(isoDateString) {
    const date = new Date(isoDateString);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}T16:25:56.258Z`;
  }
  const [openModal, setOpenModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const openModalHandler = (notification) => {
    setSelectedNotification(notification);
    setOpenModal(true);
  };

  const closeModalHandler = () => {
    setSelectedNotification(null);
    setOpenModal(false);
  };

  const changeAsesorrofile = async () => {
    try {
      if (!token) {
        return;
      }
      const response = await api.put(
        `/auth/asesor-profile`,
        {
          FullName: asesorProfile.fullName,
          gender: parseInt(asesorProfile.gender),
          // role: parseInt(asesorProfile.role),
          Nira: asesorProfile.nira,
          NamaBankRek: asesorProfile.namaBankRek,
          NoRek: asesorProfile.noRek,
          NamaRek: asesorProfile.namaRek,
          PhoneNumber: asesorProfile.phoneNumber,
          MobileNumber: asesorProfile.mobileNumber,
          OfficeAddress: asesorProfile.officeAddress,
          WorkUnit: asesorProfile.workUnit,
          Lembaga: asesorProfile.lembaga,
          lastEducation: parseInt(asesorProfile.lastEducation),
          NipNumber: asesorProfile.nipNumber,
          bornDate: formatDateToMMDDYYYYPut(asesorProfile.bornDate),
          BornPlace: asesorProfile.bornPlace,
          FrontDegree: asesorProfile.frontDegree,
          BackDegree: asesorProfile.backDegree,
          NpwpNumber: asesorProfile.npwpNumber,
          pangkat: parseInt(asesorProfile.pangkat),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      if (response.status === 200) {
        handleClose1(true);
        Swal.fire({
          icon: "success",
          title: "Edit Profile Asesor",
          text: "Edit Profile Asesor Success!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Edit Profile Asesor Failed",
          text: response.data.message || "Something went wrong!",
        });
      }
    } catch (error) {
      if (error.innerException) {
        console.error("Inner Exception:", error.innerException.message);
        Swal.fire({
          icon: "error",
          title: "Edit Profile Asesor Failed",
          text: error.innerException.message || error.response.data || "Something went wrong!",
        });
      } else {
        console.error("Error:", error.message);
        Swal.fire({
          icon: "error",
          title: "Edit Profile Asesor Failed",
          text: error.message || error.response.data || "Something went wrong!",
        });
      }
      Swal.fire({
        icon: "error",
        title: "Edit Profile Asesor Failed",
        text: error.message || error.response.data || "Something went wrong!",
      });
    }
  };

  const handleChangePassword = () => {
    if (!token) {
      return;
    }
    api
      .post(
        "/auth/changepassword",
        {
          currentPassword: currentPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          handleClose(true);
          Swal.fire({
            icon: "success",
            title: "Ganti Password",
            text: "Ganti Password Success!",
            showConfirmButton: false,
            timer: 1500,
            onClose: () => {
              handleClose(true);
            },
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Password Change Failed",
            text: response.data.message || "Something went wrong!",
            onClose: () => {
              handleClose(true);
            },
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error changing password. Please try again later.",
        });
        handleClose(true);
        console.error("Error changing password:", error);
      });
  };

  const [selectedBank, setSelectedBank] = useState(
    asesorProfile ? asesorProfile.namaBankRek : null
  );



  // upload nira
  const [message, setMessage] = useState("");
  const [selectedFileNira, setSelectedFileNira] = useState(null);
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFileNira(file);
      setMessage(`${file.name} selected.`);
    }
  };

  const handleSendClick = () => {
    if (selectedFileNira) {
      const formData = new FormData();
      formData.append("file", selectedFileNira);
      api
        .post("/auth/asesor-nira", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          setMessage("Upload success");
        })
        .catch((error) => {
          setMessage("Upload failed. Please try again.");
        });
    } else {
      setMessage("Please select a file first.");
    }
  };

  // upload tabungan
  const [messageTabungan, setMessageTabungan] = useState("");
  const [selectedFileTabungan, setSelectedFileTabungan] = useState(null);
  const fileInputRefTabungan = useRef(null);

  const handleUploadClickTabungan = () => {
    fileInputRefTabungan.current.click();
  };

  const handleFileChangeTabungan = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFileTabungan(file);
      setMessageTabungan(`${file.name} selected.`);
    }
  };

  const handleSendClickTabungan = () => {
    if (selectedFileTabungan) {
      const formData = new FormData();
      formData.append("file", selectedFileTabungan);
      api
        .post("/auth/asesor-bukutabungan", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          setMessageTabungan("Upload success");
          fetchTtdImage()
        })
        .catch((error) => {
          setMessageTabungan("Upload failed. Please try again.");
        });
    } else {
      setMessageTabungan("Please select a file first.");
    }
  };
  // upload ttd
  const [messageTtd, setMessageTtd] = useState("");
  const [selectedFileTtd, setSelectedFileTtd] = useState(null);
  const fileInputRefTtd = useRef(null);
  const handleUploadClickTtd = () => {
    fileInputRefTtd.current.click();
  };
  const handleFileChangeTtd = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFileTtd(file);
      setMessageTtd(`${file.name} selected.`);
    }
  };
  const handleSendClickTtd = () => {
    if (selectedFileTtd) {
      const formData = new FormData();
      formData.append("file", selectedFileTtd);
      api
        .post("/auth/asesor-ttd", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          setMessageTtd("Upload success");
          fetchTtdImage();
        })
        .catch((error) => {
          setMessageTtd("Upload failed. Please try again.");
        });
    } else {
      setMessageTtd("Please select a file first.");
    }
  };
  // get ttd
  const [ttdImageUrl, setTtdImageUrl] = useState(null);
  const fetchTtdImage = async () => {
    try {
      const response = await api.get("/auth/asesor-ttd", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      });
      const imageUrl = URL.createObjectURL(response.data);
      setTtdImageUrl(imageUrl);
    } catch (error) {
      console.error("Error fetching TTD image:", error);
    }
  };
  useEffect(() => {
    fetchTtdImage();
  },[open1])
  const [isRead, setIsRead] = useState(false);
  const handleTandaiSudahDibaca = () => {
    // Lakukan apa yang perlu dilakukan saat tombol "Tandai sudah dibaca" diklik.
    // Anda bisa mengubah state "isRead" menjadi true di sini.
    setIsRead(true);
  };
  const { darkMode, toggleDarkMode } = useDarkMode();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "25%",
    bgcolor: darkMode ? "#3C5B6F" : "background.paper",
    borderRadius: "6px",
    boxShadow: 24,
    color: darkMode ? "white" : "",
    "@media (max-width: 768px)": {
      width: "80%",
      maxWidth: "80%",
    },
  };
  const style1 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: "1000px",
    bgcolor: darkMode ? "#3C5B6F" : "background.paper",
    borderRadius: "6px",
    boxShadow: 24,
    height: "80vh",
    paddingRight: "20px",
    overflow: "auto",
    "@media (max-width: 768px)": {
      width: "90%",
      paddingRight: "0",
      WebkitOverflowScrolling: "touch",
      "&::-webkit-scrollbar": {
        width: "8px",
      },
      "&::-webkit-scrollbar-track": {
        background: "rgba(0, 0, 0, 0.1)",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "rgba(0, 0, 0, 0.2)",
        borderRadius: "4px",
      },
    },
    "@media (max-width: 600px)": {
      width: "90%",
      paddingRight: "0",
      scrollbarWidth: "thin",
      scrollbarColor: "rgba(0, 0, 0, 0.2) rgba(0, 0, 0, 0.1)",
      "&::-webkit-scrollbar": {
        width: "8px",
      },
      "&::-webkit-scrollbar-track": {
        background: "rgba(0, 0, 0, 0.1)",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "#2cbcc4",
        borderRadius: "4px",
      },
    },

    scrollbarWidth: "thin",
    scrollbarColor: "rgba(0, 0, 0, 0.2) rgba(0, 0, 0, 0.1)",
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-track": {
      background: "rgba(0, 0, 0, 0.1)",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#2cbcc4",
      borderRadius: "4px",
    },
  };
  return (
    <div className={`${styled.backgroundRow}`} style={{ position: "sticky", top: 0, zIndex: 999, backgroundColor: darkMode ? "#17153B" : "", boxShadow: isScrolled ? "0 4px 2px rgba(0, 0, 0, 0.1)" : "none", }}>
      <Navbar
        expand="lg "
        style={{
          height: isScreenSizeLowerThanLG ? null : "96px",
          padding: "0px",

          transition: "background-color 0.3s ease",
        }}
        className="mt-0"
      >
        <div
          className="m-0 container-nav1"
          style={{ padding: "0px 24px 0px 0px", flex: 1 }}
        >
          <div className="d-flex flex-row" style={{ gap: "8px", marginTop: isScreenSizeLowerThanLG ? "0px" : '15px' }}>
            {!isScreenSizeLowerThanLG && (
              <div
                className="custom-nav-menu"
                style={{ marginTop: "-14px", backgroundColor: darkMode ? "#3C5B6F" : "#FFFFFF" }}
                onClick={() => handleToggle()}
              >
                <img width={38} height={38} src={logo} alt="logo" />
              </div>
            )}
            {burgerMenu()}
            <div
              className="custom-nav-title d-flex"
              style={{ zIndex: 2, marginTop: isScreenSizeLowerThanLG ? "16px" : "-16px" }}
            >
              <div className="d-flex mt-1" >
                {!isScreenSizeLowerThanLG && (
                  <>
                    <img
                      src={kemenag}
                      width="41px"
                      height="49px"
                      className="d-inline-block align-top"
                      alt="React Bootstrap logo"
                      data-aos="zoom-in-right"
                      data-aos-duration="1000"
                    />
                    <img
                      src={pusaka}
                      width="51px"
                      height="45px"
                      className="d-inline-block align-top mt-1"
                      alt="React Bootstrap logo"
                      data-aos="zoom-in-left"
                      data-aos-duration="1000"
                    />
                  </>
                )}
                <h4 className="fw-bold mt-1"
                  style={{ marginLeft: isScreenSizeLowerThanLG ? '40px' : '0', marginTop: isScreenSizeLowerThanLG ? '0' : '10px', color: darkMode ? 'white' : 'black' }}
                >KEMENTERIAN AGAMA
                  <p style={{ color: darkMode ? "white" : "", fontSize: '16px' }}>Direktorat Jenderal Pendidikan Islam</p>
                </h4>

              </div>
            </div>

            <div
              className="custom-nav-search"
              style={{ display: isSearchVisible ? "none" : "none" }}
            >
              <div
                style={{
                  background: "white",
                  borderRadius: "48px",
                  height: "100%",
                  paddingLeft: "22px",
                  paddingRight: "22px",
                }}
                className="input-group-text border-0"
              >
                <SearchIcon />
                <input
                  type="text"
                  className="form-control border-0"
                  placeholder="Pencarian"
                  style={{
                    height: "40px",
                    boxShadow: "none",
                  }}
                />
              </div>
            </div>

            <div className="custom-nav-profile" style={{ marginTop: isScreenSizeLowerThanLG ? "16px" : "-30px" }}>
              {/* <div className="d-flex align-items-center">
                <div className="mt-1 me-1">
                  <div style={{
                    position: 'fixed',
                    bottom: '14px',
                    right: '14px',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: darkMode ? '#003285' : '#3ABEF9',
                    borderRadius: '50%',
                    padding: '3px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: '4px solid white'
                  }}
                    onClick={toggleDarkMode}>
                    <Button
                      style={{
                        borderRadius: '50%',
                        padding: 0,
                        minWidth: '40px',
                        minHeight: '40px',
                        backgroundColor: 'transparent',
                        color: '#FFFFFF',
                        boxShadow: 'none',
                        // border: '2px solid white',
                      }}
                    >
                      {darkMode ? <NightsStayIcon style={{ fontSize: '28px' }} /> : <WbSunnyIcon style={{ fontSize: '28px' }} />}
                    </Button>
                  </div>
                </div>
              </div> */}
              <Dropdown>
                <Dropdown.Toggle
                  variant="none"
                  style={{ border: "none", boxShadow: "none" }}
                >
                  <Badge bg="danger  rounded-5">
                    {!isRead && notification.length !== 0 ? notification.length : ''}
                  </Badge>
                  <NotificationsActiveIcon className="mt-1" fontSize="large" style={{ color: darkMode ? 'white' : 'grey', }} />
                </Dropdown.Toggle>
                <Dropdown.Menu
                  style={{
                    marginLeft: isScreenSizeLowerThanMD ? "-255px" : "-390px",
                    width: isScreenSizeLowerThanMD ? "390px" : "440px",
                    marginTop: "10px",
                    border: "none",
                    borderRadius: "6px",
                    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
                    backgroundColor: darkMode ? '#3C5B6F' : '',
                  }}
                >
                  <div
                    className="d-flex  align-items-center justify-content-between"
                    style={{ height: "45px", padding: "12px 16px" }}
                  >
                    <div className="d-flex w-100 h-100" style={{ gap: "31px" }}>
                      <p
                        className="d-block"
                        style={{
                          fontWeight: 500,
                          fontSize: "14px",
                          lineHeight: "20px",
                          color: darkMode ? 'white' : '#1A1F36',
                        }}
                      >
                        Notifikasi
                      </p>
                    </div>
                    <div
                      className="d-flex w-100 h-100 align-items-center justify-content-end"
                      style={{ gap: "4px" }}
                    >
                      <button
                        style={{ color: darkMode ? 'white' : 'green', border: " 1px solid green", fontSize: isScreenSizeLowerThanMD ? "12px" : "16px" }}
                        className="dropdown-notif-read btn btn-none"
                        onClick={handleTandaiSudahDibaca}
                        disabled={isRead}
                      >
                        Tandai sudah dibaca
                        <CheckCircleIcon />
                      </button>
                    </div>
                  </div>
                  <>
                    <div
                      className="m-3 overflow-auto"
                      style={{ maxHeight: "200px" }}
                    >
                      {isLoading ? (
                        <div className="dropdown-notif-empty">
                          <ClipLoader />
                        </div>
                      ) : (
                        <>
                          {notification?.length ? (
                            <>
                              {notification?.map((item, i) => (
                                <div
                                  key={i}
                                  className="d-flex"
                                  onClick={() => openModalHandler(item)}
                                  style={{ color: darkMode ? 'white' : '#1A1F36', marginBottom: '8px', fontSize: "13px", gap: "16px", cursor: 'pointer', transition: '0.3s' }}
                                // onMouseOver={(e) => {
                                //   e.currentTarget.style.backgroundColor = 'rgb(229, 229, 229)';
                                // }}
                                // onMouseOut={(e) => {
                                //   e.currentTarget.style.backgroundColor = '#ffffff';
                                // }}
                                >
                                  <img
                                    src={user}
                                    width="41px"
                                    height="41px"
                                    alt=""
                                    style={{ borderRadius: '50%' }}
                                  />

                                  <div style={{ lineHeight: "19px" }}>
                                    {item?.title && <p>{item?.title}</p>}
                                    {item?.description && (
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: item?.description,
                                        }}
                                      />
                                    )}
                                    {(function () {
                                      if (!item?.actionButton) return [];
                                      try {
                                        return JSON.parse(item?.actionButton);
                                      } catch (error) {
                                        console.log(error);
                                        return [];
                                      }
                                    })().map((btnCode, i) => (
                                      <React.Fragment key={i}>
                                        {btnCode === "U:R:A" && (
                                          <></>
                                        )}
                                        {btnCode === "U:R:R" && (
                                          <></>
                                        )}
                                      </React.Fragment>
                                    ))}
                                    <p className="mt-2">
                                      {formatDate(item.timeCreated)}
                                    </p>
                                    <hr />
                                  </div>
                                </div>
                              ))}
                            </>
                          ) : (
                            <div className="dropdown-notif-empty">
                              Tidak ada Notifikasi
                            </div>
                          )}
                        </>
                      )}

                    </div>
                  </>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown>
                <Dropdown.Toggle
                  variant="none"
                  className="btn btn-none"
                  style={{ border: "none", boxShadow: "none" }}
                >
                  <img width={40} height={40} src={user} alt="" style={{ borderRadius: '50%' }} />
                </Dropdown.Toggle>
                <Dropdown.Menu
                  style={{
                    marginLeft: "-160px",
                    width: "240px",
                    padding: "8px 20px",
                    border: "none",
                    borderRadius: "6px",
                    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
                    background: darkMode ? "#3C5B6F" : "",
                  }}
                >
                  <li>
                    <div className="dropdown-profile-item d-flex align-items-center">
                      <span style={{ color: darkMode ? "white" : "" }}> Pengaturan Profil</span>
                    </div>
                  </li>
                  <li>
                    {role === "AsesorInstitusi" && (

                      <>
                        <button
                        style={{
                          gap: "10px",
                          marginLeft: "-13px",
                        }}
                        className="cursor-pointer btn btn-none dropdown-profile-item d-flex align-items-center"
                        onClick={handleOpen1}
                      >
                        <ManageAccountsIcon sx={{ color: darkMode ? "white" : "rgba(58, 53, 65, 0.87)", }} />
                        <span
                          style={{
                            cursor: "pointer",
                            color: darkMode ? "white" : "rgba(58, 53, 65, 0.87)",
                          }}
                        >
                          Lihat Profil
                        </span>
                      </button>
                      </>
                     

                      
                    )}

                    {role === "User" && (
                      <>
                        <button
                          style={{
                            gap: "10px",
                            marginLeft: "-13px",
                          }}
                          className="cursor-pointer btn btn-none dropdown-profile-item d-flex align-items-center"
                          onClick={handleOpen2}
                        >
                          <ManageAccountsIcon sx={{ color: darkMode ? "white" : "rgba(58, 53, 65, 0.87)", }} />
                          <span
                            style={{
                              cursor: "pointer",
                              color: darkMode ? "white" : "rgba(58, 53, 65, 0.87)",
                            }}
                          >
                            Lihat Profil
                          </span>
                        </button>
                      </>
                    )}
                  </li>

                  <li>
                    <button
                      style={{
                        gap: "10px",
                        marginLeft: "-13px",
                      }}
                      className="cursor-pointer btn btn-none dropdown-profile-item d-flex align-items-center"
                      onClick={() => navigate('/')}
                    >
                      <ManageAccountsIcon sx={{ color: darkMode ? "white" : "rgba(58, 53, 65, 0.87)", }} />
                      <span
                        style={{
                          cursor: "pointer",
                          color: darkMode ? "white" : "rgba(58, 53, 65, 0.87)",
                        }}
                      >
                        Halaman Utama
                      </span>
                    </button>
                    {/* <button
                      className="cursor-pointer btn btn-none dropdown-profile-item d-flex align-items-center"
                      style={{
                        gap: "10px",
                        marginLeft: "-14px",
                      }}
                      onClick={handleOpen}
                    >
                      <LockPersonIcon sx={{ color: darkMode ? "white" : "rgba(58, 53, 65, 0.87)", }} />
                      <span
                        style={{
                          color: darkMode ? "white" : "rgba(58, 53, 65, 0.87)",
                          cursor: "pointer",
                        }}
                      >
                        Ganti Password
                      </span>
                    </button> */}
                  </li>
                  <li>
                    <div style={{ width: "100%", height: "10px" }}>
                      <hr style={{ color: darkMode ? "white" : "rgba(58, 53, 65, 0.87)", }} />
                    </div>
                  </li>
                  <li>
                    <Button
                      variant="outlined"
                      color="error"
                      className="p-0 w-100 d-flex align-items-center"
                      style={{
                        height: "40px",
                        border: "1px solid red",
                      }}
                      onClick={onLogout}
                    >
                      Log out
                    </Button>
                  </li>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </Navbar>


      {/* Modal Notif */}
      <Modal
        open={openModal} onClose={closeModalHandler}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton
            sx={{ position: "absolute", top: 5, right: 5 }}
            onClick={closeModalHandler}
            aria-label="close"
          >
            <HighlightOffIcon color="error" />
          </IconButton>
          <Box sx={{ padding: 4 }}>
            <Typography sx={{ marginBottom: '20px' }} id="modal-modal-title" variant="h6" component="h2">
              Detail Notifikasi
            </Typography>

            <div>
              {selectedNotification && (
                <>
                  <div className="d-flex">
                    <img
                      src={user}
                      width="61px"
                      height="61px"
                      alt=""
                      style={{ borderRadius: '50%' }}
                      className="me-4"
                    />

                    <div style={{ lineHeight: '19px' }}>
                      {selectedNotification?.title && <p>{selectedNotification?.title}</p>}
                      {selectedNotification?.description && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: selectedNotification?.description,
                          }}
                        />
                      )}
                      {(function () {
                        if (!selectedNotification?.actionButton) return [];
                        try {
                          return JSON.parse(selectedNotification?.actionButton);
                        } catch (error) {
                          console.log(error);
                          return [];
                        }
                      })().map((btnCode, i) => (
                        <React.Fragment key={i}>
                          {btnCode === 'U:R:A' && (
                            <>
                            </>
                          )}
                          {btnCode === 'U:R:R' && (
                            <>
                            </>
                          )}
                        </React.Fragment>
                      ))}
                      <p className="mt-4">
                        {formatDate(selectedNotification.timeCreated)}
                      </p>
                      <hr />
                    </div>
                  </div>
                </>
              )}
            </div>
          </Box>
        </Box>
      </Modal>
      {/* edit ptki */}
      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style1}>
          <IconButton
            sx={{ position: "absolute", top: 5, right: 5 }}
            onClick={handleClose2}
            aria-label="close"
          >
            <HighlightOffIcon color="error" />
          </IconButton>

          <Box sx={{ color: darkMode ? "white" : "", padding: 4, marginTop: "" }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit Profile PTKI
            </Typography>
            <div className="d-flex flex-md-row flex-column align-items-center edit-profile-formcontrol">
              <div className="file-upload-container position-relative">
                <input
                  type="file"
                  accept="image/*"
                  id="avatarUpload"
                  value={imagePreview}
                  hidden
                  onChange={handleFileChange}
                />

                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    backgroundImage: `url("${imagePreview || avatar}")`,
                    backgroundSize: "cover",
                    borderRadius: "50%",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>
              </div>
              <h3 className="ms-3 mt-3">{currentPTKIData.fullName}</h3>
            </div>
            <div className="d-flex align-items-center edit-profile-formcontrol">
              <label htmlFor="" className="col-md-2 col-4">
                NPSTKI :
              </label>
              <TextField
                id="outlined-basic"
                variant="outlined"
                name="nsptkiId"
                value={ptkiProfile.nsptkiId}
                onChange={handleChangeProfilePtki}
                sx={{ marginTop: "10px", width: "100%", background: darkMode ? "white" : "", }}
              />
            </div>
            <div className="d-flex align-items-center edit-profile-formcontrol">
              <label htmlFor="" className="col-md-2 col-4">
                Nama :
              </label>
              <TextField
                id="outlined-basic"
                variant="outlined"
                name="fullName"
                value={ptkiProfile.fullName}
                onChange={handleChangeProfilePtki}
                sx={{ marginTop: "10px", width: "100%", background: darkMode ? "white" : "", }}
              />
            </div>
            <div
              className="d-flex border-0 edit-profile-formcontrol"
              style={{ marginTop: "20px" }}
              name="gender"
            >
              <p className="col-md-2 col-3">Jenis Kelamin :</p>
              <div className="form-check ms-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="laki"
                  value={0}
                  onChange={handleChangeProfilePtki}
                  checked={ptkiProfile.gender == 0}
                />
                <label className="form-check-label" htmlFor="laki">
                  Laki-laki
                </label>
              </div>
              <div className="form-check  ms-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  checked={ptkiProfile.gender == 1}
                  onChange={handleChangeProfilePtki}
                  value={1}
                  id="perempuan"
                />
                <label className="form-check-label" htmlFor="perempuan">
                  Perempuan
                </label>
              </div>
            </div>
            <div className="d-flex align-items-center edit-profile-formcontrol">
              <label htmlFor="" className="col-md-2 col-4">
                Nomor KTP :
              </label>
              <TextField
                id="outlined-basic"
                variant="outlined"
                name="ktpNumber"
                value={ptkiProfile.ktpNumber}
                onChange={handleChangeProfilePtki}
                sx={{ marginTop: "10px", width: "100%", background: darkMode ? "white" : "", }}
              />
            </div>
            <div className="d-flex align-items-center edit-profile-formcontrol">
              <label htmlFor="" className="col-md-2 col-4">
                Nomor Telepon :
              </label>
              <TextField
                id="outlined-basic"
                variant="outlined"
                name="phoneNumber"
                value={ptkiProfile.phoneNumber}
                onChange={handleChangeProfilePtki}
                sx={{
                  marginTop: "10px",
                  width: "100%",
                  background: darkMode ? "white" : "",
                }}
              />
            </div>
            <div className="d-flex align-items-center edit-profile-formcontrol">
              <label htmlFor="" className="col-md-2 col-4">
                Nomor HP :
              </label>
              <TextField
                id="outlined-basic"
                variant="outlined"
                name="mobileNumber"
                value={ptkiProfile.mobileNumber}
                onChange={handleChangeProfilePtki}
                sx={{
                  marginTop: "10px",
                  width: "100%",
                  background: darkMode ? "white" : "",
                }}
              />
            </div>
            <Button
              size="small"
              onClick={changePTKIProfile}
              variant="contained"
              sx={{
                marginTop: "6px",
                marginLeft: "auto",
                display: "flex",
                "@media (max-width: 768px)": {
                  width: "100%",
                  marginTop: "10px",
                },
              }}
            >
              <ChangeCircleIcon sx={{ marginRight: "6px" }} />
              Simpan
            </Button>
          </Box>
        </Box>
      </Modal>
      {/* edit asesor */}
      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style1}>
          <IconButton
            sx={{ position: "absolute", top: 5, right: 5 }}
            onClick={handleClose1}
            aria-label="close"
          >
            <HighlightOffIcon color="error" />
          </IconButton>

          <Box sx={{ padding: 4, marginTop: "" }}>
            <Typography style={{ color: darkMode ? "white" : "" }} id="modal-modal-title" variant="h6" component="h2">
              Edit Profile Evaluator
            </Typography>

            <div className="d-flex flex-md-row flex-column edit-profile-formcontrol">
              <div style={{ color: darkMode ? "white" : "" }} className="col-md-6 col-12 me-4">
                <div className="d-flex flex-md-row flex-column align-items-center">
                  <div className="file-upload-container position-relative">
                    <input
                      type="file"
                      accept="image/*"
                      id="avatarUpload"
                      hidden
                      onChange={handleFileChange}
                    />

                    <div
                      style={{
                        width: "100px",
                        height: "100px",
                        backgroundImage: `url("${imagePreview || avatar}")`,
                        backgroundSize: "cover",
                        borderRadius: "50%",
                        backgroundRepeat: "no-repeat",
                      }}
                    ></div>

                  </div>
                  <h3 className="ms-3 mt-3">{currentAsesorData.fullName}</h3>
                </div>
                <div className="d-flex align-items-center">
                  <label htmlFor="" className="col-md-3 col-4">
                    Nama :
                  </label>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    name="fullName"
                    value={asesorProfile.fullName}
                    onChange={handleChangeProfileAsesor}
                    sx={{ marginTop: "10px", width: "100%", backgroundColor: darkMode ? "white" : "" }}
                  />
                </div>
                <div className="d-flex align-items-center">
                  <label htmlFor="" className="col-md-3 col-4">
                    Email :{" "}
                  </label>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    disabled
                    value={currentAsesorData.email}
                    sx={{ marginTop: "10px", width: "100%", backgroundColor: darkMode ? "white" : "" }}
                  />
                </div>
                <div className="d-flex align-items-center">
                  <label htmlFor="" className="col-md-3 col-4">
                    Gelar :
                  </label>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    name="frontDegree"
                    value={asesorProfile.frontDegree}
                    onChange={handleChangeProfileAsesor}
                    sx={{
                      marginTop: "10px",
                      width: "100%",
                      marginRight: "10px",
                      backgroundColor: darkMode ? "white" : ""
                    }}
                  />
                  <TextField
                    id="outlined-basic"
                    name="backDegree"
                    value={asesorProfile.backDegree}
                    onChange={handleChangeProfileAsesor}
                    variant="outlined"
                    sx={{ marginTop: "10px", width: "100%", backgroundColor: darkMode ? "white" : "" }}
                  />
                </div>
                <div className="d-flex align-items-center">
                  <label htmlFor="" className="col-md-3 col-4">
                    NIP:
                  </label>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    name="nipNumber"
                    value={asesorProfile.nipNumber}
                    onChange={handleChangeProfileAsesor}
                    sx={{
                      marginTop: "10px",
                      width: "100%",
                      backgroundColor: darkMode ? "white" : ""
                    }}
                  />
                </div>
                <div className="d-flex align-items-center">
                  <label htmlFor="" className="col-md-3 col-4">
                    NPWP:
                  </label>
                  <TextField
                    id="outlined-basic"
                    name="npwpNumber"
                    value={asesorProfile.npwpNumber}
                    onChange={handleChangeProfileAsesor}
                    variant="outlined"
                    sx={{ marginTop: "10px", width: "100%", backgroundColor: darkMode ? "white" : "" }}
                  />
                </div>
                <div className="d-flex align-items-start">
                  <label htmlFor="" className="col-md-3 col-4 mt-md-4 mt-4">
                    NIRA :
                  </label>
                  <div className="d-flex flex-md-row flex-column w-100">
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      name="nira"
                      value={asesorProfile.nira}
                      onChange={handleChangeProfileAsesor}
                      sx={{
                        marginTop: "10px",
                        width: "50%",
                        marginRight: "10px",
                        "@media (max-width: 768px)": {
                          width: "100%",
                        },
                        backgroundColor: darkMode ? "white" : "",
                        height: '55px'
                      }}
                    />
                    <div className="align-items-center">
                      <div className="file-upload-container">
                        <input
                          type="file"
                          ref={fileInputRef}
                          style={{ display: "none" }}
                          onChange={handleFileChange}
                          accept=".pdf"
                        />
                        <button
                          className="btn btn-success mt-4 p-2 w-100"
                          onClick={handleUploadClick}
                        >
                          Unggah File
                        </button>
                        <button
                          className="btn btn-primary mt-2 p-2 w-100"
                          onClick={handleSendClick}
                        >
                          Kirim File
                        </button>
                        <p>{message}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-start">
                  <label htmlFor="" className="col-md-3 col-4 mt-md-4 mt-4">
                    Tabungan :
                  </label>
                  <div className="align-items-center">
                    <div className="file-upload-container">
                      <input
                        type="file"
                        ref={fileInputRefTabungan}
                        style={{ display: "none" }}
                        onChange={handleFileChangeTabungan}
                        accept=".jpg,.jpeg,.png"
                      />
                      <button
                        className="btn btn-success mt-4 p-2 w-100"
                        onClick={handleUploadClickTabungan}
                      >
                        Unggah File
                      </button>
                      <button
                        className="btn btn-primary mt-2 p-2 w-100"
                        onClick={handleSendClickTabungan}
                      >
                        Kirim File
                      </button>
                      <p>{messageTabungan}</p>
                    </div>
                  </div>
                </div>


                <div
                  className="d-flex border-0"
                  style={{ marginTop: "20px" }}
                  name="gender"
                >
                  <p className="col-md-3 col-4">Jenis Kelamin:</p>
                  <div className="form-check ms-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="laki"
                      value={0}
                      onChange={handleChangeProfileAsesor}
                      checked={asesorProfile.gender == 0}
                      style={{ backgroundColor: darkMode ? "white" : "", }}
                    />
                    <label className="form-check-label" htmlFor="laki">
                      Laki-laki
                    </label>
                  </div>
                  <div className="form-check  ms-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      value={1}
                      checked={asesorProfile.gender == 1}
                      onChange={handleChangeProfileAsesor}
                      id="perempuan"
                      style={{ backgroundColor: darkMode ? "white" : "", }}
                    />
                    <label className="form-check-label" htmlFor="perempuan">
                      Perempuan
                    </label>
                  </div>
                </div>

                <div className="d-flex mt-2 align-items-center gap-2">
                  <div className="col-md-3 col-4">
                    <label className="form-label">Pangkat Golongan:</label>
                  </div>
                  <div className="col-md-9">
                    <select
                      className="form-select w-100"
                      name="pangkat"
                      value={asesorProfile.pangkat}
                      onChange={handleChangeProfileAsesor}
                      style={{ backgroundColor: darkMode ? "white" : "", }}
                    >
                      <option defaultValue>Pilih Pangkat Golongan</option>
                      <option value={0}>III_a_PenataMuda</option>
                      <option value={1}>III_b_PenataMuda_Tk1</option>
                      <option value={2}>III_c_Penata</option>
                      <option value={3}>III_d_Penata_Tk1</option>
                      <option value={4}>IV_a_Pembina</option>
                      <option value={5}>IV_b_Pembina_Tk1</option>
                      <option value={6}>IV_c_PembinaUtamaMuda</option>
                      <option value={7}>IV_d_PembinaUtamaMadya</option>
                      <option value={8}>IV_3_PembinaUtama</option>
                    </select>
                  </div>
                </div>
                <div className="d-flex mt-3 align-items-center gap-2">
                  <div className="col-md-3 col-4">
                    <label className="form-label">Lembaga:</label>
                  </div>
                  <TextField
                    id="outlined-basic"
                    name="lembaga"
                    value={asesorProfile.lembaga}
                    onChange={handleChangeProfileAsesor}
                    variant="outlined"
                    sx={{ marginTop: "10px", width: "100%", backgroundColor: darkMode ? "white" : "", }}
                  />
                </div>
              </div>
              <div style={{ color: darkMode ? "white" : "" }} className="col-md-6 col-12 me-5 ">
                <div className="d-flex mt-3 align-items-center gap-2">
                  <div className="col-md-3 col-4">
                    <label className="form-label">Unit Kerja:</label>
                  </div>
                  <TextField
                    id="outlined-basic"
                    name="workUnit"
                    value={asesorProfile.workUnit}
                    onChange={handleChangeProfileAsesor}
                    variant="outlined"
                    sx={{ marginTop: "10px", width: "100%", backgroundColor: darkMode ? "white" : "", }}
                  />
                </div>
                <div className="d-flex mt-2 align-items-center gap-2">
                  <div className="col-md-3 col-4">
                    <label className="form-label">Pendidikan Terakhir:</label>
                  </div>
                  <div className="col-md-9 col-8">
                    <select
                      className="form-select w-100"
                      name="lastEducation"
                      value={asesorProfile.lastEducation}
                      onChange={handleChangeProfileAsesor}
                      style={{ backgroundColor: darkMode ? "white" : "", }}
                    >
                      <option defaultValue>Pilih Pendidikan</option>
                      <option value={0}>Sarjana/Profesi</option>
                      <option value={1}>Magister</option>
                      <option value={2}>Doktor</option>
                    </select>
                  </div>
                </div>
                <div className="d-flex align-items-center mt-3 gap-2">
                  <div className="col-md-3 col-4">
                    <label className="form-label">Tempat Lahir: </label>
                  </div>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    name="bornPlace"
                    value={asesorProfile.bornPlace}
                    onChange={handleChangeProfileAsesor}
                    sx={{
                      marginTop: "10px",
                      backgroundColor: darkMode ? "white" : "",
                      width: "100%",
                    }}
                  />
                </div>
                <div className="d-flex align-items-center mt-3 gap-2">
                  <div className="col-md-3 col-4">
                    <label className="form-label">Tanggal Lahir:</label>
                  </div>
                  <input
                    type="date"
                    className="form-control"
                    name="bornDate"
                    value={asesorProfile.bornDate}
                    onChange={handleChangeProfileAsesor}
                    style={{ padding: "16.5px 14px", marginTop: "10px", backgroundColor: darkMode ? "white" : "", }}
                  // defaultValue={asesorProfile.bornDate}
                  />
                </div>
                <div className="d-flex align-items-center mt-3 gap-2">
                  <div className="col-md-3 col-4">
                    <label htmlFor="" className="form-label">
                      Alamat:
                    </label>
                  </div>
                  <textarea
                    rows="2"
                    id="officeAddress"
                    name="officeAddress"
                    value={asesorProfile.officeAddress}
                    onChange={handleChangeProfileAsesor}
                    className={`w-100 form-control`}
                    placeholder="Alamat Kantor"
                    autoComplete="off"
                    style={{ backgroundColor: darkMode ? "white" : "", }}
                  ></textarea>
                </div>
                <div className="d-flex mt-2 align-items-center gap-2">
                  <div className="col-md-3 col-4">
                    <label className="form-label">Nama Bank:</label>
                  </div>

                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={listBank}
                    getOptionLabel={(option) => option}
                    name="namaBankRek"
                    // value={listBank[listBank.indexOf(asesorProfile.namaBankRek)]}
                    defaultValue={listBank[listBank.indexOf(currentAsesorData.namaBankRek)]}
                    onChange={(event) =>
                      (asesorProfile.namaBankRek = event.target.innerText)
                    }
                    onInputChange={(event, newInputValue) =>
                      setSelectedBank(newInputValue)
                    }
                    sx={{ width: "100%", backgroundColor: darkMode ? "white" : "", }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </div>
                <div className="d-flex align-items-center gap-2">
                  <label htmlFor="" className="col-md-3 col-4">
                    Nama Rekening:{" "}
                  </label>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    name="namaRek"
                    value={asesorProfile.namaRek}
                    onChange={handleChangeProfileAsesor}
                    sx={{ marginTop: "10px", width: "100%", backgroundColor: darkMode ? "white" : "", }}
                  />
                </div>
                <div className="d-flex align-items-center gap-2">
                  <label htmlFor="" className="col-md-3 col-4">
                    No. Rekening:{" "}
                  </label>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    name="noRek"
                    value={asesorProfile.noRek}
                    onChange={handleChangeProfileAsesor}
                    sx={{ marginTop: "10px", width: "100%", backgroundColor: darkMode ? "white" : "", }}
                  />
                </div>
                <div className="d-flex align-items-center gap-2">
                  <label htmlFor="" className="col-md-3 col-4">
                    No.Telp:
                  </label>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    name="phoneNumber"
                    value={asesorProfile.phoneNumber}
                    onChange={handleChangeProfileAsesor}
                    sx={{
                      marginTop: "10px",
                      width: "100%",
                      backgroundColor: darkMode ? "white" : "",
                    }}
                  />
                </div>
                <div className="d-flex align-items-center gap-2">
                  <label htmlFor="" className="col-md-3 col-4">
                    No.HP:
                  </label>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    name="mobileNumber"
                    value={asesorProfile.mobileNumber}
                    onChange={handleChangeProfileAsesor}
                    sx={{ marginTop: "10px", width: "100%", backgroundColor: darkMode ? "white" : "", }}
                  />
                </div>

                <div className="d-flex align-items-center gap-2">
                  <label htmlFor="" className="col-md-3 col-4">
                    TTD:
                  </label>
                  <div className="align-items-center">
                    <div className="file-upload-container">
                      <input
                        type="file"
                        ref={fileInputRefTtd}
                        style={{ display: "none" }}
                        onChange={handleFileChangeTtd}
                        accept=".jpg,.png"
                      />
                      <button
                        className="btn btn-success mt-4 p-2 w-100"
                        onClick={handleUploadClickTtd}
                      >
                        Unggah File
                      </button>
                      <button
                        className="btn btn-primary mt-2 p-2 w-100"
                        onClick={handleSendClickTtd}
                      >
                        Kirim File
                      </button>
                      <p>{messageTtd}</p>
                    </div>
                  </div>
                </div>
                {ttdImageUrl ? (
                  <div className="mt-2 ms-auto d-flex justify-content-center">
                    <img src={ttdImageUrl} alt="TTD" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                  </div>
                ) : (
                    <div className="mt-2 alert alert-warning d-flex align-items-center" role="alert">
                      <i className="fas fa-exclamation-triangle me-2"></i>
                      <div>Tanda tangan tidak tersedia</div>
                    </div>
                )}
              </div>
            </div>

            <Button
              size="small"
              onClick={changeAsesorrofile}
              variant="contained"
              sx={{
                marginTop: "6px",
                marginLeft: "auto",
                display: "flex",
                "@media (max-width: 768px)": {
                  width: "100%",
                  marginTop: "10px",
                },
              }}
            >
              <ChangeCircleIcon sx={{ marginRight: "6px" }} />
              Simpan
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Edit Password */}
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

          <Box sx={{ padding: 4, marginTop: "-10px" }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Ganti Password
            </Typography>

            <div style={{ color: darkMode ? "white" : "", }}>
              <TextField
                id="outlined-basic"
                label="Password Lama"
                variant="outlined"
                sx={{ marginTop: "10px", width: "100%", backgroundColor: darkMode ? "white" : "", }}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Password Baru"
                variant="outlined"
                sx={{ marginTop: "10px", width: "100%", backgroundColor: darkMode ? "white" : "", }}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <Button
              size="small"
              onClick={handleChangePassword}
              variant="contained"
              sx={{ marginTop: "6px", marginLeft: "auto", display: "flex" }}
            >
              <ChangeCircleIcon sx={{ marginRight: "6px" }} />
              Ganti Password
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Index;
