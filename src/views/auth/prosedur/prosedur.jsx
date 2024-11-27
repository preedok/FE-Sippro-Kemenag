import React, { useEffect } from "react";
import style from "../registrasi/style.module.css";
import styles from './style.module.css'
import AOS from "aos";
import "aos/dist/aos.css";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const Login = () => {
    const navigate = useNavigate();
    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);

    return (
        <>
            <Helmet>
                <title>Kemenag | Regulasi</title>
            </Helmet>

            <div className={`${style.wrapper} ${styles.wrapper} row`} style={{ overflow: "auto", maxHeight: "80vh" }}>
                <div
                    className={`${style.card1} bg-light p-4 row`}
                    data-aos="zoom-in-right"
                    data-aos-duration="1000"
                >
                    <h3 className="p-4">PROSEDUR</h3>
                    <div className="d-flex">
                        <div className="p-4 col-6">
                            <h5>1. DAFTAR</h5>
                            <p>Pendaftaran Program Studi baru dilakukan oleh Perguruan Tinggi Keagamaan  Islam (PTKI)  yang  sudah memiliki Izin Pendirian dan Nomor Statistik PTKI. Proses Daftar adalah proses awal untuk mendapatkan akses bagi Lembaga untuk mendaftarkan Prodi-prodi baru yang akan diusulkan.</p>
                        </div>
                        <div className="p-4 col-6" >
                            <h5>2. APPROVAL</h5>
                            <p>Persetujuan User dilakukan oleh Admin Pusat, yaitu Subdit Pengembangan Akademik dengan mempertimbangkan Lampiran Surat Tugas dan KTP Calon User.</p>
                        </div>
                    </div>

                    <div className="d-flex">
                        <div className="p-4 col-6">
                            <h5>3. LOGIN</h5>
                            <p>Bagi User yang disetujui dapat melakukan Login untuk mengusulkan pembukaan Prodi. Melalui Login Pengusul dapat melakukan koreksi/Perbaikan Dokumen (untuk yang belum konfirmasi) dan Monitoring Progres Usulan.</p>
                        </div>
                        <div className="p-4 col-6">
                            <h5>4. INPUT USULAN PRODI</h5>
                            <p>Mengisi Form Usulan Prodi Baru dengan mempertimbangkan Prodi eksisting. Jika tidak memenuhi syarat maka tidak diperkenankan mengusulkan Prodi Baru.</p>
                        </div>
                    </div>

                    <div className="d-flex">
                        <div className="p-4 col-6">
                            <h5>5. UPLOAD DOKUMEN</h5>
                            <p>Bagi User yang disetujui dapat melakukan Login untuk mengusulkan pembukaan Prodi. Melalui Login Pengusul dapat melakukan koreksi/Perbaikan Dokumen (untuk yang belum konfirmasi) dan Monitoring Progres Usulan.</p>
                        </div>
                        <div className="p-4 col-6">
                            <h5>6. VERIFIKASI DAN VALIDASI</h5>
                            <p>Pengusul harus mengupload dokumen persyaratan yaitu Borang Pembukaan Program Studi. Pilihan template Borang (sesuai usulan) sebagai berikut:
                                <br />
                                <a href="https://diktis.kemenag.go.id/akademik/prodi/file/borang/Sarjana_2021%20.pdf">Prodi Sarjana</a>
                                <br />
                                <a href="https://diktis.kemenag.go.id/akademik/prodi/file/borang/PPG_2021.pdf">Prodi PPG</a>
                                <br />
                                <a href="https://diktis.kemenag.go.id/akademik/prodi/file/borang/Magister_2021%20.pdf">Prodi Magister</a>
                                <br />
                                <a href="https://diktis.kemenag.go.id/akademik/prodi/file/borang/Doktor_2021.pdf">Prodi Doktor</a>
                                <br />
                                Juga dokumen-dokumen pendukung lainnya yang dipersyaratkan. Setelah melakukan Upload pastikan melakukan KONFIRMASI.</p>
                        </div>
                    </div>

                    <div className="d-flex">
                        <div className="p-4 col-6">
                            <h5>7. PENILAIAN</h5>
                            <p>Setelah dokumen baik usulan prodi baru yang telah memenuhi syarat akan dilakukan penilaian oleh Asesor yang sudah ditentukan. Hasil penilaian akan menentukan apakah Usulan layak untuk divisitasi (Untuk Pasca Sarjana) atau ditolak, jika ditolak maka lembaga harus mengusulkan kembali.</p>
                        </div>
                        <div className="p-4 col-6">
                            <h5>8. VISITASI</h5>
                            <p>PVisitasi dilakukan terhadap prodi baru yang diusulkan untuk mengkonfirmasi kebenaran dokumen dan data yang sudah dinilai sebelumnya.</p>
                        </div>
                    </div>

                    <div className="d-flex">
                        <div className="p-4 col-6">
                            <h5>9. AKREDITASI MINIMUM BAN PT</h5>
                            <p>Akreditasi minimum BAN PT adalah proses penilaian tahap akhir terkait kelayakan usulan prodi sesuai dengan ketentuan yang telah ditetapkan.</p>
                        </div>
                        <div className="p-4 col-6">
                            <h5>10. KEPUTUSAN MENTERI AGAMA</h5>
                            <p>Untuk usulan Prodi yang sudah direkomendasikan/Akreditasi Minimum BAN PT diusulkan untuk diberikan Keputusan Menteri Agama.
                                SK yang sudah dikeluarkan dapat diambil di Kantor PTSP Kemenag Pusat.</p>
                        </div>
                    </div>

                    <div className={style.dokumen}>
                        <h5>DOKUMEN PANDUAN PROGRAM STUDI</h5>
                        <ul>
                            <li>
                                <a href="https://diktis.kemenag.go.id/akademik/prodi/file/juknis_prodi_2023.pdf">Petunjuk Teknis Penyelenggaraan Prodi PTKI (2023)</a>
                            </li>
                            <li>
                                <a href="https://diktis.kemenag.go.id/akademik/prodi/file/juknis_prodi_2022.pdf">Petunjuk Teknis Penyelenggaraan Prodi PTKI (2022)</a>
                            </li>
                            <li>
                                <a href="https://diktis.kemenag.go.id/NEW/file/dokumen/2815653419813635final.pdf">Panduan Pembukaan Program Studi Baru PTKI</a>
                            </li>
                            <li>
                                <a href="https://diktis.kemenag.go.id/NEW/file/dokumen/2815324486663283IFULL.pdf">Buku Panduan Pembukaan Program Studi Baru PTKI</a>
                            </li>
                            <li>
                                <a href="">Panduan Pembukaan Program Studi Baru PTKI</a>
                            </li>
                            <li>
                                <a href="">Template Surat Pernyataan dosen tetap (Penuh Waktu)</a>
                            </li>
                            <li>
                                <a href="">Template Daftar Dosen untuk kebutuhan Registrasi</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
