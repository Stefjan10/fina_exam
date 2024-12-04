const Newssubscription = require( '../models/newssubscription.model' );

const express = require( 'express' );
const router = express.Router();

const formData = require( 'express-form-data' );
router.use( formData.parse() );


// ----- HENT/GET - ADMIN ----------------------------------------------------------
// ---------------------------------------------------------------------------------

router.get( '/admin/', async ( req, res ) => {

    console.log( "GET/hent - newssubscription" )

    try {

        let newssubscription = await Newssubscription.find();
        return res.status( 200 ).json( newssubscription );

    } catch ( error ) {
        console.log( error );
        return res.status( 400 ).json( { message: "Der er sket en fejl: " + error.message } );
    }

} );


// ----- HENT/GET UDVALGT - ADMIN -------------------------------------------------- 
// ---------------------------------------------------------------------------------

router.get( '/admin/:id', async ( req, res ) => {

    console.log( "GET/HENT - newssubscription" );

    try {

        let newssubscription = await Newssubscription.findById( req.params.id ); // find udvalgt - snup id'en fra "url'en"

        if ( newssubscription == null ) {
            return res.status( 404 ).json( { message: 'Data kunne ikke findes' } );
        }

        return res.status( 200 ).json( newssubscription );

    } catch ( error ) {
        console.log( error );
        return res.status( 400 ).json( { message: "Der er sket en fejl: " + error.message } );
    }
} );


// ----- OPRET/POST - BRUGER -------------------------------------------------------
// ---------------------------------------------------------------------------------

router.post( '/', async ( req, res ) => {

    console.log( "POST - newssubscription" )

    try {

        // Tjek først om der allerede findes en med den mail
        let emailslettes = req.body.email;
        let newssubscription = await Newssubscription.findOne( { email: emailslettes } );

        if ( !newssubscription ) {
            newssubscription = new Newssubscription( req.body );
            await newssubscription.save();
        }

        return res.status( 200 ).json( { message: "Ny er oprettet", oprettet: newssubscription } );

    } catch ( error ) {
        console.log( error );
        return res.status( 400 ).json( { message: "Der er sket en fejl: " + error.message } );
    }

} );


// ----- SLET/DELETE UD FRA EMAIL - BRUGER-AFMELDING ------------------------------- 
// ---------------------------------------------------------------------------------

router.delete( '/afmeld/:email', async ( req, res ) => {

    // OBS! DELETE kan ikke modtage body fra browser (kun Postman!) - derfor params
    console.log( "DELETE - newssubscription (ud fra EMAIL)" )

    try {

        let newssubscription = await Newssubscription.findOne( { email: req.params.email } );

        if ( newssubscription == null ) {
            return res.status( 404 ).json( { message: 'Ingen newssubscription med den email (pas på GDPR!)' } );
        }

        await newssubscription.remove();
        res.status( 200 ).json( { message: 'Newssubscription er nu slettet' } )


    } catch ( error ) {
        console.log( error );
        return res.status( 400 ).json( { message: "Der er sket en fejl: " + error.message, slettet: null } );
    }

} );


// ----- SLET/DELETE - ADMIN ------------------------------------------------------------------------------------------------------------ 
// ---------------------------------------------------------------------------------

router.delete( '/admin/:id', async ( req, res ) => {

    console.log( "DELETE - newssubscription (ud fra ID)" )

    try {

        let newssubscription = await Newssubscription.findByIdAndDelete( req.params.id );

        if ( newssubscription == null ) {
            return res.status( 404 ).json( { message: 'Data kunne ikke findes og slettes', slettet: null } );
        }
        return res.status( 200 ).json( { message: "Newssubscription er slettet", slettet: true } );

    } catch ( error ) {
        console.log( error );
        return res.status( 400 ).json( { message: "Der er sket en fejl: " + error.message, slettet: null } );
    }

} );


module.exports = router;