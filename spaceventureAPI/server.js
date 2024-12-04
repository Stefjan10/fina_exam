const express = require( 'express' );
require( 'dotenv' ).config();
const cors = require( 'cors' );

const app = express();
const PORT = process.env.PORT; // hent portnummer fra env-fil


// ==== DB Mongo og Mongoose
// ------------------------------------------------------------
const mongoose = require( 'mongoose' );

//Lokal DB
mongoose.connect( process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true } );

//Ekstern DB - indsæt connectionstring --> HUSK også at rette under session - "store"
//mongoose.connect( process.env.DB_URL_EXT, { useNewUrlParser: true, useUnifiedTopology: true } );

const db = mongoose.connection;
db.on( 'error', ( error ) => console.log( "FEJL: " + error ) )
db.once( 'open', () => console.log( "// ===> Yo der - jeg din ildsprudlende MongoDB ... klar til servere svedne data! (•̀ᴗ•́)و ̑̑ " ) )


// ==== APP
// ------------------------------------------------------------
app.use( express.json() );                              // håndter POST/PUT data som json
app.use( express.urlencoded( { extended: true } ) );    // håndter POST/PUT data som urlencoded-data
app.use( cors( { credentials: true, origin: true } ) )  // CORS
app.use( express.static( 'public' ) )                   // Herfra hentes uploadede filer/billeder fra serveren


// ==== SESSION
// ------------------------------------------------------------

const session = require( 'express-session' );
const MongoStore = require( 'connect-mongo' )

const expire = 1000 * 60 * 60 * 24 * 5 // 5 dage

app.use( session( {

    name: process.env.SESSION_NAME, // det navn cookien har i klientens browser - bruges til at slette cookien i den specifikke klients browser
    resave: true,  // om sessionen bliver gemt på serveren, selvom der ikke har været nogen ændringer i sessionens data - "true" kan være belastende for serveren 
    rolling: true,  // maxAge vil automatisk blive opdateret hver gang en anmodning modtages fra klienten
    saveUninitialized: false, // om sessionen (som altid laves) gemmes i store selvom der ingen "brugerdefinerede data" er oprettet i session (fx name og cookie)
    store: MongoStore.create( { mongoUrl: process.env.DB_URL } ),
    //store: MongoStore.create( { mongoUrl: process.env.DB_URL_EXT } ),
    secret: process.env.SESS_SECRET,
    cookie: {
        maxAge: expire,
        sameSite: 'strict', // 'none' 'lax'
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true, // vigtigt - session-cookie som ikke kan manipuleres med javascript
    }

} ) );


// ==== AUTH TJEK - tjek om bruger er "logget ind" (har godkendt cookie)
// ------------------------------------------------------------

// Udkommenter denne del, hvis der skal være adgang til ALT uden login
// app.use( '*/admin*', async ( req, res, next ) => {

//     if ( req.session && req.session.userId ) {

//         return next();

//     } else {

//         console.log( "LOGIN AFVIST" )
//         res.status( 401 ).json( { message: 'Du har ikke adgang...' } )
//         //res.set("Connection", "close");

//     }
// } )



// ==== FORSINK API-KALD
// ------------------------------------------------------------
// app.use( '*', async ( req, res, next ) => {
//     setTimeout( () => {
//         return next();
//     }, 3000 );
// } )


// ==== ROUTES
// ------------------------------------------------------------

// GET serverens endpoint - http://localhost:4444/

app.get( '/', async ( req, res ) => {

    res.status( 200 ).json(
        {
            info:
            {
                message: 'Velkommen til serverens start-endpoint - og held og lykke med eksamen!',
                port: "4444"
            },

            endpoints:
            {
                about: "http://localhost:4444/about",
                banner: "http://localhost:4444/banner",
                contact: "http://localhost:4444/contact",
                footer: "http://localhost:4444/footer",
                gallery: "http://localhost:4444/gallery",
                login: "http://localhost:4444/login",
                newssubscription: "http://localhost:4444/newssubscription",
                safety: "http://localhost:4444/safety",
                spacecraft: "http://localhost:4444/spacecraft",
                team: "http://localhost:4444/team",
                tours: "http://localhost:4444/tours",
                user: "http://localhost:4444/user",
            },

            imagepath:
            {
                banner: "http://localhost:4444/images/banner/",
                gallery: "http://localhost:4444/images/gallery/",
                spacecraft: "http://localhost:4444/images/spacecraft/",
                team: "http://localhost:4444/images/team/",
                tours: "http://localhost:4444/images/tours/",
            }
        }
    );
} );


app.use( '/about', require( './routes/about.routes' ) );
app.use( '/banner', require( './routes/banner.routes' ) );
app.use( '/contact', require( './routes/contact.routes' ) );
app.use( '/footer', require( './routes/footer.routes' ) );
app.use( '/gallery', require( './routes/gallery.routes' ) );
app.use( '/login', require( './routes/login.routes' ) );
app.use( '/newssubscription', require( './routes/newssubscription.routes' ) );
app.use( '/safety', require( './routes/safety.routes' ) );
app.use( '/spacecraft', require( './routes/spacecraft.routes' ) );
app.use( '/team', require( './routes/team.routes' ) );
app.use( '/tours', require( './routes/tours.routes' ) );
app.use( '/user', require( './routes/user.routes' ) );


// ==== LISTEN - http://localhost:4444/
// ------------------------------------------------------------
app.listen( PORT, () =>
    console.log( "// ===> Din SERVER er eksamensklar og hepper på dig - lytter lykkeligt og spændt på port " + PORT + " ۜʕʘ̅͜ʘ̅ʔ <3" )
)