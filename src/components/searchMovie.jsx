
const SearchMovie = (apiKey,movie,setResult,result) => {
  fetch(`http://www.omdbapi.com/?apikey=${apiKey}&t=${movie}`)
    .then(response => response.json())
    .then(data => {
      setResult(data);
    
    })
    .catch(error => {
      console.error('Error al llamar a la API:', error);
    });
    
};
export default SearchMovie