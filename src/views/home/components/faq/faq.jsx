import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useDarkMode } from '../../../../utils/DarkModeContext';
import AOS from 'aos';
import 'aos/dist/aos.css';
import style from '../../style.module.css';

const FAQContainer = styled.div`
  max-width: 1520px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Title = styled.h1`
  font-weight: bold;
  text-align: center;
  color: ${props => props.darkMode ? "white" : ""};
  font-size: 50px;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 30px;
    margin-bottom: 1.5rem;
  }
`;
const AccordionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AccordionItem = styled.div`
  background-color: ${props => props.darkMode ? '#ffffff' : '#ffffff'};
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
`;

const AccordionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: ${props => props.isOpen ? '#3498db' : '#2190b2'};
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.isOpen ? '#2980b9' : '#1a738a'};
  }
`;

const AccordionContent = styled.div`
  padding: ${props => props.isOpen ? '20px' : '0 20px'};
  max-height: ${props => props.isOpen ? '1000px' : '0'};
  overflow: hidden;
  transition: all 0.3s ease;
  background-color: ${props => props.darkMode ? '#ffffff' : '#ffffff'};
  color: ${props => props.darkMode ? '#ffffff' : '#000000'};
`;

const Question = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
`;

const Answer = styled.div`
  margin: 0;
  color: ${props => props.darkMode ? 'black' : '#666666'};
  line-height: 1.6;
  font-size: 14px;

  a {
    color: ${props => props.darkMode ? '#6ab0f3' : '#3498db'};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  ol {
    padding-left: 20px;
  }
`;

const Icon = styled.span`
  font-size: 18px;
`;

const FAQ = () => {
    const [openStates, setOpenStates] = useState({});
    const { darkMode } = useDarkMode();

    useEffect(() => {
        AOS.init({
            duration: 500,
            easing: 'ease-in-out',
            once: true,
        });
    }, []);

    const faqData = [
        {
            question: "Bagaimana cara mendaftar Program Studi Baru?",
            answer: "Pendaftaran Program Studi bagi PTKI dilakukan secara online, melalui laman Website Diktis pada menu Layanan Pembukaan Prodi baru PTKI."
        },
        {
            question: "Dokumen Apa saja yang diperlukan?",
            answer: (
                <div>
                    Dokumen yang diperlukan adalah Borang Pembukaan Prodi dan lampiran-lampiran Dokumen yang terkait sesuai Petunjuk Pembukaan Prodi. Instrumen Persyaratan Minimum Prodi/Borang pada jenjang berikut:
                    <ol>
                        <li><a href="#">Prodi Pendidikan Profesi Guru (PPG)</a></li>
                        <li><a href="#">Prodi Sarjana</a></li>
                        <li><a href="#">Prodi Magister</a></li>
                        <li><a href="#">Prodi Doktor</a></li>
                    </ol>
                </div>
            )
        },
        {
            question: "Kapan Waktu Pendaftaran?",
            answer: (
                <div>
                    {/* Pendaftaran Prodi dibuka melalui periode 3 kali dalam setahun, yaitu:
                    <ol>
                        <li>Periode I (Maret - April)</li>
                        <li>Periode II (Agustus - September)</li>
                    </ol> */}
                </div>
            )
        },
        {
            question: "Berapa lama Proses Pendaftaran sampai dengan keluar SK?",
            answer: "Proses Pendaftaran Prodi baru setidaknya 6 (enam) bulan, dengan rincian masa pendaftaran 2 (dua) bulan terhitung sejak lengkapnya dokumen usulan, kemudian 2 (dua) bulan masa penilaian lembaga dan penilaian prodi, 2 (dua) bulan berikutnya proses Penilaian BAN-PT, dan Penerbitan KMA yang diproses melalui Biro Hukum Sekjen Kemenag."
        }
    ];

    const toggleAccordion = (index) => {
        setOpenStates(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    return (
        <div style={{ backgroundColor: darkMode ? "#17153B" : "" }} className={`${style.backgroundRow} ${style.hidden} scroll`}>
            <FAQContainer>
                <Title darkMode={darkMode} data-aos="fade-up">FAQ Terkait Program Studi</Title>
                <AccordionGrid>
                    {faqData.map((item, index) => (
                        <AccordionItem key={index} darkMode={darkMode} data-aos="fade-up" data-aos-delay={`${index * 100}`}>
                            <AccordionHeader
                                isOpen={openStates[index]}
                                onClick={() => toggleAccordion(index)}
                                darkMode={darkMode}
                            >
                                <Question>{item.question}</Question>
                                <Icon>
                                    {openStates[index] ? <FaChevronUp /> : <FaChevronDown />}
                                </Icon>
                            </AccordionHeader>
                            <AccordionContent isOpen={openStates[index]} darkMode={darkMode}>
                                <Answer darkMode={darkMode}>{item.answer}</Answer>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </AccordionGrid>
            </FAQContainer>
        </div>
    );
};

export default FAQ;
