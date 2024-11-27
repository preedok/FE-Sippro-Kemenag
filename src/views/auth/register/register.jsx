import React, { useState, useEffect } from "react";
import style from "../register/style.module.css";
import logo from "../../../assets/logo.svg";
import axios from "axios";
import {
  StartLoading,
  CloseLoading,
  ErrorSwal,
  SuccessSwal,
} from "../../../utils/swal2";
import { GetApiBaseUrl } from "../../../utils/env";
import { useForm, Controller } from "react-hook-form";
import { Stepper, Step, StepLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { Helmet } from "react-helmet";
import elipse3 from "../../../assets/Ellipse 3.svg";
import elipse4 from "../../../assets/Ellipse 4.svg";
import ExclamationCircleIcon from "../../../components/icons/ExclamationCircleIcon";
import ArrowRightIcon from "../../../components/icons/ArrowRightIcon";
import PlusIcon from "../../../components/icons/PlusIcon";
import EyeFillIcon from "../../../components/icons/EyeFillIcon";
import Swal from "sweetalert2";
import { motion } from 'framer-motion';
import { useDarkMode } from "../../../utils/DarkModeContext";
import { getFullname, getPhone, getEmail, getGender, getNik } from "../../../utils/token";

const Register = () => {
  const { darkMode } = useDarkMode()
  const baseUrl = GetApiBaseUrl();
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };

  const [view, setView] = useState(0);
  const [nsptkiForm, setNsptkiForm] = useState({});

  const nsptkiLoaded = nsptkiForm?.id;
  const { register, control, getValues, handleSubmit, watch, trigger, setValue, formState: { errors } } = useForm({
    defaultValues: {
      gender: null,
      fullName: '',
      phoneNumber: '',
      email: '',
      ktpNumber: '',
      nsptkiId: ''
    }
  });
  useEffect(() => {
    // Fetch data from imported functions
    const fullname = getFullname();
    const phone = getPhone();
    const email = getEmail();
    const nik = getNik();

    setValue('fullName', fullname);
    setValue('phoneNumber', phone);
    setValue('email', email);
    setValue('ktpNumber', nik);
  }, [setValue]);
  const [isLoading, setIsLoading] = useState(false)

  const submit = async () => {
    setIsLoading(true);
    StartLoading("Mohon Menunggu...");
    const val = getValues(); // Collect form data
    val.mobileNumber = val.phoneNumber;
    val.password = "12345";
    val.passwordConfirm = "12345";
    val.gender = parseInt(val.gender, 10); // Ensure gender is a number

    // Create FormData object
    const formData = new FormData();
    formData.append("email", val.email);
    formData.append("fullName", val.fullName);
    formData.append("gender", val.gender);
    formData.append("nsptkiId", val.nsptkiId);
    formData.append("ktpNumber", val.ktpNumber);
    formData.append("phoneNumber", val.phoneNumber);
    formData.append("mobileNumber", val.mobileNumber);
    formData.append("password", val.password);
    formData.append("passwordConfirm", val.passwordConfirm);

    if (file) {
      formData.append("file", file); // Use the file stored in the state
    }

    try {
      const response = await axios.post(`${baseUrl}/auth/register-wfile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      if (response.data.status === 200) {
        Swal.fire({
          title: "Register Success",
          text: response.data.message,
          icon: "success",
          confirmButtonText: "OK"
        });
        navigate("/login");
      } else if (response.data.status === 409) {
        Swal.fire({
          title: "Register Failed",
          text: response.data.message,
          icon: "warning",
          confirmButtonText: "OK"
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Register Failed",
        text: "An error occurred during registration. Please try again later.",
        icon: "error",
        confirmButtonText: "OK"
      });
    } finally {
      setIsLoading(false);
    }
  };



  const handleNext = () => {
    switch (view) {
      case 0:
        trigger().then((valid) => {
          if (valid) {
            if (nsptkiLoaded) {
              setView(1);
            } else {
              handleCheckNsptki();
            }
          }
        });
        break;
      case 1:
        trigger().then((valid) => {
          valid && setView(2);
        });
        break;
      case 2:
        trigger().then((valid) => {
          valid && submit();
        });
        break;
      default:
        break;
    }
  };

  const handlePrev = () => {
    switch (view) {
      case 2:
        setView(1);
        break;
      case 1:
        setView(0);
        break;
      default:
        break;
    }
  };

  const handleCheckNsptki = (e) => {
    const val = getValues("nsptkiId");
    if (!val) return;
    e && e?.preventDefault();
    Swal.fire({
      title: "Mohon Menunggu...",
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    axios
      .get(`${baseUrl}/nsptki/${val}`)
      .then((response) => {
        if (response.data.status === 200) {
          const nsptki = response.data.data;
          setNsptkiForm(nsptki);
          CloseLoading();
          Swal.close();
        } else {
          setNsptkiForm(null);
          ErrorSwal("Error");
          Swal.close();
        }
      })
      .catch(() => {
        setNsptkiForm(null);
        ErrorSwal("Error");
        Swal.close();
      });
  };

  const isLastStep = view === 2;
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState(null); // Add this state to store the file


  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFileName(selectedFile.name);
      setFile(selectedFile); // Store the file
    }
  };


  return (
    <>
      <Helmet>
        <title>Kemenag | Register PTKI</title>
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <section>
          <div
            className={`${style.main} ${style.customBackground} position-relative`}
            style={{ padding: "40px 32px", marginLeft: "auto", backgroundColor: darkMode ? "#17153B" : "" }}
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
              <div className="d-flex gap-3">
                <img src={logo} className={style.logos} alt="" />
                <h4 className={`${style.judul} mt-2`} style={{
                  color: darkMode ? "white" : "#444444",
                }} >Pendaftaran User Prodi PTKI</h4>
              </div>
              <hr />
              <div
                style={{
                  border: "2px solid #2196F3",
                  backgroundColor: "#E3F2FD",
                  width: "100%",
                  height: "62px",
                  borderRadius: "8px",
                }}
                className={`mt-4 alert alert-danger ${style.alertt} `}
                role="alert"
              >
                <p
                  className="text-primary fw-bold"
                  style={{ marginTop: "-10px" }}
                >
                  <ExclamationCircleIcon />
                  Info
                </p>
                <p
                  className={`inf text-primary ${style.textalert}`}
                  style={{ marginTop: "-15px", marginLeft: "30px" }}
                >
                  User adalah user atas nama Lembaga yang dapat mendaftarkan satu
                  atau lebih Prodi Baru.
                </p>
              </div>

              <div className="col-12 my-4">
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
                      border: "2px solid #00C2FF !important",
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
                    "Input NSPTKI",
                    "Input data user",
                    "Input data login & Submit",
                  ].map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </div>

              {view === 0 && (
                <div>
                  <div className="row mt-4">
                    <div className="col-7">
                      <div className="input-group flex-nowrap">
                        <Controller
                          name="nsptkiId"
                          control={control}
                          rules={{
                            required: true,
                            // min: 1,
                            // max: 99999
                          }}
                          render={({ field }) => (
                            <div className="flex-fill">
                              <input
                                className="form-control"
                                type="number"
                                placeholder="Input NSPTKI"
                                {...field}
                                onChange={(e) => {
                                  const val = parseInt(e.target.value);
                                  // if (val > 99999) {
                                  //   field.onChange(99999);
                                  // } else {
                                  //   field.onChange(val);
                                  // }
                                  field.onChange(val);
                                }}
                              />
                              {errors?.nsptkiId?.type === "required" && (
                                <div className="invalid-feedback d-block">
                                  Required
                                </div>
                              )}
                              {errors?.nsptkiId?.type === "max" && (
                                <div className="invalid-feedback d-block">
                                  NSPTKI must be 5 digits or less
                                </div>
                              )}
                            </div>
                          )}
                        />
                      </div>
                    </div>
                    <div className="col-2">
                      <button
                        style={{ gap: "8px" }}
                        className={`btn ${style.BtnCreate} d-flex align-items-center justify-content-center`}
                        onClick={handleCheckNsptki}
                      >
                        <PlusIcon />
                        <button
                          className={`${style.textCreate} px-5 py-2 btn btn-primary `}
                          style={{ fontSize: "12px" }}
                          onClick={handleNext}
                        >
                          Lihat
                        </button>
                      </button>
                    </div>
                    <div className="col-3">
                      <a
                        href="https://diktis.kemenag.go.id/pak/v2/?a=nspt"
                        rel="noreferrer"
                        target="_blank"
                        style={{ border: "1px solid #AAAAAA" }}
                        className={`btn btn-white ${style.BtncekNomor} px-2`}
                      >
                        <EyeFillIcon />
                        <a href="https://diktis.kemenag.go.id/pak/v2/?a=nspt"
                          className={style.textNomor}
                          target="_blank"

                          style={{
                            color: darkMode ? "white" : "",
                            fontSize: "12px"
                          }}
                        >
                          Lihat Daftar Nomor Statistik PTKI
                        </a>
                      </a>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="d-flex">
                      <div className="mb-3 col-6">
                        <label className="form-label"
                          style={{
                            color: darkMode ? "white" : "",

                          }}>Nama Lembaga</label>
                        <input
                          type="text"
                          className={`${style.input1} form-control w-100 `}
                          value={nsptkiForm?.namaPerguruan ?? ""}
                          disabled
                        />
                      </div>
                      <div className="mb-3 ms-1 col-6">
                        <label className="form-label" style={{
                          color: darkMode ? "white" : "",

                        }}>NSPTKI</label>
                        <input
                          value={nsptkiForm?.id ?? ""}
                          type="number"
                          className={`${style.input1} form-control w-100  `}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <div className="mb-3  col-12">
                      <label className="form-label" style={{
                        color: darkMode ? "white" : "",

                      }}>Alamat</label>
                      <input
                        type="text"
                        className={`${style.input1} form-control w-100  `}
                        disabled
                        value={nsptkiForm?.alamat ?? ""}
                      />
                    </div>
                  </div>
                  <div className="">
                    {/* Input Form */}
                    <form>
                      <div className="d-flex">
                        <div className="mb-3 col-6">
                          <label className="form-label" style={{
                            color: darkMode ? "white" : "",

                          }}>Status</label>
                          <input
                            type="text"
                            className={`${style.input1} form-control w-100`}
                            disabled
                            value={
                              nsptkiForm?.status !== undefined
                                ? nsptkiForm.status === 0
                                  ? "Negeri"
                                  : nsptkiForm.status === 1
                                    ? "Swasta"
                                    : ""
                                : ""
                            }
                          />
                        </div>
                        <div className="mb-3 ms-1 col-6">
                          <label className="form-label" style={{
                            color: darkMode ? "white" : "",

                          }}>Kopertais</label>
                          <input
                            type="number"
                            className={`${style.input1} form-control w-100  `}
                            disabled
                            value={nsptkiForm?.kopertais ?? ""}
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {view === 1 && (
                <>
                  {/* Second Form */}
                  <div>
                    <div className="mb-3 col-12">
                      <label className="form-label" style={{
                        color: darkMode ? "white" : "",
                      }}>Nama Pengguna</label>
                      <input
                        {...register("fullName", {
                          required: "Nama lengkap harus diisi",
                          pattern: {
                            value: /^[A-Za-z\s]+$/,
                            message: "Nama Lengkap hanya boleh berisi huruf dan spasi."
                          }
                        })}
                        type="text"
                        className={`${style.input2} form-control w-100`}
                        placeholder="Isi Nama Lengkap"
                      />
                      {errors.fullName && <p className="text-danger">{errors.fullName.message}</p>}
                    </div>
                  </div>

                  <div className="form-check">
                    <input
                      {...register("gender", { required: "Jenis kelamin harus dipilih" })}
                      className="form-check-input"
                      type="radio"
                      id="genderMale"
                      value={0} // Set as number
                    />
                    <label className="form-check-label" htmlFor="genderMale" style={{ color: darkMode ? "white" : "" }}>
                      Laki-Laki
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      {...register("gender", { required: "Jenis kelamin harus dipilih" })}
                      className="form-check-input"
                      type="radio"
                      id="genderFemale"
                      value={1} // Set as number
                    />
                    <label className="form-check-label" htmlFor="genderFemale" style={{ color: darkMode ? "white" : "" }}>
                      Perempuan
                    </label>
                  </div>


                  <div>
                    <div className="mb-3 col-12">
                      <label className="form-label" style={{
                        color: darkMode ? "white" : "",

                      }}>Nomor KTP</label>
                      <Controller
                        name="ktpNumber"
                        control={control}
                        rules={{
                          required: true,
                          minLength: 16,
                          maxLength: 16,
                        }}
                        render={({ field }) => (
                          <div>
                            <input
                              type="number"
                              className={`${style.input2} form-control w-100`}
                              placeholder="16 Digit No.KTP"
                              {...field}
                            />
                            {errors.ktpNumber && (
                              <p className="text-danger">Nomor KTP harus terdiri dari 16 digit.</p>
                            )}
                          </div>
                        )}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mb-3 col-12">
                      <label className="form-label" style={{
                        color: darkMode ? "white" : "",
                      }}>Nomor HP</label>
                      <input
                        {...register("phoneNumber", {
                          required: "Nomor HP harus diisi",
                          pattern: {
                            value: /^[0-9]+$/,
                            message: "Nomor HP hanya boleh berisi angka"
                          },
                          minLength: {
                            value: 10,
                            message: "Nomor HP harus minimal 10 digit"
                          },
                          maxLength: {
                            value: 13,
                            message: "Nomor HP maksimal 13 digit"
                          }
                        })}
                        type="tel"
                        className={`${style.input2} form-control w-100`}
                        placeholder="Isi No. Telepon"
                      />
                      {errors.phoneNumber && <p className="text-danger">{errors.phoneNumber.message}</p>}
                    </div>
                  </div>

                  <div>
                    <div className="mb-3 col-12">
                      <label className="form-label" style={{
                        color: darkMode ? "white" : "",

                      }}>Surat Tugas</label>
                    </div>
                    <input
                      id="file-upload"
                      type="file"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="file-upload" className="btn btn-success px-5" style={{ marginTop: '-14px' }}>
                      Upload File
                    </label>
                    {fileName && <div>Selected file: {fileName}</div>}
                  </div>
                </>
              )}

              {view === 2 && (
                <>
                  <div className="mt-5">
                    <div className="mb-3 col-12">
                      <label className="form-label" style={{
                        color: darkMode ? "white" : "",

                      }}>E-mail</label>

                      <Controller
                        name="email"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <input
                            type="email"
                            className={`${style.input2} form-control w-100  `}
                            placeholder="Isi Email aktif"
                            {...field}

                          />
                        )}
                      />
                      {errors?.email?.type === "required" && (
                        <div className="invalid-feedback d-block">Required</div>
                      )}
                    </div>
                  </div>

                  {/* <div>
                    <div className="mb-3 col-12">
                      <label className="form-label" style={{
                        color: darkMode ? "white" : "",

                      }}>Password</label>
                      <Controller
                        name="password"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <input
                            type="password"
                            className={`${style.input2} form-control w-100  `}
                            placeholder="Isi Password"
                            {...field}
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="mb-3 col-12">
                      <label className="form-label" style={{
                        color: darkMode ? "white" : "",

                      }}>Konfirmasi Password</label>
                      <Controller
                        name="passwordConfirm"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <input
                            type="password"
                            required
                            className={`${style.input2} form-control w-100`}
                            placeholder="Ketik Ulang Password"
                            {...field}
                          />
                        )}
                      />
                      {!isPasswordSame && (
                        <div className="invalid-feedback d-block">
                          Password Harus Sama
                        </div>
                      )}
                    </div>
                  </div> */}
                </>
              )}

              <hr />
              <div className="d-flex align-items-center">
                <p className={`${style.logIns} m-0`} style={{
                  color: darkMode ? "white" : "",

                }}>
                  Sudah punya akun?
                  <span
                    className={`fw-bold ms-2`}

                    onClick={handleLogin}
                    style={{
                      color: darkMode ? "orange" : "blue",
                      cursor: "pointer"
                    }}
                  >
                    Log In
                    <ArrowRightIcon />
                  </span>
                </p>

                <div className="ms-auto">
                  <Button
                    variant="outlined"
                    disabled={view == 0}
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
                  <Button
                    size="small"
                    type="submit"
                    disabled={isLoading}
                    onClick={handleNext}
                    variant={"contained"}
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
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default Register;
