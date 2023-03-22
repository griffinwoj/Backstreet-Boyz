const searchBar = document.querySelector(".searchBar")
const searchBtn = document.querySelector(".searchBtn")

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '2fc6aecdb0mshaa821d0dd2c6c0ap1f7de4jsncf7d761a6010',
		'X-RapidAPI-Host': 'trailapi-trailapi.p.rapidapi.com'
	}
};
const googleOptions = {
    //like options above line 4, figure it out
}
const getLoc = async (searchInput) => {
    await fetch('https://maps.google.com', googleOptions)
	.then(response => response.json())
	.then(response => {
        // do anythung we need with the data
        const location = response.data
        const [lat,lon] = location 
        return [lat,lon] 
    })
	.catch(err => console.error(err)); 

}
const getTrails = async([lat,lon]) => {

   await fetch('https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lat=%3C' + lat + '%3E&lon=%3C' + lon + '%3E', options)
	.then(response => response.json())
	.then(response => {
        //do anything we need with data and update the page with new elements to represent it.
    })
	.catch(err => console.error(err)); 

}
const run = async (searchInput) => {
const [lat,lon] = await getLoc(searchInput)

}
    searchBtn.addEventListener("click", function () {
        const searchInput = searchBar.value
        return()
    })