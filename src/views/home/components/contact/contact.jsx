import React, { useEffect } from 'react';
import styled from 'styled-components';
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import { useDarkMode } from '../../../../utils/DarkModeContext';
import AOS from 'aos';
import 'aos/dist/aos.css';
import style from '../../style.module.css';
import map from '../../../../assets/map.gif';

const ContactContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;

  @media (min-width: 768px) {
    padding: 40px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  overflow: hidden;
  max-width: 1476px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: ${props => props.darkMode ? '#180161' : '#CAF4FF'};
`;

const Header = styled.div`
  background-color: #2190b2;
  padding: 15px;
  text-align: center;

  @media (min-width: 768px) {
    padding: 20px;
  }
`;

const HeaderTitle = styled.h1`
  color: white;
  margin: 0;

  @media (min-width: 768px) {
    font-size: 32px;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 40px;
  }
`;

const InfoSection = styled.div`
  flex: 1;
  min-width: 100%;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    min-width: 300px;
    padding-right: 40px;
    margin-bottom: 0;
  }
`;

const MapSection = styled.div`
  flex: 1;
  min-width: 100%;

  @media (min-width: 768px) {
    min-width: 300px;
  }
`;

const Logo = styled.img`
  width: 100%;
  max-width: 350px;
  margin-bottom: 20px;
  display: block;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 768px) {
    margin-left: 0;
    margin-right: 0;
  }
`;

const ContactInfo = styled.div`
  margin-bottom: 20px;
`;

const InfoItem = styled.p`
  display: flex;
  align-items: center;
  color: ${props => props.darkMode ? '#e0e0e0' : '#4a4a4a'};
  font-size: 14px;
  margin: 10px 0;

  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

const Icon = styled.span`
  margin-right: 10px;
  color: #3498db;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 300px;
  border-radius: 10px;
  overflow: hidden;

  @media (min-width: 768px) {
    height: 440px;
  }
`;

const Contact = () => {
  const { darkMode } = useDarkMode();

  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  return (
    <section style={{ backgroundColor: darkMode ? "#17153B" : "" }} className={`${style.backgroundRow} ${style.hidden} card-body scroll`}>
      <ContactContainer>
        <ContentWrapper darkMode={darkMode}>
          <Header data-aos="fade-down">
            <HeaderTitle>Kontak Kami</HeaderTitle>
          </Header>
          <MainContent>
            <InfoSection data-aos="fade-right">
              <Logo src={map} alt="Logo" />
              <ContactInfo>
                <InfoItem darkMode={darkMode}>
                  <Icon><FaMapMarkerAlt /></Icon>
                  <span>Jl. Lapangan Banteng Barat No. 3 - 4 Lt. 7 Jakarta Pusat</span>
                </InfoItem>
                <InfoItem darkMode={darkMode}>
                  <Icon><FaEnvelope /></Icon>
                  <span>sippro@diktis.kemenag.go.id</span>
                </InfoItem>
                {/* <InfoItem darkMode={darkMode}>
                  <Icon><FaPhone /></Icon>
                  <span>+62 858-8115-3669</span>
                </InfoItem> */}
              </ContactInfo>
            </InfoSection>
            <MapSection data-aos="fade-left">
              <MapContainer>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12086.01585566917!2d106.81497826707349!3d-6.171926348418575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f6338b8ae61f%3A0xeedad0e9ebd6e11c!2sKementerian%20Agama%20Republik%20Indonesia!5e1!3m2!1sid!2sus!4v1722961986115!5m2!1sid!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </MapContainer>
            </MapSection>
          </MainContent>
        </ContentWrapper>
      </ContactContainer>
    </section>
  );
}

export default Contact;
