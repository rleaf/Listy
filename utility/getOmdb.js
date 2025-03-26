async function getOMDB(title, year) {
   let url = (year) ? `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${title}&y=${year}` :
      `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${title}`

   const dbRes = await fetch(url)
   const data = await dbRes.json()
   return data.Search
}

module.exports = getOMDB