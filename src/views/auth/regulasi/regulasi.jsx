import React, { useEffect } from "react";
import style from "../registrasi/style.module.css";
import logo from "../../../assets/logo.svg";
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

            <div className={`${style.wrapper} row`}>
                <div
                    className={`${style.card2} bg-light p-4 `}
                    data-aos="zoom-in-right"
                    data-aos-duration="1000"
                >
                    <h3 className="p-4">REGULASI</h3>
                    <div >
                        <ul>
                            <li>
                                Undang-Undang Nomor 12 Tahun 2012 tentang Pendidikan Tinggi
                                <a href=""> [ Download ]</a>
                            </li>
                            <li>
                                Peraturan Pemerintah Republik Indonesia Nomor 4 Tahun 2014 Tentang Penyelenggaraan Pendidikan Tinggi dan Pengelolaan Perguruan Tinggi
                                <a href=""> [ Download ]</a>
                            </li>
                            <li>
                                Peraturan Menteri Agama Republik Indonesia Nomor 36 Tahun 2009 Tentang Penetapan Pembidangan Ilmu dan Gelar Akademik di Lingkungan Perguruan Tinggi Agama Islam
                                <a href="">
                                    [ Download ]</a>
                            </li>
                            <li>
                                Peraturan Direktur Jenderal Pendidikan Islam Nomor : Dj.I/212/2011 Tentang Persyaratan Dan Prosedur Pembukaan Program Studi Perguruan Tinggi Agama Islam
                                <a href="">
                                    [ Download SK dan Lampiran ]</a>
                            </li>
                            <li>
                                Peraturan Direktur Jenderal Pendidikan Islam Nomor 1429 Tahun 2012 Tentang Penataan Program Studi di Perguruan Tinggi Agama Islam
                                <a href="">
                                    [ Download ]</a>
                            </li>
                            <li>
                                Keputusan Direktur Jenderal Pendidikan Islam Nomor 3389 Tahun 2013 Tentang Penamaan Perguruan Tinggi Agama Islam, Fakultas dan Jurusan
                                <a href="">
                                    [ Download ]</a>
                            </li>

                            <li>
                                Peraturan Menteri Agama Republik Indonesia Nomor 33 Tahun 2016 Tentang Gelar Akademik Perguruan Tinggi Keagamaan
                                <a href="">
                                    [ Download PMA ]</a>
                                <a href=""> [ Download Lampiran PMA ]</a>
                            </li>

                            <li>
                                Peraturan Menteri Agama Republik Indonesia Nomor 38 Tahun 2017 Tentang Perubahan atas PMA Nomor 33 Tentang Gelar Akademik Perguruan Tinggi Keagamaan
                                <a href="">


                                    [ Download PMA ]
                                </a>
                            </li>
                            <li>
                                Keputusan Direktur Jenderal Pendidikan Islam Nomor 61 Tahun 2020 Tentang Petunjuk Pelaksanaan Pembukaan Izin Program Studi Pendidikan Profesi Guru
                                <a href="">

                                    [ Download ]
                                </a>
                            </li>
                        </ul>

                    </div>
                </div>

            </div>
        </>
    );
};

export default Login;
