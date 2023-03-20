// a API retorna entidades HTML, por isso precisamos converter para texto puro, e para isso, usamos a função a seguir:
// material de consulta: https://linuxhint.com/decode-html-entities-javascript/

function decode(str) {
  const txt = new DOMParser().parseFromString(str, 'text/html');
  // console.log(txt.documentElement.textContent);
  return txt.documentElement.textContent;
}

export const fecthToken = async () => {
  const request = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await request.json();
  return data.token;
};

// A função decode passa por todos os atributos "question" e converte o que precisa.
export const fetchQuestions = async (token) => {
  const request = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const data = await request.json();
  const transformedData = data.results.map(
    (element) => ({ ...element, question: decode(element.question) }),
  );
  data.results = transformedData;
  // console.log(data.results);
  // console.log(data);
  return data;
};
