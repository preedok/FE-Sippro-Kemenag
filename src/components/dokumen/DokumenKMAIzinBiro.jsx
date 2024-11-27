import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Box,
  Grid,
  Button,
  Tabs,
  Tab,
  Modal,
} from "@mui/material";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import garuda from "../../assets/garuda.png";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../views/service/api";
import { getToken } from "../../utils/token";
import style from "../../views/home/style.module.css";
const DokumenKMAIzin = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(0);
  const dummyFiles = [
    "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", // Sample PDF 1
    "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", // Sample PDF 2
    "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", // Sample PDF 3
  ];
  const handleViewFile = (index) => {
    setPdfFile(dummyFiles[index]); // Set the dummy PDF file URL
    setOpenModal(true); // Open the modal
};
  const [openModal, setOpenModal] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  const [formData, setFormData] = useState({
    namaProdi: "",
    jenjang: "",
    lembaga: "",
    judulSuratAkreditasi: "",
    nomorSuratAkreditasi: "",
    tanggalAkreditasi: "",
    namaLembagaAkreditasi: "",
    namaDirektur: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const renderDocument = () => {
    return (
      <Box
        sx={{
          typography: "body1",
          minHeight: "297mm",
          padding: "20mm",
          margin: "auto",
          backgroundColor: "white",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          maxHeight: "calc(120vh - 2rem)",
          overflow: "auto",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <img
            src={garuda}
            alt="Garuda Pancasila"
            style={{ width: "70px", height: "75px" }}
          />
        </Box>
        <Typography variant="h6" align="center" sx={{ fontWeight: "bold" }}>
          KEPUTUSAN MENTERI AGAMA REPUBLIK INDONESIA
        </Typography>
        <Typography variant="h6" align="center" sx={{ fontWeight: "bold" }}>
          NOMOR TAHUN 2024
        </Typography>
        <Typography variant="h6" align="center" sx={{ fontWeight: "bold" }}>
          TENTANG
        </Typography>
        <Typography variant="h6" align="center" sx={{ fontWeight: "bold" }}>
          IZIN PENYELENGGARAAN PROGRAM STUDI
        </Typography>
        <Typography variant="h6" align="center" sx={{ fontWeight: "bold" }}>
          {" "}
          <span style={{ background: "yellow" }}>
            {formData.namaProdi || "[NAMA PRODI]"}
          </span>{" "}
          UNTUK PROGRAM{" "}
          <span style={{ background: "yellow" }}>
            {formData.jenjang || "[JENJANG]"}
          </span>
        </Typography>
        <Typography variant="h6" align="center" sx={{ fontWeight: "bold" }}>
          PADA{" "}
          <span style={{ background: "yellow" }}>
            {formData.lembaga || "[LEMBAGA]"}
          </span>
        </Typography>

        <Typography variant="h6" align="center" sx={{ fontWeight: "bold" }}>
          DENGAN RAHMAT TUHAN YANG MAHA ESA
        </Typography>
        <Typography variant="h6" align="center" sx={{ fontWeight: "bold" }}>
          MENTERI AGAMA REPUBLIK INDONESIA,
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          <strong>Menimbang :</strong>
        </Typography>
        <Box component="ol" sx={{ listStyleType: "lower-alpha", pl: 4, mb: 4 }}>
          <li>
            bahwa untuk menyelenggarakan program studi pada rumpun ilmu agama,
            wajib memperoleh izin penyelenggaraan program studi dari Menteri
            Agama;
          </li>
          <li>
            bahwa{" "}
            <span style={{ background: "yellow" }}>
              {formData.lembaga || "[Lembaga]"}
            </span>{" "}
            telah memenuhi syarat untuk menyelenggarakan Program Studi{" "}
            <span style={{ background: "yellow" }}>
              {formData.namaProdi || "[Nama Prodi]"}
            </span>{" "}
            untuk Program{" "}
            <span style={{ background: "yellow" }}>
              {formData.jenjang || "[Jenjang]"}{" "}
            </span>{" "}
            berdasarkan Surat{" "}
            <span style={{ background: "yellow" }}>
              {formData.judulSuratAkreditasi || "[Judul Surat Akreditasi]"}
            </span>{" "}
            Nomor{" "}
            <span style={{ background: "yellow" }}>
              {formData.nomorSuratAkreditasi || "[Nomor Surat Akreditasi]"}
            </span>{" "}
            tanggal{" "}
            <span style={{ background: "yellow" }}>
              {formData.tanggalAkreditasi || "[Tanggal Akreditasi]"}
            </span>{" "}
            tentang Pemenuhan Syarat Minimum Akreditasi dalam Pembukaan Program
            Studi;
          </li>
          <li>
            bahwa berdasarkan pertimbangan sebagaimana dimaksud dalam huruf a
            dan huruf b, perlu menetapkan Keputusan Menteri Agama tentang Izin
            Penyelenggaraan Program Studi{" "}
            <span style={{ background: "yellow" }}>
              {formData.namaProdi || "[Nama Prodi]"}
            </span>{" "}
            untuk Program{" "}
            <span style={{ background: "yellow" }}>
              {formData.jenjang || "[Jenjang]"}
            </span>{" "}
            pada{" "}
            <span style={{ background: "yellow" }}>
              {formData.lembaga || "[Lembaga]"}
            </span>
            ;
          </li>
        </Box>

        <Typography variant="body1" sx={{ mb: 2 }}>
          <strong>Mengingat :</strong>
        </Typography>
        <Box component="ol" sx={{ pl: 4, mb: 4 }}>
          <li>
            Undang-Undang Nomor 12 Tahun 2012 tentang Pendidikan Tinggi
            (Lembaran Negara Republik Indonesia Tahun 2012 Nomor 158, Tambahan
            Lembaran Negara Republik Indonesia Nomor 5336);
          </li>
          <li>
            Peraturan Pemerintah Nomor 46 Tahun 2019 tentang Pendidikan Tinggi
            Kegamaan (Lembaran Negara Republik Indonesia Tahun 2019 Nomor 120,
            Tambahan Lembaran Negara Republik Indonesia Nomor 6362);
          </li>
          <li>
            Peraturan Presiden Nomor 12 Tahun 2023 tentang Kementerian Agama
            (Lembaran Negara Republik Indonesia Tahun 2023 Nomor 21);
          </li>
          <li>
            Peraturan Menteri Agama Nomor 72 Tahun 2022 tentang Organisasi dan
            Tata Kerja Kementerian Agama (Berita Negara Republik Indonesia Tahun
            2022 Nomor 955);
          </li>
          <li>
            Peraturan Menteri Agama Nomor 17 Tahun 2023 tentang Tata Cara
            Pemberian Izin Penyelenggaraan Program Studi dalam Rumpun Ilmu Agama
            (Berita Negara Republik Indonesia Tahun 2023 Nomor 1012);
          </li>
          <li>
            Keputusan Menteri Agama Nomor 387 Tahun 2004 tentang Petunjuk
            Pelaksanaan Pembukaan Program Studi pada Perguruan Tinggi Keagamaan
            Islam;
          </li>
          <li>
            Keputusan Menteri Agama Nomor 244 Tahun 2019 tentang Pemberian
            Mandat kepada Direktur Jenderal yang Menyelenggarakan Pendidikan
            untuk dan Atas Nama Menteri Agama Menandatangani Izin
            Penyelenggaraan Program Studi pada Perguruan Tinggi Keagamaan;
          </li>
        </Box>

        <Typography
          variant="body1"
          align="center"
          sx={{ mb: 2, fontWeight: "bold" }}
        >
          MEMUTUSKAN:
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          <strong>
            Menetapkan : KEPUTUSAN MENTERI AGAMA TENTANG IZIN PENYELENGGARAAN
            PROGRAM STUDI{" "}
            <span style={{ background: "yellow" }}>
              {formData.namaProdi || "[NAMA PRODI]"}
            </span>{" "}
            UNTUK PROGRAM{" "}
            <span style={{ background: "yellow" }}>
              {formData.jenjang || "[JENJANG]"}
            </span>{" "}
            PADA{" "}
            <span style={{ background: "yellow" }}>
              {formData.lembaga || "[LEMBAGA]"}
            </span>
            .
          </strong>
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          <strong>KESATU :</strong> Memberikan Izin Penyelenggaraan Program
          Studi{" "}
          <span style={{ background: "yellow" }}>
            {formData.namaProdi || "[Nama Prodi]"}
          </span>{" "}
          untuk Program{" "}
          <span style={{ background: "yellow" }}>
            {formData.jenjang || "[Jenjang]"}
          </span>{" "}
          pada{" "}
          <span style={{ background: "yellow" }}>
            {formData.lembaga || "[Lembaga]"}
          </span>
          .
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          <strong>KEDUA :</strong> Dalam Penyelenggaraan Program Studi
          sebagaimana dimaksud dalam Diktum KESATU, pengelola Program Studi
          wajib:
        </Typography>
        <Box component="ol" sx={{ listStyleType: "lower-alpha", pl: 4, mb: 4 }}>
          <li>
            memenuhi persyaratan 5 (lima) dosen <i>homebase</i> dan program
            studi tercatat pada Pangkalan Data Pendidikan Tinggi;
          </li>
          <li>
            mengajukan usulan Terakreditasi Sementara untuk program studi baru
            ke{" "}
            <span style={{ background: "yellow" }}>
              {formData.namaLembagaAkreditasi || "[Nama Lembaga Akreditasi]"}
            </span>{" "}
            paling lambat 6 (enam) bulan sejak Keputusan Menteri Agama ini mulai
            berlaku;
          </li>
          <li>
            mengajukan akreditasi pertama paling lambat 9 (sembilan) bulan
            sebelum masa Terakreditasi Sementara berakhir; dan
          </li>
          <li>
            menyesuaikan data setiap tahun dan melaporkan kepada Direktur
            Jenderal Pendidikan Islam melalui Pangkalan Data Pendidikan Tinggi
            paling lambat setiap 1 (satu) bulan setelah akhir semester.
          </li>
        </Box>

        <Typography variant="body1" sx={{ mb: 4 }}>
          <strong>KETIGA :</strong> Dalam hal{" "}
          <span style={{ background: "yellow" }}>
            {formData.lembaga || "[Lembaga]"}
          </span>{" "}
          tidak melaksanakan kewajiban sebagaimana dimaksud dalam Diktum KEDUA,
          akan dikenai sanksi administratif sesuai dengan ketentuan peraturan
          perundang-undangan.
        </Typography>

        <Typography variant="body1" sx={{ mb: 4 }}>
          <strong>KEEMPAT :</strong> Keputusan ini mulai berlaku pada tanggal
          ditetapkan.
        </Typography>

        <Box sx={{ textAlign: "right", mt: 4 }}>
          <Typography variant="body1">Ditetapkan di Jakarta</Typography>
          <Typography variant="body1">pada tanggal</Typography>
          <Typography variant="body1">
            a.n. MENTERI AGAMA REPUBLIK INDONESIA
          </Typography>
          <Typography variant="body1">
            DIREKTUR JENDERAL PENDIDIKAN ISLAM,
          </Typography>
          <Typography
            variant="body1"
            sx={{ mt: 8, textDecoration: "underline" }}
          >
            {" "}
            <span style={{ background: "yellow" }}>
              {formData.namaDirektur || "[NAMA DIREKTUR]"}
            </span>
          </Typography>
        </Box>
      </Box>
    );
  };

  const fetchData = async () => {
    try {
      const token = getToken();
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await api.get(`/prodi-assesment/${id}`, config);
      const data = response.data.data[0];
      setFormData((prevState) => ({
        ...prevState,
        namaProdi: data.namaProdi || "",
        jenjang: data.jenjang || "",
        lembaga: data.lembaga || "",
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const disabledFields = ["namaProdi", "jenjang", "lembaga"];
  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);
  return (
    <section
      className={`${style.backgroundRow} px-5`}
      style={{ height: "auto" }}
    >
      <div style={{ paddingTop: "8rem", paddingBottom: "1rem" }}>
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab style={{ fontWeight: "800" }} label="Isi Form" />
          <Tab style={{ fontWeight: "800" }} label="Konfirmasi" />
        </Tabs>
      </div>
      {activeTab === 0 && (
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Form Input
              </Typography>
              <Box component="form" sx={{ "& .MuiTextField-root": { my: 1 } }}>
                {Object.entries(formData).map(([key, value]) => (
                  <TextField
                    key={key}
                    fullWidth
                    label={
                      key.charAt(0).toUpperCase() +
                      key
                        .slice(1)
                        .replace(/([A-Z])/g, " $1")
                        .trim()
                    }
                    name={key}
                    value={value}
                    onChange={handleInputChange}
                    variant="outlined"
                    disabled={disabledFields.includes(key)}
                  />
                ))}
                <Button variant="contained" className="my-3">
                  Simpan
                </Button>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            {renderDocument()}
          </Grid>
        </Grid>
      )}
      {activeTab === 1 && (
        <Paper
          elevation={3}
          sx={{
            p: 3,
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "60vh",
          }}
        >
          <Grid
            container
            spacing={3}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Upload Dokumen
              </Typography>
            </Grid>
            <Grid className="d-flex gap-2" xz={12}>
              <Grid textAlign="center">
                <Button
                  variant="contained"
                  onClick={() => handleViewFile(0)} // View dummy file 1
                  fullWidth
                  sx={{ py: 2, fontSize: "16px" }}
                >
                  Lihat File 1
                </Button>
              </Grid>
              <Grid textAlign="center">
                <Button
                  variant="contained"
                  onClick={() => handleViewFile(1)} // View dummy file 1
                  fullWidth
                  sx={{ py: 2, fontSize: "16px" }}
                >
                  Lihat File 2
                </Button>
              </Grid>
              <Grid textAlign="center">
                <Button
                  variant="contained"
                  onClick={() => handleViewFile(2)} // View dummy file 1
                  fullWidth
                  sx={{ py: 2, fontSize: "16px" }}
                >
                  Lihat File 3
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="success"
                sx={{ fontSize: "16px", width: "26%" }}
              >
                Konfirmasi
              </Button>
            </Grid>
          </Grid>
        </Paper>
      )}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            width: "80%",
            height: "80%",
            margin: "auto",
            mt: "5%",
            backgroundColor: "white",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <Worker
            workerUrl={`https://unpkg.com/pdfjs-dist/build/pdf.worker.min.js`}
          >
            <Viewer fileUrl={pdfFile} plugins={[defaultLayoutPluginInstance]} />
          </Worker>
        </Box>
      </Modal>
    </section>
  );
};

export default DokumenKMAIzin;
