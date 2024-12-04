const Footer = require( '../models/footer.model' );

const express = require( 'express' );
const router = express.Router();

const formData = require( 'express-form-data' );
router.use( formData.parse() );



// ----- HENT/GET  -----------------------------------------------------------------
// ---------------------------------------------------------------------------------

router.get( '/', async ( req, res ) => {

    console.log( "GET/hent - footer" )

    try {

        let footer = await Footer.findOne();

        if ( footer == null ) {
            return res.status( 404 ).json( { message: 'Data kunne ikke findes' } );
        }

        return res.status( 200 ).json( footer );

    } catch ( error ) {
        console.log( error );
        return res.status( 400 ).json( { message: "Der er sket en fejl: " + error.message } );
    }

} );



// ----- RET/PUT - ADMIN -----------------------------------------------------------
// ---------------------------------------------------------------------------------

router.put( '/admin/', async ( req, res ) => {

    console.log( "PUT - footer" )

    try {

        let footer = await Footer.findOneAndUpdate( {}, req.body, { new: true } );
        return res.status( 200 ).json( { message: 'Footer er rettet', rettet: footer } );

    } catch ( error ) {
        console.log( error );
        return res.status( 400 ).json( { message: "Der er sket en fejl: " + error.message } );
    }

} );





// ----- MIDLERTIDIG - POST TIL OPRETTELSE

// router.post( '/admin/', async ( req, res ) => {

//     console.log( "POST - footer" )

//     try {
//         let footer = new Footer( req.body );
//         await footer.save();
//         return res.status( 200 ).json( { message: "Ny er oprettet", oprettet: footer } );
//     } catch ( error ) {
//         console.log(error.message)
//         return res.status( 400 )
//     }

// } );


module.exports = router;