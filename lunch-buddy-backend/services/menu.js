const express = require('express');
const menuRouter = express.Router();
const axios = require('axios');
const url = 'https://developers.zomato.com/api/v2.1/dailymenu';

menuRouter.get('/', (req, res) => {
    const { res_id } = req.body;

    axios.get(url, {
        params: {
            res_id,
        },
        headers: { 'user_key': 'cd295cc49e5c8dfd776d34174be1b9af' }
    })
        .then(response => {
            res.json({ data: response.data })
            console.log(response.data.daily_menus[0].daily_menu.dishes[0])
        })
        .catch(error => {
            console.log(error);
        });
});

module.exports = menuRouter;

//16507624