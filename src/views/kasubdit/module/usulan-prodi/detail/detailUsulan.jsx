import React, { useEffect, useState } from "react";
import "../../../../../views/ptki/admin.css";
import HeroTitle from "../../../../../components/hero-title/HeroTitle";
import ContentContainer from "../../../../../components/card-container/ContentContainer";
import ContentCard from "../../../../../components/card-content/ContentCard";
import "../../../../../components/header-content/ContentHeader.css";
import { getToken, isAuth, getRole, getUserId } from "../../../../../utils/token";
import { useParams } from 'react-router-dom';
import { GetApiBaseUrl } from "../../../../../utils/env";
import axios from "axios"
import { ErrorSwal, StartLoading, CloseLoading } from "../../../../../utils/swal2";
import Button from "@mui/material/Button";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../../../service/api";
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import CheckIcon from "../../../../../components/icons/CheckIcon";
import XLgIcon from "../../../../../components/icons/XLgIcon";
import ExclamationCircleIcon from "../../../../../components/icons/ExclamationCircleIcon";
import { BeatLoader } from 'react-spinners';
import { css } from '@emotion/react';
import ReactDOMServer from 'react-dom/server';
import CheckCircleIcon from "../../../../../components/icons/CheckCircleIcon";
import ProdiActionName from "../../../../../utils/status";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import IconButton from "@mui/material/IconButton";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from "@mui/material/Paper";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import DownloadIcon from '@mui/icons-material/Download';
import Modal from '@mui/material/Modal';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { motion } from 'framer-motion';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { useDarkMode } from "../../../../../utils/DarkModeContext";
import CancelIcon from '@mui/icons-material/Cancel';
import { InputSwal4 } from "../../../../../utils/swal2";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


const DetailUsulan = () => {
  const token = getToken();
  const auth = isAuth();
  const baseUrl = GetApiBaseUrl();
  const [view, setView] = useState(0);
  const { id } = useParams();
  const [root, setRoot] = useState(null);
  const [tableLoading, setTableLoading] = useState(false);
  const [rows, setRows] = useState([])
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [sesuai, setSesuai] = useState(1);
  const [dapatDibaca, setDapatDibaca] = useState(2);
  const [utuh, setUtuh] = useState(2);
  const [dapatDipercaya, setDapatDipercaya] = useState(2);
  const [komentar, setKomentar] = useState('');

  const handleClickOpen = async (kode) => {
    const selectedRow = rows.find((row) => row.kode === kode);
    console.log('kode', selectedRow);
    const notes = selectedRow.notes;
    console.log('notes', notes);
    if (selectedRow) {
      const statusValue = selectedRow.status.toString();
      console.log("Status Value:", statusValue);
      setSesuai(parseInt(statusValue[0]) || 2);
      setDapatDibaca(parseInt(statusValue[1]) || 2);
      setUtuh(parseInt(statusValue[2]) || 2);
      setDapatDipercaya(parseInt(statusValue[3]) || 2);
      setKomentar(selectedRow.notes || '');
    } else {
      console.log("Selected row not found");
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchDokumen = (jenjang) => {
    setTableLoading(true);
    axios
      .get(`${baseUrl}/dokumen-prodi/${jenjang}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        if (response.data.status === 200) {
          const result = response.data.data;
          setRows(result);
        } else {
          ErrorSwal("Fetching Data Failed")
        }
      })
      .catch(() => {
        ErrorSwal("Fetching Data Failed")
      }).finally(() => setTableLoading(false))
  }
  const beatLoaderHtml = ReactDOMServer.renderToString(
    <BeatLoader css={override} size={15} color={'#4caf50'} loading={true} />
  );
  const [fileUrl, setFileUrl] = useState(null)
  const [loadingDownloadFile, setLoadingDownloadFile] = useState(null)
  const handleDownloadFile = async (kode) => {
    // Swal.fire({
    //   title: 'Download...',
    //   text: 'Sedang Proses Download File...',
    //   html: beatLoaderHtml,
    //   allowOutsideClick: false,
    //   showConfirmButton: false,
    // });
    setLoadingDownloadFile(true)
    try {
      const response = await api.get(`/req-prodi/prodi-doc-file/${id}/${kode}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      });
      console.log('response header', response.headers)
      if (response.status === 200) {
        // Swal.close();
        const contentDispositionHeader = response.headers['content-disposition'];
        const filename = contentDispositionHeader.split('filename=')[1]?.trim() || 'prodi.xlsx';

        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const downloadUrl = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = filename;

        link.click();
        window.URL.revokeObjectURL(downloadUrl);
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
        handleClose()
      } else {
        // Handle other types of errors
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `${error.message}`
        });
        handleClose()
      }
    } finally {
      setLoadingDownloadFile(false)
    }
  };

  const handleDownloadFileView = async (kode) => {
    Swal.fire({
      title: 'Loading...',
      text: 'Sedang Proses Lihat File...',
      html: beatLoaderHtml,
      allowOutsideClick: false,
      showConfirmButton: false,
    });

    try {
      const response = await api.get(`/req-prodi/prodi-doc-file/${id}/${kode}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      });

      if (response.status === 200) {
        Swal.close();
        const contentDispositionHeader = response.headers['content-disposition'];
        let filename = 'prodi.xlsx';

        if (contentDispositionHeader) {
          const matches = contentDispositionHeader.match(/filename="(.+)"/);
          if (matches && matches.length === 2) {
            filename = decodeURIComponent(matches[1]);
          }
        }

        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const objectUrl = window.URL.createObjectURL(blob);

        // Create a new tab or window with a document containing the filename
        const newWindow = window.open('', '_blank');
        newWindow.document.write(`<html><head><title>${filename}</title></head><body></body></html>`);
        newWindow.document.title = filename;

        // Open the PDF file in the new tab or window
        newWindow.location.href = objectUrl;

        // Revoke the object URL to free up resources
        window.URL.revokeObjectURL(objectUrl);
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
        handleClose()
      } else {
        // Handle other types of errors
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `${error.message}`
        });
        handleClose()
      }
    }
  };

  const handleDownloadAllFile = async (newCode) => {
    Swal.fire({
      title: 'Download...',
      text: 'Sedang Proses Download File...',
      html: beatLoaderHtml,
      allowOutsideClick: false,
      showConfirmButton: false,
    });
    try {
      const response = await api.get(`/req-prodi/prodi-doc-files/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      });

      if (response.status === 200) {
        Swal.close();
        const contentDispositionHeader = response.headers['content-disposition'];
        const filename = contentDispositionHeader.split('filename=')[1]?.trim() || 'prodi.xlsx';

        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const downloadUrl = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = filename;

        link.click();
        window.URL.revokeObjectURL(downloadUrl);
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
        handleClose()
      } else {
        // Handle other types of errors
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `${error.message}`
        });
        handleClose()
      }
    }
  };
  const [isLoading, setIsLoading] = useState(false);
  const fetchProdi = () => {
    StartLoading();
    setIsLoading(true);
    axios
      .get(`${baseUrl}/req-prodi/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        if (response.data.status === 200) {
          const result = response.data.data;
          setRows(result.prodiDocuments);
          // setKomentar(result.prodiDocuments?.notes ? result.prodiDocuments?.notes : '-')
          // setSesuai(result.prodiDocuments?.status?.[0])
          // console.log('sesuai', result.prodiDocuments?.status?.[0])
          setRoot(result)
          console.log("Prodi Documents:", result.prodiDocuments);
          CloseLoading();
        } else {
          ErrorSwal("Fetching Data Failed")
        }
      })
      .catch(() => {
        ErrorSwal("Fetching Data Failed")
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      handleApproveSKDone(id, selectedFile);
    }
  };
  const handleApproveSKDone = (id, file) => {
    StartLoading();
    const code = localStorage.getItem('code_upload');
    const formData = new FormData();
    formData.append('file', file);
    axios
      .post(
        `${baseUrl}/req-prodi/prodi-doc/${id}/${code}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then(async (response) => {
        if (response.status === 200) {
          await Swal.fire({
            icon: 'success',
            title: 'Success',
            text: response.data.message,
            timer: 1500,
            showConfirmButton: false
          });
          fetchProdi();
        }
      })
      .catch((error) => {
        if (error.response) {
          Swal.fire({
            icon: 'error',
            title: 'Gagal Konfirmasi',
            text: error.response.data.message,
          });
        } else {
          ErrorSwal('Gagal Konfirmasi', 'Terjadi kesalahan');
        }
      });
  };

  const handleSubmitToUser = (kode) => {
    StartLoading();
    axios
      .put(
        `${baseUrl}/req-prodi/prodi-doc/${id}/${kode}?status=1`, null,
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
  }

  const handleRejectToUser = (kode) => {
    const note = `${komentar}`;
    const status = `${sesuai}${dapatDibaca}${utuh}${dapatDipercaya}`;
    console.log('status', status)

    // 2 (belum menandai)
    setOpen(true)
    StartLoading();
    axios
      .put(
        `${baseUrl}/req-prodi/prodi-doc/${id}/${kode}?status=${status}&notes=${note}`,
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
          setOpen(false)
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
        setOpen(false)
      })
  };
  const [showAdditionalDivs, setShowAdditionalDivs] = useState(false);
  const handleSesuaiChange = (e) => {
    const value = parseInt(e.target.value);
    setSesuai(value);
    if (value === 1) {
      setDapatDibaca(1);
      setUtuh(1);
      setDapatDipercaya(1);
    }
    if (value === 9) {
      setShowAdditionalDivs(true);
    } else {
      setShowAdditionalDivs(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await InputSwal4(
        'Konfirmasi untuk proses selanjutnya',
        'Masukkan catatan tambahan...',
        async (formValues) => {
          try {
            StartLoading();
            const note = formValues || ""; 

            const response = await axios.post(
              `${baseUrl}/prodi/approve/${id}`,
              {
                note: note,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            console.log('approve', response);

            if (response.data && response.data.status === 200) {
              await Swal.fire({
                icon: "success",
                title: "Success",
                text: response.data.message || "Approval successful",
                timer: 3000
              });
              fetchProdi();
            } else {
              throw new Error("Unexpected response");
            }
          } catch (error) {
            console.error('Error in handleApprove:', error);
            if (error.response) {
              await Swal.fire({
                icon: "error",
                title: "Gagal Konfirmasi",
                text: error.response.data.message || "Terjadi kesalahan",
              });
            } else {
              await ErrorSwal("Gagal Konfirmasi", "Terjadi kesalahan");
            }
          } finally {
            StopLoading(); // Ensure loading is stopped regardless of success or failure
          }
        }
      );
    } catch (error) {
      console.error('Error in InputSwal2:', error);
      // Handle any errors that occur during the InputSwal2 process
      await ErrorSwal("Gagal Memulai Konfirmasi", "Terjadi kesalahan saat memulai proses konfirmasi");
    }
  };

  const handleRejectWithNote = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Konfirmasi Penolakan',
        html: `
        <style>
          .custom-select-container {
            position: relative;
            width: 100%;
            margin-bottom: 1rem;
          }
          .custom-select {
            appearance: none;
            -webkit-appearance: none;
            width: 100%;
            padding: 10px 15px;
            font-size: 16px;
            border: 1px solid #ddd;
            border-radius: 5px;
            background-color: white;
            cursor: pointer;
          }
          .custom-select:focus {
            outline: none;
            border-color: #3085d6;
            box-shadow: 0 0 0 2px rgba(48,133,214,0.2);
          }
          .custom-select-arrow {
            position: absolute;
            top: 50%;
            right: 15px;
            transform: translateY(-50%);
            width: 0;
            height: 0;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-top: 5px solid #888;
            pointer-events: none;
          }
          .custom-textarea {
            width: 100%;
            padding: 10px;
            font-size: 16px;
            border: 1px solid #ddd;
            border-radius: 5px;
            resize: vertical;
            min-height: 100px;
            margin-top: 1rem;
          }
          .custom-textarea:focus {
            outline: none;
            border-color: #3085d6;
            box-shadow: 0 0 0 2px rgba(48,133,214,0.2);
          }
        </style>
        <div class="custom-select-container">
          <select id="rejectReason" class="custom-select">
            <option value="">Pilih alasan penolakan</option>
            <option value="default">Usul pembukaan prodi belum memenuhi persyaratan dan dikembalikan ke pengusul</option>
            <option value="other">Lainnya</option>
          </select>
          <div class="custom-select-arrow"></div>
        </div>
        <div id="customNoteContainer" style="display: none;">
          <textarea id="customNote" class="custom-textarea" placeholder="Masukkan alasan penolakan..."></textarea>
        </div>
      `,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Ya, Tolak',
        cancelButtonText: 'Batal',
        didOpen: () => {
          const selectElement = document.getElementById('rejectReason');
          const customNoteContainer = document.getElementById('customNoteContainer');

          selectElement.addEventListener('change', (e) => {
            if (e.target.value === 'other') {
              customNoteContainer.style.display = 'block';
            } else {
              customNoteContainer.style.display = 'none';
            }
          });
        },
        preConfirm: () => {
          const selectElement = document.getElementById('rejectReason');
          const customNoteElement = document.getElementById('customNote');

          if (!selectElement.value) {
            Swal.showValidationMessage('Silakan pilih alasan penolakan');
            return false;
          }

          if (selectElement.value === 'other' && !customNoteElement.value.trim()) {
            Swal.showValidationMessage('Silakan masukkan alasan penolakan');
            return false;
          }

          return {
            reason: selectElement.value,
            customNote: customNoteElement.value.trim()
          };
        }
      });

      if (result.isConfirmed) {
        const note = result.value.reason === 'default'
          ? 'Usul pembukaan prodi belum memenuhi persyaratan dan dikembalikan ke pengusul'
          : result.value.customNote;

        StartLoading();
        const encodedNote = encodeURIComponent(note);

        try {
          const response = await axios.post(
            `${baseUrl}/prodi/reject/${id}?note=${encodedNote}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          CloseLoading();
          if (response.data.status === 200) {
            await Swal.fire({
              icon: "success",
              title: "Berhasil",
              text: response.data.message,
              timer: 3000
            });
            fetchProdi();
          }
        } catch (error) {
          CloseLoading();
          if (error.response) {
            switch (error.response.status) {
              case 400:
                if (error.response.data.errors?.note) {
                  await Swal.fire({
                    icon: "error",
                    title: "Gagal",
                    text: error.response.data.errors.note.join(", "),
                  });
                } else {
                  await Swal.fire({
                    icon: "error",
                    title: "Gagal",
                    text: "Data tidak dapat ditolak",
                  });
                }
                break;
              case 403:
                await Swal.fire({
                  icon: "error",
                  title: "Gagal",
                  text: "Anda tidak memiliki akses untuk melakukan penolakan",
                });
                break;
              default:
                await ErrorSwal("Gagal", "Terjadi kesalahan pada server");
            }
          } else {
            await ErrorSwal("Gagal", "Terjadi kesalahan koneksi");
          }
        }
      }
    } catch (error) {
      console.error('Error in handleRejectWithNote:', error);
      await ErrorSwal("Gagal", "Terjadi kesalahan saat proses penolakan");
    }
  };
  useEffect(() => {
    fetchProdi();
  }, [])
  const { darkMode } = useDarkMode();
  // const style = {
  //   position: 'absolute',
  //   top: '50%',
  //   left: '50%',
  //   transform: 'translate(-50%, -50%)',
  //   width: '80%',
  //   maxWidth: '800px',
  //   bgcolor: darkMode ? "#3C5B6F" : "background.paper",
  //   borderRadius: '6px',
  //   boxShadow: 24,
  //   p: 4,
  // };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1550,
    height: 690,
    bgcolor: darkMode ? "#3C5B6F" : "background.paper",
    borderRadius: '6px',
    boxShadow: 24,
    p: 4,
  };
  const PdfViewerModal = () => {
    const [pdfBlob, setPdfBlob] = useState("");
    const baseUrl = GetApiBaseUrl();
    const { id } = useParams();
    const token = getToken();
    const getPdf = async () => {
      try {
        const response = await axios.get(`${baseUrl}/req-prodi/prodi-doc-file/${id}/${localStorage.getItem('kodes')}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: 'blob',
        });

        console.log('response', response);

        if (response.data) {
          const pdfUrl = URL.createObjectURL(response.data);
          console.log('pdfBlob:', pdfUrl);
          setPdfBlob(pdfUrl);
        } else {
          console.error('Empty response data');
        }
      } catch (error) {
        console.error('Error fetching PDF:', error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `${error.message}`
        });
        handleClose()
      }
    };
    useEffect(() => {
      getPdf();
    }, []);

    return (
      <>
        {pdfBlob ? (
          <div style={{
            width: '100%', height: '505px', overflowY: 'auto hidden', scrollbarWidth: 'thin',
            scrollbarColor: 'darkgrey lightgrey'
          }}>
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
              <Viewer fileUrl={pdfBlob} />
            </Worker>
            <p>.</p>
          </div>
        ) : 'No Data'}
      </>
    );
  };
  const userRole = getRole()
  return (
    <>
      <HeroTitle
        title="Usulan Program Studi Baru"
      />

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <ContentContainer>
          <div className="row d-flex">
            <div className="col-sm-10 col-12">
              <ContentCard sx={{ padding: "32px", gap: "16px", display: "flex", flexDirection: "column" }}>
                <Link to={userRole === 'Ptsp' ? '/ptsp' : '/kasubdit/beranda'}>
                  <button className="mb-2 btn btn-outline-danger">Kembali</button>
                </Link>
                <span
                  className="header-title-school text-uppercase"
                  data-aos="zoom-in-right"
                  data-aos-duration="1000"
                  style={{ color: darkMode ? "white" : "" }}
                >
                  {root?.namaPerguruan}
                </span>
                <p style={{ color: darkMode ? "white" : "" }}>  {root ? <>
                  {root?.namaProdi ?? ""}  {root?.jenjangStr ? ` (${root?.jenjangStr})` : ""}
                </> : <></>}</p>
                <span
                  className="header-address-school"
                  data-aos="zoom-in-left"
                  data-aos-duration="1000"
                  style={{ color: darkMode ? "white" : "" }}
                >
                  {auth?.nsptki_name ?? ""} {auth?.nsptki_id ? ` (${auth.nsptki_id})` : ""}
                </span>

                <span
                  className="header-address-school"
                  data-aos="zoom-in-left"
                  data-aos-duration="1000"
                  style={{ color: darkMode ? "white" : "" }}
                >
                  Status :  <ProdiActionName status={root?.status} />
                </span>
              </ContentCard>
            </div>
            <div className="col-sm-2 col-12">
              <div
                style={{ backgroundColor: "#006316", gap: "8px", borderRadius: "6px", boxShadow: "0px 2px 10px rgba(58, 53, 65, 0.1)" }}
                className="w-100 h-100 flex-column btn btn-none text-white d-flex align-items-center justify-content-center"
              >
                Nomor Registrasi
                <span className="text-white fw-bold">{root?.noReg ?? ""}</span>
              </div>
            </div>
          </div>

          <ContentCard>
            <div className="col-12" style={{ padding: "20px", color: darkMode ? "white" : "" }}>
              <div className="boxBlue">
                <p
                  style={{ fontWeight: "600", fontSize: "20px" }}
                  className="text-center mt-2"
                >
                  Proses tahapan usulan program studi
                </p>

                <div className="container">
                  <div className="d-flex justify-content-center mt-3 ">
                    <p className="a">1</p>
                    <div className="orange mt-3 ms-2 me-2"></div>
                    <p className="b">2</p>
                    <div className="yellow mt-3 ms-2 me-2"></div>
                    <p className="c">3</p>
                    <div className="green mt-3 ms-2 me-2"></div>
                    <p className="d">4</p>
                    <div className="green2 mt-3 ms-2 me-2"></div>
                    <p className="f">5</p>
                    <div className="blue mt-3 ms-2 me-2"></div>
                    <p className="g">6</p>
                  </div>
                  <div className="d-flex text2">
                    <p className="text-a">Konfirmasi Dokumen dan Lengkap</p>
                    <p className="text-b">Verval Dokumen oleh Subdit/Verifikator</p>
                    <p className="text-c">Penilaian Asesor</p>
                    <p className="text-d"> Validasi BAN PT</p>
                    <p className="text-f">Penyiapan SK</p>
                    <p className="text-g">SK Terbit</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12" style={{ padding: "20px 20px 0px 20px", color: darkMode ? "white" : "" }}>
              <span style={{
                fontWeight: 500,
                fontSize: "24px",
                lineHeight: "32px",
              }}>
                {view == 0 ? "Daftar Dokumen" : "Riwayat Proses Tahapan Usulan Prodi"}
              </span>
            </div>

            {view == 0 && (
              <>
                <div className="col-12" style={{ padding: "20px", color: darkMode ? "white" : "" }}>
                  <div
                    style={{
                      border: "2px solid #2196F3",
                      backgroundColor: "#E3F2FD",
                    }}
                    className="alert alert-danger "
                    role="alert"
                    data-aos="zoom-in-right"
                    data-aos-duration="1000"
                  >
                    <p
                      className="text-dark fw-bold"
                      data-aos="zoom-in-right"
                      data-aos-duration="1000"
                    >
                      <ExclamationCircleIcon />
                      Info
                    </p>
                    <p className="inf">
                      Silakan upload dan lengkapi dokumen-dokumen berikut
                      ini. Pastikan format file berupa file .pdf dengan
                      ukuran file maksimal 2 MB.
                      <b>
                        PASTIKAN SEMUA DOKUMEN DIUPLOAD, UNTUK PROSES LEBIH
                        LANJUT.
                      </b>
                    </p>
                  </div>
                </div>

                <div className="col-12">
                  <div className="d-flex">
                    <button onClick={() => handleDownloadAllFile()} className="btn btn-primary mb-3 mb-2 me-2 ms-2 d-flex ms-auto"><DownloadIcon /> Download Semua File</button>
                  </div>
                  <Paper
                    sx={{
                      width: "100%",
                      overflow: "auto",
                    }}
                  >
                    <Table>
                      <TableHead>
                        <TableRow style={{
                          backgroundColor: darkMode ? "#40679E" : "",
                          color: darkMode ? "white" : "",
                        }} >
                          <TableCell sx={{
                            backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                            border: "none",
                            color: darkMode ? "white" : "",
                          }}>Kode</TableCell>
                          <TableCell sx={{
                            backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                            border: "none",
                            color: darkMode ? "white" : "",
                          }}>Dokumen</TableCell>
                          <TableCell sx={{
                            backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                            border: "none",
                            color: darkMode ? "white" : "",
                          }}>Status</TableCell>
                          <TableCell sx={{
                            backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                            border: "none",
                            color: darkMode ? "white" : "",
                          }}>Catatan</TableCell>
                          <TableCell sx={{
                            backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                            border: "none",
                            color: darkMode ? "white" : "",
                          }}>File</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {isLoading ? (
                          <div>Loading...</div>
                        ) : (
                          rows.map((row, index) => (
                            <TableRow key={index} style={{
                              backgroundColor: darkMode ? "#40679E" : "",
                              color: darkMode ? "white" : "",
                            }}>
                              <TableCell style={{ color: darkMode ? "white" : "", }}>{index + 1}</TableCell>
                              <TableCell style={{ color: darkMode ? "white" : "", }}>{row.namaDokumen}</TableCell>
                              <TableCell style={{ color: darkMode ? "white" : "", }}>
                                {row.status === 1111 ? <CheckCircleIcon style={{ color: "green" }} /> :
                                  (row.status === 2222 || row.status === null || row.status === 0) ? '-' : <XLgIcon style={{ color: "red" }} />}
                              </TableCell>
                              <TableCell style={{ color: darkMode ? "white" : "", }}>{row.notes}</TableCell>
                              <TableCell style={{ color: darkMode ? "white" : "", }}>
                                {row.filename ? (
                                  <Button variant="contained" onClick={() => handleClickOpen(row.kode, localStorage.setItem('kodes', row.kode))}><RemoveRedEyeIcon fontSize="small" /></Button>
                                ) : null}
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </Paper>
                </div>
              </>
            )}

            {view == 1 && (
              <>
                <div className="col-12">
                  <div
                    className="container"
                    data-aos="zoom-in-right"
                    data-aos-duration="1000"
                  >
                    <div className="d-flex">
                      <p
                        style={{
                          backgroundColor: "#5BB46F",
                          color: "white",
                          borderRadius: "50%",
                          padding: "2px 12px",
                        }}
                      >
                        4
                      </p>
                      <p
                        style={{
                          backgroundColor: "#8FD79F66",
                          borderRadius: "8px",
                          padding: "3px 6px",
                          color: " #195627",
                        }}
                        className="ms-2"
                      >
                        Validasi BAN PT
                      </p>
                    </div>
                    <div className="d-flex">
                      <div
                        style={{ width: "3px", height: "60px" }}
                        className="bg-secondary ms-3"
                      ></div>
                      <p className="ms-4">Sedang di proses...</p>
                    </div>

                    <div className="d-flex mt-2">
                      <p
                        style={{
                          backgroundColor: "#81B94F",
                          color: "white",
                          borderRadius: "50%",
                          padding: "2px 8px",
                        }}
                      >
                        <CheckIcon />
                      </p>
                      <p
                        style={{
                          backgroundColor: "#B2E782",
                          borderRadius: "8px",
                          padding: "3px 6px",
                          color: "#638445",
                        }}
                        className="ms-2"
                      >
                        Validasi BAN PT
                      </p>
                    </div>
                    <div className="d-flex">
                      <div
                        style={{ width: "3px", height: "60px" }}
                        className="bg-secondary ms-3"
                      ></div>
                      <p className="ms-4">
                        Tanggal Penilaian: <b>11-07-2022</b>
                      </p>
                    </div>

                    <div className="d-flex mt-2">
                      <p
                        style={{
                          backgroundColor: "#FFF54E",
                          color: "white",
                          borderRadius: "50%",
                          padding: "2px 8px",
                        }}
                      >
                        <CheckIcon />
                      </p>
                      <p
                        style={{
                          backgroundColor: "#FFF54E",
                          borderRadius: "8px",
                          padding: "3px 6px",
                          color: "#948C08",
                        }}
                        className="ms-2"
                      >
                        Validasi BAN PT
                      </p>
                    </div>
                    <div className="d-flex">
                      <div
                        style={{ width: "3px", height: "60px" }}
                        className="bg-secondary ms-3"
                      ></div>
                      <p className="ms-4">
                        Tanggal diusulkan Verval:<b> 20-06-2022</b>
                      </p>
                    </div>

                    <div className="d-flex mt-2">
                      <p
                        style={{
                          backgroundColor: "#FF0000",
                          color: "white",
                          borderRadius: "50%",
                          padding: "2px 8px",
                        }}
                      >
                        <XLgIcon />
                      </p>
                      <p
                        style={{
                          backgroundColor: "rgb(255, 112, 112)",
                          borderRadius: "8px",
                          padding: "3px 6px",
                          color: "#8F0000",
                        }}
                        className="ms-2"
                      >
                        Dikembalikan ke User
                      </p>
                    </div>
                    <div className="d-flex">
                      <div
                        style={{ width: "3px", height: "60px" }}
                        className="bg-secondary ms-3"
                      ></div>
                      <p className="ms-4">
                        Tanggal pengembalian:<b> 19-05-2022</b>
                      </p>
                    </div>

                    <div className="d-flex mt-2">
                      <p
                        style={{
                          backgroundColor: "#FED303",
                          color: "white",
                          borderRadius: "50%",
                          padding: "2px 8px",
                        }}
                      >
                        <CheckIcon />
                      </p>
                      <p
                        style={{
                          backgroundColor: "#FED303",
                          borderRadius: "8px",
                          padding: "3px 6px",
                          color: "#826C05",
                        }}
                        className="ms-2"
                      >
                        Konfirmasi Dokumen dan Lengkap
                      </p>
                    </div>
                    <div className="d-flex">
                      <p className="ms-5">
                        Tanggal pengembalian:<b> 19-05-2022</b>
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
            {root?.status === 2 && (
              <div className="d-flex m-3 justify-content-end gap-2">
                <button
                  className="btn btn-danger d-flex align-items-center"
                  onClick={() => handleRejectWithNote(root?.id)}
                  style={{ marginLeft: 'auto' }} // Memastikan tombol berada di sudut kanan
                >
                  <CancelIcon className="me-1" />
                  <span>Tidak Memenuhi</span>
                </button>
                <button
                  className="btn btn-success d-flex align-items-center"
                  onClick={() => handleApprove(root?.id)}
                >
                  <CheckCircleOutlineIcon className="me-1" />
                  <span>Memenuhi</span>
                </button>
              </div>
            )}
          </ContentCard>


          {/* file preview */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} style={{ overflow: 'auto', height: '80%' }}>
              <IconButton
                sx={{ position: "absolute", top: 5, right: 5 }}
                onClick={handleClose}
                aria-label="close"
              >
                <HighlightOffIcon color="error" />
              </IconButton>
              <Typography style={{ color: darkMode ? "white" : "" }} id="modal-modal-title" variant="h6" component="h2" className="mb-2 ms-3 fw-bold">
                File Preview
                <Button onClick={() => handleDownloadFile(localStorage.getItem('kodes'))} variant="contained" className="mt-1 ms-2">
                  <DownloadIcon fontSize="small" className="me-1" />
                  {loadingDownloadFile ? 'loading...' : 'Download'}
                </Button>
              </Typography>

              <div className="p-4" style={{ flexDirection: 'column' }}>
                {/* PDF Viewer at the top */}
                <div style={{ marginBottom: '20px' }}>
                  <PdfViewerModal />
                </div>

                {/* Action Area below the PDF Viewer */}
                <div style={{ color: darkMode ? "white" : "" }}>
                  <h4 className="fw-bold">Pemeriksaan Dokumen</h4>
                  <div className="mb-4">
                    <p className="mb-2">Sesuai</p>
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={sesuai}
                        onChange={handleSesuaiChange}
                      >
                        <FormControlLabel value={1} control={<Radio />} label="Ya" />
                        <FormControlLabel value={9} control={<Radio />} label="Tidak" />
                      </RadioGroup>
                    </FormControl>
                  </div>

                  {showAdditionalDivs && (
                    <>
                      <div className="mb-4">
                        <p className="mb-2">Dapat dibaca</p>
                        <FormControl>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={dapatDibaca}
                            onChange={(e) => setDapatDibaca(e.target.value)}
                          >
                            <FormControlLabel value="1" control={<Radio />} label="Ya" />
                            <FormControlLabel value="9" control={<Radio />} label="Tidak" />
                          </RadioGroup>
                        </FormControl>
                      </div>
                      <div className="mb-4">
                        <p className="mb-2">Utuh, Tidak Terpotong</p>
                        <FormControl>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={utuh}
                            onChange={(e) => setUtuh(e.target.value)}
                          >
                            <FormControlLabel value="1" control={<Radio />} label="Ya" />
                            <FormControlLabel value="9" control={<Radio />} label="Tidak" />
                          </RadioGroup>
                        </FormControl>
                      </div>
                      <div className="mb-4">
                        <p className="mb-2">Keabsahan</p>
                        <FormControl>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={dapatDipercaya}
                            onChange={(e) => setDapatDipercaya(e.target.value)}
                          >
                            <FormControlLabel value="1" control={<Radio />} label="Ya" />
                            <FormControlLabel value="9" control={<Radio />} label="Tidak" />
                          </RadioGroup>
                        </FormControl>
                      </div>
                    </>
                  )}

                  <textarea
                    value={komentar}
                    onChange={(e) => setKomentar(e.target.value)}
                    placeholder="Komentar"
                    className="form-control"
                    style={{ backgroundColor: "#EFECEC", marginBottom: '10px' }}
                    rows="5"
                  ></textarea>
                  <Button
                    onClick={() => handleRejectToUser(localStorage.getItem('kodes'))}
                    variant="contained"
                    sx={{ width: '100%' }}
                  >
                    Simpan
                  </Button>
                </div>
              </div>
            </Box>
          </Modal>
        </ContentContainer>
      </motion.div>
    </>
  );
};

export default DetailUsulan;
