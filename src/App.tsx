import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Center, Flex, Heading } from "@chakra-ui/react";

function App() {
  return (
    <Flex>
      <Center w="100%" h="75%">
        <Heading>Welcome!</Heading>
      </Center>
    </Flex>
  );
}

export default App;

interface IFooProps {
  children?: React.ReactElement<HTMLDivElement>;
}

const Foo: React.FC<IFooProps> = (props) => {
  return <div>{props.children}</div>;
};

const Bar: React.FC<{}> = () => {
  return (
    <Foo>
      <a>something</a>
    </Foo>
  );
};
