const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
var port = process.env.PORT || '3000'
require("./db/connection.js")
require('dotenv/config');

var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var ejs = require('ejs');



const public_path = path.join(__dirname, '../public')
app.use(express.static(public_path + '/css'))
app.use(express.static(public_path + '/js'))
app.use(express.static(public_path + '/tools'))



//dynamiclly pass data using ejs
let html_path = path.join(__dirname, '../templates/views/pages')
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', html_path);

//body parser initialization
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


// Step 5 - set up multer for storing uploaded files

var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage });


// Step 7 - the GET request handler that provides the HTML UI
app.get('/', (req, res) => {
    res.render('index');
})
app.get('/uplode', (req, res) => {
    const db = mongoose.connection;

    db.collection('uploads').find({}).toArray((err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('items', { items: data });
            // res.send(data);
        }
    });
    // res.render('index',{item:data})
});
app.get('/home_img', (req, res) => {

    const db = mongoose.connection;

    db.collection('uploads').find({}).toArray((err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('admin_side', { items: data });
            // res.send(data);
        }
    });
});


// Step 8 - the POST handler for processing the uploaded file



app.post('/upload', upload.single('image'), (req, res, next) => {

    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        product_type: req.body.type,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    const db = mongoose.connection;


    db.collection('uploads').insertOne(obj, (err, result) => {

        if (err) throw err;
        console.log(obj);
        res.redirect('/');

    });






    // imgModel.create(obj, (err, item) => {
    // 	if (err) {
    // 		console.log(err);
    // 	}
    // 	else {
    // 		// item.save();
    // 		res.redirect('/');
    // 	}
    // });
});


// Step 9 - configure the server's port

app.listen(port, err => {
    if (err)
        throw err
    console.log('Server listening on port', port)
})

