export const getPosters = async (id: number): Promise<any[]> => {
  const response = await fetch(
    `https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}/images?type=STILL&page=1`,
    {
      headers: {
        'X-API-KEY': process.env.REACT_APP_API_KP || '',
        'Content-Type' : 'application/json'
      }
    }
  )

  const res = await response.json()
  return res.items
}
