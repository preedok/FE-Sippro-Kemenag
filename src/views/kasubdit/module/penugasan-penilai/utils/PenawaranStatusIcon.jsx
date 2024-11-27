import React from 'react';
import PenawaranStatusName from '../../../../../utils/penawaranStatusName';
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import CancelIcon from "@mui/icons-material/Cancel";
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CachedIcon from '@mui/icons-material/Cached';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';
import OfflinePinIcon from '@mui/icons-material/OfflinePin';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import TimerOffIcon from '@mui/icons-material/TimerOff';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import VerifiedIcon from '@mui/icons-material/Verified';
import GradingIcon from '@mui/icons-material/Grading';
import RuleIcon from '@mui/icons-material/Rule';
const PenawaranStatusIcon = ({ status }) => {
    const statusText = {
        [`${PenawaranStatusName.AssesmentOffering}`]: <AccessAlarmIcon style={{ color: 'orange' }} />,
        [`${PenawaranStatusName.AssesmentOfferAccepted}`]: <CheckCircleIcon style={{ color: 'green' }} />,
        [`${PenawaranStatusName.Rejected}`]: <CancelIcon style={{ color: 'red' }} />,
        [`${PenawaranStatusName.AssesmentBackToUser}`]: <ReplyAllIcon style={{ color: 'red' }} />,
        [`${PenawaranStatusName.Requested}`]: <AvTimerIcon style={{ color: 'yellow' }} />,
        [`${PenawaranStatusName.DocumentCompleted}`]: <DocumentScannerIcon style={{ color: 'green' }} />,
        [`${PenawaranStatusName.Confirmed}`]: <DoneAllIcon style={{ color: 'green' }} />,
        [`${PenawaranStatusName.FixConfirmed}`]: <FactCheckIcon style={{ color: 'green' }} />,
        [`${PenawaranStatusName.AssesmentInprogress}`]: <CachedIcon style={{ color: 'yellow' }} />,
        [`${PenawaranStatusName.AssesmentCompleted}`]: <LibraryAddCheckIcon style={{ color: 'green' }} />,
        [`${PenawaranStatusName.AssesmentLocationInProgress}`]: <EditLocationAltIcon style={{ color: 'yellow' }} />,
        [`${PenawaranStatusName.AssesmentLocationCompleted}`]: <WhereToVoteIcon style={{ color: 'green' }} />,
        [`${PenawaranStatusName.AssesmentAllCompleted}`]: <OfflinePinIcon style={{ color: 'green' }} />,
        [`${PenawaranStatusName.AssesmentExpired}`]: <TimerOffIcon style={{ color: 'red' }} />,
        [`${PenawaranStatusName.AssesmentCanceled}`]: <HighlightOffIcon style={{ color: 'red' }} />,
        [`${PenawaranStatusName.ValidSK}`]: <BeenhereIcon style={{ color: 'green' }} />,
        [`${PenawaranStatusName.Approved}`]: <VerifiedIcon style={{ color: 'green' }} />,
        [`${PenawaranStatusName.AllProcessDone}`]: <GradingIcon style={{ color: 'green' }} />,
        [`${PenawaranStatusName.DalamValidasi}`]: <RuleIcon style={{ color: 'yellow' }} />,
    };

    const iconComponent = statusText[status] || null;

    return (
        <div className="d-flex ms-auto">
            {iconComponent}
            <br />
        </div>
    );
};

export default PenawaranStatusIcon;