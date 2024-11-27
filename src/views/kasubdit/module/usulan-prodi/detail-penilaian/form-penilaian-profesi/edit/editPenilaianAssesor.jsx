import React, { useState, useEffect, useRef } from "react";
import "../../../../../../../views/ptki/admin.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
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
import swal from "sweetalert";
import BobotEnumPPG from '../../../../../../../views/assesor/module/penilaian/utils/BobotPPG'
import EditNotificationsIcon from '@mui/icons-material/EditNote';
import DropdownAksi from "../../../../../../../components/dropdown/DropdownAksi";
import MenuItem from "@mui/material/MenuItem";
import { ErrorSwal } from "../../../../../../../utils/swal2";
import { GetApiBaseUrl } from "../../../../../../../utils/env";
import axios from "axios";
import XLgIcon from "../../../../../../../components/icons/XLgIcon";
import CheckCircleIcon from "../../../../../../../components/icons/CheckCircleIcon";
import { useParams } from 'react-router-dom';
import logo from '../../../../../../../assets/logo.svg'
import { LinearProgress } from "@mui/material";
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
import { useDarkMode } from "../../../../../../../utils/DarkModeContext";
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
  width: 700,
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

  const handleOpen15 = () => setOpen15(true);
  const [open15, setOpen15] = useState(false);
  const handleClose15 = () => setOpen15(false);

  const handleOpen16 = () => setOpen16(true);
  const [open16, setOpen16] = useState(false);
  const handleClose16 = () => setOpen16(false);

  const handleOpen17 = () => setOpen17(true);
  const [open17, setOpen17] = useState(false);
  const handleClose17 = () => setOpen17(false);

  const handleOpen19 = () => setOpen19(true);
  const [open19, setOpen19] = useState(false);
  const handleClose19 = () => setOpen19(false);


  // get data doktor
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
  const getData = async () => {
    const programStudiId = localStorage.getItem("programStudiId");
    setIsSubmitted(true);
    setTimeout(async () => {
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
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="text-primary"
              onClick={() => handleDownloadFile(programStudiId, localStorage.setItem('code_download', document.kode))}
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
    }, 1500);
  };
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
        obj1.nilai2 = correspondingObj2.nilai2;
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

  //kucukupan
  const [formData2, setFormData2] = useState({
    terpenuhi: "",
    terpenuhikurangsatu: "",
    terpenuhikurangdua: '',
  });
  const calculateTotalNilai2 = (terpenuhi, terpenuhikurangsatu, terpenuhikurangdua) => {
    const total = parseInt(terpenuhi) + parseInt(terpenuhikurangsatu) + parseInt(terpenuhikurangdua);
    return total;
  };
  const totalNilai = calculateTotalNilai2(
    formData2.terpenuhi,
    formData2.terpenuhikurangsatu,
    formData2.terpenuhikurangdua
  );
  const calculateValue = (terpenuhi, terpenuhikurangsatu, terpenuhikurangdua, totalNilai2) => {
    if ((terpenuhi + terpenuhikurangsatu + terpenuhikurangdua) !== totalNilai2) {
      return "-";
    } else if (terpenuhi > (totalNilai2 - 1) && terpenuhi <= totalNilai2) {
      return 4;
    } else if (terpenuhikurangsatu > 0 && terpenuhikurangsatu <= totalNilai2) {
      return 3;
    } else if (terpenuhikurangdua <= totalNilai2) {
      return 2;
    }
    return "Undefined";
  };
  const result = calculateValue(
    parseInt(formData2.terpenuhi),
    parseInt(formData2.terpenuhikurangsatu),
    parseInt(formData2.terpenuhikurangdua),
    totalNilai
  );

  /////////////////////////////////
  const [formData3, setFormData3] = useState({
    doktorlebihdua: "",
    doktorkurangdua: "",
  });
  const calculateTotalNilai3 = (doktorlebihdua, doktorkurangdua) => {
    const total = parseInt(doktorlebihdua) + parseInt(doktorkurangdua)
    return total;
  };
  const totalNilai3 = calculateTotalNilai3(
    formData3.doktorlebihdua,
    formData3.doktorkurangdua,
  );
  const calculateValue2 = (doktorlebihdua, doktorkurangdua, totalNilai3) => {
    if ((doktorlebihdua + doktorkurangdua) !== totalNilai3) {
      return "-";
    } else if (doktorlebihdua >= 3 && doktorlebihdua <= totalNilai3) {
      return 4;
    } else if (doktorkurangdua >= 3 && doktorkurangdua <= totalNilai3) {
      return 3;
    }
    return "Undefined";
  };
  const result2 = calculateValue2(
    parseInt(formData3.doktorlebihdua),
    parseInt(formData3.doktorkurangdua),
    totalNilai3
  );
  ///////////////////////////////////
  const [formData4, setFormData4] = useState({
    profesor: "",
    lektorkepala: "",
    lektor: '',
  });
  const calculateTotalNilai4 = (profesor, lektorkepala, lektor) => {
    const total = parseInt(profesor) + parseInt(lektorkepala) + parseInt(lektor)
    return total;
  };
  const totalNilai4 = calculateTotalNilai4(
    formData4.profesor,
    formData4.lektorkepala,
    formData4.lektor,
  );
  const calculateValue4 = (profesor, lektorkepala, lektor, totalNilai4) => {
    if ((profesor + lektorkepala + lektor) !== totalNilai4) {
      return "-";
    } else if (profesor > (totalNilai4 - 1) && profesor <= totalNilai4) {
      return 4;
    } else if (lektorkepala > 0 && lektorkepala <= totalNilai4) {
      return 3;
    } else if (lektor <= totalNilai4) {
      return 2;
    }
    return "Undefined";
  };
  const result4 = calculateValue4(
    parseInt(formData4.profesor),
    parseInt(formData4.lektorkepala),
    parseInt(formData4.lektor),
    totalNilai4
  );
  ///////////////////////////////////
  const [formData5, setFormData5] = useState({
    linear: "",
    tidaklinear: ""
  });
  const calculateTotalNilai5 = (linear, tidaklinear) => {
    const total = parseInt(linear) + parseInt(tidaklinear);
    return total;
  };
  const totalNilai5 = calculateTotalNilai5(
    formData5.linear,
    formData5.tidaklinear
  );
  const calculateValue5 = (linear, tidaklinear, totalNilai5) => {
    if ((linear + tidaklinear) !== totalNilai5) {
      return "-";
    } else if (linear >= 3 && tidaklinear <= totalNilai5) {
      return 4;
    } else if (linear >= 3 && tidaklinear <= totalNilai5) {
      return 30;
    }
    return "Undefined";
  };
  const result5 = calculateValue5(
    parseInt(formData5.linear),
    parseInt(formData5.tidaklinear),
    totalNilai5
  );
  ///////////////////////////////////
  const [formData6, setFormData6] = useState({
    ditugaskan: "",
    tidakditugaskan: ""
  });
  const calculateTotalNilai6 = (ditugaskan, tidakditugaskan) => {
    const total = parseInt(ditugaskan) + parseInt(tidakditugaskan)
    return total;
  };
  const totalNilai6 = calculateTotalNilai6(
    formData6.ditugaskan,
    formData6.tidakditugaskan,
  );
  const calculateValue6 = (ditugaskan, tidakditugaskan, totalNilai6) => {
    if ((ditugaskan + tidakditugaskan) !== totalNilai6) {
      return "-";
    } else if (ditugaskan === totalNilai6) {
      return 4;
    } else {
      return 0;
    }
  };
  const result6 = calculateValue6(
    parseInt(formData6.ditugaskan),
    parseInt(formData6.tidakditugaskan),
    totalNilai6
  );

  ////////////////////////////////////
  const [formData7, setFormData7] = useState({
    magister: "",
    dibawahmagister: ""
  });
  const calculateTotalNilai7 = (magister, dibawahmagister) => {
    const total = parseInt(magister) + parseInt(dibawahmagister)
    return total;
  };
  const totalNilai7 = calculateTotalNilai7(
    formData7.magister,
    formData7.dibawahmagister,
  );
  const calculateValue7 = (magister, dibawahmagister, totalNilai7) => {
    if ((magister + dibawahmagister) !== totalNilai7) {
      return "-";
    } else if (magister === totalNilai7) {
      return 4;
    } else {
      return 0;
    }
  };
  const result7 = calculateValue7(
    parseInt(formData7.magister),
    parseInt(formData7.dibawahmagister),
    totalNilai7
  );

  /////////////////////////////////////
  const [formData8, setFormData8] = useState({
    sesuai: "",
    tidaksesuai: ""
  });
  const calculateTotalNilai8 = (sesuai, tidaksesuai) => {
    const total = parseInt(sesuai) + parseInt(tidaksesuai)
    return total;
  };
  const totalNilai8 = calculateTotalNilai8(
    formData8.sesuai,
    formData8.tidaksesuai,
  );

  const calculateValue8 = (sesuai, tidaksesuai, totalNilai8) => {
    if ((sesuai + tidaksesuai) !== totalNilai8) {
      return "-";
    } else if (sesuai === totalNilai8) {
      return 4;
    } else {
      return 0;
    }
  };
  const result8 = calculateValue8(
    parseInt(formData8.sesuai),
    parseInt(formData8.tidaksesuai),
    totalNilai8
  );

  ///////////////////////////////////
  const [formData9, setFormData9] = useState({
    jikalengkap: "",
    jikakurangsatuataulebih: ""
  });
  const calculateTotalNilai9 = (jikalengkap, jikakurangsatuataulebih) => {
    const total = parseInt(jikalengkap) + parseInt(jikakurangsatuataulebih)
    return total;
  };
  const totalNilai9 = calculateTotalNilai9(
    formData9.jikalengkap,
    formData9.jikakurangsatuataulebih,
  );
  /////////////////////////////////
  const [formData10, setFormData10] = useState({
    punyahaki: "",
    belumhaki: ""
  });

  const calculateTotalNilai10 = (punyahaki, belumhaki) => {
    const total = parseInt(punyahaki) + parseInt(belumhaki)
    return total;
  };

  const [formData11, setFormData11] = useState({
    rumusan: "",
    mekanisme: ""
  });

  const calculateTotalNilai11 = (rumusan, mekanisme) => {
    const total = parseInt(rumusan) + parseInt(mekanisme)
    return total;
  };

  const totalNilai11 = calculateTotalNilai11(
    formData11.rumusan,
    formData11.mekanisme,
  );

  const totalNilai10 = calculateTotalNilai10(
    formData10.punyahaki,
    formData10.belumhaki,
  );

  useEffect(() => {
    if (data?.asesorProgramStudis?.questions?.form2?.[2]?.additionalFields) {
      const additionalFields = data.asesorProgramStudis.questions.form2[2].additionalFields;
      setFormData2({
        terpenuhi: additionalFields.terpenuhi || '',
        terpenuhikurangsatu: additionalFields.terpenuhikurangsatu || '',
        terpenuhikurangdua: additionalFields.terpenuhikurangdua || ""
      });
    }
  }, [data]);

  useEffect(() => {
    if (data?.asesorProgramStudis?.questions?.form2?.[2]?.additionalFields) {
      const additionalFields = data.asesorProgramStudis.questions.form2[2].additionalFields;
      setFormData3({
        doktorlebihdua: additionalFields.doktorlebihdua || '',
        doktorkurangdua: additionalFields.doktorkurangdua || '',
      });
    }
  }, [data]);

  useEffect(() => {
    if (data?.asesorProgramStudis?.questions?.form2?.[2]?.additionalFields) {
      const additionalFields = data.asesorProgramStudis.questions.form2[2].additionalFields;
      setFormData4({
        profesor: additionalFields.profesor || '',
        lektorkepala: additionalFields.lektorkepala || '',
        lektor: additionalFields.lektor || '',
      });
    }
  }, [data]);

  useEffect(() => {
    if (data?.asesorProgramStudis?.questions?.form2?.[2]?.additionalFields) {
      const additionalFields = data.asesorProgramStudis.questions.form2[2].additionalFields;
      setFormData5({
        linear: additionalFields.linear || '',
        tidaklinear: additionalFields.tidaklinear || '',
      });
    }
  }, [data]);


  useEffect(() => {
    if (data?.asesorProgramStudis?.questions?.form2?.[2]?.additionalFields) {
      const additionalFields = data.asesorProgramStudis.questions.form2[2].additionalFields;
      setFormData6({
        ditugaskan: additionalFields.ditugaskan || '',
        tidakditugaskan: additionalFields.tidakditugaskan || '',
      });
    }
  }, [data]);


  useEffect(() => {
    if (data?.asesorProgramStudis?.questions?.form2?.[2]?.additionalFields) {
      const additionalFields = data.asesorProgramStudis.questions.form2[2].additionalFields;
      setFormData7({
        magister: additionalFields.magister || '',
        dibawahmagister: additionalFields.dibawahmagister || '',
      });
    }
  }, [data]);

  useEffect(() => {
    if (data?.asesorProgramStudis?.questions?.form2?.[2]?.additionalFields) {
      const additionalFields = data.asesorProgramStudis.questions.form2[2].additionalFields;
      setFormData8({
        sesuai: additionalFields.sesuai || '',
        tidaksesuai: additionalFields.tidaksesuai || '',
      });
    }
  }, [data]);



  useEffect(() => {
    if (data?.asesorProgramStudis?.questions?.form2?.[2]?.additionalFields) {
      const additionalFields = data.asesorProgramStudis.questions.form2[2].additionalFields;
      setFormData9({
        jikalengkap: additionalFields.jikalengkap || '',
        jikakurangsatuataulebih: additionalFields.jikakurangsatuataulebih || '',
      });
    }
  }, [data]);

  useEffect(() => {
    if (data?.asesorProgramStudis?.questions?.form2?.[2]?.additionalFields) {
      const additionalFields = data.asesorProgramStudis.questions.form2[2].additionalFields;
      setFormData10({
        punyahaki: additionalFields.punyahaki || '',
        belumhaki: additionalFields.belumhaki || '',
      });
    }
  }, [data]);


  useEffect(() => {
    if (data?.asesorProgramStudis?.questions?.form2?.[2]?.additionalFields) {
      const additionalFields = data.asesorProgramStudis.questions.form2[2].additionalFields;
      setFormData11({
        rumusan: additionalFields.rumusan || '',
        mekanisme: additionalFields.mekanisme || '',
      });
    }
  }, [data]);


  const handleNoteChangeTable2 = (e, index) => {
    const newRows1 = [...rows1];
    newRows1[index].note = e.target.value;
    setRows1(newRows1);
  };
  //////////////////////////////

  const [comments, setComments] = useState({
    note: ""
  });

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
  window.addEventListener("popstate", handleGoBack);
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
  const [rows1, setRows1] = useState([
    {
      butir: "1.1.1",
      keterangan: [
        "Jumlah Dosen yang Memiliki kompetensi pedagogik (memiliki sertifikat pendidik)",

        "Dosen berjumlah 5 (lima) orang dengan komposisi setidak-tidaknya 2 (dua) orang berkualifikasi doktor dan lainnya berkualifikasi magister",

        "Dosen dengan jabatan akademik paling rendah Lektor",

        "Dosen berlatar belakang di bidang pendidikan pada salah satu kualifikasi akademik yang dimiliki",

      ].map((item, index) => (
        <div key={index}>
          {item}
          <br />
          <br />
          <br />
        </div>
      )),
      nilai: "",
      bobot: BobotEnumPPG.CODE_1_1,
      showButton: true
    },
    {
      butir: "1.1.2",
      keterangan: [
        "Ditugaskan oleh pemimpin perguruan tinggi (dibuktikan dengan surat tugas atau SK)",
        "Minimal 2 (dua) orang magister atau magister terapan, jabatan akademik paling rendah lektor",
        // "Dosen dengan jabatan akademik paling rendah Lektor",
        "Komposisi Dosen pengelola bidang studi dari program studi sarjana sejenis",
      ].map((item, index) => (
        <div key={index}>
          {item}
          <br />
          <br />
        </div>
      )),
      nilai: '',
      bobot: BobotEnumPPG.CODE_1_1_1,
      showButton1: true
    },
    {
      butir: "1.1.3",
      keterangan: "Dosen Pengampu (bidang studi/MK) (1). Minimal magister sesuai dengan bidang studi yang diusulkan. (2).Berpendidikan yang sesuai dengan mata studi(kuliah) yang diampu. (3).Memiliki jabatan fungsional akademik paling rendah Lektor(4).Memiliki minimal 2 dosen yang sesuai untuk setiap bidang studi yang diusulkan",
      nilai: "",
      bobot: BobotEnumPPG.CODE_1_1_2,
      showButton2: true
    },
    {
      butir: "1.1.4",
      keterangan: "Hasil karya bidang pendidikan yang dihasilkan dosen pengelola program studi dalam 3(tiga) tahun terakhir yang meliputi(1) buku teks, (2) buku ajar, (3) media pembelajaran, (4) alat bantu ajar(trainer kit,  simulator) ",
      nilai: "",
      bobot: BobotEnumPPG.CODE_1_2_1,
      showButton3: true
    },
    {
      butir: "1.1.5",
      keterangan: " Publikasi karya ilmiah hasil penelitian dan pengabdian kepada masyarakat yang dihasilkan oleh dosen pengelola program studi dalam  tiga tahun terakhir",
      nilai: "",
      bobot: BobotEnumPPG.CODE_1_2_2,
      showButton4: true
    },
    {
      butir: "1.2",
      keterangan: "Tenaga kependidikan  Jumlah dan kualifikasi pustakawan, laboran, analis, teknisi, operator, programer, dan/ atau tenaga administrasi Catatan: Jumlah  minimal tenaga kependidikan terdiri atas 3(tiga) orang tenaga kependidikan dan 1(satu) orang tenaga perpustakaan untuk setiap  program studi.Kualifikasi tenaga kependidikan minimal berijazah D3, berusia maksimum 58 tahun, dan bekerja penuh waktu 40 jam / minggu",
      nilai: "",
      bobot: BobotEnumPPG.CODE_1_2_3,
      showButton5: true
    },
    {
      butir: "1.3",
      keterangan: "Guru Pamong,  1. Berkualifikasi akademik paling rendah sarjana atau sarjana terapan ; 2. Memiliki sertifikat pendidik profesional;  3. Memiliki jabatan fungsional guru serendah-rendahnya Guru Madya; dan   4. Memiliki latar belakang pendidikan yang sebidang dengan bidang studi/ mata pelajaran yang diampu, dan bidang studi / mata pelajaran yang diajarkan oleh mahasiswa yang dibimbing.",
      nilai: '',
      bobot: BobotEnumPPG.CODE_1_2_3,
      showButton6: true
    },
    {
      butir: "2.1",
      keterangan: "Prasarana   Data ruang yang akan digunakan oleh Prodi PPG dengan mengikuti format tabel berikut: Ruang workshop, ruang administrasi dan lain- lain",
      nilai: "",
      bobot: BobotEnumPPG.CODE_1_1_3,
      showButton7: true
    },
    {
      butir: "2.1.2",
      keterangan: "    Ketersediaan ruang/fasilitas akademik kependidikan berupa: a) Laboratorium Pembelajaran Mikro, b) Pusat Sumber Belajar Terintegrasi  dengan Teknologi Informasi dan Komunikasi(TIK), c) Asrama Mahasiswa   dan/ atau sarana(sejenis) lainnya; d) Madrasa / Sekolah Laboratorium; dan / atau Madrasah / Sekolah Mitra(terakreditasi paling rendah B) yang  disediakan dengan mengikuti format tabel berikut ini!",
      nilai: "",
      bobot: BobotEnumPPG.CODE_1_1_4,
      showButton8: true
    },
    {
      butir: "2.1.3",
      keterangan: "  Ketersediaan ruang akademik bidang studi sesuai dengan karakteristik tiap bidang studi yang memerlukannya, berupa: Laboratorium, Studio,  Bengkel Kerja, Lahan Praktik, Lapangan Olahraga, Sanggar, atau tempat     praktik lainnya",
      nilai: "",
      bobot: BobotEnumPPG.CODE_1_1_5,
      showButton9: true
    },
    {
      butir: "2.2.1",
      keterangan: "  Peralatan khusus untuk setiap bidang studi sesuai dengan karakteristik bidang studi yang memerlukannya(peralatan laboratorium, studio, bengkel kerja, olah raga, sanggar, atau peralatan lainnya)! Peralatan harus disediakan dengan jumlah dan spesifikasi yang memenuhi persyaratan dan didasarkan pada efektivitas keberlangsungan proses  pembelajaran untuk ketercapaian pembelajaran praktik",
      nilai: "",
      bobot: BobotEnumPPG.CODE_1_2,
      showButton10: true
    },
    {
      butir: "3.1",
      keterangan: " Profil lulusan (profesi, jenis pekerjaan, bentuk kerja) program studi yang diusulkan",
      nilai: "",
      bobot: BobotEnumPPG.CODE_1_3,
      showButton11: true
    },
    {
      butir: "3.2",
      keterangan: [
        "Capaian pembelajaran dari program studi yang diusulkan merujuk SN Dikti(Permendikbud No 44 Tahun 2015) dan sesuai level 5(untuk usulan DIII) atau 6(untuk usulan Sarjana Terapan) Kerangka Kualifikasi Nasional Indonesia(Perpres Nomor 8 Tahun 2012), yang penyusunannya  berdasarkan empat aspek: 1. pelibatan pemangku kepentingan internal 2. pelibatan pemangku kepentingan eksternal(asosiasi profesi dan program   studi sejenis) 3. studi banding 4. studi pelacakan",
        "Rumusan capaian pembelajaran",
        "Mekanisme perumasan capaian pembelajaran",
        "Rerata nilai capaian pembelajaran program studi"
      ].map((item, index) => (
        <div key={index}>
          {item}
          <br />
          <br />
          <br />
        </div>
      )),
      nilai: "",
      bobot: BobotEnumPPG.CODE_2_1,
      showButton12: true
    },
    {
      butir: "3.3",
      keterangan: " struktur kurikulum program studi PPG berisi workshop pengembangan perangkat pembelajaran bidang studi yang mendidik(subject- specific  pedagogy / SSP) disertai dengan implementasi pembelajaran dalam bentuk  peer teaching, dan dilanjutkan dengan PPL.Batas penyelesaian  pendidikan jenjang PPG maksimal 2(dua) semester atau 1(satu) tahun.   Beban belajar program studi PPG adalah 36(tiga puluh enam) sampai  dengan 40(empat puluh) satuan kredit semester untuk Program PPG  Prajabatan dan minimal 24 sks(dua puluh empat) untuk Program PPG  Dalam Jabatan.Proporsi antara Workshop SSP dan PPL adalah 60: 40 dari beban belajar program studi PPG",
      nilai: "",
      bobot: BobotEnumPPG.CODE_2_1_2,
      showButton13: true
    },
  ])

  useEffect(() => {
    const updatedRows1 = [...rows1];
    updatedRows1.map((value) => {
      if (value.butir === '1.1.1') {
        value.nilai = ((result + result2 + result4 + result5) / 4).toString();
      } else if (value.butir === '1.1.2') {
        value.nilai = ((result6 + result7 + result8) / 3).toString();
      } else if (value.butir === '1.1.3') {
        value.nilai = calculateTotalNilai9(formData9.jikalengkap, formData9.jikakurangsatuataulebih).toString();
      } else if (value.butir === '1.1.4') {
        value.nilai = calculateTotalNilai10(formData10.punyahaki, formData10.belumhaki).toString();
      } else if (value.butir === '3.2') {
        value.nilai = calculateTotalNilai11(formData11.rumusan, formData11.mekanisme).toString();
      }
    });
    setRows1(updatedRows1);
  }, [formData11, formData10, formData9, formData8, formData7, formData6, formData5, formData4, formData3, formData2]);

  const handleNilaiChangeTable2 = (e, index) => {
    const { value } = e.target;
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

  const calculateFinalValue = () => {

    console.log('hehe')
  };

  const validateForm = () => {
    for (const row of rows1) {
      if (!row.butir || !row.keterangan) {
        return false;
      }
    }

    for (const row of rows1) {
      if (!row.note && !(row.nilai && row.nilai.toString() === calculateFinalValue())) {
        return false;
      }
    }

    if (!coment) {
      return false;
    }

    return true;
  };
  const handleNilaiChangeTable3 = (e, index) => {
    const { value } = e.target;
    const updatedRows1 = rows1.map((row, rowIndex) => {
      if (rowIndex === index) {
        return {
          ...row,
          nilai2: value
        };
      }
      return row;
    });
    setRows1(updatedRows1);
  };

  const handleCommentChange = (e, fieldName) => {
    setComments({
      ...comments,
      [fieldName]: e.target.value,
    });
  };
  const handleNChange2 = (e, field) => {
    const value = e.target.value;
    setFormData2((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));

    setFormData3((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));


    setFormData4((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));


    setFormData5((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));


    setFormData6((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));

    setFormData7((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));

    setFormData8((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));

    setFormData9((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));

    setFormData10((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));

    setFormData11((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };
  // create PUT penilaian kecukupan


  //Total Nilai (terboboti) yang diperoleh
  const [totalSum, setTotalSum] = useState(0);
  const [terbobotiValues, setTerbobotiValues] = useState([]);
  const [kurikulumStatus, setKurikulumStatus] = useState('');
  const [dosen, setDosen] = useState('')
  const [spmi, setSpmi] = useState('')
  const [finalStatus, setSimpulan] = useState('')
  useEffect(() => {
    if (data && rows1) {
      const calculatedValues = rows1.map((row) => {
        const code = row.butir;
        const form2Question = data?.asesorProgramStudis?.questions?.form2?.find(item => item.code === code);
        const parsedNilai = form2Question ? parseFloat(form2Question.nilai.replace(',', '.')) || result || result2 || result4 || result5 : null;
        const parsedBobot = parseFloat(row.bobot.replace(',', '.'));
        if (!isNaN(parsedNilai) && !isNaN(parsedBobot)) {
          return (parsedNilai * parsedBobot).toString();
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
            return 'Belum isi';
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
            return '8';
          } else if (nilai2_1 <= 4) {
            return 'MEMENUHI';
          } else {
            return 'Belum isi';
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
            return 'Belum isi';
          }
        }
        return '';
      });
      const totalSum = rows1.reduce((sum, row) => {
        const code = row.butir;
        const form2Question = data?.asesorProgramStudis?.questions?.form2?.find(item => item.code === code);
        const parsedNilai = form2Question ? parseFloat(form2Question.nilai.replace(',', '.')) : null;
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

      const simpulanStatus = simpulan();
      setTerbobotiValues(calculatedValues);
      setTotalSum(totalSum);
      setKurikulumStatus(kurikulumStatus);
      setDosen(dosen);
      setSpmi(spmi)
      setSimpulan(simpulanStatus)
    }
  }, [data, rows1, view]);
  const [isDraftMode, setIsDraftMode] = useState(false);

  // create PUT penilaian kecukupan
  useEffect(() => {
    const updatedRows1 = [...rows1];
    updatedRows1.map((value) => {
      if (value.butir === '1.1.1') {
        value.nilai = ((result + result2 + result4 + result5) / 4).toString();
      } else if (value.butir === '1.1.2') {
        value.nilai = ((result6 + result7 + result8) / 3).toString();
      } else if (value.butir === '1.1.3') {
        value.nilai = calculateTotalNilai9(formData9.jikalengkap, formData9.jikakurangsatuataulebih).toString();
      } else if (value.butir === '1.1.4') {
        value.nilai = calculateTotalNilai10(formData10.punyahaki, formData10.belumhaki).toString();
      } else if (value.butir === '3.2') {
        value.nilai = calculateTotalNilai11(formData11.rumusan, formData11.mekanisme).toString();
      }
    });
    setRows1(updatedRows1);
  }, [rows1]);
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
  const handlePutRequest = async () => {
    setIsSubmitted(true);
    if (data && rows1) {
      const calculatedValues = rows1.map((row) => {
        const code = row.butir;
        const form2Question = data?.asesorProgramStudis?.questions?.form2?.find(item => item.code === code);
        const parsedNilai = form2Question ? parseFloat(form2Question.nilai.replace(',', '.')) : null;
        const parsedBobot = parseFloat(row.bobot.replace(',', '.'));
        if (!isNaN(parsedNilai) && !isNaN(parsedBobot)) {
          return (parsedNilai * parsedBobot).toFixed(2);
        } else {
          return '-';
        }
      });

      const totalSum = rows1.reduce((sum, row) => {
        const code = row.butir;
        const form2Question = data?.asesorProgramStudis?.questions?.form2?.find(item => item.code === code);
        const parsedNilai = form2Question ? parseFloat(form2Question.nilai.replace(',', '.')) : null;
        const parsedBobot = parseFloat(row.bobot.replace(',', '.'));
        if (!isNaN(parsedNilai) && !isNaN(parsedBobot)) {
          const terboboti = parsedNilai * parsedBobot;
          return sum + terboboti;
        } else {
          return sum;
        }
      }, 0);

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
            return 'Belum isi';
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
            return 'Belum isi';
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
            return 'Belum isi';
          }
        }
        return '';
      });

      const simpulan = () => {
        if (
          totalSum >= 200 &&
          kurikulumStatus.every(status => status === 'MEMENUHI') &&
          dosen.every(status => status === 'MEMENUHI') &&
          spmi.every(status => status === 'MEMENUHI')
        ) {
          return 'MEMENUHI';
        } else {
          return 'TIDAK MEMENUHI';
        }
      };

      const simpulanStatus = simpulan();
      setTerbobotiValues(calculatedValues);
      setTotalSum(totalSum);
      setKurikulumStatus(kurikulumStatus);
      setDosen(dosen);
      setSpmi(spmi)
      setSimpulan(simpulanStatus)
    }
    try {
      const id = parseInt(localStorage.getItem("id"));
      const programStudiId = parseInt(localStorage.getItem("programStudiId"));

      const formPenilaian = {
        asesorId: id,
        programStudiId: programStudiId,
        status: 23,
        questions: {
          form2: rows1.map((row) => ({
            code: row.butir,
            question: typeof row.keterangan === "string" ? row.keterangan : "",
            nilai: row.nilai,
            note: row.note,
            additionalFields: {
              terpenuhi: formData2.terpenuhi,
              terpenuhikurangsatu: formData2.terpenuhikurangsatu,
              terpenuhikurangdua: formData2.terpenuhikurangdua,

              doktorlebihdua: formData3.doktorlebihdua,
              doktorkurangdua: formData3.doktorkurangdua,

              profesor: formData4.profesor,
              lektorkepala: formData4.lektorkepala,
              lektor: formData4.lektor,

              linear: formData5.linear,
              tidaklinear: formData5.tidaklinear,

              ditugaskan: formData6.ditugaskan,
              tidakditugaskan: formData6.tidakditugaskan,

              magister: formData7.magister,
              dibawahmagister: formData7.dibawahmagister,

              sesuai: formData8.sesuai,
              tidaksesuai: formData8.tidaksesuai,

              jikalengkap: formData9.jikalengkap,
              jikakurangsatuataulebih: formData9.jikakurangsatuataulebih,

              punyahaki: formData10.punyahaki,
              belumhaki: formData10.belumhaki,

              rumusan: formData11.rumusan,
              mekanisme: formData11.mekanisme
            },
          })),
        },
        komentar: typeof coment === "string" ? coment : "",
        totalNilai: totalSum,
      };
      const response = await api.put(
        "prodi-assesment/assesment/kecukupan",
        formPenilaian,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: response.data.message,
          timer: 1000,
          showConfirmButton: false,
        });
        setIsSubmitted(false);
        setIsDraftMode(true);
        getData();
      } else if (response.data.status === 404) {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: response.data.message,
        });
      } else if (response.data.status === 500) {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: response.data.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `${error.message}`,
      });
    }
  };
  const handlePutRequest1 = async () => {
    setIsSubmitted(true);
    if (data && rows1) {
      const calculatedValues = rows1.map((row) => {
        const code = row.butir;
        const form2Question = data?.asesorProgramStudis?.questions?.form2?.find(item => item.code === code);
        const parsedNilai = form2Question ? parseFloat(form2Question.nilai.replace(',', '.')) : null;
        const parsedBobot = parseFloat(row.bobot.replace(',', '.'));
        if (!isNaN(parsedNilai) && !isNaN(parsedBobot)) {
          return (parsedNilai * parsedBobot).toFixed(2);
        } else {
          return '-';
        }
      });

      const totalSum = rows1.reduce((sum, row) => {
        const code = row.butir;
        const form2Question = data?.asesorProgramStudis?.questions?.form2?.find(item => item.code === code);
        const parsedNilai = form2Question ? parseFloat(form2Question.nilai.replace(',', '.')) : null;
        const parsedBobot = parseFloat(row.bobot.replace(',', '.'));
        if (!isNaN(parsedNilai) && !isNaN(parsedBobot)) {
          const terboboti = parsedNilai * parsedBobot;
          return sum + terboboti;
        } else {
          return sum;
        }
      }, 0);

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
            return 'Belum isi';
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
            return 'Belum isi';
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
            return 'Belum isi';
          }
        }
        return '';
      });

      const simpulan = () => {
        if (
          totalSum >= 200 &&
          kurikulumStatus.every(status => status === 'MEMENUHI') &&
          dosen.every(status => status === 'MEMENUHI') &&
          spmi.every(status => status === 'MEMENUHI')
        ) {
          return 'MEMENUHI';
        } else {
          return 'TIDAK MEMENUHI';
        }
      };

      const simpulanStatus = simpulan();
      setTerbobotiValues(calculatedValues);
      setTotalSum(totalSum);
      setKurikulumStatus(kurikulumStatus);
      setDosen(dosen);
      setSpmi(spmi)
      setSimpulan(simpulanStatus)
    }
    try {
      const id = parseInt(localStorage.getItem("id"));
      const programStudiId = parseInt(localStorage.getItem("programStudiId"));

      const formPenilaian = {
        asesorId: id,
        programStudiId: programStudiId,
        status: 21,
        questions: {
          form2: rows1.map((row) => ({
            code: row.butir,
            question: typeof row.keterangan === "string" ? row.keterangan : "",
            nilai: row.nilai,
            note: row.note,
            additionalFields: {
              terpenuhi: formData2.terpenuhi,
              terpenuhikurangsatu: formData2.terpenuhikurangsatu,
              terpenuhikurangdua: formData2.terpenuhikurangdua,

              doktorlebihdua: formData3.doktorlebihdua,
              doktorkurangdua: formData3.doktorkurangdua,

              profesor: formData4.profesor,
              lektorkepala: formData4.lektorkepala,
              lektor: formData4.lektor,

              linear: formData5.linear,
              tidaklinear: formData5.tidaklinear,

              ditugaskan: formData6.ditugaskan,
              tidakditugaskan: formData6.tidakditugaskan,

              magister: formData7.magister,
              dibawahmagister: formData7.dibawahmagister,

              sesuai: formData8.sesuai,
              tidaksesuai: formData8.tidaksesuai,

              jikalengkap: formData9.jikalengkap,
              jikakurangsatuataulebih: formData9.jikakurangsatuataulebih,

              punyahaki: formData10.punyahaki,
              belumhaki: formData10.belumhaki,

              rumusan: formData11.rumusan,
              mekanisme: formData11.mekanisme

            },
          })),
        },
        komentar: typeof coment === "string" ? coment : "",
        totalNilai: totalSum,
      };
      const response = await api.put(
        "prodi-assesment/assesment/kecukupan",
        formPenilaian,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: response.data.message,
          timer: 1000,
          showConfirmButton: false,
        });
        setIsSubmitted(false);
        setIsDraftMode(true);
      } else if (response.data.status === 404) {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: response.data.message,
        });
      } else if (response.data.status === 500) {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: response.data.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `${error.message}`,
      });
    }
  };

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
    <div className="p-5">
      {/* <Button
        onClick={handleGoBack}
        sx={{
          border: "1px solid grey",
          color: "grey",
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-5px)",
            backgroundColor: "transparent",
            color: "red",
            border: "1px solid red",
          },
        }}
        className="m-3"
      >
        Kembali
      </Button> */}
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
            <h4>Data Program Studi Yang Di Evaluasi tes</h4>
            {/* <a
              href={fileUrl1}
              target="_blank"
              rel="noopener noreferrer"
              download
            >   <Button variant="outlined" color="success" size="small" onClick={() =>
              handleDownloadFilePenilaian(
                data.id,
                data.programStudiId,
              )
            }>
                export file
              </Button> </a> */}

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
                {/* Nilai */}
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
                      ) :
                        (rows1.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell scope="row">{row.butir}</TableCell>
                            <TableCell>{row.keterangan}</TableCell>
                            <TableCell>
                              <div className="d-flex">
                                {/* 1.1.1 */}
                                {row.showButton && (
                                  <div>
                                    <div className="d-flex">
                                      <button
                                        onClick={() => handleOpen(index)}
                                        className="text-center btn btn-success rounded-5 fw-bold me-3 mt-2 mb-2"
                                      >
                                        <EditNotificationsIcon />
                                      </button>
                                      <input
                                        type="text"
                                        className="form-control mt-2"
                                        value={result}
                                        disabled
                                      />
                                    </div>
                                    <br />
                                    <div className="d-flex">
                                      <button
                                        onClick={() => handleOpen1(index)}
                                        className="text-center btn btn-success rounded-5 fw-bold me-3 mt-2 mb-2"
                                      >
                                        <EditNotificationsIcon />
                                      </button>

                                      <input
                                        type="text"
                                        className="form-control mt-2"
                                        value={result2}
                                        disabled
                                      />
                                    </div>
                                    <br />
                                    <div className="d-flex">
                                      <button
                                        onClick={() => handleOpen2(index)}
                                        className="text-center btn btn-success rounded-5 fw-bold me-3 mt-2 mb-2"
                                      >
                                        <EditNotificationsIcon />
                                      </button>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={result4}
                                        disabled
                                      />
                                    </div>
                                    <br />
                                    <div className="d-flex">
                                      <button
                                        onClick={() => handleOpen3(index)}
                                        className="text-center btn btn-success rounded-5 fw-bold me-3 mt-2 mb-2"
                                      >
                                        <EditNotificationsIcon />
                                      </button>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={result5}
                                        disabled
                                      />
                                    </div>
                                    <br />
                                    <span style={{ fontSize: '12px', color: 'green', fontWeight: 'bold' }}>klik icon untuk isi nilai</span>
                                    {isNaN(result) || isNaN(result2) || isNaN(result4) || isNaN(result5) || result === '-' || result2 === '-' || result4 === '-' || result5 === '-' ? (
                                      <p
                                        className="mt-2 text-center"
                                        style={{
                                          color: "red",
                                          fontStyle: "italic",
                                        }}
                                      >
                                        Belum di Isi
                                      </p>
                                    ) : null}
                                  </div>
                                )}
                                {/* 1.1.2 */}
                                {row.showButton1 && (
                                  <>
                                    <div>
                                      <div className="d-flex">
                                        <button
                                          onClick={() => handleOpen4(index)}
                                          className="text-center btn btn-success rounded-5 fw-bold me-3 mt-2 mb-2"
                                        >
                                          <EditNotificationsIcon />
                                        </button>
                                        <input
                                          type="text"
                                          className="form-control"
                                          value={result6}
                                          disabled
                                        />
                                      </div>

                                      <br />
                                      <div className="d-flex">
                                        <button
                                          onClick={() => handleOpen5(index)}
                                          className="text-center btn btn-success rounded-5 fw-bold me-3 mt-2 mb-2"
                                        >
                                          <EditNotificationsIcon />
                                        </button>
                                        <input
                                          type="text"
                                          className="form-control"
                                          value={result7}
                                          disabled
                                        />
                                      </div>

                                      <br />
                                      <div className="d-flex">
                                        <button
                                          onClick={() => handleOpen6(index)}
                                          className="text-center btn btn-success rounded-5 fw-bold me-3 mt-2 mb-2"
                                        >
                                          <EditNotificationsIcon />
                                        </button>
                                        <input
                                          type="text"
                                          className="form-control"
                                          value={result8}
                                          disabled
                                        />
                                      </div>
                                      <br />
                                      <span style={{ fontSize: '12px', color: 'green', fontWeight: 'bold' }}>klik icon untuk isi nilai</span>
                                      {isNaN(result6) || isNaN(result7) || isNaN(result8) || result6 === '-' || result7 === '-' || result8 === '-' ? (
                                        <p
                                          className="mt-2 text-center"
                                          style={{
                                            color: "red",
                                            fontStyle: "italic",
                                          }}
                                        >
                                          Belum di Isi
                                        </p>
                                      ) : null}
                                    </div>
                                  </>
                                )}
                                {/* 1.1.3 */}
                                {row.showButton2 && (
                                  <div>
                                    <div className="d-flex mt-2">
                                      <button
                                        onClick={() => handleOpen7(index)}
                                        className="text-center btn btn-success rounded-5 fw-bold me-3 mt-2 mb-2"
                                      >
                                        <EditNotificationsIcon />
                                      </button>
                                      <input
                                        className="form-control"
                                        type="text"
                                        disabled
                                        value={calculateTotalNilai9(formData9.jikalengkap, formData9.jikakurangsatuataulebih)}
                                      />
                                    </div>
                                    <span style={{ fontSize: '12px', color: 'green', fontWeight: 'bold' }}>klik icon untuk isi nilai</span>
                                    {isNaN(calculateTotalNilai9(formData9.jikalengkap, formData9.jikakurangsatuataulebih)) || calculateTotalNilai9(formData9.jikalengkap, formData9.jikakurangsatuataulebih) === 0 ? (
                                      <p
                                        className="mt-2 text-center"
                                        style={{
                                          color: "red",
                                          fontStyle: "italic",
                                        }}
                                      >
                                        Belum di Isi
                                      </p>
                                    ) : null}
                                  </div>
                                )}
                                {/* 1.1.4 */}
                                {row.showButton3 && (
                                  <div >
                                    <div className="d-flex mt-2">
                                      <button
                                        onClick={() => handleOpen8(index)}
                                        className="text-center btn btn-success rounded-5 fw-bold me-3 mt-2 mb-2"
                                      >
                                        <EditNotificationsIcon />
                                      </button>
                                      <input
                                        className="form-control"
                                        type="text"
                                        disabled
                                        value={calculateTotalNilai10(formData10.punyahaki, formData10.belumhaki)}
                                      />
                                    </div>
                                    <span style={{ fontSize: '12px', color: 'green', fontWeight: 'bold' }}>klik icon untuk isi nilai</span>
                                    {isNaN(calculateTotalNilai10(formData10.punyahaki, formData10.belumhaki)) || calculateTotalNilai10(formData10.punyahaki, formData10.belumhaki) === 0 ? (
                                      <p
                                        className="mt-2 text-center"
                                        style={{
                                          color: "red",
                                          fontStyle: "italic",
                                        }}
                                      >
                                        Belum di Isi
                                      </p>
                                    ) : null}
                                  </div>
                                )}
                                {/* 1.1.5 */}
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
                                      className="form-control"
                                      type="text"
                                      value={
                                        row.nilai ||
                                        (data?.asesorProgramStudis?.questions?.form2 &&
                                          data.asesorProgramStudis.questions.form2.find(
                                            item => item.code === '1.1.5'
                                          )?.nilai) ||
                                        ''
                                      }
                                      onChange={(e) =>
                                        handleNilaiChangeTable2(e, index)
                                      }
                                      disabled={data?.asesorProgramStudis?.status !== 21}
                                    />
                                  </>
                                )}
                                {/* 1.2 */}
                                {row.showButton5 && (
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
                                      onKeyDown={(e) => {
                                        const allowedCharacters = /^[0-9,]+$/;

                                        if (!allowedCharacters.test(e.key) && e.key.length === 1) {
                                          e.preventDefault();
                                        }
                                      }}
                                      className="form-control"
                                      type="text"
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
                                      disabled={data?.asesorProgramStudis?.status !== 21}
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
                                      onClick={() => handleOpen11(index)}
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

                                      className="form-control"
                                      type="text"
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
                                      disabled={data?.asesorProgramStudis?.status !== 21}

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
                                      onClick={() => handleOpen12(index)}
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
                                      className="form-control"
                                      type="text"
                                      value={
                                        row.nilai ||
                                        ''
                                      }
                                      onChange={(e) =>
                                        handleNilaiChangeTable2(e, index)
                                      }
                                      disabled={data?.asesorProgramStudis?.status !== 21}
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
                                      onClick={() => handleOpen13(index)}
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

                                      className="form-control"
                                      type="text"

                                      value={
                                        row.nilai ||
                                        (data?.asesorProgramStudis?.questions?.form2 &&
                                          data.asesorProgramStudis.questions.form2.find(
                                            item => item.code === '2.1.2'
                                          )?.nilai) ||
                                        ''
                                      }
                                      onChange={(e) =>
                                        handleNilaiChangeTable2(e, index)
                                      }
                                      disabled={data?.asesorProgramStudis?.status !== 21}
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
                                      onClick={() => handleOpen14(index)}
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
                                      className="form-control"
                                      type="text"
                                      value={
                                        row.nilai ||
                                        (data?.asesorProgramStudis?.questions?.form2 &&
                                          data.asesorProgramStudis.questions.form2.find(
                                            item => item.code === '2.1.3'
                                          )?.nilai) ||
                                        ''
                                      }
                                      onChange={(e) =>
                                        handleNilaiChangeTable2(e, index)
                                      }
                                      disabled={data?.asesorProgramStudis?.status !== 21}
                                    />
                                  </>
                                )}
                                {row.showButton10 && (
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
                                        onClick={() => handleOpen15(index)}
                                        className="text-center fw-bold me-3 mt-3 mb-2"
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
                                        type="text"
                                        className="form-control mt-2"
                                        value={
                                          row.nilai ||
                                          (data?.asesorProgramStudis?.questions?.form2 &&
                                            data.asesorProgramStudis.questions.form2.find(
                                              item => item.code === '2.2.1'
                                            )?.nilai) ||
                                          ''
                                        }
                                        onChange={(e) =>
                                          handleNilaiChangeTable2(e, index)
                                        }
                                        disabled={data?.asesorProgramStudis?.status !== 21}
                                      />
                                    </div>


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
                                      onClick={() => handleOpen16(index)}
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
                                      className="form-control"
                                      type="text"
                                      value={
                                        row.nilai ||
                                        (data?.asesorProgramStudis?.questions?.form2 &&
                                          data.asesorProgramStudis.questions.form2.find(
                                            item => item.code === '3.1'
                                          )?.nilai) ||
                                        ''
                                      }
                                      onChange={(e) =>
                                        handleNilaiChangeTable2(e, index)
                                      }
                                      disabled={data?.asesorProgramStudis?.status !== 21}
                                    />
                                  </>
                                )}
                                {row.showButton12 && (
                                  <div className="flex-column " style={{ marginTop: '4rem' }}>
                                    <div className="d-flex">
                                      <button
                                        style={{
                                          width: "20px",
                                          height: "20px",
                                          borderRadius: "50%",
                                          backgroundColor: "blue",
                                          color: "white",
                                        }}
                                        onClick={() => handleOpen17(index)}
                                        className="text-center fw-bold me-3  mb-2"
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
                                        type="text"
                                        className="form-control mt-2"
                                        value={
                                          formData11.rumusan ||
                                          (data?.asesorProgramStudis?.questions &&
                                            data.asesorProgramStudis.questions.form2 &&
                                            data.asesorProgramStudis.questions.form2[2]?.additionalFields?.rumusan) ||
                                          ''
                                        }
                                        onChange={(e) => handleNChange2(e, "rumusan")}
                                        disabled={data?.asesorProgramStudis?.status !== 21}
                                      />
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
                                        onClick={() => handleOpen17(index)}
                                        className="text-center fw-bold me-3  mb-2"
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
                                        type="text"
                                        className="form-control"
                                        value={
                                          formData11.mekanisme ||
                                          (data?.asesorProgramStudis?.questions &&
                                            data.asesorProgramStudis.questions.form2 &&
                                            data.asesorProgramStudis.questions.form2[2]?.additionalFields?.mekanisme) ||
                                          ''
                                        }
                                        onChange={(e) => handleNChange2(e, "mekanisme")}
                                        disabled={data?.asesorProgramStudis?.status !== 21}
                                      />
                                    </div>
                                    <br />
                                    <div className="d-flex">
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={calculateTotalNilai11(formData11.rumusan, formData11.mekanisme)}
                                        disabled
                                      />
                                    </div>
                                    {!formData11.rumusan && (!data?.asesorProgramStudis?.questions?.form2?.[2]?.additionalFields?.rumusan) || !formData11.mekanisme && (!data?.asesorProgramStudis?.questions?.form2?.[2]?.additionalFields?.mekanisme) && (
                                      <p className="text-danger">Nilai Belum Ada</p>
                                    )}
                                  </div>
                                )}
                                {row.showButton13 && (
                                  <>
                                    <button
                                      style={{
                                        width: "20px",
                                        height: "20px",
                                        borderRadius: "50%",
                                        backgroundColor: "blue",
                                        color: "white",
                                      }}
                                      onClick={() => handleOpen19(index)}
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
                                      className="form-control"
                                      type="text"
                                      value={
                                        row.nilai ||
                                        (data?.asesorProgramStudis?.questions?.form2 &&
                                          data.asesorProgramStudis.questions.form2.find(
                                            item => item.code === '3.3'
                                          )?.nilai) ||
                                        ''
                                      }
                                      onChange={(e) =>
                                        handleNilaiChangeTable2(e, index)
                                      }
                                      disabled={data?.asesorProgramStudis?.status !== 21}
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
                                      display: (row.butir === '1.1.1' || row.butir === '1.1.2' || row.butir === '1.1.3' || row.butir === '1.1.4' || row.butir === '3.2') ? 'none' : 'block'
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
                                    row.note ||
                                    (data?.asesorProgramStudis?.questions?.form2 &&
                                      data.asesorProgramStudis.questions.form2[index]?.note) ||
                                    ""
                                  }
                                  onChange={(e) =>
                                    handleNoteChangeTable2(e, index)
                                  }
                                  placeholder="....."
                                  disabled={data?.asesorProgramStudis?.status !== 21}
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
                        )))}
                    </TableBody>
                  </Table>
                 
                </div>
              </div>
            </>
          ) : view === "two" ? (
            <>
              <h5>Format 1. Laporan Asesmen Kecukupan Program Studi Baru</h5>

              <div className="mt-3">
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
                          className="text-center"
                        >
                          Nilai
                        </TableCell>
                        <TableCell
                          sx={{ backgroundColor: "#F9FAFC" }}
                          className="text-center"
                        >
                          Bobot
                        </TableCell>
                        <TableCell
                          sx={{ backgroundColor: "#F9FAFC" }}
                          className="text-center"
                        >
                          Nilai Terboboti
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows1.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell scope="row">{row.butir}</TableCell>
                          <TableCell>
                            {row.butir === "1.1.1" || row.butir === "1.1.2" ? (
                              <div>
                                {row.keterangan[0]}

                              </div>
                            ) : (
                              row.keterangan
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="text-center">
                              {
                                row.note ||
                                (data?.asesorProgramStudis?.questions?.form2 &&
                                  data.asesorProgramStudis.questions.form2[index]?.note) ||
                                ""
                              }
                            </div>

                          </TableCell>
                          <TableCell className="text-center">
                            <>
                              {row.showButton && (
                                <div className="text-center" >
                                  {result}
                                </div>
                              )}
                              {row.showButton1 && (
                                <>
                                  <div className="text-center" >
                                    {result2}
                                  </div>
                                </>
                              )}
                              {row.showButton2 && (
                                <>
                                  {calculateTotalNilai9(formData9.jikalengkap, formData9.jikakurangsatuataulebih)}
                                </>
                              )}
                              {row.showButton3 && (
                                <>
                                  {calculateTotalNilai10(formData10.punyahaki, formData10.belumhaki)}
                                </>
                              )}
                              {row.showButton4 && (
                                <>
                                  {
                                    row.nilai ||
                                    (data?.asesorProgramStudis?.questions?.form2 &&
                                      data.asesorProgramStudis.questions.form2.find(
                                        item => item.code === '1.1.5'
                                      )?.nilai) ||
                                    ''
                                  }
                                </>
                              )}
                              {row.showButton5 && (
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
                              {row.showButton6 && (
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
                                        item => item.code === '2.1.2'
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
                                        item => item.code === '2.1.3'
                                      )?.nilai) ||
                                    ''
                                  }
                                </>
                              )}
                              {row.showButton10 && (
                                <div>
                                  {
                                    row.nilai ||
                                    (data?.asesorProgramStudis?.questions?.form2 &&
                                      data.asesorProgramStudis.questions.form2.find(
                                        item => item.code === '2.2.1'
                                      )?.nilai) ||
                                    ''
                                  }
                                </div>
                              )}
                              {row.showButton11 && (
                                <>
                                  {
                                    row.nilai ||
                                    (data?.asesorProgramStudis?.questions?.form2 &&
                                      data.asesorProgramStudis.questions.form2.find(
                                        item => item.code === '3.1'
                                      )?.nilai) ||
                                    ''
                                  }
                                </>
                              )}
                              {row.showButton12 && (
                                <div className="flex-column " >
                                  {calculateTotalNilai11(formData11.rumusan, formData11.mekanisme)}
                                </div>
                              )}
                              {row.showButton13 && (
                                <>
                                  {
                                    row.nilai ||
                                    (data?.asesorProgramStudis?.questions?.form2 &&
                                      data.asesorProgramStudis.questions.form2.find(
                                        item => item.code === '3.3'
                                      )?.nilai) ||
                                    ''
                                  }
                                </>
                              )}
                            </>
                          </TableCell>
                          <TableCell className="text-center" >{row.bobot}</TableCell>
                          <TableCell className="text-center">{terbobotiValues[index] || 'Loading...'}</TableCell>
                        </TableRow>
                      ))}
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
          ) : (
            ""
          )}
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
              placeholder="....."
              disabled={data?.asesorProgramStudis?.status !== 21}
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
            <div className="d-flex">
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <b>4</b> Terpenuhi
              </Typography>
              <div className="ms-auto">
                <input
                  style={{ width: "100px" }}
                  type="text"
                  className="form-control"
                  value={
                    formData2.terpenuhi ||
                    (data?.asesorProgramStudis?.questions &&
                      data.asesorProgramStudis.questions.form2 &&
                      data.asesorProgramStudis.questions.form2[2]?.additionalFields?.terpenuhi) ||
                    ''
                  }
                  onChange={(e) => handleNChange2(e, "terpenuhi")}
                />
                {!formData2.terpenuhi && (!data?.asesorProgramStudis?.questions?.form2?.[2]?.additionalFields?.terpenuhi) && (
                  <p className="text-danger">Nilai Belum Ada</p>
                )}
              </div>
            </div>

            <div className="d-flex">
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <b>3</b> Terpenuhi Kurang 1
              </Typography>
              <div className="ms-auto">
                <input
                  style={{ width: "100px" }}
                  type="text"
                  className="form-control"
                  value={
                    formData2.terpenuhikurangsatu ||
                    (data?.asesorProgramStudis?.questions &&
                      data.asesorProgramStudis.questions.form2 &&
                      data.asesorProgramStudis.questions.form2[2]?.additionalFields?.terpenuhikurangsatu) ||
                    ''
                  }
                  onChange={(e) => handleNChange2(e, "terpenuhikurangsatu")}
                />
                {!formData2.terpenuhikurangsatu && (!data?.asesorProgramStudis?.questions?.form2?.[2]?.additionalFields?.terpenuhikurangsatu) && (
                  <p className="text-danger">Nilai Belum Ada</p>
                )}
              </div>
            </div>

            <div className="d-flex">
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <b>2</b> Terpenuhi Kurang 2 dst.
              </Typography>
              <div className="ms-auto">
                <input
                  style={{ width: "100px" }}
                  type="text"
                  className="form-control"
                  value={
                    formData2.terpenuhikurangdua ||
                    (data?.asesorProgramStudis?.questions &&
                      data.asesorProgramStudis.questions.form2 &&
                      data.asesorProgramStudis.questions.form2[2]?.additionalFields?.terpenuhikurangdua) ||
                    ''
                  }
                  onChange={(e) => handleNChange2(e, "terpenuhikurangdua")}
                />
                {!formData2.terpenuhikurangdua && (!data?.asesorProgramStudis?.questions?.form2?.[2]?.additionalFields?.terpenuhikurangdua) && (
                  <p className="text-danger">Nilai Belum Ada</p>
                )}
              </div>
            </div>


            <hr />
            <div className="d-flex">
              <Typography id="modal-modal-description" sx={{ mt: 4 }}>
                Nilai :
              </Typography>
              <div className="ms-auto mt-4">
                <input
                  style={{ width: "100px" }}
                  type="text"
                  className="form-control"
                  disabled
                  value={calculateTotalNilai2(formData2.terpenuhi, formData2.terpenuhikurangsatu, formData2.terpenuhikurangdua)}
                />
              </div>
            </div>
            <div className="mt-3 justify-content-end d-flex">
              <Button
                variant="contained"
                size="medium"
                sx={{ marginLeft: "auto", display: "flex" }}
                onClick={handleClose}
              >
                Tutup
              </Button>
            </div>
          </Box>
        </Modal>

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
            <div className="d-flex">
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <b>4</b> Doktor lebih 2
              </Typography>
              <div className="ms-auto">
                <input
                  style={{ width: "100px" }}
                  type="text"
                  className="form-control"
                  value={
                    formData3.doktorlebihdua ||
                    (data?.asesorProgramStudis?.questions &&
                      data.asesorProgramStudis.questions.form2 &&
                      data.asesorProgramStudis.questions.form2[2]?.additionalFields?.doktorlebihdua) ||
                    ''
                  }
                  onChange={(e) => handleNChange2(e, "doktorlebihdua")}
                />
                {!formData3.doktorlebihdua && (!data?.asesorProgramStudis?.questions?.form2?.[2]?.additionalFields?.terpenuhikurangdua) && (
                  <p className="text-danger">Nilai Belum Ada</p>
                )}

              </div>
            </div>

            <div className="d-flex">
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <b>3</b> Doktor kurang 2
              </Typography>
              <div className="ms-auto">
                <input
                  style={{ width: "100px" }}
                  type="text"
                  className="form-control"
                  value={
                    formData3.doktorkurangdua ||
                    (data?.asesorProgramStudis?.questions &&
                      data.asesorProgramStudis.questions.form2 &&
                      data.asesorProgramStudis.questions.form2[2]?.additionalFields?.doktorkurangdua) ||
                    ''
                  }
                  onChange={(e) => handleNChange2(e, "doktorkurangdua")}
                />
                {!formData3.doktorkurangdua && (!data?.asesorProgramStudis?.questions?.form2?.[2]?.additionalFields?.doktorkurangdua) && (
                  <p className="text-danger">Nilai Belum Ada</p>
                )}
              </div>
            </div>
            <hr />

            <div className="d-flex">
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Nilai :
              </Typography>
              <div className="ms-auto">
                <input
                  style={{ width: "100px" }}
                  type="text"
                  className="form-control"
                  value={calculateTotalNilai3(formData3.doktorkurangdua, formData3.doktorlebihdua)}
                  disabled
                />
              </div>
            </div>
            <div className="mt-3 justify-content-end d-flex">
              <Button
                variant="contained"
                size="medium"
                sx={{ marginLeft: "auto", display: "flex" }}
                onClick={handleClose1}
              >
                Tutup
              </Button>
            </div>
          </Box>
        </Modal>

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
            <div className="d-flex">
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <b>4</b> Professor
              </Typography>
              <div className="ms-auto">
                <input
                  style={{ width: "100px" }}
                  type="text"
                  className="form-control"
                  value={
                    formData4.profesor ||
                    (data?.asesorProgramStudis?.questions &&
                      data.asesorProgramStudis.questions.form2 &&
                      data.asesorProgramStudis.questions.form2[2]?.additionalFields?.profesor) ||
                    ''
                  }
                  onChange={(e) => handleNChange2(e, "profesor")}
                />
                {!formData4.profesor && (!data?.asesorProgramStudis?.questions?.form2?.[2]?.additionalFields?.profesor) && (
                  <p className="text-danger">Nilai Belum Ada</p>
                )}
              </div>
            </div>

            <div className="d-flex">
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <b>3</b> Lektor kepala
              </Typography>
              <div className="ms-auto">
                <input
                  style={{ width: "100px" }}
                  type="text"
                  className="form-control"
                  value={
                    formData4.lektorkepala ||
                    (data?.asesorProgramStudis?.questions &&
                      data.asesorProgramStudis.questions.form2 &&
                      data.asesorProgramStudis.questions.form2[2]?.additionalFields?.lektorkepala) ||
                    ''
                  }
                  onChange={(e) => handleNChange2(e, "lektorkepala")}
                />
                {!formData4.lektorkepala && (!data?.asesorProgramStudis?.questions?.form2?.[2]?.additionalFields?.lektorkepala) && (
                  <p className="text-danger">Nilai Belum Ada</p>
                )}
              </div>
            </div>

            <div className="d-flex">
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <b>2</b> Lektor
              </Typography>
              <div className="ms-auto">
                <input
                  style={{ width: "100px" }}
                  type="text"
                  className="form-control"
                  value={
                    formData4.lektor ||
                    (data?.asesorProgramStudis?.questions &&
                      data.asesorProgramStudis.questions.form2 &&
                      data.asesorProgramStudis.questions.form2[2]?.additionalFields?.lektor) ||
                    ''
                  }
                  onChange={(e) => handleNChange2(e, "lektor")}
                />
                {!formData4.lektor && (!data?.asesorProgramStudis?.questions?.form2?.[2]?.additionalFields?.lektor) && (
                  <p className="text-danger">Nilai Belum Ada</p>
                )}
              </div>
            </div>
            <hr />

            <div className="d-flex">
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Nilai :
              </Typography>
              <div className="ms-auto">
                <input
                  style={{ width: "100px" }}
                  type="text"
                  className="form-control"
                  value={calculateTotalNilai4(formData4.lektor, formData4.lektorkepala, formData4.profesor)}
                  disabled
                />
              </div>
            </div>
            <div className="mt-3 justify-content-end d-flex">
              <Button
                variant="contained"
                size="medium"
                sx={{ marginLeft: "auto", display: "flex" }}
                onClick={handleClose2}
              >
                Tutup
              </Button>
            </div>
          </Box>
        </Modal>

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
            <div className="d-flex">
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <b>4</b> Linier
              </Typography>
              <div className="ms-auto">
                <input
                  style={{ width: "100px" }}
                  type="text"
                  className="form-control"
                  value={
                    formData5.linear ||
                    (data?.asesorProgramStudis?.questions &&
                      data.asesorProgramStudis.questions.form2 &&
                      data.asesorProgramStudis.questions.form2[2]?.additionalFields?.linear) ||
                    ''
                  }
                  onChange={(e) => handleNChange2(e, "linear")}
                />
                {!formData5.linear && (!data?.asesorProgramStudis?.questions?.form2?.[2]?.additionalFields?.linear) && (
                  <p className="text-danger">Nilai Belum Ada</p>
                )}
              </div>
            </div>

            <div className="d-flex">
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <b>0</b> Tidak Linier
              </Typography>
              <div className="ms-auto">
                <input
                  style={{ width: "100px" }}
                  type="text"
                  className="form-control"
                  value={
                    formData5.tidaklinear ||
                    (data?.asesorProgramStudis?.questions &&
                      data.asesorProgramStudis.questions.form2 &&
                      data.asesorProgramStudis.questions.form2[2]?.additionalFields?.tidaklinear) ||
                    ''
                  }
                  onChange={(e) => handleNChange2(e, "tidaklinear")}
                />
                {!formData5.tidaklinear && (!data?.asesorProgramStudis?.questions?.form2?.[2]?.additionalFields?.tidaklinear) && (
                  <p className="text-danger">Nilai Belum Ada</p>
                )}
              </div>
            </div>

            <hr />
            <div className="d-flex mt-2">
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Nilai :
              </Typography>
              <div className="ms-auto">
                <input
                  style={{ width: "100px" }}
                  type="text"
                  className="form-control"
                  value={calculateTotalNilai5(formData5.linear, formData5.tidaklinear)}
                  disabled
                />
              </div>
            </div>
            <div className="mt-3 justify-content-end d-flex">
              <Button
                variant="contained"
                size="medium"
                sx={{ marginLeft: "auto", display: "flex" }}
                onClick={handleClose3}
              >
                Tutup
              </Button>

            </div>
          </Box>
        </Modal>

        {/* Modal 1.1.2 */}
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
            <div className="d-flex">
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <b>4</b> Ditugaskan
              </Typography>
              <div className="ms-auto">
                <input
                  style={{ width: "100px" }}
                  type="text"
                  className="form-control"
                  value={
                    formData6.ditugaskan ||
                    (data?.asesorProgramStudis?.questions &&
                      data.asesorProgramStudis.questions.form2 &&
                      data.asesorProgramStudis.questions.form2[2]?.additionalFields?.ditugaskan) ||
                    ''
                  }
                  onChange={(e) => handleNChange2(e, "ditugaskan")}
                />
                {!formData6.ditugaskan && (!data?.asesorProgramStudis?.questions?.form2?.[2]?.additionalFields?.ditugaskan) && (
                  <p className="text-danger">Nilai Belum Ada</p>
                )}
              </div>
            </div>

            <div className="d-flex">
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <b>0</b> Tidak ditugaskan
              </Typography>
              <div className="ms-auto">
                <input
                  style={{ width: "100px" }}
                  type="text"
                  className="form-control"
                  value={
                    formData6.tidakditugaskan ||
                    (data?.asesorProgramStudis?.questions &&
                      data.asesorProgramStudis.questions.form2 &&
                      data.asesorProgramStudis.questions.form2[2]?.additionalFields?.tidakditugaskan) ||
                    ''
                  }
                  onChange={(e) => handleNChange2(e, "tidakditugaskan")}
                />
                {!formData6.tidakditugaskan && (!data?.asesorProgramStudis?.questions?.form2?.[2]?.additionalFields?.tidakditugaskan) && (
                  <p className="text-danger">Nilai Belum Ada</p>
                )}
              </div>
            </div>

            <hr />

            <div className="d-flex mt-2">
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Nilai :
              </Typography>
              <div className="ms-auto">
                <input
                  style={{ width: "100px" }}
                  type="text"
                  className="form-control"
                  value={calculateTotalNilai6(formData6.ditugaskan, formData6.tidakditugaskan)}
                  disabled
                />
              </div>
            </div>
            <div className="mt-3 justify-content-end d-flex">
              <Button
                variant="contained"
                size="medium"
                sx={{ marginLeft: "auto", display: "flex" }}
                onClick={handleClose4}
              >
                Tutup
              </Button>
            </div>
          </Box>
        </Modal>

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
            <div className="d-flex">
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <b>4</b> Magister
              </Typography>
              <div className="ms-auto">
                <input
                  style={{ width: "100px" }}
                  type="text"
                  className="form-control"
                  value={
                    formData7.magister ||
                    (data?.asesorProgramStudis?.questions &&
                      data.asesorProgramStudis.questions.form2 &&
                      data.asesorProgramStudis.questions.form2[2]?.additionalFields?.magister) ||
                    ''
                  }
                  onChange={(e) => handleNChange2(e, "magister")}
                />
                {!formData7.magister && (!data?.asesorProgramStudis?.questions?.form2?.[2]?.additionalFields?.magister) && (
                  <p className="text-danger">Nilai Belum Ada</p>
                )}
              </div>
            </div>

            <div className="d-flex">
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <b>0</b> Dibawah Magister
              </Typography>
              <div className="ms-auto">
                <input
                  style={{ width: "100px" }}
                  type="text"
                  className="form-control"
                  value={
                    formData7.dibawahmagister ||
                    (data?.asesorProgramStudis?.questions &&
                      data.asesorProgramStudis.questions.form2 &&
                      data.asesorProgramStudis.questions.form2[2]?.additionalFields?.dibawahmagister) ||
                    ''
                  }
                  onChange={(e) => handleNChange2(e, "dibawahmagister")}
                />
                {!formData7.dibawahmagister && (!data?.asesorProgramStudis?.questions?.form2?.[2]?.additionalFields?.dibawahmagister) && (
                  <p className="text-danger">Nilai Belum Ada</p>
                )}
              </div>
            </div>

            <hr />
            <div className="d-flex mt-2">
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Nilai :
              </Typography>
              <div className="ms-auto">
                <input
                  style={{ width: "100px" }}
                  type="text"
                  className="form-control"
                  value={calculateTotalNilai7(formData7.magister, formData7.dibawahmagister)}
                  disabled
                />
              </div>
            </div>
            <div className="mt-3 justify-content-end d-flex">
              <Button
                variant="contained"
                size="medium"
                sx={{ marginLeft: "auto", display: "flex" }}
                onClick={handleClose5}
              >
                Tutup
              </Button>
            </div>
          </Box>
        </Modal>

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
            <div className="d-flex">
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <b>4</b> Sesuai
              </Typography>
              <div className="ms-auto">
                <input
                  style={{ width: "100px" }}
                  type="text"
                  className="form-control"
                  value={
                    formData8.sesuai ||
                    (data?.asesorProgramStudis?.questions &&
                      data.asesorProgramStudis.questions.form2 &&
                      data.asesorProgramStudis.questions.form2[2]?.additionalFields?.sesuai) ||
                    ''
                  }
                  onChange={(e) => handleNChange2(e, "sesuai")}
                />
                {!formData8.sesuai && (!data?.asesorProgramStudis?.questions?.form2?.[2]?.additionalFields?.sesuai) && (
                  <p className="text-danger">Nilai Belum Ada</p>
                )}
              </div>
            </div>

            <div className="d-flex">
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <b>0</b> Tidak Sesuai
              </Typography>
              <div className="ms-auto">
                <input
                  style={{ width: "100px" }}
                  type="text"
                  className="form-control"
                  value={
                    formData8.tidaksesuai ||
                    (data?.asesorProgramStudis?.questions &&
                      data.asesorProgramStudis.questions.form2 &&
                      data.asesorProgramStudis.questions.form2[2]?.additionalFields?.tidaksesuai) ||
                    ''
                  }
                  onChange={(e) => handleNChange2(e, "tidaksesuai")}
                />
                {!formData8.tidaksesuai && (!data?.asesorProgramStudis?.questions?.form2?.[2]?.additionalFields?.tidaksesuai) && (
                  <p className="text-danger">Nilai Belum Ada</p>
                )}
              </div>
            </div>

            <hr />
            <div className="d-flex mt-2">
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Nilai :
              </Typography>
              <div className="ms-auto">
                <input
                  style={{ width: "100px" }}
                  type="text"
                  className="form-control"
                  value={calculateTotalNilai8(formData8.sesuai, formData8.tidaksesuai)}
                  disabled
                />
              </div>
            </div>
            <div className="mt-3 justify-content-end d-flex">
              <Button
                variant="contained"
                size="medium"
                sx={{ marginLeft: "auto", display: "flex" }}
                onClick={handleClose6}
              >
                Tutup
              </Button>
            </div>
          </Box>
        </Modal>

        {/* Modal 1.1.3 */}
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
            <div className="d-flex">
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <b>4</b> Jika Lengkap
              </Typography>
              <div className="ms-auto">
                <input
                  style={{ width: "100px" }}
                  type="text"
                  className="form-control"
                  value={
                    formData9.jikalengkap ||
                    (data?.asesorProgramStudis?.questions &&
                      data.asesorProgramStudis.questions.form2 &&
                      data.asesorProgramStudis.questions.form2[2]?.additionalFields?.jikalengkap) ||
                    ''
                  }
                  onChange={(e) => handleNChange2(e, "jikalengkap")}
                />
                {!formData9.jikalengkap && (!data?.asesorProgramStudis?.questions?.form2?.[2]?.additionalFields?.jikalengkap) && (
                  <p className="text-danger">Nilai Belum Ada</p>
                )}
              </div>
            </div>

            <div className="d-flex">
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <b>2</b> Jika kurang 1 atau lebih
              </Typography>
              <div className="ms-auto">
                <input
                  style={{ width: "100px" }}
                  type="text"
                  className="form-control"
                  value={
                    formData9.jikakurangsatuataulebih ||
                    (data?.asesorProgramStudis?.questions &&
                      data.asesorProgramStudis.questions.form2 &&
                      data.asesorProgramStudis.questions.form2[2]?.additionalFields?.jikakurangsatuataulebih) ||
                    ''
                  }
                  onChange={(e) => handleNChange2(e, "jikakurangsatuataulebih")}
                />
                {!formData9.jikakurangsatuataulebih && (!data?.asesorProgramStudis?.questions?.form2?.[2]?.additionalFields?.jikakurangsatuataulebih) && (
                  <p className="text-danger">Nilai Belum Ada</p>
                )}
              </div>
            </div>

            <hr />
            <div className="mt-3 justify-content-end d-flex">
              <Button
                variant="contained"
                size="medium"
                sx={{ marginLeft: "auto", display: "flex" }}
                onClick={handleClose7}
              >
                Tutup
              </Button>
            </div>
          </Box>
        </Modal>

        {/* Modal 1.1.4 */}
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
            <div className="d-flex">
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Punya HAKI
              </Typography>
              <div className="ms-auto">
                <input
                  style={{ width: "100px" }}
                  type="text"
                  className="form-control"
                  value={
                    formData10.punyahaki ||
                    (data?.asesorProgramStudis?.questions &&
                      data.asesorProgramStudis.questions.form2 &&
                      data.asesorProgramStudis.questions.form2[2]?.additionalFields?.punyahaki) ||
                    ''
                  }
                  onChange={(e) => handleNChange2(e, "punyahaki")}
                />
                {!formData10.punyahaki && (!data?.asesorProgramStudis?.questions?.form2?.[2]?.additionalFields?.punyahaki) && (
                  <p className="text-danger">Nilai Belum Ada</p>
                )}
              </div>
            </div>

            <div className="d-flex">
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Belum HAKI
              </Typography>
              <div className="ms-auto">
                <input
                  style={{ width: "100px" }}
                  type="text"
                  className="form-control"
                  value={
                    formData10.belumhaki ||
                    (data?.asesorProgramStudis?.questions &&
                      data.asesorProgramStudis.questions.form2 &&
                      data.asesorProgramStudis.questions.form2[2]?.additionalFields?.belumhaki) ||
                    ''
                  }
                  onChange={(e) => handleNChange2(e, "belumhaki")}
                />
                {!formData10.belumhaki && (!data?.asesorProgramStudis?.questions?.form2?.[2]?.additionalFields?.belumhaki) && (
                  <p className="text-danger">Nilai Belum Ada</p>
                )}
              </div>
            </div>

            <hr />
            <div className="mt-3 justify-content-end d-flex">
              <Button
                variant="contained"
                size="medium"
                sx={{ marginLeft: "auto", display: "flex" }}
                onClick={handleClose8}
              >
                Tutup
              </Button>
            </div>
          </Box>
        </Modal>

        {/* Modal 1.2 */}
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
                {" "}
                4 Jumlah dan kualifikasinya sangat baik untuk mendukung
                terpenuhinya capaian pembelajaran
              </Alert>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Alert severity="info">
                {" "}
                3 Jumlah dan kualifikasinya lebih baik dibandingkan persyaratan
                minimal sehingga mendukung terpenuhinya capaian pembelajaran
              </Alert>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Alert severity="info">
                {" "}
                2 Jumlah dan kualifikasinya memenuhi persyaratan minimal
              </Alert>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Alert severity="info">
                {" "}
                1 Jumlah dan kualifikasinya kurang dari persyaratan minimal
              </Alert>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Alert severity="info">
                {" "}
                0 Tidak memiliki pustakawa, laboran, analis, teknisi, operator,
                dan programer, dan tenaga administrasi
              </Alert>
            </Typography>
            <hr />
            <div className="mt-3 justify-content-end d-flex">
              <Button
                variant="contained"
                size="medium"
                sx={{ marginLeft: "auto", display: "flex" }}
                onClick={handleClose9}
              >
                Tutup
              </Button>
            </div>
          </Box>
        </Modal>

        {/* Modal 1.3 */}
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
              <Alert severity="info"> 4 Lengkap</Alert>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Alert severity="info"> 3 Kurang 1</Alert>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Alert severity="info">2 Kurang 2</Alert>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Alert severity="info">1 Kurang 3</Alert>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Alert severity="info">0 Tidak ada semua</Alert>
            </Typography>
            <hr />
            <div className="mt-3 justify-content-end d-flex">
              <Button
                variant="contained"
                size="medium"
                sx={{ marginLeft: "auto", display: "flex" }}
                onClick={handleClose10}
              >
                Tutup
              </Button>
            </div>
          </Box>
        </Modal>

        {/* Modal 2.1 */}
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
                4 Sangat lengkap dan sangat baik mutunya
              </Alert>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Alert severity="info"> 3 Lengkap dan baik</Alert>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Alert severity="info">2 Cukup lengkap dan cukup baik</Alert>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Alert severity="info"> 1 Kurang lengkap</Alert>
            </Typography>
            <hr />
            <div className="mt-3 justify-content-end d-flex">
              <Button
                variant="contained"
                size="medium"
                sx={{ marginLeft: "auto", display: "flex" }}
                onClick={handleClose11}
              >
                Tutup
              </Button>
            </div>
          </Box>
        </Modal>

        {/* Modal 2.1.2 */}
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
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Alert severity="info">
                {" "}
                4 Sangat lengkap dan sangat baik mutunya
              </Alert>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Alert severity="info">3 Lengkap dan baik</Alert>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Alert severity="info"> 2 Cukup lengkap dan cukup baik</Alert>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Alert severity="info"> 1 Kurang lengkap</Alert>
            </Typography>
            <hr />
            <div className="mt-3 justify-content-end d-flex">
              <Button
                variant="contained"
                size="medium"
                sx={{ marginLeft: "auto", display: "flex" }}
                onClick={handleClose12}
              >
                Tutup
              </Button>
            </div>
          </Box>
        </Modal>

        {/* Modal 2.1.3 */}
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
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Alert severity="info">
                {" "}
                4 Sangat lengkap dan sangat baik mutunya
              </Alert>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Alert severity="info"> 3 Lengkap dan baik</Alert>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Alert severity="info"> 2 Cukup lengkap dan cukup baik</Alert>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Alert severity="info">1 Kurang lengkap</Alert>
            </Typography>
            <hr />
            <div className="mt-3 justify-content-end d-flex">
              <Button
                variant="contained"
                size="medium"
                sx={{ marginLeft: "auto", display: "flex" }}
                onClick={handleClose13}
              >
                Tutup
              </Button>
            </div>
          </Box>
        </Modal>

        {/* Modal 2.2.1 */}
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
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Alert severity="info">
                {" "}
                4 Sangat lengkap dan sangat baik mutunya
              </Alert>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Alert severity="info"> 3 Lengkap dan baik</Alert>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Alert severity="info"> 2 Cukup lengkap dan cukup baik</Alert>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Alert severity="info">1 Kurang lengkap</Alert>
            </Typography>
            <hr />
            <div className="mt-3 justify-content-end d-flex">
              <Button
                variant="contained"
                size="medium"
                sx={{ marginLeft: "auto", display: "flex" }}
                onClick={handleClose14}
              >
                Tutup
              </Button>
            </div>
          </Box>
        </Modal>

        {/* Modal 3.1 */}
        <Modal
          open={open15}
          onClose={handleClose15}
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
                berdasarkan studi keterlacakan lulusan dari program studi
                sejenis tingkat internasional
              </Alert>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Alert severity="info">
                3 Pengusul menguraikan profil lulusan program studi yang berupa
                profesi atau jenis pekerjaan atau bentuk kerja lainnya
                berdasarkan studi keterlacakan lulusan dari program studi
                sejenis tingkat regional ASEAN
              </Alert>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Alert severity="info">
                2 Pengusul menguraikan profil lulusan program studi yang berupa
                profesi atau jenis pekerjaan atau bentuk kerja lainnya
                berdasarkan studi keterlacakan lulusan dari program studi
                sejenis tingkat nasional
              </Alert>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Alert severity="info">
                {" "}
                1 Pengusul menguraikan profil lulusan program studi yang berupa
                profesi atau jenis pekerjaan atau bentuk kerja lainnya
                berdasarkan studi keterlacakan lulusan dari program studi
                sejenis tingkat lokal
              </Alert>
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Alert severity="info">0 Tidak menguraikan profil lulusan</Alert>
            </Typography>
            <hr />
            <div className="mt-3 justify-content-end d-flex">
              <Button
                variant="contained"
                size="medium"
                sx={{ marginLeft: "auto", display: "flex" }}
                onClick={handleClose15}
              >
                Tutup
              </Button>
            </div>
          </Box>
        </Modal>

        {/* Modal 3.2 */}
        <Modal
          open={open16}
          onClose={handleClose16}
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
                4 Rumusan capaian pembelajaran sesuai dengan profil lulusan,
                deskripsi kompetensinya sesuai level 6 KKNI dan sesuai SN-Dikti
                yang mencakup 4 (empat) domain capaian pembelajaran
              </Alert>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Alert severity="info">
                {" "}
                3 Rumusan capaian pembelajaran sesuai dengan profil lulusan,
                deskripsi kompetensinya sesuai level 6 KKNI dan hanya mencakup 3
                (tiga) domain capaian pembelajaran sesuai SN-Dikti (Domain
                Sikap, Keterampilan Umum, dan Keterampilan Khusus)
              </Alert>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Alert severity="info">
                {" "}
                2 Rumusan capaian pembelajaran sesuai dengan profil lulusan,
                deskripsi kompetensinya sesuai level 6 KKNI dan hanya mencakup 2
                (dua) domain capaian pembelajaran (Domain Sikap dan Keterampilan
                Umum) sesuai SN-Dikti
              </Alert>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Alert severity="info">
                {" "}
                1 Rumusan capaian pembelajaran sesuai dengan profil lulusan,
                deskripsi kompetensinya sesuai level 6 KKNI, tidak menjabarkan
                capaian pembelajaran sesuai SN-Dikti
              </Alert>
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Alert severity="info">
                {" "}
                0 Rumusan capaian pembelajaran tidak sesuai dengan SN Dikti atau
                level 6 KKNI
              </Alert>
            </Typography>
            <hr />
            <div className="mt-3 justify-content-end d-flex">
              <Button
                variant="contained"
                size="medium"
                sx={{ marginLeft: "auto", display: "flex" }}
                onClick={handleClose16}
              >
                Tutup
              </Button>
            </div>
          </Box>
        </Modal>

        <Modal
          open={open17}
          onClose={handleClose17}
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
                4 Penyusunan capaian pembelajaran berdasarkan empat aspek
              </Alert>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Alert severity="info">
                {" "}
                3 Penyusunan capaian pembelajaran berdasarkan aspek 1, 2 dan
                satu aspek lainnya
              </Alert>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Alert severity="info">
                2 Penyusunan capaian pembelajaran berdasarkan aspek 1 dan 2
              </Alert>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Alert severity="info">
                1 Penyusunan capaian pembelajaran berdasarkan satu aspek
              </Alert>
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Alert severity="info"> 0 Tidak dijelaskan</Alert>
            </Typography>
            <hr />
            <div className="mt-3 justify-content-end d-flex">
              <Button
                variant="contained"
                size="medium"
                sx={{ marginLeft: "auto", display: "flex" }}
                onClick={handleClose17}
              >
                Tutup
              </Button>
            </div>
          </Box>
        </Modal>

        {/* Modal 3.3 */}
        <Modal
          open={open19}
          onClose={handleClose19}
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
                4 Semua bahan kajian diturunkan dari dan relevan dengan capaian
                pembelajaran dan mendukung visi keilmuan dan keunikan program
                studi
              </Alert>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Alert severity="info">
                {" "}
                3 Semua bahan kajian diturunkan dari dan relevan dengan capaian
                pembelajaran dan mendukung visi keilmuan program studi
              </Alert>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Alert severity="info">
                2 Semua bahan kajian diturunkan dari dan relevan dengan capaian
                pembelajaran
              </Alert>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Alert severity="info">
                {" "}
                1 Sebagian bahan kajian tidak diturunkan dari dan tidak relevan
                dengan capaian pembelajaran
              </Alert>
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Alert severity="info">
                0 Bahan kajian tidak diturunkan dari dan tidak relevan dengan
                capaian pembelajaran
              </Alert>
            </Typography>
            <hr />
            <div className="mt-3 justify-content-end d-flex">
              <Button
                variant="contained"
                size="medium"
                sx={{ marginLeft: "auto", display: "flex" }}
                onClick={handleClose19}
              >
                Tutup
              </Button>
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
  );
};

export default CardPenilaian;
