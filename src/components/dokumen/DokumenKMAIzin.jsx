import React, { useState } from 'react';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Box,
    Grid,
    Button,
    Tabs,
    Tab
} from '@mui/material';
import garuda from '../../assets/garuda1.png'
import axios from 'axios';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../views/service/api';
import { getToken } from '../../utils/token';
import style from '../../views/home/style.module.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './style.css'
const DokumenKMAIzin = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState(0);
    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };
    const [formData, setFormData] = useState({
        namaProdi: '',
        jenjang: '',
        lembaga: '',
        judulSuratAkreditasi: '',
        nomorSuratAkreditasi: '',
        tanggalAkreditasi: '',
        namaLembagaAkreditasi: '',
        namaDirektur: ''
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const renderDocument = () => {
        return `
       <div style="font-family: Arial, sans-serif; min-height: 297mm; padding: 20mm; margin: auto; background-color: white; box-shadow: 0 0 10px rgba(0,0,0,0.1); max-height: calc(120vh - 2rem); overflow: auto;">
  <div style="text-align: center;">
    <img src="${garuda}" alt="Garuda Pancasila" style="width: 40px; height: 45px;" />
  </div>
  <p style="text-align: center; font-weight: bold;">KEPUTUSAN MENTERI AGAMA REPUBLIK INDONESIA</p>
  <p style="text-align: center; font-weight: bold;">NOMOR TAHUN 2024</p>
  <p style="text-align: center; font-weight: bold;">TENTANG</p>
  <p style="text-align: center; font-weight: bold;">IZIN PENYELENGGARAAN PROGRAM STUDI</p>
  <p style="text-align: center; font-weight: bold;">
    <span style="background: yellow;">${formData.namaProdi || '[NAMA PRODI]'}</span> UNTUK PROGRAM
    <span style="background: yellow;">${formData.jenjang || '[JENJANG]'}</span>
  </p>
  <p style="text-align: center; font-weight: bold;">
    PADA <span style="background: yellow;">${formData.lembaga || '[LEMBAGA]'}</span>
  </p>

  <p style="text-align: center; font-weight: bold;">DENGAN RAHMAT TUHAN YANG MAHA ESA</p>
  <p style="text-align: center; font-weight: bold;">MENTERI AGAMA REPUBLIK INDONESIA,</p>

  <p style="margin-bottom: 16px;"><strong>Menimbang :</strong></p>
  <ol style="list-style-type: lower-alpha; padding-left: 20px; margin-bottom: 32px;">
    <li>bahwa untuk menyelenggarakan program studi pada rumpun ilmu agama, wajib memperoleh izin penyelenggaraan program studi dari Menteri Agama;</li>
    <li>bahwa <span style="background: yellow;">${formData.lembaga || '[LEMBAGA]'}</span> telah memenuhi syarat untuk menyelenggarakan Program Studi <span style="background: yellow;">${formData.namaProdi || '[NAMA PRODI]'}</span> untuk Program <span style="background: yellow;">${formData.jenjang || '[JENJANG]'}</span> berdasarkan Surat <span style="background: yellow;">${formData.judulSuratAkreditasi || '[JUDUL SURAT AKREDITASI]'}</span> Nomor <span style="background: yellow;">${formData.nomorSuratAkreditasi || '[NOMOR SURAT AKREDITASI]'}</span> tanggal <span style="background: yellow;">${formData.tanggalAkreditasi || '[TANGGAL AKREDITASI]'}</span> tentang Pemenuhan Syarat Minimum Akreditasi dalam Pembukaan Program Studi;</li>
    <li>bahwa berdasarkan pertimbangan sebagaimana dimaksud dalam huruf a dan huruf b, perlu menetapkan Keputusan Menteri Agama tentang Izin Penyelenggaraan Program Studi <span style="background: yellow;">${formData.namaProdi || '[NAMA PRODI]'}</span> untuk Program <span style="background: yellow;">${formData.jenjang || '[JENJANG]'}</span> pada <span style="background: yellow;">${formData.lembaga || '[LEMBAGA]'}</span>;</li>
  </ol>

  <p style="margin-bottom: 16px;"><strong>Mengingat :</strong></p>
  <ol style="padding-left: 20px; margin-bottom: 32px;">
    <li>Undang-Undang Nomor 12 Tahun 2012 tentang Pendidikan Tinggi (Lembaran Negara Republik Indonesia Tahun 2012 Nomor 158, Tambahan Lembaran Negara Republik Indonesia Nomor 5336);</li>
    <li>Peraturan Pemerintah Nomor 46 Tahun 2019 tentang Pendidikan Tinggi Kegamaan (Lembaran Negara Republik Indonesia Tahun 2019 Nomor 120, Tambahan Lembaran Negara Republik Indonesia Nomor 6362);</li>
    <li>Peraturan Presiden Nomor 12 Tahun 2023 tentang Kementerian Agama (Lembaran Negara Republik Indonesia Tahun 2023 Nomor 21);</li>
    <li>Peraturan Menteri Agama Nomor 72 Tahun 2022 tentang Organisasi dan Tata Kerja Kementerian Agama (Berita Negara Republik Indonesia Tahun 2022 Nomor 955);</li>
    <li>Peraturan Menteri Agama Nomor 17 Tahun 2023 tentang Tata Cara Pemberian Izin Penyelenggaraan Program Studi dalam Rumpun Ilmu Agama (Berita Negara Republik Indonesia Tahun 2023 Nomor 1012);</li>
    <li>Keputusan Menteri Agama Nomor 387 Tahun 2004 tentang Petunjuk Pelaksanaan Pembukaan Program Studi pada Perguruan Tinggi Keagamaan Islam;</li>
    <li>Keputusan Menteri Agama Nomor 244 Tahun 2019 tentang Pemberian Mandat kepada Direktur Jenderal yang Menyelenggarakan Pendidikan untuk dan Atas Nama Menteri Agama Menandatangani Izin Penyelenggaraan Program Studi pada Perguruan Tinggi Keagamaan;</li>
  </ol>

  <p style="text-align: center; margin-bottom: 16px; font-weight: bold;">MEMUTUSKAN:</p>
  <p style="margin-bottom: 16px;"><strong>Menetapkan : KEPUTUSAN MENTERI AGAMA TENTANG IZIN PENYELENGGARAAN PROGRAM STUDI <span style="background: yellow;">${formData.namaProdi || '[NAMA PRODI]'}</span> UNTUK PROGRAM <span style="background: yellow;">${formData.jenjang || '[JENJANG]'}</span> PADA <span style="background: yellow;">${formData.lembaga || '[LEMBAGA]'}</span>.</strong></p>

  <p style="margin-bottom: 16px;"><strong>KESATU :</strong> Memberikan Izin Penyelenggaraan Program Studi <span style="background: yellow;">${formData.namaProdi || '[NAMA PRODI]'}</span> untuk Program <span style="background: yellow;">${formData.jenjang || '[JENJANG]'}</span> pada <span style="background: yellow;">${formData.lembaga || '[LEMBAGA]'}</span>.</p>

  <p style="margin-bottom: 16px;"><strong>KEDUA :</strong> Dalam Penyelenggaraan Program Studi sebagaimana dimaksud dalam Diktum KESATU, pengelola Program Studi wajib:</p>
  <ol style="list-style-type: lower-alpha; padding-left: 20px; margin-bottom: 32px;">
    <li>memenuhi persyaratan 5 (lima) dosen <i>homebase</i> dan program studi tercatat pada Pangkalan Data Pendidikan Tinggi;</li>
    <li>mengajukan usulan Terakreditasi Sementara untuk program studi baru ke <span style="background: yellow;">${formData.namaLembagaAkreditasi || '[NAMA LEMBAGA AKREDITASI]'}</span> paling lambat 6 (enam) bulan sejak Keputusan Menteri Agama ini mulai berlaku;</li>
    <li>mengajukan akreditasi pertama paling lambat 9 (sembilan) bulan sebelum masa Terakreditasi Sementara berakhir; dan</li>
    <li>menyesuaikan data setiap tahun dan melaporkan kepada Direktur Jenderal Pendidikan Islam melalui Pangkalan Data Pendidikan Tinggi paling lambat setiap 1 (satu) bulan setelah akhir semester.</li>
  </ol>

  <p style="margin-bottom: 32px;"><strong>KETIGA :</strong> Dalam hal <span style="background: yellow;">${formData.lembaga || '[LEMBAGA]'}</span> tidak melaksanakan kewajiban sebagaimana dimaksud dalam Diktum KEDUA, akan dikenai sanksi administratif sesuai dengan ketentuan peraturan perundang-undangan.</p>

  <p style="margin-bottom: 32px;"><strong>KEEMPAT :</strong> Keputusan ini mulai berlaku pada tanggal ditetapkan.</p>

  <div style="text-align: right; margin-top: 32px; background: white;">
    <p>Ditetapkan di Jakarta</p>
    <p>pada tanggal</p>
    <p>a.n. MENTER I AGAMA REPUBLIK INDONESIA</p>
    <p>DIREKTUR JENDERAL PENDIDIKAN ISLAM,</p>
    <p style="margin-top: 64px; background: white; text-decoration: underline;"><span style="background: yellow;">${formData.namaDirektur || '[NAMA DIREKTUR]'}</span></p>
  </div>
</div>
    `;
    };
    const [documentContent, setDocumentContent] = useState('');
    const fetchData = async () => {
        try {
            const token = getToken()
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const response = await api.get(`/prodi-assesment/${id}`, config);
            const data = response.data.data[0];
            setFormData(prevState => ({
                ...prevState,
                namaProdi: data.namaProdi || '',
                jenjang: data.jenjang || '',
                lembaga: data.lembaga || ''
            }));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        console.log('Uploaded file:', file);
    };
    const disabledFields = ['namaProdi', 'jenjang', 'lembaga'];
    useEffect(() => {
        if (id) {
            fetchData();
        }
        setDocumentContent(renderDocument());
    }, [id, formData]);
    return (
        <section className={`${style.backgroundRow} px-5`} style={{ height: 'auto' }}>
            <div style={{ paddingTop: '8rem', paddingBottom: '1rem' }}>
                <Tabs value={activeTab} onChange={handleTabChange} centered>
                    <Tab style={{ fontWeight: '800' }} label="Isi Form" />
                    <Tab style={{ fontWeight: '800' }} label="Konfirmasi" />
                </Tabs>
            </div>
            {activeTab === 0 && (
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Paper elevation={3} sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>Form Input</Typography>
                            <Box component="form" sx={{ '& .MuiTextField-root': { my: 1 } }}>
                                {Object.entries(formData).map(([key, value]) => (
                                    <TextField
                                        key={key}
                                        fullWidth
                                        label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                                        name={key}
                                        value={value}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                        disabled={disabledFields.includes(key)}
                                    />
                                ))}
                                <Button variant='contained' className='my-3'>Simpan</Button>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={8} >
                        <ReactQuill
                            value={documentContent}
                            onChange={setDocumentContent}
                            modules={{
                                toolbar: [
                                    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                                    ['bold', 'italic', 'underline', 'strike'],
                                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                    ['link', 'image'],
                                    ['clean']
                                    [{ 'size': ['small', false, 'large', 'huge'] }], // Font size options
                                ],
                            }}
                            style={{ height: '100vh', backgroundColor: 'white' }} // Setting the background color to white
                            className="react-quill custom-quill-editor" // Add a class for additional styling if needed
                        />
                    </Grid>
                </Grid>
            )}
            {activeTab === 1 && (
                <Paper elevation={3} sx={{ p: 3, textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                    <Grid container spacing={3} justifyContent="center" alignItems="center">
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>Upload Dokumen</Typography>
                        </Grid>
                        <Grid className='d-flex gap-2' xz={12}>
                            <Grid textAlign="center">
                                <Button
                                    variant="contained"
                                    component="label"
                                    fullWidth
                                    sx={{ py: 2, fontSize: '16px' }}
                                >
                                    Upload File 1
                                    <input type="file" hidden onChange={handleFileUpload} />
                                </Button>
                            </Grid>
                            <Grid textAlign="center">
                                <Button
                                    variant="contained"
                                    component="label"
                                    fullWidth
                                    sx={{ py: 2, fontSize: '16px' }}
                                >
                                    Upload File 2
                                    <input type="file" hidden onChange={handleFileUpload} />
                                </Button>
                            </Grid>
                            <Grid textAlign="center">
                                <Button
                                    variant="contained"
                                    component="label"
                                    fullWidth
                                    sx={{ py: 2, fontSize: '16px' }}
                                >
                                    Upload File 3
                                    <input type="file" hidden onChange={handleFileUpload} />
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="success"
                                sx={{ fontSize: '16px', width: '26%' }}
                            >
                                Konfirmasi
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            )}
        </section>
    );
};

export default DokumenKMAIzin;