import React, { useEffect, useState } from "react";
import "../../../../../views/ptki/admin.css";
import HeroTitle from "../../../../../components/hero-title/HeroTitle";
import ContentContainer from "../../../../../components/card-container/ContentContainer";
import ContentCard from "../../../../../components/card-content/ContentCard";
import "../../../../../components/header-content/ContentHeader.css";
import {
  getToken,
  isAuth,
  getUserId,
  getRole,
} from "../../../../../utils/token";
import { useParams } from "react-router-dom";
import { GetApiBaseUrl } from "../../../../../utils/env";
import axios from "axios";
import {
  ErrorSwal,
  StartLoading,
  CloseLoading,
} from "../../../../../utils/swal2";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AsyncTable from "../../../../../components/table/AsyncTable";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import { css } from "@emotion/react";
import { BeatLoader } from "react-spinners";
import ReactDOMServer from "react-dom/server";
import api from "../../../../service/api";
import swal from "sweetalert";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  MenuItem,
} from "@mui/material";
import ExclamationCircleIcon from "../../../../../components/icons/ExclamationCircleIcon";
import CheckIcon from "../../../../../components/icons/CheckIcon";
import CheckCircleIcon from "../../../../../components/icons/CheckCircleIcon";
import XCircleIcon from "../../../../../components/icons/XCircleIcon";
import XLgIcon from "../../../../../components/icons/XLgIcon";
import DropdownAksi from "../../../../../components/dropdown/DropdownAksi";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CircularProgress from "@mui/material/CircularProgress";
import ProdiActionName from "../../../../../utils/status";
import { Spa } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Modal from "@mui/material/Modal";
import DownloadIcon from "@mui/icons-material/Download";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { motion } from "framer-motion";
import { useDarkMode } from "../../../../../utils/DarkModeContext";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const DetailUsulan = () => {
  const { darkMode } = useDarkMode();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1550,
    height: 680,
    bgcolor: darkMode ? "#3C5B6F" : "background.paper",
    borderRadius: "6px",
    boxShadow: 24,
    p: 4,
  };
  const token = getToken();
  const auth = isAuth();
  const baseUrl = GetApiBaseUrl();
  const [view, setView] = useState(0);
  const { id } = useParams();
  const [root, setRoot] = useState(null);
  const [tableLoading, setTableLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [sesuai, setSesuai] = useState(2);
  const [dapatDibaca, setDapatDibaca] = useState("9");
  const [utuh, setUtuh] = useState("9");
  const [dapatDipercaya, setDapatDipercaya] = useState("9");
  const [komentar, setKomentar] = useState("");
  const [loadingDownloadFile, setLoadingDownloadFile] = useState(null);

  const handleClickOpen = async (kode) => {
    const selectedRow = rows.find((row) => row.kode === kode);
    console.log("kode", selectedRow);
    const notes = selectedRow.notes;
    console.log("notes", notes);
    if (selectedRow) {
      const statusValue = selectedRow.status.toString();
      console.log("Status Value:", statusValue);
      setSesuai(parseInt(statusValue[0]) || 2);
      setDapatDibaca(parseInt(statusValue[1]) || 2);
      setUtuh(parseInt(statusValue[2]) || 2);
      setDapatDipercaya(parseInt(statusValue[3]) || 2);
      setKomentar(selectedRow.notes || "");
    } else {
      console.log("Selected row not found");
    }
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDownloadFile = async (kode) => {
    setLoadingDownloadFile(true);
    try {
      const response = await api.get(
        `/req-prodi/prodi-doc-file/${id}/${kode}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );
      console.log("response header", response.headers);
      if (response.status === 200) {
        // Swal.close();
        const contentDispositionHeader =
          response.headers["content-disposition"];
        const filename =
          contentDispositionHeader.split("filename=")[1]?.trim() ||
          "prodi.xlsx";

        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        const downloadUrl = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = filename;

        link.click();
        window.URL.revokeObjectURL(downloadUrl);
      }
    } catch (error) {
      Swal.close();
      console.log(error.response);
      if (error.response && error.response.status === 404) {
        const errorMessage = error.response.data.message || "Data Not found";
        Swal.fire({
          icon: "error",
          title: "Error",
          showConfirmButton: true,
          text: `Error: ${errorMessage}`,
        });
        handleClose();
      } else {
        // Handle other types of errors
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `${error.message}`,
        });
        handleClose();
      }
    } finally {
      setLoadingDownloadFile(false);
    }
  };
  const handleDownloadAllFile = async (newCode) => {
    Swal.fire({
      title: "Download...",
      text: "Sedang Proses Download File...",
      html: beatLoaderHtml,
      allowOutsideClick: false,
      showConfirmButton: false,
    });
    try {
      const response = await api.get(`/req-prodi/prodi-doc-files/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      });

      if (response.status === 200) {
        Swal.close();
        const contentDispositionHeader =
          response.headers["content-disposition"];
        const filename =
          contentDispositionHeader.split("filename=")[1]?.trim() ||
          "prodi.xlsx";

        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        const downloadUrl = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = filename;

        link.click();
        window.URL.revokeObjectURL(downloadUrl);
      }
    } catch (error) {
      Swal.close();
      console.log(error.response);
      if (error.response && error.response.status === 404) {
        const errorMessage = error.response.data.message || "Data Not found";
        Swal.fire({
          icon: "error",
          title: "Error",
          showConfirmButton: true,
          text: `Error: ${errorMessage}`,
        });
        handleClose();
      } else {
        // Handle other types of errors
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `${error.message}`,
        });
        handleClose();
      }
    }
  };
  const [loading, setLoading] = useState(false);

  const fetchProdi = () => {
    StartLoading();
    setLoading(true);
    api
      .get(`/req-prodi/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.status === 200) {
          const result = response.data.data;
          setRows(result.prodiDocuments);
          setRoot(result);
          CloseLoading();
        } else {
          ErrorSwal("Fetching Data Failed");
        }
      })
      .catch(() => {
        ErrorSwal("Fetching Data Failed");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    handleApproveSKDone(id, selectedFile);
  };

  const beatLoaderHtml = ReactDOMServer.renderToString(
    <BeatLoader css={override} size={15} color={"#4caf50"} loading={true} />
  );

  const handleApproveSKDone = async (id, file) => {
    try {
      Swal.fire({
        title: "Sedang Upload",
        text: "Sedang Proses Upload File...",
        html: beatLoaderHtml,
        allowOutsideClick: false,
        showConfirmButton: false,
      });

      const code = localStorage.getItem("code_upload");
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        `${baseUrl}/req-prodi/prodi-doc/${id}/${code}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      Swal.close();
      await Swal.fire({
        icon: "success",
        title: "Success",
        text: response.data.message,
        timer: 1500,
        showConfirmButton: false,
      });

      fetchProdi();
    } catch (error) {
      Swal.close();
      ErrorSwal("Gagal Konfirmasi", "Terjadi kesalahan");
    }
  };

  const handleConfirmation = (id) => {
    Swal.fire({
      title: "Sedang Konfirmasi",
      text: "Sedang Proses Konfirmasi...",
      html: beatLoaderHtml,
      allowOutsideClick: false,
      showConfirmButton: false,
    });

    const token = getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    axios
      .put(`${baseUrl}/req-prodi/${id}/confirm`, {}, { headers })
      .then(async (response) => {
        if (response.status === 200) {
          Swal.close();
          await Swal.fire({
            icon: "success",
            title: "Success",
            text: response.data.message,
            timer: 1500,
            showConfirmButton: false,
          });
          fetchProdi();
        }
      })
      .catch((error) => {
        Swal.close();
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
  const PdfViewerModal = () => {
    const [pdfBlob, setPdfBlob] = useState("");
    const baseUrl = GetApiBaseUrl();
    const { id } = useParams();
    const token = getToken();
    const getPdf = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/req-prodi/prodi-doc-file/${id}/${localStorage.getItem(
            "kodes"
          )}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            responseType: "blob",
          }
        );

        console.log("response", response);

        if (response.data) {
          const pdfUrl = URL.createObjectURL(response.data);
          console.log("pdfBlob:", pdfUrl);
          setPdfBlob(pdfUrl);
        } else {
          console.error("Empty response data");
        }
      } catch (error) {
        console.error("Error fetching PDF:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `${error.message}`,
        });
        setOpen(false);
      }
    };
    useEffect(() => {
      getPdf();
    }, []);

    return (
      <>
        {pdfBlob ? (
          <div
            style={{
              width: "100%",
              height: "505px",
              overflowY: "auto hidden",
              scrollbarWidth: "thin",
              scrollbarColor: "darkgrey lightgrey",
            }}
          >
            <Worker
              workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
            >
              <Viewer fileUrl={pdfBlob} />
            </Worker>
            <p>.</p>
          </div>
        ) : (
          "No Data"
        )}
      </>
    );
  };
  useEffect(() => {
    fetchProdi();
  }, []);
  return (
    <>
      <HeroTitle title="Usulan Program Studi Baru" />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ContentContainer>
          <div className="row d-flex">
            <div className="col-sm-10 col-12">
              <ContentCard
                sx={{
                  padding: "32px",
                  gap: "16px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span
                  className="header-title-school text-uppercase"
                  data-aos="zoom-in-right"
                  data-aos-duration="1000"
                  style={{ color: darkMode ? "white" : "" }}
                >
                  {root ? (
                    <>
                      {root?.namaProdi ?? ""}{" "}
                      {root?.jenjangStr ? ` (${root?.jenjangStr})` : ""}
                    </>
                  ) : (
                    <></>
                  )}
                </span>
                <span
                  className="header-address-school"
                  data-aos="zoom-in-left"
                  data-aos-duration="1000"
                  style={{ color: darkMode ? "white" : "" }}
                >
                  {root?.namaPerguruan ?? ""} {auth?.namaPerguruan ?? ""}{" "}
                  {auth?.nsptki_id ? ` (${auth.nsptki_id})` : ""}
                </span>

                <span
                  style={{
                    fontStyle: "italic",
                    color: darkMode ? "white" : "",
                  }}
                  className="header-address-school"
                >
                  Status : <ProdiActionName status={root?.status} />
                </span>
              </ContentCard>
            </div>
            <div className="col-sm-2 col-12">
              <div
                style={{
                  backgroundColor: "#006316",
                  gap: "8px",
                  borderRadius: "6px",
                  boxShadow: "0px 2px 10px rgba(58, 53, 65, 0.1)",
                  color: darkMode ? "white" : "",
                }}
                className="w-100 h-100 flex-column btn btn-none text-white d-flex align-items-center justify-content-center"
              >
                Nomor Registrasi
                <span className="text-white fw-bold">{root?.noReg ?? ""}</span>
              </div>
            </div>
          </div>

          <ContentCard>
            <div
              className="col-12"
              style={{ padding: "20px", color: darkMode ? "white" : "" }}
            >
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
                    <p className="text-b">
                      Verval Dokumen oleh Subdit/Verifikator
                    </p>
                    <p className="text-c">Penilaian Asesor</p>
                    <p className="text-d"> Validasi BAN PT</p>
                    <p className="text-f">Penyiapan SK</p>
                    <p className="text-g">SK Terbit</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12" style={{ padding: "20px 20px 0px 20px" }}>
              <span
                style={{
                  fontWeight: 500,
                  fontSize: "24px",
                  lineHeight: "32px",
                  color: darkMode ? "white" : "",
                }}
              >
                {view == 0
                  ? "Daftar Dokumen"
                  : "Riwayat Proses Tahapan Usulan Prodi"}
              </span>
            </div>

            {view == 0 && (
              <>
                <div className="col-12" style={{ padding: "20px" }}>
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
                      Silakan upload dan lengkapi dokumen-dokumen berikut ini.
                      Pastikan format file berupa file .pdf dengan ukuran file
                      maksimal 2 MB.
                      <b>
                        PASTIKAN SEMUA DOKUMEN DIUPLOAD, UNTUK PROSES LEBIH
                        LANJUT.
                      </b>
                    </p>
                  </div>
                </div>

                <div className="col-12">
                  <button
                    onClick={() => handleDownloadAllFile()}
                    className="btn btn-primary mb-3 mb-2 ms-2 d-flex ms-auto"
                  >
                    Download Semua File
                  </button>
                  <Paper
                    sx={{
                      width: "100%",
                      overflow: "auto",
                    }}
                  >
                    <Table>
                      <TableHead>
                        <TableRow
                          style={{
                            backgroundColor: darkMode ? "#40679E" : "",
                            color: darkMode ? "white" : "",
                          }}
                        >
                          <TableCell
                            sx={{
                              backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                              border: "none",
                              color: darkMode ? "white" : "",
                            }}
                          >
                            No
                          </TableCell>
                          <TableCell
                            sx={{
                              backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                              border: "none",
                              color: darkMode ? "white" : "",
                            }}
                          >
                            Dokumen
                          </TableCell>
                          <TableCell
                            sx={{
                              backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                              border: "none",
                              color: darkMode ? "white" : "",
                            }}
                          >
                            Status
                          </TableCell>
                          <TableCell
                            sx={{
                              backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                              border: "none",
                              color: darkMode ? "white" : "",
                            }}
                          >
                            Catatan
                          </TableCell>
                          <TableCell
                            sx={{
                              backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                              border: "none",
                              color: darkMode ? "white" : "",
                            }}
                            align="center"
                          >
                            Aksi
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {loading ? (
                          <TableRow>
                            <TableCell colSpan={5}>Loading...</TableCell>
                          </TableRow>
                        ) : (
                          rows.map((row, index) => (
                            <TableRow
                              key={index}
                              style={{
                                backgroundColor: darkMode ? "#40679E" : "",
                                color: darkMode ? "white" : "",
                              }}
                            >
                              <TableCell
                                style={{ color: darkMode ? "white" : "" }}
                              >
                                {index + 1}
                              </TableCell>
                              <TableCell
                                style={{ color: darkMode ? "white" : "" }}
                              >
                                {row.namaDokumen}
                              </TableCell>
                              <TableCell
                                style={{ color: darkMode ? "white" : "" }}
                              >
                                {row.status === 1111 ? (
                                  <CheckCircleIcon style={{ color: "green" }} />
                                ) : row.status === 2222 ||
                                  row.status === null ||
                                  row.status === 0 ? (
                                  "-"
                                ) : (
                                  <XLgIcon style={{ color: "red" }} />
                                )}
                              </TableCell>
                              {/* <TableCell>{row.notes ? row.notes : '-'}</TableCell> */}
                              <TableCell
                                style={{ color: darkMode ? "white" : "" }}
                              >
                                {row.notes}
                              </TableCell>
                              <TableCell
                                style={{ color: darkMode ? "white" : "" }}
                                className="d-flex flex-column gap-1"
                              >
                                {row.filename ? (
                                  <Button
                                    variant="contained"
                                    onClick={() =>
                                      handleClickOpen(
                                        row.kode,
                                        localStorage.setItem("kodes", row.kode)
                                      )
                                    }
                                  >
                                    <VisibilityIcon />
                                  </Button>
                                ) : null}
                                <div
                                  style={{ position: "relative" }}
                                  className="btn btn-success"
                                >
                                  <input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={handleFileChange}
                                    style={{
                                      position: "absolute",
                                      left: "-9999px",
                                    }}
                                  />
                                  <span
                                    size="small"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      document
                                        .querySelector('input[type="file"]')
                                        .click();
                                      localStorage.setItem(
                                        "code_upload",
                                        row.kode
                                      );
                                    }}
                                  >
                                    <FileUploadIcon sx={{ color: "white" }} />
                                  </span>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </Paper>
                  <Button
                    disabled={root?.status !== 0 && root?.status !== 1}
                    variant="contained"
                    sx={{ margin: "10px" }}
                    onClick={() => handleConfirmation(id)}
                  >
                    {root?.status === 27 || root?.status === 299 ? (
                      <span>Revisi</span>
                    ) : (
                      <span>Submit</span>
                    )}
                    <CheckCircleOutlineIcon sx={{ marginLeft: "8px" }} />
                  </Button>
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
          </ContentCard>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={style}
              style={{
                overflow: "auto",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <IconButton
                sx={{ position: "absolute", top: 5, right: 5 }}
                onClick={handleClose}
                aria-label="close"
              >
                <HighlightOffIcon color="error" />
              </IconButton>
              <Typography
                style={{ color: darkMode ? "white" : "" }}
                id="modal-modal-title"
                variant="h6"
                component="h2"
                className="mb-2 ms-3 fw-bold"
              >
                File Preview
                <Button
                  onClick={() =>
                    handleDownloadFile(localStorage.getItem("kodes"))
                  }
                  variant="contained"
                  className="mt-1 ms-2"
                >
                  <DownloadIcon fontSize="small" className="me-1" />
                  {loadingDownloadFile ? "loading..." : "Download"}
                </Button>
              </Typography>

              <div className="p-4 d-flex flex-column" style={{ flex: 1 }}>
                {/* PDF Viewer */}
                <div style={{ flexGrow: 1, marginBottom: "20px" }}>
                  <PdfViewerModal />
                </div>

                {/* Results Section */}
                <div style={{ color: darkMode ? "white" : "" }}>
                  <h4 className="fw-bold">Hasil Pemeriksaan Dokumen</h4>
                  <div className="d-flex mb-4 justify-content-between">
                    <p>Sesuai</p>
                    <p>
                      {sesuai === 2
                        ? "-"
                        : sesuai === 1
                        ? "Ya"
                        : sesuai === 9
                        ? "Tidak"
                        : "-"}
                    </p>
                  </div>
                  <div className="d-flex mb-4 justify-content-between">
                    <p>Dapat dibaca</p>
                    <p>
                      {dapatDibaca === 2
                        ? "-"
                        : dapatDibaca === 1
                        ? "Ya"
                        : dapatDibaca === 9
                        ? "Tidak"
                        : "-"}
                    </p>
                  </div>
                  <div className="d-flex mb-4 justify-content-between">
                    <p>Utuh, Tidak Terpotong</p>
                    <p>
                      {utuh === 2
                        ? "-"
                        : utuh === 1
                        ? "Ya"
                        : utuh === 9
                        ? "Tidak"
                        : "-"}
                    </p>
                  </div>
                  <div className="d-flex mb-4 justify-content-between">
                    <p>Keabsahan</p>
                    <p>
                      {dapatDipercaya === 2
                        ? "-"
                        : dapatDipercaya === 1
                        ? "Ya"
                        : dapatDipercaya === 9
                        ? "Tidak"
                        : "-"}
                    </p>
                  </div>
                  <textarea
                    value={komentar}
                    onChange={(e) => setKomentar(e.target.value)}
                    placeholder="Komentar"
                    className="form-control"
                    disabled
                    rows="5"
                  ></textarea>
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
