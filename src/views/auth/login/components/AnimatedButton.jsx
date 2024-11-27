import React from 'react';
import { Button } from '@mui/material';
import { motion } from 'framer-motion';

// Create a motion version of Material-UI Button
const MotionButton = motion(Button);

const AnimatedButton = ({ children, ...props }) => {
  return (
    <MotionButton
      variant="outlined"
      style={{
        height: "54px",
        fontSize: '16px',
        fontWeight: "600",
        padding: '0px 190px',
        transition: "transform 0.3s, box-shadow 0.3s",
      }}
      className="mt-4 mb-3 rounded-5 btn-primary"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </MotionButton>
  );
};

export default AnimatedButton;