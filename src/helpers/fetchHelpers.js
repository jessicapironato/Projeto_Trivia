// a API retorna entidades HTML, por isso precisamos converter para texto puro, e para isso, usamos a função decode.
// a função decodeProps informa qual o objeto e as propriedades a serem acessadas, para posteriormente, na função FetchQuestions,
// ser chamada fazendo um map com as informações decofidicadas.
// material de consulta: https://linuxhint.com/decode-html-entities-javascript/

function decode(str) {
  const txt = new DOMParser().parseFromString(str, 'text/html');
  // console.log(txt.documentElement.textContent);
  return txt.documentElement.textContent;
}

function decodeProps(obj) {
  return {
    ...obj,
    question: decode(obj.question),
    correct_answer: decode(obj.correct_answer),
    incorrect_answers: obj.incorrect_answers.map(decode),
  };
}

// ___________________ //

export const fecthToken = async () => {
  const request = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await request.json();
  return data.token;
};

export const fetchQuestions = async (token) => {
  const request = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const data = await request.json();
  const transformedData = data.results.map(decodeProps);
  data.results = transformedData;
  // console.log(data);
  return data;
};
