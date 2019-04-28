const express = require('express');
const menuRouter = express.Router();
const axios = require('axios');
const url = 'https://developers.zomato.com/api/v2.1/dailymenu';

menuRouter.get('/', (req, res) => {
    const { res_id } = req.body;
    return axios({
        method: "get",
        url: url,
        // param: {
        //     entity_id: 280,
        //     entity_type: 'city',
        //     lat,
        //     lon,
        //     q,
        // },
       params: {
          res_id,
        },
        headers: { 'user-key': '5eaf1c7a70e10a625274f3a35cd689bc' }
    })
        .then(response => {
            res.json({ data: response.data })
            console.log(res)
        })
        .catch(error => {
            console.log("E", error);
        });
})

module.exports = menuRouter;

//16507624