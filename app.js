const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
var view = __dirname + "/views/";
var public = __dirname + "/public/";

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'neutron'
});

connection.connect(function (error) {
    if (!!error) console.log(error);
    else console.log('Database Connected!');
});

//set views file
app.set('views', path.join(__dirname, 'views'));

//set view engine
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static(public));

//NAVIGASI
//NAVIGASI
// INI UNTUK HALAMAN UTAMA
app.get('/', (req, res) => {
    res.render('index', {
    });
});

//INI UNTUK PENDAFTARAN
app.get('/pendaftaran', (req, res) => {
    res.render('pendaftaran', {
    });
});

//INI UNTUK SUKSES DAFTAR
app.get('/sukses', (req, res) => {
    res.render('sukses', {
    });
});

// INI INFO
app.get('/info', (req, res) => {
    res.render('info', {
    });
});

// INI TENTANG
app.get('/tentang', (req, res) => {
    res.render('tentang', {
    });
});

//INI TIM
app.get('/tim', (req, res) => {
    res.render('tim', {
    });
});

// INI UNTUK LOGIN
app.get('/login', (req, res) => {
    res.render('login', {
    });
});

//INI UNTUK REGISTER ADMIN
app.get('/registerAdmin', (req, res) => {
    res.render('registerAdmin', {
    });
});

//INI UNTUK ADMIN DASHBOARD
app.get('/adminDashboard', (req, res) => {
    res.render('adminDashboard', {
    });
});

//INI UNTUK ADMIN HOME
app.get('/adminHome', (req, res) => {
    res.render('adminHome', {
    });
});

//INI UNTUK ADMIN TENTANG
app.get('/adminTentang', (req, res) => {
    res.render('adminTentang', {
    });
});

//INI UNTUK ADMIN TIM
app.get('/adminTim', (req, res) => {
    res.render('adminTim', {
    });
});

//INI UNTUK ADMIN PRODUK
app.get('/adminProduk', (req, res) => {
    res.render('adminProduk', {
    });
});

//INI UNTUK ADMIN KONTAK
app.get('/adminKontak', (req, res) => {
    res.render('adminKontak', {
    });
});

//INI UNTUK EDIT SISWA
app.get('/editSiswa', (req, res) => {
    res.render('editSiswa', {
    });
});

//INI UNTUK PENDAFTARAN SISWA
app.get('/pendaftaranSiswa', (req, res) => {
    res.render('pendaftaranSiswa', {
    });
});



//NAVIGASI END
//NAVIGASI END


//FUNGSI DATA SISWA
//FUNGSI DATA SISWA
//MEMBUKA HALAMAN ADMIN SISWA
app.get('/adminSiswa', (req, res) => {
    // res.send('CRUD Operation using NodeJS / ExpressJS / MySQL');
    let sql = "SELECT * FROM siswas";
    let query = connection.query(sql, (err, rows) => {
        if (err) throw err;
        res.render('adminSiswa', {
            title: 'CRUD Operation using NodeJS / ExpressJS / MySQL',
            siswas: rows
        });
    });
});

//MENYIMPAN FORM PENDAFTARAN DARI ClIENT PAGE
app.post('/saveSiswa', (req, res) => {
    let data = { nama: req.body.nama, email: req.body.email, paket: req.body.paket, kelas: req.body.kelas, sekolah: req.body.sekolah };
    let sql = "INSERT INTO siswas SET ?";
    let query = connection.query(sql, data, (err, results) => {
        if (err) throw err;
        res.redirect('/sukses');
    });
});

//MENYIMPAN FORM PENDAFTARAN DARI ADMIN PAGE
app.post('/saveSiswaAdmin', (req, res) => {
    let data = { nama: req.body.nama, email: req.body.email, paket: req.body.paket, kelas: req.body.kelas, sekolah: req.body.sekolah };
    let sql = "INSERT INTO siswas SET ?";
    let query = connection.query(sql, data, (err, results) => {
        if (err) throw err;
        res.redirect('/adminSiswa');
    });
});

//MENGHAPUS DATA SISWA
app.get('/deleteSiswa/:userId', (req, res) => {
    const userId = req.params.userId;
    let sql = `DELETE from siswas where id = ${userId}`;
    let query = connection.query(sql, (err, result) => {
        if (err) throw err;
        res.redirect('/adminSiswa');
    });
});

//MEMBUKA PAGE EDIT SISWA
app.get('/editSiswa/:userId', (req, res) => {
    const userId = req.params.userId;
    let sql = `Select * from siswas where id = ${userId}`;
    let query = connection.query(sql, (err, result) => {
        if (err) throw err;
        res.render('editSiswa', {
            title: 'CRUD Operation using NodeJS / ExpressJS / MySQL',
            siswa: result[0]
        });
    });
});

//MENGUPDATE DATA SISWA
app.post('/updateSiswa', (req, res) => {
    const userId = req.body.id;
    let sql = "update siswas SET nama='" + req.body.nama + "',  email='" + req.body.email + "',  paket='" + req.body.paket + "', kelas='" + req.body.kelas + "', sekolah='" + req.body.sekolah + "' where id =" + userId;
    let query = connection.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('/adminSiswa');
    });
});

//FUNGSI DATA SISWA END
//FUNGSI DATA SISWA END


//FUNGSI PESAN
//FUNGSI PESAN
//TAMBAH PESAN
//INI UNTUK MEMBUKA ADMIN PESAN
app.get('/adminPesan', (req, res) => {
    // res.send('CRUD Operation using NodeJS / ExpressJS / MySQL');
    let sql = "SELECT * FROM pesans";
    let query = connection.query(sql, (err, rows) => {
        if (err) throw err;
        res.render('adminPesan', {
            title: 'CRUD Operation using NodeJS / ExpressJS / MySQL',
            pesans: rows
        });
    });
});

//MENYIMPAN FORM PESAN DARI HUBUNGI KAMI
app.post('/send', (req, res) => {
    let data = { nama: req.body.nama, email: req.body.email, isiPesan: req.body.isiPesan };
    let sql = "INSERT INTO pesans SET ?";
    let query = connection.query(sql, data, (err, results) => {
        if (err) throw err;
        res.redirect('/#sechubungikami');
    });
});

//MENGHAPUS PESAN
app.get('/deletePesan/:userId', (req, res) => {
    const userId = req.params.userId;
    let sql = `DELETE from pesans where id = ${userId}`;
    let query = connection.query(sql, (err, result) => {
        if (err) throw err;
        res.redirect('/adminPesan');
    });
});



//FUNGSI PESAN END
//FUNGSI PESAN END












// Server Listening
app.listen(3000, () => {
    console.log('Server is running at port 3000');
});