const express = require('express');
const restaurantsRouter = express.Router();
const axios = require('axios');
//const url = 'https://developers.zomato.com/api/v2.1/locations';
const url = 'https://developers.zomato.com/api/v2.1/search';

restaurantsRouter.get('/', (req, res) => {
    const { lon, lat, query } = req.body;

    axios({
        url,
        // param: {
        //     entity_id: 280,
        //     entity_type: 'city',
        //     lat,
        //     lon,
        //     q,
        // },
        params: {
            lon,
            lat,
            query,
            count: 9
        },
        headers: { 'user-key': 'cd295cc49e5c8dfd776d34174be1b9af' }
    })
        .then(response => {
            res.json({ data: response.data })
            console.log(res)
        })
        .catch(error => {
            console.log(error);
        });
})

module.exports = restaurantsRouter;