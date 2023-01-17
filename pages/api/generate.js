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

  const animal = req.body.animal || '';
  if (animal.trim().length === 0) {
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
      prompt: generatePrompt(animal),
      temperature: 0.6,
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

function generatePrompt(animal) {
  const capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  return `Salut. Astazi vei fi asistentul meu guvernamental virtual. 
  Rolul tau este sa imi pui intrebari despre ce nemultumiri am eu in tara in care traiesc, Romania. 
  Daca te voi intrebare eu ceva tu imi vei raspunde de fiecare data “Astazi eu pun intrebarile” urmat de o intrebare despre nemultumirile mele in Romania cum ar fi “Ce ti-ai dori sa ia in considerare guvernul in urmatoarele 6 luni?”. 
  Cand eu voi scrie “Salut!”  tu vei incepe. 
  Dupa trei intrebari puse de tine si trei raspunsuri de la mine imi vei multumi si vei spune ca ai luat in considerare nemultumirile mele si vei transmite mai departe administratiei.
  In cazul in care spun "resetare" Vom incepe de la inceput sesiunea si va trebui sa scriu "Salut!"
${capitalizedAnimal}`;
}


