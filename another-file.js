// Loading the dependencies
const axios = require("axios");
const cheerio = require("cheerio");

function getWord(word){
	return(word)
}
function getUrl(word){
	let word = getWord(word)
	let pageUrl = `https://www.oxfordlearnersdictionaries.com/definition/american_english/${word}`
	return (pageUrl)
}

// Async function which scrapes website data 
(async function scrapeData(){

	try {
		console.log("----------------------------------------------------------------------------")
		// Fetch the html of the page that's to be scraped
		const { data } = await axios.get(pageUrl)
		
		// Parse the html that got fetched
		let parsedMarkeup = cheerio.load(data)

		// List of the html elements with def class
		let wordDefinitions = parsedMarkeup(".def")
		wordDefinitions.each(function (idx, el){
			let wordDefinitionElement = parsedMarkeup(el)
			let wordDefinitionParent = wordDefinitionElement.parent()

			// Word category
			let wordDefinitionCategory = wordDefinitionParent.prev()
			if ( wordDefinitionCategory.hasClass('shcut') ){
				console.log(wordDefinitionCategory.text())
			}

			// Square bracketed word class
			let squareBracketedClassElements = wordDefinitionParent.find(".gram-g")
			squareBracketedClassElements.each((index, element)=>{
				console.log(parsedMarkeup(element).text())
			})

			// Definition text value
			console.log(wordDefinitionElement.text())

			// Word examples
			let wordxamples = wordDefinitionParent.find(".x-g")
			wordxamples .each(function(idx, element){
				console.log(parsedMarkeup(element).text().trim())
			})
			console.log("---------")
			
		})

	}catch ( error ){
		console.log(error)
	}
})()
