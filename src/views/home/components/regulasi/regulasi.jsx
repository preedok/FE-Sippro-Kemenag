import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DownloadIcon from '@mui/icons-material/Download';
import style from '../../style.module.css';
import Swal from 'sweetalert2';
import api from '../../../service/api';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Styled components
const RegulationSection = styled.div`
  margin: 0 auto;
  padding: 3rem 1rem;
  border-radius: 15px;
  max-width: 1520px;

  @media (max-width: 768px) {
    padding: 2rem 0.5rem;
  }
`;

const RegulationCard = styled(motion.div)`
  background-color: ${props => props.darkMode ? '#3a9cbb' : '#3a9cbb'};
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
  }
`;

const RegulationText = styled.div`
  flex-grow: 1;
  margin: 0 1rem;
  color: ${props => props.darkMode ? '#e0e0e0' : 'white'};
  font-size: 1rem;

  @media (max-width: 768px) {
    margin: 0.5rem 0;
    width: 100%;
    font-size: 0.9rem;
  }
`;

const DownloadButton = styled.a`
  display: flex;
  align-items: center;
  background-color: green;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1a7090;
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    margin-top: 0.5rem;
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
`;

const IconWrapper = styled.div`
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 0.5rem;
  }
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

const Regulasi = ({ darkMode, regulationList }) => {
  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);
  const regulations = [
    { text: 'PMA 17 Tahun 2023 Tentang Tata Cara Pemberian Izin Penyelenggaraan Prodi Dalam Rumpun Ilmu Agama', link: `PMA-36-2009.pdf` },
    { text: 'Undang-Undang Nomor 12 Tahun 2012 tentang Pendidikan Tinggi', link: `UU-Nomor-12-Tahun-2012-ttg-Pendidikan-Tinggi.pdf` },
    { text: 'Peraturan Pemerintah Republik Indonesia Nomor 4 Tahun 2014 Tentang Penyelenggaraan Pendidikan Tinggi dan Pengelolaan Perguruan Tinggi', link: `PP-Nomor-04-Tahun-2014.pdf` },
    { text: 'Peraturan Menteri Agama Republik Indonesia Nomor 36 Tahun 2009 Tentang Penetapan Pembidangan Ilmu dan Gelar Akademik di Lingkungan Perguruan Tinggi Agama Islam', link: `PMA-36-2009.pdf` },
    { text: 'Peraturan Direktur Jenderal Pendidikan Islam Nomor : Dj.I/212/2011 Tentang Persyaratan Dan Prosedur Pembukaan Program Studi Perguruan Tinggi Agama Islam', link: `dirjen-212-2011-prosedur-prodi-lamp-sk.pdf` },
    { text: 'Peraturan Direktur Jenderal Pendidikan Islam Nomor 1429 Tahun 2012 Tentang Penataan Program Studi di Perguruan Tinggi Agama Islam', link: `PER-DIRJEN-PENDIS-1429-2012-PENATAAN-PRODI-DI-PTAI.pdf` },
    { text: 'Keputusan Direktur Jenderal Pendidikan Islam Nomor 3389 Tahun 2013 Tentang Penamaan Perguruan Tinggi Agama Islam, Fakultas dan Jurusan', link: `dirjen33892013penamaan.pdf` },
    { text: 'Peraturan Menteri Agama Republik Indonesia Nomor 33 Tahun 2016 Tentang Gelar Akademik Perguruan Tinggi Keagamaan', link: `Permenag-Nomor-33-Tahun-2016.pdf` },
    { text: 'Peraturan Menteri Agama Republik Indonesia Nomor 38 Tahun 2017 Tentang Perubahan atas PMA Nomor 33 Tentang Gelar Akademik Perguruan Tinggi Keagamaan', link: `Permenag-Nomor-38-Tahun-2017.pdf` },
    // Commented out as in the original:
    // { text: 'Keputusan Direktur Jenderal Pendidikan Islam Nomor 61 Tahun 2020 Tentang Petunjuk Pelaksanaan Pembukaan Izin Program Studi Pendidikan Profesi Guru', link: 'https://staging-be.sippro.madrasahkemenag.com/api/publicfile/' }
  ];
  const handleDownload = async (link) => {
    try {
      // Tampilkan notifikasi "Proses download"
      Swal.fire({
        title: 'Downloading...',
        text: 'File sedang diunduh, harap tunggu.',
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
        allowOutsideClick: false
      });

      const response = await api.get(`/publicfile/${link}`, { responseType: 'blob' });

      const contentDisposition = response.headers['content-disposition'];
      let fileName = 'download';
      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/i);
        if (fileNameMatch && fileNameMatch.length === 2) fileName = fileNameMatch[1];
      }
      const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement('a');
      a.href = blobUrl;
      a.setAttribute('download', fileName);
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(blobUrl);
      Swal.fire({
        title: 'Berhasil!',
        text: 'File berhasil diunduh.',
        icon: 'success',
        timer: 2000,
      });
    } catch (error) {
      Swal.fire({
        title: 'Gagal!',
        text: 'Download file gagal, silakan coba lagi.',
        icon: 'error',
        timer: 2000,
      });
      console.error('Download failed:', error);
    }
  };
  return (
    <RegulationSection id="regulasi" darkMode={darkMode} className={style.regulasiSec}>
      <Title darkMode={darkMode}>Regulasi</Title>
      <motion.div initial="hidden" animate="visible" variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1
          }
        }
      }}>
        {regulations.map((regulation, index) => (
          <RegulationCard
            key={index}
            darkMode={darkMode}
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <IconWrapper data-aos="fade-right" data-aos-delay={index * 150}>
              <PictureAsPdfIcon style={{ color: '#e74c3c', fontSize: '2rem' }} />
            </IconWrapper>
            <RegulationText darkMode={darkMode} data-aos="fade-left" data-aos-delay={index * 200}>
              {regulation.text}
            </RegulationText>
            <DownloadButton
              onClick={() => handleDownload(regulation.link)}
              data-aos="fade-up"
              data-aos-delay={index * 250}
            >
              <DownloadIcon fontSize='small' style={{ marginRight: '0.1rem' }} />
            </DownloadButton>
          </RegulationCard>
        ))}
      </motion.div>
    </RegulationSection>
  );
};

export default Regulasi;
