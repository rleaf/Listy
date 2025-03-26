async function getOMDB(title, year) {
   let url = (year) ? `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${title}&y=${year}` :
      `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${title}`

   const dbRes = await fetch(url)
   let data = (await dbRes.json()).Search
   for (const v of data) {
      if (v.Title.length > 100) v.Title = `${v.Title.slice(0, 90)}...`
   }

   return data
}

module.exports = getOMDB