import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Textarea,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";

import { BiAddToQueue } from "react-icons/bi";
import { BASE_URL } from "../config"; // Update the import statement

const CreateUserModal = ({ setUsers }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInput] = useState({
    name: "",
    role: "",
    description: "",
    gender: "",
  });

  const toast = useToast();

  const handlecreateuser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(BASE_URL + "/friends", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      });
  
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
  
      console.log("Response data:", data); // ✅ Debugging: See what API returns
  
      toast({
        status: "success",
        title: "Woahh 🥳",
        description: "Buddy Added Successfully",
        duration: 2000,
        position: "top-center",
      });
  
      onClose();
      setInput({ name: "", role: "", description: "", gender: "" });
  
      // ✅ Immediately update UI
      setUsers((prevUsers) => [...prevUsers, data]);
  
      // 🔹 Fetch updated user list from backend (optional, but ensures accuracy)
      const updatedRes = await fetch(BASE_URL + "/friends");
      const updatedData = await updatedRes.json();
      setUsers(updatedData); // ✅ Now the latest users will be displayed
  
    } catch (error) {
      toast({
        status: "error",
        title: "Oops 🤯..Looks like your buddy won't be your friend",
        description: error.message,
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
     // setInput({ name: "", role: "", description: "", gender: "" });
    }
  };
  

  return (
    <>
      <Button onClick={onOpen}>
        <BiAddToQueue size={20} />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handlecreateuser}>
          <ModalContent>
            <ModalHeader>Buddies For Always</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Flex alignItems={"center"} gap={4}>
                {/* left */}
                <FormControl>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    placeholder="John Doe"
                    value={inputs.name}
                    onChange={(e) => setInput({ ...inputs, name: e.target.value })}
                  />
                </FormControl>

                {/* right */}
                <FormControl>
                  <FormLabel>Role</FormLabel>
                  <Input
                    placeholder="SDE"
                    value={inputs.role}
                    onChange={(e) => setInput({ ...inputs, role: e.target.value })}
                  />
                </FormControl>
              </Flex>

              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  resize={"none"}
                  overflowY={"hidden"}
                  placeholder="He's a software engineer, who loves to code"
                  value={inputs.description}
                  onChange={(e) => setInput({ ...inputs, description: e.target.value })}
                />
              </FormControl>

              <RadioGroup
                mt={4}
                onChange={(value) => setInput({ ...inputs, gender: value })}
              >
                <Flex gap={5}>
                  <Radio value='male'>Male</Radio>
                  <Radio value='female'>Female</Radio>
                </Flex>
              </RadioGroup>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3} type='submit' isLoading={isLoading}>
                Add
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default CreateUserModal;
