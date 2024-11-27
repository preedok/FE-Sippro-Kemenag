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
                    { code: "KDT", question: "Kesiapan Dosen tetap (Khusus S3: Kesediaan minimal 2 Guru Besar)", nilai: "", note: "" },
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
    const renderTableRows = () => {
        const questions = Array.isArray(data?.asesorALProgramStudis?.questions?.form)
            ? data.asesorALProgramStudis.questions?.form
            : [];

        // Urutkan berdasarkan code
        const sortedQuestions = questions.sort((a, b) => (a.code || '').localeCompare(b.code || '', undefined, { numeric: true }));

        return questions.map((item, index) => (
            <TableRow key={index}>
                <TableCell style={{ color: darkMode ? " white" : "" }}>{index + 1}</TableCell>
                <TableCell style={{ color: darkMode ? " white" : "" }}>{item.question}</TableCell>
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
            ? data.asesorALProgramStudis.questions?.kesimpulan
            : [];

        // Filter out the questions with empty code and sort by code
        const filteredQuestions = questions.sort((a, b) => (a.code || '').localeCompare(b.code || '', undefined, { numeric: true }));

        return questions.map((item, index) => (
            <React.Fragment key={index}>
                <TableRow>
                    <TableCell style={{ color: darkMode ? "white" : "" }} scope="row">
                        {index + 1}
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
                            <div>Tanda tangan tidak tersedia</div>
                        </div>
                    )}
                </TableCell>
            </TableRow>
        );
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
    return (
        <>
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
                className="m-3"
            >
                Kembali
            </Button>
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
                <div className="row container mt-4" style={{ lineHeight: "5px", color: darkMode ? "white" : "" }}>
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
                                        }}>Keterangan</TableCell>
                                        <TableCell style={{
                                            backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                                            border: "none",
                                            color: darkMode ? "white" : "",
                                        }}>Catatan</TableCell>
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
                                        }}>Alasan</TableCell>
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
                                        }}>Nama Lengkap</TableCell>
                                        <TableCell style={{
                                            backgroundColor: darkMode ? "#0C359E" : "#F9FAFC",
                                            border: "none",
                                            color: darkMode ? "white" : "",
                                            textAlign: 'center'
                                        }}>Tanda Tangan</TableCell>

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
                                {/* <Button
                                    disabled={data?.asesorALProgramStudis?.status === 223 || isSubmitted}
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
                                        InputSwal('Catatan Pengembalian', 'Placeholder...', (note) => {
                                            if (note !== null && note !== undefined) {
                                                const id = parseInt(localStorage.getItem('id'));
                                                const programStudiId = parseInt(localStorage.getItem('programStudiId'));
                                                const apiUrl = `/prodi-assesment-al/reject/${programStudiId}/${id}?note=${encodeURIComponent(note)}`;
                                                api
                                                    .post(
                                                        apiUrl,
                                                        {},
                                                        {
                                                            headers: {
                                                                Authorization: `Bearer ${token}`,
                                                            },
                                                        }
                                                    )
                                                    .then((response) => {
                                                        if (response.data.status === 200) {
                                                            Swal.fire({
                                                                icon: 'success',
                                                                title: 'Berhasil',
                                                                text: response.data.message,
                                                                showConfirmButton: false,
                                                                timer: 1000
                                                            });
                                                            getData();
                                                            handleGoBack()
                                                        }
                                                    })
                                                    .catch((error) => {
                                                        if (error.response) {
                                                            if (error.response.status === 400 && error.response.data.errors.note) {
                                                                Swal.fire({
                                                                    icon: 'error',
                                                                    title: 'Gagal',
                                                                    text: error.response.data.errors.note.join(', '),
                                                                });
                                                            } else {
                                                                Swal.fire({
                                                                    icon: 'error',
                                                                    title: 'Gagal',
                                                                    text: error.response.data.title,
                                                                });
                                                            }
                                                        } else {
                                                            ErrorSwal('Gagal', 'Terjadi kesalahan');
                                                        }
                                                    });
                                            }
                                        });
                                    }}
                                >
                                    Kembalikan dengan catatan
                                </Button> */}

                               
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>
        </>
    );
};

export default CardPenilaian;
