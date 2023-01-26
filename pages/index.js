import Head from "next/head";
import Image from 'next/image'
import { useState, useEffect } from "react";
import styles from "./index.module.css";
import header from "../pages/assets/Header.png";
import header1 from "../pages/assets/Header-1.png";
import header2 from "../pages/assets/Header-2.png";
import MCID from "../pages/assets/MCID.png";
import humans from "../pages/assets/humans.png";
import brands from "../pages/assets/Brands.png";
import brands1 from "../pages/assets/Brands-1.png";
import brands2 from "../pages/assets/Brands-2.png";
import brands3 from "../pages/assets/Brands-3.png";
import brands4 from "../pages/assets/Brands-4.png";

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
                <div className="left-first-message">Fi parte din guvernanta Romaniei</div>
                <div className="left-second-message">Scrie "Salut" pentru a initia discutia</div>
              </div>
                <div className="right-side">
                    <div id="chat" className="chat">
                        <form onSubmit={onSubmit}>
                            <div className="response-content">
                                <div className="response">
                                    {result}
                                </div>
                            </div>
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
          <div class="details-section">
            <div class="container details-container">
                <div class="details">
                    <div class="intro-details">
                    Între vocea internetului și autorități nu a existat niciodată o legătură <br /> directă în afara
                    petițiilor semnate share cu share.
                    Cum ar fi dacă oamenii ar putea să ajungă la autorități în fiecare zi?<br />
                    Dacă am putea fi reprezentați direct, de către un reprezentant <br /> digital, care sa fie în aceeași
                    măsură și eu și tu?
                    </div>
                    <div class="extra-details">\\\\\\\\\\\\\</div>
                    <div class="title-details">Aceasta este povestea prin care <br /> NOI devine ION. </div>
                    <div class="final-datails">AION, prima reprezentare digitală a vocii românilor, care ne <br /> reprezinta ca
                    intr-o oglindă. O oglindă în care portretul este schițat <br /> de date, iar mesajul transmis este
                    întotdeauna dat de subiectul <br /> care ne interesează.</div>
                </div>
                <div class="video">
                    <div class="videoEX"></div>
                </div>
            </div>
        </div>
          <div id="how-it-works" class="steps-sections">
            <div class="container">
            <div class="steps-title">Cum functioneaza?</div>
            <div class="steps">
                <div class="step step--1">
                <div class="step__icon">
                    <Image src={header} width="100%" alt="" />
                </div>
                <div class="step__title">Iti inregistrezi vocea</div>
                <p class="step__text">
                    Trimite-ne timbrul tău vocal, care poate fi vocea lui Ion.
                </p>
                </div>
                <div class="step step--2">
                <div class="step__icon">
                    <Image src={header1} width="100%" alt="" />
                </div>
                <div class="step__title">
                    Incarci fotografia
                </div>
                <p class="step__text">
                    Trimite-ne o fotografie, pentru a-i da o față lui Ion.
                </p>
                </div>
                <div class="step step--3">
                <div class="step__icon">
                    <Image src={header2} width="100%" alt="" />
                </div>
                <div class="step__title">
                    Esti parte din portretul <br /> lui Ion
                </div>
                <p class="step__text">
                    Inteligența artificială va genera în scurt timp imaginea reprezentantului digital după chipul și
                    asemănarea ta. Noi suntem Ion!
                </p>
                </div>
            </div>
            </div>
      </div>
    </main>
    <footer>
      <div class="container">
        <div class="separator"></div>
        <div class="sustinere">
          <p>Proiect sustinut de</p>
          <div class="logos">
            <a href="#"><Image width="100%" height="auto" src={MCID} alt="" /></a>
            <a href="#"><Image width="100%" className="humans" src={humans} alt="" /></a>
          </div>
          <div class="social">
            <a class="social__link" href="#">
              <Image width="100%" src={brands} alt="" />
            </a>
            <a class="social__link" href="#">
              <Image width="100%" src={brands1} alt="" />
            </a>
            <a class="social__link" href="#">
              <Image width="100%" src={brands2} alt="" />
            </a>
            <a class="social__link" href="#">
              <Image width="100%" src={brands3} alt="" />
            </a>
            <a class="social__link" href="#">
              <Image width="100%" src={brands4} alt="" />
            </a>
          </div>
        </div>
        <div class="sub-footer">
          <div class="links">
            <a href="#">Termeni si conditii</a>
            <a href="#">Politica de confidentialitate</a>
          </div>
          <div class="cp">
            Copyright © 2023 Humans Token AG. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
    </div>
  );
}
