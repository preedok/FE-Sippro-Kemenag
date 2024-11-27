import React, { useEffect, useState,  useContext } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";

import Ketentuan from "../views/ptki/module/usulan/ketentuan/index";
import PetunjukAdmin from '../views/kasubdit/module/petunjuk/cardPetunjuk'
import LoginByHash from "../views/auth/login/loginbyhash";
import Login from "../views/auth/login/login";
import Register from "../views/auth/register/register";

// Admin Pengusul/PTKI
import AdminPTKI from "../views/ptki/ptki";
import AdminPTKIUsulan from "../views/ptki/module/usulan/detail/detail";

// Admin Kasubdit
import AdminKasubditPenawaran from "../views/kasubdit/module/penugasan-penilai/penugasanPenilai";
import AdminKasubditUsulan1 from "../views/kasubdit/module/usulan-prodi/usulanKasubdit";
import AdminKasubditUsulanLama from "../views/kasubdit/module/usulan-prodi-lama/usulanKasubdit";
import AdminKasubditUser from "../views/kasubdit/module/management-user/managementUser";
import AdminKasubditReport from "../views/kasubdit/module/report/report";
import AdminKasubditReportAL from "../views/kasubdit/module/reportal/report";
import ConfigPage from '../views/kasubdit/module/config/configPage'
import AdminKasubditReportDetail from "../views/kasubdit/module/report/detail/detail-report";
import AdminKasubditReportDetailAL from "../views/kasubdit/module/reportal/detail/detail-report";
import AdminKasubditBeranda from "../views/kasubdit/module/beranda/berandaKasubdit";
import AdminKasubdit from "../views/kasubdit/kasubdit";

// Admin Bendahara
import AdminBendahara from "../views/bendahara/kasubdit";
import AdminBendaharaReport from "../views/bendahara/module/report/report";
import AdminBendaharaReportDetail from "../views/bendahara/module/report/detail/detail-report";

// biro hukum
import AdminBiroHukum from '../views/birohukum/kasubdit';

// ptsp dan direktur
import AdminPTSP from '../views/ptsp/ptsp'
import AdminDirektur from '../views/direktur/kasubdit'

// asesor
import PendaftaranAssesor from "../views/auth/pendaftaran-assesor/pendaftaran";
import NotFound from "../views/404/index";

import FormUpdateProfesi from "../views/assesor/module/penilaian/profesi/form-penilaian-profesi/edit/editPenilaianAssesor";

// Form Update AL
import FormUpdateLapanganMagister from "../views/assesor/module/penilaianlapangan/magister/form-lapangan-magister/editLapanganAssesor";
import FormUpdateLapanganProfesi from "../views/assesor/module/penilaianlapangan/profesi/form-lapangan-ppg/editLapanganAssesor";
import FormUpdateLapanganDoktor from "../views/assesor/module/penilaianlapangan/doktor/form-lapangan-doktor/editLapanganAssesor";
import FormUpdateLapanganDIV from "../views/assesor/module/penilaianlapangan/div/form-lapangan-magister/editLapanganAssesor";

// Form Update AK
import FormUpdateSarjana from "../views/assesor/module/penilaian/sarjana/form-penilaian-sarjana/edit/editPenilaianAssesor";
import FormUpdateMagister from "../views/assesor/module/penilaian/magister/form-penilaian-magister/edit/editPenilaianAssesor";
import FormUpdateDoctor from "../views/assesor/module/penilaian/doktor/form-penilaian-doctor/edit/editPenilaianAssesor";

//  Admin Asesor
import AdminAssesor from "../views/assesor/assesor";
import AdminAsesorReport from "../views/assesor/module/report/report";
import AdminAsesorPenilaian from "../views/assesor/module/penilaian/penilaianAssesor";
import AdminAsesorBeranda from "../views/assesor/module/beranda/berandaAssesor";
import Registrasi from "../views/auth/registrasi/pendaftaran";

// Form Update AK
import FormUpdateSarjana2 from "../views/kasubdit/module/usulan-prodi/detail-penilaian/form-penilaian-sarjana/edit/editPenilaianAssesor";
import FormUpdateMagister2 from "../views/kasubdit/module/usulan-prodi/detail-penilaian/form-penilaian-magister/edit/editPenilaianAssesor";
import FormUpdateDoktor2 from "../views/kasubdit/module/usulan-prodi/detail-penilaian/form-penilaian-doctor/edit/editPenilaianAssesor";
import FormUpdateProfesi2 from "../views/kasubdit/module/usulan-prodi/detail-penilaian/form-penilaian-profesi/edit/editPenilaianAssesor";

// Form Update AL
import FormUpdateMagisterLapangan2 from "../views/kasubdit/module/usulan-prodi/detail-penilaian-al/magister/form-lapangan-magister/editLapanganAssesor";
import FormUpdateDoktorLapangan2 from "../views/kasubdit/module/usulan-prodi/detail-penilaian-al/doktor/form-lapangan-doktor/editLapanganAssesor";
import FormUpdateProfesiLapangan2 from "../views/kasubdit/module/usulan-prodi/detail-penilaian-al/profesi/form-lapangan-ppg/editLapanganAssesor";
import FormUpdateDIVLapangan2 from "../views/kasubdit/module/usulan-prodi/detail-penilaian-al/d-iv/form-lapangan-magister/editLapanganAssesor";

import Prosedur from "../views/auth/prosedur/prosedur1";
import Petunjuk from "./../views/auth/prosedur/prosedur1";
import AdminSubditUsulan from "../views/kasubdit/module/usulan-prodi/detail/detail";
import DirekturSubditUsulan from "../views/direktur/module/detail/detail";
import Home from "../views/home/landing";
import ResetPassword from "../views/auth/reset-password/resetpassword";
import AdminAsesorPenawaran from "../views/assesor/module/penawaran/penawaran";
import PanduanEvaluator from '../views/assesor/module/panduan/panduan'
import LoginBySSO from "../views/auth/login/loginbysso";
import PusakaNonLogin from '../views/auth/login/pusakaNonLogin'
import { GetApiBaseUrl } from "../utils/env";
import { useAuth } from '../context/AuthContext';
import DokumenKMAIzin from "../components/dokumen/DokumenKMAIzin";
import DokumenKMAIzinBiro from "../components/dokumen/DokumenKMAIzinBiro";
// Validator
import AdminLamdik from '../views/lamdik/lamdik';
import AdminLamemba from '../views/lamemba/lamemba';
import AdminBanPT from '../views/banpt/banpt';

// Admin Validator Banpt
import AdminValidatorBanpt from '../views/admin-validator-banpt/banpt'
import AdminValidatorBanptPenawaran from "../views/admin-validator-banpt/module/penugasan-penilai/penugasanPenilai";
import AdminValidatorBanptUser from "../views/admin-validator-banpt/module/management-user/managementUser";
import AdminValidatorBanptReport from "../views/admin-validator-banpt/module/report/report";
import AdminValidatorBanptReportDetail from "../views/admin-validator-banpt/module/report/detail/detail-report";
import AdminValidatorBanptBeranda from "../views/admin-validator-banpt/module/beranda/berandaKasubdit";
import AdminBanptUsulanBaru from '../views/admin-validator-banpt/module/usulan-prodi/usulanKasubdit'
import AdminBanptUsulanLama from '../views/admin-validator-banpt/module/usulan-prodi/usulanKasubdit'

// Admin Validator Lamdik
import AdminValidatorLamdik from '../views/admin-validator-lamdik/lamdik'
import AdminValidatorLamdikPenawaran from "../views/admin-validator-lamdik/module/penugasan-penilai/penugasanPenilai";
import AdminValidatorLamdikUser from "../views/admin-validator-lamdik/module/management-user/managementUser";
import AdminValidatorLamdikReport from "../views/admin-validator-lamdik/module/report/report";
import AdminValidatorLamdikReportDetail from "../views/admin-validator-lamdik/module/report/detail/detail-report";
import AdminValidatorLamdikBeranda from "../views/admin-validator-lamdik/module/beranda/berandaKasubdit";
import AdminLamdikUsulanBaru from '../views/admin-validator-lamdik/module/usulan-prodi/usulanKasubdit'
import AdminLamdikUsulanLama from '../views/admin-validator-lamdik/module/usulan-prodi/usulanKasubdit'

// Admin Validator Lamemba
import AdminValidatorLamemba from '../views/admin-validator-lamemba/lamemba'
import AdminValidatorLamembaPenawaran from "../views/admin-validator-lamemba/module/penugasan-penilai/penugasanPenilai";
import AdminValidatorLamembaUser from "../views/admin-validator-lamemba/module/management-user/managementUser";
import AdminValidatorLamembaReport from "../views/admin-validator-lamemba/module/report/report";
import AdminValidatorLamembaReportDetail from "../views/admin-validator-lamemba/module/report/detail/detail-report";
import AdminValidatorLamembaBeranda from "../views/admin-validator-lamemba/module/beranda/berandaKasubdit";
import AdminLamembaUsulanBaru from '../views/admin-validator-lamemba/module/usulan-prodi/usulanKasubdit'
import AdminLamembaUsulanLama from '../views/admin-validator-lamemba/module/usulan-prodi/usulanKasubdit'

//example ui form penilaian validator ak
import FormPenilaianSarjanaValidatorBanpt from '../views/admin-validator-banpt/module/usulan-prodi/ui-form-val/penilaian-validator/ak/sarjana/form-penilaian-sarjana/edit/editPenilaianAssesor'
import FormPenilaianDoktorValidatorBanpt from '../views/admin-validator-banpt/module/usulan-prodi/ui-form-val/penilaian-validator/ak/doktor/form-penilaian-doctor/edit/editPenilaianAssesor'
import FormPenilaianMagisterValidatorBanpt from '../views/admin-validator-banpt/module/usulan-prodi/ui-form-val/penilaian-validator/ak/magister/form-penilaian-magister/edit/editPenilaianAssesor'
import FormPenilaianProfesiValidatorBanpt from '../views/admin-validator-banpt/module/usulan-prodi/ui-form-val/penilaian-validator/ak/profesi/form-penilaian-profesi/edit/editPenilaianAssesor'

// penunjukan validator banpt
import ValidatorBanptPenunjukan from '../views/validators-banpt/assesor'
import ValidatorBanptBeranda from '../views/validators-banpt/module/beranda/berandaAssesor'
import ValidatorBanptPenawaran from '../views/validators-banpt/module/penawaran/penawaran'
import ValidatorBanptPenilaian from '../views/validators-banpt/module/penilaian-validator/penilaianAssesor'
import ValidatorBanptReport from '../views/validators-banpt/module/report/report'
import FormUpdateSarjanaValidatorBanpt from '../views/validators-banpt/module/penilaian-validator/ak/sarjana/form-penilaian-sarjana/edit/editPenilaianAssesor'
import FormUpdateMagisterValidatorBanpt from '../views/validators-banpt/module/penilaian-validator/ak/magister/form-penilaian-magister/edit/editPenilaianAssesor'
import FormUpdateDoctorValidatorBanpt from '../views/validators-banpt/module/penilaian-validator/ak/doktor/form-penilaian-doctor/edit/editPenilaianAssesor'
import FormUpdateProfesiValidatorBanpt from '../views/validators-banpt/module/penilaian-validator/ak/profesi/form-penilaian-profesi/edit/editPenilaianAssesor'
import PanduanValidatorBanpt from '../views/validators-banpt/module/panduan/panduan'


// penunjukan validator lamemba
import ValidatorLamembaPenunjukan from '../views/validators-lamemba/assesor'
import ValidatorLamembaBeranda from '../views/validators-lamemba/module/beranda/berandaAssesor'
import ValidatorLamembaPenawaran from '../views/validators-lamemba/module/penawaran/penawaran'
import ValidatorLamembaPenilaian from '../views/validators-lamemba/module/penilaian-validator/penilaianAssesor'
import ValidatorLamembaReport from '../views/validators-lamemba/module/report/report'
import FormUpdateSarjanaValidatorLamemba from '../views/validators-lamemba/module/penilaian-validator/ak/sarjana/form-penilaian-sarjana/edit/editPenilaianAssesor'
import FormUpdateMagisterValidatorLamemba from '../views/validators-lamemba/module/penilaian-validator/ak/magister/form-penilaian-magister/edit/editPenilaianAssesor'
import FormUpdateDoctorValidatorLamemba from '../views/validators-lamemba/module/penilaian-validator/ak/doktor/form-penilaian-doctor/edit/editPenilaianAssesor'
import FormUpdateProfesiValidatorLamemba from '../views/validators-lamemba/module/penilaian-validator/ak/profesi/form-penilaian-profesi/edit/editPenilaianAssesor'
import PanduanValidatorLamemba from '../views/validators-lamemba/module/panduan/panduan'

// penunjukan validator lamdik
import ValidatorLamdikPenunjukan from '../views/validators-lamdik/assesor'
import ValidatorLamdikBeranda from '../views/validators-lamdik/module/beranda/berandaAssesor'
import ValidatorLamdikPenawaran from '../views/validators-lamdik/module/penawaran/penawaran'
import ValidatorLamdikPenilaian from '../views/validators-lamdik/module/penilaian-validator/penilaianAssesor'
import ValidatorLamdikReport from '../views/validators-lamdik/module/report/report'
import FormUpdateSarjanaValidatorLamdik from '../views/validators-lamdik/module/penilaian-validator/ak/sarjana/form-penilaian-sarjana/edit/editPenilaianAssesor'
import FormUpdateMagisterValidatorLamdik from '../views/validators-lamdik/module/penilaian-validator/ak/magister/form-penilaian-magister/edit/editPenilaianAssesor'
import FormUpdateDoctorValidatorLamdik from '../views/validators-lamdik/module/penilaian-validator/ak/doktor/form-penilaian-doctor/edit/editPenilaianAssesor'
import FormUpdateProfesiValidatorLamdik from '../views/validators-lamdik/module/penilaian-validator/ak/profesi/form-penilaian-profesi/edit/editPenilaianAssesor'
import PanduanValidatorLamdik from '../views/validators-lamdik/module/panduan/panduan'

// Scroll to Top when switching page
const ScrollToTop = ({ children }) => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return children;
};

function RedirectToSSO() {
  const apiurl = GetApiBaseUrl();
  window.location.href = `${apiurl}/auth/redirectsso`;
  return null;
}

function RedirectToSSOWPrompt() {
  const apiurl = GetApiBaseUrl();
  window.location.href = `${apiurl}/auth/redirectsso?prompt=login`;
  return null;
}

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/login" replace state={{ from: location }} />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/loginsso" element={<RedirectToSSO />} />
      <Route path="/loginssoprompt" element={<RedirectToSSOWPrompt />} />
      <Route path="/oauth2/callback" element={<LoginBySSO />} />
      <Route path="/login" element={<Login />} />
      <Route path="/loginhash" element={<LoginByHash />} />
      <Route path="/pusakalogin" element={<PusakaNonLogin />} />
      <Route path="/pendaftaran" element={<Register />} />
      <Route path="/registrasi" element={<Registrasi />} />
      <Route path="/ResetPassword" element={<ResetPassword />} />
      <Route path="/petunjuk" element={<Petunjuk />} />
      <Route path="/pendaftaran-assesor" element={<PendaftaranAssesor />} />
      <Route path="/ketentuan" element={<Ketentuan />} />
      <Route path="/" element={<ProtectedRoute element={Home} />} />

      {/* Admin Pengusul/PTKI */}
      <Route path="/ptki" element={<ProtectedRoute element={AdminPTKI} />} />
      <Route path="/detail-usulan/:id" element={<ProtectedRoute element={AdminPTKIUsulan} />} />
      <Route path="/dokumen-kma-izin/:id" element={<ProtectedRoute element={DokumenKMAIzin} />} />
      <Route path="/dokumen-kma-izin-biro/:id" element={<ProtectedRoute element={DokumenKMAIzinBiro} />} />
      <Route path="/detail-usulan-ptki/:id" element={<ProtectedRoute element={AdminSubditUsulan} />} />
      <Route path="/direktur-detail-usulan-ptki/:id" element={<ProtectedRoute element={DirekturSubditUsulan} />} />
      {/* Biro Hukum */}
      <Route path="/birohukum" element={<ProtectedRoute element={AdminBiroHukum} />} />


      {/* Direktur Jendral */}
      <Route path="/direktur" element={<ProtectedRoute element={AdminDirektur} />} />
      {/* Ptsp */}
      <Route path="/ptsp" element={<ProtectedRoute element={AdminPTSP} />} />
      
      {/* Admin Kasubdit */}
      <Route path="/kasubdit" element={<ProtectedRoute element={AdminKasubdit} />}>
        <Route path="beranda" element={<AdminKasubditBeranda />} />
        <Route path="usulan/lembaga-baru" element={<AdminKasubditUsulan1 />} />
        <Route path="usulan/lembaga-lama" element={<AdminKasubditUsulanLama />} />
        <Route path="penawaran" element={<AdminKasubditPenawaran />} />
        <Route path="penawaran/:id" element={<AdminKasubditPenawaran />} />
        <Route path="penugasan/:id" element={<AdminKasubditPenawaran />} />
        <Route path="user" element={<AdminKasubditUser />} />
        <Route path="report" element={<AdminKasubditReport />} />
        <Route path="report/:id" element={<AdminKasubditReportDetail />} />

        <Route path="reportal" element={<AdminKasubditReportAL />} />
        <Route path="reportal/:id" element={<AdminKasubditReportDetailAL />} />
        <Route path="config" element={<ConfigPage />} />
        <Route path="petunjuk" element={<PetunjukAdmin />} />
      </Route>

      

      {/* Lamdik */}
      <Route path="/lamdik" element={<ProtectedRoute element={AdminLamdik} />} />
      {/* Lamemba */}
      <Route path="/lamemba" element={<ProtectedRoute element={AdminLamemba} />} />
      {/* Banpt */}
      <Route path="/banpt" element={<ProtectedRoute element={AdminBanPT} />} />

      {/* Admin Validator Banpt */}
      <Route path="/admin-validator-banpt" element={<ProtectedRoute element={AdminValidatorBanpt} />}>
        <Route path="beranda" element={<AdminValidatorBanptBeranda />} />
        <Route path="usulan/lembaga-baru" element={<AdminBanptUsulanBaru />} />
        <Route path="usulan/lembaga-lama" element={<AdminBanptUsulanLama />} />
        <Route path="penawaran" element={<AdminValidatorBanptPenawaran />} />
        <Route path="penawaran/:id" element={<AdminValidatorBanptPenawaran />} />
        <Route path="penugasan/:id" element={<AdminValidatorBanptPenawaran />} />
        <Route path="user" element={<AdminValidatorBanptUser />} />
        <Route path="report" element={<AdminValidatorBanptReport />} />
        <Route path="report/:id" element={<AdminValidatorBanptReportDetail />} />
      </Route>

      {/* Admin Validator Lamdik */}
      <Route path="/admin-validator-lamdik" element={<ProtectedRoute element={AdminValidatorLamdik} />}>
        <Route path="beranda" element={<AdminValidatorLamdikBeranda />} />
        <Route path="usulan/lembaga-baru" element={<AdminLamdikUsulanBaru />} />
        <Route path="usulan/lembaga-lama" element={<AdminLamdikUsulanLama />} />
        <Route path="penawaran" element={<AdminValidatorLamdikPenawaran />} />
        <Route path="penawaran/:id" element={<AdminValidatorLamdikPenawaran />} />
        <Route path="penugasan/:id" element={<AdminValidatorLamdikPenawaran />} />
        <Route path="user" element={<AdminValidatorLamdikUser />} />
        <Route path="report" element={<AdminValidatorLamdikReport />} />
        <Route path="report/:id" element={<AdminValidatorLamdikReportDetail />} />
      </Route>

      {/* Admin Validator Lamemba */}
      <Route path="/admin-validator-lamemba" element={<ProtectedRoute element={AdminValidatorLamemba} />}>
        <Route path="beranda" element={<AdminValidatorLamembaBeranda />} />
        <Route path="usulan/lembaga-baru" element={<AdminLamembaUsulanBaru />} />
        <Route path="usulan/lembaga-lama" element={<AdminLamembaUsulanLama />} />
        <Route path="penawaran" element={<AdminValidatorLamembaPenawaran />} />
        <Route path="penawaran/:id" element={<AdminValidatorLamembaPenawaran />} />
        <Route path="penugasan/:id" element={<AdminValidatorLamembaPenawaran />} />
        <Route path="user" element={<AdminValidatorLamembaUser />} />
        <Route path="report" element={<AdminValidatorLamembaReport />} />
        <Route path="report/:id" element={<AdminValidatorLamembaReportDetail />} />
      </Route> 

      {/* validator banpt */}
      <Route path="/validator-banpt" element={<ProtectedRoute element={ValidatorBanptPenunjukan} />}>
        <Route path="beranda" element={<ValidatorBanptBeranda />} />
        <Route path="penunjukan" element={<ValidatorBanptPenawaran />} />
        <Route path="panduan" element={<PanduanValidatorBanpt />} />
        <Route path="validasi" element={<ValidatorBanptPenilaian />}>
          <Route path="validator-banpt/sarjana/edit/:id" element={<FormUpdateSarjanaValidatorBanpt />} />
          <Route path="validator-banpt/magister/edit/:id" element={<FormUpdateMagisterValidatorBanpt />} />
          <Route path="validator-banpt/doktor/edit/:id" element={<FormUpdateDoctorValidatorBanpt />} />
          <Route path="validator-banpt/profesi/edit/:id" element={<FormUpdateProfesiValidatorBanpt />} />
        </Route>
        <Route path="report" element={<ValidatorBanptReport />} />
      </Route>

      {/* validator lememba */}
      <Route path="/validator-lamemba" element={<ProtectedRoute element={ValidatorLamembaPenunjukan} />}>
        <Route path="beranda" element={<ValidatorLamembaBeranda />} />
        <Route path="penunjukan" element={<ValidatorLamembaPenawaran />} />
        <Route path="panduan" element={<PanduanValidatorLamemba />} />
        <Route path="validasi" element={<ValidatorLamembaPenilaian />}>
          <Route path="validator-lamemba/sarjana/edit/:id" element={<FormUpdateSarjanaValidatorLamemba />} />
          <Route path="validator-lamemba/magister/edit/:id" element={<FormUpdateMagisterValidatorLamemba />} />
          <Route path="validator-lamemba/doktor/edit/:id" element={<FormUpdateDoctorValidatorLamemba />} />
          <Route path="validator-lamemba/profesi/edit/:id" element={<FormUpdateProfesiValidatorLamemba />} />
        </Route>
        <Route path="report" element={<ValidatorLamembaReport />} />
      </Route>

      {/* validator lamdik */}
      <Route path="/validator-lamdik" element={<ProtectedRoute element={ValidatorLamdikPenunjukan} />}>
        <Route path="beranda" element={<ValidatorLamdikBeranda />} />
        <Route path="penunjukan" element={<ValidatorLamdikPenawaran />} />
        <Route path="panduan" element={<PanduanValidatorLamdik />} />
        <Route path="validasi" element={<ValidatorLamdikPenilaian />}>
          <Route path="validator-lamdik/sarjana/edit/:id" element={<FormUpdateSarjanaValidatorLamdik />} />
          <Route path="validator-lamdik/magister/edit/:id" element={<FormUpdateMagisterValidatorLamdik />} />
          <Route path="validator-lamdik/doktor/edit/:id" element={<FormUpdateDoctorValidatorLamdik />} />
          <Route path="validator-lamdik/profesi/edit/:id" element={<FormUpdateProfesiValidatorLamdik />} />
        </Route>
        <Route path="report" element={<ValidatorLamdikReport />} />
      </Route>

      {/* Admin Bendahara */}
      <Route path="/bendahara" element={<ProtectedRoute element={AdminBendahara} />}>
        <Route path="report" element={<AdminBendaharaReport />} />
        <Route path="report/:id" element={<AdminBendaharaReportDetail />} />
      </Route>

      {/* asesor */}
      <Route path="/asesor" element={<ProtectedRoute element={AdminAssesor} />}>
        <Route path="beranda" element={<AdminAsesorBeranda />} />
        <Route path="penawaran" element={<AdminAsesorPenawaran />} />
        <Route path="panduan" element={<PanduanEvaluator />} />
        <Route path="penilaian" element={<AdminAsesorPenilaian />}>
          <Route path="sarjana/edit/:id" element={<FormUpdateSarjana />} />
          <Route path="magister/edit/:id" element={<FormUpdateMagister />} />
          <Route path="doktor/edit/:id" element={<FormUpdateDoctor />} />
          <Route path="profesi/edit/:id" element={<FormUpdateProfesi />} />
        </Route>
        <Route path="report" element={<AdminAsesorReport />} />
        <Route path="penilaianlapangan" element={<AdminAsesorPenilaian />}>
          <Route path="doktor/editLapangan/:id" element={<FormUpdateLapanganDoktor />} />
          <Route path="magister/editLapangan/:id" element={<FormUpdateLapanganMagister />} />
          <Route path="ppg/editLapangan/:id" element={<FormUpdateLapanganProfesi />} />
          <Route path="div/editLapangan/:id" element={<FormUpdateLapanganDIV />} />
        </Route>
      </Route>

      {/* Form AK */}
      <Route path="sarjana/edit/:id"  element={<ProtectedRoute element={FormUpdateSarjana2} />} />
      <Route path="magister/edit/:id" element={<ProtectedRoute element={FormUpdateMagister2} />} />
      <Route path="doktor/edit/:id"  element={<ProtectedRoute element={FormUpdateDoktor2} />} />
      <Route path="profesi/edit/:id" element={<ProtectedRoute element={FormUpdateProfesi2} />} />

      {/* Form Al */}
      <Route path="doktor/editLapangan/:id" element={<ProtectedRoute element={FormUpdateDoktorLapangan2} />} />
      <Route path="magister/editLapangan/:id" element={<ProtectedRoute element={FormUpdateMagisterLapangan2} />} />
      <Route path="ppg/editLapangan/:id" element={<ProtectedRoute element={FormUpdateProfesiLapangan2} />} />
      <Route path="div/editLapangan/:id" element={<ProtectedRoute element={FormUpdateDIVLapangan2} />} />

      
      {/*example ui form validator */}
      <Route path="/form-validator-sarjana-banpt" element={<ProtectedRoute element={FormPenilaianSarjanaValidatorBanpt} />} />
      <Route path="/form-validator-doktor-banpt" element={<ProtectedRoute element={FormPenilaianDoktorValidatorBanpt} />} />
      <Route path="/form-validator-magister-banpt" element={<ProtectedRoute element={FormPenilaianMagisterValidatorBanpt} />} />
      <Route path="/form-validator-profesi-banpt" element={<ProtectedRoute element={FormPenilaianProfesiValidatorBanpt} />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const Router = () => {
  console.log("Router: Rendering");
  return (
    <BrowserRouter>
      <ScrollToTop>
        <AppRoutes />
      </ScrollToTop>
    </BrowserRouter>
  );
};

export default Router;