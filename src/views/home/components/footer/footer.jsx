import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import logo from '../../../../assets/logo.svg';
import pusaka from '../../../../assets/pusak.svg'; 
import logo2 from '../../../../assets/logosippro1.png'; 

const Footer = ({ darkMode, handleMenuClick }) => {
    useEffect(() => {
        AOS.init({
            duration: 500, 
            easing: 'ease-in-out',
            once: true,
        });
    }, []);

    return (
        <footer className={`py-5 px-4 mt-5 ${darkMode ? 'text-light' : 'text-dark'}`} style={{ backgroundColor: darkMode ? "#180161" : "#CAF4FF" }}>
            <div className="container" style={{ backgroundColor: darkMode ? "#180161" : "#CAF4FF", fontFamily: "'Poppins', sans-serif" }}>
                <div className="row gx-5">
                    <div className="col-lg-5 col-md-6 mb-4 mb-lg-0" data-aos="fade-up">
                        <div className='d-flex gap-2'>
                            <img src={logo} alt="Logo" className="img-fluid mb-4" style={{ maxWidth: '150px' }} />
                            <img src={pusaka} alt="Logo" className="img-fluid mb-4" style={{ width: '65px' }} />
                            <img src={logo2} alt="Logo" className="img-fluid mb-4" style={{ maxWidth: '180px' }} />
                        </div>
                        <p className="small">
                            Kami berkomitmen untuk mendukung pengembangan program studi baru di perguruan tinggi agama Islam. Misi kami adalah memberdayakan institusi pendidikan tinggi Islam dan membantu mereka mencapai standar kualitas pendidikan yang unggul sesuai dengan arahan Kementerian Agama RI.
                        </p>
                    </div>

                    <div className="col-lg-2 col-md-6 mb-4 mb-lg-0" data-aos="fade-up" data-aos-delay="100">
                        <h5 className="mb-3 fw-bold">Tautan Cepat</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <a onClick={() => handleMenuClick('home')} className={`text-decoration-none ${darkMode ? 'text-light' : 'text-dark'}`}>
                                    <i className="fas fa-chevron-right me-2 small"></i>Home
                                </a>
                            </li>
                            <li className="mb-2">
                                <a onClick={() => handleMenuClick('prosedur')} className={`text-decoration-none ${darkMode ? 'text-light' : 'text-dark'}`}>
                                    <i className="fas fa-chevron-right me-2 small"></i>Prosedur
                                </a>
                            </li>
                            <li className="mb-2">
                                <a onClick={() => handleMenuClick('regulasi')} className={`text-decoration-none ${darkMode ? 'text-light' : 'text-dark'}`}>
                                    <i className="fas fa-chevron-right me-2 small"></i>Regulasi
                                </a>
                            </li>
                            <li className="mb-2">
                                <a onClick={() => handleMenuClick('faq')} className={`text-decoration-none ${darkMode ? 'text-light' : 'text-dark'}`}>
                                    <i className="fas fa-chevron-right me-2 small"></i>Faq
                                </a>
                            </li>
                            <li className="mb-2">
                                <a onClick={() => handleMenuClick('contact')} className={`text-decoration-none ${darkMode ? 'text-light' : 'text-dark'}`}>
                                    <i className="fas fa-chevron-right me-2 small"></i>Kontak kami
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="col-lg-3 col-md-6 mb-4 mb-lg-0" data-aos="fade-up" data-aos-delay="200">
                        <h5 className="mb-3 fw-bold">Alamat kantor</h5>
                        <p className="small">Jl. Lapangan Banteng Barat No. 3 - 4 Lt. 7 Jakarta Pusat</p>
                        <p className="small mb-0">
                            <i className="fas fa-envelope me-2"></i>sippro@diktis.kemenag.go.id
                        </p>
                        {/* <p className="small">
                            <i className="fas fa-phone me-2"></i>+62 858-8115-3669
                        </p> */}
                    </div>

                    <div className="col-lg-2 mb-4 col-md-6" data-aos="fade-up" data-aos-delay="300">
                        <h5 className="mb-3 fw-bold">Follow kami</h5>
                        <div className="d-flex">
                            {[
                                { icon: 'facebook', link: 'https://facebook.com' },
                                { icon: 'twitter', link: 'https://twitter.com' },
                                { icon: 'instagram', link: 'https://www.instagram.com/diktis_kemenagri/' },
                                { icon: 'linkedin', link: 'https://linkedin.com' }
                            ].map((social, index) => (
                                <a key={index} href={social.link} className={`me-3 ${darkMode ? 'text-light' : 'text-dark'}`} target="_blank" rel="noopener noreferrer">
                                    <i className={`fab fa-${social.icon} fa-lg`}></i>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <hr className="my-4" />

                <div className="text-center">
                    <p className="small mb-0" style={{ color: darkMode ? "white" : "black" }}>
                        &copy; {new Date().getFullYear()} Direktorat Jenderal Pendidikan Islam Kementerian Agama RI. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
