import React, { useState, useEffect, useMemo, useCallback } from "react";
import "../../../../views/kasubdit/admin-kasubdit.css";
import penugasan from "../../../../assets/penugasan.svg";
import secondary from "../../../../assets/secondary.svg";
import AsyncTable from "../../../../components/table/AsyncTable";
import axios from "axios";
import { getToken, getRole, getUserId } from "../../../../utils/token";
import { GetApiBaseUrl } from "../../../../utils/env";
import Swal from "sweetalert2";
import moment from "moment";
import DropdownAksi from "../../../../components/dropdown/DropdownAksi";
import MenuItem from "@mui/material/MenuItem";
import { Helmet } from "react-helmet";
import style from '../../../auth/pendaftaran-assesor/pendaftaran.module.css'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import {
  ConfirmationSwal,
  StartLoading,
  SuccessSwal,
  ErrorSwal,
} from "../../../../utils/swal2";
import Button from "@mui/material/Button";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Autocomplete, useMediaQuery } from "@mui/material";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import HowToRegIcon from "@mui/icons-material/HowToReg";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Stepper, Step, StepLabel } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import PersonFillAddIcon from "../../../../components/icons/PersonFillAddIcon";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import * as XLSX from 'xlsx';
import PhoneInput from "react-phone-input-2";
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import AddIcon from '@mui/icons-material/Add';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ArticleIcon from '@mui/icons-material/Article';
import { pdfjs } from 'react-pdf';
import { ClipLoader } from "react-spinners";
import { motion, color } from 'framer-motion';
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
import api from "../../../service/api";
import { useDarkMode } from "../../../../utils/DarkModeContext";
import ContentCard from "../../../../components/card-content/ContentCard";

const translateRole = (role) => {
  switch (role) {
    case 1:
      return "USER";
    case 7:
      return "BAN-PT";
    case 9:
      return "LAMDIK";
    case 10:
      return "LAMEMBA";
    case 11:
      return "VERIFIKATOR (PTSP)";
    case 0:
      return "Direktur Jenderal";
    case 52:
      return "BENDAHARA";
    case 8:
      return "BIRO HUKUM";
    case 4:
    case 5:
      return "SUBDIT";
    default:
      return "-";
  };
};
const BerandaKasubdit = () => {
  const [view, setview] = useState("validators");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = getToken();
  const baseUrl = GetApiBaseUrl();
  const [searchQuery, setSearchQuery] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const isScreenSizeLowerThanMD = useMediaQuery(("(max-width: 550px"))
  const indexedRows = useMemo(() => {
    return rows.map((item, i) => ({
      ...item,
      rowIndex: i,
    }));
  }, [rows]);
  const filteredRows = useMemo(() => {
    return indexedRows.filter(
      (row) =>
        row.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.nsptki?.namaPerguruan.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.nsptki?.namaSingkat.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [indexedRows, searchQuery]);
  const fetchManagement = (
    fetchType = ["user", "asesor", "admin", "subdit", "kasubdit", "validators"]
  ) => {
    setLoading(true);
    axios
      .get(`${baseUrl}/user/${fetchType}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.status === 200) {
          const result = response.data.data;
          const sortedResponseData = result.sort((a, b) => new Date(b['timeCreated']) - new Date(a['timeCreated']));
          setRows(sortedResponseData);
        } else {
          // handle login failed
          Swal.fire({
            title: "Fetching Data Failed",
            icon: "warning",
          });
        }
      })
      .catch(() => {
        // handle login error
        Swal.fire({
          icon: "error",
          title: "Fetching Data Failed",
        });
      })
      .finally(() => {
        setLoading(false)
      });
  };
  const handleApproveUser = (user_id) => {
    StartLoading();
    axios
      .post(
        `${baseUrl}/auth/approve/${user_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.data.status === 200) {
          SuccessSwal("Success", "Berhasil aktivasi user");
          fetchBasedView();
        } else {
          // handle login failed
          ErrorSwal("Gagal aktivasi user");
        }
      })
      .catch(() => {
        // handle login error
        ErrorSwal("Gagal aktivasi user");
      });
  };
  const handleApproveAsesor = (asesor_id) => {
    StartLoading();
    axios
      .post(
        `${baseUrl}/auth/approveasesor/${asesor_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.data.status === 200) {
          SuccessSwal("Success", "Berhasil aktivasi evaluator");
          fetchBasedView();
        } else {
          // handle login failedd
          ErrorSwal("Gagal aktivasi evaluator");
        }
      })
      .catch(() => {
        // handle login error
        ErrorSwal("Gagal aktivasi evaluator");
      });
  };
  const handleRejectAsesor = (user_id, fetchType = "asesor") => {
    StartLoading();
    axios
      .delete(`${baseUrl}/user/${fetchType}/${user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          SuccessSwal("Success", "Berhasil hapus akun evaluator");
          fetchBasedView();
        } else {
          ErrorSwal("Gagal hapus akun evaluato");
        }
      })
      .catch(() => {
        ErrorSwal("Gagal hapus akun evaluato");
      });

  };
  const handleRejectAdmin = (user_id, fetchType = "admin") => {
    StartLoading();
    axios
      .delete(`${baseUrl}/user/${fetchType}/${user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          SuccessSwal("Success", "Berhasil hapus akun admin");
          fetchBasedView();
        } else {
          ErrorSwal("Gagal hapus akun admin");
        }
      })
      .catch(() => {
        ErrorSwal("Gagal hapus akun admin");
      });

  };
  const handleRejectUser = (user_id, fetchType = "user") => {
    StartLoading();
    axios
      .delete(`${baseUrl}/user/${fetchType}/${user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          SuccessSwal("Success", "Berhasil hapus akun user");
          fetchBasedView();
        } else {
          ErrorSwal("Gagal hapus akun user");
        }
      })
      .catch(() => {
        ErrorSwal("Gagal hapus akun user");
      });

  };
  const handleRejectValidator = (user_id, fetchType = "validator") => {
    StartLoading();
    axios
      .delete(`${baseUrl}/user/${fetchType}/${user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          SuccessSwal("Success", "Berhasil hapus akun user");
          fetchBasedView();
        } else {
          ErrorSwal("Gagal hapus akun user");
        }
      })
      .catch(() => {
        ErrorSwal("Gagal hapus akun user");
      });

  };
  const fetchBasedView = () => {
    switch (view) {
      case "user":
        fetchManagement("user");
        break;
      case "asesor":
        fetchManagement("asesor");
        break;
      case "admin":
        fetchManagement("admin");
        break;
      case "validators":
        fetchManagement("validators");
        break;
    }
  };
  const handlePasswordReset = (email) => {
    Swal.fire({
      title: 'Ganti Password',
      input: 'password',
      inputLabel: 'Masukkan Password Baru',
      inputPlaceholder: 'Masukkan Password Baru',
      inputAttributes: {
        autocapitalize: 'off',
        autocorrect: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Ganti',
      showLoaderOnConfirm: true,
      preConfirm: (password) => {
        return fetch(`${baseUrl}/auth/setpassword?email=${email}&password=${password}`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json();
          })
          .catch(error => {
            Swal.showValidationMessage(`Request failed: ${error}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Ganti Password', 'Ganti Password Sukses', 'success');
      }
    });
  };

  useEffect(() => {
    fetchBasedView();
  }, [view]);
  const exportToExcel = (data, type) => {
    const excelData = data.map(item => ({
      email: item.email,
      fullName: item.fullName,
      lembaga: type === 'user'
        ? (item.namaPerguruan || '-')
        : (type === 'admin' ? translateRole(item.role) : '-'),
      approvedBy: item.approvedBy ? item.approvedBy.fullName : 'Belum disetujui',
    }));

    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${type}_data.xlsx`);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const isScreenSizeLowerThanLG = useMediaQuery("(max-width: 990px)");
  // tabungan
  const [openTabunganModal, setOpenTabunganModal] = useState(false);
  const [tabunganData, setTabunganData] = useState(null);
  const handleOpenTabunganModal = () => setOpenTabunganModal(true);
  const handleCloseTabunganModal = () => setOpenTabunganModal(false);
  const fetchTabunganData = async (userId) => {
    try {
      const response = await axios.get(`${baseUrl}/user/asesor-bukutabungan`, {
        params: { userId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob', // Important for handling binary data
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      setTabunganData(url);
      handleOpenTabunganModal();
    } catch (error) {
      console.error("Error fetching tabungan data:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `${error.message}`
      });
    }
  };
  // nira
  const [openNiraModal, setOpenNiraModal] = useState(false);
  const [niraData, setNiraData] = useState(null);
  const [niraBlob, setNiraBlob] = useState(null); // To store the blob for download
  const handleOpenNiraModal = () => setOpenNiraModal(true);
  const handleCloseNiraModal = () => setOpenNiraModal(false);
  const fetchNiraData = async (userId) => {
    try {
      const response = await axios.get(`${baseUrl}/user/asesor-nira`, {
        params: { userId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      setNiraData(url);
      setNiraBlob(response.data); // Store the blob for download
      handleOpenNiraModal();
    } catch (error) {
      console.error("Error fetching NIRA data:", error);
      Swal.fire({
        icon: "error",
        title: `Error`,
        text: `${error.message}`
      });
    }
  };

  const [openSurtugUserModal, setOpenSurtugUserModal] = useState(false);
  const [surtugUserData, setSurtugUserData] = useState(null);
  const [surtugUserBlob, setSurtugUserBlob] = useState(null); // To store the blob for download
  const handleOpenSurtugUserModal = () => setOpenSurtugUserModal(true);
  const handleCloseSurtugUserModal = () => setOpenSurtugUserModal(false);
  const fetchSuratTugasUser = async (userId) => {
    try {
      const response = await axios.get(`${baseUrl}/user/surtug-user`, {
        params: { userId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      setSurtugUserData(url);
      setSurtugUserBlob(response.data); // Store the blob for download
      handleOpenSurtugUserModal();
    } catch (error) {
      console.error("Error fetching NIRA data:", error);
      Swal.fire({
        icon: "error",
        title: `Error`,
        text: `${error.message}`
      });
    }
  };
  // Persetujuan User
  const userColumns = [
    {
      field: "no",
      headerName: "#",
      width: isScreenSizeLowerThanLG ? 30 : '',
      flex: isScreenSizeLowerThanLG ? 0 : 0.3,
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
      field: "fullName",
      headerName: "Nama User",
      width: isScreenSizeLowerThanLG ? 300 : '',
      flex: isScreenSizeLowerThanLG ? 0 : 4,
      sortable: false,
      headerAlign: "center",
      renderCell: (params) => {
        const targetDate = new Date(params.row.timeCreated);
        const today = new Date();
        const threeDaysAgo = new Date(today);
        threeDaysAgo.setDate(today.getDate() - 3);
        const shouldDisplay = targetDate <= today && targetDate >= threeDaysAgo;

        return (
          <div className="table-manual" >
            <span className="title-underline">{params.row.fullName}</span>
            <div className="subtitle" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{params.row.email}
              {shouldDisplay && (
                <span className="ms-1" style={{ backgroundColor: 'green', width: '50px', height: '20px', color: 'white', paddingLeft: '5px', paddingRight: '5px', borderRadius: '3px' }}>Baru</span>
              )}
            </div>
            <p>{params.row.mobileNumber || "-"}</p>
            {view !== 'validators' && (
              <p>{params.row.phoneNumber || '-'}</p>
             )}
          </div>
        );
      },
    },
    view === 'user' && {
      field: "nsptki",
      headerName: "Lembaga",
      width: isScreenSizeLowerThanLG ? 350 : '',
      flex: isScreenSizeLowerThanLG ? 0 : 4,
      sortable: false,
      headerAlign: "center",
      align: "left",
      renderCell: (params) => {
        return (
          <div className="table-manual" style={{ textAlign: 'left' }}>
            <span className="title" style={{ textTransform: "capitalize", maxWidth: '100%' }}>
              {view === 'user' ? params.row.namaPerguruan || "-" : view === 'admin' ? translateRole(params.row.role) || "-" : params.row.lembaga}
            </span>
          </div>
        );
      },
    },
    view === 'asesor' && {
      field: "nsptki",
      headerName: "Lembaga",
      width: isScreenSizeLowerThanLG ? 350 : '',
      flex: isScreenSizeLowerThanLG ? 0 : 4,
      sortable: false,
      headerAlign: "center",
      align: "left",
      renderCell: (params) => {
        return (
          <div className="table-manual" style={{ textAlign: 'left' }}>
            <p className="title" style={{ textTransform: "capitalize", maxWidth: '100%' }}>
              {view === 'asesor' ? params.row.lembaga || "-" : view === 'admin' ? translateRole(params.row.role) || "-" : params.row.lembaga}
            </p>
            <p>
              {view === 'asesor' ? params.row.workUnit || "-" : view === 'admin' ? translateRole(params.row.role) || "-" : params.row.lembaga}
            </p>
          </div>
        );
      },
    },
    // view === 'validators' && {
    //   field: "nsptki",
    //   headerName: "Lembaga",
    //   width: isScreenSizeLowerThanLG ? 350 : '',
    //   flex: isScreenSizeLowerThanLG ? 0 : 4,
    //   sortable: false,
    //   headerAlign: "center",
    //   align: "left",
    //   renderCell: (params) => {
    //     return (
    //       <div className="table-manual" style={{ textAlign: 'left' }}>
    //         <span className="title" style={{ textTransform: "capitalize", maxWidth: '100%' }}>
    //           {view === 'validator' ? params.row.namaPerguruan || "-" : view === 'admin' ? translateRole(params.row.role) || "-" : params.row.lembaga}
    //         </span>
    //       </div>
    //     );
    //   },
    // },
    view === 'admin' && {
      field: "nsptki",
      headerName: "Lembaga",
      width: isScreenSizeLowerThanLG ? 350 : '',
      flex: isScreenSizeLowerThanLG ? 0 : 4,
      sortable: false,
      headerAlign: "center",
      align: "left",
      renderCell: (params) => {
        return (
          <div className="table-manual" style={{ textAlign: 'left' }}>
            <span className="title" style={{ textTransform: "capitalize", maxWidth: '100%' }}>
              {view === 'user' ? params.row.namaPerguruan || "-" : view === 'admin' ? translateRole(params.row.role) || "-" : params.row.lembaga}
            </span>
          </div>
        );
      },
    },
    view === 'asesor' && {
      field: "dokumen",
      headerName: "NIRA",
      // flex: 2.4,
      width: isScreenSizeLowerThanLG ? 350 : '',
      flex: isScreenSizeLowerThanLG ? 0 : 2.4,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className="table-manual">
            <button className="btn btn-none" onClick={() => fetchNiraData(params.row.id)}>
              <AssignmentIcon color="success" className="text-green" />
            </button>
          </div>
        );
      },
    },
    view === 'user' && {
      field: "dokumen",
      headerName: "Surat Tugas",
      // flex: 2.4,
      width: isScreenSizeLowerThanLG ? 350 : '',
      flex: isScreenSizeLowerThanLG ? 0 : 2.4,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className="table-manual">
            <button className="btn btn-none" onClick={() => fetchSuratTugasUser(params.row.id)}>
              <AssignmentIcon color="success" className="text-green" />
            </button>
          </div>
        );
      },
    },
    view === 'asesor' && {
      field: "tabungan",
      headerName: "Buku Tabungan",
      // flex: 2.4,
      width: isScreenSizeLowerThanLG ? 350 : '',
      flex: isScreenSizeLowerThanLG ? 0 : 2.4,
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className="table-manual">
            <button className="btn btn-none" onClick={() => fetchTabunganData(params.row.id)}>
              <ArticleIcon className="text-primary" />
            </button>
          </div>
        );
      },
    },
    view !== 'validators' && {
      field: "tgldaftar",
      headerName: "Tanggal Daftar",
      // flex: 2,
      width: isScreenSizeLowerThanLG ? 200 : '',
      flex: isScreenSizeLowerThanLG ? 0 : 3,
      sortable: false,
      headerAlign: "left",
      renderCell: (params) => {
        return (
          <div >
            <span className="title" >
              {new Date(params.row.timeCreated).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        );
      },
    },
    view !== 'admin' && view !== 'validators' && {
      field: "disetujui",
      headerName: "Disetujui Oleh",
      // flex: 2,
      width: isScreenSizeLowerThanLG ? 200 : '',
      flex: isScreenSizeLowerThanLG ? 0 : 2,
      sortable: false,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className="table-manual m-auto" >
            {params.row.approvedBy ? (
              <span className="title" style={{ textTransform: "capitalize" }}>
                {params.row.approvedBy.fullName}
              </span>
            ) : (
              <span className="title-danger">Belum disetujui</span>
            )}
          </div>
        );
      },
    },
    view !== 'admin' && view !== 'validators' && {
      field: "tgldisetujui",
      headerName: "Tgl Disetujui",
      // flex: 2,
      width: isScreenSizeLowerThanLG ? 200 : '',
      flex: isScreenSizeLowerThanLG ? 0 : 2,
      sortable: false,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div className="table-manual m-auto">
            {params.row.approvedBy ? (
              new Date(params.row.timeCreated).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            ) : (
              <span className="title-danger">Belum disetujui</span>
            )}
          </div>
        );
      },
    },
    {
      field: "aksi",
      headerName: "",
      // flex: 1.4,
      width: isScreenSizeLowerThanLG ? 130 : '',
      flex: isScreenSizeLowerThanLG ? 0 : 2.3,
      sortable: false,
      headerAlign: "center",
      renderCell: (params) => {
        let itemComponent = null;
        if (view === 'user') {
          itemComponent = (
            <DropdownAksi
              itemComponent={
                <>
                  {params.row.approvedBy ? (
                    <>
                      {/* <MenuItem onClick={() => handlePasswordReset(params.row.email)}>
                        Reset Password
                      </MenuItem> */}
                      <MenuItem
                        onClick={() => {
                          ConfirmationSwal(() => {
                            handleRejectUser(params.row.id);
                          });
                        }}
                      >
                        Hapus Akun User
                      </MenuItem>
                    </>
                  ) : (
                    <>
                      <MenuItem
                        onClick={() => {
                          ConfirmationSwal(() => {
                            handleApproveUser(params.row.id);
                          });
                        }}
                      >
                        Setujui User
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          ConfirmationSwal(() => {
                            handleRejectUser(params.row.id);
                          });
                        }}
                      >
                        Tolak User
                      </MenuItem>
                    </>
                  )}
                </>
              }
            />
          );
        } else if (view === 'asesor') {
          itemComponent = (
            <DropdownAksi
              itemComponent={
                <>
                  {params.row.approvedBy ? (
                    <>
                      {/* <MenuItem
                        onClick={() => handlePasswordReset(params.row.email)}>
                        Reset Password Evaluator
                      </MenuItem> */}
                      <MenuItem
                        onClick={() => {
                          ConfirmationSwal(() => {
                            handleRejectAsesor(params.row.id);
                          });
                        }}
                      >
                        Hapus Akun Evaluator
                      </MenuItem>
                    </>
                  ) : (
                    <>
                      <MenuItem
                        onClick={() => {
                          ConfirmationSwal(() => {
                            handleApproveAsesor(params.row.id);
                          });
                        }}
                      >
                        Setujui Evaluator
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          ConfirmationSwal(() => {
                            handleRejectAsesor(params.row.id);
                          });
                        }}
                      >
                        Tolak Evaluator
                      </MenuItem>
                    </>
                  )}

                </>
              }
            />
          );
        } else if (view === 'admin') {
          itemComponent = (
            <>
              <DropdownAksi
                itemComponent={
                  <>
                    {/* <MenuItem
                      onClick={() => handlePasswordReset(params.row.email)}>
                      Reset Password Admin
                    </MenuItem> */}
                    <MenuItem
                      onClick={() => {
                        ConfirmationSwal(() => {
                          handleRejectAdmin(params.row.id);
                        });
                      }}
                    >
                      Hapus Akun Admin
                    </MenuItem>
                  </>
                }
              />
            </>
          );
        } else if (view === 'validators') {
          itemComponent = (
            <>
              <DropdownAksi
                itemComponent={
                  <>
                    <MenuItem
                      onClick={() => {
                        ConfirmationSwal(() => {
                          handleRejectValidator(params.row.id);
                        });
                      }}
                    >
                      Hapus Akun Admin
                    </MenuItem>
                  </>
                }
              />
            </>
          );
        }
        return itemComponent;
      },
    }
  ];
  const [view1, setView1] = useState(0);
  const validationSchema = Yup.object({
    fullName: Yup.string()
      .required("Nama Lengkap harus diisi")
      .matches(/^[A-Za-z\s]+$/, "Nama hanya boleh diisi dengan huruf"),
    frontDegree: Yup.string()
      .required("Gelar Depan harus diisi")
      .matches(
        /^[A-Za-z\s.]+$/,
        "Gelar Depan hanya boleh diisi dengan huruf  dan Titik"
      ),
    backDegree: Yup.string()
      .required("Gelar Belakang harus diisi")
      .matches(
        /^[A-Za-z\s.]+$/,
        "Gelar Belakang hanya boleh diisi dengan huruf dan Titik"
      ),
    nipNumber: Yup.string()
      .required("NIP harus diisi")
      .matches(/^[0-9]+$/, "NIP hanya boleh diisi dengan angka"),
    npwpNumber: Yup.string()
      .required("NPWP harus diisi")
      .matches(/^[0-9]+$/, "NPWP hanya boleh diisi dengan angka"),
    nira: Yup.string()
      .required("NIRA harus diisi")
      .matches(/^[0-9]+$/, "NIRA hanya boleh diisi dengan angka"),
    bornPlace: Yup.string()
      .required("Tempat Tanggal Lahir harus diisi")
      .matches(/^[A-Za-z\s]+$/, "Tempat Lahir hanya boleh diisi dengan huruf"),
    bornDate: Yup.string().required("Tempat Tanggal Lahir harus diisi"),
    namaBankRek: Yup.string().required("Nama Bank harus diisi").matches(/^[A-Za-z\s]+$/, "Nama Bank hanya boleh diisi dengan huruf"),
    namaRek: Yup.string().required("Nama Rekening harus diisi").matches(/^[A-Za-z\s]+$/, "Nama Rekening hanya boleh diisi dengan huruf"),
    gender: Yup.number().required("Jenis Kelamin harus dipilih"),
    pangkat: Yup.number().required("Pangkat Golongan harus dipilih"),
    lastEducation: Yup.number().required("Pendidikan Terakhir harus dipilih"),
    officeAddress: Yup.string()
      .required("Alamat harus diisi")
      .matches(/^[A-Za-z\s]+$/, "Alamat Kantor hanya boleh diisi dengan huruf"),
    lembaga: Yup.string()
      .required("Lembaga harus diisi")
      .matches(/^[A-Za-z\s]+$/, "Lembaga hanya boleh diisi dengan huruf"),
    workUnit: Yup.string()
      .required("Unit Kerja harus diisi")
      .matches(/^[A-Za-z\s]+$/, "Unit Kerja hanya boleh diisi dengan huruf"),
    noRek: Yup.string()
      .required("No. Rekening harus diisi")
      .matches(/^[0-9]+$/, "Nomor Rekening boleh diisi dengan angka"),
    mobileNumber: Yup.string()
      .required("Nomor Telepon harus diisi")
      .matches(/^[0-9]+$/, "Nomor Rekening boleh diisi dengan angka"),

    phoneNumber: Yup.string()
      .required("Nomor Telepon harus diisi"),
    email: Yup.string()
      .required("Email harus diisi")
      .email("Format email tidak valid"),
    password: Yup.string().required("Password harus diisi"),
    passwordConfirm: Yup.string()
      .required("Konfirmasi Password harus diisi")
      .oneOf([Yup.ref("password"), null], "Konfirmasi Password tidak sesuai"),
  });
  const formik = useFormik({
    initialValues: {
    },
    validationSchema,
  });
  function formatPhoneNumber(value) {
    if (!value) return value;
    let formattedValue = value.replace(/[^\d]/g, "");
    if (formattedValue.startsWith("021")) {
      formattedValue = `(021)${formattedValue.substr(3)}`;
    } else if (formattedValue.startsWith("62")) {
      formattedValue = `+62 ${formattedValue.substr(2)}`;
    } else if (formattedValue.startsWith("08")) {
      formattedValue = `+62 ${formattedValue.substr(1)}`;
    }
    if (formattedValue.length === 12) {
      const areaCode = formattedValue.substring(1, 4);
      const firstDigits = formattedValue.substring(5, 8);
      const lastDigits = formattedValue.substring(8);
      formattedValue = `(${areaCode}) ${firstDigits} ${lastDigits}`;
    }
    return formattedValue;
  }
  const handleMobilePhone = (value, country) => {
    let mobileNumber = value;
    if (country.countryCode === "ID") {
      mobileNumber = value.slice(0, 15);
    } else {
      mobileNumber = value.slice(0, 18);
    }
    formik.setFieldValue("mobileNumber", mobileNumber);
  };
  const isButtonPrevVisible = view1 === 1 || view1 === 2;
  const isDataEmpty = Object.values(formik.values).every((value) => !value);
  const handleNext = () => {
    if (isDataEmpty) {
      formik.setTouched(
        Object.keys(formik.values).reduce((touched, key) => {
          touched[key] = true;
          return touched;
        }, {})
      );
    } else {
      if (view1 === 3) {
        formik.validateForm().then((valid) => {
          if (valid && Object.keys(formik.errors).length === 0) {
            formik.handleSubmit();
          }
        });
      } else {
        setView1(view1 + 1);
      }
    }
  };
  const handlePrev = () => {
    switch (view1) {
      case 1:
        setView1(0);
        break;
      case 2:
        setView1(1);
        break;
      case 3:
        setView1(2);
        break;
      default:
        break;
    }
  };
  const isLastStep = view1 === 3;
  const options = [
    "BANK BRI",
    "BANK EKSPOR INDONESIA",
    "BANK MANDIRI",
    "BANK MANDIRI SYARIAH",
    "BANK BNI",
    "BANK DANAMON",
    "BANK PERMATA",
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
    "ING INDONESIA BAN",
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
    "DEUTSCHE BANK AG",
    "BANK WOORI INDONESIA",
    "BANK OF CHINA LIMITED",
    "BANK BUMI ARTA",
    "BANK EKONOMI",
    "BANK ANTARDAERAH",
    "BANK HAGA",
    "BANK IFI",
    "BANK CENTURY, TBK",
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
    "BANK JASA JAKARTA",
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
    "LINKAJA"
  ];
  // create open modal
  const [open1, setOpen1] = useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

  const [openValidator, setOpenValidator] = useState(false);
  const handleOpenValidator = () => setOpenValidator(true);
  const handleCloseValidator = () => setOpenValidator(false);

  const [role, setRole] = useState(0)
  const [email, setEmail] = useState('')
  const [fullname, setFullname] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [password, setPassword] = useState('')



  const [loadingValidator, setLoadingValidator] =  useState(false)
  const [roleValidator, setRoleValidator] = useState(0);
  const [genderValidator, setGenderValidator] = useState(0);
  const [namaBankRekValidator, setNamaBankRekValidator] = useState('xxx');
  const [noRekValidator, setNoRekValidator] = useState('000');
  const [nipNumberValidator, setNipNumberValidator] = useState('');
  const [npwpNumberValidator, setNpwpNumberValidator] = useState('');
  const [namaRekValidator, setNamaRekValidator] = useState('xxx');
  const [emailValidator, setEmailValidator] = useState('');
  const [fullnameValidator, setFullnameValidator] = useState('');
  const [mobileNumberValidator, setMobileNumberValidator] = useState('');
  const [passwordValidator, setPasswordValidator] = useState('Sarolangun99@');
  const handleChange = (event) => {
    setRole(event.target.value);
  };
  const handleCreateUser = async () => {
    const token = getToken()
    const defaultValues = {
      gender: 0,
      nira: "string",
      namaBankRek: "string",
      noRek: "string",
      namaRek: "string",
      phoneNumber: "string",
      officeAddress: "string",
      lembaga: "string",
      workUnit: "string",
      lastEducation: 0,
      nipNumber: "string",
      bornDate: new Date().toISOString(),
      bornPlace: "string",
      frontDegree: "string",
      backDegree: "string",
      npwpNumber: "string",
      pangkat: 0,
    };

    const payload = {
      ...defaultValues,
      role,
      fullname,
      mobileNumber,
      status: 1,
      email,
      password,
    };
    try {
      const response = await api.post('/user/admin', payload, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'User Created Successfully',
          text: 'The user has been created successfully.',
          showConfirmButton: false,
          timer: 1000
        });
        handleClose1();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Unexpected response status.',
        });
      }
      fetchManagement();
      handleClose1();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.message || 'Validation error';
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage,
        });
        fetchManagement();
        handleClose1();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while creating the user.',
        });
        fetchManagement();
        handleClose1();
      }
    }
  };
  const handleCreateValidator = async () => {
    setLoadingValidator(true)
    const token = getToken()
    const payload = {
      fullName: fullnameValidator,
      gender: genderValidator,
      role: parseInt(roleValidator),
      namaBankRek: namaBankRekValidator,
      noRek: noRekValidator,
      namaRek: namaRekValidator,
      mobileNumber: mobileNumberValidator,
      nipNumber: nipNumberValidator,
      npwpNumber: npwpNumberValidator,
      email: emailValidator,
      password: "12345",
      status: 0
    };

    try {
      const response = await api.post('/user/validator', payload, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'User Created Successfully',
          text: 'The user has been created successfully.',
          showConfirmButton: false,
          timer: 1000
        });
        handleCloseValidator();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Unexpected response status.',
        });
      }
      fetchManagement();
      handleCloseValidator();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.message || 'Validation error';
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage,
        });
        fetchManagement();
        handleCloseValidator();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while creating the user.',
        });
        fetchManagement();
        handleCloseValidator();
      }
    } finally {
      setLoadingValidator(false)
    }
  };
  useEffect(() => {
    if (loading) {
      fetchManagement(view);
    }
  }, [loading, view]);
  const handleViewChange = (newView) => {
    setview(newView);
    setLoading(true);
  };
  useEffect(() => {
    fetchManagement(view);
  }, []);
  const { darkMode } = useDarkMode();
  const style1 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: darkMode ? "#3C5B6F" : "background.paper",
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
  };
  return (
    <>
      <Helmet>
        <title>Kemenag | Management User </title>
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="ms-4">
          <div className="d-flex mb-2">
            <h2 className="jdl" style={{ color: darkMode ? "white" : "" }} data-aos="zoom-in-right" data-aos-duration="1000">
              Manajemen User Validator
            </h2>
          </div>
        </div>

        <div className="d-flex">
          <button
            className={`btn  border-0`}
            onClick={() => handleViewChange("validators")}
            style={{
              backgroundColor: view === "validators"
                ? (darkMode ? "#3C5B6F" : "white")
                : (darkMode ? "transparent" : ""),
              color: view === "validators"
                ? (darkMode ? "white" : "black")
                : (darkMode ? "white" : "black"),
              boxShadow: "none",
            }}
          >
            <span role="img" aria-label="Daftar Validator" style={{ marginRight: "5px", fontSize: "22px" }}>🕵️</span>
            Daftar Validator
            {loading && view === "validators" && <ClipLoader size={18} className="ms-1 mt-2" />}
          </button>
        </div>

        <ContentCard>
          <div className="row ms-2">
            <div className="col-12">
              <h3 className="mb-2 mt-3" style={{ color: darkMode ? "white" : "grey" }}>
                Daftar{" "}
                {view === "user"
                  ? "User"
                  : view === "asesor"
                    ? "Evaluator"
                    : view === "validators"
                      ? "Validator"
                      : "Admin"}
              </h3>
            </div>

            <div className="row mt-5 d-flex">
              <div className="col-md-6 col-3">
                <Button
                  variant="outlined"
                  style={{ color: darkMode ? "white" : "grey", borderColor: darkMode ? "white" : "grey" }}
                  size="small"
                  onClick={() => exportToExcel(rows, view)}
                >
                  <FileUploadIcon />
                  {isScreenSizeLowerThanMD ? '' : `Export`}
                </Button>
              </div>

              <div className="col-6 gap-3 d-flex">
                {view === 'admin' ? (
                  <>
                    <Button onClick={() => handleOpen1(true)} className="px-3" variant="contained" size="small"><PersonAddIcon className="me-1" />Tambah</Button>
                  </>
                ) : null}
                {view === 'validators' ? (
                  <>
                    <Button onClick={() => handleOpenValidator(true)} className="px-3" variant="contained" size="small"><PersonAddIcon className="me-1" />Tambah</Button>
                  </>
                ) : null}
                <div
                  className="input-group flex-nowrap"
                  data-aos="zoom-in-left"
                  data-aos-duration="1000"
                >
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Pencarian"
                    aria-label="UserName"
                    aria-describedby="addon-wrapping"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-3">
                <AsyncTable
                  loading={loading}
                  rows={filteredRows}
                  columns={userColumns}
                />
              </div>
            </div>
          </div>
        </ContentCard>

        {/* Modal */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h1
                  className="modal-title fs-5"
                  id="exampleModalLabel"
                  data-aos="zoom-in-right"
                  data-aos-duration="1000"
                >
                  Formulir Registrasi Administrator
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="d-flex mb-3">
                  <label
                    style={{
                      fontWeight: "600",
                      fontSize: "16px",
                    }}
                    className="mt-1 text-dark"
                  >
                    Kategori Administrator
                  </label>
                  <select
                    className="form-select ms-auto"
                    aria-label="Default select example"
                  >
                    <option>Pilih Admin</option>
                    <option>xx</option>
                  </select>
                </div>
                <div className="d-flex mb-3">
                  <label
                    style={{
                      fontWeight: "600",
                      fontSize: "16px",
                    }}
                    className=" mt-1 text-dark"
                  >
                    Jika Admin Kopertais
                  </label>
                  <select
                    className="form-select ms-auto"
                    aria-label="Default select example"
                  >
                    <option>Pilih Kopertais</option>
                    <option>xxx</option>
                  </select>
                </div>
                <div className="d-flex mb-3">
                  <label
                    style={{
                      fontWeight: "600",
                      fontSize: "16px",
                    }}
                    className="mt-1 text-dark"
                  >
                    Nama
                  </label>
                  <input
                    type="text"
                    className="form-control formsr ms-auto"
                    id="exampleFormControlInput1"
                    placeholder="Masukan Nama"
                  />
                </div>
                <div className="d-flex mb-3">
                  <label
                    style={{
                      fontWeight: "600",
                      fontSize: "16px",
                    }}
                    className="mt-1 text-dark"
                  >
                    Gelar Depan
                  </label>

                  <input
                    type="text"
                    className="form-control formsd ms-auto me-5"
                    id="exampleFormControlInput1"
                    placeholder="Gelar Depan"
                  />
                  <input
                    type="text"
                    className="form-control formsd "
                    id="exampleFormControlInput1"
                    placeholder="Gelar Belakang"
                  />
                </div>
                <div className="d-flex mb-3">
                  <label
                    style={{
                      fontWeight: "600",
                      fontSize: "16px",
                    }}
                    className="mt-1 text-dark"
                  >
                    Tempat, Tanggal Lahir
                  </label>

                  <input
                    type="text"
                    className="form-control formsd ms-auto me-5"
                    id="exampleFormControlInput1"
                    placeholder="Tempat Lahir"
                  />
                  <input
                    type="date"
                    className="form-control formsd "
                    id="exampleFormControlInput1"
                    placeholder="Tanggal Lahir"
                  />
                </div>
                <div className="d-flex mb-3">
                  <label
                    style={{
                      fontWeight: "600",
                      fontSize: "16px",
                    }}
                    className="mt-1 text-dark"
                  >
                    NIP/NPWP
                  </label>

                  <input
                    type="text"
                    className="form-control formsd ms-auto me-5"
                    id="exampleFormControlInput1"
                    placeholder="NIP"
                  />
                  <input
                    type="date"
                    className="form-control formsd "
                    id="exampleFormControlInput1"
                    placeholder="NPWP"
                  />
                </div>
                <div className="d-flex mb-3">
                  <label
                    style={{
                      fontWeight: "600",
                      fontSize: "16px",
                    }}
                    className="mt-1 text-dark"
                  >
                    Pangkat Golongan
                  </label>
                  <select
                    className="form-select ms-auto"
                    aria-label="Default select example"
                  >
                    <option>Pangkat Golongan</option>
                    <option>xx</option>
                  </select>
                </div>
                <div className="d-flex mb-3">
                  <label
                    style={{
                      fontWeight: "600",
                      fontSize: "16px",
                    }}
                    className="mt-1 text-dark"
                  >
                    Pendidikan Terakhir
                  </label>
                  <select
                    className="form-select ms-auto"
                    aria-label="Default select example"
                  >
                    <option>Pendidikan Terakhir</option>
                    <option>xx</option>
                  </select>
                </div>
                <div className="d-flex  mb-3">
                  <label
                    style={{
                      fontWeight: "600",
                      fontSize: "16px",
                    }}
                    className="mt-1 text-dark"
                  >
                    Unit Kerja
                  </label>
                  <input
                    type="text"
                    className="form-control formsr ms-auto"
                    id="exampleFormControlInput1"
                    placeholder="Masukan Unit Kerja"
                  />
                </div>
                <div className="d-flex  mb-3">
                  <label
                    style={{
                      fontWeight: "600",
                      fontSize: "16px",
                    }}
                    className="mt-1 text-dark"
                  >
                    Alamat Kantor
                  </label>
                  <textarea
                    style={{
                      height: "100px",
                      width: "900px",
                      border: "2px solid rgb(206, 206, 206)",
                      borderRadius: "7px",
                    }}
                    type="text"
                    className=" ms-auto"
                    id="exampleFormControlInput1"
                    placeholder="Masukan Alamat Kerja"
                  />
                </div>
                <div className="d-flex mb-3">
                  <label
                    style={{
                      fontWeight: "600",
                      fontSize: "16px",
                    }}
                    className="mt-1 text-dark"
                  >
                    Telepon
                  </label>

                  <input
                    type="tel"
                    className="form-control formsd ms-auto me-5"
                    id="exampleFormControlInput1"
                    placeholder="Telp"
                  />
                  <input
                    type="tel"
                    className="form-control formsd "
                    id="exampleFormControlInput1"
                    placeholder="HP"
                  />
                </div>
                <div className="d-flex  mb-3">
                  <label
                    style={{
                      fontWeight: "600",
                      fontSize: "16px",
                    }}
                    className="mt-1 text-dark"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control formsr ms-auto"
                    id="exampleFormControlInput1"
                    placeholder="Masukan Email"
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary ps-5 pe-5"
                  data-bs-dismiss="modal"
                >
                  Batal
                </button>
                <button type="button" className="btn btn-primary submit">
                  Daftar Admin
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* modal tambah validator */}
        <Modal
          open={openValidator}
          onClose={handleCloseValidator}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style1}>
            <IconButton
              sx={{ position: "absolute", top: 5, right: 5 }}
              onClick={handleCloseValidator}
              aria-label="close"
            >
              <HighlightOffIcon color="error" />
            </IconButton>
            <Typography sx={{ fontSize: '22px', fontWeight: '600', color: darkMode ? "white" : "" }}
            >TAMBAH AKUN VALIDATOR</Typography>
            <div>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Nama Lengkap"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={fullnameValidator}
                    onChange={(e) => setFullnameValidator(e.target.value)}
                    style={{ background: darkMode ? "white" : "" }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Nomor HP"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="number"
                    value={mobileNumberValidator}
                    onChange={(e) => setMobileNumberValidator(e.target.value)}
                    style={{ background: darkMode ? "white" : "" }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="email"
                    value={emailValidator}
                    onChange={(e) => setEmailValidator(e.target.value)}
                    style={{ background: darkMode ? "white" : "" }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="gender-select-label">Role</InputLabel>
                    <Select
                      labelId="gender-select-label"
                      value={roleValidator}
                      onChange={(e) => setRoleValidator(e.target.value)}
                      label="Jenis Kelamin"
                      style={{ background: darkMode ? "white" : "" }}
                    >
                      <MenuItem value={0}>Admin Validator</MenuItem>
                      <MenuItem value={1}>Admin Validator Lamdik</MenuItem>
                      <MenuItem value={2}>Admin Validator Lamemba</MenuItem>
                      <MenuItem value={3}>Admin Validator Banpt</MenuItem>
                      <MenuItem value={11}>Validator Lamdik</MenuItem>
                      <MenuItem value={12}>Validator Lamemba</MenuItem>
                      <MenuItem value={13}>Validator Banpt</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="gender-select-label">Jenis Kelamin</InputLabel>
                    <Select
                      labelId="gender-select-label"
                      value={genderValidator}
                      label="Jenis Kelamin"
                      onChange={(e) => setGenderValidator(e.target.value)}
                      style={{ background: darkMode ? "white" : "" }}
                    >
                      <MenuItem value={0}>Laki-laki</MenuItem>
                      <MenuItem value={1}>Perempuan</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Nama Bank Rekening"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={namaBankRekValidator}
                    onChange={(e) => setNamaBankRekValidator(e.target.value)}
                    style={{ background: darkMode ? "white" : "" }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Nomor Rekening"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={noRekValidator}
                    onChange={(e) => setNoRekValidator(e.target.value)}
                    style={{ background: darkMode ? "white" : "" }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Nama Rekening"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={namaRekValidator}
                    onChange={(e) => setNamaRekValidator(e.target.value)}
                    style={{ background: darkMode ? "white" : "" }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="NIP"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={nipNumberValidator}
                    onChange={(e) => setNipNumberValidator(e.target.value)}
                    style={{ background: darkMode ? "white" : "" }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="NPWP"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={npwpNumberValidator}
                    onChange={(e) => setNpwpNumberValidator(e.target.value)}
                    style={{ background: darkMode ? "white" : "" }}
                  />
                </Grid>
                {/* <Grid item xs={12} sm={12}>
                  <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="password"
                    value={passwordValidator}
                    onChange={(e) => setPasswordValidator(e.target.value)}
                    style={{ background: darkMode ? "white" : "" }}
                  />
                </Grid> */}
              </Grid>
            </div>

            <div className='d-flex justify-end ms-auto mt-4'>
              <Button
                variant="contained"
                color="primary"
                size='small'
                className='px-4 py-2 ms-auto'
                onClick={handleCreateValidator}
              >
                <AddIcon /> {loadingValidator ? 'loading..' : 'Tambah'} 
              </Button>
            </div>
          </Box>
        </Modal>
      </motion.div>
      {/* tabungan */}
      <Modal
        open={openTabunganModal}
        onClose={handleCloseTabunganModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style1}>
          <IconButton
            sx={{ position: "absolute", top: 5, right: 5 }}
            onClick={handleCloseTabunganModal}
            aria-label="close"
          >
            <HighlightOffIcon color="error" />
          </IconButton>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <h4 style={{ color: darkMode ? "white" : "" }}>Buku Tabungan</h4>
            {tabunganData ? (
              <>
                <img src={tabunganData} alt="Buku Tabungan" style={{ width: '100%' }} />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, width: '100%' }}
                  href={tabunganData}
                  download="Buku_Tabungan.png"
                >
                  Download Image
                </Button>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </Typography>
        </Box>
      </Modal>

      {/* nira */}
      <Modal
        open={openNiraModal}
        onClose={handleCloseNiraModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style1}>
          <IconButton
            sx={{ position: "absolute", top: 5, right: 5 }}
            onClick={handleCloseNiraModal}
            aria-label="close"
          >
            <HighlightOffIcon color="error" />
          </IconButton>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <h4 style={{ color: darkMode ? "white" : "" }}>NIRA Document</h4>
            {niraData ? (
              <>
                <Worker workerUrl={`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`}>
                  <Viewer fileUrl={niraData} />
                </Worker>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, width: '100%' }}
                  href={niraData}
                  download="NIRA_Document.pdf"
                >
                  Download PDF
                </Button>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </Typography>
        </Box>
      </Modal>

      <Modal
        open={openSurtugUserModal}
        onClose={handleCloseSurtugUserModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxWidth: '1000px',
            maxHeight: '80vh',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            overflow: 'auto',
          }}
        >
          <IconButton
            sx={{ position: "absolute", top: 5, right: 5 }}
            onClick={handleCloseSurtugUserModal}
            aria-label="close"
          >
            <HighlightOffIcon color="error" />
          </IconButton>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <h4 style={{ color: darkMode ? "white" : "" }}>Surat Tugas PTKI Document</h4>
            {surtugUserData ? (
              <>
                <div style={{ height: 'calc(70vh - 100px)', overflow: 'auto' }}>
                  <Worker workerUrl={`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`}>
                    <Viewer fileUrl={surtugUserData} />
                  </Worker>
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, width: '100%' }}
                  href={surtugUserData}
                  download="Surat_Tugas_PTKI_Document.pdf"
                >
                  Download
                </Button>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default BerandaKasubdit;
