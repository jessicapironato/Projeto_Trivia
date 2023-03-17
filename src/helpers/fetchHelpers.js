export const fecthToken = async () => {
  const request = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await request.json();
  return data.token;
};