// fetch er sjálfgefið hér; next sér um að importa
// Ekki þarf að geyma í env
const baseUrl = "https://swapi-graphql.netlify.app/.netlify/functions/index";

/**
 * Run a GraphQL query against the SWAPI GraphQL API
 * @param query GraphQL query to run against SWAPI GraphQL
 * @param variables Variables for query
 * @returns Result as given generic type T
 */
export async function fetchSwapi<T>(
  query: string,
  variables: Record<string, string> = {}
): Promise<T> {
  const serializedVariables = encodeURIComponent(JSON.stringify(variables));
  let result = null;

  try {
    result = await fetch(
      `${baseUrl}?query=${query}&variables=${serializedVariables}`,
      { method: "POST" }
    );
  } catch (e) {
    console.error("Error fetching from SWAPI", e);
    throw e;
  }

  if (!result.ok) {
    console.info(await result.text());
    throw new Error(
      `Error fetching from SWAPI, non 200 status: ${result.status}`
    );
  }
  const json = await result.json();
  return json.data as T;
}

export async function fetchCharacters<T>(after = ""): Promise<T> {
  const query = `
  query ($after: String = ""){
    allPeople(first:10 after: $after) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      people {
        id
        name
      }
    }
  }
  `;

  return fetchSwapi<T>(query, { after });
}
