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

//INI UNTUK ADMIN SISWA
app.get('/adminSiswa', (req, res) => {
    res.render('adminSiswa', {
    });
});

//INI UNTUK ADMIN PESAN
app.get('/adminPesan', (req, res) => {
    res.render('adminPesan', {
    });
});




/*app.get('/', (req, res) => {
    // res.send('CRUD Operation using NodeJS / ExpressJS / MySQL');
    let sql = "SELECT * FROM users";
    let query = connection.query(sql, (err, rows) => {
        if (err) throw err;
        res.render('user_index', {
            title: 'CRUD Operation using NodeJS / ExpressJS / MySQL',
            users: rows
        });
    });
});*/


app.get('/add', (req, res) => {
    res.render('user_add', {
        title: 'CRUD Operation using NodeJS / ExpressJS / MySQL'
    });
});

app.post('/save', (req, res) => {
    let data = { name: req.body.name, email: req.body.email, phone_no: req.body.phone_no };
    let sql = "INSERT INTO users SET ?";
    let query = connection.query(sql, data, (err, results) => {
        if (err) throw err;
        res.redirect('/');
    });
});

app.get('/edit/:userId', (req, res) => {
    const userId = req.params.userId;
    let sql = `Select * from users where id = ${userId}`;
    let query = connection.query(sql, (err, result) => {
        if (err) throw err;
        res.render('user_edit', {
            title: 'CRUD Operation using NodeJS / ExpressJS / MySQL',
            user: result[0]
        });
    });
});


app.post('/update', (req, res) => {
    const userId = req.body.id;
    let sql = "update users SET name='" + req.body.name + "',  email='" + req.body.email + "',  phone_no='" + req.body.phone_no + "' where id =" + userId;
    let query = connection.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('/');
    });
});


app.get('/delete/:userId', (req, res) => {
    const userId = req.params.userId;
    let sql = `DELETE from users where id = ${userId}`;
    let query = connection.query(sql, (err, result) => {
        if (err) throw err;
        res.redirect('/');
    });
});


// Server Listening
app.listen(3000, () => {
    console.log('Server is running at port 3000');
});