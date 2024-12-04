const Team = require( '../models/team.model' );

const express = require( 'express' );
const router = express.Router();


// ----- Multer til upload af images -----------------------------------------------
// ---------------------------------------------------------------------------------

const multer = require( 'multer' );
const upload = multer( {

    storage: multer.diskStorage( {
        destination: function ( req, file, cb ) {
            cb( null, 'public/images/team' );   // path til image-folder
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

    console.log( "HENT ALLE - team" );

    try {
        const teams = await Team.find();
        return res.status( 200 ).json( teams );

    } catch ( error ) {
        console.log( error );
        return res.status( 500 ).json( { message: "Der var en fejl i: " + error.message } );
    }

} );


// ----- HENT/GET UDVALGT  --------------------------------------------------------- 
// ---------------------------------------------------------------------------------

router.get( '/:id', async ( req, res ) => {

    console.log( "GET/HENT - team" );

    try {

        let team = await Team.findById( req.params.id ); // find udvalgt - snup id'en fra "url'en"

        if ( team == null ) {
            return res.status( 404 ).json( { message: 'Data kunne ikke findes' } );
        }

        return res.status( 200 ).json( team );

    } catch ( error ) {
        console.log( error );
        return res.status( 400 ).json( { message: "Der er sket en fejl: " + error.message } );
    }

} );


// ----- OPRET/POST NY - ADMIN -----------------------------------------------------
// ---------------------------------------------------------------------------------

router.post( '/admin', upload.single( 'image' ), async ( req, res ) => {

    console.log( "POST - team" )

    try {

        let team = new Team( req.body );
        team.image = req.file ? req.file.filename : "paavej.jpg";

        await team.save();
        return res.status( 201 ).json( { message: "Ny er oprettet", oprettet: team } );

    } catch ( error ) {
        console.log( error );
        return res.status( 400 ).json( { message: "Der er sket en fejl: " + error.message } );
    }

} );


// ----- SLET/DELETE - ADMIN ------------------------------------------------------- 
// ---------------------------------------------------------------------------------

router.delete( '/admin/:id', async ( req, res ) => {

    console.log( "DELETE - team" )

    try {

        let team = await Team.findByIdAndDelete( req.params.id );

        if ( team == null ) {
            return res.status( 404 ).json( { message: 'Data kunne ikke findes og slettes', slettet: null } );
        }

        return res.status( 200 ).json( { message: "Team er slettet", slettet: true } );

    } catch ( error ) {
        console.log( error );
        return res.status( 400 ).json( { message: "Der er sket en fejl: " + error.message, slettet: null } );
    }

} );


// ----- RET/PUT - ADMIN ----------------------------------------------------------- 
// ---------------------------------------------------------------------------------

router.put( '/admin/:id', upload.single( 'image' ), async ( req, res ) => {

    console.log( "PUT - team" )

    try {

        if ( req.file ) {
            req.body.image = req.file.filename;
        }

        let team = await Team.findByIdAndUpdate( { _id: req.params.id }, req.body, { new: true } )

        if ( team == null ) {
            return res.status( 404 ).json( { message: 'Data kunne ikke findes og rettes', rettet: null } );
        }

        return res.status( 201 ).json( { message: "Team er rettet", rettet: team } )

    } catch ( error ) {
        console.log( error );
        return res.status( 400 ).json( { message: "Der er sket en fejl: " + error.message, rettet: null } );
    }

} );



module.exports = router;