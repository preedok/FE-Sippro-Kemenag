import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Paper, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: 400,
  margin: 'auto',
  borderRadius: 16,
  boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
}));
const IconWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& svg': {
    fontSize: 64,
    color: theme.palette.error.main,
  },
}));
const UserNotFound = () => {
  const navigate = useNavigate();
  const handleBackToLogin = () => {
    navigate('/login');
  };
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: (theme) => theme.palette.grey[100],
      }}
    >
      <StyledPaper elevation={3}>
        <IconWrapper>
          <ErrorOutlineIcon />
        </IconWrapper>
        <Typography variant="h4" component="h1" gutterBottom>
          User Not Found
        </Typography>
        <Typography variant="body1" align="center" paragraph>
          The user you are trying to log in as does not exist in our system.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleBackToLogin}
          size="large"
          sx={{ mt: 2, borderRadius: 2, textTransform: 'none' }}
        >
          Back to Login
        </Button>
      </StyledPaper>
    </Box>
  );
};

export default UserNotFound;