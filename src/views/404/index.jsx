import React from "react";
import style from "./style.module.css";
import img from "../../assets/404.png";
import { Helmet } from "react-helmet";
const Page404 = () => {
  return (
    <>
      <Helmet>
        <title>Kemenag | 404 </title>
      </Helmet>
      <div
        style={{ backgroundColor: "rgb(3, 148, 216" }}
        className="container-fluid"
      >
        <div className="container" style={{ overflow: "hidden" }}>
          <div className="row vh-100 d-flex justify-content-center align-items-center">
            <img src={img} alt="" className={style.img} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page404;
