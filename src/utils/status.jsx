import React from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileAlt, faCheckCircle, faPaperPlane, faRedo, faBan,
  faHandshake, faUserCheck, faHourglassHalf, faMapMarkerAlt, faUndoAlt,
  faClock, faTimesCircle, faUniversity, faCertificate, faFileSignature,
  faFileUpload, faFileContract, faIdCard, faArrowCircleLeft, faClipboardCheck,
  faTasks, faBusinessTime, faLaptop, faCommentDots
} from '@fortawesome/free-solid-svg-icons';

const StyledChip = styled(Chip)(({ theme, customcolor }) => ({
  backgroundColor: customcolor,
  color: 'white',
  fontWeight: 'bold',
  padding: '4px 8px',
  height: 'auto',
  width: '213px',
  justifyContent: 'flex-start',
  '& .MuiChip-icon': {
    color: 'white',
    marginRight: '8px',
    fontSize: '1rem',
  },
  '& .MuiChip-label': {
    fontWeight: 'bold',
    padding: '4px 0',
    fontSize: '0.85rem',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'block',
    textAlign: 'left',
    flex: '1 1 auto',
  },
}));
const AssessmentCount = styled('span')(({ theme, isWarning }) => ({
  backgroundColor: isWarning ? 'rgba(255, 255, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)',
  color: isWarning ? 'yellow' : 'white',
  borderRadius: '12px',
  padding: '2px 6px',
  fontSize: '0.75rem',
  marginLeft: '8px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '24px',
  height: '24px',
}));
const statusValues = {
  0: { text: 'Dokumen Belum Lengkap', color: '#FFA500', icon: faFileAlt },
  1: { text: 'Dokumen Selesai', color: '#4CAF50', icon: faCheckCircle },
  2: { text: 'Dokumen Sudah Lengkap', color: '#719FB0', icon: faPaperPlane },
  3: { text: 'Sudah Perbaikan', color: '#52057B', icon: faRedo },
  9: { text: 'Permintaan Dibatalkan', color: 'yellow', icon: faBan },
  10: { text: 'Dokumen Usulan Lengkap', color: 'teal', icon: faFileAlt },
  20: { text: 'Penawaran Assessment', color: 'orange', icon: faHandshake },
  21: { text: 'Assessment Kecukupan oleh Evaluator', color: 'green', icon: faUserCheck },
  22: { text: 'Assessment Berlangsung', color: '#687EFF', icon: faHourglassHalf },
  23: { text: 'Assessment Evaluator Selesai', color: 'green', icon: faCheckCircle },
  24: { text: 'Lokasi Assessment Progress', color: 'orange', icon: faMapMarkerAlt },
  27: { text: 'Usulan di Kembalikan ke User', color: '#952323', icon: faUndoAlt },
  28: { text: 'Assessment Kadaluarsa', color: 'purple', icon: faClock },
  29: { text: 'Assessment Dibatalkan', color: 'yellow', icon: faTimesCircle },
  26: { text: 'Assessment selesai', color: 'green', icon: faCheckCircle },
  40: { text: 'Valid untuk Lembaga Akreditasi', color: 'teal', icon: faUniversity },
  50: { text: 'Validasi Ban PT / LAM', color: 'green', icon: faCertificate },
  51: { text: 'Dalam Proses SK', color: '#219C90', icon: faFileSignature },
  521: { text: 'KMA diunggah dan paraf 1', color: '#3FA2F6', icon: faFileUpload },
  522: { text: 'KMA diunggah dan paraf 2', color: '#36BA98', icon: faFileUpload },
  523: { text: 'KMA diunggah dan paraf 3', color: '#37B7C3', icon: faFileUpload },
  524: { text: 'KMA diunggah dan paraf 4', color: '#91DDCF', icon: faFileUpload },
  525: { text: 'KMA Final', color: '#91DDCF', icon: faFileContract },
  526: { text: 'KMA diunggah dan paraf 6', color: '#91DDCF', icon: faFileUpload },
  527: { text: 'KMA diunggah dan paraf 7', color: '#91DDCF', icon: faFileUpload },
  528: { text: 'KMA diunggah dan paraf 8', color: '#91DDCF', icon: faFileUpload },
  529: { text: 'KMA diunggah dan paraf 9', color: '#91DDCF', icon: faFileUpload },
  60: { text: 'Penerbitan Izin', color: 'green', icon: faIdCard },
  99: { text: 'di Kembalikan', color: 'red', icon: faArrowCircleLeft },
  41: { text: 'Dalam validasi', color: 'orange', icon: faClipboardCheck },
  19: { text: 'Dokumen dikembalikan', color: 'red', icon: faArrowCircleLeft },
  299: { text: 'Validasi BANPT/LAM dikembalikan', color: 'red', icon: faArrowCircleLeft },
  221: { text: 'Penugasan Penilaian Lapangan', color: 'orange', icon: faTasks },
  222: { text: 'Penilaian Lapangan Sedang Berlangsung', color: '#179BAE', icon: faBusinessTime },
  223: { text: 'Penilaian Lapangan Selesai', color: 'green', icon: faCheckCircle },
  226: { text: 'Semua Penilaian Lapangan Selesai', color: 'blue', icon: faLaptop },
  227: { text: 'Penilaian Lapangan dikembalikan', color: 'red', icon: faArrowCircleLeft },
};

const ProdiActionName = ({ status, assesmentCount }) => {
  const statusObject = statusValues[status] || { text: 'Status Tidak Dikenal', color: '#9E9E9E', icon: faCommentDots };
  const { text, color, icon } = statusObject;

  const [assesmentCount1, assesmentCount2] = (assesmentCount || '').split('/').map(Number);
  const isWarning = assesmentCount1 !== assesmentCount2;
  const showAssessmentCount = assesmentCount && assesmentCount !== 'N/A';

  return (
    <Tooltip title={`${text} | ${assesmentCount || ''}`} arrow>
      <StyledChip
        icon={<FontAwesomeIcon icon={icon} />}
        label={
          <React.Fragment>
            <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>{text}</span>
            {showAssessmentCount && (
              <AssessmentCount isWarning={isWarning}>
                {assesmentCount}
              </AssessmentCount>
            )}
          </React.Fragment>
        }
        customcolor={color}
        size="small"
      />
    </Tooltip>
  );
};


export default ProdiActionName;