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
import api from "../../../../../../service/api";
import Swal from "sweetalert2";
import { css } from '@emotion/react';
import { useDarkMode } from "../../../../../../../utils/DarkModeContext";
import { getToken, getUserId, getRole } from "../../../../../../../utils/token";
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

        const fetchData = async () => {
            try {
                const response = await api.get(`/prodi-assesment-al/${programStudiId}/${asesorId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const responseData = response?.data?.data || {};

                // Define default questions
                const defaultQuestions = {
                    form: [
                        { code: "AI", question: "Akreditasi Institusi", nilai: "", note: "" },
                        { code: "APSL", question: "Akreditasi Program Studi Linear", nilai: "", note: "" },
                        { code: "KST", question: "Kesiapan Dosen tetap", nilai: "", note: "" },
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

                // Use default questions if responseData.asesorALProgramStudis.questions is undefined
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
                // Set data to state
                setData({
                    ...responseData,
                    asesorALProgramStudis: {
                        ...responseData.asesorALProgramStudis,
                        questions: questions
                    }
                });

                console.log('Data fetched successfully:', responseData);
            } catch (error) {
                console.error('Error fetching data:', error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: `${error.message}`,
                });
            }
        };

        // Use setTimeout to delay the API call
        setTimeout(fetchData, 1500);
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

    const renderTableRows = () => {
        const questions = Array.isArray(data?.asesorALProgramStudis?.questions?.form)
            ? data.asesorALProgramStudis.questions?.form
            : [];

        // Urutkan berdasarkan code
        const sortedQuestions = questions.sort((a, b) => (a.code || '').localeCompare(b.code || '', undefined, { numeric: true }));

        return sortedQuestions.slice(0, 8).map((item, index) => (
            <TableRow key={index}>
                <TableCell>{item.code}</TableCell>
                <TableCell>{item.question}</TableCell>
                <TableCell>
                    <textarea
                        value={item.nilai || ''}
                        onChange={(e) => handleInputChange(e, index, 'nilai')}
                        className={`px-2 py-2 form-control ${validationErrors[`nilai${index + 1}`] ? 'is-invalid' : ''}`}
                        style={{ height: "339px", width: '500px', marginLeft: 'auto' }}
                    />
                    {validationErrors[`nilai${index + 1}`] && (
                        <div className="invalid-feedback">
                            {validationErrors[`nilai${index + 1}`]}
                        </div>
                    )}
                </TableCell>
                <TableCell>
                    <textarea
                        value={item.note || ''}
                        onChange={(e) => handleInputChange(e, index, 'note')}
                        className={`px-2 py-2 form-control ${validationErrors[`note${index + 1}`] ? 'is-invalid' : ''}`}
                        style={{ height: "339px", width: '500px', marginLeft: 'auto' }}
                    />
                    {validationErrors[`note${index + 1}`] && (
                        <div className="invalid-feedback">
                            {validationErrors[`note${index + 1}`]}
                        </div>
                    )}
                </TableCell>
            </TableRow>
        ));
    };




    const renderTableRows2 = () => {
        const questions = Array.isArray(data?.asesorALProgramStudis?.questions?.kesimpulan)
            ? data.asesorALProgramStudis.questions.kesimpulan
            : [];

        // Filter out the questions with empty code and sort by code
        const filteredQuestions = questions
            .filter(item => item.code.trim() !== "")
            .sort((a, b) => (a.code || '').localeCompare(b.code || '', undefined, { numeric: true }));

        return filteredQuestions.slice(0, 3).map((item, index) => (
            <React.Fragment key={index}>
                <TableRow>
                    <TableCell style={{ color: darkMode ? "white" : "" }} scope="row">
                        {item.code || `${index + 1}.`}
                    </TableCell>
                    <TableCell style={{ color: darkMode ? "white" : "" }}>{item.question}</TableCell>
                    <TableCell style={{ color: darkMode ? "white" : "" }}>
                        <textarea
                            className={`px-2 py-2 form-control`}
                            style={{ height: "339px", width: '500px', marginLeft: 'auto' }}
                            value={item.note || ''}
                            onChange={(e) => handleInputChangeNote(e, index, 'note')}
                        />
                        {validationErrors[`note${index + 9}`] && (
                            <div style={{ marginLeft: 'auto', display: 'flex', justifyContent: 'end' }} className="invalid-feedback">
                                {validationErrors[`note${index + 9}`]}
                            </div>
                        )}
                    </TableCell>
                </TableRow>
            </React.Fragment>
        ));
    };


    const renderTableRows3 = () => {
        return (
            <TableRow>
                <TableCell className="text-center" style={{ color: darkMode ? "white" : "" }}>
                    {data?.asesorALProgramStudis?.asesorFullName}
                </TableCell>
                <TableCell style={{ color: darkMode ? "white" : "", justifyContent: 'center' }}>
                    {ttdImageUrl ? (
                        <div className="mt-2 ms-auto d-flex justify-content-center">
                            <img src={ttdImageUrl} alt="TTD" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                        </div>
                    ) : (
                        <div className="mt-2 d-flex m-auto align-items-center" role="alert">
                            Tanda tangan tidak tersedia
                        </div>
                    )}
                </TableCell>
            </TableRow>
        );
    };

    const [ttdImageUrl, setTtdImageUrl] = useState(null);
    const fetchTtdImage = async () => {
        const id = getUserId()
        try {
            const response = await api.get(`/user/asesor-ttd?userId=${id}`, {
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
      
        const payload = {
            asesorId: parseInt(asesorId),
            programStudiId: parseInt(programStudiId),
            selected: true,
            role: data?.role,
            assesmentSkNo: data?.assesmentSkNo,
            asesorFullName: data?.asesorFullName,
            asesorEmail: data?.asesorEmail,
            asesorMobileNumber: data?.asesorMobileNumber,
            assesmentAssignedTime: data?.assesmentAssignedTime,
            statusStr: "string",
            status: 223,
            assesmentDurationInDays: data?.assesmentDurationInDays,
            assesmentAtLocationTime: new Date().toISOString(),
            questions: data?.asesorALProgramStudis?.questions,
            asesorEvaluator: data?.asesorEvaluator,
            asesorPtAsal: data?.asesorPtAsal,
            asesorProdiAsal: data?.asesorProdiAsal,
            asesorProdiAkreditasi: data?.asesorProdiAkreditasi,
            komentar: "string",
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
        const asesorId = getUserId()
        if (!validateFormDraft()) {
            Swal.fire({
                icon: 'error',
                title: 'Kesalahan Validasi',
                text: 'Mohon isi semua bidang yang diperlukan',
            });
            return;
        }
       
        const payload = {
            asesorId: parseInt(asesorId),
            programStudiId: parseInt(programStudiId),
            selected: true,
            role: data?.role,
            assesmentSkNo: data?.assesmentSkNo,
            asesorFullName: data?.asesorFullName,
            asesorEmail: data?.asesorEmail,
            asesorMobileNumber: data?.asesorMobileNumber,
            assesmentAssignedTime: data?.assesmentAssignedTime,
            statusStr: "string",
            status: 222,
            assesmentDurationInDays: data?.assesmentDurationInDays,
            assesmentAtLocationTime: new Date().toISOString(),
            questions: data?.asesorALProgramStudis?.questions,
            asesorEvaluator: data?.asesorEvaluator,
            asesorPtAsal: data?.asesorPtAsal,
            asesorProdiAsal: data?.asesorProdiAsal,
            asesorProdiAkreditasi: data?.asesorProdiAkreditasi,
            komentar: "string",
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
    const { darkMode } = useDarkMode()
    return (
        <>
            <div className="card-body m-4">
                <div className="row d-flex g-2">
                    <div className="col-sm-12 col-md-10 ">
                        <div
                            style={{
                                backgroundColor: "rgb(255, 241, 118)",
                                width: "auto",
                                height: "128px",
                                borderRadius: "10px",
                            }}
                            className="d-flex align-items-center"
                        >
                            <div className="m-auto d-flex align-items-center text-center">
                                <h5>PENILAIAN PRESENTASI USUL PEMBUKAAN PROGRAM
                                    STUDI BARU JENJANG PASCASARJANA DAN PROFESI (PPG)
                                    PADA PTKIN/PTKIS</h5>
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
                </div>
                <div className="row container mt-4" style={{ lineHeight: "5px", }}>
                    <div className="col-sm-12 col-md-3">
                        <p>Nama PTKIN/S (Institusi)  : </p>
                    </div>
                    <div className="col-sm-12 col-md-9 mb-4">
                        <p>{data.lembaga}</p>
                    </div>

                    <div className="col-sm-12 col-md-3">
                        <p>UPPS	:</p>
                    </div>
                    <div className="col-sm-12 col-md-9 mb-4">
                        <p>{data?.statusSwasta === 1 ? 'Negeri' : "Swasta"}</p>
                    </div>

                    <div className="col-sm-12 col-md-3">
                        <p>Program Studi Usulan :</p>
                    </div>
                    <div className="col-sm-12 col-md-9 mb-4">
                        <p>{data.namaProdi}</p>
                    </div>

                    <div className="col-sm-12 col-md-3">
                        <p>Jenjang :</p>
                    </div>
                    <div className="col-sm-12 col-md-9 mb-4">
                        <p>{data.jenjangStr}</p>
                    </div>

                    <div className="col-sm-12 col-md-3">
                        <p>Presenter :</p>
                    </div>
                    <div className="col-sm-12 col-md-9">
                        <p>{data?.asesorALProgramStudis?.asesorFullName}</p>
                    </div>
                </div>

                <div className="row mt-3">
                    <h5 >Form Penilaian Lapangan Asesor</h5>
                    <div className=" mt-3">
                        <div
                            style={{ maxHeight: "100vh", overflowY: "scroll" }}
                            ref={divRef}
                            className="row d-flex mt-3"
                        >
                            <Table>
                                <TableHead>
                                    <TableRow >
                                        <TableCell style={{
                                            backgroundColor: "#F9FAFC",
                                            border: "none",
                                        }}>Kode</TableCell>
                                        <TableCell style={{
                                            backgroundColor: "#F9FAFC",
                                            border: "none",
                                        }}>Komponen</TableCell>
                                        <TableCell style={{
                                            backgroundColor: "#F9FAFC",
                                            border: "none",
                                        }}>Keterangan</TableCell>
                                        <TableCell s style={{
                                            backgroundColor: "#F9FAFC",
                                            border: "none",
                                        }}>Catatan</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody >
                                    {renderTableRows()}
                                </TableBody>
                            </Table>
                            <h4 className="my-4">Kesimpulan Penilaian</h4>
                            <Table>
                                <TableHead>
                                    <TableRow style={{
                                        backgroundColor: "#F9FAFC",
                                        border: "none",
                                    }}>
                                        <TableCell style={{
                                            backgroundColor: "#F9FAFC",
                                            border: "none",
                                        }}>Kode</TableCell>
                                        <TableCell style={{
                                            backgroundColor: "#F9FAFC",
                                            border: "none",
                                        }}>Rekomendasi</TableCell>

                                        <TableCell style={{
                                            backgroundColor: "#F9FAFC",
                                            border: "none",
                                        }}>Alasan</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody >
                                    {renderTableRows2()}
                                </TableBody>
                            </Table>
                            <h4 className="my-4" >Asesor Penilai</h4>
                            <Table>
                                <TableHead>
                                    <TableRow>

                                        <TableCell style={{
                                            backgroundColor: "#F9FAFC",
                                            border: "none",
                                            textAlign: 'center'
                                        }}>Nama Lengkap</TableCell>
                                        <TableCell style={{
                                            backgroundColor: "#F9FAFC",
                                            border: "none",
                                            textAlign: 'center'
                                        }}>Tanda Tangan</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody >
                                    {renderTableRows3()}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CardPenilaian;
