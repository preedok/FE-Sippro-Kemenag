import React from 'react';
import Menu from '@mui/material/Menu';
import Button from "react-bootstrap/Button"
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import arrowDown from "../../assets/arrow_down.svg";
import { useDarkMode } from '../../utils/DarkModeContext';

const DropdownAksi = ({ itemComponent }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const { darkMode } = useDarkMode()
    return (
        <div>
            <ButtonGroup>
                <Button onClick={handleClick} variant="none" style={{ background: darkMode ? "#492E87" : "#3A57E8", width: "64px" }} className="text-white">Aksi</Button>
                <Button onClick={handleClick} variant="none" style={{ background: darkMode ? "#6C22A6" : "rgba(58, 87, 232, 0.9)", width: "34px" }} className="text-white d-flex align-items-center justify-content-center p-0">
                    <img src={arrowDown} alt="" width={"10px"} />
                </Button>
            </ButtonGroup>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={{
                    ".MuiList-root": {
                        minWidth: "120px"
                    }
                }}
            >
                <div onClick={handleClose}>
                    {itemComponent}
                </div>
            </Menu>
        </div>
    );
}

export default DropdownAksi;