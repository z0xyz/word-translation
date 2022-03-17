// Loading the dependencies
const axios = require("axios");
const cheerio = require("cheerio");

function getWord(word){
	return(word)
}
function getUrl(word){
	let currentWord = getWord(word)
	let pageUrl = `https://www.oxfordlearnersdictionaries.com/definition/american_english/${currentWord}`
	return (pageUrl)
}

// Async function which scrapes website data 
async function returnScrapedData(word){
	let pageUrl = getUrl(word)
	try {
		// Fetch the html of the page that's to be scraped
		const { data } = await axios.get(pageUrl)
		return ( data )
	}catch ( error ){
		console.log(error)
		console.log(`An error occurred while attempting to fetch the URL ${pageUrl}`)
	}
}

async function parseScrapedData(parsedData){
	// Parse the html that got fetched
	let parsedMarkeup = cheerio.load( await (parsedData) )

	let finalResultList = []
	let wordObject = {
		categories : [],
		definition : '',
		examples : []
	}
	// List of the html elements with def class
	let wordDefinitions = parsedMarkeup(".def")
	wordDefinitions.each(function (idx, el){
		let wordDefinitionElement = parsedMarkeup(el)
		let wordDefinitionParent = wordDefinitionElement.parent()

		// Word category
		let wordDefinitionCategory = wordDefinitionParent.prev()
		if ( wordDefinitionCategory.hasClass('shcut') ){
			wordObject.definition = wordDefinitionCategory.text()
		}

		// Square bracketed word class
		let squareBracketedClassElements = wordDefinitionParent.find(".gram-g")
		squareBracketedClassElements.each((index, element)=>{
			let wordCategory = parsedMarkeup(element).text()
			wordObject.categories.push(wordCategory)
		})

		// Definition textual value
		let wordDefinitionText = wordDefinitionElement.text()
		wordObject.definition = wordDefinitionText

		// Word examples
		let wordxamples = wordDefinitionParent.find(".x-g")
		wordxamples.each(function(idx, element){
			let wordExample = parsedMarkeup(element).text().trim()
			wordObject.examples.push(wordExample)
		})
		console.log("---------")
		finalResultList.push(wordObject) 
	
	})
	console.log ( finalResultList )
}

parseScrapedData(returnScrapedData('hack'))
