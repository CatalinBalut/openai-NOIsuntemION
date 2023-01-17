import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: animalInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setAnimalInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  async function handleKeyDown(event) {

    if(event.key === "Enter"){
      await onSubmit(event)
    }                                                                                                                                                                                                                                                                                                                                                                                                           
  }

  return (
    <div>
      <Head>
        <title>Vorbeste cu ION</title>
      </Head>

      <main className={styles.main}>

      <div className="container">
            <div className="record-box record-box__working">
              <div className="left-side">
                <div className="left-title">Noi suntem Ion in oglinda</div>
                <div className="left-title-big">VORBESTE CU ION</div>
                <div className="left-first-message">Ajuta-l sa consilieze</div>
                <div class="left-first-message">Fi parte din guvernanta Romaniei</div>
                <div className="left-second-message">Scrie "Salut" pentru a initia discutia</div>
              </div>
                <div className="right-side">
                    <div id="chat" class="chat">
                        <form onSubmit={onSubmit}>
                            <input
                                className="message"
                                type="text"
                                name="animal"
                                placeholder="scrie salut"
                                value={animalInput}
                                onChange={(e) => setAnimalInput(e.target.value)}
                                onKeyDown ={(e) => handleKeyDown(e)}
                                autoComplete="off"
                            />
                            <input type="submit" value="Emite raspuns" />
                        </form>
                    </div>
                </div>
            </div>
            </div>
            <div className="response-box">
                <div className="right-side">
                    <div className="left-title-big">Raspunsul lui ION</div>
                    <div class="left-last-message">Vocea ta conteaza in fiecare zi</div>
                </div>
                <div className="response-content">
                    <div className="response">
                        {result}
                    </div>
                </div>
          </div>
      </main>
    </div>
  );
}
