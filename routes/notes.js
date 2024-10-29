const express=require('express');
const route= express.Router();

route.get('/',(req,res)=> {
    notes='This is just a note area';
    res.json(notes);
})
module.exports = route;