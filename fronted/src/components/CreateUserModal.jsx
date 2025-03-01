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
	useDisclosure,
} from "@chakra-ui/react";
import { BiAddToQueue } from "react-icons/bi";



const CreateUserModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
    <>
    <Button onClick={onOpen}>
        <BiAddToQueue size={20} />
    </Button>

    <Modal
    isOpen={isOpen}
    onClose={onClose}
    >
        <ModalOverlay/>
        <ModalContent>
            <ModalHeader>Buddies For Always</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6} >
                <Flex alignItems={"center"} gap={4} >
                    {/* left */}
                    <FormControl>
                        <FormLabel>Full Name</FormLabel>
                        <Input placeholder="John Doe" ></Input>
                    </FormControl>

                    {/* right */}
                    <FormControl>
                        <FormLabel>Role</FormLabel>
                        <Input placeholder="SDE"  ></Input>
                    </FormControl>
                </Flex>

                <FormControl mt={4}>
                        <FormLabel>Description</FormLabel>
                        <Textarea 
                        resize={"none"}
                        overflowY={"hidden"}
                        placeholder="He's a software engineer,who loves to code"
                        />
                    </FormControl>

     <RadioGroup mt={4} >
      <Flex gap={5}>
        <Radio value='male'>Male</Radio>
        <Radio value='female'>Female</Radio>
      </Flex>
    </RadioGroup>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme='blue' mr={3} > Add</Button>
                <Button onClick={onclose}>Cancel</Button>
            </ModalFooter>
        </ModalContent>

    </Modal>
    </>
    );
};

export default CreateUserModal;