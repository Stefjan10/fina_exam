const Contact = require( '../models/contact.model' );

const express = require( 'express' );
const router = express.Router();

const formData = require( 'express-form-data' );
router.use( formData.parse() );


// ----- HENT/GET - ADMIN ----------------------------------------------------------
// ---------------------------------------------------------------------------------
router.get( '/admin/', async ( req, res ) => {

    console.log( "GET/hent - contact" )

    try {

        let contact = await Contact.find();

        return res.status( 200 ).json( contact );

    } catch ( error ) {
        console.log( error );
        return res.status( 400 ).json( { message: "Der er sket en fejl: " + error.message } );
    }

} );


// ----- HENT/GET UDVALGT - ADMIN -------------------------------------------------- 
// ---------------------------------------------------------------------------------

router.get( '/admin/:id', async ( req, res ) => {

    console.log( "GET/HENT - contact" );

    try {

        let contact = await Contact.findById( req.params.id ); // find udvalgt - snup id'en fra "url'en"

        if ( contact == null ) {
            return res.status( 404 ).json( { message: 'Contact kunne ikke findes' } );
        }

        return res.status( 200 ).json( contact );

    } catch ( error ) {
        console.log( error );
        return res.status( 400 ).json( { message: "Der er sket en fejl: " + error.message } );
    }

} );


// ----- OPRET/POST ----------------------------------------------------------------
// ---------------------------------------------------------------------------------

router.post( '/', async ( req, res ) => {

    console.log( "POST - contact", req.body )

    try {
        let contact = new Contact( req.body );
        await contact.save();
        return res.status( 200 ).json( { message: "Ny er oprettet", oprettet: contact } );

    } catch ( error ) {
        console.log( error );
        return res.status( 400 ).json( { message: "Der er sket en fejl: " + error.message } );
    }

} );


// ----- SLET/DELETE - ADMIN ------------------------------------------------------- 
// ---------------------------------------------------------------------------------

router.delete( '/admin/:id', async ( req, res ) => {

    console.log( "DELETE - contact" )

    try {

        let contact = await Contact.findByIdAndDelete( req.params.id );
        if ( contact == null ) {
            return res.status( 404 ).json( { message: 'Data kunne ikke findes og slettes', slettet: null } );
        }
        return res.status( 200 ).json( { message: "Contact er slettet", slettet: true } );

    } catch ( error ) {
        console.log( error );
        return res.status( 400 ).json( { message: "Der er sket en fejl: " + error.message, slettet: null } );
    }

} );


// ----- SLET/DELETE - ADMIN ------------------------------------------------------- 
// ---------------------------------------------------------------------------------

router.patch( '/admin/:id', async ( req, res ) => {

    console.log( "PATCH - contact" )

    try {

        console.log(req.body.read)

        let contact = await Contact.findByIdAndUpdate( req.params.id, { read: req.body.read } );
        if ( contact == null ) {
            return res.status( 404 ).json( { message: 'Data kunne ikke findes og opdateres', rettet: null } );
        }
        return res.status( 200 ).json( { message: "Contact er opdateret", rettet: true } );

    } catch ( error ) {
        console.log( error );
        return res.status( 400 ).json( { message: "Der er sket en fejl: " + error.message, rettet: null } );
    }

} );


module.exports = router;