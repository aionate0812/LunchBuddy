const express = require('express');
const restaurantsRouter = express.Router();
const axios = require('axios');
//const url = 'https://developers.zomato.com/api/v2.1/locations';
const url = 'https://developers.zomato.com/api/v2.1/search';

restaurantsRouter.get('/', (req, res) => {
    const { lat, lon,  query } = req.body;

    return axios({
        url,
        // param: {
        //     entity_id: 280,
        //     entity_type: 'city',
        //     lat,
        //     lon,
        //     q,
        // },
        params: {
            lat,
            lon,
            query,
            count: 10,
            sort: "real_distance"
        },
        headers: { 'user-key': '5eaf1c7a70e10a625274f3a35cd689bc' },
    })
        .then(response => {
            res.json({ data: response.data })
        })
        .catch(error => {
            console.log(error);
        });
})

module.exports = restaurantsRouter;