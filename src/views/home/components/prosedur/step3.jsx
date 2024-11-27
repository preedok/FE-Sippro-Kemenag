import React from "react";
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/system';

const StepList = styled(List)(({ theme }) => ({
  width: '100%',
  padding: '20px',
  backgroundColor: '#f5f5f5',
  borderRadius: '10px',
}));

const StepItem = styled(ListItem)(({ theme }) => ({
  position: 'relative',
  padding: '10px 0 20px 60px',
  '&::before': {
    content: '""',
    position: 'absolute',
    left: '20px',
    top: 0,
    bottom: 0,
    width: '2px',
    background: '#3a9cbb',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    left: '13px',
    top: '24px',
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    background: '#3a9cbb',
    boxShadow: '0 0 0 4px #fff',
  },
}));

const StepTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.3rem',
  fontWeight: 600,
  color: '#333',
  marginBottom: '8px',
}));

const StepDescription = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  color: '#666',
  lineHeight: 1.6,
}));

const Step2 = () => {
  const steps = [
    {
      subText: "Setelah dokumen baik usulan prodi baru yang telah memenuhi syarat akan dilakukan penilaian oleh Asesor yang sudah ditentukan. Hasil penilaian akan menentukan apakah Usulan layak untuk divisitasi (Untuk Pasca Sarjana) atau ditolak, jika ditolak maka lembaga harus mengusulkan kembali."
    },
    // {
    //   text: "Asesmen Kecukupan",
    //   subText: "Penilaian kecukupan berkaitan dengan ketersediaan sumber daya dan infrastruktur yang diperlukan untuk mendukung pelaksanaan program studi baru."
    // },
    // {
    //   text: "Asesmen Lapangan",
    //   subText: "Penilaian lapangan mencakup analisis pasar kerja dan kebutuhan industri terkait dengan program studi yang diajukan."
    // },
    // {
    //   text: "Visitasi",
    //   subText: "Visitasi dilakukan terhadap prodi baru yang diusulkan untuk mengkonfirmasi kebenaran dokumen dan data yang sudah dinilai sebelumnya."
    // }
  ];

  return (
    <Box sx={{ margin: 'auto', padding: '20px' }}>
      <StepList>
        {steps.map((step, index) => (
          <StepItem key={index}>
            <ListItemText
              // primary={<StepTitle>{`${index + 1}. ${step.text}`}</StepTitle>}
              secondary={<StepDescription>{step.subText}</StepDescription>}
            />
          </StepItem>
        ))}
      </StepList>
    </Box>
  );
};

export default Step2;