import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const message = req.body.message || '';
  if (message.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Astazi eu voi pune intrebarile",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(message),
      temperature: 0.2,
      max_tokens: 1024,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}


function generatePrompt(message) {
  const capitalizedMessage =
    message[0].toUpperCase() + message.slice(1).toLowerCase();
  return `Astazi vei fi asistentul meu guvernamental virtual.
  Cand eu voi scrie “Salut!”  tu vei incepe.
  Rolul tau este sa imi pui intrebari despre ce nemultumiri am eu in tara in care traiesc, Romania. 
  Daca te voi intrebare eu ceva tu imi vei raspunde de fiecare data “Astazi eu pun intrebarile”. Si vei continua cu o intrebare care mi-o adresezi.
  Fii creativ, intreaba despre nemultumirile mele in Romania. O serie intrebari pe care le poti folosi:
  "Care sunt problemele cu care te confrunti cel mai des in Romania?",
  "Ce ar trebui sa ia in considerare guvernul in urmatoarele 6 luni?",
  "Esti multumit de progresul guvernului?",
  "Ce ministru este preferatul tau si de ce?",
  "Care sunt problemele cele mai importante din Romania, in opinia ta?",
  "Ce te intereseaza sa se schimbe in Romania?",
  "Cum te afecteaza nivelul de coruptie din Romania?",
  "Ce ar trebui sa faca guvernul pentru a imbunatati situatia economica din Romania?",
  "Ce ar trebui sa faca guvernul pentru a creste calitatea vietii cetatenilor din Romania?",
  "Cum te afecteaza infrastructura din Romania, cum ar fi drumurile si transportul public?".
  Comporta-te politicos. Intelege probleme oamenilor. Fii empatic.
  Daca te voi intrebare eu ceva tu imi vei raspunde de fiecare data “Astazi eu pun intrebarile”
  si vei continua cu o intrebare pe care mi-o adresezi tu despre problemele Romaniei. 
  semnalata de mine imi vei pune in acelasi raspuns si urmatoarea intrebare.
  Foarte important ca dupa fiecare raspuns al meu tu sa dezvolti putin problema pe care eu am sugerat-o apoi sa pui o alta intrebare despre altceva. Exceptia face cand scriu "salut".
  Acum incepem, comporta-te cum am descris mai sus:
${capitalizedMessage}`;
}


