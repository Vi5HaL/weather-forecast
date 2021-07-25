const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=fdffbc544d681552de4b1a95a264afe5&query='+latitude+','+longitude+'&units=f';
    request({ url, json: true}, (error,{body}) =>{
        if (error){
            callback('weather stack API is not reachable !',undefined)
        } else if (body.error){
            console.log(body.error)
            callback('unable to find the location',undefined);
        } else {   
            const {current} = body
            callback(undefined, current.weather_descriptions[0] + '. It is '+ current.temperature + ' degree out here, but it feels like ' + current.feelslike + ' degrees.');
        }
    });
}

module.exports = forecast;