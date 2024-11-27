import React, { useState, useEffect, useRef } from "react";
import "../../../../../../../views/ptki/admin.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { getToken } from "../../../../../../../utils/token";
import api from "../../../../../../service/api";
import Swal from "sweetalert2";
import { css } from '@emotion/react';
import { BeatLoader } from 'react-spinners';
import ReactDOMServer from 'react-dom/server';
import BobotEnumDoctor from '../../../../../../assesor/module/penilaian/utils/BobotS1'
import { LinearProgress } from "@mui/material";
import logo from '../../../../../../../assets/logo.svg'
import swal from "sweetalert";
import EditNotificationsIcon from '@mui/icons-material/EditNote';
import DropdownAksi from "../../../../../../../components/dropdown/DropdownAksi";
import MenuItem from "@mui/material/MenuItem";
import { ErrorSwal } from "../../../../../../../utils/swal2";
import { GetApiBaseUrl } from "../../../../../../../utils/env";
import axios from "axios";
import XLgIcon from "../../../../../../../components/icons/XLgIcon";
import CheckCircleIcon from "../../../../../../../components/icons/CheckCircleIcon";

import { useDarkMode } from "../../../../../../../utils/DarkModeContext";
import IconButton from "@mui/material/IconButton";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import DownloadIcon from '@mui/icons-material/Download';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ContentCard from "../../../../../../../components/card-content/ContentCard";
import { StartLoading } from "../../../../../../../utils/swal2";
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { useParams } from 'react-router-dom';

const PdfViewerModal = () => {
  const [pdfBlob, setPdfBlob] = useState("");
  const baseUrl = GetApiBaseUrl();
  const programStudiId = localStorage.getItem('programStudiId');
  const token = getToken();
  const getPdf = async () => {
    try {
      const response = await axios.get(`${baseUrl}/req-prodi/prodi-doc-file/${programStudiId}/${localStorage.getItem('kodes')}`, {
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
    }
  };
  useEffect(() => {
    getPdf();
  }, []);

  return (
    <>
      {pdfBlob ? (
        <div style={{
          width: '72%', height: '505px', overflowY: 'auto hidden', scrollbarWidth: 'thin',
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
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};
const styleViewFile = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1550,
  height: 690,
  bgcolor: 'background.paper',
  borderRadius: '6px',
  boxShadow: 24,
  p: 4,
};


const CardPenilaian = () => {
  const { darkMode } = useDarkMode();
  const baseUrl = GetApiBaseUrl();
  const [view, setView] = useState("one");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpen1 = () => setOpen1(true);
  const [open1, setOpen1] = useState(false);
  const handleClose1 = () => setOpen1(false);

  const handleOpen2 = () => setOpen2(true);
  const [open2, setOpen2] = useState(false);
  const handleClose2 = () => setOpen2(false);

  const handleOpen3 = () => setOpen3(true);
  const [open3, setOpen3] = useState(false);
  const handleClose3 = () => setOpen3(false);

  const handleOpen4 = () => setOpen4(true);
  const [open4, setOpen4] = useState(false);
  const handleClose4 = () => setOpen4(false);

  const handleOpen5 = () => setOpen5(true);
  const [open5, setOpen5] = useState(false);
  const handleClose5 = () => setOpen5(false);

  const handleOpen6 = () => setOpen6(true);
  const [open6, setOpen6] = useState(false);
  const handleClose6 = () => setOpen6(false);

  const handleOpen7 = () => setOpen7(true);
  const [open7, setOpen7] = useState(false);
  const handleClose7 = () => setOpen7(false);

  const handleOpen8 = () => setOpen8(true);
  const [open8, setOpen8] = useState(false);
  const handleClose8 = () => setOpen8(false);

  const handleOpen9 = () => setOpen9(true);
  const [open9, setOpen9] = useState(false);
  const handleClose9 = () => setOpen9(false);

  const handleOpen10 = () => setOpen10(true);
  const [open10, setOpen10] = useState(false);
  const handleClose10 = () => setOpen10(false);

  const handleOpen11 = () => setOpen11(true);
  const [open11, setOpen11] = useState(false);
  const handleClose11 = () => setOpen11(false);

  const handleOpen12 = () => setOpen12(true);
  const [open12, setOpen12] = useState(false);
  const handleClose12 = () => setOpen12(false);

  const handleOpen13 = () => setOpen13(true);
  const [open13, setOpen13] = useState(false);
  const handleClose13 = () => setOpen13(false);

  const handleOpen14 = () => setOpen14(true);
  const [open14, setOpen14] = useState(false);
  const handleClose14 = () => setOpen14(false);

  const handleOpen30 = () => setOpen30(true);
  const [open30, setOpen30] = useState(false);
  const handleClose30 = () => setOpen30(false);

  const handleOpen31 = () => setOpen31(true);
  const [open31, setOpen31] = useState(false);
  const handleClose31 = () => setOpen31(false);

  const handleOpen32 = () => setOpen32(true);
  const [open32, setOpen32] = useState(false);
  const handleClose32 = () => setOpen32(false);

  const handleOpen33 = () => setOpen33(true);
  const [open33, setOpen33] = useState(false);
  const handleClose33 = () => setOpen33(false);

  const handleOpen20 = () => setOpen20(true);
  const [open20, setOpen20] = useState(false);
  const handleClose20 = () => setOpen20(false);

  const handleOpen3314 = () => setOpen3314(true);
  const [open3314, setOpen3314] = useState(false);
  const handleClose3314 = () => setOpen3314(false);

  // Get Data Sarjana
  const token = getToken();
  const [data, setData] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rows4, setRows4] = useState([]);
  const [fileUrl, setFileUrl] = useState(null);

  const beatLoaderHtml = ReactDOMServer.renderToString(
    <BeatLoader css={override} size={15} color={'#4caf50'} loading={true} />
  );
  // /////////////////////////////////////////////
  const [openViewFile, setOpenViewFile] = useState(false);
  const [sesuai, setSesuai] = useState(2);
  const [dapatDibaca, setDapatDibaca] = useState(2);
  const [utuh, setUtuh] = useState(2);
  const [dapatDipercaya, setDapatDipercaya] = useState(2);
  const [komentar, setKomentar] = useState('');

  const handleClickOpenViewFile = async (kode) => {
    const selectedRow = rows4.find((row) => row.kode === kode);
    console.log('kode', selectedRow)
    const notes = selectedRow.notes
    console.log('notes', notes)
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
    setOpenViewFile(true);
  };


  const handleCloseViewFile = () => {
    setOpenViewFile(false);
  };
  const [loadingDownloadFile, setLoadingDownloadFile] = useState(null)
  const handleDownloadFile = async (kode) => {
    setLoadingDownloadFile(true)
    const programStudiId = localStorage.getItem('programStudiId');
    // Swal.fire({
    //   title: 'Download...',
    //   text: 'Sedang Proses Download File...',
    //   html: beatLoaderHtml,
    //   allowOutsideClick: false,
    //   showConfirmButton: false,
    // });
    try {
      const response = await api.get(`/req-prodi/prodi-doc-file/${programStudiId}/${kode}`, {
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
      } else if (response.status === 404) {
        Swal.fire({
          icon: 'error',
          title: `Error`,
          text: `Old assessment file not found.`,
        });
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
    } finally {
      setLoadingDownloadFile(false)
    }
  };
  const handleRejectToUser = (kode) => {
    const programStudiId = localStorage.getItem("programStudiId");
    const note = `${komentar}`;
    const status = `${sesuai}${dapatDibaca}${utuh}${dapatDipercaya}`;
    console.log('status', status)
    // 2 (belum menandai)
    setOpenViewFile(true)
    StartLoading();
    axios
      .put(
        `${baseUrl}/req-prodi/prodi-doc/${programStudiId}/${kode}?status=${status}&notes=${note}`,
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
          getData()
        }
        setOpenViewFile(false)
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
        setOpenViewFile(false)
      })
  };

  // /////////////////////////////////////////////////////
  const handleDownloadFileView = async (kode) => {
    const programStudiId = localStorage.getItem('programStudiId');
    Swal.fire({
      title: 'Loading...',
      text: 'Sedang Proses Lihat File...',
      html: beatLoaderHtml,
      allowOutsideClick: false,
      showConfirmButton: false,
    });

    try {
      const response = await api.get(`/req-prodi/prodi-doc-file/${programStudiId}/${kode}`, {
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
  const handleDownloadAllFile = async (newCode) => {
    // const kode = localStorage.getItem('code_download');
    const programStudiId = localStorage.getItem('programStudiId');
    Swal.fire({
      title: 'Download...',
      text: 'Sedang Proses Download File...',
      html: beatLoaderHtml,
      allowOutsideClick: false,
      showConfirmButton: false,
    });
    try {
      const response = await api.get(`/req-prodi/prodi-doc-files/${programStudiId}`, {
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
  const { id } = useParams();
  const [rekomendasi, setRekomendasi] = useState(0);
  const [isRecommended, setIsRecommended] = useState(false);
  const handleCheckboxChange = (event) => {
    const value = Number(event.target.value);
    if (value === 1) {
      setRekomendasi(1);
      setIsRecommended(true);
    } else {
      setRekomendasi(0);
      setIsRecommended(false);
    }
  };
  const getData = async () => {
    const programStudiId = localStorage.getItem("programStudiId");
    setIsSubmitted(true);
    try {
      const response = await api.get(
        `/prodi-assesment/${programStudiId}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const documentMasterList = response.data.data.prodiDocuments;

      const newRows = documentMasterList.map((document) => ({
        id: document.id,
        notes: document.notes,
        kode: document.kode,
        status: document.status,
        dokumen: <p className="text-left">{document.namaDokumen}</p>,
        file: document.filename ? (
          <a
            href={document.filename}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="text-primary"
            onClick={() => handleDownloadFile(programStudiId, document.kode)}
          >
            {document.filename}
          </a>
        ) : (
          <p className="text-danger">-</p>
        ),
        comment: "",
      }));
      setRows4(newRows);
      setData(response.data.data);
      if (response.data.data.asesorProgramStudis.questions.form1) setNilaiButirRows(response.data.data.asesorProgramStudis.questions.form1)
      if (response.data.data.asesorProgramStudis.questions.form2) setNilaiButirRows1(response.data.data.asesorProgramStudis.questions.form2)
      setIsStatusDraft(response.data.data.asesorProgramStudis.status)
      setIsSubmitted(false);
      setComent(response.data.data.asesorProgramStudis.komentar)
      setRekomendasi(response.data.data.asesorProgramStudis.rekomendasi)
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `${error.message}`
      });
    }

  };

  const setNilaiButirRows = (value) => {
    rows.forEach(obj1 => {
      const correspondingObj2 = value.find(obj2 => obj2.code === obj1.butir);
      if (correspondingObj2) {
        obj1.nilai = correspondingObj2.nilai;
      }
    });
    rows.forEach(obj1 => {
      const correspondingObj2 = value.find(obj2 => obj2.code === obj1.butir);
      if (correspondingObj2) {
        obj1.note = correspondingObj2.note;
      }
    });
  }
  const setNilaiButirRows1 = (value) => {
    rows1.forEach(obj1 => {
      const correspondingObj2 = value.find(obj2 => obj2.code === obj1.butir);
      if (correspondingObj2) {
        obj1.nilai = correspondingObj2.nilai;
      }
    });
    rows1.forEach(obj1 => {
      const correspondingObj2 = value.find(obj2 => obj2.code === obj1.butir);
      if (correspondingObj2) {
        obj1.note = correspondingObj2.note;
      }
    });
  }
  const [isStatusDraft, setIsStatusDraft] = useState(21)
  useEffect(() => {
    getData();
  }, []);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [coment, setComent] = useState("");
  // kecukupan
  const [formData2, setFormData2] = useState({
    ltrk2: "",
    lt2: "",
    luasRuangPerMahasiswa: '',
    status2: "",
  });
  const [formData3, setFormData3] = useState({
    ltrk3: "",
    lt3: "",
    luasRuangPerMahasiswa: '',
    status3: "",
  });
  const [formData4, setFormData4] = useState({
    ltrk4: "",
    lt4: "",
    luasRuangPerMahasiswa: '',
    status4: "",
  });
  const [formData5, setFormData5] = useState({
    ltrp: "",
  });
  // Lapangan
  const [formData6, setFormData6] = useState({
    ltrk6: "",
    lt6: "",
    luasRuangPerMahasiswa6: '',
    status6: "",
  });
  const [formData7, setFormData7] = useState({
    ltrk7: "",
    lt7: "",
    luasRuangPerMahasiswa7: '',
    status7: "",
  });
  const [formData8, setFormData8] = useState({
    ltrk8: "",
    lt8: "",
    luasRuangPerMahasiswa8: '',
    status8: "",
  });
  const [comments, setComments] = useState({
    note: ""
  });
  const [open34, setOpen34] = useState(false);
  const handleOpen34 = () => {
    setOpen34(true);
  };
  const handleClose34 = () => {
    setOpen34(false);
  };

  // format date
  useEffect(() => {
    const formatDate = (date) => {
      const options = { day: "numeric", month: "long", year: "numeric" };
      return date.toLocaleDateString("id-ID", options);
    };

    const currentDate = formatDate(new Date());
    setCurrentDate(currentDate);
  }, []);
  const handleGoBack = () => {
    const selectedViewIndex = localStorage.getItem("selectedViewIndex");
    const selectedViewIndex2 = localStorage.getItem("newView");
    const selectedViewIndex3 = localStorage.removeItem("currentPage");
    if (selectedViewIndex) {
      localStorage.removeItem("selectedViewIndex");
    } else if (selectedViewIndex2) {
      localStorage.removeItem('newView')
    } else if (selectedViewIndex3) {
      localStorage.removeItem("currentPage")
    }

    const lastView = localStorage.getItem("lastView");
    if (lastView) {
      window.location.href = lastView;
    }
    const lastView2 = localStorage.getItem("viewView");
    if (lastView2) {
      window.location.href = lastView2;
    }
    const lastView3 = localStorage.removeItem("currentPage");
    if (lastView3) {
      window.location.href = lastView3;
    }
  };

  // window.addEventListener("popstate", handleGoBack);
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);
  const handleChange1 = (event, newValue) => {
    setView(newValue);
  };
  // scroll
  const divRef = useRef(null);
  useEffect(() => {
    const divElement = divRef.current;
    const handleScroll = () => {
      const maxHeight = 0.8 * window.innerHeight;
      if (divElement.scrollHeight > maxHeight) {
        divElement.style.overflowY = "scroll";
      } else {
        divElement.style.overflowY = "auto";
      }
    };

    divElement.addEventListener("scroll", handleScroll);

    return () => {
      divElement.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Form Penilaian Asesor
  // const [rows, setRows] = useState([
  //   {
  //     butir: "A",
  //     note: '',
  //     keterangan: "Surat Rekomendasi KOPERTAIS (BAGI PTKIS)",
  //     nilai: ""
  //   },
  //   {
  //     butir: "B",
  //     note: '',
  //     keterangan:
  //       "Surat Persetujuan Tertulis Badan Penyelenggara tentang pembukuan prodi (Bagi PTKIS)",
  //     nilai: ""
  //   },
  //   {
  //     butir: "C",
  //     note: '',
  //     keterangan:
  //       "Surat Pertimbangan Tertulis Senat Perguruan tinggi tentang pembukuan prodi (BAGI PTKIN & PTKIS EKSISTING)",
  //     nilai: ""
  //   },
  //   {
  //     butir: "D",
  //     note: '',
  //     keterangan: "Pakta integritas ( BAGI PTKIS & PTKIN)",
  //     nilai: ""
  //   },
  //   {
  //     butir: "*",
  //     note: '',
  //     keterangan: "Pemenuhan Persyaratan Administratif",
  //     nilai: ""
  //   },
  // ])
  const [rows, setRows] = useState([
    {
      butir: "A",
      note: '',
      keterangan:
        "Surat Persetujuan Tertulis Badan Penyelenggara tentang pembukuan prodi (Bagi PTKIS)",
      nilai: ""
    },
    {
      butir: "B",
      note: '',
      keterangan:
        "Surat Pertimbangan Tertulis Senat Perguruan tinggi tentang pembukuan prodi (BAGI PTKIN & PTKIS EKSISTING)",
      nilai: ""
    },
    {
      butir: "C",
      note: '',
      keterangan: "Pakta integritas ( BAGI PTKIS & PTKIN)",
      nilai: ""
    },
    {
      butir: "*",
      note: '',
      keterangan: "Pemenuhan Persyaratan Administratif",
      nilai: ""
    },
  ])
  const [rows1, setRows1] = useState([
    {
      butir: "1.1",
      note: '',
      keterangan: "Keunikan atau keunggulan program studi yang diusulkan berdasarkan perbandingan program studi sejenis nasional dan/ atau internasional yang mencakup aspek(1) pengembangan keilmuan, (2) kajian capaian pembelajaran, dan(3) kurikulum program studi sejenis",
      nilai: "",
      bobot: BobotEnumDoctor.CODE_1_1,
      showButton: true
    },
    {
      butir: "1.2",
      note: '',
      keterangan: "Profil lulusan (Profesi, jenis pekerjaan, bentuk kerja) program studi yang diusulkan",
      nilai: "",
      bobot: BobotEnumDoctor.CODE_1_2,
      showButton1: true
    },
    {
      butir: "1.3",
      note: '',
      keterangan: " Rumusan capaian pembelajaran sesuai dengan (1) profil lulusan, (2) deskripsi kompetensinya sesuai SN- Dikti yang mencakup 4(empat) domain capaian pembelajaran dan sesuai level 6(enam) KKNI, (3) relevan dengan keunikan atau keunggulan prodi, dan(4) ada rujukan untuk semua aspek capaian pembelajaran",
      nilai: "",
      bobot: BobotEnumDoctor.CODE_1_3,
      showButton2: true
    },
    {
      butir: "1.4",
      note: '',
      keterangan: " Rencana Susunan mata kuliah per semester memenuhi aspek:  1. Keberadaan 4 mata kuliah wajib, 2. Kesesuaian mata kuliah dengan rumusan capaian pembelajaran  3. Urutan mata kuliah, dan 4. Beban sks per semester wajar",
      nilai: "",
      bobot: BobotEnumDoctor.CODE_1_4,
      showButton3: true
    },
    {
      butir: "1.5",
      note: '',
      keterangan: [
        "Ketersediaan RPS (Rencana Pembelajaran Semester) untuk 10 mata kuliah penciri program studi yang diusulkan yang memenuhi 9 (sembilan) komponen:",
        "1. Nama program studi, nama dan kode mata kuliah, semester, sks, nama dosen pengampu;",
        "2. Capaian Pembelajaran lulusan yang dibebankan pada mata kuliah;",
        "3. Kemampuan akhir yang direncanakan pada tiap tahap pembelajaran untuk memenuhi capaian pembelajaran lulusan;",
        "4. Bahan kajian yang terkait dengan kemampuan yang akan dicapai",
        "5. Metode pembelajaran;",
        "6. Waktu yang disediakan untuk mencapai kemampuan pada tiap tahap pembelajaran;",
        "7. Pengalaman belajar mahasiswa yang diwujudkan dalam deskripsi tugas yang harus dikerjakan oleh mahasiswa selama satu semester;",
        "8. Kriteria, indikator, dan bobot penilaian; dan",
        "9. Daftar referensi yang digunakan.",
      ].map((item, index) => (
        <div key={index}>
          {item}
          <br />
          <br />
        </div>
      )),
      nilai: "",
      bobot: BobotEnumDoctor.CODE_1_5,
      showButton4: true
    },
    {
      butir: "1.6",
      note: '',
      keterangan: "Rancangan kebijakan dan implementasi untuk memfasilitasi pemenuhan masa dan beban belajar Merdeka Belajar - Kampus Merdeka bagi mahasiswa yang melakukan pembelajaran di luar program studi yang diusulkan yang mencakup aspek: 1) Penyediaan dosen pembimbing akademik, oleh perguruan tinggi pengusul terhadap mahasiswa yang akan mengambil mata kuliah pada program studi yang berbeda pada perguruan tinggi sendiri atau perguruan tinggi lain 2) Rancangan kurikulum menyediakan pilihan bagi mahasiswa untuk mengambil mata kuliah diluar program studi sesuai dengan ketentuan perundang undangan",
      nilai: "",
      bobot: BobotEnumDoctor.CODE_1_6,
      showButton6: true
    },
    {
      butir: "2.1",
      note: '',
      keterangan: "Jumlah, kualifikasi, dan status calon dosen tetap",
      nilai: "",
      bobot: BobotEnumDoctor.CODE_2_1,
      showButton7: true
    },
    {
      butir: "3.1.1",
      note: '',
      keterangan: [
        "Struktur organisasi Unit Pengelola Program Studi mencakup aspek: ",
        "a. Lima unsur unit pengelola program studi: ",
        "1) unsur penyusun kebijakan;",
        "2) unsur pelaksana akademik; ",
        "3) unsur pengawas dan penjaminan mutu; ",
        "4) unsur penunjang akademik atau sumber belajar; dan ",
        "5) unsur pelaksana administrasi atau tata usaha; dan ",
        "b. penjelasan tata kerja dan tata hubungan",
      ].map((item, index) => (
        <div key={index}>
          {item}
          <br />
          <br />
        </div>
      )),
      nilai: "",
      bobot: BobotEnumDoctor.CODE_3_1_1,
      showButton8: true
    },
    {
      butir: "3.1.2",
      note: '',
      keterangan: [
        "Rancangan Perwujudan good governance dan lima pilar tata pamong yang mampu menjamin terwujudnya visi, terlaksanakannya misi, tercapainya tujuan, dan berhasilnya strategi yang digunakan secara",
        "1) Kredibel, ",
        "2) Transparan, ",
        "3) Akuntabel, ",
        "4) Bertanggung jawab, dan",
        "5) Adil",
      ].map((item, index) => (
        <div key={index}>
          {item}
          <br />
          <br />
        </div>
      )),
      nilai: "",
      bobot: BobotEnumDoctor.CODE_3_1_2,
      showButton9: true
    },
    {
      butir: "3.2",
      note: '',
      keterangan: 'Perencanaan Keterlaksanaan Sistem Penjaminan Mutu Internal berdasarkan keberadaan 5 (lima) aspek: 1) dokumen legal pembentukan unsur pelaksana penjaminan mutu; 2) ketersediaan dokumen mutu: kebijakan SPMI, manual SPMI, standar SPMI, dan formulir SPMI; 3) terlaksananya siklus penjaminan mutu (siklus PPEPP); 4) bukti sahih efektivitas pelaksanaan penjaminan mutu (jika ada); dan 5) memiliki external benchmarking dalam peningkatan mutu (jika ada).',
      nilai: "",
      bobot: BobotEnumDoctor.CODE_3_2,
      showButton10: true
    },
    {
      butir: "3.3.1",
      note: '',
      keterangan: [
        "Ruang Kuliah, Ruang Kerja Dosen, Ruang Kantor/Administrasi, dan Perpustakaan",
        "3.3.1.1    Ruang Kuliah (gunakan data Butir 3.3.1)",
        "3.3.1.2    Ruang Kerja Dosen (gunakan data Butir 3.3.1",
        "3.3.1.3    Ruang Kerja Pegawai/Kantor dan Administrasi (gunakan data Butir 3.3.1)",
        "3.3.1.4    Luas total ruang perpustakaan (m2) (gunakan data Butir 3.3.1)",
      ].map((item, index) => (
        <div key={index}>
          {item}
          <br />
          <br />
        </div>
      )),
      nilai: "",
      bobot: BobotEnumDoctor.CODE_3_3_1,
      additionalProp2: "",
      additionalProp3: "",
      additionalProp4: "",
      additionalProp5: "",
      showButton311: true,
    },
    {
      butir: "3.3.2",
      note: '',
      keterangan: "Ruang akademik khusus berupa laboratorium, studio, bengkel kerja, lahan praktik atau tempat praktik lainnya harus disediakan dengan luas ruang yang memenuhi syarat gerak dan spesifikasi aktivitas praktikum, bengkel dan studio, dan didasarkan pada efektivitas keberlangsungan proses pembelajaran untuk ketercapaian capaian pembelajaran praktikum/praktik/PPL.",
      nilai: "",
      bobot: BobotEnumDoctor.CODE_3_3_2,
      showButton11: true,
    },
    {
      butir: "3.3.3",
      note: '',
      keterangan: "Peralatan untuk melaksanakan praktikum/praktik pada 2 (dua) tahun pertama. Peralatan praktikum/praktik sarana utama di lab/tempat praktikum/ bengkel/ studio/ ruang simulasi, rumah sakit, puskesmas/balai kesehatan/ green house/ lahan untuk percobaan, dan sejenisnya",
      nilai: "",
      bobot: BobotEnumDoctor.CODE_3_3_3,
      showButton15: true,
    },
    {
      butir: "3.4",
      note: '',
      keterangan: "Perencanaan Jumlah dan kualifikasi tenaga kependidikan: Jumlah minimal tenaga kependidikan terdiri atas 2(dua) orang tenaga kependidikan untuk setiap program studi dan 1(satu) orang untuk melayani perpustakaan.Kualifikasi tenaga kependidikan minimal berijazah D3, berusia maksimum 56 tahun, dan bekerja penuh waktu 37, 5 jam / minggu",
      nilai: "",
      bobot: BobotEnumDoctor.CODE_3_4,
      showButton16: true,
    },
  ])

  // form penilaian lapangan
  const [rows10, setRows10] = useState([
    {
      butir: "A",
      keterangan: "Surat Rekomendasi KOPERTAIS (BAGI PTKIS)",
      nilai2: ""
    },
    {
      butir: "B",
      keterangan:
        "Surat Persetujuan Tertulis Badan Penyelenggara tentang pembukuan prodi (Bagi PTKIS)",
      nilai2: ""
    },
    {
      butir: "C",
      keterangan:
        "Surat Pertimbangan Tertulis Senat Perguruan tinggi tentang pembukuan prodi (BAGI PTKIN & PTKIS EKSISTING)",
      nilai2: ""
    },
    {
      butir: "D",
      keterangan: "Pakta integritas ( BAGI PTKIS & PTKIN)",
      nilai2: ""
    },
    {
      butir: "*",
      keterangan: "Pemenuhan Persyaratan Administratif",
      nilai2: ""
    },
  ])
  const [rows11, setRows11] = useState([
    {
      butir: "1.1",
      keterangan: "Keunikan atau keunggulan program studi yang diusulkan berdasarkan perbandingan program studi sejenis nasional dan/ atau internasional yang mencakup aspek(1) pengembangan keilmuan, (2) kajian capaian pembelajaran, dan(3) kurikulum program studi sejenis",
      nilai2: "",
      showButton: true
    },
    {
      butir: "1.2",
      keterangan: "Profil lulusan (Profesi, jenis pekerjaan, bentuk kerja) program studi yang diusulkan",
      nilai2: "",
      showButton1: true
    },
    {
      butir: "1.3",
      keterangan: " Rumusan capaian pembelajaran sesuai dengan (1) profil lulusan, (2) deskripsi kompetensinya sesuai SN- Dikti yang mencakup 4(empat) domain capaian pembelajaran dan sesuai level 6(enam) KKNI, (3) relevan dengan keunikan atau keunggulan prodi, dan(4) ada rujukan untuk semua aspek capaian pembelajaran",
      nilai2: "",
      showButton2: true
    },
    {
      butir: "1.4",
      keterangan: " Rencana Susunan mata kuliah per semester memenuhi aspek:  1. Keberadaan 4 mata kuliah wajib, 2. Kesesuaian mata kuliah dengan rumusan capaian pembelajaran  3. Urutan mata kuliah, dan 4. Beban sks per semester wajar",
      nilai2: "",
      showButton3: true
    },
    {
      butir: "1.5",
      keterangan: [
        "Ketersediaan RPS (Rencana Pembelajaran Semester) untuk 10 mata kuliah penciri program studi yang diusulkan yang memenuhi 9 (sembilan) komponen:",
        "1. Nama program studi, nama dan kode mata kuliah, semester, sks, nama dosen pengampu;",
        "2. Capaian Pembelajaran lulusan yang dibebankan pada mata kuliah;",
        "3. Kemampuan akhir yang direncanakan pada tiap tahap pembelajaran untuk memenuhi capaian pembelajaran lulusan;",
        "4. Bahan kajian yang terkait dengan kemampuan yang akan dicapai",
        "5. Metode pembelajaran;",
        "6. Waktu yang disediakan untuk mencapai kemampuan pada tiap tahap pembelajaran;",
        "7. Pengalaman belajar mahasiswa yang diwujudkan dalam deskripsi tugas yang harus dikerjakan oleh mahasiswa selama satu semester;",
        "8. Kriteria, indikator, dan bobot penilaian; dan",
        "9. Daftar referensi yang digunakan.",
      ].map((item, index) => (
        <div key={index}>
          {item}
          <br />
          <br />
        </div>
      )),
      nilai2: "",
      showButton4: true
    },
    {
      butir: "1.6",
      keterangan: "Rancangan kebijakan dan implementasi untuk memfasilitasi pemenuhan masa dan beban belajar Merdeka Belajar - Kampus Merdeka bagi mahasiswa yang melakukan pembelajaran di luar program studi yang diusulkan yang mencakup aspek: 1) Penyediaan dosen pembimbing akademik, oleh perguruan tinggi pengusul terhadap mahasiswa yang akan mengambil mata kuliah pada program studi yang berbeda pada perguruan tinggi sendiri atau perguruan tinggi lain 2) Rancangan kurikulum menyediakan pilihan bagi mahasiswa untuk mengambil mata kuliah diluar program studi sesuai dengan ketentuan perundang undangan",
      nilai2: "",
      showButton6: true
    },
    {
      butir: "2.1",
      keterangan: "Jumlah, kualifikasi, dan status calon dosen tetap",
      nilai2: "",
      showButton7: true
    },
    {
      butir: "3.1.1",
      keterangan: [
        "Struktur organisasi Unit Pengelola Program Studi mencakup aspek: ",
        "a. Lima unsur unit pengelola program studi: ",
        "1) unsur penyusun kebijakan;",
        "2) unsur pelaksana akademik; ",
        "3) unsur pengawas dan penjaminan mutu; ",
        "4) unsur penunjang akademik atau sumber belajar; dan ",
        "5) unsur pelaksana administrasi atau tata usaha; dan ",
        "b. penjelasan tata kerja dan tata hubungan",
      ].map((item, index) => (
        <div key={index}>
          {item}
          <br />
          <br />
        </div>
      )),
      nilai2: "",
      showButton8: true
    },
    {
      butir: "3.1.2",
      keterangan: [
        "Rancangan Perwujudan good governance dan lima pilar tata pamong yang mampu menjamin terwujudnya visi, terlaksanakannya misi, tercapainya tujuan, dan berhasilnya strategi yang digunakan secara",
        "1) Kredibel, ",
        "2) Transparan, ",
        "3) Akuntabel, ",
        "4) Bertanggung jawab, dan",
        "5) Adil",
      ].map((item, index) => (
        <div key={index}>
          {item}
          <br />
          <br />
        </div>
      )),
      nilai2: "",
      showButton9: true
    },
    {
      butir: "3.2",
      keterangan: 'Perencanaan Keterlaksanaan Sistem Penjaminan Mutu Internal berdasarkan keberadaan 5 (lima) aspek: 1) dokumen legal pembentukan unsur pelaksana penjaminan mutu; 2) ketersediaan dokumen mutu: kebijakan SPMI, manual SPMI, standar SPMI, dan formulir SPMI; 3) terlaksananya siklus penjaminan mutu (siklus PPEPP); 4) bukti sahih efektivitas pelaksanaan penjaminan mutu (jika ada); dan 5) memiliki external benchmarking dalam peningkatan mutu (jika ada).',
      nilai: "",
      showButton15: true
    },
    {
      butir: "3.3.1",
      keterangan: [
        "Ruang Kuliah, Ruang Kerja Dosen, Ruang Kantor/Administrasi, dan Perpustakaan",
        "3.3.1.1    Ruang Kuliah (gunakan data Butir 3.3.1)",
        "3.3.1.2    Ruang Kerja Dosen (gunakan data Butir 3.3.1",
        "3.3.1.3    Ruang Kerja Pegawai/Kantor dan Administrasi (gunakan data Butir 3.3.1)",
        "3.3.1.4    Luas total ruang perpustakaan (m2) (gunakan data Butir 3.3.1)",
      ].map((item, index) => (
        <div key={index}>
          {item}
          <br />
          <br />
        </div>
      )),
      nilai2: "",
      additionalProp6: "",
      additionalProp7: "",
      additionalProp8: "",
      showButton311: true,
    },
    {
      butir: "3.3.2",
      keterangan: "Ruang akademik khusus berupa laboratorium, studio, bengkel kerja, lahan praktik atau tempat praktik lainnya harus disediakan dengan luas ruang yang memenuhi syarat gerak dan spesifikasi aktivitas praktikum, bengkel dan studio, dan didasarkan pada efektivitas keberlangsungan proses pembelajaran untuk ketercapaian capaian pembelajaran praktikum/praktik/PPL.",
      nilai2: "",
      showButton10: true,
    },
    {
      butir: "3.3.3",
      keterangan: "Peralatan untuk melaksanakan praktikum/praktik pada 2 (dua) tahun pertama. Peralatan praktikum/praktik sarana utama di lab/tempat praktikum/ bengkel/ studio/ ruang simulasi, rumah sakit, puskesmas/balai kesehatan/ green house/ lahan untuk percobaan, dan sejenisnya",
      nilai2: "",
      showButton15: true,
    },
    {
      butir: "3.4",
      keterangan: "Perencanaan Jumlah dan kualifikasi tenaga kependidikan: Jumlah minimal tenaga kependidikan terdiri atas 2(dua) orang tenaga kependidikan untuk setiap program studi dan 1(satu) orang untuk melayani perpustakaan.Kualifikasi tenaga kependidikan minimal berijazah D3, berusia maksimum 56 tahun, dan bekerja penuh waktu 37, 5 jam / minggu",
      nilai2: "",
      showButton16: true,
    },
  ])
  const [isAllAda, setIsAllAda] = useState(false);
  const [isAllAda1, setIsAllAda1] = useState(false);

  // Logic calculate Pemenuhan Persyaratan Administratif kecukupan
  useEffect(() => {
    // const hasTidakAda = rows.some((row) => row.nilai === "Tidak Ada");
    // setIsAllAda(!hasTidakAda);
    const allAda = rows.every((row) => row.nilai !== "Tidak Ada");
    setIsAllAda(allAda);
  }, [rows]);
  // const handleABCDENilaiChange = (e, index) => {
  //   let { value } = e.target;
  //   const updatedRows = [...rows];
  //   updatedRows[index].nilai = value;
  //   //=IF(AND(E17="Ada",E18="Ada",E19="Ada",E20="Ada"),"Memenuhi","Tidak Memenuhi")
  //   // Check if all values in the array are equal to "Ada"
  //   const keys = ['A', 'B', 'C', 'D', 'E'];
  //   const allAda = updatedRows.every((row) => row.nilai !== "Tidak Ada");

  //   // Output "Memenuhi" if all values are "Ada", otherwise output "Tidak Memenuhi"
  //   const result = allAda ? "Memenuhi" : "Tidak Memenuhi";
  //   updatedRows[5].nilai = result;
  //   setIsAllAda(allAda);
  //   setRows(updatedRows);
  // };

  const handleABCDENilaiChange = (e, index) => {
    let { value } = e.target;
    const updatedRows = [...rows];
    updatedRows[index].nilai = value;
    //=IF(AND(E17="Ada",E18="Ada",E19="Ada",E20="Ada"),"Memenuhi","Tidak Memenuhi")
    // Check if all values in the array are equal to "Ada"
    // const keys = ['A', 'B', 'C', 'D'];
    const keys = ['A', 'B', 'C'];
    const allAda = updatedRows.every((row) => row.nilai !== "Tidak Ada");

    // Output "Memenuhi" if all values are "Ada", otherwise output "Tidak Memenuhi"
    const result = allAda ? "Memenuhi" : "Tidak Memenuhi";
    updatedRows[3].nilai = result;
    setIsAllAda(allAda);
    setRows(updatedRows);
  };
  // Logic calculate Pemenuhan Persyaratan Administratif lapangan
  useEffect(() => {
    const hasTidakAda10 = rows10.some((row) => row.nilai2 === "Tidak Ada");
    setIsAllAda1(!hasTidakAda10);
  }, [rows10]);


  // handle input form kecukupan
  const handleNilaiChange = (e, index) => {
    let { value } = e.target;
    const updatedRows = [...rows];
    updatedRows[index].nilai = value;
    const hasTidakAda = updatedRows.some((row) => row.nilai === "Tidak Ada");
    setIsAllAda(!hasTidakAda);
    setRows(updatedRows);
  };
  useEffect(() => {
    const updatedRows = [...rows];
    if (data.statusSwasta === 0) {
      updatedRows[0].nilai = 'Ada'
      updatedRows[1].nilai = 'Ada'
    }
    setRows(updatedRows)
  }, [data.statusSwasta])
  const handleNoteChange = (e, index) => {
    const newRows = [...rows];
    newRows[index].note = e.target.value;
    setRows(newRows);
  };

  // handle input modal kecukupan

  const handleNoteChangeTable2 = (e, index) => {
    const newRows1 = [...rows1];
    newRows1[index].note = e.target.value;
    setRows1(newRows1);
  };
  const handleCommentChange = (e, fieldName) => {
    setComments({
      ...comments,
      [fieldName]: e.target.value,
    });
  };

  // handle input form lapangan
  const handleNilaiChange10 = (e, index) => {
    let { value } = e.target;
    const updatedRows2 = [...rows10];
    updatedRows2[index].nilai2 = value;
    const hasTidakAda2 = updatedRows2.some((row) => row.nilai2 === "Tidak Ada");
    setIsAllAda(!hasTidakAda2);
    setRows10(updatedRows2);
  };

  const handleNoteChange10 = (e, index) => {
    const newRows = [...rows10];
    newRows[index].note2 = e.target.value;
    setRows10(newRows);
  };
  // handle input modal lapangan
  const handleNilaiChangeTable11 = (e, index) => {
    const newRows1 = [...rows11];
    newRows1[index].nilai2 = e.target.value;
    setRows11(newRows1);
  };
  const handleNoteChangeTable11 = (e, index) => {
    const newRows11 = [...rows11];
    newRows11[index].note2 = e.target.value;
    setRows11(newRows11);
  };
  // 3.3.1 kecukupan
  useEffect(() => {
    // Mengisi formData2 dengan data dari database jika tersedia
    if (data?.asesorProgramStudis?.questions?.form2?.[2]?.additionalFields) {
      const additionalFields = data.asesorProgramStudis.questions.form2[2].additionalFields;
      setFormData2({
        ltrk2: additionalFields.ltrk2 || '',
        lt2: additionalFields.lt2 || '',
        luasRuangPerMahasiswa: calculateLuasRuangPerMahasiswa(additionalFields.ltrk2, additionalFields.lt2),
        status2: additionalFields.status2 || '',
      });
    }
  }, [data]);
  useEffect(() => {
    // Mengisi formData2 dengan data dari database jika tersedia
    if (data?.asesorProgramStudis?.questions?.form2?.[2]?.additionalFields) {
      const additionalFields = data.asesorProgramStudis.questions.form2[2].additionalFields;
      setFormData3({
        ltrk3: additionalFields.ltrk3 || '',
        lt3: additionalFields.lt3 || '',
        luasRuangPerMahasiswa: calculateLuasRuangPerMahasiswa(additionalFields.ltrk3, additionalFields.lt3),
        status3: additionalFields.status3 || '',
      });
    }
  }, [data]);
  useEffect(() => {
    // Mengisi formData2 dengan data dari database jika tersedia
    if (data?.asesorProgramStudis?.questions?.form2?.[2]?.additionalFields) {
      const additionalFields = data.asesorProgramStudis.questions.form2[2].additionalFields;
      setFormData4({
        ltrk4: additionalFields.ltrk4 || '',
        lt4: additionalFields.lt4 || '',
        luasRuangPerMahasiswa: calculateLuasRuangPerMahasiswa(additionalFields.ltrk4, additionalFields.lt4),
        status4: additionalFields.status4 || '',
      });
    }
  }, [data]);
  useEffect(() => {
    // Mengisi formData2 dengan data dari database jika tersedia
    if (data?.asesorProgramStudis?.questions?.form2?.[2]?.additionalFields) {
      const additionalFields = data.asesorProgramStudis.questions.form2[2].additionalFields;
      setFormData5({
        ltrp: additionalFields.ltrp || '',
      });
    }
  }, [data]);
  const calculateLuasRuangPerMahasiswa = (ltrk2, lt2) => {
    const parsedLtrk2 = parseFloat(ltrk2);
    const parsedLt2 = parseFloat(lt2);

    if (parsedLt2 === 0) {
      return 'Tidak dapat dihitung (lt2 = 0)';
    }

    const luasRuangPerMahasiswa = parsedLtrk2 / parsedLt2;
    return isNaN(luasRuangPerMahasiswa) ? 0 : luasRuangPerMahasiswa.toFixed(2);
  };
  const calculateLuasRuangPerMahasiswa3 = (ltrk3, lt3) => {
    const parsedLtrk3 = parseFloat(ltrk3);
    const parsedLt3 = parseFloat(lt3);

    if (parsedLt3 === 0) {
      return 'Tidak dapat dihitung (lt3 = 0)';
    }

    const luasRuangPerMahasiswa = parsedLtrk3 / parsedLt3;
    return isNaN(luasRuangPerMahasiswa) ? 0 : luasRuangPerMahasiswa.toFixed(2);
  };
  const calculateLuasRuangPerMahasiswa4 = (ltrk4, lt4) => {
    const parsedLtrk4 = parseFloat(ltrk4);
    const parsedLt4 = parseFloat(lt4);

    if (parsedLt4 === 0) {
      return 'Tidak dapat dihitung (lt3 = 0)';
    }

    const luasRuangPerMahasiswa = parsedLtrk4 / parsedLt4;
    return isNaN(luasRuangPerMahasiswa) ? 0 : luasRuangPerMahasiswa.toFixed(2);
  };


  // total nilai modal 3.3.1.1
  const calculateTotalNilai = (luasRuangPerMahasiswa, status2) => {
    if (luasRuangPerMahasiswa > 1 && status2 === "sd") {
      return 4;
    } else if (luasRuangPerMahasiswa > 1 && status2 === "sw") {
      return 3;
    } else if (luasRuangPerMahasiswa === 1) {
      return 2.5;
    } else if (0 < luasRuangPerMahasiswa && luasRuangPerMahasiswa < 1) {
      return 1;
    } else {
      return 0;
    }
  };

  const calculateTotalNilai3 = (luasRuangPerMahasiswa, status2) => {
    if (luasRuangPerMahasiswa > 4 && status2 === "sd") {
      return 4;
    } else if (luasRuangPerMahasiswa > 4 && status2 === "sw") {
      return 3;
    } else if (luasRuangPerMahasiswa === 4) {
      return 2.5;
    } else if (luasRuangPerMahasiswa > 0 && luasRuangPerMahasiswa < 4) {
      return 0;
    } else {
      return 0;
    }
  };


  const calculateTotalNilai4 = (luasRuangPerMahasiswa, status2) => {
    if (luasRuangPerMahasiswa > 4 && status2 === "sd") {
      return 4;
    } else if (luasRuangPerMahasiswa > 4 && status2 === "sw") {
      return 3;
    } else if (luasRuangPerMahasiswa === 4) {
      return 2.5;
    } else if (luasRuangPerMahasiswa > 0 && luasRuangPerMahasiswa < 4) {
      return 0;
    } else {
      return 0;
    }
  };;

  const calculateTotalNilai5 = (ltrp) => {
    const parsedLtrp = parseFloat(ltrp);
    if (parsedLtrp >= 300) {
      return 4;
    } else if (parsedLtrp > 200 && parsedLtrp < 300) {
      return -0.5 + 0.015 * parsedLtrp;
    } else if (parsedLtrp === 200) {
      return 2.5;
    } else if (parsedLtrp < 200) {
      return 0;
    }
  };

  const calculateAverageTotalNilai = (totalNilai1, totalNilai2, totalNilai3, totalNilai4) => {
    const average = (totalNilai1 + totalNilai2 + totalNilai3 + totalNilai4) / 4;
    return average.toFixed(2);
  };


  const handleNChange2 = (e, field) => {
    let value = e.target.value;
    setFormData2((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));

    if (field === 'ltrk2' || field === 'lt2') {
      const luasRuangPerMahasiswa = calculateLuasRuangPerMahasiswa(formData2.ltrk2, formData2.lt2);
      setFormData2((prevFormData) => ({
        ...prevFormData,
        luasRuangPerMahasiswa,
      }));
    }
  };
  const handleNChange3 = (e, field) => {
    let value = e.target.value;
    setFormData3((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));

    if (field === 'ltrk3' || field === 'lt3') {
      const luasRuangPerMahasiswa = calculateLuasRuangPerMahasiswa3(formData3.ltrk3, formData3.lt3);
      setFormData3((prevFormData) => ({
        ...prevFormData,
        luasRuangPerMahasiswa,
      }));
    }
  };
  const handleNChange4 = (e, field) => {
    let value = e.target.value;
    setFormData4((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));

    if (field === 'ltrk4' || field === 'lt4') {
      const luasRuangPerMahasiswa = calculateLuasRuangPerMahasiswa4(formData4.ltrk4, formData4.lt4);
      setFormData4((prevFormData) => ({
        ...prevFormData,
        luasRuangPerMahasiswa,
      }));
    }
  };
  const handleNChange5 = (e, field) => {
    let value = e.target.value;
    setFormData5((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };


  // 3.3.1 lapangan
  useEffect(() => {
    // Mengisi formData2 dengan data dari database jika tersedia
    if (data?.asesorProgramStudis?.questions?.form2?.[6]?.additionalFields2) {
      const additionalFields2 = data.asesorProgramStudis.questions.form2[6].additionalFields2;
      setFormData6({
        ltrk6: additionalFields2.ltrk6 || '',
        lt6: additionalFields2.lt6 || '',
        luasRuangPerMahasiswa6: calculateLuasRuangPerMahasiswa6(additionalFields2.ltrk6, additionalFields2.lt6),
        status6: additionalFields2.status6 || '',
      });
    }
  }, [data]);
  useEffect(() => {
    // Mengisi formData2 dengan data dari database jika tersedia
    if (data?.asesorProgramStudis?.questions?.form2?.[6]?.additionalFields2) {
      const additionalFields2 = data.asesorProgramStudis.questions.form2[6].additionalFields2;
      setFormData7({
        ltrk7: additionalFields2.ltrk7 || '',
        lt7: additionalFields2.lt7 || '',
        luasRuangPerMahasiswa7: calculateLuasRuangPerMahasiswa7(additionalFields2.ltrk7, additionalFields2.lt7),
        status7: additionalFields2.status7 || '',
      });
    }
  }, [data]);
  useEffect(() => {
    // Mengisi formData2 dengan data dari database jika tersedia
    if (data?.asesorProgramStudis?.questions?.form2?.[6]?.additionalFields2) {
      const additionalFields2 = data.asesorProgramStudis.questions.form2[6].additionalFields2;
      setFormData8({
        ltrk8: additionalFields2.ltrk8 || '',
        lt8: additionalFields2.lt8 || '',
        luasRuangPerMahasiswa8: calculateLuasRuangPerMahasiswa8(additionalFields2.ltrk8, additionalFields2.lt8),
        status8: additionalFields2.status8 || '',
      });
    }
  }, [data]);

  const calculateLuasRuangPerMahasiswa6 = (ltrk6, lt6) => {
    const parsedLtrk6 = parseFloat(ltrk6);
    const parsedLt6 = parseFloat(lt6);

    if (parsedLt6 === 0) {
      return 'Tidak dapat dihitung (lt6 = 0)';
    }

    const luasRuangPerMahasiswa6 = parsedLtrk6 / parsedLt6;
    return isNaN(luasRuangPerMahasiswa6) ? 0 : luasRuangPerMahasiswa6.toFixed(2);
  };
  const calculateLuasRuangPerMahasiswa7 = (ltrk7, lt7) => {
    const parsedLtrk7 = parseFloat(ltrk7);
    const parsedLt7 = parseFloat(lt7);

    if (parsedLt7 === 0) {
      return 'Tidak dapat dihitung (lt7 = 0)';
    }

    const luasRuangPerMahasiswa7 = parsedLtrk7 / parsedLt7;
    return isNaN(luasRuangPerMahasiswa7) ? 0 : luasRuangPerMahasiswa7.toFixed(2);
  };
  const calculateLuasRuangPerMahasiswa8 = (ltrk8, lt8) => {
    const parsedLtrk8 = parseFloat(ltrk8);
    const parsedLt8 = parseFloat(lt8);

    if (parsedLt8 === 0) {
      return 'Tidak dapat dihitung (lt8 = 0)';
    }

    const luasRuangPerMahasiswa8 = parsedLtrk8 / parsedLt8;
    return isNaN(luasRuangPerMahasiswa8) ? 0 : luasRuangPerMahasiswa8.toFixed(2);
  };
  const handleNChange6 = (e, field) => {
    let value = e.target.value;
    setFormData6((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));

    if (field === 'ltrk6' || field === 'lt6') {
      const luasRuangPerMahasiswa6 = calculateLuasRuangPerMahasiswa6(formData6.ltrk6, formData6.lt6);
      setFormData6((prevFormData) => ({
        ...prevFormData,
        luasRuangPerMahasiswa6,
      }));
    }
  };
  const handleNChange7 = (e, field) => {
    let value = e.target.value;
    setFormData7((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));

    if (field === 'ltrk7' || field === 'lt7') {
      const luasRuangPerMahasiswa7 = calculateLuasRuangPerMahasiswa7(formData7.ltrk7, formData7.lt7);
      setFormData7((prevFormData) => ({
        ...prevFormData,
        luasRuangPerMahasiswa7,
      }));
    }
  };
  const handleNChange8 = (e, field) => {
    let value = e.target.value;
    setFormData8((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));

    if (field === 'ltrk8' || field === 'lt8') {
      const luasRuangPerMahasiswa8 = calculateLuasRuangPerMahasiswa8(formData8.ltrk8, formData8.lt8);
      setFormData8((prevFormData) => ({
        ...prevFormData,
        luasRuangPerMahasiswa8,
      }));
    }
  };

  // create PUT penilaian asesor
  // validasi kecukupan
  const validateForm = () => {
    for (const row of rows) {
      if (!row.butir || !row.keterangan) {
        return false;
      }
    }

    for (const row of rows1) {
      // Skip the validation if the value is coming from calculateFinalValue()
      if (!row.note && !(row.nilai && row.nilai.toString() === calculateFinalValue())) {
        return false;
      }
    }

    if (!coment) {
      return false;
    }

    return true;
  };
  // //validasi lapangan

  useEffect(() => {
    setRows1((prevRows1) => {
      return prevRows1.map((value) => {
        if (value.butir === '3.3.1') {
          return {
            ...value,
            nilai: calculateAverageTotalNilai(
              calculateTotalNilai(formData2.luasRuangPerMahasiswa, formData2.status2),
              calculateTotalNilai3(formData3.luasRuangPerMahasiswa, formData3.status3),
              calculateTotalNilai4(formData4.luasRuangPerMahasiswa, formData4.status4),
              calculateTotalNilai5(formData5.ltrp)
            )
          };
        } else {
          return value;
        }
      });
    });
  }, [formData2, formData3, formData4, formData5]);

  const [selectedValue, setSelectedValue] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const handleChange = (event) => {
    let value = event.target.value;
    setSelectedValue(value);
    if (value === "iya") {
      setSelectedDate(new Date().toISOString());
    } else {
      setSelectedDate("");
    }
  };
  const getLatestDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  //Total Nilai (terboboti) yang diperoleh
  const [totalSum, setTotalSum] = useState(0);
  const [terbobotiValues, setTerbobotiValues] = useState([]);
  const [kurikulumStatus, setKurikulumStatus] = useState('');
  const [dosen, setDosen] = useState('')
  const [spmi, setSpmi] = useState('')
  const [finalStatus, setSimpulan] = useState('')

  const handleNilaiChangeTable2 = (e, index) => {
    let { value } = e.target;
    if (value.includes(',')) {
      // Jika iya, konversi koma menjadi titik
      value = value.replace(',', '.');
    }
    const updatedRows1 = rows1.map((row, rowIndex) => {
      if (rowIndex === index) {
        return {
          ...row,
          nilai: value
        };
      }
      return row;
    });
    setRows1(updatedRows1);
  };

  useEffect(() => {
    if (data && rows1) {
      const calculatedValues = rows1.map((row) => {
        const code = row.butir;
        const parsedNilai =
          parseFloat(row.nilai) ||
          (data?.asesorProgramStudis?.questions?.form2 &&
            parseFloat(
              data.asesorProgramStudis.questions.form2.find(
                (item) => item.code === code
              )?.nilai.replace(',', '.')
            )) || row.nilai || (data?.asesorProgramStudis?.questions?.form2 &&
              data.asesorProgramStudis.questions.form2.find(
                item => item.code === '3.3.1'
              )?.nilai) || calculateAverageTotalNilai(
                calculateTotalNilai(formData2.luasRuangPerMahasiswa, formData2.status2),
                calculateTotalNilai3(formData3.luasRuangPerMahasiswa, formData3.status3),
                calculateTotalNilai4(formData4.luasRuangPerMahasiswa, formData4.status4),
                calculateTotalNilai5(formData5.ltrp)
              ) ||
          0;

        const parsedBobot = parseFloat(row.bobot.replace(',', '.'));

        if (!isNaN(parsedNilai) && !isNaN(parsedBobot)) {
          const terboboti = parsedNilai * parsedBobot;
          return terboboti.toString();
        } else {
          return '-';
        }
      });
      const kurikulumStatus = rows1.map((row) => {
        if (row.butir === '1.1') {
          const code = row.butir;
          const form2Question = data?.asesorProgramStudis?.questions?.form2?.find(item => item.code === code);
          const nilai1_1 = form2Question ? parseFloat(form2Question.nilai.replace(',', '.')) : null;
          if (nilai1_1 < 3) {
            return 'TIDAK MEMENUHI';
          } else if (nilai1_1 <= 4) {
            return 'MEMENUHI';
          } else {
            return '-';
          }
        }
        return '';
      });

      const dosen = rows1.map((row) => {
        if (row.butir === '2.1') {
          const code = row.butir;
          const form2Question = data?.asesorProgramStudis?.questions?.form2?.find(item => item.code === code);
          const nilai2_1 = form2Question ? parseFloat(form2Question.nilai.replace(',', '.')) : null;
          if (nilai2_1 < 3) {
            return 'TIDAK MEMENUHI';
          } else if (nilai2_1 <= 4) {
            return 'MEMENUHI';
          } else {
            return '-';
          }
        }
        return '';
      });

      const spmi = rows1.map((row) => {
        if (row.butir === '3.2') {
          const code = row.butir;
          const form2Question = data?.asesorProgramStudis?.questions?.form2?.find(item => item.code === code);
          const nilai3_2 = form2Question ? parseFloat(form2Question.nilai.replace(',', '.')) : null;
          if (nilai3_2 < 3) {
            return 'TIDAK MEMENUHI';
          } else if (nilai3_2 <= 4) {
            return 'MEMENUHI';
          } else {
            return '-';
          }
        }
        return '';
      });


      const totalSum = rows1.reduce((sum, row) => {
        const code = row.butir;
        const parsedNilai =
          parseFloat(row.nilai) ||
          (data?.asesorProgramStudis?.questions?.form2 &&
            parseFloat(
              data.asesorProgramStudis.questions.form2.find(
                (item) => item.code === code
              )?.nilai.replace(',', '.')
            )) ||
          row.nilai ||
          (data?.asesorProgramStudis?.questions?.form2 &&
            data.asesorProgramStudis.questions.form2.find(
              (item) => item.code === '3.3.1'
            )?.nilai) ||
          calculateAverageTotalNilai(
            calculateTotalNilai(formData2.luasRuangPerMahasiswa, formData2.status2),
            calculateTotalNilai3(formData3.luasRuangPerMahasiswa, formData3.status3),
            calculateTotalNilai4(formData4.luasRuangPerMahasiswa, formData4.status4),
            calculateTotalNilai5(formData5.ltrp)
          ) || 0;

        const parsedBobot = parseFloat(row.bobot.replace(',', '.'));
        if (!isNaN(parsedNilai) && !isNaN(parsedBobot)) {
          const terboboti = parsedNilai * parsedBobot;
          return sum + terboboti;
        } else {
          return sum;
        }
      }, 0).toFixed(2);
      const adms = data?.asesorProgramStudis?.questions?.form1?.find(item => item.code === '*')?.nilai || '-';
      const dosens = dosen.filter(status => status === 'MEMENUHI').join(', ');
      const spmis = spmi.filter(status => status === 'MEMENUHI').join(', ');
      const simpulan = () => {
        console.log("totalSum:", totalSum);
        console.log("adms:", adms);
        console.log('dosen', dosens);
        console.log('spmi', spmis);

        // Parse totalSum menjadi angka jika memungkinkan
        const parsedTotalSum = parseFloat(totalSum);

        // Ubah kondisi untuk memastikan bahwa adms, dosens, dan spmis benar-benar berisi string 'MEMENUHI'
        const isMemenuhi = (
          typeof parsedTotalSum === 'number' && parsedTotalSum >= 200 &&
          adms === 'MEMENUHI' &&
          dosens === 'MEMENUHI' &&
          spmis === 'MEMENUHI'
        );

        console.log("isMemenuhi:", isMemenuhi);

        if (isMemenuhi) {
          console.log("Hasil: MEMENUHI");
          return 'MEMENUHI';
        } else {
          console.log("Hasil: TIDAK MEMENUHI");
          return 'TIDAK MEMENUHI';
        }
      };

      console.log('simpulan', simpulan());

      const terbobotiValues = calculatedValues;

      const simpulanStatus = simpulan();
      setTerbobotiValues(terbobotiValues);
      setTotalSum(totalSum);
      setKurikulumStatus(kurikulumStatus);
      setDosen(dosen);
      setSpmi(spmi)
      setSimpulan(simpulanStatus)
    }
  }, [data, rows1, view]);


  // create PUT penilaian kecukupan
  const [isDraftMode, setIsDraftMode] = useState(false);
  // create PUT penilaian kecukupan

  const [fileUrl1, setFileUrl1] = useState(null);
  const handleDownloadFilePenilaian = async () => {
    try {
      const programStudiId = localStorage.getItem('programStudiId')
      const asesorId = localStorage.getItem('id')
      const response = await api.get(`/prodi-assesment/form-ak/${asesorId}/${programStudiId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

        setTimeout(() => {
          window.open(response.data.downloadLink, '_blank');
          setFileUrl1(response.data.downloadLink);
          swal.close();
        }, 1000);
      } else {
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `${error.message}`
      });
    }
  };

  const handleSubmitToUser = (kode) => {
    const programStudiId = localStorage.getItem("programStudiId");
    axios
      .put(
        `${baseUrl}/req-prodi/prodi-doc/${programStudiId}/${kode}?status=1`, {},
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
          getData();
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
  const [showAdditionalDivs, setShowAdditionalDivs] = useState(false);
  const handleSesuaiChange = (e) => {
    setSesuai(e.target.value);
    if (e.target.value === '9') {
      setShowAdditionalDivs(true);
    } else {
      setShowAdditionalDivs(false);
    }
  };
  return (
    <>
      <div className="p-5">
        <div className="card-body">
          <button
            className={`scroll-to-top-button ${isVisible ? "show" : ""}`}
            onClick={scrollToTop}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <FontAwesomeIcon
              icon={faArrowUp}
              color={isHovered ? "#969696" : "white"}
            />
          </button>

          <div className="row d-flex g-2">
            <div className="col-sm-12 col-md-10 ">
              <div
                style={{
                  backgroundColor: "rgb(255, 241, 118)",
                  width: "auto",
                  height: "128px",
                  borderRadius: "10px",
                }}
                className="d-flex align-items-center "
              >
                <div className="m-auto d-flex align-items-center text-center">
                  <h4>INSTRUMEN PENILAIAN PROGRAM STUDI BARU</h4>
                </div>
              </div>
            </div>
            <div className=" col-sm-12 col-md-2">
              <div
                style={{
                  width: "auto",
                  height: "128px",
                  borderRadius: "10px",
                  backgroundColor: "rgb(221, 221, 221)",
                }}
                className="align-items-center d-flex "
              >
                <div className="m-auto">
                  <h4 className="text-center">VERSI</h4>
                  <h4 className="text-center">2023</h4>
                </div>
              </div>
            </div>

            <div className="mt-4 d-flex gap-3">
              <h4>Data Program Studi Yang Di Evaluasi</h4>

            </div>
          </div>
          <div className="row container mt-4" style={{ lineHeight: "5px" }}>
            <div className="col-sm-12 col-md-3">
              <p>No. Registrasi :</p>
            </div>
            <div className="col-sm-12 col-md-9 mb-4">
              <p>{data.noReg}</p>
            </div>

            <div className="col-sm-12 col-md-3">
              <p>Nama Perguruan Tinggi:</p>
            </div>
            <div className="col-sm-12 col-md-9 mb-4">
              <p>{data.lembaga}</p>
            </div>


            <div className="col-sm-12 col-md-3">
              <p>Program Studi:</p>
            </div>
            <div className="col-sm-12 col-md-9 mb-4">
              <p>{data.namaProdi}</p>
            </div>

            <div className="col-sm-12 col-md-3">
              <p>Program :</p>
            </div>
            <div className="col-sm-12 col-md-9 mb-4">
              <p>{data.jenjangStr}</p>
            </div>

            <div className="col-sm-12 col-md-3">
              <p>Tanggal Penilaian:</p>
            </div>
            <div className="col-sm-12 col-md-9">
              <p>
                {data.asesorProgramStudis?.assesmentAcceptedTime
                  ? new Date(data.asesorProgramStudis.assesmentAcceptedTime).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })
                  : '-'}
              </p>
            </div>
          </div>
          <h4 className="mt-3">Data Evaluator</h4>
          <div className="row container mt-4" style={{ lineHeight: "5px" }}>
            <div className="col-sm-12 col-md-3">
              <p>Nama Evaluator:</p>
            </div>
            <div className="col-sm-12 col-md-9 mb-4">
              <p>{data.asesorProgramStudis?.asesorEvaluator ? data.asesorProgramStudis?.asesorEvaluator : '-'}</p>
            </div>

            <div className="col-sm-12 col-md-3">
              <p>Perguruan Tinggi Asal :</p>
            </div>
            <div className="col-sm-12 col-md-9 mb-4">
              <p>{data.asesorProgramStudis?.asesorPtAsal ? data.asesorProgramStudis?.asesorPtAsal : '-'}</p>
            </div>

            <div className="col-sm-12 col-md-3">
              <p>Program Studi Asal :</p>
            </div>
            <div className="col-sm-12 col-md-9 mb-4">
              <p>{data.asesorProgramStudis?.asesorProdiAsal ? data.asesorProgramStudis?.asesorProdiAsal : '-'}</p>
            </div>

            <div className="col-sm-12 col-md-3">
              <p>Akreditasi Prodi :</p>
            </div>
            <div className="col-sm-12 col-md-9 mb-4">
              <p>{data.asesorProgramStudis?.asesorProdiAkreditasi ? data.asesorProgramStudis?.asesorProdiAkreditasi : '-'}</p>
            </div>
          </div>

          <div className="row mt-4">
            <div className="container">
              <Tabs
                value={view}
                onChange={handleChange1}
                textColor="primary"
                indicatorColor="primary"
                aria-label="Menu Tabs"
                sx={{
                  "& .Mui-selected": {
                    transform: "translateY(-5px)",
                  },
                }}
              >
                <Tab
                  label="Form Penilaian"
                  value="one"
                  sx={{
                    color: view === "one" ? "#0F56B3" : "#1C1C1C",
                  }}
                />
                <Tab
                  label="Ringkasan F1"
                  value="two"
                  sx={{
                    color: view === "two" ? "#0F56B3" : "#1C1C1C",
                  }}
                />
                <Tab
                  label="Daftar Dokumen Usulan Prodi"
                  value="three"
                  sx={{
                    color: view === "three" ? "#0F56B3" : "#1C1C1C",
                  }}
                />
              </Tabs>
              <hr style={{ marginTop: "-2px" }} />
            </div>
          </div>

          <div className="row mt-3">
            {view === "one" ? (
              <>
                <h5>Form Penilaian Asesor</h5>

                <div className=" mt-3">
                  <div
                    style={{ maxHeight: "100vh", overflowY: "scroll" }}
                    ref={divRef}
                    className="row d-flex mt-3"
                  >
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ backgroundColor: "#F9FAFC" }}>
                            Butir
                          </TableCell>
                          <TableCell
                            sx={{ backgroundColor: "#F9FAFC" }}
                            align="center"
                          >
                            Keterangan
                          </TableCell>
                          <TableCell sx={{ backgroundColor: "#F9FAFC" }}>
                            Nilai
                          </TableCell>
                          <TableCell
                            sx={{ backgroundColor: "#F9FAFC" }}
                            className="text-center"
                          >
                            Informasi Dari Instrumen Program Studi Baru
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {isSubmitted ? (
                          <TableRow>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell style={{ textAlign: "center", paddingTop: "2rem" }}>
                              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <img src={logo} alt="DIKTIS KEMENAG 2023" style={{ width: "60px", height: "auto" }} />
                                <p className="fw-bold mt-2">DIKTIS KEMENAG</p>
                                <div style={{ width: "8%" }}>
                                  <LinearProgress color="success" style={{ width: "100%" }} />
                                </div>
                              </div>
                            </TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                        ) : (
                          rows.map((row, index) => {
                            // const createdYear = new Date(data.assesmentAcceptedTime).getFullYear();
                            // if (createdYear !== 2024 && row.butir === 'A') {
                            //   return null;
                            // }
                            return (
                              <TableRow key={index}>
                                <TableCell scope="row">{row.butir}</TableCell>
                                <TableCell>{row.keterangan}</TableCell>
                                <TableCell>
                                  {index === 3 ? (
                                    <button
                                      style={{ backgroundColor: "#FFF54E" }}
                                      className="btn btn-none fw-bold ms-auto d-flex px-2 py-3"
                                    >
                                      <span>
                                        {data?.asesorProgramStudis?.questions?.form1?.find(item => item.code === '*')?.nilai || '-'}
                                      </span>
                                    </button>
                                  ) : (
                                    <>
                                      {index === 3 ? (
                                        <select
                                          style={{ borderRadius: '3px' }}
                                          className="w-100 py-1 px-1"
                                          aria-label="Default select example"

                                          value={row.nilai || ''}
                                          onChange={(e) => handleNilaiChange(e, index)}
                                        >
                                          <option value="MEMENUHI">MEMENUHI</option>
                                          <option value="TIDAK MEMENUHI">TIDAK MEMENUHI</option>
                                        </select>
                                      ) : (
                                        isStatusDraft === 23 ? (
                                          data.asesorProgramStudis.questions.form1 &&
                                          data.asesorProgramStudis.questions.form1
                                            .filter(item => item.code === row.butir)
                                            .map(item => (
                                              <select
                                                style={{ borderRadius: '3px' }}
                                                className="w-100 py-1 px-1"
                                                aria-label="Default select example"
                                                value={row.nilai || ''}
                                                onChange={(e) => handleNilaiChange(e, index)}
                                              >
                                                <option key={item.code} value={item.nilai}>
                                                  {item.nilai}
                                                </option>
                                              </select>
                                            ))
                                        ) : (
                                          row.butir === 'B' ? (
                                            <select
                                              style={{ borderRadius: '3px' }}
                                              className="w-100 py-1 px-1"
                                              aria-label="Default select example"

                                              value={row.nilai || ''}
                                              onChange={(e) => handleABCDENilaiChange(e, index)}
                                            >
                                              <option value="">-- Pilih Nilai --</option>
                                              <option value="Ada">Ada</option>
                                              <option value="Tidak Ada">Tidak Ada</option>
                                            </select>
                                          ) : (
                                            row.butir === 'A' || row.butir === 'B' ? (
                                              <>
                                                <select
                                                  style={{ borderRadius: '3px' }}
                                                  className="w-100 py-1 px-1"
                                                  aria-label="Default select example"

                                                  // value={data.statusSwasta !== 1 ? "Ada" : row.nilai}
                                                  value={row.nilai || ''}
                                                  onChange={(e) => handleABCDENilaiChange(e, index)}
                                                // disabled={data.statusSwasta !== 1}
                                                >
                                                  <option value="">-- Pilih Nilai --</option>
                                                  <option value="Ada">Ada</option>
                                                  <option value="Tidak Ada">Tidak Ada</option>
                                                </select>

                                              </>
                                            )
                                              : (
                                                <select
                                                  style={{ borderRadius: '3px' }}
                                                  className="w-100 py-1 px-1"
                                                  aria-label="Default select example"

                                                  value={row.nilai || ''}
                                                  onChange={(e) => handleABCDENilaiChange(e, index)}
                                                >
                                                  <option value="">-- Pilih Nilai --</option>
                                                  <option value="Ada">Ada</option>
                                                  <option value="Tidak Ada">Tidak Ada</option>
                                                </select>
                                              )
                                          )
                                        )
                                      )}

                                      {data.statusSwasta ? (
                                        !row.nilai &&
                                        !data?.asesorProgramStudis?.questions?.form1?.[index]?.nilai && (
                                          <p
                                            className="mt-2 text-center"
                                            style={{
                                              color: "red",
                                              fontStyle: "italic",
                                            }}
                                          >
                                            Belum di Isi
                                          </p>
                                        )
                                      ) : !row.nilai &&
                                      !data?.asesorProgramStudis?.questions?.form1?.[index]?.nilai && (
                                        <p
                                          className="mt-2 text-center"
                                          style={{
                                            color: "red",
                                            fontStyle: "italic",
                                            display: row.butir === 'A' || row.butir === 'B' ? 'none' : 'block'
                                          }}
                                        >
                                          Belum di Isi
                                        </p>
                                      )}
                                    </>
                                  )}
                                </TableCell>
                                {index === 1 && (
                                  <TableCell rowSpan={rows.length}>
                                    <textarea
                                      className="px-2 py-2 form-control"
                                      style={{ height: "339px", width: "361px" }}
                                      disabled={isSubmitted}
                                      placeholder="....."
                                      value={
                                        row.note ||
                                        (data?.asesorProgramStudis?.questions?.form1 &&
                                          (
                                            data.asesorProgramStudis.questions.form1[0]?.note ||
                                            data.asesorProgramStudis.questions.form1[1]?.note ||
                                            data.asesorProgramStudis.questions.form1[2]?.note ||
                                            data.asesorProgramStudis.questions.form1[3]?.note ||
                                            data.asesorProgramStudis.questions.form1[4]?.note ||
                                            data.asesorProgramStudis.questions.form1[5]?.note
                                          )
                                        ) ||
                                        ""
                                      }
                                      onChange={(e) => handleNoteChange(e, index)}
                                    ></textarea>
                                    {!row.note &&
                                      ![0, 1, 2, 3, 4, 5].some((indexToCheck) =>
                                        data?.asesorProgramStudis?.questions?.form1?.[indexToCheck]?.note
                                      ) && (
                                        <p
                                          className="mt-2 text-center"
                                          style={{
                                            color: "red",
                                            fontStyle: "italic",
                                          }}
                                        >
                                          Belum di Isi
                                        </p>
                                      )}
                                  </TableCell>
                                )}
                              </TableRow>
                            );
                          })
                        )}

                      </TableBody>
                    </Table>

                    {/* Nilai */}
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ backgroundColor: "#F9FAFC" }}>
                            Butir
                          </TableCell>
                          <TableCell
                            sx={{ backgroundColor: "#F9FAFC" }}
                            align="center"
                          >
                            Keterangan
                          </TableCell>
                          <TableCell sx={{ backgroundColor: "#F9FAFC" }}>
                            Nilai
                          </TableCell>
                          <TableCell
                            sx={{ backgroundColor: "#F9FAFC" }}
                            className="text-center"
                          >
                            Informasi Dari Instrumen Program Studi Baru
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>

                        {isSubmitted ? (
                          <TableRow>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell style={{ textAlign: "center", paddingTop: "2rem" }}>
                              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <img src={logo} alt="DIKTIS KEMENAG 2023" style={{ width: "60px", height: "auto" }} />
                                <p className="fw-bold mt-2">DIKTIS KEMENAG</p>
                                <div style={{ width: "8%" }}>
                                  <LinearProgress color="success" style={{ width: "100%" }} />
                                </div>
                              </div>
                            </TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                        ) : (
                          rows1.map((row, index) => (
                            <TableRow key={index}>
                              <TableCell scope="row">{row.butir}</TableCell>
                              <TableCell>{row.keterangan}</TableCell>
                              <TableCell>
                                <div className="d-flex">
                                  {row.showButton && (
                                    <>
                                      <button
                                        style={{
                                          width: "20px",
                                          height: "20px",
                                          borderRadius: "50%",
                                          backgroundColor: "blue",
                                          color: "white",
                                        }}
                                        onClick={() => handleOpen(index)}
                                        className="text-center fw-bold me-3 mt-1"
                                      >
                                        !
                                      </button>
                                      <input
                                        onKeyDown={(e) => {
                                          const allowedCharacters = /^[0-9,]+$/;

                                          if (!allowedCharacters.test(e.key) && e.key.length === 1) {
                                            e.preventDefault();
                                          }
                                        }}
                                        value={
                                          row.nilai ||
                                          (data?.asesorProgramStudis?.questions?.form2 &&
                                            data.asesorProgramStudis.questions.form2.find(
                                              item => item.code === '1.1'
                                            )?.nilai) ||
                                          ''
                                        }
                                        onChange={(e) =>
                                          handleNilaiChangeTable2(e, index)
                                        }
                                        className="form-control"
                                        type="text"
                                        disabled={isSubmitted}
                                      />
                                    </>
                                  )}
                                  {row.showButton1 && (
                                    <>
                                      <button
                                        style={{
                                          width: "20px",
                                          height: "20px",
                                          borderRadius: "50%",
                                          backgroundColor: "blue",
                                          color: "white",
                                        }}
                                        onClick={() => handleOpen1(index)}
                                        className="text-center fw-bold me-3 mt-1"
                                      >
                                        !
                                      </button>
                                      <input
                                        onKeyDown={(e) => {
                                          const allowedCharacters = /^[0-9,]+$/;

                                          if (!allowedCharacters.test(e.key) && e.key.length === 1) {
                                            e.preventDefault();
                                          }
                                        }}
                                        value={
                                          row.nilai ||
                                          (data?.asesorProgramStudis?.questions?.form2 &&
                                            data.asesorProgramStudis.questions.form2.find(
                                              item => item.code === '1.2'
                                            )?.nilai) ||
                                          ''
                                        }
                                        onChange={(e) =>
                                          handleNilaiChangeTable2(e, index)
                                        }
                                        className="form-control"
                                        type="text"
                                        disabled={isSubmitted}
                                      />
                                    </>
                                  )}
                                  {row.showButton2 && (
                                    <>
                                      <button
                                        style={{
                                          width: "20px",
                                          height: "20px",
                                          borderRadius: "50%",
                                          backgroundColor: "blue",
                                          color: "white",
                                        }}
                                        onClick={() => handleOpen2(index)}
                                        className="text-center fw-bold me-3 mt-1"
                                      >
                                        !
                                      </button>
                                      <input
                                        onKeyDown={(e) => {
                                          const allowedCharacters = /^[0-9,]+$/;

                                          if (!allowedCharacters.test(e.key) && e.key.length === 1) {
                                            e.preventDefault();
                                          }
                                        }}
                                        value={
                                          row.nilai ||
                                          (data?.asesorProgramStudis?.questions?.form2 &&
                                            data.asesorProgramStudis.questions.form2.find(
                                              item => item.code === '1.3'
                                            )?.nilai) ||
                                          ''
                                        }
                                        onChange={(e) =>
                                          handleNilaiChangeTable2(e, index)
                                        }
                                        className="form-control"
                                        type="text"
                                        disabled={isSubmitted}

                                      />
                                    </>
                                  )}
                                  {row.showButton3 && (
                                    <>
                                      <button
                                        style={{
                                          width: "20px",
                                          height: "20px",
                                          borderRadius: "50%",
                                          backgroundColor: "blue",
                                          color: "white",
                                        }}
                                        onClick={() => handleOpen3(index)}
                                        className="text-center fw-bold me-3 mt-1"
                                      >
                                        !
                                      </button>
                                      <input
                                        onKeyDown={(e) => {
                                          const allowedCharacters = /^[0-9,]+$/;

                                          if (!allowedCharacters.test(e.key) && e.key.length === 1) {
                                            e.preventDefault();
                                          }
                                        }}
                                        value={
                                          row.nilai ||
                                          (data?.asesorProgramStudis?.questions?.form2 &&
                                            data.asesorProgramStudis.questions.form2.find(
                                              item => item.code === '1.4'
                                            )?.nilai) ||
                                          ''
                                        }
                                        onChange={(e) =>
                                          handleNilaiChangeTable2(e, index)
                                        }
                                        className="form-control"
                                        type="text"
                                        disabled={isSubmitted}
                                      />
                                    </>
                                  )}
                                  {row.showButton4 && (
                                    <>
                                      <button
                                        style={{
                                          width: "20px",
                                          height: "20px",
                                          borderRadius: "50%",
                                          backgroundColor: "blue",
                                          color: "white",
                                        }}
                                        onClick={() => handleOpen4(index)}
                                        className="text-center fw-bold me-3 mt-1"
                                      >
                                        !
                                      </button>
                                      <input
                                        onKeyDown={(e) => {
                                          const allowedCharacters = /^[0-9,]+$/;

                                          if (!allowedCharacters.test(e.key) && e.key.length === 1) {
                                            e.preventDefault();
                                          }
                                        }}
                                        value={
                                          row.nilai ||
                                          (data?.asesorProgramStudis?.questions?.form2 &&
                                            data.asesorProgramStudis.questions.form2.find(
                                              item => item.code === '1.5'
                                            )?.nilai) ||
                                          ''
                                        }
                                        onChange={(e) =>
                                          handleNilaiChangeTable2(e, index)
                                        }
                                        className="form-control"
                                        type="text"
                                        disabled={isSubmitted}
                                      />
                                    </>
                                  )}
                                  {row.showButton6 && (
                                    <>
                                      <button
                                        style={{
                                          width: "20px",
                                          height: "20px",
                                          borderRadius: "50%",
                                          backgroundColor: "blue",
                                          color: "white",
                                        }}
                                        onClick={() => handleOpen5(index)}
                                        className="text-center fw-bold me-3 mt-1"
                                      >
                                        !
                                      </button>
                                      <input
                                        onKeyDown={(e) => {
                                          const allowedCharacters = /^[0-9,]+$/;

                                          if (!allowedCharacters.test(e.key) && e.key.length === 1) {
                                            e.preventDefault();
                                          }
                                        }}
                                        value={
                                          row.nilai ||
                                          (data?.asesorProgramStudis?.questions?.form2 &&
                                            data.asesorProgramStudis.questions.form2.find(
                                              item => item.code === '1.6'
                                            )?.nilai) ||
                                          ''
                                        }
                                        onChange={(e) =>
                                          handleNilaiChangeTable2(e, index)
                                        }
                                        className="form-control"
                                        type="text"
                                        disabled={isSubmitted}
                                      />
                                    </>
                                  )}
                                  {row.showButton7 && (
                                    <>
                                      <button
                                        style={{
                                          width: "20px",
                                          height: "20px",
                                          borderRadius: "50%",
                                          backgroundColor: "blue",
                                          color: "white",
                                        }}
                                        onClick={() => handleOpen6(index)}
                                        className="text-center fw-bold me-3 mt-1"
                                      >
                                        !
                                      </button>
                                      <input
                                        onKeyDown={(e) => {
                                          const allowedCharacters = /^[0-9,]+$/;

                                          if (!allowedCharacters.test(e.key) && e.key.length === 1) {
                                            e.preventDefault();
                                          }
                                        }}
                                        value={
                                          row.nilai ||
                                          (data?.asesorProgramStudis?.questions?.form2 &&
                                            data.asesorProgramStudis.questions.form2.find(
                                              item => item.code === '2.1'
                                            )?.nilai) ||
                                          ''
                                        }
                                        onChange={(e) =>
                                          handleNilaiChangeTable2(e, index)
                                        }
                                        className="form-control"
                                        type="text"
                                        disabled={isSubmitted}
                                      />
                                    </>
                                  )}
                                  {row.showButton8 && (
                                    <>
                                      <button
                                        style={{
                                          width: "20px",
                                          height: "20px",
                                          borderRadius: "50%",
                                          backgroundColor: "blue",
                                          color: "white",
                                        }}
                                        onClick={() => handleOpen7(index)}
                                        className="text-center fw-bold me-3 mt-1"
                                      >
                                        !
                                      </button>
                                      <input
                                        onKeyDown={(e) => {
                                          const allowedCharacters = /^[0-9,]+$/;

                                          if (!allowedCharacters.test(e.key) && e.key.length === 1) {
                                            e.preventDefault();
                                          }
                                        }}
                                        value={
                                          row.nilai ||
                                          (data?.asesorProgramStudis?.questions?.form2 &&
                                            data.asesorProgramStudis.questions.form2.find(
                                              item => item.code === '3.1.1'
                                            )?.nilai) ||
                                          ''
                                        }
                                        onChange={(e) =>
                                          handleNilaiChangeTable2(e, index)
                                        }
                                        className="form-control"
                                        type="text"
                                        disabled={isSubmitted}
                                      />
                                    </>
                                  )}
                                  {row.showButton9 && (
                                    <>
                                      <button
                                        style={{
                                          width: "20px",
                                          height: "20px",
                                          borderRadius: "50%",
                                          backgroundColor: "blue",
                                          color: "white",
                                        }}
                                        onClick={() => handleOpen8(index)}
                                        className="text-center fw-bold me-3 mt-1"
                                      >
                                        !
                                      </button>
                                      <input
                                        onKeyDown={(e) => {
                                          const allowedCharacters = /^[0-9,]+$/;

                                          if (!allowedCharacters.test(e.key) && e.key.length === 1) {
                                            e.preventDefault();
                                          }
                                        }}
                                        value={
                                          row.nilai ||
                                          (data?.asesorProgramStudis?.questions?.form2 &&
                                            data.asesorProgramStudis.questions.form2.find(
                                              item => item.code === '3.1.2'
                                            )?.nilai) ||
                                          ''
                                        }
                                        onChange={(e) =>
                                          handleNilaiChangeTable2(e, index)
                                        }
                                        className="form-control"
                                        type="text"
                                        disabled={isSubmitted}
                                      />
                                    </>
                                  )}
                                  {row.showButton10 && (
                                    <>
                                      <button
                                        style={{
                                          width: "20px",
                                          height: "20px",
                                          borderRadius: "50%",
                                          backgroundColor: "blue",
                                          color: "white",
                                        }}
                                        onClick={() => handleOpen9(index)}
                                        className="text-center fw-bold me-3 mt-1"
                                      >
                                        !
                                      </button>
                                      <input
                                        onKeyDown={(e) => {
                                          const allowedCharacters = /^[0-9,]+$/;

                                          if (!allowedCharacters.test(e.key) && e.key.length === 1) {
                                            e.preventDefault();
                                          }
                                        }}
                                        value={
                                          row.nilai ||
                                          (data?.asesorProgramStudis?.questions?.form2 &&
                                            data.asesorProgramStudis.questions.form2.find(
                                              item => item.code === '3.2'
                                            )?.nilai) ||
                                          ''
                                        }
                                        onChange={(e) =>
                                          handleNilaiChangeTable2(e, index)
                                        }
                                        className="form-control"
                                        type="text"
                                        disabled={isSubmitted}
                                      />
                                    </>
                                  )}
                                  {row.showButton311 && (
                                    <div>
                                      <input
                                        onKeyDown={(e) => {
                                          const allowedCharacters = /^[0-9,]+$/;

                                          if (!allowedCharacters.test(e.key) && e.key.length === 1) {
                                            e.preventDefault();
                                          }
                                        }}
                                        type="text"
                                        className="form-control"
                                        value={row.nilai || (data?.asesorProgramStudis?.questions?.form2 &&
                                          data.asesorProgramStudis.questions.form2.find(
                                            item => item.code === '3.3.1'
                                          )?.nilai) || calculateAverageTotalNilai(
                                            calculateTotalNilai(formData2.luasRuangPerMahasiswa, formData2.status2),
                                            calculateTotalNilai3(formData3.luasRuangPerMahasiswa, formData3.status3),
                                            calculateTotalNilai4(formData4.luasRuangPerMahasiswa, formData4.status4),
                                            calculateTotalNilai5(formData5.ltrp)
                                          )}
                                        disabled
                                      />
                                      <div className="d-flex">
                                        <button
                                          onClick={() => handleOpen12(index)}
                                          className="text-center btn btn-success rounded-5 fw-bold me-3 mt-2 mb-2"
                                        >
                                          <EditNotificationsIcon />
                                        </button>
                                        <input
                                          onKeyDown={(e) => {
                                            const allowedCharacters = /^[0-9,]+$/;

                                            if (!allowedCharacters.test(e.key) && e.key.length === 1) {
                                              e.preventDefault();
                                            }
                                          }}
                                          type="text"
                                          className="form-control mt-2"
                                          value={calculateTotalNilai(formData2.luasRuangPerMahasiswa, formData2.status2)}
                                          disabled

                                        />
                                      </div>

                                      <br />
                                      <div className="d-flex">
                                        <button
                                          onClick={() => handleOpen13(index)}
                                          className="text-center btn btn-success rounded-5 fw-bold me-3 mt-2 mb-2"
                                        >
                                          <EditNotificationsIcon />
                                        </button>
                                        <input
                                          onKeyDown={(e) => {
                                            const allowedCharacters = /^[0-9,]+$/;

                                            if (!allowedCharacters.test(e.key) && e.key.length === 1) {
                                              e.preventDefault();
                                            }
                                          }}
                                          type="text"
                                          className="form-control"
                                          value={calculateTotalNilai3(formData3.luasRuangPerMahasiswa, formData3.status3)}
                                          disabled
                                        />
                                      </div>

                                      <br />
                                      <div className="d-flex">
                                        <button
                                          onClick={() => handleOpen14(index)}
                                          className="text-center btn btn-success rounded-5 fw-bold me-3 mt-2 mb-2"
                                        >
                                          <EditNotificationsIcon />
                                        </button>
                                        <input
                                          onKeyDown={(e) => {
                                            const allowedCharacters = /^[0-9,]+$/;

                                            if (!allowedCharacters.test(e.key) && e.key.length === 1) {
                                              e.preventDefault();
                                            }
                                          }}
                                          type="text"
                                          className="form-control"
                                          value={calculateTotalNilai4(formData4.luasRuangPerMahasiswa, formData4.status4)}
                                          disabled
                                        />
                                      </div>
                                      <br />
                                      <div className="d-flex">
                                        <button
                                          onClick={() => handleOpen3314(index)}
                                          className="text-center btn btn-success rounded-5 fw-bold me-3 mt-2 mb-2"
                                        >
                                          <EditNotificationsIcon />
                                        </button>
                                        <input
                                          onKeyDown={(e) => {
                                            const allowedCharacters = /^[0-9,]+$/;

                                            if (!allowedCharacters.test(e.key) && e.key.length === 1) {
                                              e.preventDefault();
                                            }
                                          }}
                                          type="text"
                                          className="form-control"
                                          value={calculateTotalNilai5(formData5.ltrp)}
                                          disabled
                                        />

                                      </div>

                                      <span style={{ fontSize: '12px', color: 'green', fontWeight: 'bold' }}>klik icon untuk isi nilai</span>
                                      {isNaN(calculateAverageTotalNilai(
                                        calculateTotalNilai(formData2.luasRuangPerMahasiswa, formData2.status2),
                                        calculateTotalNilai3(formData3.luasRuangPerMahasiswa, formData3.status3),
                                        calculateTotalNilai4(formData4.luasRuangPerMahasiswa, formData4.status4),
                                        calculateTotalNilai5(formData5.ltrp)
                                      )) &&
                                        (
                                          <p
                                            className="mt-2 text-center"
                                            style={{
                                              color: "red",
                                              fontStyle: "italic",
                                            }}
                                          >
                                            Belum di Isi
                                          </p>
                                        )}
                                    </div>
                                  )}
                                  {row.showButton11 && (
                                    <>
                                      <button
                                        style={{
                                          width: "20px",
                                          height: "20px",
                                          borderRadius: "50%",
                                          backgroundColor: "blue",
                                          color: "white",
                                        }}
                                        onClick={() => handleOpen10(index)}
                                        className="text-center fw-bold me-3 mt-1"
                                      >
                                        !
                                      </button>
                                      <input
                                        value={
                                          row.nilai ||
                                          (data?.asesorProgramStudis?.questions?.form2 &&
                                            data.asesorProgramStudis.questions.form2.find(
                                              item => item.code === '3.3.2'
                                            )?.nilai) ||
                                          ''
                                        }
                                        onChange={(e) =>
                                          handleNilaiChangeTable2(e, index)
                                        }
                                        className="form-control"
                                        type="text"
                                        disabled={isSubmitted}
                                      />
                                    </>
                                  )}
                                  {row.showButton15 && (
                                    <>
                                      <button
                                        style={{
                                          width: "20px",
                                          height: "20px",
                                          borderRadius: "50%",
                                          backgroundColor: "blue",
                                          color: "white",
                                        }}
                                        onClick={() => handleOpen11(index)}
                                        className="text-center fw-bold me-3 mt-1"
                                      >
                                        !
                                      </button>
                                      <input
                                        value={
                                          row.nilai ||
                                          (data?.asesorProgramStudis?.questions?.form2 &&
                                            data.asesorProgramStudis.questions.form2.find(
                                              item => item.code === '3.3.3'
                                            )?.nilai) ||
                                          ''
                                        }
                                        onChange={(e) =>
                                          handleNilaiChangeTable2(e, index)
                                        }
                                        className="form-control"
                                        type="text"
                                        disabled={isSubmitted}
                                      />
                                    </>
                                  )}
                                  {row.showButton16 && (
                                    <>
                                      <button
                                        style={{
                                          width: "20px",
                                          height: "20px",
                                          borderRadius: "50%",
                                          backgroundColor: "blue",
                                          color: "white",
                                        }}
                                        onClick={() => handleOpen20(index)}
                                        className="text-center fw-bold me-3 mt-1"
                                      >
                                        !
                                      </button>
                                      <input
                                        value={
                                          row.nilai ||
                                          (data?.asesorProgramStudis?.questions?.form2 &&
                                            data.asesorProgramStudis.questions.form2.find(
                                              item => item.code === '3.4'
                                            )?.nilai) ||
                                          ''
                                        }
                                        onChange={(e) =>
                                          handleNilaiChangeTable2(e, index)
                                        }
                                        className="form-control"
                                        type="text"
                                        disabled={isSubmitted}
                                      />
                                    </>
                                  )}
                                </div>
                                {!row.nilai &&
                                  !data?.asesorProgramStudis?.questions?.form2?.[index]?.nilai?.trim() &&
                                  (
                                    <p
                                      className="mt-2 text-center"
                                      style={{
                                        color: "red",
                                        fontStyle: "italic",
                                        display: row.butir === '3.3.1' ? 'none' : 'block'
                                      }}
                                    >
                                      Belum di Isi
                                    </p>
                                  )}
                              </TableCell>
                              <TableCell>
                                <div
                                  style={{
                                    backgroundColor: "#F1F1F1",
                                    borderRadius: "13px",
                                    height: "100px",
                                    width: "361px",
                                  }}
                                  className="align-item-center d-flex justify-content-center m-auto"
                                >
                                  <textarea
                                    className="px-2 py-2 form-control"
                                    disabled={isSubmitted}
                                    value={
                                      row.note ||
                                      (data?.asesorProgramStudis?.questions?.form2 &&
                                        data.asesorProgramStudis.questions.form2[index]?.note) ||
                                      ""
                                    }
                                    onChange={(e) =>
                                      handleNoteChangeTable2(e, index)
                                    }
                                    placeholder="....."
                                  ></textarea>
                                </div>
                                {!row.note &&
                                  !data?.asesorProgramStudis?.questions?.form2?.[index]?.note && (
                                    <p
                                      className="mt-2 text-center"
                                      style={{
                                        color: "red",
                                        fontStyle: "italic",
                                      }}
                                    >
                                      Belum di Isi
                                    </p>
                                  )}
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>

                  </div>
                </div>
              </>
            ) : view === "two" ? (
              <>
                <h5>Format 1. Laporan Asesmen Kecukupan Program Studi Baru</h5>

                <div className=" mt-3">
                  <div
                    style={{ maxHeight: "100vh", overflowY: "scroll" }}
                    ref={divRef}
                    className="row d-flex mt-3"
                  >
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ backgroundColor: "#F9FAFC" }}>
                            Butir
                          </TableCell>
                          <TableCell
                            sx={{ backgroundColor: "#F9FAFC" }}
                            align="center"
                          >
                            Aspek Penilaian
                          </TableCell>
                          <TableCell sx={{ backgroundColor: "#F9FAFC" }}>
                            Informasi Dari Instrumen Program Studi Baru
                          </TableCell>
                          <TableCell
                            sx={{ backgroundColor: "#F9FAFC" }}
                            align="center"
                          >
                            Nilai
                          </TableCell>
                          <TableCell
                            sx={{ backgroundColor: "#F9FAFC" }}

                            align="center"
                          >
                            Bobot
                          </TableCell>
                          <TableCell
                            sx={{ backgroundColor: "#F9FAFC" }}

                            align="center"
                          >
                            Nilai Terboboti
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows1.map((row, index) => {
                          return (
                            <TableRow key={index}>
                              <TableCell scope="row">{row.butir}</TableCell>
                              <TableCell>{row.keterangan}</TableCell>
                              <TableCell>
                                {
                                  row.note ||
                                  (data?.asesorProgramStudis?.questions?.form2 &&
                                    data.asesorProgramStudis.questions.form2[index]?.note) ||
                                  ""
                                }
                              </TableCell>
                              <TableCell>
                                <div className="d-flex">
                                  {row.showButton && (
                                    <>
                                      {
                                        row.nilai ||
                                        (data?.asesorProgramStudis?.questions?.form2 &&
                                          data.asesorProgramStudis.questions.form2.find(
                                            item => item.code === '1.1'
                                          )?.nilai) ||
                                        ''
                                      }
                                    </>
                                  )}
                                  {row.showButton1 && (
                                    <>
                                      {
                                        row.nilai ||
                                        (data?.asesorProgramStudis?.questions?.form2 &&
                                          data.asesorProgramStudis.questions.form2.find(
                                            item => item.code === '1.2'
                                          )?.nilai) ||
                                        ''
                                      }
                                    </>
                                  )}
                                  {row.showButton2 && (
                                    <>
                                      {
                                        row.nilai ||
                                        (data?.asesorProgramStudis?.questions?.form2 &&
                                          data.asesorProgramStudis.questions.form2.find(
                                            item => item.code === '1.3'
                                          )?.nilai) ||
                                        ''
                                      }
                                    </>
                                  )}
                                  {row.showButton3 && (
                                    <>
                                      {
                                        row.nilai ||
                                        (data?.asesorProgramStudis?.questions?.form2 &&
                                          data.asesorProgramStudis.questions.form2.find(
                                            item => item.code === '1.4'
                                          )?.nilai) ||
                                        ''
                                      }
                                    </>
                                  )}
                                  {row.showButton4 && (
                                    <>
                                      {
                                        row.nilai ||
                                        (data?.asesorProgramStudis?.questions?.form2 &&
                                          data.asesorProgramStudis.questions.form2.find(
                                            item => item.code === '1.5'
                                          )?.nilai) ||
                                        ''
                                      }
                                    </>
                                  )}
                                  {row.showButton6 && (
                                    <>
                                      {
                                        row.nilai ||
                                        (data?.asesorProgramStudis?.questions?.form2 &&
                                          data.asesorProgramStudis.questions.form2.find(
                                            item => item.code === '1.6'
                                          )?.nilai) ||
                                        ''
                                      }
                                    </>
                                  )}
                                  {row.showButton7 && (
                                    <>
                                      {
                                        row.nilai ||
                                        (data?.asesorProgramStudis?.questions?.form2 &&
                                          data.asesorProgramStudis.questions.form2.find(
                                            item => item.code === '2.1'
                                          )?.nilai) ||
                                        ''
                                      }
                                    </>
                                  )}
                                  {row.showButton8 && (
                                    <>
                                      {
                                        row.nilai ||
                                        (data?.asesorProgramStudis?.questions?.form2 &&
                                          data.asesorProgramStudis.questions.form2.find(
                                            item => item.code === '3.1.1'
                                          )?.nilai) ||
                                        ''
                                      }
                                    </>
                                  )}
                                  {row.showButton9 && (
                                    <>
                                      {
                                        row.nilai ||
                                        (data?.asesorProgramStudis?.questions?.form2 &&
                                          data.asesorProgramStudis.questions.form2.find(
                                            item => item.code === '3.1.2'
                                          )?.nilai) ||
                                        ''
                                      }
                                    </>
                                  )}
                                  {row.showButton10 && (
                                    <>
                                      {
                                        row.nilai ||
                                        (data?.asesorProgramStudis?.questions?.form2 &&
                                          data.asesorProgramStudis.questions.form2.find(
                                            item => item.code === '3.2'
                                          )?.nilai) ||
                                        ''
                                      }
                                    </>
                                  )}
                                  {row.showButton311 && (
                                    <div>
                                      {
                                        row.nilai ||
                                        (data?.asesorProgramStudis?.questions?.form2 &&
                                          data.asesorProgramStudis.questions.form2[index]?.nilai) || calculateAverageTotalNilai(
                                            calculateTotalNilai(formData2.luasRuangPerMahasiswa, formData2.status2),
                                            calculateTotalNilai3(formData3.luasRuangPerMahasiswa, formData3.status3),
                                            calculateTotalNilai4(formData4.luasRuangPerMahasiswa, formData4.status4),
                                            calculateTotalNilai5(formData5.ltrp)
                                          ) ||
                                        ""
                                      }
                                    </div>
                                  )}
                                  {row.showButton11 && (
                                    <>
                                      {
                                        row.nilai ||
                                        (data?.asesorProgramStudis?.questions?.form2 &&
                                          data.asesorProgramStudis.questions.form2.find(
                                            item => item.code === '3.3.2'
                                          )?.nilai) ||
                                        ''
                                      }
                                    </>
                                  )}
                                  {row.showButton15 && (
                                    <>
                                      {
                                        row.nilai ||
                                        (data?.asesorProgramStudis?.questions?.form2 &&
                                          data.asesorProgramStudis.questions.form2.find(
                                            item => item.code === '3.3.3'
                                          )?.nilai) ||
                                        ''
                                      }
                                    </>
                                  )}
                                  {row.showButton16 && (
                                    <>
                                      {
                                        row.nilai ||
                                        (data?.asesorProgramStudis?.questions?.form2 &&
                                          data.asesorProgramStudis.questions.form2.find(
                                            item => item.code === '3.4'
                                          )?.nilai) ||
                                        ''
                                      }
                                    </>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell className="text-center">{row.bobot}</TableCell>
                              <TableCell className="text-center">{terbobotiValues[index] || 'Loading...'}</TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                    <div className="col-12 d-flex mt-3">
                      <p className="ms-4">
                        Total Nilai (terboboti) yang diperoleh
                      </p>
                      <p
                        style={{ borderRadius: "7px" }}
                        className="px-2  fw-bold py-2 bg-success ms-auto text-white"
                      >
                        {totalSum}
                      </p>
                    </div>
                    <div className="col-12 d-flex">
                      <p className="ms-4">Persyaratan administratif</p>
                      <p
                        style={{ borderRadius: "10px" }}
                        className="px-2 fw-bold py-2 bg-success ms-auto text-white"
                      >
                        {data?.asesorProgramStudis?.questions?.form1?.find(item => item.code === '*')?.nilai || '-'}
                      </p>
                    </div>
                    <div className="col-12 d-flex">
                      <p className="ms-4">Kurikulum</p>
                      <p
                        style={{ borderRadius: "10px" }}
                        className="px-2  fw-bold py-2  bg-success ms-auto text-white"
                      >
                        {kurikulumStatus}
                      </p>
                    </div>

                    <div className="col-12 d-flex">
                      <p className="ms-4">Dosen</p>
                      <p
                        style={{ borderRadius: "10px" }}
                        className="px-2  fw-bold py-2 bg-success ms-auto text-white"
                      >
                        {dosen}
                      </p>
                    </div>
                    <div className="col-12 d-flex">
                      <p className="ms-4">SPMI</p>
                      <p
                        style={{ borderRadius: "10px" }}
                        className="px-2  fw-bold py-2 bg-success ms-auto text-white"
                      >
                        {spmi}
                      </p>
                    </div>
                    <div className="col-12 d-flex">
                      <p className="ms-4">Simpulan</p>
                      <p
                        style={{ borderRadius: "10px" }}
                        className="px-2  fw-bold py-2 bg-success ms-auto text-white"
                      >
                        {finalStatus}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : view === "three" ? (
              <>
                <div className="d-flex">
                  <h5>Daftar Dokumen Usulan Prodi</h5>
                  <button onClick={() => handleDownloadAllFile()} className="btn btn-primary ms-auto mb-3">Download Semua File</button>
                </div>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ backgroundColor: "#F9FAFC" }}>
                        No
                      </TableCell>
                      <TableCell
                        sx={{ backgroundColor: "#F9FAFC" }}
                        align="center"
                      >
                        Dokumen
                      </TableCell>
                      <TableCell sx={{ backgroundColor: "#F9FAFC" }}>
                        Status
                      </TableCell>
                      <TableCell sx={{ backgroundColor: "#F9FAFC" }}>
                        Catatan
                      </TableCell>
                      <TableCell sx={{ backgroundColor: "#F9FAFC" }}>
                        File
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows4.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell scope="row">{index + 1}</TableCell>
                        <TableCell>{row.dokumen}</TableCell>
                        <TableCell>
                          {row.status === 1111 ? <CheckCircleIcon style={{ color: "green" }} /> :
                            (row.status === 2222 || row.status === null || row.status === 0) ? '-' : <XLgIcon style={{ color: "red" }} />}
                        </TableCell>
                        <TableCell>{row.notes}</TableCell>
                        <TableCell>
                          {/* <DropdownAksi
                            itemComponent={
                              <>
                                <MenuItem
                                  onClick={() => handleDownloadFileView(row.kode)}
                                  style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                  }}
                                >
                                  Lihat
                                </MenuItem>
                                <MenuItem
                                  onClick={() => handleDownloadFile(row.kode)}
                                  style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                  }}
                                >
                                  Download
                                </MenuItem>
                                <MenuItem
                                  onClick={() => {
                                    handleSubmitToUser(row.kode);
                                  }}
                                  style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                  }}
                                >
                                  Terima
                                </MenuItem>
                                <MenuItem
                                  onClick={() => {
                                    Swal.fire({
                                      title: "Kembalikan Dengan Catatan",
                                      input: "textarea",
                                      icon: "warning",
                                      inputLabel: "Kembalikan Dengan Catatan ke User",
                                      inputAttributes: {
                                        "aria-label": "Placeholder...",
                                      },
                                      showCancelButton: true,
                                      confirmButtonText: "Konfirmasi",
                                      cancelButtonText: "Batal",
                                      preConfirm: (note) => {
                                        if (note) {
                                          handleRejectToUser(row.kode, note);
                                        }
                                      },
                                    });
                                  }}
                                >
                                  Kembalikan
                                </MenuItem>
                              </>
                            }
                          /> */}
                          <Button variant="contained" onClick={() => handleClickOpenViewFile(row.kode, localStorage.setItem('kodes', row.kode))}><RemoveRedEyeIcon fontSize="small" /></Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            ) : view === "four" ? (
              <>
                <h5>Asesment Lapangan</h5>
                <div className="d-flex">
                  <p>Apakah Perlu dilakukan Asesment Lapangan ?</p>
                  <select onChange={handleChange} className="form-select ms-2" aria-label="Default select example">
                    <option selected >Konfirmasi</option>
                    <option value="iya">Iya</option>
                    <option value="tidak">Tidak</option>
                  </select>
                </div>
                <div>
                  {selectedValue === 'iya' && (
                    <>
                      <div className="d-flex mt-3">
                        <p className="me-2">Tanggal:</p>
                        <input
                          className="form-control me-2"
                          type="date"
                          value={selectedDate.slice(0, 10) || getLatestDate()}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          style={{ width: "60%" }}

                        />
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : view === "five" ? (
              <>
                <h5>Form Penilaian Asesor Lapangan</h5>
                <div className=" mt-3">
                  <div
                    style={{ maxHeight: "100vh", overflowY: "scroll" }}
                    ref={divRef}
                    className="row d-flex mt-3"
                  >
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ backgroundColor: "#F9FAFC" }}>
                            Butir
                          </TableCell>
                          <TableCell
                            sx={{ backgroundColor: "#F9FAFC" }}
                            align="center"
                          >
                            Keterangan
                          </TableCell>
                          <TableCell sx={{ backgroundColor: "#F9FAFC" }}>
                            Nilai
                          </TableCell>
                          <TableCell
                            sx={{ backgroundColor: "#F9FAFC" }}
                            className="text-center"
                          >
                            Informasi Dari Instrumen Program Studi Baru
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows10.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell scope="row">{row.butir}</TableCell>
                            <TableCell>{row.keterangan}</TableCell>
                            <TableCell>
                              {index === 4 ? (
                                <button
                                  style={{ backgroundColor: "#FFF54E" }}
                                  className="btn btn-none fw-bold ms-auto d-flex px-3 py-3"
                                >
                                  <span>
                                    {data?.asesorProgramStudis?.questions?.form1?.[index]?.nilai2 || "-----"}
                                  </span>

                                </button>
                              ) : (
                                <>
                                  <select
                                    style={{ borderRadius: '3px' }}
                                    className="w-100 py-1 px-1"
                                    aria-label="Default select example"

                                    value={row.nilai2 || data?.asesorProgramStudis?.questions?.form1[index]?.nilai2}
                                    onChange={(e) => handleNilaiChange10(e, index)}
                                  >
                                    {index === 4 ? (
                                      <>
                                        <option value="MEMENUHI">MEMENUHI</option>
                                        <option value="TIDAK MEMENUHI">TIDAK MEMENUHI</option>
                                      </>
                                    ) : (
                                      row.butir === 'C' ? (
                                        <>
                                          <option value="">-- Pilih Nilai --</option>
                                          <option value="A atau Unggul">A atau Unggul</option>
                                          <option value="B atau Baik Sekali">B atau Baik Sekali</option>
                                          <option value="C atau Baik">C atau Baik</option>
                                          <option value="Tidak ada Informasi">Tidak ada Informasi</option>
                                        </>
                                      ) : (
                                        <>
                                          <option value="">-- Pilih Nilai --</option>
                                          <option value="Ada">Ada</option>
                                          <option value="Tidak Ada">Tidak Ada</option>
                                        </>
                                      )
                                    )}
                                  </select>

                                  {!row.nilai2 &&
                                    !data?.asesorProgramStudis?.questions?.form1?.[index]?.nilai2 && (
                                      <p
                                        className="mt-2 text-center"
                                        style={{
                                          color: "red",
                                          fontStyle: "italic",
                                        }}
                                      >
                                        Belum di Isi
                                      </p>
                                    )}
                                </>
                              )}
                            </TableCell>
                            {index === 0 && (
                              <TableCell rowSpan={rows.length}>
                                <textarea
                                  className="px-2 py-2 form-control"
                                  style={{ height: "339px", width: "361px" }}

                                  placeholder="....."
                                  value={
                                    row.note2 ||
                                    (data?.asesorProgramStudis?.questions?.form1 &&
                                      (
                                        data.asesorProgramStudis.questions.form1[0]?.note2 ||
                                        data.asesorProgramStudis.questions.form1[1]?.note2 ||
                                        data.asesorProgramStudis.questions.form1[2]?.note2 ||
                                        data.asesorProgramStudis.questions.form1[3]?.note2 ||
                                        data.asesorProgramStudis.questions.form1[4]?.note2 ||
                                        data.asesorProgramStudis.questions.form1[5]?.note2
                                      )
                                    ) ||
                                    ""
                                  }
                                  onChange={(e) => handleNoteChange10(e, index)}
                                ></textarea>
                                {!row.note2 &&
                                  ![0, 1, 2, 3, 4, 5].some((indexToCheck) =>
                                    data?.asesorProgramStudis?.questions?.form1?.[indexToCheck]?.note2
                                  ) && (
                                    <p
                                      className="mt-2 text-center"
                                      style={{
                                        color: "red",
                                        fontStyle: "italic",
                                      }}
                                    >
                                      Belum di Isi
                                    </p>
                                  )}
                              </TableCell>
                            )}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    {/* Nilai */}
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ backgroundColor: "#F9FAFC" }}>
                            Butir
                          </TableCell>
                          <TableCell
                            sx={{ backgroundColor: "#F9FAFC" }}
                            align="center"
                          >
                            Keterangan
                          </TableCell>
                          <TableCell
                            sx={{ backgroundColor: "#F9FAFC" }}
                            align="center"
                          >
                            Nilai
                          </TableCell>
                          <TableCell
                            sx={{ backgroundColor: "#F9FAFC" }}
                            align="center"
                          >
                            {" "}
                            Informasi Dari Instrumen Program Studi Baru
                          </TableCell>{" "}
                          {/* Added 'Catatan' column */}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows11.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell scope="row">{row.butir}</TableCell>
                            <TableCell>{row.keterangan}</TableCell>
                            <TableCell>
                              <div className="d-flex">
                                {row.showButton && (
                                  <>
                                    <button
                                      style={{
                                        width: "20px",
                                        height: "20px",
                                        borderRadius: "50%",
                                        backgroundColor: "blue",
                                        color: "white",
                                      }}
                                      onClick={() => handleOpen(index)}
                                      className="text-center fw-bold me-3 mt-1"
                                    >
                                      !
                                    </button>
                                    <input
                                      value={
                                        row.nilai2 ||
                                        (data?.asesorProgramStudis?.questions?.form2 &&
                                          data.asesorProgramStudis.questions.form2.find(
                                            item => item.code === '1.1'
                                          )?.nilai2) ||
                                        ''
                                      }
                                      onChange={(e) =>
                                        handleNilaiChangeTable11(e, index)
                                      }
                                      className="form-control"
                                      type="text"

                                    />
                                  </>
                                )}
                                {row.showButton1 && (
                                  <>
                                    <button
                                      style={{
                                        width: "20px",
                                        height: "20px",
                                        borderRadius: "50%",
                                        backgroundColor: "blue",
                                        color: "white",
                                      }}
                                      onClick={() => handleOpen1(index)}
                                      className="text-center fw-bold me-3 mt-1"
                                    >
                                      !
                                    </button>
                                    <input
                                      value={
                                        row.nilai2 ||
                                        (data?.asesorProgramStudis?.questions?.form2 &&
                                          data.asesorProgramStudis.questions.form2.find(
                                            item => item.code === '1.2'
                                          )?.nilai2) ||
                                        ''
                                      }
                                      onChange={(e) =>
                                        handleNilaiChangeTable11(e, index)
                                      }
                                      className="form-control"
                                      type="text"

                                    />
                                  </>
                                )}
                                {row.showButton2 && (
                                  <>
                                    <button
                                      style={{
                                        width: "20px",
                                        height: "20px",
                                        borderRadius: "50%",
                                        backgroundColor: "blue",
                                        color: "white",
                                      }}
                                      onClick={() => handleOpen2(index)}
                                      className="text-center fw-bold me-3 mt-1"
                                    >
                                      !
                                    </button>
                                    <input
                                      value={
                                        row.nilai2 ||
                                        (data?.asesorProgramStudis?.questions?.form2 &&
                                          data.asesorProgramStudis.questions.form2.find(
                                            item => item.code === '1.3'
                                          )?.nilai2) ||
                                        ''
                                      }
                                      onChange={(e) =>
                                        handleNilaiChangeTable11(e, index)
                                      }
                                      className="form-control"
                                      type="text"


                                    />
                                  </>
                                )}
                                {row.showButton3 && (
                                  <>
                                    <button
                                      style={{
                                        width: "20px",
                                        height: "20px",
                                        borderRadius: "50%",
                                        backgroundColor: "blue",
                                        color: "white",
                                      }}
                                      onClick={() => handleOpen3(index)}
                                      className="text-center fw-bold me-3 mt-1"
                                    >
                                      !
                                    </button>
                                    <input
                                      value={
                                        row.nilai2 ||
                                        (data?.asesorProgramStudis?.questions?.form2 &&
                                          data.asesorProgramStudis.questions.form2.find(
                                            item => item.code === '1.4'
                                          )?.nilai2) ||
                                        ''
                                      }
                                      onChange={(e) =>
                                        handleNilaiChangeTable11(e, index)
                                      }
                                      className="form-control"
                                      type="text"

                                    />
                                  </>
                                )}
                                {row.showButton4 && (
                                  <>
                                    <button
                                      style={{
                                        width: "20px",
                                        height: "20px",
                                        borderRadius: "50%",
                                        backgroundColor: "blue",
                                        color: "white",
                                      }}
                                      onClick={() => handleOpen4(index)}
                                      className="text-center fw-bold me-3 mt-1"
                                    >
                                      !
                                    </button>
                                    <input
                                      value={
                                        row.nilai2 ||
                                        (data?.asesorProgramStudis?.questions?.form2 &&
                                          data.asesorProgramStudis.questions.form2.find(
                                            item => item.code === '1.5'
                                          )?.nilai2) ||
                                        ''
                                      }
                                      onChange={(e) =>
                                        handleNilaiChangeTable11(e, index)
                                      }
                                      className="form-control"
                                      type="text"

                                    />
                                  </>
                                )}
                                {row.showButton6 && (
                                  <>
                                    <button
                                      style={{
                                        width: "20px",
                                        height: "20px",
                                        borderRadius: "50%",
                                        backgroundColor: "blue",
                                        color: "white",
                                      }}
                                      onClick={() => handleOpen5(index)}
                                      className="text-center fw-bold me-3 mt-1"
                                    >
                                      !
                                    </button>
                                    <input
                                      value={
                                        row.nilai2 ||
                                        (data?.asesorProgramStudis?.questions?.form2 &&
                                          data.asesorProgramStudis.questions.form2.find(
                                            item => item.code === '1.6'
                                          )?.nilai2) ||
                                        ''
                                      }
                                      onChange={(e) =>
                                        handleNilaiChangeTable11(e, index)
                                      }
                                      className="form-control"
                                      type="text"

                                    />
                                  </>
                                )}
                                {row.showButton7 && (
                                  <>
                                    <button
                                      style={{
                                        width: "20px",
                                        height: "20px",
                                        borderRadius: "50%",
                                        backgroundColor: "blue",
                                        color: "white",
                                      }}
                                      onClick={() => handleOpen6(index)}
                                      className="text-center fw-bold me-3 mt-1"
                                    >
                                      !
                                    </button>
                                    <input
                                      value={
                                        row.nilai2 ||
                                        (data?.asesorProgramStudis?.questions?.form2 &&
                                          data.asesorProgramStudis.questions.form2.find(
                                            item => item.code === '2.1'
                                          )?.nilai2) ||
                                        ''
                                      }
                                      onChange={(e) =>
                                        handleNilaiChangeTable11(e, index)
                                      }
                                      className="form-control"
                                      type="text"

                                    />
                                  </>
                                )}
                                {row.showButton8 && (
                                  <>
                                    <button
                                      style={{
                                        width: "20px",
                                        height: "20px",
                                        borderRadius: "50%",
                                        backgroundColor: "blue",
                                        color: "white",
                                      }}
                                      onClick={() => handleOpen7(index)}
                                      className="text-center fw-bold me-3 mt-1"
                                    >
                                      !
                                    </button>
                                    <input
                                      value={
                                        row.nilai2 ||
                                        (data?.asesorProgramStudis?.questions?.form2 &&
                                          data.asesorProgramStudis.questions.form2.find(
                                            item => item.code === '3.1.1'
                                          )?.nilai2) ||
                                        ''
                                      }
                                      onChange={(e) =>
                                        handleNilaiChangeTable11(e, index)
                                      }
                                      className="form-control"
                                      type="text"

                                    />
                                  </>
                                )}
                                {row.showButton9 && (
                                  <>
                                    <button
                                      style={{
                                        width: "20px",
                                        height: "20px",
                                        borderRadius: "50%",
                                        backgroundColor: "blue",
                                        color: "white",
                                      }}
                                      onClick={() => handleOpen8(index)}
                                      className="text-center fw-bold me-3 mt-1"
                                    >
                                      !
                                    </button>
                                    <input
                                      value={
                                        row.nilai2 ||
                                        (data?.asesorProgramStudis?.questions?.form2 &&
                                          data.asesorProgramStudis.questions.form2.find(
                                            item => item.code === '3.1.2'
                                          )?.nilai2) ||
                                        ''
                                      }
                                      onChange={(e) =>
                                        handleNilaiChangeTable11(e, index)
                                      }
                                      className="form-control"
                                      type="text"

                                    />
                                  </>
                                )}
                                {row.showButton10 && (
                                  <>
                                    <button
                                      style={{
                                        width: "20px",
                                        height: "20px",
                                        borderRadius: "50%",
                                        backgroundColor: "blue",
                                        color: "white",
                                      }}
                                      onClick={() => handleOpen9(index)}
                                      className="text-center fw-bold me-3 mt-1"
                                    >
                                      !
                                    </button>
                                    <input
                                      value={
                                        row.nilai2 ||
                                        (data?.asesorProgramStudis?.questions?.form2 &&
                                          data.asesorProgramStudis.questions.form2.find(
                                            item => item.code === '3.2'
                                          )?.nilai2) ||
                                        ''
                                      }
                                      onChange={(e) =>
                                        handleNilaiChangeTable11(e, index)
                                      }
                                      className="form-control"
                                      type="text"

                                    />
                                  </>
                                )}
                                {row.showButton311 && (
                                  <div>
                                    <div className="d-flex">
                                      <button
                                        style={{
                                          width: "20px",
                                          height: "20px",
                                          borderRadius: "50%",
                                          backgroundColor: "blue",
                                          color: "white",
                                        }}
                                        onClick={() => handleOpen31(index)}
                                        className="text-center fw-bold me-3 mt-5 mb-2"
                                      >
                                        !
                                      </button>

                                    </div>

                                    <br />
                                    <div className="d-flex">
                                      <button
                                        style={{
                                          width: "20px",
                                          height: "20px",
                                          borderRadius: "50%",
                                          backgroundColor: "blue",
                                          color: "white",
                                        }}
                                        onClick={() => handleOpen32(index)}
                                        className="text-center fw-bold me-3 mt-1 mb-2"
                                      >
                                        !
                                      </button>

                                    </div>

                                    <br />
                                    <div className="d-flex">
                                      <button
                                        style={{
                                          width: "20px",
                                          height: "20px",
                                          borderRadius: "50%",
                                          backgroundColor: "blue",
                                          color: "white",
                                        }}
                                        onClick={() => handleOpen33(index)}
                                        className="text-center fw-bold me-3 mt-1 mb-2"
                                      >
                                        !
                                      </button>

                                    </div>

                                    <input
                                      value={
                                        row.nilai2 ||
                                        (data?.asesorProgramStudis?.questions?.form2 &&
                                          data.asesorProgramStudis.questions.form2[index]?.nilai2) ||
                                        ""
                                      }
                                      onChange={(e) =>
                                        handleNilaiChangeTable11(e, index)
                                      }
                                      className="form-control mt-4"
                                      type="text"

                                    />
                                  </div>
                                )}
                                {row.showButton11 && (
                                  <>
                                    <button
                                      style={{
                                        width: "20px",
                                        height: "20px",
                                        borderRadius: "50%",
                                        backgroundColor: "blue",
                                        color: "white",
                                      }}
                                      onClick={() => handleOpen10(index)}
                                      className="text-center fw-bold me-3 mt-1"
                                    >
                                      !
                                    </button>
                                    <input
                                      value={
                                        row.nilai2 ||
                                        (data?.asesorProgramStudis?.questions?.form2 &&
                                          data.asesorProgramStudis.questions.form2.find(
                                            item => item.code === '3.3.2'
                                          )?.nilai2) ||
                                        ''
                                      }
                                      onChange={(e) =>
                                        handleNilaiChangeTable11(e, index)
                                      }
                                      className="form-control"
                                      type="text"

                                    />
                                  </>
                                )}
                                {row.showButton15 && (
                                  <>
                                    <button
                                      style={{
                                        width: "20px",
                                        height: "20px",
                                        borderRadius: "50%",
                                        backgroundColor: "blue",
                                        color: "white",
                                      }}
                                      onClick={() => handleOpen11(index)}
                                      className="text-center fw-bold me-3 mt-1"
                                    >
                                      !
                                    </button>
                                    <input
                                      value={
                                        row.nilai2 ||
                                        (data?.asesorProgramStudis?.questions?.form2 &&
                                          data.asesorProgramStudis.questions.form2.find(
                                            item => item.code === '3.3.3'
                                          )?.nilai2) ||
                                        ''
                                      }
                                      onChange={(e) =>
                                        handleNilaiChangeTable11(e, index)
                                      }
                                      className="form-control"
                                      type="text"

                                    />
                                  </>
                                )}
                                {row.showButton16 && (
                                  <>
                                    <button
                                      style={{
                                        width: "20px",
                                        height: "20px",
                                        borderRadius: "50%",
                                        backgroundColor: "blue",
                                        color: "white",
                                      }}
                                      onClick={() => handleOpen20(index)}
                                      className="text-center fw-bold me-3 mt-1"
                                    >
                                      !
                                    </button>
                                    <input
                                      value={
                                        row.nilai2 ||
                                        (data?.asesorProgramStudis?.questions?.form2 &&
                                          data.asesorProgramStudis.questions.form2.find(
                                            item => item.code === '3.4'
                                          )?.nilai2) ||
                                        ''
                                      }
                                      onChange={(e) =>
                                        handleNilaiChangeTable11(e, index)
                                      }
                                      className="form-control"
                                      type="text"

                                    />
                                  </>
                                )}
                              </div>
                              {!row.nilai2 &&
                                !data?.asesorProgramStudis?.questions?.form2?.[index]?.nilai2 && (
                                  <p
                                    className="mt-2 text-center"
                                    style={{
                                      color: "red",
                                      fontStyle: "italic",
                                    }}
                                  >
                                    Belum di Isi
                                  </p>
                                )}
                            </TableCell>
                            <TableCell>
                              <div
                                style={{
                                  backgroundColor: "#F1F1F1",
                                  borderRadius: "13px",
                                  height: "100px",
                                  width: "361px",
                                }}
                                className="align-item-center d-flex justify-content-center m-auto"
                              >
                                <textarea
                                  className="px-2 py-2 form-control"
                                  value={
                                    row.note2 ||
                                    (data?.asesorProgramStudis?.questions?.form2 &&
                                      data.asesorProgramStudis.questions.form2[index]?.note2) ||
                                    ""
                                  }
                                  onChange={(e) =>
                                    handleNoteChangeTable11(e, index)
                                  }
                                ></textarea>
                              </div>
                              {!row.note2 &&
                                !data?.asesorProgramStudis?.questions?.form2?.[index]?.note2 && (
                                  <p
                                    className="mt-2 text-center"
                                    style={{
                                      color: "red",
                                      fontStyle: "italic",
                                    }}
                                  >
                                    Belum di Isi
                                  </p>
                                )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                  </div>
                </div>

              </>
            ) : null}
            <div className="col-12 mt-3">
              <h5>Rekomendasi</h5>


              <p>
                {data?.asesorProgramStudis?.rekomendasi || "-"}
              </p>
            </div>
            <div className="col-12 mt-3">
              <h5>Komentar Umum Penilaian Seluruh Kriteria</h5>
              <textarea
                value={coment || data.asesorProgramStudis?.komentar}
                onChange={(e) => setComent(e.target.value)}
                className=" form-control  mt-3 "
                disabled={isSubmitted}
                placeholder="....."
              ></textarea>
              {!coment && !data?.asesorProgramStudis?.komentar && (
                <p
                  className="text-danger"
                  style={{ fontStyle: "italic" }}
                >
                  Belum di Isi
                </p>
              )}
            </div>
          </div>
          {/* modal 1.1 */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Kriteria Penilaian
              </Typography>
              <hr />
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  <b> 4</b> Keunikan atau keunggulan program studi disusun
                  berdasarkan perbandingan tiga program studi pada tingkat
                  internasional yang mencakup tiga aspek, atau prodi yang
                  diusulkan merupakan <b>satu-satunya</b> program studi didunia
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  <b> 3</b> Keunikan atau keunggulan program studi disusun
                  berdasarkan perbandingan tiga program studi pada tingkat
                  internasional dan nasional yang mencakup tiga aspek
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  <b>2 </b>Keunikan atau keunggulan program studi disusun
                  berdasarkan perbandingan tiga program studi pada tingkat
                  nasional yang mencakup tiga aspek
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  <b>1</b> Keunikan atau Keunggulan program studi disusun
                  berdasarkan perbandingan kurang dan tiga program studi pada
                  tingkat nasional dan/atau mencakup kurang dari tiga aspek
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  <b>0 </b> Tidak mendeskripsikan/ menguraikan keunikan atau
                  keunggulan program studi
                </Alert>
              </Typography>
              <hr />
              <Button
                variant="contained"
                size="medium"
                sx={{ marginLeft: "auto", display: "flex" }}
                onClick={handleClose}
              >
                Tutup
              </Button>
            </Box>
          </Modal>

          {/* modal 1.2 */}
          <Modal
            open={open1}
            onClose={handleClose1}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Kriteria Penilaian
              </Typography>
              <hr />
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  4 Pengusul menguraikan profil lulusan program studi yang berupa
                  profesi atau jenis pekerjaan atau bentuk kerja lainnya
                  dilengkapi dengan (1) uraian ringkas seluruh profil, yang sesuai
                  dengan Program Sarjana dan (2) keterkaitan profil dengan
                  keunikan atau keunggulan program studi
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  3 Pengusul menguraikan profil lulusan program studi yang berupa
                  profesi atau jenis pekerjaan atau bentuk kerja lainnya
                  dilengkapi dengan (1) uraian ringkas pada sebagian profile yang
                  sesuai dengan Program Sarjana dan (2) keterkaitan profil dengan
                  keunikan atau keunggulan progra, studi
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  2 Keunikan atau keunggulan program studi disusun berdasarkan
                  perbandingan tiga program studi pada tingkat nasional yang
                  mencakup tiga aspek
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  1 Hanya mengidentifikasi profil lulusan atau penjelasan mengenai
                  profil lulusan tidak relevan
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  0 Tidak mengidentifikasi profil lulusan
                </Alert>
              </Typography>
              <hr />
              <Button
                variant="contained"
                size="medium"
                onClick={handleClose1}
                sx={{ marginLeft: "auto", display: "flex" }}
              >
                Tutup
              </Button>
            </Box>
          </Modal>

          {/* Modal 1.3 */}
          <Modal
            open={open2}
            onClose={handleClose2}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Kriteria Penilaian
              </Typography>
              <hr />
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  4 Rumusan capaian pembelajaran: (a) sesuai dengan profil
                  lulusan, (b)deskripsi kompetensinya sesuai SN-Dikti yang
                  mencakup 4 (empat) domain capaian pembelajaran dan sesuai level
                  6 (enam) KKNI, (3) relevan dengan keunikan atau keunggulan
                  prodi, dan (4) mencantumkan paling sedikit SN Dikti sebagai
                  rujukan
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  3 Rumusan capaian pembelajaran: (a) sesuai dengan profil
                  lulusan, (b) deskripsi kompetensinya sesuai SN-Dikti yang
                  mencakup 4 (empat) domain capaian pembelajaran dan sesuai level
                  6 (enam) KKNI, dan (3) relevan dg keunggulan atau keunikan prodi
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  2 Rumusan capaian pembelajaran: (a) sesuai dengan profil
                  lulusan, (b) deskripsi kompetensinya sesuai level 6 (enam) KKNI,
                  namun tidak menjabarkan capaian pembelajaran sesuai SN-Dikti,
                  dan (c) tidak atau kurang relevan dengan keunikan atau
                  keunggulan prodi
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  1 Rumusan capaian pembelajaran tidak sesuai dengan SN Dikti atau
                  level 6 (enam)KKNI
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  0 Tidak mencantumkan/mendeskripsikan Capaian Pembelajaran atau
                  Rumusan capaian pembelajaran tidak sesuai dengan SN Dikti atau
                  level 6 (enam) KKNI
                </Alert>
              </Typography>
              <hr />
              <Button
                variant="contained"
                size="medium"
                sx={{ marginLeft: "auto", display: "flex" }}
                onClick={handleClose2}
              >
                Tutup
              </Button>
            </Box>
          </Modal>

          {/* Modal 1.4 */}
          <Modal
            open={open3}
            onClose={handleClose3}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Kriteria Penilaian
              </Typography>
              <hr />
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  4 Susunan mata kuliah memenuhi empat aspek
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  3 Susunan mata kuliah memenuhi aspek 1, 2 dan satu aspek lainnya
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  2 Susunan mata kuliah memenuhi aspek 1 dan aspek 2
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  1 Susunan mata kuliah memenuhi aspek 1 atau 2
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  0 Tidak ada daftar/susunan mata kuliah
                </Alert>
              </Typography>
              <hr />
              <Button
                variant="contained"
                size="medium"
                sx={{ marginLeft: "auto", display: "flex" }}
                onClick={handleClose3}
              >
                Tutup
              </Button>
            </Box>
          </Modal>

          {/* Modal 1.5 */}
          <Modal
            open={open4}
            onClose={handleClose4}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Kriteria Penilaian
              </Typography>
              <hr />
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  4 Sepuluh mata kuliah dilengkapi dengan RPS yang memenuhi 9
                  komponen, menunjukkan secara jelas penciri program studi dan
                  menggunakan referensi yang relevan dan mutakhir
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  3 Sepuluh mata kuliah dilengkapi dengan RPS yang memenuhi 9
                  (sembilan) komponen, menunjukkan secara jelas penciri program
                  studi dan menggunakan referensi yang relevan
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  2 Sepuluh mata kuliah dilengkapi dengan RPS yang memenuhi 9
                  (sembilan) komponen
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  1 Jumlah RPS mata kuliah yang memenuhi 9 (sembilan) komponen
                  jumlahnya kurang dari 10
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info"> 0 Tidak ada RPS</Alert>
              </Typography>
              <hr />
              <Button
                variant="contained"
                size="medium"
                sx={{ marginLeft: "auto", display: "flex" }}
                onClick={handleClose4}
              >
                Tutup
              </Button>
            </Box>
          </Modal>

          {/* Modal 1.6 */}
          <Modal
            open={open5}
            onClose={handleClose5}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Kriteria Penilaian
              </Typography>
              <hr />
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  4 Penjelasan mencakup 2 (dua) aspek dilengkapi dengan recana
                  implementasi untuk setiap aspek
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  3 Penjelasan rancangan kebijakan mencakup 2 (dua) aspek yang
                  dilengkapi dengan rancangan implementasi untuk 1 aspek
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  2 Penjelasan rancangan kebijakan mencakup 2 (dua) aspek
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  1 Tidak ada penjelasan terkait dengan rancangan kebijakan dan
                  implementasi fasilitasi pemenuhan masa dan beban belajar Merdeka
                  Belajar - Kampus Merdeka
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info"> 0 Tidak ada skor dibawah 1</Alert>
              </Typography>
              <hr />
              <Button
                variant="contained"
                size="medium"
                sx={{ marginLeft: "auto", display: "flex" }}
                onClick={handleClose5}
              >
                Tutup
              </Button>
            </Box>
          </Modal>

          {/* Modal 2.1 */}
          <Modal
            open={open6}
            onClose={handleClose6}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Kriteria Penilaian
              </Typography>
              <hr />
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  4 Jumlah calon dosen tetap sedikitnya sebanyak 5 (lima) orang:
                  (a) berkualifikasi akademik lulusan magister atau magister
                  terapan dan doktor atau doktor terapan yang relevan degan
                  program studi, atau setara dengan level 8 (delapan) dan 9
                  (sembilan) KKNI, (b) telah diangkat sebagai PNS dipekerjakan
                  pada PTS pengusul atau telah diangkat sebagai dosen tetap oleh
                  Badan Penyelenggara
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  3 Jumlah calon dosen tetap sedikitnya sebanyak 5 (lima) orang
                  berkualifikasi akademik lulusan magister atau magister terapan
                  yang relevan dengan program studi yang diusulkan, atau setara
                  dengan level 8 (delapan) KKNI, dengan komposisi: (a) 3 (tiga)
                  orang telah diangkat sebagai dosen tetap oleh pemimpin PTS
                  pengusul atau Badan Penyelenggara, dan (b) 2 (dua) orang lainnya
                  telah menandatangani surat perjanjian kesediaan pengangkatan
                  dosen tetap dengan pemimpin PTS atau Badan Penyelenggara
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  2 Jumlah calon dosen tetap sebanyak 5 (lima) orang
                  berkualifikasi akademik lulusan magister atau magister terapan
                  yang relevan dengan program studi yang diusulkan, atau setara
                  dengan level 8 (delapan) KKNI, dengan komposisi : (a) 3 (tiga)
                  orang diantaranya telah menandatangani surat perjanjian
                  kesediaan pengangkatan dosen tetap dengan pemimpin PTS pengusul
                  atau Badan Penyelenggara, dan (b) 2 (dua) orang lainnya
                  merupakan dosen dari PT lain yang ditugaskan oleh Pemimpin PTS
                </Alert>
              </Typography>
              <hr />
              <Button
                variant="contained"
                size="medium"
                sx={{ marginLeft: "auto", display: "flex" }}
                onClick={handleClose6}
              >
                Tutup
              </Button>
            </Box>
          </Modal>

          {/* Modal 3.1.1 */}
          <Modal
            open={open7}
            onClose={handleClose7}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Kriteria Penilaian
              </Typography>
              <hr />
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  4 Jika struktur organisasi memenuhi 5 (lima) aspek dan
                  dilengkapi dengan tata kerja UPPS yang memperlihatkan kedudukan
                  dan tata hubungan antara program studi yang diusulkan dan unit
                  organisasi yang ada pada UPPS
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  3 Jika struktur organisasi memenuhi 4 (empat) aspek pertama dan
                  dilengkapi dengan tata kerja UPPS yang memperlihatkan kedudukan
                  dan tata hubungan antara program studi yang diusulkan dan unit
                  organisasi yang ada pada UPPS
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  2 Jika struktur organisasi memenuhi 3 (tiga) aspek pertama dan
                  dilengkapi dengan tata kerja UPPS yang memperlihatkan kedudukan
                  dan tata hubungan antara program studi yang diusulkan dan unit
                  organisasi yang ada pada UPPS
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  1 Jika struktur organisasi memenuhi kurang dari 3 (tiga) aspek
                  pertama dan tidak dilengkapi dengan tata kerja UPPS yang
                  memperlihatkan kedudukan dan tata hubungan antara program studi
                  yang diusulkan dan unit organisasi yang ada pada UPPS
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  0 Jika tidak menjelaskan rencana struktur organisasi dan tata
                  kerja <b>UPPS</b>
                </Alert>
              </Typography>
              <hr />
              <Button
                variant="contained"
                size="medium"
                sx={{ marginLeft: "auto", display: "flex" }}
                onClick={handleClose7}
              >
                Tutup
              </Button>
            </Box>
          </Modal>

          {/* Modal 3.1.2 */}
          <Modal
            open={open8}
            onClose={handleClose8}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Kriteria Penilaian
              </Typography>
              <hr />
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info"> 4 Jika memenuhi 5 (lima) aspek</Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">3 Jika memenuhi 4 (empat) aspek</Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">2 Jika memenuhi 3 (tiga) aspek</Alert>
              </Typography>

              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">1 Jika memenuhi 1 - 2 aspek</Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  0 Jika tidak menjelaskan rencana perwujudan good governance
                </Alert>
              </Typography>
              <hr />
              <Button
                variant="contained"
                size="medium"
                sx={{ marginLeft: "auto", display: "flex" }}
                onClick={handleClose8}
              >
                Tutup
              </Button>
            </Box>
          </Modal>

          {/* Modal 3.2 */}
          <Modal
            open={open9}
            onClose={handleClose9}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Kriteria Penilaian
              </Typography>
              <hr />
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  4 UPPS telah melaksanakan SPMI yang memenuhi 5 aspek.
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  3 UPPS telah melaksanakan SPMI yang memenuhi aspek nomor 1
                  sampai dengan 4.
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  2 UPPS telah melaksanakan SPMI yang memenuhi aspek nomor 1
                  sampai dengan 3.
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  1 UPPS telah melaksanakan SPMI yang memenuhi aspek nomor 1 dan
                  2, serta siklus kegiatan SPMI baru dilaksanakan pada tahapan
                  penetapan standar dan pelaksanaan standar pendidikan tinggi.
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  0 UPPS telah memiliki dokumen legal pembentukan unsur pelaksana
                  penjaminan mutu tanpa pelaksanaan SPMI.
                </Alert>
              </Typography>
              <hr />
              <Button
                variant="contained"
                size="medium"
                sx={{ marginLeft: "auto", display: "flex" }}
                onClick={handleClose9}
              >
                Tutup
              </Button>
            </Box>
          </Modal>

          {/* Modal 3.3.1*/}
          {/* Modal 3.3.1.1*/}
          <Modal
            open={open12}
            onClose={handleClose12}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Kriteria Penilaian
              </Typography>
              <hr />
              <div className="d-flex">
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Luas total ruang kuliah (m2)
                </Typography>
                <div className=" ms-auto">
                  <input
                    type="text"
                    className="form-control"
                    value={
                      formData2.ltrk2
                    }
                    onChange={(e) => handleNChange2(e, "ltrk2")}
                  />
                  {!formData2.ltrk2 && (!data?.asesorProgramStudis?.questions?.form2?.[2]?.additionalFields?.ltrk2) && (
                    <p className="text-danger">Nilai Belum Ada</p>
                  )}
                </div>
              </div>

              <div className="d-flex">
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Kapasitas total
                </Typography>
                <div className=" ms-auto">
                  <input
                    type="text"
                    className="form-control"
                    value={
                      formData2.lt2
                    }
                    onChange={(e) => handleNChange2(e, "lt2")}
                  />
                  {!formData2.lt2 && (!data?.asesorProgramStudis?.questions?.form2?.[2]?.additionalFields?.lt2) && (
                    <p className="text-danger">Nilai Belum Ada</p>
                  )}
                </div>
              </div>

              <div className="d-flex">
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Luas ruang kuliah per mahasiswa
                </Typography>
                <div className=" ms-auto">
                  <input
                    type="text"
                    className="form-control"
                    value={formData2.luasRuangPerMahasiswa}
                    disabled
                  />
                </div>
              </div>
              <div className="d-flex">
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Status (SD = milik sendiri; SW = sewa/kontrak/kerjasama dll)
                </Typography>
                <div className="ms-auto">
                  <select
                    className="form-select w-100 h-100"
                    value={
                      formData2.status2 ||
                      (data?.asesorProgramStudis?.questions &&
                        data.asesorProgramStudis.questions.form2 &&
                        data.asesorProgramStudis.questions.form2[2]?.additionalFields?.status2) ||
                      ''
                    }
                    onChange={(e) => handleNChange2(e, "status2")}
                  >
                    <option value="" defaultValue>pilih status</option>
                    <option value="sd">SD</option>
                    <option value="sw">SW</option>
                  </select>
                </div>
              </div>
              <hr />

              <div className="d-flex">
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Total Nilai
                </Typography>
                <div className=" ms-auto">
                  <input
                    type="text"
                    className="form-control"
                    value={calculateTotalNilai(formData2.luasRuangPerMahasiswa, formData2.status2)}
                    disabled
                  />
                </div>
              </div>
              <div className="mt-3 justify-content-end d-flex">
                <Button
                  variant="outlined"
                  size="medium"
                  sx={{ marginLeft: "auto", display: "flex" }}
                  onClick={handleClose12}
                >
                  Tutup
                </Button>
              </div>
            </Box>
          </Modal>
          {/* Modal 3.3.1.2*/}
          <Modal
            open={open13}
            onClose={handleClose13}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Kriteria Penilaian
              </Typography>
              <hr />
              <div className="d-flex">
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Luas total ruang kerja dosen (m2)
                </Typography>
                <div className=" ms-auto">
                  <input
                    type="text"
                    className="form-control"
                    value={
                      formData3.ltrk3
                    }
                    onChange={(e) => handleNChange3(e, "ltrk3")}
                  />
                  {!formData3.ltrk3 && (!data?.asesorProgramStudis?.questions?.form2?.[3]?.additionalFields?.ltrk3) && (
                    <p className="text-danger">Nilai Belum Ada</p>
                  )}
                </div>
              </div>

              <div className="d-flex">
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Kapasitas total
                </Typography>
                <div className=" ms-auto">
                  <input
                    type="text"
                    className="form-control"
                    value={
                      formData3.lt3
                    }
                    onChange={(e) => handleNChange3(e, "lt3")}
                  />
                  {!formData3.lt3 && (!data?.asesorProgramStudis?.questions?.form2?.[3]?.additionalFields?.lt3) && (
                    <p className="text-danger">Nilai Belum Ada</p>
                  )}
                </div>
              </div>

              <div className="d-flex">
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Luas ruang kerja per dosen
                </Typography>
                <div className=" ms-auto">
                  <input
                    type="text"
                    className="form-control"
                    value={formData3.luasRuangPerMahasiswa}
                    disabled
                  />
                </div>
              </div>
              <div className="d-flex">
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Status (SD = milik sendiri; SW = sewa/kontrak/kerjasama dll)
                </Typography>
                <div className="ms-auto">
                  <select
                    className="form-select w-100 h-100"
                    value={
                      formData3.status3 ||
                      (data?.asesorProgramStudis?.questions &&
                        data.asesorProgramStudis.questions.form2 &&
                        data.asesorProgramStudis.questions.form2[3]?.additionalFields?.status3) ||
                      ''
                    }
                    onChange={(e) => handleNChange3(e, "status3")}
                  >
                    <option value="" defaultValue>pilih status</option>
                    <option value="sd">SD</option>
                    <option value="sw">SW</option>
                  </select>
                </div>
              </div>
              <hr />
              <div className="d-flex">
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Total Nilai
                </Typography>
                <div className=" ms-auto">
                  <input
                    type="text"
                    className="form-control"
                    value={calculateTotalNilai3(formData3.luasRuangPerMahasiswa, formData3.status3)}
                    disabled
                  />
                </div>
              </div>
              <div className="mt-3 justify-content-end d-flex">
                <Button
                  variant="outlined"
                  size="medium"
                  sx={{ marginLeft: "auto", display: "flex" }}
                  onClick={handleClose13}
                >
                  Tutup
                </Button>
              </div>
            </Box>
          </Modal>
          {/* Modal 3.3.1.3*/}
          <Modal
            open={open14}
            onClose={handleClose14}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Kriteria Penilaian
              </Typography>
              <hr />
              <div className="d-flex">
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Luas total ruang kerja pegawai (m2)
                </Typography>
                <div className=" ms-auto">
                  <input
                    type="text"
                    className="form-control"
                    value={
                      formData4.ltrk4
                    }
                    onChange={(e) => handleNChange4(e, "ltrk4")}
                  />
                  {!formData4.ltrk4 && (!data?.asesorProgramStudis?.questions?.form2?.[4]?.additionalFields?.ltrk4) && (
                    <p className="text-danger">Nilai Belum Ada</p>
                  )}
                </div>
              </div>

              <div className="d-flex">
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Kapasitas total
                </Typography>
                <div className=" ms-auto">
                  <input
                    type="text"
                    className="form-control"
                    value={
                      formData4.lt4
                    }
                    onChange={(e) => handleNChange4(e, "lt4")}
                  />
                  {!formData4.lt4 && (!data?.asesorProgramStudis?.questions?.form2?.[4]?.additionalFields?.lt4) && (
                    <p className="text-danger">Nilai Belum Ada</p>
                  )}
                </div>
              </div>

              <div className="d-flex">
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Luas ruang kerja per pegawai
                </Typography>
                <div className=" ms-auto">
                  <input
                    type="text"
                    className="form-control"
                    value={formData4.luasRuangPerMahasiswa}
                    disabled
                  />
                </div>
              </div>
              <div className="d-flex">
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Status (SD = milik sendiri; SW = sewa/kontrak/kerjasama dll)
                </Typography>
                <div className="ms-auto">
                  <select
                    className="form-select w-100 h-100"
                    value={
                      formData4.status4 ||
                      (data?.asesorProgramStudis?.questions &&
                        data.asesorProgramStudis.questions.form2 &&
                        data.asesorProgramStudis.questions.form2[4]?.additionalFields?.status4) ||
                      ''
                    }
                    onChange={(e) => handleNChange4(e, "status4")}
                  >
                    <option value="" defaultValue>pilih status</option>
                    <option value="sd">SD</option>
                    <option value="sw">SW</option>
                  </select>
                </div>
              </div>
              <hr />
              <div className="d-flex">
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Total Nilai
                </Typography>
                <div className=" ms-auto">
                  <input
                    type="text"
                    className="form-control"
                    value={calculateTotalNilai4(formData4.luasRuangPerMahasiswa, formData4.status4)}
                    disabled
                  />
                </div>
              </div>
              <div className="mt-3 justify-content-end d-flex">
                <Button
                  variant="outlined"
                  size="medium"
                  sx={{ marginLeft: "auto", display: "flex" }}
                  onClick={handleClose14}
                >
                  Tutup
                </Button>
              </div>
            </Box>
          </Modal>
          {/* Modal 3.3.1.4*/}
          <Modal
            open={open3314}
            onClose={handleClose3314}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Kriteria Penilaian
              </Typography>
              <hr />
              <div className="d-flex">
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Luas total ruang perpustakaan (m2) (gunakan data Butir 3.3.1)
                </Typography>
                <div className=" ms-auto">
                  <input
                    type="text"
                    className="form-control"
                    value={
                      formData5.ltrp
                    }
                    onChange={(e) => handleNChange5(e, "ltrp")}
                  />
                  {!formData5.ltrp && (!data?.asesorProgramStudis?.questions?.form2?.[4]?.additionalFields?.ltrp) && (
                    <p className="text-danger">Nilai Belum Ada</p>
                  )}
                </div>
              </div>
              <hr />
              <div className="d-flex">
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Total Nilai
                </Typography>
                <div className=" ms-auto">
                  <input
                    type="text"
                    className="form-control"
                    value={calculateTotalNilai5(formData5.ltrp) || 0}
                    disabled

                  />
                </div>
              </div>
              <div className="mt-3 justify-content-end d-flex">
                <Button
                  variant="outlined"
                  size="medium"
                  sx={{ marginLeft: "auto", display: "flex" }}
                  onClick={handleClose3314}
                >
                  Tutup
                </Button>
              </div>
            </Box>
          </Modal>

          {/* lapangan 3.1.1 */}
          {/* Modal 3.3.1.1*/}
          <Modal
            open={open31}
            onClose={handleClose31}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Kriteria Penilaian
              </Typography>
              <hr />
              <div className="d-flex">
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Luas total ruang kuliah (m2)
                </Typography>
                <div className=" ms-auto">
                  <input
                    type="text"
                    className="form-control"
                    value={
                      formData6.ltrk6 ||
                      (data?.asesorProgramStudis?.questions &&
                        data.asesorProgramStudis.questions.form2 &&
                        data.asesorProgramStudis.questions.form2[6]?.additionalFields2?.ltrk6) ||
                      ''
                    }
                    onChange={(e) => handleNChange6(e, "ltrk6")}
                  />
                  {!formData6.ltrk6 && (!data?.asesorProgramStudis?.questions?.form2?.[6]?.additionalFields2?.ltrk6) && (
                    <p className="text-danger">Nilai Belum Ada</p>
                  )}
                </div>
              </div>

              <div className="d-flex">
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Kapasitas total
                </Typography>
                <div className=" ms-auto">
                  <input
                    type="text"
                    className="form-control"
                    value={
                      formData6.lt6 ||
                      (data?.asesorProgramStudis?.questions &&
                        data.asesorProgramStudis.questions.form2 &&
                        data.asesorProgramStudis.questions.form2[6]?.additionalFields2?.lt6) ||
                      ''
                    }
                    onChange={(e) => handleNChange6(e, "lt6")}
                  />
                  {!formData6.lt6 && (!data?.asesorProgramStudis?.questions?.form2?.[6]?.additionalFields2?.lt6) && (
                    <p className="text-danger">Nilai Belum Ada</p>
                  )}
                </div>
              </div>

              <div className="d-flex">
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Luas ruang kuliah per mahasiswa
                </Typography>
                <div className=" ms-auto">
                  <input
                    type="text"
                    className="form-control"
                    value={formData6.luasRuangPerMahasiswa6}
                    disabled
                  />
                </div>
              </div>
              <div className="d-flex">
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Status (SD = milik sendiri; SW = sewa/kontrak/kerjasama dll)
                </Typography>
                <div className="ms-auto">
                  <select
                    className="form-select w-100 h-100"
                    value={
                      formData6.status6 ||
                      (data?.asesorProgramStudis?.questions &&
                        data.asesorProgramStudis.questions.form2 &&
                        data.asesorProgramStudis.questions.form2[6]?.additionalFields2?.status6) ||
                      ''
                    }
                    onChange={(e) => handleNChange6(e, "status6")}
                  >
                    <option value="" selected>pilih status</option>
                    <option value="sd">SD</option>
                    <option value="sw">SW</option>
                  </select>
                </div>
              </div>
              <hr />
              <div className="mt-3 justify-content-end d-flex">
                <Button
                  variant="outlined"
                  size="medium"
                  sx={{ marginLeft: "auto", display: "flex" }}
                  onClick={handleClose31}
                >
                  Tutup
                </Button>
              </div>
            </Box>
          </Modal>
          {/* Modal 3.3.1.2*/}
          <Modal
            open={open32}
            onClose={handleClose32}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Kriteria Penilaian
              </Typography>
              <hr />
              <div className="d-flex">
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Luas total ruang kuliah (m2)
                </Typography>
                <div className=" ms-auto">
                  <input
                    type="text"
                    className="form-control"
                    value={
                      formData7.ltrk7 ||
                      (data?.asesorProgramStudis?.questions &&
                        data.asesorProgramStudis.questions.form2 &&
                        data.asesorProgramStudis.questions.form2[7]?.additionalFields2?.ltrk7) ||
                      ''
                    }
                    onChange={(e) => handleNChange7(e, "ltrk7")}
                  />
                  {!formData7.ltrk7 && (!data?.asesorProgramStudis?.questions?.form2?.[7]?.additionalFields2?.ltrk7) && (
                    <p className="text-danger">Nilai Belum Ada</p>
                  )}
                </div>
              </div>

              <div className="d-flex">
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Kapasitas total
                </Typography>
                <div className=" ms-auto">
                  <input
                    type="text"
                    className="form-control"
                    value={
                      formData7.lt7 ||
                      (data?.asesorProgramStudis?.questions &&
                        data.asesorProgramStudis.questions.form2 &&
                        data.asesorProgramStudis.questions.form2[7]?.additionalFields2?.lt7) ||
                      ''
                    }
                    onChange={(e) => handleNChange7(e, "lt7")}
                  />
                  {!formData7.lt7 && (!data?.asesorProgramStudis?.questions?.form2?.[7]?.additionalFields2?.lt7) && (
                    <p className="text-danger">Nilai Belum Ada</p>
                  )}
                </div>
              </div>

              <div className="d-flex">
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Luas ruang kuliah per mahasiswa
                </Typography>
                <div className=" ms-auto">
                  <input
                    type="text"
                    className="form-control"
                    value={formData7.luasRuangPerMahasiswa7}

                  />
                </div>
              </div>
              <div className="d-flex">
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Status (SD = milik sendiri; SW = sewa/kontrak/kerjasama dll)
                </Typography>
                <div className="ms-auto">
                  <select
                    className="form-select w-100 h-100"
                    value={
                      formData7.status7 ||
                      (data?.asesorProgramStudis?.questions &&
                        data.asesorProgramStudis.questions.form2 &&
                        data.asesorProgramStudis.questions.form2[7]?.additionalFields2?.status7) ||
                      ''
                    }
                    onChange={(e) => handleNChange7(e, "status7")}
                  >
                    <option value="" selected>pilih status</option>
                    <option value="sd">SD</option>
                    <option value="sw">SW</option>
                  </select>
                </div>
              </div>
              <hr />
              <div className="mt-3 justify-content-end d-flex">
                <Button
                  variant="outlined"
                  size="medium"
                  sx={{ marginLeft: "auto", display: "flex" }}
                  onClick={handleClose32}
                >
                  Tutup
                </Button>
              </div>
            </Box>
          </Modal>
          {/* Modal 3.3.1.3*/}
          <Modal
            open={open33}
            onClose={handleClose33}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Kriteria Penilaian
              </Typography>
              <hr />
              <div className="d-flex">
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Luas total ruang kuliah (m2)
                </Typography>
                <div className=" ms-auto">
                  <input
                    type="text"
                    className="form-control"
                    value={
                      formData8.ltrk8 ||
                      (data?.asesorProgramStudis?.questions &&
                        data.asesorProgramStudis.questions.form2 &&
                        data.asesorProgramStudis.questions.form2[8]?.additionalFields2?.ltrk8) ||
                      ''
                    }
                    onChange={(e) => handleNChange8(e, "ltrk8")}
                  />
                  {!formData8.ltrk8 && (!data?.asesorProgramStudis?.questions?.form2?.[8]?.additionalFields2?.ltrk8) && (
                    <p className="text-danger">Nilai Belum Ada</p>
                  )}
                </div>
              </div>

              <div className="d-flex">
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Kapasitas total
                </Typography>
                <div className=" ms-auto">
                  <input
                    type="text"
                    className="form-control"
                    value={
                      formData8.lt8 ||
                      (data?.asesorProgramStudis?.questions &&
                        data.asesorProgramStudis.questions.form2 &&
                        data.asesorProgramStudis.questions.form2[8]?.additionalFields2?.lt8) ||
                      ''
                    }
                    onChange={(e) => handleNChange8(e, "lt8")}
                  />
                  {!formData8.lt8 && (!data?.asesorProgramStudis?.questions?.form2?.[8]?.additionalFields2?.lt8) && (
                    <p className="text-danger">Nilai Belum Ada</p>
                  )}
                </div>
              </div>

              <div className="d-flex">
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Luas ruang kuliah per mahasiswa
                </Typography>
                <div className=" ms-auto">
                  <input
                    type="text"
                    className="form-control"
                    value={formData8.luasRuangPerMahasiswa8}

                  />
                </div>
              </div>
              <div className="d-flex">
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Status (SD = milik sendiri; SW = sewa/kontrak/kerjasama dll)
                </Typography>
                <div className="ms-auto">
                  <select
                    className="form-select w-100 h-100"
                    value={
                      formData8.status8 ||
                      (data?.asesorProgramStudis?.questions &&
                        data.asesorProgramStudis.questions.form2 &&
                        data.asesorProgramStudis.questions.form2[8]?.additionalFields2?.status8) ||
                      ''
                    }
                    onChange={(e) => handleNChange8(e, "status8")}
                  >
                    <option value="" selected>pilih status</option>
                    <option value="sd">SD</option>
                    <option value="sw">SW</option>
                  </select>
                </div>
              </div>
              <hr />
              <div className="mt-3 justify-content-end d-flex">
                <Button
                  variant="outlined"
                  size="medium"
                  sx={{ marginLeft: "auto", display: "flex" }}
                  onClick={handleClose33}
                >
                  Tutup
                </Button>
              </div>
            </Box>
          </Modal>

          {/* Modal 3.3.2*/}
          <Modal
            open={open10}
            onClose={handleClose10}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Kriteria Penilaian
              </Typography>
              <hr />
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  4 Setiap mata kuliah berpraktikum/berpraktek telah disediakan
                  ruang akademik khusus tersendiri dengan luasan yang melebihi
                  kapasitas ( 1.5 m2 per mahasiswa, 25 orang mahasiswa per ruang)
                  dan berstatus milik sendiri
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  3 Setiap mata kuliah berpraktikum/berpraktek telah disediakan
                  ruang akademik khusus tersendiri dengan luasan yang melebihi
                  kapasitas ( 1.5 m2 per mahasiswa, 25 orang mahasiswa per ruang)
                  dan berstatus SW (sewa/kontrak/kerja sama)
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  2 Cukup memadai, ruang akademik khusus untuk mata kuliah
                  berpraktikum/berpraktek untuk 2 (dua) tahun pertama telah
                  disiapkan dengan luasan yang sesuai (1,5 m2 per mahasiswa, 25
                  orang per ruang)
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  1 Kurang memadai, ruang akademik khusus yang disiapkan tidak
                  relevan dengan kebutuhan
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">0 Tidak ada datanya</Alert>
              </Typography>
              <hr />
              <Button
                onClick={handleClose10}
                variant="contained"
                size="medium"
                sx={{ display: "flex", marginLeft: "auto" }}
              >
                Tutup
              </Button>
            </Box>
          </Modal>

          {/* Modal 3.3.3*/}
          <Modal
            open={open11}
            onClose={handleClose11}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Kriteria Penilaian
              </Typography>
              <hr />
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  4 Peralatan tersedia dalam jumlah yang mencukupi dan sesuai
                  dengan mata kuliah berpraktikum/ berpraktik untuk pembelajaran
                  sampai 4 tahun pembelajaran
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  3 Peralatan tersedia dalam jumlah dan mutu yang mencukupi dan
                  sesuai dengan mata kuliah berpraktikum/berpraktik untuk
                  pembelajaran pada 3 (tiga) tahun pembelajaran
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  2 Peralatan tersedia dalam jumlah dan mutu yang mencukupi untuk
                  pembelajaran pada 2 (dua) tahun pertama
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  1 Peralatan tersedia dalam jumlah yang mencukupi untuk
                  pembelajaran, <b>tetapi </b> tidak sesuai dengan mata kuliah
                  berpraktikum
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  0 Peralatan tersedia kurang dari kebutuhan pengguna.
                </Alert>
              </Typography>
              <hr />
              <Button
                onClick={handleClose11}
                variant="contained"
                size="medium"
                sx={{ display: "flex", marginLeft: "auto" }}
              >
                Tutup
              </Button>
            </Box>
          </Modal>

          {/* Modal 3.3.4*/}
          <Modal
            open={open20}
            onClose={handleClose20}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Kriteria Penilaian
              </Typography>
              <hr />
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  4 Jika jumlah tenaga kependidikan lebih dari 3 (tiga) orang dan salah satu diantaranya berkualifikasi magister dan 1 (satu) orang pustakawan ditingkat perguruan tinggi dengan kualifikasi Diploma Tiga perpustakaan atau yang sejenis
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  3 Jika jumlah tenaga kependidikan lebih dari 2 (dua) orang atau berkualifikasi sarjana atau sarjana terapan dan 1 (satu) orang pustakawan ditingkat perguruan tinggi dengan kualifikasi Diploma Tiga perpustakaan atau yang sejenis
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  2 Jika jumlah tenaga kependidikan 2 (dua) orang atau lebih dengan kualifikasi Diploma Tiga dan 1 (satu) orang pustakawan ditingkat perguruan tinggi dengan kualifikasi Diploma Tiga perpustakaan atau yang sejenis
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  1 Tidak ada nilai 1
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  0 Jumlah dan kualifikasi tenaga kependidikan tidak memenuhi persyaratan
                </Alert>
              </Typography>
              <hr />
              <Button
                onClick={handleClose20}
                variant="contained"
                size="medium"
                sx={{ display: "flex", marginLeft: "auto" }}
              >
                Tutup
              </Button>
            </Box>
          </Modal>
          {/* Modal Kembalikan dokumen */}
          <Modal
            open={open34}
            onClose={handleClose34}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <Box sx={{ ...style, width: 400 }}>
              <Typography sx={{ textAlign: 'center', marginBottom: '10px' }}>Kembalikan Request Prodi Ke PTKI ?</Typography>
              <div className="d-flex m-auto justify-content-center">
                <Button variant="contained" size="small" style={{ marginRight: '10px' }}>
                  Iya
                </Button>
                <Button onClick={handleClose34} variant="outlined" size="small">Tidak</Button>
              </div>
            </Box>
          </Modal>


          {/* file preview */}
          <Modal
            open={openViewFile}
            onClose={handleCloseViewFile}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={styleViewFile}>
              <IconButton
                sx={{ position: "absolute", top: 5, right: 5 }}
                onClick={handleCloseViewFile}
                aria-label="close"
              >
                <HighlightOffIcon color="error" />
              </IconButton>
              <Typography id="modal-modal-title" variant="h6" component="h2" className="mb-2 ms-3 fw-bold">
                File Preview  <Button onClick={() => handleDownloadFile(localStorage.getItem('kodes'))} variant="contained" className="mt-1"> <DownloadIcon fontSize="small" className="me-1" />{loadingDownloadFile ? 'loading...' : 'Download'}</Button>
              </Typography>
              <ContentCard>
                <div className="p-4 d-flex">
                  <PdfViewerModal />
                  <div className="ms-auto">
                    <h4 className="fw-bold">Pemeriksaan Dokumen</h4>
                    <div className="d-flex mb-4 justify-content-between">
                      <p className="mt-2">Sesuai </p>
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
                        <div className="d-flex mb-4 justify-content-between">
                          <p className="mt-2">Dapat dibaca</p>
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

                        <div className="d-flex mb-4 justify-content-between">
                          <p className="mt-2 me-5">Utuh, Tidak Terpotong</p>
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

                        <div className="d-flex mb-4 justify-content-between">
                          <p className="mt-2">Keabsahan</p>
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

                    <textarea value={komentar}
                      onChange={(e) => setKomentar(e.target.value)} placeholder="Komentar" className="form-control" style={{ backgroundColor: "#EFECEC" }} rows="5"></textarea>

                    <Button onClick={() => handleRejectToUser(localStorage.getItem('kodes'))} variant="contained" className="mt-3" sx={{ width: '100%' }}>Simpan</Button>
                  </div>
                </div>
              </ContentCard>
            </Box>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default CardPenilaian;

