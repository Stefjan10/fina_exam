const Spacecraft = require( '../models/spacecraft.model' );

const express = require( 'express' );
const router = express.Router();

// ----- Multer til upload af images -----------------------------------------------
// ---------------------------------------------------------------------------------

const multer = require( 'multer' );
const upload = multer( {

    storage: multer.diskStorage( {
        destination: function ( req, file, cb ) {
            cb( null, 'public/images/spacecraft' ); 
        },
        filename: function ( req, file, cb ) {
            //cb(null, Date.now() + '-' + file.originalname)
            cb( null, file.originalname )
        }
    } )
} );


// ----- HENT/GET  -----------------------------------------------------------------
// ---------------------------------------------------------------------------------

router.get( '/', async ( req, res ) => {

    console.log( "GET/hent - spacecraft" )

    try {

        let spacecraft = await Spacecraft.findOne();

        if ( spacecraft == null ) {
            return res.status( 404 ).json( { message: 'Spacecraft kunne ikke findes' } );
        }

        return res.status( 200 ).json( spacecraft );

    } catch ( error ) {
        console.log( error );
        return res.status( 500 ).json( { message: "Problemer: " + error.message } ); // problemer med server
    }

} );


// ----- RET/PUT - ADMIN -----------------------------------------------------------
// ---------------------------------------------------------------------------------

router.put( '/admin', upload.single( 'image' ), async ( req, res ) => {

    console.log( "PUT - spacecraft" )

    try {

        if ( req.file ) {
            req.body.image = req.file.filename;
        }

        let spacecraft = await Spacecraft.findOneAndUpdate( {}, req.body, { new: true } );
        return res.status( 200 ).json( { message: 'Spacecraft er rettet', rettet: spacecraft } );

    } catch ( error ) {
        console.log( error );
        return res.status( 400 ).json( { message: "Der er sket en fejl: " + error.message } );
    }

} );




// ----- MIDLERTIDIG - POST TIL OPRETTELSE
// router.post( '/admin/', upload.single( 'image' ), async ( req, res ) => {

//     try {
//         let spacecraft = new Spacecraft( req.body );
//         spacecraft.image = req.file ? req.file.filename : "paavej.jpg";

//         await spacecraft.save();
//         return res.status( 200 ).json( { message: "Ny er oprettet", oprettet: spacecraft } );

//     } catch ( error ) {
//         console.log(error.message)
//         return res.status( 400 )
//     }

// } );


module.exports = router;