import React, { useState, useCallback } from "react";
import style from "../pendaftaran-assesor/pendaftaran.module.css";
import logo from "../../../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { Stepper, Step, StepLabel } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../service/api";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { StartLoading, ErrorSwal, SuccessSwal } from "../../../utils/swal2";
import Button from "@mui/material/Button";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Helmet } from "react-helmet";
import { useDropzone } from "react-dropzone";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import elipse3 from "../../../assets/Ellipse 3.svg";
import elipse4 from "../../../assets/Ellipse 4.svg";
import TextField from '@mui/material/TextField';
import Swal from "sweetalert2";
import Autocomplete from '@mui/material/Autocomplete';
import ArrowRightIcon from "../../../components/icons/ArrowRightIcon";
import { motion } from 'framer-motion';
import { useDarkMode } from "../../../utils/DarkModeContext";
import { getFullname, getPhone, getEmail, getGender, getNik, getNip } from "../../../utils/token";

const Register = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  const [view, setView] = useState(0);
  const validationSchema = Yup.object({
    fullName: Yup.string()
      .required("Nama Lengkap harus diisi"),
      // .matches(/^[A-Za-z\s]+$/, "Nama hanya boleh diisi dengan huruf"),
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
      .matches(
        /^[A-Za-z0-9\s.,'-]+$/,
        "Alamat Kantor hanya boleh diisi dengan huruf, angka, spasi, titik, koma, tanda petik, dan tanda hubung"
      ),
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
      .matches(/^[0-9]+$/, "Nomor Telepon boleh diisi dengan angka"),

    phoneNumber: Yup.string()
      .required("Nomor Telepon harus diisi")
     .matches(/^[0-9]+$/, "Nomor Telepon boleh diisi dengan angka"),

    email: Yup.string()
      .required("Email harus diisi")
      .email("Format email tidak valid"),
    password: Yup.string().required("Password harus diisi"),
    passwordConfirm: Yup.string()
      .required("Konfirmasi Password harus diisi")
      .oneOf([Yup.ref("password"), null], "Konfirmasi Password tidak sesuai"),
  });
  const translateGender = (genderString) => {
    return genderString === "LakiLaki" ? 0 : genderString === "Perempuan" ? 1 : null;
  };
  const formik = useFormik({
    initialValues: {
      fullName: getFullname(),
      frontDegree: "",
      backDegree: "",
      nipNumber: getNip(),
      npwpNumber: "",
      nira: "",
      namaBankRek: "",
      bornPlace: "",
      bornDate: "",
      lembaga: "",
      gender: translateGender(getGender()),
      pangkat: null,
      lastEducation: null,
      officeAddress: "",
      workUnit: "",
      noRek: "",
      namaRek: "",
      mobileNumber: getPhone(),
      phoneNumber: '0828182019',
      email: getEmail(),
      password: "12345",
      passwordConfirm: "12345",
    },
    validationSchema,
    onSubmit: async (values) => {
      values.lastEducation = parseInt(values.lastEducation);
      values.pangkat = parseInt(values.pangkat);
      // if (!values.phoneNumber.trim()) {
      //   values.phoneNumber = values.mobileNumber;
      // }
      StartLoading("Mohon Menunggu...");
      try {
        const response = await api.post("/auth/register-asesor", values);
        if (response.data.status === 200) {
          Swal.fire({
            title: "Register Success",
            text: "Mohon Tunggu Admin untuk verifikasi akun anda di hari kerja",
            icon: "success",
            timer: 5000
          })
          // SuccessSwal("Register Success");
          handleLogin();
        } else if (response.data.status === 409) {
          ErrorSwal("Akun sudah ada");
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `${error.message}`
        });
      }
    },
  });
  const { errors } = formik

  const getLatestDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  function formatPhoneNumber(value) {
    
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

  const isButtonPrevVisible = view === 1 || view === 2 || view === 3;
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
      if (view === 3) {
        formik.validateForm().then((valid) => {
          if (valid && Object.keys(formik.errors).length === 0) {
            formik.handleSubmit();
            onSubmit()
          }
        });
      } else {
        setView(view + 1);
      }
    }
  };

  const handlePrev = () => {
    switch (view) {
      case 1:
        setView(0);
        break;
      case 2:
        setView(1);
        break;
      case 3:
        setView(2);
        break;
      default:
        break;
    }
  };

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
    "LINKAJA",
    "OVO",
    "DANA",
    "GOPAY",
    "SHOPEE PAY"
  ];

  const isLastStep = view === 3;
  const { darkMode } = useDarkMode()
  return (
    <>
      <Helmet>
        <title>Kemenag | Register Evaluator</title>
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
          style={{ backgroundColor: darkMode ? "#17153B" : "" }}
          className={`${style.main} ${style.customBackground} position-relative`}
        >
          <img
            src={elipse4}
            alt=""
            style={{
              position: "absolute",
              top: "0",
              left: "0",
            }}
          />
          <img
            src={elipse3}
            alt=""
            style={{
              position: "absolute",
              bottom: "0",
              right: "0",
            }}
          />
          <div
            style={{ background: darkMode ? "#3C5B6F" : "" }}
            className={`container p-4 ${style.card3} position-absolute start-0 end-0`}
          >
            <div className="d-flex gap-2">
              <img src={logo} alt="" width={50} height={50} />
              <h4 className={`${style.judul} mt-2 fw-bold`}
                style={{ color: darkMode ? "white" : "" }}
              >
                Pendaftaran Evaluator
              </h4>
            </div>

            <hr />

            <div className="col-12 mb-3">
              <Stepper
                activeStep={view}
                alternativeLabel
                sx={{
                  ".MuiStepLabel-label": {
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: "19px",
                    color: darkMode ? "white" : "#444444",
                  },
                  ".MuiStepLabel-iconContainer": {
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    border: "2px solid rgba(0, 0, 0, 0)",
                    padding: "4px !important",
                  },
                  ".MuiStepLabel-iconContainer.Mui-active": {
                    border: "2px solid yellow !important",
                  },
                  ".MuiSvgIcon-root": {
                    width: "100%",
                    height: "100%",
                    "&.Mui-completed, &.Mui-active": {
                      color: "#00C2FF",
                    },
                  },
                  ".MuiStepConnector-root": {
                    marginTop: "8px",
                  },
                  ".MuiStepConnector-line": {
                    borderTopWidth: "2px",
                  },
                }}
              >
                {[
                  "Input Data Diri",
                  "Input Data Pekerjaan",
                  "Input Data Rekening",
                  "Input Akun",
                ].map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>

            {view === 0 && (
              <>
                <div className="position-relative">
                  <div className="d-flex">
                    <div className="col-2">
                      <label className="form-label" style={{ color: darkMode ? "white" : "" }}>Nama Lengkap</label>
                    </div>
                    <div className="mb-3 col-10">
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        className={`${style.input1} form-control  w-100  ${formik.touched.fullName && formik.errors.fullName
                          ? "is-invalid"
                          : ""
                          }`}
                        placeholder="Nama Lengkap"
                        {...formik.getFieldProps("fullName")}
                        autoComplete="off"
                        aria-describedby="fullNameError"

                      />
                      {formik.touched.fullName && formik.errors.fullName && (
                        <div
                          id="fullNameError"
                          className="invalid-feedback d-block"
                        >
                          {formik.errors.fullName}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="d-flex">
                    <div className="col-2">
                      <label className="form-label" style={{ color: darkMode ? "white" : "" }}>Gelar</label>
                    </div>

                    <div className="mb-3 col-3 pe-3">
                      <input
                        type="text"
                        id="frontDegree"
                        name="frontDegree"
                        className={`${style.input1} form-control  ${formik.touched.frontDegree && formik.errors.frontDegree
                          ? "is-invalid"
                          : ""
                          }`}
                        placeholder="Gelar Depan"
                        {...formik.getFieldProps("frontDegree")}
                        autoComplete="off"
                        aria-describedby="frontDegreeError"
                      />
                      {formik.touched.frontDegree &&
                        formik.errors.frontDegree && (
                          <div
                            id="frontDegreeError"
                            className="invalid-feedback d-block"
                          >
                            {formik.errors.frontDegree}
                          </div>
                        )}
                    </div>
                    <div className="mb-3 col-3">
                      <input
                        type="text"
                        id="backDegree"
                        name="backDegree"
                        className={`${style.input1} form-control  ${formik.touched.backDegree && formik.errors.backDegree
                          ? "is-invalid"
                          : ""
                          }`}
                        placeholder="Gelar Belakang"
                        {...formik.getFieldProps("backDegree")}
                        autoComplete="off"
                        aria-describedby="backDegreeError"
                      />
                      {formik.touched.backDegree && formik.errors.backDegree && (
                        <div
                          id="backDegreeError"
                          className="invalid-feedback d-block"
                        >
                          {formik.errors.backDegree}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="d-flex">
                    <div className="col-2">
                      <label className="form-label" style={{ color: darkMode ? "white" : "" }}>NIP / NPWP </label>
                    </div>
                    <div className="mb-3 col-5 pe-3">
                      <input
                        type="text"
                        id="nipNumber"
                        name="nipNumber"
                        className={`${style.input1} form-control  ${formik.touched.nipNumber && formik.errors.nipNumber
                          ? "is-invalid"
                          : ""
                          }`}
                        placeholder="NIP"
                        {...formik.getFieldProps("nipNumber")}
                        autoComplete="off"
                        aria-describedby="nipNumberError"
                      />
                      {formik.touched.nipNumber && formik.errors.nipNumber && (
                        <div
                          id="nipNumberError"
                          className="invalid-feedback d-block"
                        >
                          {formik.errors.nipNumber}
                        </div>
                      )}
                    </div>
                    <div className="mb-6 col-5 ">
                      <input
                        type="text"
                        id="npwpNumber"
                        name="npwpNumber"
                        className={`${style.input1} form-control  ${formik.touched.npwpNumber && formik.errors.npwpNumber
                          ? "is-invalid"
                          : ""
                          }`}
                        placeholder="NPWP"
                        {...formik.getFieldProps("npwpNumber")}
                        autoComplete="off"
                        aria-describedby="npwpNumberError"
                      />
                      {formik.touched.npwpNumber && formik.errors.npwpNumber && (
                        <div
                          id="npwpNumberError"
                          className="invalid-feedback d-block"
                        >
                          {formik.errors.npwpNumber}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="d-flex">
                    <div className="col-2">
                      <label className="form-label" style={{ color: darkMode ? "white" : "" }}>NIRA</label>
                    </div>
                    <div className="mb-3 col-3">
                      <input
                        type="text"
                        id="nira"
                        name="nira"
                        className={`${style.input1} form-control  ${formik.touched.nira && formik.errors.nira
                          ? "is-invalid"
                          : ""
                          }`}
                        placeholder="NIRA"
                        {...formik.getFieldProps("nira")}
                        autoComplete="off"
                        aria-describedby="niraError"
                      />
                      {formik.touched.nira && formik.errors.nira && (
                        <div id="niraError" className="invalid-feedback d-block">
                          {formik.errors.nira}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="d-flex pe-3">
                    <div className="col-2">
                      <label className="form-label" style={{ color: darkMode ? "white" : "" }}>Tempat Tanggal Lahir</label>
                    </div>
                    <div className="mb-3  col-5 pe-2">
                      <input
                        type="text"
                        id="bornPlace"
                        name="bornPlace"
                        className={`${style.input1} form-control  ${formik.touched.bornPlace && formik.errors.bornPlace
                          ? "is-invalid"
                          : ""
                          }`}
                        placeholder="Tempat Tanggal Lahir"
                        {...formik.getFieldProps("bornPlace")}
                        autoComplete="off"
                        aria-describedby="bornPlaceError"
                      />
                      {formik.touched.bornPlace && formik.errors.bornPlace && (
                        <div
                          id="bornPlaceError"
                          className="invalid-feedback d-block"
                        >
                          {formik.errors.bornPlace}
                        </div>
                      )}
                    </div>
                    <div className="mb-3 col-3 ms-3">
                      <input
                        type="date"
                        className={`${style.input1} form-control`}
                        value={
                          formik.values.bornDate.slice(0, 10)
                          // || getLatestDate()
                        }
                        onChange={(e) => {
                          const selectedDate = new Date(e.target.value);
                          const year = selectedDate.getUTCFullYear();
                          const month = String(
                            selectedDate.getUTCMonth() + 1
                          ).padStart(2, "0");
                          const day = String(selectedDate.getUTCDate()).padStart(
                            2,
                            "0"
                          );
                          const formattedDate = `${year}-${month}-${day}T06:24:19.169Z`;
                          formik.setFieldValue("bornDate", formattedDate);
                        }}
                        autoComplete="off"
                        aria-describedby="bornDateError"
                      />
                      {formik.touched.bornDate && formik.errors.bornDate && (
                        <div
                          id="bornDateError"
                          className="invalid-feedback d-block"
                        >
                          {formik.errors.bornDate}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="d-flex">
                    <div className="col-2">
                      <label className="form-label" style={{ color: darkMode ? "white" : "" }}>Jenis Kelamin</label>
                    </div>

                    <div className="col-10">
                      <div className="d-flex">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            checked={formik.values.gender === 0}
                            onChange={() => formik.setFieldValue("gender", 0)}

                          />
                          <label style={{ color: darkMode ? "white" : "" }} className="form-check-label ms-2 me-4">
                            Laki-Laki
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            checked={formik.values.gender === 1}
                            onChange={() => formik.setFieldValue("gender", 1)}

                          />
                          <label style={{ color: darkMode ? "white" : "" }} className="form-check-label ms-2 me-4">
                            Perempuan
                          </label>
                        </div>
                      </div>
                      {formik.touched.gender && formik.errors.gender && (
                        <div
                          id="genderError"
                          className="invalid-feedback d-block"
                        >
                          {formik.errors.gender}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <p className={`${style.logIns} mt-3`} style={{ color: darkMode ? "white" : "" }}>
                  Sudah punya akun?
                  <span
                    className={`fw-bold ms-2 `}
                    style={{ cursor: "pointer", color: darkMode ? "orange" : "blue" }}
                    onClick={handleLogin}
                  >
                    Log In
                    <ArrowRightIcon />
                  </span>
                </p>
              </>
            )}
            {view === 1 && (
              <>
                <div className="d-flex mt-2">
                  <div className="col-2">
                    <label className="form-label" style={{ color: darkMode ? "white" : "" }}>Pangkat Golongan</label>
                  </div>
                  <div className="mb-3 col-4">
                    <select
                      className={`${style.input1} form-select w-100`}
                      aria-label="Default select example"
                      style={{
                        height: "20px !important",
                      }}
                      {...formik.getFieldProps("pangkat")}
                      autoComplete="off"
                      aria-describedby="pangkatError"
                    >
                      <option selected>Pilih Pangkat Golongan</option>
                      <option value={0}>III_a_PenataMuda</option>
                      <option value={1}>III_b_PenataMuda_Tk1</option>
                      <option value={2}>III_c_Penata</option>
                      <option value={3}>III_d_Penata_Tk1</option>
                      <option value={4}>IV_a_Pembina</option>
                      <option value={5}>IV_b_Pembina_Tk1</option>
                      <option value={6}>IV_c_PembinaUtamaMuda</option>
                      <option value={7}>IV_d_PembinaUtamaMadya</option>
                      <option value={8}>IV_e_PembinaUtama</option>
                    </select>
                    {formik.touched.pangkat && formik.errors.pangkat && (
                      <div id="pangkatError" className="invalid-feedback d-block">
                        {formik.errors.pangkat}
                      </div>
                    )}
                  </div>
                </div>
                <div className="d-flex ">
                  <div className="col-2">
                    <label className="form-label" style={{ color: darkMode ? "white" : "" }}>Pendidikan Terakhir</label>
                  </div>
                  <div className="mb-3 col-4">
                    <select
                      className={`${style.input1} form-select w-100`}
                      aria-label="Default select example"
                      {...formik.getFieldProps("lastEducation")}
                      autoComplete="off"
                      aria-describedby="lastEducationError"
                    >
                      <option selected>Pilih Pendidikan</option>
                      <option value={0}>Sarjana/Profesi</option>
                      <option value={1}>Magister</option>
                      <option value={2}>Doktor</option>
                    </select>
                    {formik.touched.lastEducation &&
                      formik.errors.lastEducation && (
                        <div
                          id="lastEducationError"
                          className="invalid-feedback d-block"
                        >
                          {formik.errors.lastEducation}
                        </div>
                      )}
                  </div>
                </div>
                <div className="d-flex ">
                  <div className="col-2">
                    <label className="form-label" style={{ color: darkMode ? "white" : "" }}>Alamat</label>
                  </div>
                  <div className="mb-3 col-10">
                    <textarea
                      cols="30"
                      rows="5"
                      id="officeAddress"
                      name="officeAddress"
                      className={`w-100 form-control  ${formik.touched.officeAddress &&
                        formik.errors.officeAddress
                        ? "is-invalid"
                        : ""
                        }`}
                      placeholder="Alamat Kantor"
                      {...formik.getFieldProps("officeAddress")}
                      autoComplete="off"
                      aria-describedby="officeAddressError"
                    ></textarea>
                    {formik.touched.officeAddress &&
                      formik.errors.officeAddress && (
                        <div
                          id="officeAddressError"
                          className="invalid-feedback d-block"
                        >
                          {formik.errors.officeAddress}
                        </div>
                      )}
                  </div>
                </div>

                <div className="d-flex ">
                  <div className="col-2">
                    <label className="form-label" style={{ color: darkMode ? "white" : "" }}>Lembaga</label>
                  </div>
                  <div className="mb-3 col-4">
                    <input
                      type="text"
                      id="lembaga"
                      name="lembaga"
                      className={`${style.input1} form-control  ${formik.touched.lembaga && formik.errors.lembaga
                        ? "is-invalid"
                        : ""
                        }`}
                      placeholder="Lembaga"
                      {...formik.getFieldProps("lembaga")}
                      autoComplete="off"
                      aria-describedby="lembagaError"
                    />
                    {formik.touched.lembaga && formik.errors.lembaga && (
                      <div
                        id="lembagaError"
                        className="invalid-feedback d-block"
                      >
                        {formik.errors.lembaga}
                      </div>
                    )}
                  </div>
                </div>
                <div className="d-flex ">
                  <div className="col-2">
                    <label className="form-label" style={{ color: darkMode ? "white" : "" }}>Unit Kerja</label>
                  </div>
                  <div className="mb-3 col-4">
                    <input
                      type="text"
                      id="workUnit"
                      name="workUnit"
                      className={`${style.input1} form-control  ${formik.touched.workUnit && formik.errors.workUnit
                        ? "is-invalid"
                        : ""
                        }`}
                      placeholder="Tempat Unit Kerja"
                      {...formik.getFieldProps("workUnit")}
                      autoComplete="off"
                      aria-describedby="workUnitError"
                    />
                    {formik.touched.workUnit && formik.errors.workUnit && (
                      <div
                        id="workUnitError"
                        className="invalid-feedback d-block"
                      >
                        {formik.errors.workUnit}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {view === 2 && (
              <>
                <div className="d-flex">
                  <div className="col-2">
                    <label className="form-label" style={{ color: darkMode ? "white" : "" }}>Rekening Bank</label>
                  </div>
                  <div className="col-2 me-3" style={{ position: "relative" }}>
                    <Autocomplete
                      id="namaBankRek"
                      options={options}
                      getOptionLabel={(option) => option}
                      value={formik.values.namaBankRek}
                      onChange={(e, newValue) => {
                        formik.setFieldValue("namaBankRek", newValue);
                      }}
                      style={{ width: "100%" }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Pilih Nama Bank"
                          name="bank"
                          autoComplete="on"
                          error={formik.touched.namaBankRek && Boolean(formik.errors.namaBankRek)}
                          helperText={formik.touched.namaBankRek && formik.errors.namaBankRek}
                          variant="outlined"
                          size="small"
                          InputProps={{
                            ...params.InputProps,
                            className: `${style.input1} ${params.InputProps.className}`,
                            style: { background: "white" },
                          }}
                        />
                      )}
                    />

                  </div>
                  <div className="mb-3 col-3 pe-3">
                    <input
                      type="text"
                      id="namaRek"
                      name="namaRek"
                      className={`${style.input1} form-control ${formik.touched.namaRek && formik.errors.namaRek
                        ? "is-invalid"
                        : ""
                        }`}
                      placeholder="Nama Rekening"
                      {...formik.getFieldProps('namaRek')}
                      autoComplete="off"
                      aria-describedby="namaRekError"

                    />
                    {formik.touched.namaRek && formik.errors.namaRek && (
                      <div id="nameRekError" className="invalid-feedback d-block">
                        {formik.errors.namaRek}
                      </div>
                    )}
                  </div>
                  <div className="mb-3 col-3 pe-3">
                    <input
                      type="text"
                      id="noRek"
                      name="noRek"
                      className={`${style.input1} form-control  ${formik.touched.noRek && formik.errors.noRek
                        ? "is-invalid"
                        : ""
                        }`}
                      placeholder="No. Rekening"
                      {...formik.getFieldProps("noRek")}
                      autoComplete="off"
                      aria-describedby="noRekError"
                    />
                    {formik.touched.noRek && formik.errors.noRek && (
                      <div id="noRekError" className="invalid-feedback d-block">
                        {formik.errors.noRek}
                      </div>
                    )}
                  </div>

                </div>

                <div className="d-flex">
                  <div className="col-2">
                    <label className="form-label" style={{ color: darkMode ? "white" : "" }}>No HP</label>
                  </div>
                  {/* <div className="mb-3 col-5 pe-3">
                    <input
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      className={`${style.input1} form-control  ${formik.touched.phoneNumber && formik.errors.phoneNumber
                        ? "is-invalid"
                        : ""
                        }`}
                      placeholder="Isi Nomor Telepon"
                      value={formik.values.phoneNumber}
                      onChange={(e) => {
                       
                        formik.setFieldValue("phoneNumber");
                      }}
                      onBlur={formik.handleBlur("phoneNumber")}
                      maxLength={13}

                    />
                    {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                      <div className="invalid-feedback d-block">
                        {formik.errors.phoneNumber}
                      </div>
                    )}
                  </div> */}
                  <div className="mb-3 col-5">
                    <PhoneInput
                      id="mobileNumber"
                      name="mobileNumber"
                      inputClass={`${style.input1} w-100 form-control ${formik.touched.mobileNumber && formik.errors.mobileNumber
                        ? "is-invalid"
                        : ""
                        }`}
                      containerClass="phone-input-container"
                      buttonClass="btn btn-outline-dark"
                      placeholder="Awali dengan format +62 8XX XXXX XXXX"
                      value={formik.values.mobileNumber}
                      onChange={handleMobilePhone}
                      onBlur={formik.handleBlur("mobileNumber")}
                      inputProps={{
                        maxLength: 18,
                      }}
                      defaultCountry="id"
                      country="id"
                      displayFormat="NATIONAL"

                    />
                    {formik.touched.mobileNumber &&
                      formik.errors.mobileNumber && (
                        <div className="invalid-feedback d-block">
                          {formik.errors.mobileNumber}
                        </div>
                      )}
                  </div>
                </div>
              </>
            )}

            {view === 3 && (
              <>
                <div className="mt-3">
                  <div className="mb-3 col-12">
                    <label className="form-label" style={{ color: darkMode ? "white" : "" }}>Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      // pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                      // title="Masukkan alamat email yang valid. Contoh: nama@contoh.com"
                      className={`${style.input2} form-control w-100  ${formik.touched.email && formik.errors.email
                        ? "is-invalid"
                        : ""
                        }`}
                      placeholder="Masukkan Email"
                      {...formik.getFieldProps("email")}
                      autoComplete="off"
                      aria-describedby="emailError"

                    />
                    {formik.touched.email && formik.errors.email && (
                      <div id="emailError" className="invalid-feedback d-block">
                        {formik.errors.email}
                      </div>
                    )}
                  </div>

                </div>
              </>
            )}

            <div className="d-flex justify-content-end">
              {isButtonPrevVisible && (
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handlePrev}
                  sx={{
                    marginRight: "10px",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                    color: "rgb(3, 148, 216)",
                    borderColor: "rgb(3, 148, 216)",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                >
                  <ArrowBackIcon />
                  Sebelumnya
                </Button>
              )}

              <Button
                size="small"
                type="submit"
                onClick={isLastStep ? handleNext : handleNext}
                variant={isLastStep ? "contained" : "contained"}
                sx={{
                  backgroundColor: isLastStep ? "green" : "rgb(3, 148, 216)",
                  color: "white",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.2)",
                  },
                }}
                disabled={isLastStep && isDataEmpty}
              >
                {isLastStep ? "Daftar" : "Selanjutnya"}
                {isLastStep ? (
                  <HowToRegIcon sx={{ marginLeft: "5px" }} />
                ) : (
                  <ArrowForwardIcon />
                )}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Register;
