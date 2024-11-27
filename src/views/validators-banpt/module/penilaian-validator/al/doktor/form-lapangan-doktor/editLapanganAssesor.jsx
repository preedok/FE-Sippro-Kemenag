import React, { useState, useEffect, useRef } from "react";
import "../../../../../../../views/ptki/admin.css";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { getToken, getUserId, getRole } from "../../../../../../../utils/token";
import api from "../../../../../../service/api";
import Swal from "sweetalert2";
import { css } from '@emotion/react';
import { useDarkMode } from "../../../../../../../utils/DarkModeContext";
import TextField from '@mui/material/TextField';
import Modal from "@mui/material/Modal";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [data, setData] = useState({
    asesorALProgramStudis: {
      questions: {
        form: [],
        kesimpulan: []
      }
    }
  });
  const token = getToken()
  const getData = async () => {
    const programStudiId = localStorage.getItem("programStudiId");
    const asesorId = getUserId();
    try {
      const response = await api.get(`/prodi-assesment-al/${programStudiId}/${asesorId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const responseData = response?.data?.data || {};
      const defaultQuestions = {
        form: [
          { code: "AI", question: "Akreditasi Institusi", nilai: "", note: "" },
          { code: "APSL", question: "Akreditasi Program Studi Linear", nilai: "", note: "" },
          { code: "KDT", question: "Kesiapan Dosen tetap (Khusus S2: Kesediaan minimal 2 Guru Besar)", nilai: "", note: "" },
          { code: "KTP", question: "Kesiapan Tenaga Pendidik", nilai: "", note: "" },
          { code: "KP", question: "Kesiapan Pengelola", nilai: "", note: "" },
          { code: "K", question: "Kurikulum", nilai: "", note: "" },
          { code: "S", question: "SPMI", nilai: "", note: "" },
          { code: "SP", question: "Sarana dan Prasarana", nilai: "", note: "" },
        ],
        kesimpulan: [
          { code: "TRDS", question: "Diterima/Direkomendasikan", nilai: "", note: "" },
          { code: "DSMSP", question: "Direkomendasikan setelah melengkapi syarat-syarat", nilai: "", note: "" },
          { code: "TDKTMSP", question: "Tidak Diterima/ditolak", nilai: "", note: "" },
          // { code: "NM", question: responseData?.asesorALProgramStudis?.asesorFullName || "", nilai: "", note: "" },
        ]
      };

      const questions = responseData?.asesorALProgramStudis?.questions || defaultQuestions;

      // Ensure 'form' and 'kesimpulan' properties exist
      questions.form = questions.form || defaultQuestions.form;
      questions.kesimpulan = questions.kesimpulan || defaultQuestions.kesimpulan;

      // Ensure the correct codes are used
      questions.form = questions.form.map((q, index) => ({
        ...q,
        code: defaultQuestions.form[index].code
      }));

      questions.kesimpulan = questions.kesimpulan.map((q, index) => ({
        ...q,
        code: defaultQuestions.kesimpulan[index].code
      }));

      setData({
        ...responseData,
        asesorALProgramStudis: {
          ...responseData.asesorALProgramStudis,
          questions
        }
      });
      console.log('Data after fetching:', responseData);
    } catch (error) {
      console.error('Error fetching data:', error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `${error.message}`,
      });
    }
  };

  useEffect(() => {
    getData();
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
  const [validationErrors, setValidationErrors] = useState({});
  const handleInputChange = (e, index, propName) => {
    const newData = { ...data };
    const questions = [...newData.asesorALProgramStudis?.questions?.form || []];
    if (!questions[index]) {
      questions[index] = {};
    }
    questions[index][propName] = e.target.value;
    setData({
      ...newData,
      asesorALProgramStudis: {
        ...newData.asesorALProgramStudis,
        questions: {
          ...newData.asesorALProgramStudis.questions,
          form: questions
        }
      }
    });
  };

  const handleInputChangeNote = (e, index, propName) => {
    const newData = { ...data };
    const questions = [...newData.asesorALProgramStudis?.questions?.kesimpulan || []];

    // Ensure the index exists in the questions array
    if (!questions[index]) {
      questions[index] = {};
    }

    // Update the specific property
    questions[index][propName] = e.target.value;

    // Update the state with new data
    setData({
      ...newData,
      asesorALProgramStudis: {
        ...newData.asesorALProgramStudis,
        questions: {
          ...newData.asesorALProgramStudis.questions,
          kesimpulan: questions
        }
      }
    });
  };
  const validateForm = () => validateQuestions('form');
  const validateFormDraft = () => validateQuestions('form');
  const validateQuestions = (type) => {
    const errors = {};
    const questions = data?.asesorALProgramStudis?.questions?.[type] || [];

    questions.forEach((item, index) => {
      if (!item.nilai?.trim()) {
        errors[`nilai${index + 1}`] = 'Bidang ini wajib diisi';
      }
      if (!item.note?.trim()) {
        errors[`note${index + 1}`] = 'Bidang ini wajib diisi';
      }
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const defaultQuestions = [
    { code: "AI", question: "Akreditasi Institusi", nilai: "", note: "" },
    { code: "APSL", question: "Akreditasi Program Studi Linear", nilai: "", note: "" },
    { code: "KDT", question: "Kesiapan Dosen tetap (Khusus S2: Kesediaan minimal 2 Guru Besar)", nilai: "", note: "" },
    { code: "KTP", question: "Kesiapan Tenaga Pendidik", nilai: "", note: "" },
    { code: "KP", question: "Kesiapan Pengelola", nilai: "", note: "" },
    { code: "K", question: "Kurikulum", nilai: "", note: "" },
    { code: "S", question: "SPMI", nilai: "", note: "" },
    { code: "SP", question: "Sarana dan Prasarana", nilai: "", note: "" },
  ];

  const defaultKesimpulan = [
    { code: "TRDS", question: "Diterima/Direkomendasikan", nilai: "", note: "" },
    { code: "DSMSP", question: "Direkomendasikan setelah melengkapi syarat-syarat", nilai: "", note: "" },
    { code: "TDKTMSP", question: "Tidak Diterima/ditolak", nilai: "", note: "" },
  ];
  const renderTableRows = () => {
    const questions = Array.isArray(
      data?.asesorALProgramStudis?.questions?.form
    )
      ? data.asesorALProgramStudis.questions.form
      : [];

    const questionsToRender =
      questions.length === 0 ? defaultQuestions : questions;

    return questionsToRender.map((item, index) => (
      <TableRow key={index}>
        <TableCell style={{ color: darkMode ? "white" : "" }}>
          {index + 1}
        </TableCell>
        <TableCell style={{ color: darkMode ? "white" : "" }}>
          {item.question}
        </TableCell>
        <TableCell>
          <textarea
            value={item.nilai || ""}
            onChange={(e) => handleInputChange(e, index, "nilai")}
            className={`px-2 py-2 form-control`}
            style={{ height: "139px", width: "200px", marginLeft: "auto" }}
          />
        </TableCell>
        <TableCell>
          <textarea
            value={item.nilai || ""}
            onChange={(e) => handleInputChange(e, index, "nilai")}
            className={`px-2 py-2 form-control`}
            style={{ height: "139px", width: "200px", marginLeft: "auto" }}
          />
        </TableCell>
        <TableCell>
          <textarea
            value={item.note || ""}
            onChange={(e) => handleInputChange(e, index, "note")}
            className={`px-2 py-2 form-control`}
            style={{ height: "139px", width: "200px", marginLeft: "auto" }}
          />
        </TableCell>
        <TableCell>
          <textarea
            value={item.note || ""}
            onChange={(e) => handleInputChange(e, index, "note")}
            className={`px-2 py-2 form-control`}
            style={{ height: "139px", width: "200px", marginLeft: "auto" }}
          />
        </TableCell>
        <TableCell>
          <FormControlLabel
            control={
              <Switch
                checked={checkedStates[index]}
                onChange={handleSwitchChange(index)}
                sx={{
                  "& .MuiSwitch-thumb": {
                    bgcolor: checkedStates[index] ? "green" : "red",
                  },
                  "& .MuiSwitch-track": {
                    bgcolor: checkedStates[index] ? "lightgreen" : "lightcoral",
                  },
                }}
              />
            }
            label={checkedStates[index] ? "Sesuai" : "Tidak Sesuai"}
            labelPlacement="end"
          />
        </TableCell>
      </TableRow>
    ));
  };
  const renderTableRows2 = () => {
    const kesimpulan = Array.isArray(data?.asesorALProgramStudis?.kesimpulan)
      ? data.asesorALProgramStudis.kesimpulan
      : [];

    const kesimpulanToRender =
      kesimpulan.length === 0 ? defaultKesimpulan : kesimpulan;

    return kesimpulanToRender.map((item, index) => (
      <TableRow key={index}>
        <TableCell style={{ color: darkMode ? "white" : "" }}>
          {index + 1}
        </TableCell>
        <TableCell style={{ color: darkMode ? "white" : "" }}>
          {item.question}
        </TableCell>
        <TableCell>
          <textarea
            value={item.nilai || ""}
            onChange={(e) => handleInputChange(e, index, "nilaiKesimpulan")}
            className={`px-2 py-2 form-control`}
            style={{ height: "100px", width: "500px", marginLeft: "auto" }}
          />
        </TableCell>
        <TableCell>
          <textarea
            value={item.note || ""}
            onChange={(e) => handleInputChange(e, index, "noteKesimpulan")}
            className={`px-2 py-2 form-control`}
            style={{ height: "100px", width: "500px", marginLeft: "auto" }}
          />
        </TableCell>
        <TableCell>
          <FormControlLabel
            control={
              <Switch
                checked={checkedStates[index]}
                onChange={handleSwitchChange(index)}
                sx={{
                  "& .MuiSwitch -thumb": {
                    bgcolor: checkedStates[index] ? "green" : "red",
                  },
                  "& .MuiSwitch-track": {
                    bgcolor: checkedStates[index] ? "lightgreen" : "lightcoral",
                  },
                }}
              />
            }
            label={checkedStates[index] ? "Sesuai" : "Tidak Sesuai"}
            labelPlacement="end"
          />
        </TableCell>
      </TableRow>
    ));
  };
  const renderTableRows3 = () => {
    const rows = [
      {
        name: data?.asesorALProgramStudis?.asesorFullName,
        ttdImageUrl: ttdImageUrl,
        index: 0,
      },
      {
        name: data?.asesorALProgramStudis?.asesorFullName,
        ttdImageUrl: ttdImageUrl,
        index: 1,
      },
    ];

    return rows.map((row, index) => (
      <TableRow key={index}>
        <TableCell
          className="text-center"
          style={{ color: darkMode ? "white" : "" }}
        >
          {row.name}
        </TableCell>
        <TableCell
          style={{ color: darkMode ? "white" : "", justifyContent: "center" }}
        >
          {row.ttdImageUrl ? (
            <div className="mt-2 ms-auto d-flex justify-content-center">
              <img
                src={row.ttdImageUrl}
                alt="TTD"
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              />
            </div>
          ) : (
            <div className="mt-2 d-flex m-auto align-items-center" role="alert">
              <div>Tanda tangan tidak tersedia</div>
            </div>
          )}
        </TableCell>
        <TableCell
          className="text-center"
          style={{ color: darkMode ? "white" : "" }}
        >
          {row.name}
        </TableCell>
        <TableCell
          style={{ color: darkMode ? "white" : "", justifyContent: "center" }}
        >
          {row.ttdImageUrl ? (
            <div className="mt-2 ms-auto d-flex justify-content-center">
              <img
                src={row.ttdImageUrl}
                alt="TTD"
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              />
            </div>
          ) : (
            <div className="mt-2 d-flex m-auto align-items-center" role="alert">
              <div>Tanda tangan tidak tersedia</div>
            </div>
          )}
        </TableCell>
        <TableCell>
          <FormControlLabel
            control={
              <Switch
                checked={checkedStates[index]}
                onChange={handleSwitchChange(index)}
                sx={{
                  "& .MuiSwitch-thumb": {
                    bgcolor: checkedStates[index] ? "green" : "red",
                  },
                  "& .MuiSwitch-track": {
                    bgcolor: checkedStates[index] ? "lightgreen" : "lightcoral",
                  },
                }}
              />
            }
            label={checkedStates[index] ? "Sesuai" : "Tidak Sesuai"}
            labelPlacement="end"
          />
        </TableCell>
      </TableRow>
    ));
  };
  // get ttd
  const [ttdImageUrl, setTtdImageUrl] = useState(null);
  const fetchTtdImage = async () => {
    try {
      const response = await api.get("/auth/asesor-ttd", {
        headers: { Authorization: `Bearer ${token}` },
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
  }, [])
  const handlePutRequest = async () => {
    const programStudiId = localStorage.getItem("programStudiId");
    const asesorId = getUserId()
    if (!validateForm()) {
      Swal.fire({
        icon: 'error',
        title: 'Kesalahan Validasi',
        text: 'Mohon isi semua bidang yang diperlukan',
      });
      return;
    }
    const uupsValue = data?.statusSwasta === 1 ? 'Negeri' : 'Swasta';
    const payload = {
      asesorId: parseInt(asesorId),
      programStudiId: parseInt(programStudiId),
      selected: true,
      role: data?.asesorALProgramStudis?.role || '',
      assesmentSkNo: data?.asesorALProgramStudis?.assesmentSkNo || '',
      asesorFullName: data?.asesorALProgramStudis?.asesorFullName || '',
      asesorEmail: data?.asesorALProgramStudis?.asesorEmail || '',
      asesorMobileNumber: data?.asesorALProgramStudis?.asesorMobileNumber || '',
      assesmentAssignedTime: data?.asesorALProgramStudis?.assesmentAssignedTime || new Date().toISOString(),
      statusStr: "Draft",
      status: 223,
      assesmentDurationInDays: data?.asesorALProgramStudis?.assesmentDurationInDays || 0,
      assesmentAtLocationTime: new Date().toISOString(),
      questions: data?.asesorALProgramStudis?.questions || {
        form: [],
        kesimpulan: []
      },
      asesorEvaluator: data?.asesorALProgramStudis?.asesorEvaluator || '',
      asesorPtAsal: data?.lembaga || '',
      asesorProdiAsal: data?.namaProdi || '',
      asesorProdiAkreditasi: data?.asesorALProgramStudis?.asesorProdiAkreditasi || '',
      uups: uupsValue || '',
      presenter: data?.asesorALProgramStudis?.asesorFullName || '',
      komentar: "Draft saved",
    };


    try {
      await api.put('/prodi-assesment-al/assesment/lapangan', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Data berhasil disimpan',
      });
      getData();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: error.message,
      });
    }
  };
  const handlePutRequestDraf = async () => {
    const programStudiId = localStorage.getItem("programStudiId");
    const asesorId = getUserId();

    if (!validateFormDraft()) {
      Swal.fire({
        icon: 'error',
        title: 'Kesalahan Validasi',
        text: 'Mohon isi semua bidang yang diperlukan',
      });
      return;
    }
    const uupsValue = data?.statusSwasta === 1 ? 'Negeri' : 'Swasta';
    const payload = {
      asesorId: parseInt(asesorId),
      programStudiId: parseInt(programStudiId),
      selected: true,
      role: data?.asesorALProgramStudis?.role || '',
      assesmentSkNo: data?.asesorALProgramStudis?.assesmentSkNo || '',
      asesorFullName: data?.asesorALProgramStudis?.asesorFullName || '',
      asesorEmail: data?.asesorALProgramStudis?.asesorEmail || '',
      asesorMobileNumber: data?.asesorALProgramStudis?.asesorMobileNumber || '',
      assesmentAssignedTime: data?.asesorALProgramStudis?.assesmentAssignedTime || new Date().toISOString(),
      statusStr: "Draft",
      status: 222,
      assesmentDurationInDays: data?.asesorALProgramStudis?.assesmentDurationInDays || 0,
      assesmentAtLocationTime: new Date().toISOString(),
      questions: data?.asesorALProgramStudis?.questions || {
        form: [],
        kesimpulan: []
      },
      asesorEvaluator: data?.asesorALProgramStudis?.asesorEvaluator || '',
      asesorPtAsal: data?.lembaga || '',
      asesorProdiAsal: data?.namaProdi || '',
      asesorProdiAkreditasi: data?.asesorALProgramStudis?.asesorProdiAkreditasi || '',
      uups: uupsValue || '',
      presenter: data?.asesorALProgramStudis?.asesorFullName || '',
      komentar: "Draft saved",
    };

    console.log('Payload before sending:', payload);

    try {
      const response = await api.put('/prodi-assesment-al/assesment/lapangan', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('API Response:', response.data);
      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Data berhasil disimpan sebagai draft',
      });
      getData();
    } catch (error) {
      console.error('API Error:', error.response || error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: error.message,
      });
    }
  };
  const { darkMode } = useDarkMode()

  const [isChecked, setIsChecked] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [reason, setReason] = useState('');
  const [checkedStates, setCheckedStates] = useState(Array(data.asesorALProgramStudis.questions.form.length).fill(false));
  const handleSwitchChange = (index) => (event) => {
    const updatedCheckedStates = [...checkedStates];
    updatedCheckedStates[index] = event.target.checked;
    setCheckedStates(updatedCheckedStates);

    if (!event.target.checked) {
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
  return (
    <>
      <div className="card-body m-4">
        <div className="row mt-3">
          <h5 style={{ color: darkMode ? "white" : "", }}>Form Penilaian Lapangan Asesor</h5>
          <div className=" mt-3">
            <div
              style={{ maxHeight: "100vh", overflowY: "scroll" }}
              ref={divRef}
              className="row d-flex mt-3"
            >
              <Table>
                <TableHead>
                  <TableRow style={{
                    backgroundColor: darkMode ? "#40679E" : "",
                    color: darkMode ? "white" : "",
                  }}>
                    <TableCell style={{
                      backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                      border: "none",
                      color: darkMode ? "white" : "",
                    }}>No</TableCell>
                    <TableCell style={{
                      backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                      border: "none",
                      color: darkMode ? "white" : "",
                    }}>Komponen</TableCell>
                    <TableCell style={{
                      backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                      border: "none",
                      color: darkMode ? "white" : "",
                    }}>Keterangan A</TableCell>
                    <TableCell style={{
                      backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                      border: "none",
                      color: darkMode ? "white" : "",
                    }}>Keterangan B</TableCell>
                    <TableCell style={{
                      backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                      border: "none",
                      color: darkMode ? "white" : "",
                    }}>Catatan A</TableCell>
                    <TableCell style={{
                      backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                      border: "none",
                      color: darkMode ? "white" : "",
                    }}>Catatan B</TableCell>
                    <TableCell style={{
                      backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                      border: "none",
                      color: darkMode ? "white" : "",
                    }}>Aksi</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody style={{
                  backgroundColor: darkMode ? "#40679E" : "",
                  color: darkMode ? "white" : "",
                }}>
                  {renderTableRows()}
                </TableBody>
              </Table>
              <h4 className="my-4" style={{ color: darkMode ? "white" : "", }}>Kesimpulan Penilaian</h4>
              <Table>
                <TableHead>
                  <TableRow style={{
                    backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                    border: "none",
                    color: darkMode ? "white" : "",
                  }}>
                    <TableCell style={{
                      backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                      border: "none",
                      color: darkMode ? "white" : "",
                    }}>No</TableCell>
                    <TableCell style={{
                      backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                      border: "none",
                      color: darkMode ? "white" : "",
                    }}>Rekomendasi</TableCell>

                    <TableCell style={{
                      backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                      border: "none",
                      color: darkMode ? "white" : "",
                      textAlign: 'center'
                    }}>Alasan A</TableCell>
                    <TableCell style={{
                      backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                      border: "none",
                      color: darkMode ? "white" : "",
                      textAlign: 'center'
                    }}>Alasan B</TableCell>
                    <TableCell style={{
                      backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                      border: "none",
                      color: darkMode ? "white" : "",
                    }}>Aksi</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody style={{
                  backgroundColor: darkMode ? "#40679E" : "",
                  color: darkMode ? "white" : "",
                }}>
                  {renderTableRows2()}
                </TableBody>
              </Table>
              <h4 className="my-4" style={{ color: darkMode ? "white" : "", }}>Asesor Penilai</h4>
              <Table>
                <TableHead>
                  <TableRow>

                    <TableCell style={{
                      backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                      border: "none",
                      color: darkMode ? "white" : "",
                      textAlign: 'center'
                    }}>Nama Lengkap A</TableCell>
                    <TableCell style={{
                      backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                      border: "none",
                      color: darkMode ? "white" : "",
                      textAlign: 'center'
                    }}>Tanda Tangan A</TableCell>

                    <TableCell style={{
                      backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                      border: "none",
                      color: darkMode ? "white" : "",
                      textAlign: 'center'
                    }}>Nama Lengkap A</TableCell>
                    <TableCell style={{
                      backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                      border: "none",
                      color: darkMode ? "white" : "",
                      textAlign: 'center'
                    }}>Tanda Tangan B</TableCell>
                    <TableCell style={{
                      backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                      border: "none",
                      color: darkMode ? "white" : "",
                    }}>Aksi</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody style={{
                  backgroundColor: darkMode ? "#40679E" : "",
                  color: darkMode ? "white" : "",
                }}>
                  {renderTableRows3()}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            backgroundColor: 'white',
            border: '2px solid #000',
            boxShadow: 24,
            padding: 20,
          }}>
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
              style={{ marginBottom: '20px' }}
            />
            <Button variant="contained" color="primary" onClick={handleSaveReason}>
              Save
            </Button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default CardPenilaian;
