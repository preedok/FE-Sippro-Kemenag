import React, { useState, useEffect, useRef } from "react";
import "../../../../../../../../../../views/ptki/admin.css";
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
import VisibilityIcon from "@mui/icons-material/Visibility";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  getToken,
  getUserId,
  getRole,
} from "../../../../../../../../../../utils/token";
import api from "../../../../../../../../../service/api";
import Swal from "sweetalert2";
import BobotEnumDoctor from "../../../../../../../../../assesor/module/penilaian/utils/BobotS3";
import { LinearProgress } from "@mui/material";
import { css } from "@emotion/react";
import { BeatLoader } from "react-spinners";
import ReactDOMServer from "react-dom/server";
import swal from "sweetalert";
import { motion } from "framer-motion";
import {
  ErrorSwal,
  InputSwal2,
} from "../../../../../../../../../../utils/swal2";
import EditNotificationsIcon from "@mui/icons-material/EditNote";
import TextField from "@mui/material/TextField";
import { useDarkMode } from "../../../../../../../../../../utils/DarkModeContext";
import FormALPenilaianValidatorBanpt from "../../../../al/doktor/form-lapangan-doktor/editLapanganAssesor";
import Stack from "@mui/material/Stack";
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

const CardPenilaian = () => {
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

  const handleOpen3314 = () => setOpen3314(true);
  const [open3314, setOpen3314] = useState(false);
  const handleClose3314 = () => setOpen3314(false);

  const [open34, setOpen34] = useState(false);
  const handleClose34 = () => {
    setOpen34(false);
  };

  const [selectedValue, setSelectedValue] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [coment, setComent] = useState("");

  // form penilaian asesor
  const [formData, setFormData] = useState({
    Na: "",
    Nb: "",
    Nc: "",
    f: "",
  });
  const [formData2, setFormData2] = useState({
    ltrk2: "",
    lt2: "",
    luasRuangPerMahasiswa: "",
    status2: "",
  });
  const [formData3, setFormData3] = useState({
    ltrk3: "",
    lt3: "",
    luasRuangPerMahasiswa: "",
    status3: "",
  });
  const [formData4, setFormData4] = useState({
    ltrk4: "",
    lt4: "",
    luasRuangPerMahasiswa: "",
    status4: "",
  });
  const [formData9, setFormData9] = useState({
    ltrp: "",
  });

  // penilaian lapangan
  const [formData5, setFormData5] = useState({
    Na5: "",
    Nb5: "",
    Nc5: "",
    f5: "",
  });
  const [formData6, setFormData6] = useState({
    ltrk6: "",
    lt6: "",
    luasRuangPerMahasiswa6: "",
    status6: "",
  });
  const [formData7, setFormData7] = useState({
    ltrk7: "",
    lt7: "",
    luasRuangPerMahasiswa7: "",
    status7: "",
  });
  const [formData8, setFormData8] = useState({
    ltrk8: "",
    lt8: "",
    luasRuangPerMahasiswa8: "",
    status8: "",
  });
  const [comments, setComments] = useState({
    note: "",
  });

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
    if (selectedViewIndex) {
      localStorage.removeItem("selectedViewIndex");
    }
    const lastView = localStorage.getItem("lastView");
    if (lastView) {
      window.location.href = lastView;
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

  // Scroll
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

  // get data doktor
  const token = getToken();
  const [data, setData] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rows4, setRows4] = useState([]);
  const [fileUrl, setFileUrl] = useState(null);

  const beatLoaderHtml = ReactDOMServer.renderToString(
    <BeatLoader css={override} size={15} color={"#4caf50"} loading={true} />
  );

  const handleDownloadFile = async () => {
    const kode = localStorage.getItem("code_download");
    const programStudiId = localStorage.getItem("programStudiId");
    Swal.fire({
      title: "Download...",
      text: "Sedang Proses Download File...",
      html: beatLoaderHtml,
      allowOutsideClick: false,
      showConfirmButton: false,
    });
    try {
      const response = await api.get(
        `/req-prodi/prodi-doc-file/${programStudiId}/${kode}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );

      if (response.status === 200) {
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
        Swal.close();
      } else if (response.status === 404) {
        Swal.fire({
          icon: "error",
          title: `Error`,
          text: `Old assessment file not found.`,
        });
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
      } else {
        // Handle other types of errors
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `${error.message}`,
        });
      }
    }
  };

  const getData = async () => {
    const programStudiId = localStorage.getItem("programStudiId");
    const asesorId = getUserId();
    setIsSubmitted(true);
    setTimeout(async () => {
      try {
        const response = await api.get(
          `/prodi-assesment/${programStudiId}/${asesorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const documentMasterList = response.data.data.prodiDocuments;

        const newRows = documentMasterList.map((document) => ({
          kode: document.kode,
          notes: document.notes,
          dokumen: <p className="text-left">{document.namaDokumen}</p>,
          file: document.filename ? (
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="btn btn-primary text-white"
              onClick={() =>
                handleDownloadFile(
                  programStudiId,
                  localStorage.setItem("code_download", document.kode)
                )
              }
            >
              <VisibilityIcon />
            </a>
          ) : (
            <p className="text-danger">-</p>
          ),
          comment: "",
        }));
        setRows4(newRows);
        setData(response.data.data);
        if (response.data.data.asesorProgramStudis.questions.form1)
          setNilaiButirRows(
            response.data.data.asesorProgramStudis.questions.form1
          );
        if (response.data.data.asesorProgramStudis.questions.form2)
          setNilaiButirRows1(
            response.data.data.asesorProgramStudis.questions.form2
          );
        setIsStatusDraft(response.data.data.asesorProgramStudis.status);
        setIsSubmitted(false);
        setComent(response.data.data.asesorProgramStudis.komentar);
        setAsesorEvaluator(
          response.data.data.asesorProgramStudis.asesorEvaluator
        );
        setAsesorProdiAkreditasi(
          response.data.data.asesorProgramStudis.asesorProdiAkreditasi
        );
        setAsesorProdiAsal(
          response.data.data.asesorProgramStudis.asesorProdiAsal
        );
        setAsesorPtAsal(response.data.data.asesorProgramStudis.asesorPtAsal);
        setIsRecommended(response.data.data.asesorProgramStudis.rekomendasi);
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `${error.message}`,
        });
      }
    }, 1500);
  };
  const setNilaiButirRows = (value) => {
    rows.forEach((obj1) => {
      const correspondingObj2 = value.find((obj2) => obj2.code === obj1.butir);
      if (correspondingObj2) {
        obj1.nilai = correspondingObj2.nilai;
      }
    });
    rows.forEach((obj1) => {
      const correspondingObj2 = value.find((obj2) => obj2.code === obj1.butir);
      if (correspondingObj2) {
        obj1.note = correspondingObj2.note;
      }
    });
  };
  const setNilaiButirRows1 = (value) => {
    rows1.forEach((obj1) => {
      const correspondingObj2 = value.find((obj2) => obj2.code === obj1.butir);
      if (correspondingObj2) {
        obj1.nilai = correspondingObj2.nilai;
      }
    });
    rows1.forEach((obj1) => {
      const correspondingObj2 = value.find((obj2) => obj2.code === obj1.butir);
      if (correspondingObj2) {
        obj1.note = correspondingObj2.note;
      }
    });
  };
  const [isStatusDraft, setIsStatusDraft] = useState(21);
  useEffect(() => {
    getData();
  }, []);

  //Init Form Penilaian kecukupan
  // const [rows, setRows] = useState([
  //   {
  //     butir: "A",
  //     note: '',
  //     keterangan: "Surat Rekomendasi KOPERTAIS (BAGI PTKIS)",
  //     nilai: "",
  //   },
  //   {
  //     butir: "B",
  //     note: '',
  //     keterangan:
  //       "Surat Persetujuan Tertulis Badan Penyelenggara tentang pembukuan prodi (Bagi PTKIS)",
  //     nilai: "",
  //   },
  //   {
  //     butir: "C",
  //     note: '',
  //     keterangan:
  //       "Surat Pertimbangan Tertulis Senat perguruan tinggi tentang pembukaan prodi (BAGI PTKIN & PTKIS EKSISTING)",
  //     nilai: "",
  //   },
  //   {
  //     butir: "D",
  //     note: '',
  //     keterangan:
  //       "Akreditasi Program Sarjana yang sebidang atau pendukung (BAGI PTKIS & PTKIN)",
  //     nilai: "",
  //   },
  //   {
  //     butir: "E",
  //     note: '',
  //     keterangan: "Pakta integritas (BAGI PTKIS & PTKIN)",
  //     nilai: "",
  //   },
  //   {
  //     butir: "*",
  //     note: '',
  //     keterangan: "Pemenuhan Persyaratan Administratif",
  //     nilai: "",
  //   },
  // ]);
  const [rows, setRows] = useState([
    {
      butir: "A",
      note: "",
      keterangan:
        "Surat Persetujuan Tertulis Badan Penyelenggara tentang pembukuan prodi (Bagi PTKIS)",
      nilai: "",
    },
    {
      butir: "B",
      note: "",
      keterangan:
        "Surat Pertimbangan Tertulis Senat perguruan tinggi tentang pembukaan prodi (BAGI PTKIN & PTKIS EKSISTING)",
      nilai: "",
    },
    {
      butir: "C",
      note: "",
      keterangan:
        "Akreditasi Program Sarjana yang sebidang atau pendukung (BAGI PTKIS & PTKIN)",
      nilai: "",
    },
    {
      butir: "D",
      note: "",
      keterangan: "Pakta integritas (BAGI PTKIS & PTKIN)",
      nilai: "",
    },
    {
      butir: "*",
      note: "",
      keterangan: "Pemenuhan Persyaratan Administratif",
      nilai: "",
    },
  ]);
  const [rows1, setRows1] = useState([
    {
      butir: "1.1",
      note: "",
      keterangan:
        "Keunikan atau keunggulan program studi yang diusulkan berdasarkan perbandingan program studi sejenis nasional dan/atau internasional yang mencakup aspek (1) pengembangan keilmuan, (2) kajian capaian pembelajaran, dan (3) kurikulum program studi sejenis",
      nilai: "",
      bobot: BobotEnumDoctor.CODE_1_1,
      showButton: true,
    },
    {
      butir: "1.2",
      note: "",
      keterangan:
        "Profil lulusan (Profesi, jenis pekerjaan, bentuk kerja) program studi yang diusulkan",
      nilai: "",
      bobot: BobotEnumDoctor.CODE_1_2,
      showButton1: true,
    },
    {
      butir: "1.3",
      note: "",
      keterangan:
        "Rumusan capaian pembelajaran dari program studi yang diusulkan merujuk SN Dikti (Permendikbud No 3 Tahun 2020) dan sesuai level 8 (delapan) Kerangka Kualifikasi Nasional Indonesia (Perpres Nomor 8 Tahun 2012)",
      nilai: "",
      bobot: BobotEnumDoctor.CODE_1_3,
      showButton2: true,
    },
    {
      butir: "1.4",
      note: "",
      keterangan:
        "Rancangan Susunan matakuliah per semester memenuhi aspek:  1. Kesesuaian mata kuliah dengan rumusan capaian pembelajaran , 2. Urutan mata kuliah, dan 3. Beban sks per semester wajar",
      nilai: "",
      bobot: BobotEnumDoctor.CODE_1_4,
      showButton3: true,
    },
    {
      butir: "1.5 & 1.6",
      note: "",
      keterangan:
        "Ketersediaan RPS (Rencana Pembelajaran Semester) untuk 5 (lima) matakuliah penciri program studi yang diusulkan yang memenuhi 9 (sembilan) komponen:  1. Nama program studi, nama dan kode mata kuliah, semester, sks, nama dosen pengampu;, 2. Capaian Pembelajaran lulusan yang dibebankan pada mata kuliah;, 3. Kemampuan akhir yang direncanakan pada tiap tahap pembelajaran untuk memenuhi capaian pembelajaran lulusan;, 4. Bahan kajian yang terkait dengan kemampuan yang akan dicapai, 5. Metode pembelajaran; 6. Waktu yang disediakan untuk mencapai kemampuan pada tiap tahap pembelajaran;, 7. Pengalaman belajar mahasiswa yang diwujudkan dalam deskripsi tugas yang harus dikerjakan oleh mahasiswa selama satu semester;, 8. Kriteria, indikator, dan bobot penilaian; dan 9. Daftar referensi yang digunakan.",
      nilai: "",
      bobot: BobotEnumDoctor.CODE_1_5,
      showButton4: true,
    },
    {
      butir: "2.1",
      note: "",
      keterangan: "Jumlah, kualifikasi, dan status calon dosen tetap",
      nilai: "",
      bobot: BobotEnumDoctor.CODE_2_1,
      showButton6: true,
    },
    {
      butir: "2.2",
      note: "",
      keterangan:
        "Jumlah karya ilmiah yang dihasilkan oleh calon dosen tetap penuh waktu yang bidang keahliannya sama dengan program studi yang diusulkan, selama 3 tahun terakhir",
      nilai: "",
      bobot: BobotEnumDoctor.CODE_2_2,
      additionalProp1: "",
      showButton7: true,
    },
    {
      butir: "3.1.1",
      note: "",
      keterangan:
        "Struktur organisasi Unit Pengelola Program Studi mencakup aspek: a. Lima unsur unit pengelola program studi: 1) unsur penyusun kebijakan; 2) unsur pelaksana akademik; 3) unsur pengawas dan penjaminan mutu; 4) unsur penunjang akademik atau sumber belajar; dan 5) unsur pelaksana administrasi atau tata usaha; dan b. penjelasan tata kerja dan tata hubungan",
      nilai: "",
      bobot: BobotEnumDoctor.CODE_3_1_1,
      showButton8: true,
    },
    {
      butir: "3.1.2",
      note: "",
      keterangan:
        " Perwujudan good governance dan lima pilar tata pamong yang mampu menjamin terwujudnya visi, terlaksanakannya misi, tercapainya tujuan, dan berhasilnya strategi yang digunakan secara: 1) Kredibel 2) Transparan, 3) Akuntabel,4) Bertanggung jawab, dan 5) Adil",
      nilai: "",
      bobot: BobotEnumDoctor.CODE_3_1_2,
      showButton9: true,
    },
    {
      butir: "3.2",
      note: "",
      keterangan:
        "Rancangan Keterlaksanaan Sistem Penjaminan Mutu Internal berdasarkan keberadaan 5 aspek: 1) dokumen legal pembentukan unsur pelaksan penjaminan mutu; 2) ketersediaan dokumen mutu: kebijakan SPMI, manual SPMI, standar SPMI, dan formulir SPMI; 3) terlaksananya siklus penjaminan mutu (siklus PPEPP); 4) bukti sahih efektivitas pelaksanaan penjaminan mutu <b>(jika ada)</b> ; dan 5) memiliki external benchmarking dalam peningkatan mutu (jika ada)",
      nilai: "",
      bobot: BobotEnumDoctor.CODE_3_2,
      showButton15: true,
    },
    {
      butir: "3.3.1",
      note: "",
      keterangan: [
        "Rencana ruang Kuliah, Ruang Kerja Dosen, Ruang Kantor/Administrasi, dan Perpustakaan",
        "3.3.1.1    Rencana ruang Kuliah (gunakan data Butir 3.3.1)",
        "3.3.1.2    Rencana ruang Kerja Dosen (gunakan data Butir 3.3.1)",
        "3.3.1.3    Rencana ruang Kerja Pegawai/Kantor dan Administrasi (gunakan data Butir 3.3.1)",
        "3.3.1.4    Luas total rencana ruang perpustakaan (m2) (gunakan data Butir 3.3.1)",
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
      note: "",
      keterangan: "Ruang belajar mandiri untuk mahasiswa",
      nilai: "",
      bobot: BobotEnumDoctor.CODE_3_3_2,
      showButton10: true,
    },
    {
      butir: "3.3.3",
      note: "",
      keterangan:
        "Ruang akademik khusus berupa laboratorium, studio, bengkel kerja,lahan praktik atau tempat praktik lainnya harus disediakan dengan luas ruang yang memenuhi syarat gerak dan spesifikasi aktivitas praktikum, bengkel dan studio, dan didasarkan pada efektivitas keberlangsungan proses pembelajaran untuk ketercapaian capaian pembelajaran praktikum/praktik/PPL.",
      nilai: "",
      bobot: BobotEnumDoctor.CODE_3_3_3,
      showButton11: true,
    },
    {
      butir: "3.3.4",
      note: "",
      keterangan:
        "Rancangan akses ke perpustakaan di luar PT atau sumber pustaka lainnya",
      nilai: "",
      bobot: BobotEnumDoctor.CODE_3_3_4,
      showButton16: true,
    },
    {
      butir: "3.4",
      note: "",
      keterangan:
        " Jumlah dan kualifikasi tenaga kependidikan: Jumlah minimal tenagakependidikan terdiri atas 2 (dua) orang tenaga kependidikan untuk setiap program studi dan 1 (satu) orang untuk melayani perpustakaan.Kualifikasi tenaga kependidikan minimal berijazah Diploma Tiga, berusia maksimum 56 tahun, dan bekerja penuh waktu 37,5 jam/minggu",
      nilai: "",
      bobot: BobotEnumDoctor.CODE_3_4,
      showButton17: true,
    },
  ]);

  // Form Penilaian Lapangan
  const [rows10, setRows10] = useState([
    {
      butir: "A",
      keterangan: "Surat Rekomendasi KOPERTAIS (BAGI PTKIS)",
      nilai2: "",
    },
    {
      butir: "B",
      keterangan:
        "Surat Persetujuan Tertulis Badan Penyelenggara tentang pembukuan prodi (Bagi PTKIS)",
      nilai2: "",
    },
    {
      butir: "C",
      keterangan:
        "Surat Pertimbangan Tertulis Senat perguruan tinggi tentang pembukaan prodi (BAGI PTKIN & PTKIS EKSISTING)",
      nilai2: "",
    },
    {
      butir: "D",
      keterangan:
        "Akreditasi Program Sarjana yang sebidang atau pendukung (BAGI PTKIS & PTKIN)",
      nilai2: "",
    },
    {
      butir: "E",
      keterangan: "Pakta integritas (BAGI PTKIS & PTKIN)",
      nilai2: "",
    },
    {
      butir: "*",
      keterangan: "Pemenuhan Persyaratan Administratif",
      nilai2: "",
    },
  ]);

  const [isAllAda1, setIsAllAda1] = useState(false);

  useEffect(() => {
    const updatedRows1 = [...rows1];
    updatedRows1.map((value) => {
      if (value.butir === "3.3.1") {
        value.nilai = calculateAverageTotalNilai(
          calculateTotalNilai(
            formData2.luasRuangPerMahasiswa,
            formData2.status2
          ),
          calculateTotalNilai3(
            formData3.luasRuangPerMahasiswa,
            formData3.status3
          ),
          calculateTotalNilai4(
            formData4.luasRuangPerMahasiswa,
            formData4.status4
          ),
          calculateTotalNilai5(formData9.ltrp)
        );
      } else if (value.butir === "2.2") {
        value.nilai = calculateFinalValue();
      }
    });
    setRows1(updatedRows1);
  }, [formData2, formData3, formData4, formData9]);

  // Logic calculate Pemenuhan Persyaratan Administratif kecukupan
  useEffect(() => {
    const allAda = rows.every((row) => row.nilai !== "Tidak Ada");
    setIsAllAda(allAda);
  }, [rows]);

  // Logic calculate Pemenuhan Persyaratan Administratif lapangan
  useEffect(() => {
    const hasTidakAda10 = rows10.some((row) => row.nilai2 === "Tidak Ada");
    setIsAllAda1(!hasTidakAda10);
  }, [rows10]);

  // Logic calculate Pemenuhan Persyaratan Administratif kecukupan
  const [isAllAda, setIsAllAda] = useState(false);
  useEffect(() => {
    const allAda = rows.every((row) => row.nilai !== "Tidak Ada");
    setIsAllAda(allAda);
  }, [rows]);
  useEffect(() => {
    const updatedRows = [...rows];
    if (data.statusSwasta === 0) {
      updatedRows[0].nilai = "Ada";
      updatedRows[1].nilai = "Ada";
    }
    setRows(updatedRows);
  }, [data.statusSwasta]);
  // handle input modal kecukupan
  const handleNoteChangeTable2 = (e, index) => {
    const newRows1 = [...rows1];
    newRows1[index].note = e.target.value;
    setRows1(newRows1);
  };
  const handleNChange = (e, field) => {
    let value = e.target.value;
    if (value.includes(",")) {
      // Jika iya, konversi koma menjadi titik
      value = value.replace(",", ".");
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };
  const handleNChange5 = (e, field) => {
    let value = e.target.value;
    if (value.includes(",")) {
      // Jika iya, konversi koma menjadi titik
      value = value.replace(",", ".");
    }
    setFormData5((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  // 2.2 kecukupan
  const calculateNK = () => {
    const { Na, Nb, Nc, f } = formData;
    const parsedNa = parseFloat(Na);
    const parsedNb = parseFloat(Nb);
    const parsedNc = parseFloat(Nc);
    const parsedF = parseFloat(f);
    if (parsedF === 0) {
      return 0;
    }
    const NK = (3 * parsedNa + 2 * parsedNb + parsedNc) / parsedF;
    return isNaN(NK) ? 0 : NK.toFixed(2);
  };
  const calculateFinalValue = () => {
    const NK = parseFloat(calculateNK());
    if (NK < 1) {
      return 0;
    } else if (NK >= 10) {
      return 4;
    } else {
      return (1 + 0.3 * NK).toFixed(2);
    }
  };
  // const calculateFinalValue = () => {
  //   const NK = parseFloat(calculateNK());
  //   if (NK < 1) {
  //     return '0';  // Mengubah nilai menjadi string
  //   } else if (NK >= 10) {
  //     return '4';  // Mengubah nilai menjadi string
  //   } else {
  //     const result = (1 + (0.3 * NK)).toFixed(2);
  //     return result.toString();  // Mengubah nilai menjadi string
  //   }
  // };
  useEffect(() => {
    if (data?.asesorProgramStudis?.questions?.form2?.[2]?.additionalFields) {
      const additionalFields =
        data.asesorProgramStudis.questions.form2[2].additionalFields;
      setFormData({
        Na: additionalFields.Na || "",
        Nb: additionalFields.Nb || "",
        Nc: additionalFields.Nc || "",
        f: additionalFields.f || "",
      });
    }
  }, [data]);

  // 2.2 lapangan
  const calculateNK1 = () => {
    const { Na5, Nb5, Nc5, f5 } = formData5;
    const parsedNa5 = parseFloat(Na5);
    const parsedNb5 = parseFloat(Nb5);
    const parsedNc5 = parseFloat(Nc5);
    const parsedF5 = parseFloat(f5);
    if (parsedF5 === 0) {
      return 0;
    }
    const NK5 = (3 * parsedNa5 + 2 * parsedNb5 + parsedNc5) / parsedF5;
    return isNaN(NK5) ? 0 : NK5.toFixed(2);
  };
  const calculateFinalValue1 = () => {
    const NK5 = parseFloat(calculateNK1());

    if (NK5 < 0) {
      return "Salah Isi";
    } else if (NK5 >= 10) {
      return 4;
    } else {
      return (1 + 0.3 * NK5).toFixed(2);
    }
  };
  useEffect(() => {
    if (data?.asesorProgramStudis?.questions?.form2?.[2]?.additionalFields) {
      const additionalFields =
        data.asesorProgramStudis.questions.form2[2].additionalFields;
      setFormData5({
        Na5: additionalFields.Na5 || "",
        Nb5: additionalFields.Nb5 || "",
        Nc5: additionalFields.Nc5 || "",
        f5: additionalFields.f5 || "",
      });
    }
  }, [data]);

  // 3.3.1 kecukupan
  useEffect(() => {
    // Mengisi formData2 dengan data dari database jika tersedia
    if (data?.asesorProgramStudis?.questions?.form2?.[2]?.additionalFields) {
      const additionalFields =
        data.asesorProgramStudis.questions.form2[2].additionalFields;
      setFormData2({
        ltrk2: additionalFields.ltrk2 || "",
        lt2: additionalFields.lt2 || "",
        luasRuangPerMahasiswa: calculateLuasRuangPerMahasiswa(
          additionalFields.ltrk2,
          additionalFields.lt2
        ),
        status2: additionalFields.status2 || "",
      });
    }
  }, [data]);
  useEffect(() => {
    // Mengisi formData2 dengan data dari database jika tersedia
    if (data?.asesorProgramStudis?.questions?.form2?.[2]?.additionalFields) {
      const additionalFields =
        data.asesorProgramStudis.questions.form2[2].additionalFields;
      setFormData3({
        ltrk3: additionalFields.ltrk3 || "",
        lt3: additionalFields.lt3 || "",
        luasRuangPerMahasiswa: calculateLuasRuangPerMahasiswa(
          additionalFields.ltrk3,
          additionalFields.lt3
        ),
        status3: additionalFields.status3 || "",
      });
    }
  }, [data]);
  useEffect(() => {
    // Mengisi formData2 dengan data dari database jika tersedia
    if (data?.asesorProgramStudis?.questions?.form2?.[2]?.additionalFields) {
      const additionalFields =
        data.asesorProgramStudis.questions.form2[2].additionalFields;
      setFormData4({
        ltrk4: additionalFields.ltrk4 || "",
        lt4: additionalFields.lt4 || "",
        luasRuangPerMahasiswa: calculateLuasRuangPerMahasiswa(
          additionalFields.ltrk4,
          additionalFields.lt4
        ),
        status4: additionalFields.status4 || "",
      });
    }
  }, [data]);
  useEffect(() => {
    // Mengisi formData2 dengan data dari database jika tersedia
    if (data?.asesorProgramStudis?.questions?.form2?.[2]?.additionalFields) {
      const additionalFields =
        data.asesorProgramStudis.questions.form2[2].additionalFields;
      setFormData9({
        ltrp: additionalFields.ltrp || "",
      });
    }
  }, [data]);
  const calculateLuasRuangPerMahasiswa = (ltrk2, lt2) => {
    const parsedLtrk2 = parseFloat(ltrk2);
    const parsedLt2 = parseFloat(lt2);

    if (parsedLt2 === 0) {
      return "Tidak dapat dihitung (lt2 = 0)";
    }

    const luasRuangPerMahasiswa = parsedLtrk2 / parsedLt2;
    return isNaN(luasRuangPerMahasiswa) ? 0 : luasRuangPerMahasiswa.toFixed(2);
  };
  const calculateLuasRuangPerMahasiswa3 = (ltrk3, lt3) => {
    const parsedLtrk3 = parseFloat(ltrk3);
    const parsedLt3 = parseFloat(lt3);

    if (parsedLt3 === 0) {
      return "Tidak dapat dihitung (lt3 = 0)";
    }

    const luasRuangPerMahasiswa = parsedLtrk3 / parsedLt3;
    return isNaN(luasRuangPerMahasiswa) ? 0 : luasRuangPerMahasiswa.toFixed(2);
  };
  const calculateLuasRuangPerMahasiswa4 = (ltrk4, lt4) => {
    const parsedLtrk4 = parseFloat(ltrk4);
    const parsedLt4 = parseFloat(lt4);

    if (parsedLt4 === 0) {
      return "Tidak dapat dihitung (lt3 = 0)";
    }

    const luasRuangPerMahasiswa = parsedLtrk4 / parsedLt4;
    return isNaN(luasRuangPerMahasiswa) ? 0 : luasRuangPerMahasiswa.toFixed(2);
  };

  // total nilai modal 3.3.1.1
  const calculateTotalNilai = (luasRuangPerMahasiswa, status2) => {
    // if (luasRuangPerMahasiswa.includes(',')) {
    //   // Jika iya, konversi koma menjadi titik
    //   luasRuangPerMahasiswa = luasRuangPerMahasiswa.replace(',', '.');
    // }
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
    // if (luasRuangPerMahasiswa.includes(',')) {
    //   // Jika iya, konversi koma menjadi titik
    //   luasRuangPerMahasiswa = luasRuangPerMahasiswa.replace(',', '.');
    // }
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

  const calculateTotalNilai4 = (luasRuangPerMahasiswa, status2) => {
    // if (luasRuangPerMahasiswa.includes(',')) {
    //   // Jika iya, konversi koma menjadi titik
    //   luasRuangPerMahasiswa = luasRuangPerMahasiswa.replace(',', '.');
    // }
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

  const calculateTotalNilai5 = (ltrp) => {
    // if (ltrp.includes(',')) {
    //   // Jika iya, konversi koma menjadi titik
    //   ltrp = ltrp.replace(',', '.');
    // }
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

  const calculateAverageTotalNilai = (
    totalNilai1,
    totalNilai2,
    totalNilai3,
    totalNilai4
  ) => {
    const average = (totalNilai1 + totalNilai2 + totalNilai3 + totalNilai4) / 4;
    return average.toFixed(2);
  };

  const handleNChange9 = (e, field) => {
    let value = e.target.value;
    if (value.includes(",")) {
      // Jika iya, konversi koma menjadi titik
      value = value.replace(",", ".");
    }
    setFormData9((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const handleNChange2 = (e, field) => {
    let value = e.target.value;
    if (value.includes(",")) {
      // Jika iya, konversi koma menjadi titik
      value = value.replace(",", ".");
    }
    setFormData2((prevFormData) => {
      const updatedFormData = {
        ...prevFormData,
        [field]: value,
      };

      if (field === "ltrk2" || field === "lt2") {
        const luasRuangPerMahasiswa = calculateLuasRuangPerMahasiswa(
          updatedFormData.ltrk2,
          updatedFormData.lt2
        );
        return {
          ...updatedFormData,
          luasRuangPerMahasiswa,
        };
      }
      return updatedFormData;
    });
  };
  const handleNChange3 = (e, field) => {
    let value = e.target.value;
    if (value.includes(",")) {
      // Jika iya, konversi koma menjadi titik
      value = value.replace(",", ".");
    }
    setFormData3((prevFormData) => {
      const updatedFormData = {
        ...prevFormData,
        [field]: value,
      };

      if (field === "ltrk3" || field === "lt3") {
        const luasRuangPerMahasiswa = calculateLuasRuangPerMahasiswa3(
          updatedFormData.ltrk3,
          updatedFormData.lt3
        );
        return {
          ...updatedFormData,
          luasRuangPerMahasiswa,
        };
      }
      return updatedFormData;
    });
  };
  const handleNChange4 = (e, field) => {
    let value = e.target.value;
    if (value.includes(",")) {
      // Jika iya, konversi koma menjadi titik
      value = value.replace(",", ".");
    }
    setFormData4((prevFormData) => {
      const updatedFormData = {
        ...prevFormData,
        [field]: value,
      };

      if (field === "ltrk4" || field === "lt4") {
        const luasRuangPerMahasiswa = calculateLuasRuangPerMahasiswa4(
          updatedFormData.ltrk4,
          updatedFormData.lt4
        );
        return {
          ...updatedFormData,
          luasRuangPerMahasiswa,
        };
      }
      return updatedFormData;
    });
  };

  // 3.3.1 lapangan
  useEffect(() => {
    // Mengisi formData2 dengan data dari database jika tersedia
    if (data?.asesorProgramStudis?.questions?.form2?.[6]?.additionalFields2) {
      const additionalFields2 =
        data.asesorProgramStudis.questions.form2[6].additionalFields2;
      setFormData6({
        ltrk6: additionalFields2.ltrk6 || "",
        lt6: additionalFields2.lt6 || "",
        luasRuangPerMahasiswa6: calculateLuasRuangPerMahasiswa6(
          additionalFields2.ltrk6,
          additionalFields2.lt6
        ),
        status6: additionalFields2.status6 || "",
      });
    }
  }, [data]);
  useEffect(() => {
    // Mengisi formData2 dengan data dari database jika tersedia
    if (data?.asesorProgramStudis?.questions?.form2?.[6]?.additionalFields2) {
      const additionalFields2 =
        data.asesorProgramStudis.questions.form2[6].additionalFields2;
      setFormData7({
        ltrk7: additionalFields2.ltrk7 || "",
        lt7: additionalFields2.lt7 || "",
        luasRuangPerMahasiswa7: calculateLuasRuangPerMahasiswa7(
          additionalFields2.ltrk7,
          additionalFields2.lt7
        ),
        status7: additionalFields2.status7 || "",
      });
    }
  }, [data]);
  useEffect(() => {
    // Mengisi formData2 dengan data dari database jika tersedia
    if (data?.asesorProgramStudis?.questions?.form2?.[6]?.additionalFields2) {
      const additionalFields2 =
        data.asesorProgramStudis.questions.form2[6].additionalFields2;
      setFormData8({
        ltrk8: additionalFields2.ltrk8 || "",
        lt8: additionalFields2.lt8 || "",
        luasRuangPerMahasiswa8: calculateLuasRuangPerMahasiswa8(
          additionalFields2.ltrk8,
          additionalFields2.lt8
        ),
        status8: additionalFields2.status8 || "",
      });
    }
  }, [data]);
  const calculateLuasRuangPerMahasiswa6 = (ltrk6, lt6) => {
    const parsedLtrk6 = parseFloat(ltrk6);
    const parsedLt6 = parseFloat(lt6);

    if (parsedLt6 === 0) {
      return "Tidak dapat dihitung (lt6 = 0)";
    }

    const luasRuangPerMahasiswa6 = parsedLtrk6 / parsedLt6;
    return isNaN(luasRuangPerMahasiswa6)
      ? 0
      : luasRuangPerMahasiswa6.toFixed(2);
  };
  const calculateLuasRuangPerMahasiswa7 = (ltrk7, lt7) => {
    const parsedLtrk7 = parseFloat(ltrk7);
    const parsedLt7 = parseFloat(lt7);

    if (parsedLt7 === 0) {
      return "Tidak dapat dihitung (lt7 = 0)";
    }

    const luasRuangPerMahasiswa7 = parsedLtrk7 / parsedLt7;
    return isNaN(luasRuangPerMahasiswa7)
      ? 0
      : luasRuangPerMahasiswa7.toFixed(2);
  };
  const calculateLuasRuangPerMahasiswa8 = (ltrk8, lt8) => {
    const parsedLtrk8 = parseFloat(ltrk8);
    const parsedLt8 = parseFloat(lt8);

    if (parsedLt8 === 0) {
      return "Tidak dapat dihitung (lt8 = 0)";
    }

    const luasRuangPerMahasiswa8 = parsedLtrk8 / parsedLt8;
    return isNaN(luasRuangPerMahasiswa8)
      ? 0
      : luasRuangPerMahasiswa8.toFixed(2);
  };
  const handleNChange6 = (e, field) => {
    let value = e.target.value;
    if (value.includes(",")) {
      // Jika iya, konversi koma menjadi titik
      value = value.replace(",", ".");
    }
    setFormData6((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));

    if (field === "ltrk6" || field === "lt6") {
      const luasRuangPerMahasiswa6 = calculateLuasRuangPerMahasiswa6(
        formData6.ltrk6,
        formData6.lt6
      );
      setFormData6((prevFormData) => ({
        ...prevFormData,
        luasRuangPerMahasiswa6,
      }));
    }
  };
  const handleNChange7 = (e, field) => {
    let value = e.target.value;
    if (value.includes(",")) {
      // Jika iya, konversi koma menjadi titik
      value = value.replace(",", ".");
    }
    setFormData7((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));

    if (field === "ltrk7" || field === "lt7") {
      const luasRuangPerMahasiswa7 = calculateLuasRuangPerMahasiswa7(
        formData7.ltrk7,
        formData7.lt7
      );
      setFormData7((prevFormData) => ({
        ...prevFormData,
        luasRuangPerMahasiswa7,
      }));
    }
  };
  const handleNChange8 = (e, field) => {
    let value = e.target.value;
    if (value.includes(",")) {
      // Jika iya, konversi koma menjadi titik
      value = value.replace(",", ".");
    }
    setFormData8((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));

    if (field === "ltrk8" || field === "lt8") {
      const luasRuangPerMahasiswa8 = calculateLuasRuangPerMahasiswa8(
        formData8.ltrk8,
        formData8.lt8
      );
      setFormData8((prevFormData) => ({
        ...prevFormData,
        luasRuangPerMahasiswa8,
      }));
    }
  };

  //Total Nilai (terboboti) yang diperoleh
  const [totalSum, setTotalSum] = useState(0);
  const [terbobotiValues, setTerbobotiValues] = useState([]);
  const [kurikulumStatus, setKurikulumStatus] = useState("");
  const [dosen, setDosen] = useState("");
  const [spmi, setSpmi] = useState("");
  const [finalStatus, setSimpulan] = useState("");
  const handleNilaiChangeTable2 = (e, index) => {
    let { value } = e.target;
    const finalValue = calculateFinalValue();
    const updatedRows1 = rows1.map((row, rowIndex) => {
      if (rowIndex == index) {
        return {
          ...row,
          nilai: value == finalValue ? finalValue : value,
        };
      }
      return row;
    });
    setRows1(updatedRows1);
  };

  const [isChecked, setIsChecked] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [reason, setReason] = useState("");
  const [checkedStates, setCheckedStates] = useState(rows1.map(() => false));

  // Step 2: Create the checkbox change handler
  const [buttonStates, setButtonStates] = useState(
    rows1.map(() => ({ sesuai: false, tidakSesuai: false }))
  );
  const handleSwitchChange = (index) => {
    const updatedButtonStates = [...buttonStates];
    updatedButtonStates[index] = !updatedButtonStates[index]; // Toggle the switch state

    setButtonStates(updatedButtonStates);

    // Show modal if the switch is turned off (Tidak Sesuai)
    if (!updatedButtonStates[index]) {
      setOpenModal(true);
    }
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleSaveReason = () => {
    // Here you can handle saving the reason
    console.log("Reason saved:", reason);
    setOpenModal(false);
  };
  // create PUT penilaian kecukupan
  const [isDraftMode, setIsDraftMode] = useState(false);
  // create PUT penilaian kecukupan
  const [asesorEvaluator, setAsesorEvaluator] = useState("");
  const [asesorPtAsal, setAsesorPtAsal] = useState("");
  const [asesorProdiAsal, setAsesorProdiAsal] = useState("");
  const [asesorProdiAkreditasi, setAsesorProdiAkreditasi] = useState("");
  const [isRecommended, setIsRecommended] = useState(false);
  const handleCheckboxChange = (event) => {
    const value = parseInt(event.target.value);
    setIsRecommended(value);
  };
  const handlePutRequest = async () => {
    setIsSubmitted(true);
    if (data && rows1) {
      const calculatedValues = rows1.map((row) => {
        const code = row.butir;
        const parsedNilai =
          parseFloat(row.nilai) ||
          (data?.asesorProgramStudis?.questions?.form2 &&
            parseFloat(
              data.asesorProgramStudis.questions.form2
                .find((item) => item.code === code)
                ?.nilai.replace(",", ".")
            )) ||
          parseFloat(row.nilai) ||
          (data?.asesorProgramStudis?.questions?.form2 &&
            data.asesorProgramStudis.questions.form2.find(
              (item) => item.code === "3.3.1"
            )?.nilai) ||
          calculateAverageTotalNilai(
            calculateTotalNilai(
              formData2.luasRuangPerMahasiswa,
              formData2.status2
            ),
            calculateTotalNilai3(
              formData3.luasRuangPerMahasiswa,
              formData3.status3
            ),
            calculateTotalNilai4(
              formData4.luasRuangPerMahasiswa,
              formData4.status4
            ),
            calculateTotalNilai5(formData9.ltrp)
          ) ||
          0;

        const parsedBobot = parseFloat(row.bobot.replace(",", "."));

        if (!isNaN(parsedNilai) && !isNaN(parsedBobot)) {
          const terboboti = parsedNilai * parsedBobot;
          return terboboti.toFixed(2);
        } else {
          return "-";
        }
      });
      const totalSum = rows1.reduce((sum, row) => {
        const code = row.butir;

        const parsedNilai =
          parseFloat(row.nilai) ||
          (data?.asesorProgramStudis?.questions?.form2 &&
            parseFloat(
              data.asesorProgramStudis.questions.form2
                .find((item) => item.code === code)
                ?.nilai.replace(",", ".")
            )) ||
          row.nilai ||
          (data?.asesorProgramStudis?.questions?.form2 &&
            data.asesorProgramStudis.questions.form2.find(
              (item) => item.code === "3.3.1"
            )?.nilai) ||
          calculateAverageTotalNilai(
            calculateTotalNilai(
              formData2.luasRuangPerMahasiswa,
              formData2.status2
            ),
            calculateTotalNilai3(
              formData3.luasRuangPerMahasiswa,
              formData3.status3
            ),
            calculateTotalNilai4(
              formData4.luasRuangPerMahasiswa,
              formData4.status4
            ),
            calculateTotalNilai5(formData5.ltrp)
          ) ||
          0;

        const parsedBobot = parseFloat(row.bobot.replace(",", "."));
        if (!isNaN(parsedNilai) && !isNaN(parsedBobot)) {
          const terboboti = parsedNilai * parsedBobot;
          return sum + terboboti;
        } else {
          return sum;
        }
      }, 0);

      const kurikulumStatus = rows1.map((row) => {
        if (row.butir === "1.1") {
          const code = row.butir;
          const form2Question =
            data?.asesorProgramStudis?.questions?.form2?.find(
              (item) => item.code === code
            );
          const nilai1_1 = form2Question
            ? parseFloat(form2Question.nilai.replace(",", "."))
            : null;
          if (nilai1_1 < 3) {
            return "TIDAK MEMENUHI";
          } else if (nilai1_1 <= 4) {
            return "MEMENUHI";
          } else {
            return "Belum isi";
          }
        }
        return "";
      });

      const dosen = rows1.map((row) => {
        if (row.butir === "2.1") {
          const code = row.butir;
          const form2Question =
            data?.asesorProgramStudis?.questions?.form2?.find(
              (item) => item.code === code
            );
          const nilai2_1 = form2Question
            ? parseFloat(form2Question.nilai.replace(",", "."))
            : null;
          if (nilai2_1 < 3) {
            return "TIDAK MEMENUHI";
          } else if (nilai2_1 <= 4) {
            return "MEMENUHI";
          } else {
            return "Belum isi";
          }
        }
        return "";
      });

      const spmi = rows1.map((row) => {
        if (row.butir === "3.2") {
          const code = row.butir;
          const form2Question =
            data?.asesorProgramStudis?.questions?.form2?.find(
              (item) => item.code === code
            );
          const nilai3_2 = form2Question
            ? parseFloat(form2Question.nilai.replace(",", "."))
            : null;
          if (nilai3_2 < 3) {
            return "TIDAK MEMENUHI";
          } else if (nilai3_2 <= 4) {
            return "MEMENUHI";
          } else {
            return "Belum isi";
          }
        }
        return "";
      });

      const simpulan = () => {
        if (
          totalSum >= 200 &&
          kurikulumStatus.every((status) => status === "MEMENUHI") &&
          dosen.every((status) => status === "MEMENUHI") &&
          spmi.every((status) => status === "MEMENUHI")
        ) {
          return "MEMENUHI";
        } else {
          return "TIDAK MEMENUHI";
        }
      };
      const simpulanStatus = simpulan();
      setTerbobotiValues(calculatedValues);
      setTotalSum(totalSum);
      setKurikulumStatus(kurikulumStatus);
      setDosen(dosen);
      setSpmi(spmi);
      setSimpulan(simpulanStatus);
    }
    try {
      const id = parseInt(getUserId());
      const programStudiId = parseInt(localStorage.getItem("programStudiId"));
      const formattedDate = selectedDate
        ? new Date(selectedDate).toISOString()
        : "";

      const formPenilaian = {
        asesorId: id,
        programStudiId: programStudiId,
        needAssessmentAtLocation: 1,
        status: 23,
        assesmentAcceptedTime: new Date(),
        questions: {
          form1: rows.map((row) => ({
            code: row.butir,
            question: typeof row.keterangan === "string" ? row.keterangan : "",
            nilai: row.nilai,
            note: row.note,
          })),
          form2: rows1.map((row) => ({
            code: row.butir,
            question: typeof row.keterangan === "string" ? row.keterangan : "",
            nilai: "" + row.nilai.toString().replace(",", "."),
            note: row.note,
            additionalFields: {
              Na: formData.Na,
              Nb: formData.Nb,
              Nc: formData.Nc,
              f: formData.f,
              ltrk2: formData2.ltrk2,
              lt2: formData2.lt2,
              lrkpm2: formData2.luasRuangPerMahasiswa,
              status2: formData2.status2,
              ltrk3: formData3.ltrk3,
              lt3: formData3.lt3,
              lrkpm3: formData3.luasRuangPerMahasiswa,
              status3: formData3.status3,
              ltrk4: formData4.ltrk4,
              lt4: formData4.lt4,
              lrkpm4: formData4.luasRuangPerMahasiswa,
              status4: formData4.status4,
              ltrp: formData9.ltrp,
            },
          })),
        },
        asesorEvaluator:
          typeof asesorEvaluator === "string" ? asesorEvaluator : "",
        asesorPtAsal: typeof asesorPtAsal === "string" ? asesorPtAsal : "",
        asesorProdiAsal:
          typeof asesorProdiAsal === "string" ? asesorProdiAsal : "",
        asesorProdiAkreditasi:
          typeof asesorProdiAkreditasi === "string"
            ? asesorProdiAkreditasi
            : "",
        komentar: typeof coment === "string" ? coment : "",
        totalNilai: totalSum,
        rekomendasi: isRecommended,
      };

      const form2NilaiIsInvalid = formPenilaian.questions.form2.some((row) => {
        const parsedNilai = parseFloat(row.nilai.replace(",", "."));

        if (isNaN(parsedNilai)) {
          // Jika nilai tidak dapat dipars, tampilkan pesan kesalahan dan kembalikan true
          throw new Error("Nilai tidak boleh kosong. Harap periksa kembali.");
        }

        if (parsedNilai > 4) {
          // Jika nilai lebih dari 4, tampilkan pesan kesalahan dan kembalikan true
          throw new Error(
            "Nilai tidak boleh lebih dari 4. Harap periksa kembali."
          );
        }

        // Nilai valid, kembalikan false
        return false;
      });

      formPenilaian.questions.form1 = formPenilaian.questions.form1.map(
        (row) => {
          if (row.code === "*") {
            return {
              ...row,
              nilai: isAllAda ? "MEMENUHI" : "TIDAK MEMENUHI",
            };
          }
          return row;
        }
      );

      if (selectedValue === "iya") {
        formPenilaian.needAssessmentAtLocation = 1;
        formPenilaian.assessmentAtLocationStartTime = formattedDate;
      } else {
        formPenilaian.needAssessmentAtLocation = 0;
      }
      setTotalSum(totalSum);
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

      if (response && response.data) {
        setTotalSum(totalSum);
        const updatedRows1 = rows1.map((row) => {
          if (row.butir === "2.2") {
            return {
              ...row,
              nilai: calculateFinalValue(),
            };
          }
          return row;
        });
        setRows1(updatedRows1);
        if (response.data.status === 200) {
          setTotalSum(totalSum);
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
        } else if (response.data.status === 400) {
          Swal.fire({
            icon: "error",
            title: "Gagal",
            text: response.data.message,
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error sending PUT request: Response or data is undefined.",
        });
      }
    } catch (error) {
      if (error.response && error.response.data) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `${error.message}`,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `${error.message}`,
        });
      }
    }
    getData();
    setIsSubmitted(false);
  };
  const handlePutRequest1 = async () => {
    setIsSubmitted(true);
    if (data && rows1) {
      const calculatedValues = rows1.map((row) => {
        const code = row.butir;
        const parsedNilai =
          parseFloat(row.nilai) ||
          (data?.asesorProgramStudis?.questions?.form2 &&
            parseFloat(
              data.asesorProgramStudis.questions.form2
                .find((item) => item.code === code)
                ?.nilai.replace(",", ".")
            )) ||
          parseFloat(row.nilai) ||
          (data?.asesorProgramStudis?.questions?.form2 &&
            data.asesorProgramStudis.questions.form2.find(
              (item) => item.code === "3.3.1"
            )?.nilai) ||
          calculateAverageTotalNilai(
            calculateTotalNilai(
              formData2.luasRuangPerMahasiswa,
              formData2.status2
            ),
            calculateTotalNilai3(
              formData3.luasRuangPerMahasiswa,
              formData3.status3
            ),
            calculateTotalNilai4(
              formData4.luasRuangPerMahasiswa,
              formData4.status4
            ),
            calculateTotalNilai5(formData9.ltrp)
          ) ||
          0;

        const parsedBobot = parseFloat(row.bobot.replace(",", "."));

        if (!isNaN(parsedNilai) && !isNaN(parsedBobot)) {
          const terboboti = parsedNilai * parsedBobot;
          return terboboti.toFixed(2);
        } else {
          return "-";
        }
      });
      const totalSum = rows1.reduce((sum, row) => {
        const code = row.butir;

        const parsedNilai =
          parseFloat(row.nilai) ||
          (data?.asesorProgramStudis?.questions?.form2 &&
            parseFloat(
              data.asesorProgramStudis.questions.form2
                .find((item) => item.code === code)
                ?.nilai.replace(",", ".")
            )) ||
          row.nilai ||
          (data?.asesorProgramStudis?.questions?.form2 &&
            data.asesorProgramStudis.questions.form2.find(
              (item) => item.code === "3.3.1"
            )?.nilai) ||
          calculateAverageTotalNilai(
            calculateTotalNilai(
              formData2.luasRuangPerMahasiswa,
              formData2.status2
            ),
            calculateTotalNilai3(
              formData3.luasRuangPerMahasiswa,
              formData3.status3
            ),
            calculateTotalNilai4(
              formData4.luasRuangPerMahasiswa,
              formData4.status4
            ),
            calculateTotalNilai5(formData5.ltrp)
          ) ||
          0;

        const parsedBobot = parseFloat(row.bobot.replace(",", "."));
        if (!isNaN(parsedNilai) && !isNaN(parsedBobot)) {
          const terboboti = parsedNilai * parsedBobot;
          return sum + terboboti;
        } else {
          return sum;
        }
      }, 0);

      const kurikulumStatus = rows1.map((row) => {
        if (row.butir === "1.1") {
          const code = row.butir;
          const form2Question =
            data?.asesorProgramStudis?.questions?.form2?.find(
              (item) => item.code === code
            );
          const nilai1_1 = form2Question
            ? parseFloat(form2Question.nilai.replace(",", "."))
            : null;
          if (nilai1_1 < 3) {
            return "TIDAK MEMENUHI";
          } else if (nilai1_1 <= 4) {
            return "MEMENUHI";
          } else {
            return "Belum isi";
          }
        }
        return "";
      });

      const dosen = rows1.map((row) => {
        if (row.butir === "2.1") {
          const code = row.butir;
          const form2Question =
            data?.asesorProgramStudis?.questions?.form2?.find(
              (item) => item.code === code
            );
          const nilai2_1 = form2Question
            ? parseFloat(form2Question.nilai.replace(",", "."))
            : null;
          if (nilai2_1 < 3) {
            return "TIDAK MEMENUHI";
          } else if (nilai2_1 <= 4) {
            return "MEMENUHI";
          } else {
            return "Belum isi";
          }
        }
        return "";
      });

      const spmi = rows1.map((row) => {
        if (row.butir === "3.2") {
          const code = row.butir;
          const form2Question =
            data?.asesorProgramStudis?.questions?.form2?.find(
              (item) => item.code === code
            );
          const nilai3_2 = form2Question
            ? parseFloat(form2Question.nilai.replace(",", "."))
            : null;
          if (nilai3_2 < 3) {
            return "TIDAK MEMENUHI";
          } else if (nilai3_2 <= 4) {
            return "MEMENUHI";
          } else {
            return "Belum isi";
          }
        }
        return "";
      });

      const simpulan = () => {
        if (
          totalSum >= 200 &&
          kurikulumStatus.every((status) => status === "MEMENUHI") &&
          dosen.every((status) => status === "MEMENUHI") &&
          spmi.every((status) => status === "MEMENUHI")
        ) {
          return "MEMENUHI";
        } else {
          return "TIDAK MEMENUHI";
        }
      };
      const simpulanStatus = simpulan();
      setTerbobotiValues(calculatedValues);
      setTotalSum(totalSum);
      setKurikulumStatus(kurikulumStatus);
      setDosen(dosen);
      setSpmi(spmi);
      setSimpulan(simpulanStatus);
    }
    try {
      const id = parseInt(getUserId());
      const programStudiId = parseInt(localStorage.getItem("programStudiId"));
      const formattedDate = selectedDate
        ? new Date(selectedDate).toISOString()
        : "";

      const formPenilaian = {
        asesorId: id,
        programStudiId: programStudiId,
        needAssessmentAtLocation: 1,
        status: 21,
        assesmentAcceptedTime: new Date(),
        questions: {
          form1: rows.map((row) => ({
            code: row.butir,
            question: typeof row.keterangan === "string" ? row.keterangan : "",
            nilai: row.nilai,
            note: row.note,
          })),
          form2: rows1.map((row) => ({
            code: row.butir,
            question: typeof row.keterangan === "string" ? row.keterangan : "",
            nilai: "" + row.nilai.toString().replace(",", "."),
            note: row.note,
            additionalFields: {
              Na: formData.Na,
              Nb: formData.Nb,
              Nc: formData.Nc,
              f: formData.f,
              ltrk2: formData2.ltrk2,
              lt2: formData2.lt2,
              lrkpm2: "" + formData2.luasRuangPerMahasiswa,
              status2: formData2.status2,
              ltrk3: formData3.ltrk3,
              lt3: formData3.lt3,
              lrkpm3: "" + formData3.luasRuangPerMahasiswa,
              status3: formData3.status3,
              ltrk4: formData4.ltrk4,
              lt4: formData4.lt4,
              lrkpm4: "" + formData4.luasRuangPerMahasiswa,
              status4: formData4.status4,
              ltrp: formData9.ltrp,
            },
          })),
        },
        asesorEvaluator:
          typeof asesorEvaluator === "string" ? asesorEvaluator : "",
        asesorPtAsal: typeof asesorPtAsal === "string" ? asesorPtAsal : "",
        asesorProdiAsal:
          typeof asesorProdiAsal === "string" ? asesorProdiAsal : "",
        asesorProdiAkreditasi:
          typeof asesorProdiAkreditasi === "string"
            ? asesorProdiAkreditasi
            : "",
        komentar: typeof coment === "string" ? coment : "",
        totalNilai: totalSum,
        rekomendasi: isRecommended,
      };
      formPenilaian.questions.form1 = formPenilaian.questions.form1.map(
        (row) => {
          if (row.code === "*") {
            return {
              ...row,
              nilai: isAllAda ? "MEMENUHI" : "TIDAK MEMENUHI",
            };
          }
          return row;
        }
      );

      if (selectedValue === "iya") {
        formPenilaian.needAssessmentAtLocation = 1;
        formPenilaian.assessmentAtLocationStartTime = formattedDate;
      } else {
        formPenilaian.needAssessmentAtLocation = 0;
      }
      setTotalSum(totalSum);
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

      if (response && response.data) {
        setTotalSum(totalSum);
        const updatedRows1 = rows1.map((row) => {
          if (row.butir === "2.2") {
            return {
              ...row,
              nilai: calculateFinalValue(),
            };
          }
          return row;
        });
        setRows1(updatedRows1);
        if (response.data.status === 200) {
          setTotalSum(totalSum);
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
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error sending PUT request: Response or data is undefined.",
        });
      }
    } catch (error) {
      if (error.response && error.response.data) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `${error.message}`,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `${error.message}`,
        });
      }
    }
    setIsSubmitted(false);
  };
  function handleKeyPress(e) {
    const inputValue = e.key;
    if (isNaN(inputValue)) {
      alert("Masukkan hanya angka.");
      e.preventDefault();
      return;
    }

    if (parseFloat(inputValue) === 1) {
      alert("Nilai tidak boleh sama dengan 1.");
      e.preventDefault();
      return;
    }
  }
  const { darkMode } = useDarkMode();
  return (
    <div className="mx-4" style={{ color: darkMode ? "white" : "" }}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
       
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
              <p>{isSubmitted ? "-" : data.noReg}</p>
            </div>

            <div className="col-sm-12 col-md-3">
              <p>Nama Perguruan Tinggi:</p>
            </div>
            <div className="col-sm-12 col-md-9 mb-4">
              <p>{isSubmitted ? "-" : data.lembaga}</p>
            </div>

            <div className="col-sm-12 col-md-3">
              <p>Program Studi:</p>
            </div>
            <div className="col-sm-12 col-md-9 mb-4">
              <p>{isSubmitted ? "-" : data.namaProdi}</p>
            </div>

            <div className="col-sm-12 col-md-3">
              <p>Program :</p>
            </div>
            <div className="col-sm-12 col-md-9 mb-4">
              <p>{isSubmitted ? "-" : data.jenjangStr}</p>
            </div>

            <div className="col-sm-12 col-md-3">
              <p>Tanggal Penilaian:</p>
            </div>
            <div className="col-sm-12 col-md-9">
              <p>
                {isSubmitted
                  ? "-"
                  : data.asesorProgramStudis?.assesmentAcceptedTime
                  ? new Date(
                      data.asesorProgramStudis.assesmentAcceptedTime
                    ).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : new Date().toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
              </p>
            </div>
          </div>
          <h4 className="mt-3">Data Evaluator</h4>
          <div className="row mt-4" style={{ lineHeight: "5px" }}>
            <div className="col-sm-12 col-md-12 mb-4">
              <p>
                Evaluator A, Evaluator B dan Evaluator C (PENILAIAN LAPANGAN):
              </p>
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
                  label="Form Penilaian AK"
                  value="one"
                  sx={{
                    color: view === "one" ? "#0F56B3" : "#1C1C1C",
                  }}
                />
                <Tab
                  label="Ringkasan Penilaian Lapangan"
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
                    {/* Nilai */}
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell
                            style={{
                              backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                              border: "none",
                              color: darkMode ? "white" : "",
                            }}
                          >
                            Butir
                          </TableCell>
                          <TableCell
                            style={{
                              backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                              border: "none",
                              color: darkMode ? "white" : "",
                              width: "60%",
                            }}
                            align="center"
                          >
                            Keterangan
                          </TableCell>
                          <TableCell
                            style={{
                              backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                              border: "none",
                              color: darkMode ? "white" : "",
                              width: "10px",
                            }}
                          >
                            Bobot
                          </TableCell>
                          <TableCell
                            style={{
                              backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                              border: "none",
                              color: darkMode ? "white" : "",
                            }}
                          >
                            Nilai Evaluator AK A
                          </TableCell>
                          <TableCell
                            style={{
                              backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                              border: "none",
                              color: darkMode ? "white" : "",
                            }}
                          >
                            Nilai Evaluator AK B
                          </TableCell>
                          <TableCell
                            style={{
                              backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                              border: "none",
                              color: darkMode ? "white" : "",
                            }}
                            className="text-center"
                          >
                            Aksi Validator
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows1.map((row, index) => (
                          <TableRow
                            style={{
                              backgroundColor: darkMode ? "#40679E" : "",
                              color: darkMode ? "white" : "",
                            }}
                            key={index}
                          >
                            <TableCell
                              style={{ color: darkMode ? "white" : "" }}
                              scope="row"
                            >
                              {row.butir}
                            </TableCell>
                            <TableCell
                              style={{
                                color: darkMode ? "white" : "",
                                width: "40%",
                              }}
                            >
                              {row.keterangan}
                            </TableCell>
                            <TableCell
                              style={{
                                color: darkMode ? "white" : "",
                                width: "10px",
                              }}
                              className="text-center"
                            >
                              {row.bobot}
                            </TableCell>
                            <TableCell
                              style={{ color: darkMode ? "white" : "" }}
                            >
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
                                        const allowedCharacters = /^[0-9,.]+$/;

                                        if (
                                          !allowedCharacters.test(e.key) &&
                                          e.key.length === 1
                                        ) {
                                          e.preventDefault();
                                        }
                                      }}
                                      value={row.nilai}
                                      onChange={(e) =>
                                        handleNilaiChangeTable2(e, index)
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
                                      onKeyDown={(e) => {
                                        const allowedCharacters = /^[0-9,.]+$/;

                                        if (
                                          !allowedCharacters.test(e.key) &&
                                          e.key.length === 1
                                        ) {
                                          e.preventDefault();
                                        }
                                      }}
                                      value={row.nilai}
                                      onChange={(e) =>
                                        handleNilaiChangeTable2(e, index)
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
                                      onKeyDown={(e) => {
                                        const allowedCharacters = /^[0-9,.]+$/;

                                        if (
                                          !allowedCharacters.test(e.key) &&
                                          e.key.length === 1
                                        ) {
                                          e.preventDefault();
                                        }
                                      }}
                                      value={row.nilai}
                                      onChange={(e) =>
                                        handleNilaiChangeTable2(e, index)
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
                                      onKeyDown={(e) => {
                                        const allowedCharacters = /^[0-9,.]+$/;

                                        if (
                                          !allowedCharacters.test(e.key) &&
                                          e.key.length === 1
                                        ) {
                                          e.preventDefault();
                                        }
                                      }}
                                      value={row.nilai}
                                      onChange={(e) =>
                                        handleNilaiChangeTable2(e, index)
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
                                      onKeyDown={(e) => {
                                        const allowedCharacters = /^[0-9,.]+$/;

                                        if (
                                          !allowedCharacters.test(e.key) &&
                                          e.key.length === 1
                                        ) {
                                          e.preventDefault();
                                        }
                                      }}
                                      value={row.nilai}
                                      onChange={(e) =>
                                        handleNilaiChangeTable2(e, index)
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
                                      onClick={() => handleOpen6(index)}
                                      className="text-center fw-bold me-3 mt-1"
                                    >
                                      !
                                    </button>
                                    <input
                                      onKeyDown={(e) => {
                                        const allowedCharacters = /^[0-9,.]+$/;

                                        if (
                                          !allowedCharacters.test(e.key) &&
                                          e.key.length === 1
                                        ) {
                                          e.preventDefault();
                                        }
                                      }}
                                      value={row.nilai}
                                      onChange={(e) =>
                                        handleNilaiChangeTable2(e, index)
                                      }
                                      className="form-control"
                                      type="text"
                                    />
                                  </>
                                )}
                                {row.showButton7 && (
                                  <>
                                    <button
                                      onClick={() => handleOpen7(index)}
                                      className="text-center btn btn-success rounded-5 fw-bold me-2 mt-1"
                                    >
                                      <EditNotificationsIcon />
                                    </button>

                                    <div>
                                      <input
                                        value={
                                          calculateFinalValue() ||
                                          rows1[index].nilai
                                        }
                                        className="form-control"
                                        type="text"
                                        disabled
                                      />
                                    </div>
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
                                      onClick={() => handleOpen8(index)}
                                      className="text-center fw-bold me-3 mt-1"
                                    >
                                      !
                                    </button>
                                    <input
                                      onKeyDown={(e) => {
                                        const allowedCharacters = /^[0-9,.]+$/;

                                        if (
                                          !allowedCharacters.test(e.key) &&
                                          e.key.length === 1
                                        ) {
                                          e.preventDefault();
                                        }
                                      }}
                                      value={row.nilai}
                                      onChange={(e) =>
                                        handleNilaiChangeTable2(e, index)
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
                                      onClick={() => handleOpen9(index)}
                                      className="text-center fw-bold me-3 mt-1"
                                    >
                                      !
                                    </button>
                                    <input
                                      onKeyDown={(e) => {
                                        const allowedCharacters = /^[0-9,.]+$/;

                                        if (
                                          !allowedCharacters.test(e.key) &&
                                          e.key.length === 1
                                        ) {
                                          e.preventDefault();
                                        }
                                      }}
                                      value={row.nilai}
                                      onChange={(e) =>
                                        handleNilaiChangeTable2(e, index)
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
                                      onClick={() => handleOpen10(index)}
                                      className="text-center fw-bold me-3 mt-1"
                                    >
                                      !
                                    </button>
                                    <input
                                      onKeyDown={(e) => {
                                        const allowedCharacters = /^[0-9,.]+$/;

                                        if (
                                          !allowedCharacters.test(e.key) &&
                                          e.key.length === 1
                                        ) {
                                          e.preventDefault();
                                        }
                                      }}
                                      value={row.nilai}
                                      onChange={(e) =>
                                        handleNilaiChangeTable2(e, index)
                                      }
                                      className="form-control"
                                      type="text"
                                    />
                                  </>
                                )}
                                {row.showButton311 && (
                                  <div>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={
                                        row.nilai ||
                                        (data?.asesorProgramStudis?.questions
                                          ?.form2 &&
                                          data.asesorProgramStudis.questions.form2.find(
                                            (item) => item.code === "3.3.1"
                                          )?.nilai) ||
                                        calculateAverageTotalNilai(
                                          calculateTotalNilai(
                                            formData2.luasRuangPerMahasiswa,
                                            formData2.status2
                                          ),
                                          calculateTotalNilai3(
                                            formData3.luasRuangPerMahasiswa,
                                            formData3.status3
                                          ),
                                          calculateTotalNilai4(
                                            formData4.luasRuangPerMahasiswa,
                                            formData4.status4
                                          ),
                                          calculateTotalNilai5(formData9.ltrp)
                                        )
                                      }
                                      disabled
                                    />
                                    <div className="d-flex">
                                      <button
                                        onClick={() => handleOpen12(index)}
                                        className="text-center btn btn-success rounded-5 fw-bold me-3 mt-3 mb-2"
                                      >
                                        <EditNotificationsIcon />
                                      </button>
                                      <input
                                        type="text"
                                        className="form-control mt-2"
                                        value={calculateTotalNilai(
                                          formData2.luasRuangPerMahasiswa,
                                          formData2.status2
                                        )}
                                        disabled
                                      />
                                    </div>

                                    <br />
                                    <div className="d-flex">
                                      <button
                                        onClick={() => handleOpen13(index)}
                                        className="text-center btn btn-success rounded-5 fw-bold me-3 "
                                      >
                                        <EditNotificationsIcon />
                                      </button>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={calculateTotalNilai3(
                                          formData3.luasRuangPerMahasiswa,
                                          formData3.status3
                                        )}
                                        disabled
                                      />
                                    </div>

                                    <br />
                                    <div className="d-flex">
                                      <button
                                        onClick={() => handleOpen14(index)}
                                        className="text-center btn btn-success rounded-5 fw-bold me-3 "
                                      >
                                        <EditNotificationsIcon />
                                      </button>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={calculateTotalNilai4(
                                          formData4.luasRuangPerMahasiswa,
                                          formData4.status4
                                        )}
                                        disabled
                                      />
                                    </div>

                                    <div className="d-flex">
                                      <button
                                        onClick={() => handleOpen3314(index)}
                                        className="text-center btn btn-success rounded-5 fw-bold me-3 mt-2 mb-2"
                                      >
                                        <EditNotificationsIcon />
                                      </button>
                                      <input
                                        type="text"
                                        className="form-control mt-2"
                                        value={
                                          calculateTotalNilai5(
                                            formData9.ltrp
                                          ) || 0
                                        }
                                        disabled
                                      />
                                    </div>
                                    <span
                                      style={{
                                        fontSize: "12px",
                                        color: "green",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      klik icon untuk isi nilai
                                    </span>
                                    {isNaN(
                                      calculateAverageTotalNilai(
                                        calculateTotalNilai(
                                          formData2.luasRuangPerMahasiswa,
                                          formData2.status2
                                        ),
                                        calculateTotalNilai3(
                                          formData3.luasRuangPerMahasiswa,
                                          formData3.status3
                                        ),
                                        calculateTotalNilai4(
                                          formData4.luasRuangPerMahasiswa,
                                          formData4.status4
                                        ),
                                        calculateTotalNilai5(formData9.ltrp)
                                      )
                                    ) && (
                                      <p
                                        className="mt-2 text-center"
                                        style={{
                                          color: "red",
                                          fontStyle: "italic",
                                        }}
                                      ></p>
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
                                      onClick={() => handleOpen11(index)}
                                      className="text-center fw-bold me-3 mt-1"
                                    >
                                      !
                                    </button>
                                    <input
                                      onKeyDown={(e) => {
                                        const allowedCharacters = /^[0-9,.]+$/;

                                        if (
                                          !allowedCharacters.test(e.key) &&
                                          e.key.length === 1
                                        ) {
                                          e.preventDefault();
                                        }
                                      }}
                                      value={row.nilai}
                                      onChange={(e) =>
                                        handleNilaiChangeTable2(e, index)
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
                                      onClick={() => handleOpen15(index)}
                                      className="text-center fw-bold me-3 mt-1"
                                    >
                                      !
                                    </button>
                                    <input
                                      onKeyDown={(e) => {
                                        const allowedCharacters = /^[0-9,.]+$/;

                                        if (
                                          !allowedCharacters.test(e.key) &&
                                          e.key.length === 1
                                        ) {
                                          e.preventDefault();
                                        }
                                      }}
                                      value={row.nilai}
                                      onChange={(e) =>
                                        handleNilaiChangeTable2(e, index)
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
                                      onClick={() => handleOpen16(index)}
                                      className="text-center fw-bold me-3 mt-1"
                                    >
                                      !
                                    </button>
                                    <input
                                      onKeyDown={(e) => {
                                        const allowedCharacters = /^[0-9,.]+$/;

                                        if (
                                          !allowedCharacters.test(e.key) &&
                                          e.key.length === 1
                                        ) {
                                          e.preventDefault();
                                        }
                                      }}
                                      value={row.nilai}
                                      onChange={(e) =>
                                        handleNilaiChangeTable2(e, index)
                                      }
                                      className="form-control"
                                      type="text"
                                    />
                                  </>
                                )}
                                {row.showButton17 && (
                                  <>
                                    <button
                                      style={{
                                        width: "20px",
                                        height: "20px",
                                        borderRadius: "50%",
                                        backgroundColor: "blue",
                                        color: "white",
                                      }}
                                      onClick={() => handleOpen17(index)}
                                      className="text-center fw-bold me-3 mt-1"
                                    >
                                      !
                                    </button>
                                    <input
                                      onKeyDown={(e) => {
                                        const allowedCharacters = /^[0-9,.]+$/;

                                        if (
                                          !allowedCharacters.test(e.key) &&
                                          e.key.length === 1
                                        ) {
                                          e.preventDefault();
                                        }
                                      }}
                                      value={row.nilai}
                                      onKeyPress={(e) => handleKeyPress(e)}
                                      onChange={(e) =>
                                        handleNilaiChangeTable2(e, index)
                                      }
                                      className="form-control"
                                      type="text"
                                    />
                                  </>
                                )}
                              </div>
                            </TableCell>
                            <TableCell
                              style={{ color: darkMode ? "white" : "" }}
                            >
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
                                        const allowedCharacters = /^[0-9,.]+$/;

                                        if (
                                          !allowedCharacters.test(e.key) &&
                                          e.key.length === 1
                                        ) {
                                          e.preventDefault();
                                        }
                                      }}
                                      value={row.nilai}
                                      onChange={(e) =>
                                        handleNilaiChangeTable2(e, index)
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
                                      onKeyDown={(e) => {
                                        const allowedCharacters = /^[0-9,.]+$/;

                                        if (
                                          !allowedCharacters.test(e.key) &&
                                          e.key.length === 1
                                        ) {
                                          e.preventDefault();
                                        }
                                      }}
                                      value={row.nilai}
                                      onChange={(e) =>
                                        handleNilaiChangeTable2(e, index)
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
                                      onKeyDown={(e) => {
                                        const allowedCharacters = /^[0-9,.]+$/;

                                        if (
                                          !allowedCharacters.test(e.key) &&
                                          e.key.length === 1
                                        ) {
                                          e.preventDefault();
                                        }
                                      }}
                                      value={row.nilai}
                                      onChange={(e) =>
                                        handleNilaiChangeTable2(e, index)
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
                                      onKeyDown={(e) => {
                                        const allowedCharacters = /^[0-9,.]+$/;

                                        if (
                                          !allowedCharacters.test(e.key) &&
                                          e.key.length === 1
                                        ) {
                                          e.preventDefault();
                                        }
                                      }}
                                      value={row.nilai}
                                      onChange={(e) =>
                                        handleNilaiChangeTable2(e, index)
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
                                      onKeyDown={(e) => {
                                        const allowedCharacters = /^[0-9,.]+$/;

                                        if (
                                          !allowedCharacters.test(e.key) &&
                                          e.key.length === 1
                                        ) {
                                          e.preventDefault();
                                        }
                                      }}
                                      value={row.nilai}
                                      onChange={(e) =>
                                        handleNilaiChangeTable2(e, index)
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
                                      onClick={() => handleOpen6(index)}
                                      className="text-center fw-bold me-3 mt-1"
                                    >
                                      !
                                    </button>
                                    <input
                                      onKeyDown={(e) => {
                                        const allowedCharacters = /^[0-9,.]+$/;

                                        if (
                                          !allowedCharacters.test(e.key) &&
                                          e.key.length === 1
                                        ) {
                                          e.preventDefault();
                                        }
                                      }}
                                      value={row.nilai}
                                      onChange={(e) =>
                                        handleNilaiChangeTable2(e, index)
                                      }
                                      className="form-control"
                                      type="text"
                                    />
                                  </>
                                )}
                                {row.showButton7 && (
                                  <>
                                    <button
                                      onClick={() => handleOpen7(index)}
                                      className="text-center btn btn-success rounded-5 fw-bold me-2 mt-1"
                                    >
                                      <EditNotificationsIcon />
                                    </button>

                                    <div>
                                      <input
                                        value={
                                          calculateFinalValue() ||
                                          rows1[index].nilai
                                        }
                                        className="form-control"
                                        type="text"
                                        disabled
                                      />
                                    </div>
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
                                      onClick={() => handleOpen8(index)}
                                      className="text-center fw-bold me-3 mt-1"
                                    >
                                      !
                                    </button>
                                    <input
                                      onKeyDown={(e) => {
                                        const allowedCharacters = /^[0-9,.]+$/;

                                        if (
                                          !allowedCharacters.test(e.key) &&
                                          e.key.length === 1
                                        ) {
                                          e.preventDefault();
                                        }
                                      }}
                                      value={row.nilai}
                                      onChange={(e) =>
                                        handleNilaiChangeTable2(e, index)
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
                                      onClick={() => handleOpen9(index)}
                                      className="text-center fw-bold me-3 mt-1"
                                    >
                                      !
                                    </button>
                                    <input
                                      onKeyDown={(e) => {
                                        const allowedCharacters = /^[0-9,.]+$/;

                                        if (
                                          !allowedCharacters.test(e.key) &&
                                          e.key.length === 1
                                        ) {
                                          e.preventDefault();
                                        }
                                      }}
                                      value={row.nilai}
                                      onChange={(e) =>
                                        handleNilaiChangeTable2(e, index)
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
                                      onClick={() => handleOpen10(index)}
                                      className="text-center fw-bold me-3 mt-1"
                                    >
                                      !
                                    </button>
                                    <input
                                      onKeyDown={(e) => {
                                        const allowedCharacters = /^[0-9,.]+$/;

                                        if (
                                          !allowedCharacters.test(e.key) &&
                                          e.key.length === 1
                                        ) {
                                          e.preventDefault();
                                        }
                                      }}
                                      value={row.nilai}
                                      onChange={(e) =>
                                        handleNilaiChangeTable2(e, index)
                                      }
                                      className="form-control"
                                      type="text"
                                    />
                                  </>
                                )}
                                {row.showButton311 && (
                                  <div>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={
                                        row.nilai ||
                                        (data?.asesorProgramStudis?.questions
                                          ?.form2 &&
                                          data.asesorProgramStudis.questions.form2.find(
                                            (item) => item.code === "3.3.1"
                                          )?.nilai) ||
                                        calculateAverageTotalNilai(
                                          calculateTotalNilai(
                                            formData2.luasRuangPerMahasiswa,
                                            formData2.status2
                                          ),
                                          calculateTotalNilai3(
                                            formData3.luasRuangPerMahasiswa,
                                            formData3.status3
                                          ),
                                          calculateTotalNilai4(
                                            formData4.luasRuangPerMahasiswa,
                                            formData4.status4
                                          ),
                                          calculateTotalNilai5(formData9.ltrp)
                                        )
                                      }
                                      disabled
                                    />
                                    <div className="d-flex">
                                      <button
                                        onClick={() => handleOpen12(index)}
                                        className="text-center btn btn-success rounded-5 fw-bold me-3 mt-3 mb-2"
                                      >
                                        <EditNotificationsIcon />
                                      </button>
                                      <input
                                        type="text"
                                        className="form-control mt-2"
                                        value={calculateTotalNilai(
                                          formData2.luasRuangPerMahasiswa,
                                          formData2.status2
                                        )}
                                        disabled
                                      />
                                    </div>

                                    <br />
                                    <div className="d-flex">
                                      <button
                                        onClick={() => handleOpen13(index)}
                                        className="text-center btn btn-success rounded-5 fw-bold me-3 "
                                      >
                                        <EditNotificationsIcon />
                                      </button>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={calculateTotalNilai3(
                                          formData3.luasRuangPerMahasiswa,
                                          formData3.status3
                                        )}
                                        disabled
                                      />
                                    </div>

                                    <br />
                                    <div className="d-flex">
                                      <button
                                        onClick={() => handleOpen14(index)}
                                        className="text-center btn btn-success rounded-5 fw-bold me-3 "
                                      >
                                        <EditNotificationsIcon />
                                      </button>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={calculateTotalNilai4(
                                          formData4.luasRuangPerMahasiswa,
                                          formData4.status4
                                        )}
                                        disabled
                                      />
                                    </div>

                                    <div className="d-flex">
                                      <button
                                        onClick={() => handleOpen3314(index)}
                                        className="text-center btn btn-success rounded-5 fw-bold me-3 mt-2 mb-2"
                                      >
                                        <EditNotificationsIcon />
                                      </button>
                                      <input
                                        type="text"
                                        className="form-control mt-2"
                                        value={
                                          calculateTotalNilai5(
                                            formData9.ltrp
                                          ) || 0
                                        }
                                        disabled
                                      />
                                    </div>
                                    <span
                                      style={{
                                        fontSize: "12px",
                                        color: "green",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      klik icon untuk isi nilai
                                    </span>
                                    {isNaN(
                                      calculateAverageTotalNilai(
                                        calculateTotalNilai(
                                          formData2.luasRuangPerMahasiswa,
                                          formData2.status2
                                        ),
                                        calculateTotalNilai3(
                                          formData3.luasRuangPerMahasiswa,
                                          formData3.status3
                                        ),
                                        calculateTotalNilai4(
                                          formData4.luasRuangPerMahasiswa,
                                          formData4.status4
                                        ),
                                        calculateTotalNilai5(formData9.ltrp)
                                      )
                                    ) && (
                                      <p
                                        className="mt-2 text-center"
                                        style={{
                                          color: "red",
                                          fontStyle: "italic",
                                        }}
                                      ></p>
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
                                      onClick={() => handleOpen11(index)}
                                      className="text-center fw-bold me-3 mt-1"
                                    >
                                      !
                                    </button>
                                    <input
                                      onKeyDown={(e) => {
                                        const allowedCharacters = /^[0-9,.]+$/;

                                        if (
                                          !allowedCharacters.test(e.key) &&
                                          e.key.length === 1
                                        ) {
                                          e.preventDefault();
                                        }
                                      }}
                                      value={row.nilai}
                                      onChange={(e) =>
                                        handleNilaiChangeTable2(e, index)
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
                                      onClick={() => handleOpen15(index)}
                                      className="text-center fw-bold me-3 mt-1"
                                    >
                                      !
                                    </button>
                                    <input
                                      onKeyDown={(e) => {
                                        const allowedCharacters = /^[0-9,.]+$/;

                                        if (
                                          !allowedCharacters.test(e.key) &&
                                          e.key.length === 1
                                        ) {
                                          e.preventDefault();
                                        }
                                      }}
                                      value={row.nilai}
                                      onChange={(e) =>
                                        handleNilaiChangeTable2(e, index)
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
                                      onClick={() => handleOpen16(index)}
                                      className="text-center fw-bold me-3 mt-1"
                                    >
                                      !
                                    </button>
                                    <input
                                      onKeyDown={(e) => {
                                        const allowedCharacters = /^[0-9,.]+$/;

                                        if (
                                          !allowedCharacters.test(e.key) &&
                                          e.key.length === 1
                                        ) {
                                          e.preventDefault();
                                        }
                                      }}
                                      value={row.nilai}
                                      onChange={(e) =>
                                        handleNilaiChangeTable2(e, index)
                                      }
                                      className="form-control"
                                      type="text"
                                    />
                                  </>
                                )}
                                {row.showButton17 && (
                                  <>
                                    <button
                                      style={{
                                        width: "20px",
                                        height: "20px",
                                        borderRadius: "50%",
                                        backgroundColor: "blue",
                                        color: "white",
                                      }}
                                      onClick={() => handleOpen17(index)}
                                      className="text-center fw-bold me-3 mt-1"
                                    >
                                      !
                                    </button>
                                    <input
                                      onKeyDown={(e) => {
                                        const allowedCharacters = /^[0-9,.]+$/;

                                        if (
                                          !allowedCharacters.test(e.key) &&
                                          e.key.length === 1
                                        ) {
                                          e.preventDefault();
                                        }
                                      }}
                                      value={row.nilai}
                                      onKeyPress={(e) => handleKeyPress(e)}
                                      onChange={(e) =>
                                        handleNilaiChangeTable2(e, index)
                                      }
                                      className="form-control"
                                      type="text"
                                    />
                                  </>
                                )}
                              </div>
                            </TableCell>
                            <TableCell
                              style={{ color: darkMode ? "white" : "" }}
                            >
                               <FormControlLabel
                                control={
                                  <Switch
                                    checked={buttonStates[index]}
                                    onChange={() => handleSwitchChange(index)}
                                    sx={{
                                      "& .MuiSwitch-thumb": {
                                        bgcolor: buttonStates[index]
                                          ? "green"
                                          : "red",
                                      },
                                      "& .MuiSwitch-track": {
                                        bgcolor: buttonStates[index]
                                          ? "lightgreen"
                                          : "lightcoral",
                                      },
                                    }}
                                  />
                                }
                                label={
                                  buttonStates[index]
                                    ? "Sesuai"
                                    : "Tidak Sesuai"
                                }
                                labelPlacement="end"
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </>
            ) : view === "three" ? (
              <>
                <FormALPenilaianValidatorBanpt />
              </>
            ) : null}
            <div className="col-12 mt-3">
              <h5>
                Rekomendasi{" "}
                <span className="text-danger fst-italic fs-6">*Wajib Isi</span>
              </h5>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="recommendationCheckbox"
                  value={1}
                  checked={isRecommended === 1}
                  onChange={handleCheckboxChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="recommendationCheckbox"
                >
                  Direkomendasikan
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="notRecommendedCheckbox"
                  value={0}
                  checked={isRecommended === 0}
                  onChange={handleCheckboxChange}
                />
                <label
                  className="form-check-label"
                  htmlFor="notRecommendedCheckbox"
                >
                  Belum Direkomendasikan
                </label>
              </div>
            </div>
            <div className="col-12 mt-3">
              <h5>Komentar Umum Penilaian Seluruh Kriteria</h5>
              <textarea
                value={coment || ""}
                onChange={(e) => setComent(e.target.value)}
                className=" form-control  mt-3 "
                disabled={isSubmitted}
                placeholder="....."
              ></textarea>
              {!coment && !data?.asesorProgramStudis?.komentar && <></>}
            </div>
            <div className="col-12 mt-1">
              <Alert severity="warning">
                Pastikan nilai dan catatan sudah terisi semua sebelum submit
              </Alert>
            </div>
            <div className="col-12 mt-4 d-flex">
              <Button
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
              >
                Kembali
              </Button>

              <div className="d-flex gap-3 ms-auto">
                <Button
                  disabled={
                    data?.asesorProgramStudis?.status === 23 || isSubmitted
                  }
                  sx={{
                    transition: "transform 0.3s ease-in-out",
                    backgroundColor: "red",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      backgroundColor: "transparent",
                      color: "blue",
                      border: "1px solid red",
                    },
                  }}
                  variant="contained"
                  onClick={() => {
                    InputSwal2(
                      "Catatan Pengembalian",
                      "Placeholder...",
                      async (note) => {
                        if (note) {
                          try {
                            const id = parseInt(getUserId());
                            const programStudiId = parseInt(
                              localStorage.getItem("programStudiId")
                            );
                            const apiUrl = `/prodi-assesment/reject/${programStudiId}/${id}?note=${encodeURIComponent(
                              note
                            )}`;

                            const response = await api.post(
                              apiUrl,
                              {},
                              {
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                },
                              }
                            );

                            if (response.data.status === 200) {
                              await Swal.fire({
                                icon: "success",
                                title: "Berhasil",
                                text: response.data.message,
                                showConfirmButton: false,
                                timer: 1500,
                              });
                              getData();
                              handleGoBack();
                            } else {
                              throw new Error(
                                response.data.message || "Terjadi kesalahan"
                              );
                            }
                          } catch (error) {
                            console.error("Error:", error);
                            if (error.response) {
                              if (
                                error.response.status === 400 &&
                                error.response.data.errors?.note
                              ) {
                                await Swal.fire({
                                  icon: "error",
                                  title: "Gagal",
                                  text: error.response.data.errors.note.join(
                                    ", "
                                  ),
                                });
                              } else {
                                await Swal.fire({
                                  icon: "error",
                                  title: "Gagal",
                                  text:
                                    error.response.data.title ||
                                    "Terjadi kesalahan",
                                });
                              }
                            } else {
                              await Swal.fire({
                                icon: "error",
                                title: "Gagal",
                                text: "Terjadi kesalahan",
                              });
                            }
                          }
                        }
                      }
                    );
                  }}
                >
                  Kembalikan dengan catatan
                </Button>

                <Button
                  sx={{
                    transition: "transform 0.3s ease-in-out",
                    backgroundColor: "orange",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      backgroundColor: "transparent",
                      color: "blue",
                      border: "1px solid orange",
                    },
                  }}
                  variant="contained"
                  onClick={handlePutRequest1}
                  disabled={
                    data?.asesorProgramStudis?.status === 23 || isSubmitted
                  }
                >
                  Simpan Sebagai Draft
                </Button>

                <Button
                  disabled={isSubmitted}
                  sx={{
                    transition: "transform 0.3s ease-in-out",
                    backgroundColor: `${
                      data?.asesorProgramStudis?.status === 23
                        ? "green"
                        : "blue"
                    }`,
                    "&:hover": {
                      transform: "translateY(-5px)",
                      backgroundColor: "transparent",
                      color: "blue",
                      border: "1px solid blue",
                    },
                  }}
                  variant="contained"
                  onClick={handlePutRequest}
                >
                  {data?.asesorProgramStudis?.status === 23
                    ? "Edit Penilaian"
                    : "Submit Penilaian Kecukupan"}
                </Button>
              </div>
            </div>
          </div>
          <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                backgroundColor: "white",
                border: "2px solid #000",
                boxShadow: 24,
                padding: 20,
              }}
            >
              <h2 id="simple-modal-title">Enter Reason</h2>
              <TextField
                id="outlined-multiline-static"
                label="Reason"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                style={{ marginBottom: "20px" }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveReason}
              >
                Save
              </Button>
            </div>
          </Modal>
          {/* modal 1.1 */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Kriteria Penilaian
              </Typography>
              <hr />
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  4 Keunikan atau keunggulan program studi disusun berdasarkan
                  perbandingan tiga program studi pada tingkat internasional
                  yang mencakup tiga aspek, atau prodi yang diusulkan merupakan{" "}
                  <b>satu-satunya</b> program studi didunia
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  3 Keunikan atau keunggulan program studi disusun berdasarkan
                  perbandingan tiga program studi pada tingkat internasional dan
                  nasional yang mencakup tiga aspek
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
                  1 Keunikan atau Keunggulan program studi disusun berdasarkan
                  perbandingan kurang dan tiga program studi pada tingkat
                  nasional dan/atau mencakup kurang dari tiga aspek
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  0 Tidak mendeskripsikan/ menguraikan keunikan atau keunggulan
                  program studi
                </Alert>
              </Typography>
              <hr />
              <div className="mt-3 justify-content-end d-flex">
                <Button
                  variant="outlined"
                  size="medium"
                  sx={{ marginLeft: "auto", display: "flex" }}
                  onClick={handleClose}
                >
                  Tutup
                </Button>
              </div>
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
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Kriteria Penilaian
              </Typography>
              <hr />
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  4 Pengusul menguraikan profil lulusan program studi yang
                  berupa profesi atau jenis pekerjaan atau bentuk kerja lainnya
                  dilengkapi dengan (1) uraian ringkas seluruh profil, yang
                  sesuai dengan Program Magister dan (2) keterkaitan profil
                  dengan keunikan atau keunggulan prodi
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  3 Pengusul menguraikan profil lulusan program studi yang
                  berupa profesi atau jenis pekerjaan atau bentuk kerja lainnya
                  dilengkapi dengan (1) uraian ringkas pada sebagian profil yang
                  sesuai dengan Program Magister dan (2) keterkaitan profil
                  dengan keunikan atau keunggulan program studi.
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  2 Pengusul menguraikan profil lulusan program studi yang
                  berupa profesi atau jenis pekerjaan atau bentuk kerja lainnya
                  dan keterkaitan profil dengan keunggulan atau keunikan program
                  studi
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  1 Hanya mengidentifikasi profil lulusan atau penjelasan
                  mengenai profil lulusan tidak relevan
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  0 Tidak mengidentifikasi profil lulusan
                </Alert>
              </Typography>
              <hr />
              <div className="mt-3 justify-content-end d-flex">
                <Button
                  variant="outlined"
                  size="medium"
                  sx={{ marginLeft: "auto", display: "flex" }}
                  onClick={handleClose1}
                >
                  Tutup
                </Button>
              </div>
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
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Kriteria Penilaian
              </Typography>
              <hr />
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  4 Rumusan capaian pembelajaran: (a) sesuai dengan profil
                  lulusan, (b)deskripsi kompetensinya sesuai level 8 (delapan)
                  KKNI dan sesuai SN-Dikti yang mencakup 4 (empat) domain
                  capaian pembelajaran, (3) relevan dengan keunikan atau
                  keunggulan prodi, dan (4){" "}
                  <b>mencantumkan paling sedikit SN Dikti sebagai rujukan</b>
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  3 Rumusan capaian pembelajaran: (a) sesuai dengan profil
                  lulusan, (b) deskripsi kompetensinya sesuai level 8 (delapan)
                  KKNI dan sesuai SN-Dikti yang mencakup 4 (empat) domain
                  capaian pembelajaran, dan (3)relevan dg keunggulan atau
                  keunikan prodi
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  2 Rumusan capaian pembelajaran: (a) sesuai dengan profil
                  lulusan, (b) deskripsi kompetensinya sesuai level 8 (delapan)
                  KKNI, tidak menjabarkan capaian pembelajaran sesuai SN-Dikti,
                  dan (c) tidak atau kurang relevan dengan keunikan atau
                  keunggulan prodi
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  1 Rumusan capaian pembelajaran tidak sesuai dengan SN Dikti
                  atau level 8 (delapan) KKNI
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  0 Tidak mencantumkan/mendeskripsikan Capaian Pembelajaran atau
                  Rumusan capaian pembelajaran tidak sesuai dengan SN Dikti atau
                  level 8 (delapan) KKNI
                </Alert>
              </Typography>
              <hr />
              <div className="mt-3 justify-content-end d-flex">
                <Button
                  variant="outlined"
                  size="medium"
                  sx={{ marginLeft: "auto", display: "flex" }}
                  onClick={handleClose2}
                >
                  Tutup
                </Button>
              </div>
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
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Kriteria Penilaian
              </Typography>
              <hr />
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  4 Rancangan susunan mata kuliah memenuhi tiga aspek
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  3 Rancangan susunan mata kuliah memenuhi aspek 1 dan aspek 2
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  2 Rancangan susunan mata kuliah memenuhi aspek 1 atau 2 dan
                  aspek 3
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  1 Rancangan susunan mata kuliah memenuhi salah satu aspek
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  0 Tidak ada rancangan daftar/susunan mata kuliah
                </Alert>
              </Typography>
              <hr />
              <div className="mt-3 justify-content-end d-flex">
                <Button
                  variant="outlined"
                  size="medium"
                  sx={{ marginLeft: "auto", display: "flex" }}
                  onClick={handleClose3}
                >
                  Tutup
                </Button>
              </div>
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
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Kriteria Penilaian
              </Typography>
              <hr />
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  4 Lima mata kuliah dilengkapi dengan RPS yang memenuhi 9
                  komponen, menunjukkan secara jelas penciri program studi dan
                  menggunakan referensi yang relevan dan mutakhir berbasis riset
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  3 Lima mata kuliah dilengkapi dengan RPS yang memenuhi 9
                  komponen, menunjukkan secara jelas penciri program studi dan
                  menggunakan referensi yang relevan berbasis riset
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  2 Lima mata kuliah dilengkapi dengan RPS yang memenuhi 9
                  komponen
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  1 Jumlah RPS mata kuliah yang memenuhi 9 komponen jumlahnya
                  kurang dari 10
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">0 Tidak ada RPS berbasis riset</Alert>
              </Typography>
              <hr />
              <div className="mt-3 justify-content-end d-flex">
                <Button
                  variant="outlined"
                  size="medium"
                  sx={{ marginLeft: "auto", display: "flex" }}
                  onClick={handleClose4}
                >
                  Tutup
                </Button>
              </div>
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
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Kriteria Penilaian
              </Typography>
              <hr />
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  4 Jumlah calon dosen tetap sedikitnya sebanyak 5 (lima) orang
                  berkualifikasi akademik lulusan doktor atau doktor terapan
                  atau setara level 9 (sembilan) KKNI, dan telah memiliki NIDN
                  pada PT pengusul, di antaranya Lektor Kepala, dan 2 orang Guru
                  Besar (Profesor)
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  3 Jumlah calon dosen sedikitnya sebanyak 5 (lima) orang
                  berkualifikasi akademik lulusan doktor atau doktor terapan
                  atau setara level 9 (sembilan) KKNI, dengan komposisi: (a) 3
                  (tiga) orang dosen tetap dari PT pengusul yang telah memiliki
                  NIDN, dan (b) 2 (dua) orang Guru Besar, dan telah
                  menandatangani Surat Perjanjian Kesediaan Pengangkatan sebagai
                  calon dosen tetap
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  2 Jumlah calon dosen sedikitnya sebanyak 5 (lima) orang
                  berkualifikasi akademik lulusan doktor atau doktor terapan
                  atau setara level 9 (sembilan) KKNI, dengan komposisi: (a) 3
                  (tiga) orang dosen tetap dari PT pengusul yang telah memiliki
                  NIDN atau telah menandatangani Surat Perjanjian Kesediaan
                  Pengangkatan sebagai calon dosen tetap, dan (b) 2 (dua) orang
                  lainnya merupakan dosen dari PT lain yang ditugaskan oleh
                  Pemimpin PT
                </Alert>
              </Typography>
              <hr />
              <div className="mt-3 justify-content-end d-flex">
                <Button
                  variant="outlined"
                  size="medium"
                  sx={{ marginLeft: "auto", display: "flex" }}
                  onClick={handleClose6}
                >
                  Tutup
                </Button>
              </div>
            </Box>
          </Modal>

          {/* Modal 2.2 */}
          <Modal
            open={open7}
            onClose={handleClose7}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Kriteria Penilaian
              </Typography>
              <hr />
              <div className="d-flex">
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <b>Na</b> Jumlah keterlibatan dosen dalam artikel/karya
                  ilmiah/seni/olah raga pada jurnal internasional bereputasi,
                  yang dihasilkan dari penelitian dan pengabdian kepada
                  masyarakat
                </Typography>
                <div className=" ms-auto">
                  <input
                    onKeyDown={(e) => {
                      const allowedCharacters = /^[0-9,.]+$/;

                      if (
                        !allowedCharacters.test(e.key) &&
                        e.key.length === 1
                      ) {
                        e.preventDefault();
                      }
                    }}
                    style={{ width: "100px" }}
                    type="text"
                    className="form-control"
                    value={formData.Na}
                    onChange={(e) => handleNChange(e, "Na")}
                  />
                  {!formData.Na &&
                    !data?.asesorProgramStudis?.questions?.form2?.[2]
                      ?.additionalFields?.Na && (
                      <p className="text-danger">Nilai Belum Ada</p>
                    )}
                </div>
              </div>

              <div className="d-flex">
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <b>Nb</b> Jumlah keterlibatan dosen dalam artikel/karya
                  ilmiah/seni/olah raga pada jurnal nasional terakreditasi dan
                  atau jurnal internasional, yang dihasilkan dari penelitian dan
                  pengabdian kepada masyarakat
                </Typography>
                <div className=" ms-auto">
                  <input
                    onKeyDown={(e) => {
                      const allowedCharacters = /^[0-9,.]+$/;

                      if (
                        !allowedCharacters.test(e.key) &&
                        e.key.length === 1
                      ) {
                        e.preventDefault();
                      }
                    }}
                    style={{ width: "100px" }}
                    type="text"
                    className="form-control"
                    value={formData.Nb}
                    onChange={(e) => handleNChange(e, "Nb")}
                  />
                  {!formData.Nb &&
                    !data?.asesorProgramStudis?.questions?.form2?.[2]
                      ?.additionalFields?.Nb && (
                      <p className="text-danger">Nilai Belum Ada</p>
                    )}
                </div>
              </div>

              <div className="d-flex">
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <b>Nc</b> Jumlah keterlibatan dosen dalam artikel/karya
                  ilmiah/seni/olah raga pada jurnal nasional, yang dihasilkan
                  dari penelitian dan pengabdian kepada masyarakat
                </Typography>
                <div className=" ms-auto">
                  <input
                    onKeyDown={(e) => {
                      const allowedCharacters = /^[0-9,.]+$/;

                      if (
                        !allowedCharacters.test(e.key) &&
                        e.key.length === 1
                      ) {
                        e.preventDefault();
                      }
                    }}
                    style={{ width: "100px" }}
                    type="text"
                    className="form-control"
                    value={formData.Nc}
                    onChange={(e) => handleNChange(e, "Nc")}
                  />
                  {!formData.Nc &&
                    !data?.asesorProgramStudis?.questions?.form2?.[2]
                      ?.additionalFields?.Nc && (
                      <p className="text-danger">Nilai Belum Ada</p>
                    )}
                </div>
              </div>

              <div className="d-flex">
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <b>f</b> Jumlah dosen tetap (diisi sesuai dengan jumlah dosen
                  tetap yang memenuhi persyaratan pada file excel dosen)
                </Typography>
                <div className=" ms-auto">
                  <input
                    onKeyDown={(e) => {
                      const allowedCharacters = /^[0-9,.]+$/;

                      if (
                        !allowedCharacters.test(e.key) &&
                        e.key.length === 1
                      ) {
                        e.preventDefault();
                      }
                    }}
                    style={{ width: "100px" }}
                    type="text"
                    className="form-control"
                    value={formData.f}
                    onChange={(e) => handleNChange(e, "f")}
                  />
                  {!formData.f &&
                    !data?.asesorProgramStudis?.questions?.form2?.[2]
                      ?.additionalFields?.f && (
                      <p className="text-danger">Nilai Belum Ada</p>
                    )}
                </div>
              </div>

              <Typography
                sx={{ marginTop: "20px", fontWeight: "bold", fontSize: "20px" }}
              >
                Nilai Kasar (NK) = {calculateNK()}
              </Typography>
              <Typography
                sx={{ marginTop: "20px", fontWeight: "bold", fontSize: "20px" }}
              >
                Nilai = {calculateFinalValue()}
              </Typography>
              <hr />
              <div className="mt-3 justify-content-end d-flex">
                <Button
                  variant="outlined"
                  size="medium"
                  sx={{ marginLeft: "auto", display: "flex" }}
                  onClick={handleClose7}
                >
                  Tutup
                </Button>
              </div>
            </Box>
          </Modal>

          {/* lapangan */}
          <Modal
            open={open30}
            onClose={handleClose30}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Kriteria Penilaian
              </Typography>
              <hr />
              <div className="d-flex">
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <b>Na</b> Jumlah keterlibatan dosen dalam artikel/karya
                  ilmiah/seni/olah raga pada jurnal internasional bereputasi,
                  yang dihasilkan dari penelitian dan pengabdian kepada
                  masyarakat
                </Typography>
                <div className=" ms-auto">
                  <input
                    style={{ width: "100px" }}
                    type="text"
                    className="form-control"
                    value={
                      formData5.Na5 ||
                      (data?.asesorProgramStudis?.questions &&
                        data.asesorProgramStudis.questions.form2 &&
                        data.asesorProgramStudis.questions.form2[2]
                          ?.additionalFields2?.Na5) ||
                      ""
                    }
                    onChange={(e) => handleNChange5(e, "Na5")}
                  />
                  {!formData5.Na5 &&
                    !data?.asesorProgramStudis?.questions?.form2?.[2]
                      ?.additionalFields2?.Na5 && (
                      <p className="text-danger">Nilai Belum Ada</p>
                    )}
                </div>
              </div>

              <div className="d-flex">
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <b>Nb</b> Jumlah keterlibatan dosen dalam artikel/karya
                  ilmiah/seni/olah raga pada jurnal nasional terakreditasi dan
                  atau jurnal internasional, yang dihasilkan dari penelitian dan
                  pengabdian kepada masyarakat
                </Typography>
                <div className=" ms-auto">
                  <input
                    style={{ width: "100px" }}
                    type="text"
                    className="form-control"
                    value={
                      formData5.Nb5 ||
                      (data?.asesorProgramStudis?.questions &&
                        data.asesorProgramStudis.questions.form2 &&
                        data.asesorProgramStudis.questions.form2[2]
                          ?.additionalFields2?.Nb5) ||
                      ""
                    }
                    onChange={(e) => handleNChange5(e, "Nb5")}
                  />
                  {!formData5.Nb5 &&
                    !data?.asesorProgramStudis?.questions?.form2?.[2]
                      ?.additionalFields2?.Nb5 && (
                      <p className="text-danger">Nilai Belum Ada</p>
                    )}
                </div>
              </div>

              <div className="d-flex">
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <b>Nc</b> Jumlah keterlibatan dosen dalam artikel/karya
                  ilmiah/seni/olah raga pada jurnal nasional, yang dihasilkan
                  dari penelitian dan pengabdian kepada masyarakat
                </Typography>
                <div className=" ms-auto">
                  <input
                    style={{ width: "100px" }}
                    type="text"
                    className="form-control"
                    value={
                      formData5.Nc5 ||
                      (data?.asesorProgramStudis?.questions &&
                        data.asesorProgramStudis.questions.form2 &&
                        data.asesorProgramStudis.questions.form2[2]
                          ?.additionalFields2?.Nc5) ||
                      ""
                    }
                    onChange={(e) => handleNChange5(e, "Nc5")}
                  />
                  {!formData5.Nc5 &&
                    !data?.asesorProgramStudis?.questions?.form2?.[2]
                      ?.additionalFields2?.Nc5 && (
                      <p className="text-danger">Nilai Belum Ada</p>
                    )}
                </div>
              </div>

              <div className="d-flex">
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <b>f</b> Jumlah dosen tetap (diisi sesuai dengan jumlah dosen
                  tetap yang memenuhi persyaratan pada file excel dosen)
                </Typography>
                <div className=" ms-auto">
                  <input
                    style={{ width: "100px" }}
                    type="text"
                    className="form-control"
                    value={
                      formData5.f5 ||
                      (data?.asesorProgramStudis?.questions &&
                        data.asesorProgramStudis.questions.form2 &&
                        data.asesorProgramStudis.questions.form2[2]
                          ?.additionalFields2?.f5) ||
                      ""
                    }
                    onChange={(e) => handleNChange5(e, "f5")}
                  />
                  {!formData5.f5 &&
                    !data?.asesorProgramStudis?.questions?.form2?.[2]
                      ?.additionalFields2?.f5 && (
                      <p className="text-danger">Nilai Belum Ada</p>
                    )}
                </div>
              </div>

              <Typography
                sx={{ marginTop: "20px", fontWeight: "bold", fontSize: "20px" }}
              >
                Nilai Kasar (NK) = {calculateNK1()}
              </Typography>
              <Typography
                sx={{ marginTop: "20px", fontWeight: "bold", fontSize: "20px" }}
              >
                Nilai = {calculateFinalValue1()}
              </Typography>
              <hr />
              <div className="mt-3 justify-content-end d-flex">
                <Button
                  variant="outlined"
                  size="medium"
                  sx={{ marginLeft: "auto", display: "flex" }}
                  onClick={handleClose7}
                >
                  Tutup
                </Button>
              </div>
            </Box>
          </Modal>

          {/* Modal 3.1.1 */}
          <Modal
            open={open8}
            onClose={handleClose8}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Kriteria Penilaian
              </Typography>
              <hr />
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  4 Jika struktur organisasi memenuhi 5 (lima) aspek dan
                  dilengkapi dengan tata kerja UPPS yang memperlihatkan
                  kedudukan dan tata hubungan antara program studi yang
                  diusulkan dan unit organisasi yang ada pada UPPS
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  3 Jika struktur organisasi memenuhi 4 (empat) aspek pertama
                  dan dilengkapi dengan tata kerja UPPS yang memperlihatkan
                  kedudukan dan tata hubungan antara program studi yang
                  diusulkan dan unit organisasi yang ada pada UPPS
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  2 Jika struktur organisasi memenuhi 3 (tiga) aspek pertama dan
                  dilengkapi dengan tata kerja UPPS yang memperlihatkan
                  kedudukan dan tata hubungan antara program studi yang
                  diusulkan dan unit organisasi yang ada pada UPPS
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  1 Jika struktur organisasi memenuhi kurang dari 3 (tiga) aspek
                  pertama dan tidak dilengkapi dengan tata kerja UPPS yang
                  memperlihatkan kedudukan dan tata hubungan antara program
                  studi yang diusulkan dan unit organisasi yang ada pada UPPS
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  0 Jika tidak menjelaskan rencana struktur organisasi dan tata
                  kerja <b>UPPS</b>
                </Alert>
              </Typography>
              <hr />
              <div className="mt-3 justify-content-end d-flex">
                <Button
                  variant="outlined"
                  size="medium"
                  sx={{ marginLeft: "auto", display: "flex" }}
                  onClick={handleClose8}
                >
                  Tutup
                </Button>
              </div>
            </Box>
          </Modal>

          {/* Modal 3.1.2 */}
          <Modal
            open={open9}
            onClose={handleClose9}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Kriteria Penilaian
              </Typography>
              <hr />
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info"> 4 Jika memenuhi 5 (lima) aspek</Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info"> 3 Jika memenuhi 4 (empat) aspek</Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">2 Jika memenuhi 3 (tiga) aspek</Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info"> 1 Jika memenuhi 1 - 2 aspek</Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  0 Jika tidak menjelaskan rencana perwujudan good governance
                </Alert>
              </Typography>
              <hr />
              <div className="mt-3 justify-content-end d-flex">
                <Button
                  variant="outlined"
                  size="medium"
                  sx={{ marginLeft: "auto", display: "flex" }}
                  onClick={handleClose9}
                >
                  Tutup
                </Button>
              </div>
            </Box>
          </Modal>

          {/* Modal 3.2 */}
          <Modal
            open={open15}
            onClose={handleClose15}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Kriteria Penilaian
              </Typography>
              <hr />
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
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
                  {" "}
                  2 UPPS telah melaksanakan SPMI yang memenuhi aspek nomor 1
                  sampai dengan 3.
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  1 UPPS telah melaksanakan SPMI yang memenuhi aspek nomor 1 dan
                  2, serta siklus kegiatan SPMI baru dilaksanakan pada tahapan
                  penetapan standar dan pelaksanaan standar pendidikan tinggi.
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  0 UPPS telah memiliki dokumen legal pembentukan unsur
                  pelaksana penjaminan mutu tanpa pelaksanaan SPMI.
                </Alert>
              </Typography>
              <hr />
              <div className="mt-3 justify-content-end d-flex">
                <Button
                  variant="outlined"
                  size="medium"
                  sx={{ marginLeft: "auto", display: "flex" }}
                  onClick={handleClose15}
                >
                  Tutup
                </Button>
              </div>
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
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Kriteria Penilaian
              </Typography>
              <hr />
              <div className="d-flex">
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Luas total ruang kuliah (m2)
                </Typography>
                <div className=" ms-auto">
                  <input
                    onKeyDown={(e) => {
                      const allowedCharacters = /^[0-9,.]+$/;

                      if (
                        !allowedCharacters.test(e.key) &&
                        e.key.length === 1
                      ) {
                        e.preventDefault();
                      }
                    }}
                    type="text"
                    className="form-control"
                    value={formData2.ltrk2}
                    onChange={(e) => handleNChange2(e, "ltrk2")}
                  />
                  {!formData2.ltrk2 &&
                    !data?.asesorProgramStudis?.questions?.form2?.[2]
                      ?.additionalFields?.ltrk2 && (
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
                    onKeyDown={(e) => {
                      const allowedCharacters = /^[0-9,.]+$/;

                      if (
                        !allowedCharacters.test(e.key) &&
                        e.key.length === 1
                      ) {
                        e.preventDefault();
                      }
                    }}
                    type="text"
                    className="form-control"
                    value={formData2.lt2}
                    onChange={(e) => handleNChange2(e, "lt2")}
                  />
                  {!formData2.lt2 &&
                    !data?.asesorProgramStudis?.questions?.form2?.[2]
                      ?.additionalFields?.lt2 && (
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
                        data.asesorProgramStudis.questions.form2[2]
                          ?.additionalFields?.status2) ||
                      ""
                    }
                    onChange={(e) => handleNChange2(e, "status2")}
                  >
                    <option value="" defaultValue>
                      pilih status
                    </option>
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
                    value={calculateTotalNilai(
                      formData2.luasRuangPerMahasiswa,
                      formData2.status2
                    )}
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
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Kriteria Penilaian
              </Typography>
              <hr />
              <div className="d-flex">
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Luas total ruang kerja dosen (m2)
                </Typography>
                <div className=" ms-auto">
                  <input
                    onKeyDown={(e) => {
                      const allowedCharacters = /^[0-9,.]+$/;

                      if (
                        !allowedCharacters.test(e.key) &&
                        e.key.length === 1
                      ) {
                        e.preventDefault();
                      }
                    }}
                    type="text"
                    className="form-control"
                    value={formData3.ltrk3}
                    onChange={(e) => handleNChange3(e, "ltrk3")}
                  />
                  {!formData3.ltrk3 &&
                    !data?.asesorProgramStudis?.questions?.form2?.[3]
                      ?.additionalFields?.ltrk3 && (
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
                    onKeyDown={(e) => {
                      const allowedCharacters = /^[0-9,.]+$/;

                      if (
                        !allowedCharacters.test(e.key) &&
                        e.key.length === 1
                      ) {
                        e.preventDefault();
                      }
                    }}
                    type="text"
                    className="form-control"
                    value={formData3.lt3}
                    onChange={(e) => handleNChange3(e, "lt3")}
                  />
                  {!formData3.lt3 &&
                    !data?.asesorProgramStudis?.questions?.form2?.[3]
                      ?.additionalFields?.lt3 && (
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
                        data.asesorProgramStudis.questions.form2[3]
                          ?.additionalFields?.status3) ||
                      ""
                    }
                    onChange={(e) => handleNChange3(e, "status3")}
                  >
                    <option value="" defaultValue>
                      pilih status
                    </option>
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
                    value={calculateTotalNilai3(
                      formData3.luasRuangPerMahasiswa,
                      formData3.status3
                    )}
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
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Kriteria Penilaian
              </Typography>
              <hr />
              <div className="d-flex">
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Luas total ruang kerja pegawai (m2)
                </Typography>
                <div className=" ms-auto">
                  <input
                    onKeyDown={(e) => {
                      const allowedCharacters = /^[0-9,.]+$/;

                      if (
                        !allowedCharacters.test(e.key) &&
                        e.key.length === 1
                      ) {
                        e.preventDefault();
                      }
                    }}
                    type="text"
                    className="form-control"
                    value={formData4.ltrk4}
                    onChange={(e) => handleNChange4(e, "ltrk4")}
                  />
                  {!formData4.ltrk4 &&
                    !data?.asesorProgramStudis?.questions?.form2?.[4]
                      ?.additionalFields?.ltrk4 && (
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
                    onKeyDown={(e) => {
                      const allowedCharacters = /^[0-9,.]+$/;

                      if (
                        !allowedCharacters.test(e.key) &&
                        e.key.length === 1
                      ) {
                        e.preventDefault();
                      }
                    }}
                    type="text"
                    className="form-control"
                    value={formData4.lt4}
                    onChange={(e) => handleNChange4(e, "lt4")}
                  />
                  {!formData4.lt4 &&
                    !data?.asesorProgramStudis?.questions?.form2?.[4]
                      ?.additionalFields?.lt4 && (
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
                        data.asesorProgramStudis.questions.form2[4]
                          ?.additionalFields?.status4) ||
                      ""
                    }
                    onChange={(e) => handleNChange4(e, "status4")}
                  >
                    <option value="" defaultValue>
                      pilih status
                    </option>
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
                    value={calculateTotalNilai4(
                      formData4.luasRuangPerMahasiswa,
                      formData4.status4
                    )}
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
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Kriteria Penilaian
              </Typography>
              <hr />
              <div className="d-flex">
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Luas total rencana ruang perpustakaan (m2) (gunakan data Butir
                  3.3.1)
                </Typography>
                <div className=" ms-auto">
                  <input
                    onKeyDown={(e) => {
                      const allowedCharacters = /^[0-9,.]+$/;

                      if (
                        !allowedCharacters.test(e.key) &&
                        e.key.length === 1
                      ) {
                        e.preventDefault();
                      }
                    }}
                    type="text"
                    className="form-control"
                    value={formData9.ltrp}
                    onChange={(e) => handleNChange9(e, "ltrp")}
                  />
                  {!formData9.ltrp &&
                    !data?.asesorProgramStudis?.questions?.form2?.[4]
                      ?.additionalFields?.ltrp && (
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
                    value={calculateTotalNilai5(formData9.ltrp) || 0}
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
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
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
                        data.asesorProgramStudis.questions.form2[6]
                          ?.additionalFields2?.ltrk6) ||
                      ""
                    }
                    onChange={(e) => handleNChange6(e, "ltrk6")}
                  />
                  {!formData6.ltrk6 &&
                    !data?.asesorProgramStudis?.questions?.form2?.[6]
                      ?.additionalFields2?.ltrk6 && (
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
                        data.asesorProgramStudis.questions.form2[6]
                          ?.additionalFields2?.lt6) ||
                      ""
                    }
                    onChange={(e) => handleNChange6(e, "lt6")}
                  />
                  {!formData6.lt6 &&
                    !data?.asesorProgramStudis?.questions?.form2?.[6]
                      ?.additionalFields2?.lt6 && (
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
                        data.asesorProgramStudis.questions.form2[6]
                          ?.additionalFields2?.status6) ||
                      ""
                    }
                    onChange={(e) => handleNChange6(e, "status6")}
                  >
                    <option value="" defaultValue>
                      pilih status
                    </option>
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
                  onClick={handleClose15}
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
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
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
                        data.asesorProgramStudis.questions.form2[7]
                          ?.additionalFields2?.ltrk7) ||
                      ""
                    }
                    onChange={(e) => handleNChange7(e, "ltrk7")}
                  />
                  {!formData7.ltrk7 &&
                    !data?.asesorProgramStudis?.questions?.form2?.[7]
                      ?.additionalFields2?.ltrk7 && (
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
                        data.asesorProgramStudis.questions.form2[7]
                          ?.additionalFields2?.lt7) ||
                      ""
                    }
                    onChange={(e) => handleNChange7(e, "lt7")}
                  />
                  {!formData7.lt7 &&
                    !data?.asesorProgramStudis?.questions?.form2?.[7]
                      ?.additionalFields2?.lt7 && (
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
                      formData7.status7 ||
                      (data?.asesorProgramStudis?.questions &&
                        data.asesorProgramStudis.questions.form2 &&
                        data.asesorProgramStudis.questions.form2[7]
                          ?.additionalFields2?.status7) ||
                      ""
                    }
                    onChange={(e) => handleNChange7(e, "status7")}
                  >
                    <option value="" defaultValue>
                      pilih status
                    </option>
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
                  onClick={handleClose15}
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
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
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
                        data.asesorProgramStudis.questions.form2[8]
                          ?.additionalFields2?.ltrk8) ||
                      ""
                    }
                    onChange={(e) => handleNChange8(e, "ltrk8")}
                  />
                  {!formData8.ltrk8 &&
                    !data?.asesorProgramStudis?.questions?.form2?.[8]
                      ?.additionalFields2?.ltrk8 && (
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
                        data.asesorProgramStudis.questions.form2[8]
                          ?.additionalFields2?.lt8) ||
                      ""
                    }
                    onChange={(e) => handleNChange8(e, "lt8")}
                  />
                  {!formData8.lt8 &&
                    !data?.asesorProgramStudis?.questions?.form2?.[8]
                      ?.additionalFields2?.lt8 && (
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
                      formData8.status8 ||
                      (data?.asesorProgramStudis?.questions &&
                        data.asesorProgramStudis.questions.form2 &&
                        data.asesorProgramStudis.questions.form2[8]
                          ?.additionalFields2?.status8) ||
                      ""
                    }
                    onChange={(e) => handleNChange8(e, "status8")}
                  >
                    <option value="" defaultValue>
                      pilih status
                    </option>
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
                  onClick={handleClose15}
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
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Kriteria Penilaian
              </Typography>
              <hr />
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  4 Memiliki ruang belajar mandiri lebih dari 4m2/mahasiswa,
                  milik sendiri, dilengkapi perabot kantor dan internet
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  3 Memiliki ruang belajar mandiri dengan luasan 4 m2/mahasiswa
                  dan milik sendiri atau dengan luasan lebih dari 4m2/mahasiswa,
                  berstatus SW (sewa, kontrak, atau kerjasama), dan dilengkapi
                  perabot kantor dan internet
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  2 Memiliki ruang belajar mandiri minimal 4m2/mahasiswa,
                  berstatus SW (sewa, kontrak, atau kerjasama), dan dilengkapi
                  perabot kantor dan internet
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  1 Tidak memiliki ruang belajar mandiri
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info"> 0 Tidak ada datanya</Alert>
              </Typography>
              <hr />
              <div className="mt-3 justify-content-end d-flex">
                <Button
                  variant="outlined"
                  size="medium"
                  sx={{ marginLeft: "auto", display: "flex" }}
                  onClick={handleClose10}
                >
                  Tutup
                </Button>
              </div>
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
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Kriteria Penilaian
              </Typography>
              <hr />
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  4 Setiap mata kuliah berpraktikum/berpraktek telah disediakan
                  ruang akademik khusus tersendiri dengan luasan yang melebihi
                  kapasitas ( 1.5 m2 per mahasiswa, 25 orang mahasiswa per
                  ruang) dan berstatus milik sendiri
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  3 Setiap mata kuliah berpraktikum/berpraktek telah disediakan
                  ruang akademik khusus tersendiri dengan luasan yang melebihi
                  kapasitas ( 1.5 m2 per mahasiswa, 25 orang mahasiswa per
                  ruang) dan berstatus SW (sewa/kontrak/kerja sama)
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
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
                <Alert severity="info"> 0 Tidak ada datanya</Alert>
              </Typography>
              <hr />
              <div className="mt-3 justify-content-end d-flex">
                <Button
                  variant="outlined"
                  size="medium"
                  sx={{ marginLeft: "auto", display: "flex" }}
                  onClick={handleClose11}
                >
                  Tutup
                </Button>
              </div>
            </Box>
          </Modal>

          {/* Modal 3.3.4*/}
          <Modal
            open={open16}
            onClose={handleClose16}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Kriteria Penilaian
              </Typography>
              <hr />
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  4 Ada beberapa perpustakaan di luar PT yang dapat diakses dan
                  sangat baik fasilitasnya
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  3 Ada perpustakaan di luar PT yang dapat diakses dan baik
                  fasilitasnya.
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  2 Ada perpustakaan di luar PT yang dapat diakses dan cukup
                  baik fasilitasnya.
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  1 Ada perpustakaan di luar PT yang dapat diakses dan kurang
                  baik fasilitasnya.
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  0 Tidak ada perpustakaan di luar PT yang dapat diakses.
                </Alert>
              </Typography>
              <hr />
              <div className="mt-3 justify-content-end d-flex">
                <Button
                  variant="outlined"
                  size="medium"
                  sx={{ marginLeft: "auto", display: "flex" }}
                  onClick={handleClose16}
                >
                  Tutup
                </Button>
              </div>
            </Box>
          </Modal>

          {/* Modal 3.4*/}
          <Modal
            open={open17}
            onClose={handleClose17}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Kriteria Penilaian
              </Typography>
              <hr />
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  4 Jika jumlah tenaga kependidikan lebih dari 3 (tiga) orang
                  dan salah satu diantaranya berkualifikasi magister dan 1
                  (satu) orang pustakawan ditingkat perguruan tinggi dengan
                  kualifikasi Diploma Tiga perpustakaan atau yang sejenis
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  3 Jika jumlah tenaga kependidikan lebih dari 2 (dua) orang
                  atau berkualifikasi sarjana atau sarjana terapan dan 1 (satu)
                  orang pustakawan ditingkat perguruan tinggi dengan kualifikasi
                  Diploma Tiga perpustakaan atau yang sejenis
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  2 Jika jumlah tenaga kependidikan 2 (dua) orang atau lebih
                  dengan kualifikasi Diploma Tiga dan 1 (satu) orang pustakawan
                  ditingkat perguruan tinggi dengan kualifikasi Diploma Tiga
                  perpustakaan atau yang sejenis
                </Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info"> 1 Tidak ada nilai 1</Alert>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Alert severity="info">
                  {" "}
                  0 Jumlah dan kualifikasi tenaga kependidikan tidak memenuhi
                  persyaratan
                </Alert>
              </Typography>
              <hr />
              <div className="mt-3 justify-content-end d-flex">
                <Button
                  variant="outlined"
                  size="medium"
                  sx={{ marginLeft: "auto", display: "flex" }}
                  onClick={handleClose17}
                >
                  Tutup
                </Button>
              </div>
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
              <Typography sx={{ textAlign: "center", marginBottom: "10px" }}>
                Kembalikan Request Prodi Ke PTKI ?
              </Typography>
              <div className="d-flex m-auto justify-content-center">
                <Button
                  variant="contained"
                  size="small"
                  style={{ marginRight: "10px" }}
                >
                  Iya
                </Button>
                <Button onClick={handleClose34} variant="outlined" size="small">
                  Tidak
                </Button>
              </div>
            </Box>
          </Modal>
        </div>
      </motion.div>
    </div>
  );
};

export default CardPenilaian;
