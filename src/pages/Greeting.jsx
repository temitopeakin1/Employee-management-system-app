import React from "react";
import { useState, useEffect } from "react";


const Greeting = () => {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const getCurrentTime = () => {
      const date = new Date();
      const hours = date.getHours();
      if (hours >= 5 && hours < 12) {
        setGreeting("Good Morning");
      } else if (hours >= 12 && hours < 17) {
        setGreeting("Good Afternoon");
      } else {
        setGreeting("Good Night");
      }
    };

    getCurrentTime();
  }, []);

  return (
    <div>
      <h1>{greeting}, Admin</h1>
    </div>
  );
};

export default Greeting;
