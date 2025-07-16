export async function GET(request: Request) {
  try {
    // Get the Pokemon name from the query parameters
    const url = new URL(request.url);
    const pokemonName = url.searchParams.get('name') || 'pikachu'; // Default to 'pikachu' if no name provided
    
    // Fetch data from the PokeAPI using the Pokemon name
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    
    // Check if the response is ok
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Parse the JSON response and return it
    const data = await response.json();
    console.log(data); // Log the data for debugging purposes
    return Response.json(data);

    //error handling
  } catch (error) {
    console.error('Error fetching Pokemon data:', error);
    return Response.json(
      { error: 'Failed to fetch Pokemon data' },
      { status: 500 }
    );
  }
}