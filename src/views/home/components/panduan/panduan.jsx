import React, { useEffect } from 'react';
import styled from 'styled-components';
import DownloadIcon from '@mui/icons-material/Download';
import style from '../../style.module.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Styled components
const DocumentSection = styled.div`
  margin: 0 auto;
  padding: 3rem 1rem;
  border-radius: 15px;
  max-width: 1500px;

  @media (max-width: 768px) {
    padding: 2rem 0.5rem;
  }
`;

const DocumentCard = styled.a`
  background-color: ${props => props.darkMode ? '#3a9cbb' : '#3a9cbb'};
  border-radius: 10px;
  text-align: center;
  padding: 0.8rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: white;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 0.75rem;
  }
`;

const DocumentCard2 = styled(DocumentCard)`
  max-width: 48%;
  margin: auto;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    max-width: none;
    width: 100%;
  }
`;

const DocumentText = styled.div`
  flex-grow: 1;
  margin-right: 1rem;
  font-size: 1.2rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-right: 0;
    margin-bottom: 0.5rem;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Column = styled.div`
  width: 48%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Title = styled.h2`
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

const DokumenPanduan = ({ darkMode }) => {
    const documents = [
        [
            { text: "Petunjuk Teknis Penyelenggaraan Prodi PTKI (2023)", link: "https://diktis.kemenag.go.id/akademik/prodi/file/juknis_prodi_2023.pdf" },
            { text: "Petunjuk Teknis Penyelenggaraan Prodi PTKI (2022)", link: "https://diktis.kemenag.go.id/akademik/prodi/file/juknis_prodi_2022.pdf" },
            { text: "Template Surat Pernyataan dosen tetap (Penuh Waktu)", link: "#" },
        ],
        [
            { text: "Panduan Pembukaan Program Studi Baru PTKI", link: "https://diktis.kemenag.go.id/NEW/file/dokumen/2815653419813635final.pdf" },
            { text: "Buku Panduan Pembukaan Program Studi Baru", link: "https://diktis.kemenag.go.id/NEW/file/dokumen/2815324486663283IFULL.pdf" },
            { text: "Panduan Pembukaan Program Studi Baru PTKI", link: "https://diktis.kemenag.go.id/NEW/file/dokumen/2815653419813635final.pdf" },
        ],
        [
            { text: "Template Daftar Dosen Untuk Kebutuhan Registrasi", link: "#" },
        ]
    ];

    useEffect(() => {
        AOS.init({
            duration: 500, 
            easing: 'ease-in-out',
            once: true, 
        });
    }, []);

    return (
        <DocumentSection darkMode={darkMode} className={style.dokumenSec}>
            <Title darkMode={darkMode}>
                Dokumen Panduan Program Studi
            </Title>
            <Row>
                {documents.slice(0, 2).map((column, colIndex) => (
                    <Column key={colIndex}>
                        {column.map((doc, index) => (
                            <DocumentCard
                                key={index}
                                href={doc.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                darkMode={darkMode}
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                <DocumentText>{doc.text}</DocumentText>
                                {/* <DownloadButton>
                                    <DownloadIcon fontSize='small' style={{ marginRight: '0.5rem' }} />
                                </DownloadButton> */}
                            </DocumentCard>
                        ))}
                    </Column>
                ))}
            </Row>
            {documents[2].map((doc, index) => (
                <DocumentCard2
                    key={index}
                    href={doc.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    darkMode={darkMode}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                >
                    <DocumentText>{doc.text}</DocumentText>
                    {/* <DownloadButton>
                        <DownloadIcon fontSize='small' style={{ marginRight: '0.5rem' }} />
                    </DownloadButton> */}
                </DocumentCard2>
            ))}
        </DocumentSection>
    );
};

export default DokumenPanduan;
