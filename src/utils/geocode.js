const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiamF5LTAwNyIsImEiOiJja3JobWNvcXc0bDIxMm9uM21wMXVrZ3ViIn0.Tb3Fn1iDtlptP_1F9l0AMA&limit=1';
    request({ url, json: true}, (error,{ body }) => {
        if(error){
            callback('uable to connect to location services !',undefined);
        } else if ( body.message === 'Not Found'){
            callback('uable to find location, Try another Search.',undefined);
        }else if (body.features.length === 0){
            callback('uable to find location, Try another Search.',undefined);
        }else{
            callback(undefined, {
                latitude:  body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}


module.exports = geocode;