import React, { useState } from 'react';
import { ChakraProvider, Container, Stack, Text } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import UserGrid from './components/UserGrid';

export const BASE_URL = "http://localhost:5000/api";

function App() {
  const [users, setUsers] = useState([]);
  return (
    <ChakraProvider>
      <Stack min={"100vh"}>
        <Navbar setUsers={setUsers} />
        <Container maxW={"1200px"} my={4}>
          <Text
            fontSize={{ base: "3x1", md: "50" }}
            fontWeight={"bold"}
            letterSpacing={"2px"}
            textTransform={"uppercase"}
            textAlign={"center"}
            md={8}
          >
            <Text as={"span"} bgGradient={"linear(to-r , cyan.400 , blue.500)"} bgClip={"text"}>Buddies Zone</Text>
            🍻
          </Text>
          <UserGrid users={users} setUsers={setUsers} />
        </Container>
      </Stack>
    </ChakraProvider>
  );
}

export default App;



