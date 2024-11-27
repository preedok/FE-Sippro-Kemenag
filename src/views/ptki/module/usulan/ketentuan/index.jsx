import React from "react";
import style from "../ketentuan/style.module.css";
import { Helmet } from "react-helmet";
const Index = () => {
  return (
    <>
      <Helmet>
        <title>Kemenag | Ketentuan </title>
      </Helmet>
      <section style={{ backgroundColor: '#f4feff'}}>
        <div
          style={{
            border: "2px solid orange",
            borderRadius: "15px",
            height: "auto",
            justifyContent: "center",
            alignItems: "center",
          }}
          className={`container ${style.main} mt-5 mb-5`}
        >
          <div className="container">
            <h3 style={{ textAlign: "center" }} className="mt-5">
              KETENTUAN PEMBUKAAN PROGRAM STUDI BARU (PRASYARAT)
            </h3>
            <div className="mt-4 container">
              <h5>DIPLOMA/SARJANA/SARJANA TERAPAN</h5>
              <div className="container">
                <ul>
                  <li>
                    <p className={style.lis}>
                      Unit Pengelola Program Studi (UPPS) yang memiliki Prodi
                      terkreditasi B atau Baik Sekali kurang dari 50%, maka
                      tidak boleh mengajukan usulan prodi baru;
                    </p>
                  </li>
                  <li>
                    <p className={style.lis}>
                      UPPS yang memiliki Prodi terkreditasi B atau Baik Sekali
                      sebanyak 50% s/d 70% diperbolehkan mengajukan 1 (satu)
                      Prodi baru;
                    </p>
                  </li>
                  <li>
                    <p className={style.lis}>
                      UPPS yang memiliki Prodi terkreditasi B atau Baik Sekali
                      antara 70% - 99%, diperbolehkan mengusulkan paling banyak
                      2 (dua) Prodi baru;
                    </p>
                  </li>
                  <li>
                    <p className={style.lis}>
                      UPPS yang hanya memiliki satu-satunya Prodi dan
                      terakreditasi B atau Baik Sekali, diperbolehkan mengajukan
                      paling banyak 3 (tiga) Prodi baru;
                    </p>
                  </li>
                  <li>
                    <p className={style.lis}>
                      UPPS yang seluruh Prodi yang dimiliki terakreditasi B atau
                      Baik Sekali (100% terakreditasi B atau Baik Sekali)
                      diperbolehkan mengajukan paling banyak 5 (lima) prodi
                      baru.
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-5 container">
              <h5>MAGISTER/MAGISTER TERAPAN /SPESIALIS</h5>
              <div className="container">
                <ul>
                  <li>
                    <p className={style.list}>
                      UPPS yang memiliki paling sedikit 3 (tiga) Prodi pada
                      program Sarjana sekurang-kurangnya terakreditasi B atau
                      Baik Sekali diperbolehkan mengajukan Prodi pada program
                      Magister/Magister Terapan/Spesialis baru yang linear
                      dengan prodi jenjang Sarjana yang dimiliki;
                    </p>
                  </li>
                  <li>
                    <p className={style.list}>
                      Dalam hal program Magister/Magister Terapan/Spesialis yang
                      diusulkan merupakan program Magister kedua dan seterusnya,
                      maka akreditasi setiap prodi jenjang Magister/Magister
                      Terapan/Spesialis eksisting sekurang-kurangnya
                      terakreditasi B atau Baik Sekali.
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-5 container">
              <h5>MAGISTER/MAGISTER TERAPAN /SPESIALIS</h5>
              <div className="container">
                <ul>
                  <li>
                    <p className={style.list}>
                      UPPS yang memiliki Prodi pada program Sarjana
                      sekurang-kurangnya terakreditasi B atau Baik Sekali
                      diperbolehkan mengajukan Prodi Pendidikan Profesi yang
                      linear dengan Prodi pada program Sarjana yang dimiliki.
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-5 container">
              <h5>DOKTOR/DOKTOR TERAPAN/SUB-SPESIALIS</h5>
              <div className="container">
                <ul>
                  <li>
                    <p className={style.list}>
                      UPPS yang memiliki program Magister/Magister
                      Terapan/Spesialis terakreditasi A atau Unggul dapat
                      mengajukan program Doktor/Doktor Terapan/Sub-spesialis
                      yang linear dengan program Magister;
                    </p>
                  </li>
                  <li>
                    <p className={style.list}>
                      UPPS yang memiliki program Doktor sekurang-kurangnya
                      terakreditasi B atau Baik Sekali diperbolehkan mengajukan
                      penambahan 1 (satu) Prodi baru pada program Doktor/Doktor
                      Terapan/Sub-spesialis;
                    </p>
                  </li>
                  <li>
                    <p className={style.list}>
                      Dalam hal UPPS akan mengajukan program Doktor Studi Islam,
                      UPPS harus memiliki sekurang-kurangnya 50% Prodi yang
                      linear pada program Magister terakreditasi A atau Unggul.
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-5 container">
              <h5>
                INSTITUSI/PRODI YANG TIDAK MEMENUHI SYARAT PERINGKAT AKREDITASI
                (TMSP) AKREDITASI
              </h5>
              <div className="container">
                <ul>
                  <li>
                    <p className={style.list}>
                      UPPS yang memiliki prodi yang belum terakreditasi tidak
                      diperkenankan mengajukan penambahan prodi baru;
                    </p>
                  </li>
                  <li>
                    <p className={style.list}>
                      Perguruan Tinggi dan /atau program studi yang Tidak
                      Memenuhi Syarat Peringkat (TMSP) tidak diperbolehkan
                      mengajukan usulan prodi baru pada semua program (Sarjana,
                      Magister, dan Doktor).
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
