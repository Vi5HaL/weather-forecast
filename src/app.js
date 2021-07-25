const path = require('path');
const { response } = require('express');
const express = require('express');
const hbs = require('hbs');

const geocode  = require('./utils/geocode');
const forecast  = require('./utils/forecast');

const app = express();

//Define paths for Express config
const pathToPublicFolder = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

//setup handlebar engine and views
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialPath);

//setup static directory to serve
app.use(express.static(pathToPublicFolder));

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Vishal'
    });
});

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        name: 'Vishal'
    });
});

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        name: 'Vishal',
        meaasge: 'This is help Page',
    });
});

app.get('/weather', (req,res) => {
    const address = req.query.address;
    if(!address){
        return res.send({
            error: 'Please provide address',
        })
    }
    geocode(address, (error, {letitude, longitude, location} = {}) => {
        if(error){
            return res.send({error});
        }
        forecast(letitude,longitude, (error, forecastData) => {
            if(error){
                return res.send({error});
            }
            res.send({
                title: 'Weather',
                name: 'Vishal',
                forecast: forecastData,
                location:location,
            });
          })
    });
    
});

app.get('/help/*',(req,res) => {
    res.render('404',{
        title: '404',
        name: 'Vishal',
        message : 'Help artical not found.'
    })
});

app.get('*',(req,res) => {
    res.render('404',{
        title: '404',
        name: 'Vishal',
        message : 'Page not found.'
    })
});

app.listen(3000, () => {
    console.log('server running on port : 3000')
});