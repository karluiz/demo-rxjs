import { messageService } from "../../services/message.service";

export const RandomQuotes = () => {
  const inspQuotes = "https://noctis.azurewebsites.net/quotes";

  const handleRandomQuote = () => {
    fetch(inspQuotes)
      .then((resp) => resp.json())
      .then((data) => {
        let randomNum = Math.floor(Math.random() * data.length);
        let randomQuote = data[randomNum];

        messageService.sendMessage(randomQuote.quote);
      });
  };

  return (
    <div className="buttonContainer">
      <button onClick={handleRandomQuote}>Siguiente</button>
      <button onClick={messageService.clearMessages}>Borrar mensajes</button>
    </div>
  );
};
