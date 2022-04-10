import { useState } from "react";
import "./App.css";

function App() {
  const [lang, setLang] = useState("");
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [error, setError] = useState("");
  let speech = new SpeechSynthesisUtterance();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      setError(null);
      const response = await fetch(
        `http://localhost:5000/translate?text=${text}&lang=${lang}`
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      setIsLoading(false);
      setTranslatedText(data.text);
      speech.lang = lang;
      speech.text = data.text;
      speech.volume = 1;
      speech.rate = 0.8;
      speech.pitch = 1;
      window.speechSynthesis.speak(speech);
    } catch (e) {
      setIsLoading(false);
      setError(e.message);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        {!error && <h1>{translatedText}</h1>}
        {error && (
          <small
            style={{
              color: "red",
              display: "block",
            }}
          >
            {error}
          </small>
        )}
        <input
          type="text"
          name="lang"
          placeholder="Language"
          value={lang}
          onChange={(e) => setLang(e.target.value)}
        />
        <input
          type="text"
          name="text"
          placeholder="Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button disabled={isLoading} type="submit">
          Translate
        </button>
      </form>
    </div>
  );
}

export default App;
