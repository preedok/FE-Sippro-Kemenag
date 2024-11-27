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
            subText: (
                <p>Pengusul harus mengupload dokumen persyaratan yaitu Borang Pembukaan Program Studi. Pilihan template Borang (sesuai usulan) sebagai berikut:
                    <div className="d-flex flex-column m-1">
                        <a href="">Prodi Sarjana</a>
                        <a href=""> Prodi PPG</a>
                        <a href="">Prodi Magister</a>
                        <a href=""> Prodi Doktor</a> 
                  </div>
                    Juga dokumen-dokumen pendukung lainnya yang dipersyaratkan. Setelah melakukan Upload pastikan melakukan KONFIRMASI.</p>
            )
        },
    ];

    return (
        <Box sx={{ padding: '20px' }}>
            <StepList>
                {steps.map((step, index) => (
                    <StepItem key={index}>
                        <ListItemText
                            secondary={<StepDescription>{step.subText}</StepDescription>}
                        />
                    </StepItem>
                ))}
            </StepList>
        </Box>
    );
};

export default Step2;