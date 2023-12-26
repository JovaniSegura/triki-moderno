const express = require('express')
const bodyParser = require('body-parser');
const hbs = require('hbs');

const app = express()

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'hbs')
hbs.registerPartials(__dirname + '/views/partials');

app.use(express.static(__dirname + '/Public'))


let formularioLleno = false;

app.get('/', function (req, res) {
    res.render('index')
})

app.get('/procesar-formulario', (req, res) => {
     formularioLleno = true;
    res.redirect('/play');
});

app.get('/play', function (req, res) {
    if (!formularioLleno) {
        res.redirect('/');
        return;
    }
    res.render('play');
    formularioLleno = false;
}); 

console.log('Corriendo en http://localhost:8081/')
app.listen(8081)

