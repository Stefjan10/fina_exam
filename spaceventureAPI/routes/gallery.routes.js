const Gallery = require( '../models/gallery.model' );

const express = require( 'express' );
const router = express.Router();


// ----- Multer til upload af images -----------------------------------------------
// ---------------------------------------------------------------------------------

const multer = require( 'multer' );
const upload = multer( {

    storage: multer.diskStorage( {
        destination: function ( req, file, cb ) {
            cb( null, 'public/images/gallery' );   // path til image-folder
        },
        filename: function ( req, file, cb ) {
            //cb(null, Date.now() + '-' + file.originalname)
            cb( null, file.originalname )
        }
    } )
} );


// ----- HENT/GET ALLE -------------------------------------------------------------
// ---------------------------------------------------------------------------------

router.get( '/', async ( req, res ) => {

    console.log( "GET/hent - gallery" )

    try {
        const gallery = await Gallery.find();
        return res.status( 200 ).json( gallery );

    } catch ( error ) {
        console.log( error );
        return res.status( 400 ).json( { message: "Der er sket en fejl: " + error.message } );
    }

} );


// ----- HENT/GET UDVALGT ----------------------------------------------------------
// ---------------------------------------------------------------------------------

router.get( '/:id', async ( req, res ) => {

    console.log( "GET/HENT - gallery" );

    try {

        let gallery = await Gallery.findById( req.params.id ); // find udvalgt - snup id'en fra "url'en"

        if ( gallery == null ) {
            return res.status( 404 ).json( { message: 'Data kunne ikke findes' } );
        }

        return res.status( 200 ).json( gallery );

    } catch ( error ) {
        console.log( error );
        return res.status( 400 ).json( { message: "Der er sket en fejl: " + error.message } );
    }

} );


// ----- OPRET/POST NY - ADMIN -----------------------------------------------------
// ---------------------------------------------------------------------------------

router.post( '/admin', upload.single( 'image' ), async ( req, res ) => {

    console.log( "POST - gallery" )

    try {

        let gallery = new Gallery( req.body );
        gallery.image = req.file ? req.file.filename : "paavej.jpg";

        await gallery.save();
        return res.status( 201 ).json( { message: "Ny er oprettet", oprettet: gallery } );

    } catch ( error ) {
        console.log( error );
        return res.status( 400 ).json( { message: "Der er sket en fejl: " + error.message } );
    }

} );


// ----- RET/PUT - ADMIN ----------------------------------------------------------- 
// ---------------------------------------------------------------------------------

router.put( '/admin/:id', upload.single( 'image' ), async ( req, res ) => {

    console.log( "PUT - gallery" )

    try {

        if ( req.file ) {
            req.body.image = req.file.filename;
        }

        let gallery = await Gallery.findByIdAndUpdate( { _id: req.params.id }, req.body, { new: true } )

        if ( gallery == null ) {
            return res.status( 404 ).json( { message: 'Data kunne ikke findes og rettes', rettet: null } );
        }

        return res.status( 201 ).json( { message: "Gallery er rettet", rettet: gallery } )

    } catch ( error ) {
        console.log( error );
        return res.status( 400 ).json( { message: "Der er sket en fejl: " + error.message, rettet: null } );
    }

} );


// ----- SLET/DELETE - ADMIN -------------------------------------------------------
// ---------------------------------------------------------------------------------

router.delete( '/admin/:id', async ( req, res ) => {

    console.log( "DELETE - gallery" )

    try {

        let gallery = await Gallery.findByIdAndDelete( req.params.id );

        if ( gallery == null ) {
            return res.status( 404 ).json( { message: 'Data kunne ikke findes og slettes', slettet: null } );
        }
        return res.status( 200 ).json( { message: "Gallery er slettet", slettet: true } );

    } catch ( error ) {
        console.log( error );
        return res.status( 400 ).json( { message: "Der er sket en fejl: " + error.message, slettet: null } );
    }

} );

module.exports = router;