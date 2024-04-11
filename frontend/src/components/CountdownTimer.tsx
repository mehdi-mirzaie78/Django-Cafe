import React, { useState, useEffect } from "react";
import { Box, Heading, Text, useColorModeValue } from "@chakra-ui/react";

const CountdownTimer = () => {
  const [time, setTime] = useState(120); // Initial time in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(interval); // Stop the timer when it reaches 0
          return 0;
        }
      });
    }, 1000); // Update the timer every second

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  // Convert the time in seconds to minutes and seconds format
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  // Add leading zero if the value is less than 10
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  return (
    <Box textAlign="center" marginTop={5}>
      <Text color={useColorModeValue("gray.700", "gray.100")}>
        Time Remaining: {formattedMinutes}:{formattedSeconds}
      </Text>
    </Box>
  );
};

export default CountdownTimer;
