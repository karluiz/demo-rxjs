import { useState, useEffect } from "react";
import React, { useMemo } from "react";
import { animated, useTransition } from "react-spring";
import { messageService } from "../services/message.service";
import { RandomQuotes } from "../components/ramdom-quotes/random-quotes";

export default function Home() {
  const [messages, setMessages] = useState("First message");

  const items = useMemo(
    () =>
      messages.split("").map((letter, index) => ({
        item: letter,
        key: index,
      })),
    [messages]
  );

  const transitions = useTransition(items, (item) => item.key, {
    trail: 35,
    from: { display: "none" },
    enter: { display: "" },
  });

  useEffect(() => {
    const subscription = messageService.onMessage().subscribe((message) => {
      if (message.text) {
        setMessages(message.text);
      } else {
        setMessages("");
      }
    });

    return subscription.unsubscribe;
  }, []);

  return (
    <div className="dialogWindow">
      <div className="dialogTitle">Mensajes:</div>
      <div className="dialogMessage">
        {transitions.map(({ item, props, key }) => {
          return (
            <animated.span key={key} style={props}>
              {item.item}
            </animated.span>
          );
        })}
      </div>
      <RandomQuotes />
    </div>
  );
}
