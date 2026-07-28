import dotenv from 'dotenv'
dotenv.config();

const PORT = process.env.PORT;

if(typeof(PORT) === undefined){
     console.log("The variable doesn't exist.")
}

// const PN = parseInt(PORT);

// if(typeof(PORT) === isNaN){

// }

export default PORT


// Loads the environment variables.
// Reads PORT.
// Checks if PORT is missing.
// Throws a meaningful error if it's missing.
// Converts PORT to a number using parseInt().
// Checks if the conversion produced NaN.
// Throws a meaningful error if the value isn't a valid number.
// Exports the validated number.