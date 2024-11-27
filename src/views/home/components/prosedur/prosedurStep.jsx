import React, { useState, useEffect } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, useMediaQuery } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/system';
import Step1 from "./step1";
import Step2 from "./step2";
import "./styles.css";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import prosedur from '../../../../assets/campus.jpg';
import style from '../../style.module.css'
import AOS from 'aos';
import 'aos/dist/aos.css';

// Styled components
const CustomAccordion = styled(Accordion)(({ theme }) => ({
  backgroundColor: '#f5f5f5',
  marginBottom: '20px', // Adjusted margin
  borderRadius: '12px',
  '&:before': {
    display: 'none',
  },
}));

const CustomAccordionSummary = styled(AccordionSummary)(({ theme, expanded }) => ({
  backgroundColor: expanded ? '#4535C1' : '#3a9cbb', // Changed to match StepNumber color
  color: '#fff',
  borderRadius: expanded ? '12px 12px 0 0' : '12px', // Removed bottom radius when expanded
  minHeight: '72px',
  '& .MuiAccordionSummary-expandIcon': {
    color: '#fff',
    fontSize: '2rem',
  },
}));

const CustomAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: '20px', // Adjusted padding
  backgroundColor: '#fff',
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const StepIndicator = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginRight: '20px',
}));

const StepNumber = styled(Box)(({ theme, active }) => ({
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  backgroundColor: active ? '#4535C1' : '#3a9cbb',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#fff',
  fontWeight: 'bold',
  fontSize: '1.5rem',
}));

const StepConnector = styled(Box)(({ theme }) => ({
  width: '3px',
  height: '18px',
  backgroundColor: '#3a9cbb',
  margin: '10px 0 20px 0',
  position: 'relative',
  '&:after': {
    content: '"\\2193"',
    position: 'absolute',
    bottom: '-7px',
    left: '50%',
    transform: 'translateX(-50%)',
    color: '#3a9cbb',
    fontSize: '2rem',
    lineHeight: '0.9', 
  },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  flex: '1',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start', // Changed to align to the top
  padding: '10px',
  marginTop: '-1rem',
  borderRadius: '12px',
  height: '100%', // Added to maintain consistent height
}));
const VideoContainer = styled(Box)(({ theme }) => ({
  flex: '1',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  padding: '10px',
  marginTop: '-1rem',
  borderRadius: '12px',
  height: '100%',
}));

const StepsContainer = styled(Box)(({ theme }) => ({
  flex: '2',
  padding: '10px', // Adjusted padding
}));

const StepsComponent = ({ darkMode }) => {
  const [expanded, setExpanded] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const steps = [
    { icon: <HowToRegIcon />, title: "Pendaftaran", content: <Step1 /> },
    { icon: <LibraryBooksIcon />, title: "Penilaian", content: <Step2 /> },
    { icon: <ChecklistRtlIcon />, title: "Validasi BAN PT/ LAMEMBA", content: "Akreditasi minimum BAN PT adalah proses penilaian tahap akhir terkait kelayakan usulan prodi sesuai dengan ketentuan yang telah ditetapkan." },
    { icon: <FactCheckIcon />, title: "KMA", content: "Untuk usulan Prodi yang sudah direkomendasikan/Akreditasi Minimum BAN PT diusulkan untuk diberikan Keputusan Menteri Agama. SK yang sudah dikeluarkan dapat diambil di Kantor Verifikator Kemenag Pusat." },
  ];

  return (
    <>
      <div className='col-md-12 '>
        <h1 data-aos="zoom-in-right"
          data-aos-duration="1000" className={`${style.textHeadProsedur} mb-3 `}>Apa Saja <span style={{ color: darkMode ? "#FB773C" : "#2190b2" }}> Prosedurnya?</span></h1>

      </div>
      <Box className="container1 ms-2" sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', height: 'auto' }}>
        <ImageContainer data-aos="fade-up"
          data-aos-delay={600}>
          <div className="mt-4">
            <img src={prosedur} alt="Deskripsi gambar" style={{ width: '100%', height: '106%', borderRadius: '12px' }} />
          </div>
        </ImageContainer>
        <StepsContainer>
          <Box className="wrapper" sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
            {!isMobile && (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '20px' }}>
                {steps.map((step, index) => (
                  <React.Fragment key={index}>
                    <StepIndicator data-aos="fade-right" data-aos-delay={index * 100}>
                      <StepNumber active={expanded === `panel${index + 1}`}>{index + 1}</StepNumber>
                      {index < steps.length - 1 && <StepConnector />}
                    </StepIndicator>
                  </React.Fragment>
                ))}
              </Box>
            )}
            <Box sx={{ flexGrow: 1 }} data-aos="fade-up" data-aos-delay={500}>
              {steps.map((step, index) => (
                <CustomAccordion key={index} expanded={expanded === `panel${index + 1}`} onChange={handleChange(`panel${index + 1}`)}>
                  <CustomAccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index + 1}bh-content`}
                    id={`panel${index + 1}bh-header`}
                    expanded={expanded === `panel${index + 1}`}
                  >
                    <Typography sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                      {isMobile && (
                        <StepNumber active={expanded === `panel${index + 1}`} sx={{ marginRight: '10px', width: '30px', height: '30px', fontSize: '1rem' }}>
                          {index + 1}
                        </StepNumber>
                      )}
                      {step.icon}
                      <span style={{ marginLeft: '10px' }}>{step.title}</span>
                    </Typography>
                  </CustomAccordionSummary>

                  <CustomAccordionDetails>
                    {typeof step.content === 'string' ? (
                      <Typography style={{
                        padding: '10px', // Adjusted padding
                        backgroundColor: '#f5f5f5',
                        borderRadius: '10px',
                      }}>
                        {step.content}
                      </Typography>
                    ) : step.content}
                  </CustomAccordionDetails>
                </CustomAccordion>
              ))}
            </Box>
          </Box>
        </StepsContainer>
      </Box>
    </>
  );
};

export default StepsComponent;
