// Check if the arguments are sophisticated enough to either: import an external library or just loop through the provided words (for performance optimization)
function CheckArgumentsSophistication(arguments){
    let argumentsWords = []
    for ( let i=2 ; i<arguments.length ; i++){
        let currentWord = arguments[i]
        if (currentWord.slice(0,1) == '-'){
            return (true)
        }else{
            argumentsWords.push(currentWord)
        }
    } 
    return(argumentsWords)
}

// If the user indeed provided a fairly sophisticated arguments, then parse them using yargs library
// -Needs more refinement
//     -grape the words isn't added yet
//     -What if the user passed more arguments than just one single word
function parseSophisticatedFlags(){
    const args = require('yargs').argv
    let argumentsObject = {
        language : args.lang,
        conuntryLanguageDialect : args.country,
        wordDefinitionsCount: args.dcount,
        wordDefinitionExamplesCount: args.ecount
    }
    return(argumentsObject)
}

// This should evolve into a full fledged command line parsing function   
// This function should return either a : list containing all the plain words passed, or object containing more sophisticated properties
function getWord(){
    let arguments = process.argv
    if ( arguments.length == 2 ){
        return ('No values were passed')
    }else if ( arguments.length >= 3 ){
        let checkArgumentsSophisticationReturnValue = CheckArgumentsSophistication(arguments)
        if ( checkArgumentsSophisticationReturnValue == true){
            return(parseSophisticatedFlags())
        }else{
            return(checkArgumentsSophisticationReturnValue)
        }
    }
}

console.log(getWord())
