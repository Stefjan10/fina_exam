const User = require('../models/user.model');

const express = require( 'express' );
const router = express.Router();

const formData = require('express-form-data');  // multipart formdata - x-www-form-urlencoded håndteres i server.js
router.use(formData.parse());


// ----- HENT/GET ALLE - ADMIN -------------------------------------------------------------
// -----------------------------------------------------------------------------------------
router.get('/admin', async (req, res) => {

    console.log("HENT ALLE user");

    try {

        const user = await User.find();
        res.json(user);

    } catch (err) {
        res.status(500).json({ message: "Der var en fejl i: " + err.message });
    }

});



// ----- HENT/GET UDVALGT  - ADMIN ---------------------------------------------------------
// -----------------------------------------------------------------------------------------


router.get('/admin/:id', findUser, async (req, res) => { 

    console.log("HENT UD FRA ID - user")

    res.json(res.user);

});



// ----- OPRET/POST NY -  ADMIN ------------------------------------------------------------
// -----------------------------------------------------------------------------------------


router.post('/admin', async (req, res) => {

    console.log("POST - user");

    try {

        // Tjek først om email findes i forvejen
        let user = await User.findOne({ email: req.body.email })

        if (user) {

            return res.status(401).json({ message: "User findes allerede (OBS - denne besked skal laves om - GDPR!" })

        } else {

            user = new User(req.body);
            const ny = await user.save();
            res.status(201).json({ message: "Ny bruger er oprettet", ny: ny });
        }
    }
    catch (error) {
        res.status(400).json({ message: "Der er sket en fejl", error: error.message });
    }

});



// ----- SLET/DELETE - ADMIN ---------------------------------------------------------------
// -----------------------------------------------------------------------------------------


router.delete('/admin/:id', findUser, async (req, res) => {

    console.log("DELETE - user")

    try {

        await res.user.delete();
        res.status(200).json({ message: 'Der er nu slettet' })

    } catch (error) {
        res.status(500).json({ message: 'Der kan ikke slettes - der er opstået en fejl: ' + error.message })
    }

});



// ----- RET/PUT - ADMIN -------------------------------------------------------------------
// -----------------------------------------------------------------------------------------


router.put('/admin/:id', findUser, async (req, res) => {

    console.log("PUT - user")

    try {

        res.user.name = req.body.name;
        res.user.email = req.body.email;
        res.user.admin = req.body.admin;    // true el false - default er false (hvis ikke medsendes)


        // Hvis password skal rettes - udvides evt. så det kræver gl. password at få et nyt password?
        if (req.body.password) res.user.password = req.body.password;

        await res.user.save();
        res.status(200).json({ message: 'Der er rettet', rettet: res.user });

    } catch (error) {

        res.status(400).json({ message: 'Der kan ikke rettes - der er opstået en fejl: ' + error.message })

    }

});



// MIDDLEWARE: FIND UD FRA ID  -------------------------------------------------------------
// -----------------------------------------------------------------------------------------


async function findUser(req, res, next) {

    console.log("FIND UD FRA ID - user")
    let user;

    try {

        user = await User.findById(req.params.id);

        if (user == null) {
            return res.status(404).json({ message: 'Der findes ikke en med den ID' });
        }


    } catch (error) {

        console.log(error);
        return res.status(500).json({ message: "Problemer: " + error.message });
    }

    res.user = user;
    next();
}

module.exports = router;