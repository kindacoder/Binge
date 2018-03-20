const express = require('express');
const request = require('request');
const app = express();
const admin = require('firebase-admin');

var serviceAccount = require('./bingetesting-firebase-adminsdk-7afxe-22d20d0742');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();

/*
db.collection('orders').doc('too_indian_delhi').collection('order').doc('eXVDgkOzkhozgdBkGYUv').get()
    .then(doc => {
        if (!doc.exists) {
            console.log('no such documents exixt');
        }
        console.log(doc);
    }).catch(err => {
        console.error('was not able to get the data bro !');
    })


    */



/*

db.collection('orders').doc('too_indian_delhi').collection('order').doc('eXVDgkOzkhozgdBkGYUv').set({
    name: 'Ashutosh ',
    college: 'GCET'
}).then(() => {
    console.log('database created succesfully');
})

*/

//setup view engine
app.set('view engine', 'ejs');


///serving static files

app.use('/public', express.static('public'));



var ordersRef = db.collection('orders').doc('too_indian_delhi1').collection('order');
// var allOrders = ordersRef.get()
//     .then(snapshot => {
//         snapshot.forEach(doc => {
//             console.log(typeof(doc));
//             console.log(doc.data().user_name);
//         })
//     })
//     .catch(err => {
//         console.log('error getting documents yr !');
//     });

app.get('/', function(req, res) {

    ///get the data from firestore;
    ordersRef.get()
        .then(snapshot => {
            res.render('index', { data: snapshot });
        })
        .catch(err => {
            console.log('error getting documents yr !');
        });



})

// app.get('/getlocation', (req, res) => {
//     ///send a request to the google api
//     var urlToRequest = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyD7LF-0vlmmKUfesIHLJwAkDOpu7UjZl08';

//     //send request to URL
//     request(urlToRequest, function(error, response, body) {
//         console.log('error:', error); // Print the error if one occurred
//         console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//         console.log('body:', body); // Print the HTML for the Google homepage.
//     });


// })

app.listen(process.env.PORT || 4000, () => {
    console.log('server started at port 4000');
})
