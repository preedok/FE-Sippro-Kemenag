import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { GetApiBaseUrl } from "../../utils/env";
import style from "./style.module.css";
import axios from "axios";
import elipse3 from "../../assets/Ellipse 3.svg";
import elipse4 from "../../assets/Ellipse 4.svg";
import Swal from "sweetalert2";
import { Link, useNavigate, useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CreateIcon from "@mui/icons-material/Create";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const editConfigPage = () => {
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];
  // const baseUrl = GetApiBaseUrl();
  // const navigate = useNavigate()
  const currentUrl = window.location.search;
  const urlParams = new URLSearchParams(currentUrl);
  // const token = urlParams.get('token');
  const {id} = useParams()
  const [name, setName] = useState('Name tes')
  const [value, setValue] = useState('Value tes')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(`name>> ${name}, value>> ${value}`)
  }

  return (
    <>
      <Helmet>
        <title>Kemenag | Config</title>
      </Helmet>

      <div
        className={`${style.main} ${style.customBackground} position-relative`}
        style={{ padding: "40px 32px", marginLeft: "auto" }}
      >
        <img
          src={elipse4}
          alt=""
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            zIndex: 1,
          }}
        />
        <img
          src={elipse3}
          alt=""
          style={{
            position: "absolute",
            bottom: "0",
            right: "0",
            zIndex: 1,
          }}
        />
        <section
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <div style={{ width: "50%", zIndex: 2, padding: 20 }} className={`${style.card3}`}>
          <form method="POST" onSubmit={handleSubmit}>
            <h4>Edit {id}</h4>
                  <div className="mb-3">
                    <label
                      className="form-label"
                      
                      
                    >
                      Name
                    </label>
                    <TextField
                      id="name"
                      name="name"
                      type="text"
                      style={{ height: "54px" }}
                      className={`form-control`}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Name"
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      className="form-label"
                      
                      
                    >
                      Value
                    </label>
                    <TextField
                      id="value"
                      name="value"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      style={{ height: "54px" }}
                      type="text"
                      className={`form-control`}
                      placeholder="Value"
                    />

                  </div>
                  <Button variant="contained" type="submit" color="success">
                    Save
                  </Button>
                </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default editConfigPage;
