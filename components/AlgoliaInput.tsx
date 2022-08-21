import {
  Button,
  Text,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  ButtonProps,
  IconButton,
} from '@chakra-ui/react';
import { AlgoliaSearch } from './AlgoliaSearch';
import { MagnifyingGlassIcon } from './Icons/MagnifyingGlass';

export const AlgoliaInput = (props: ButtonProps) => {
  const {
    isOpen: isSearchOpen,
    onOpen: onSearchOpen,
    onClose: onSearchClose,
    onToggle: onSearchToggle,
  } = useDisclosure();

  return (
    <>
      <Button
        borderRadius="none"
        variant="unstyled"
        bg="primaryDarkGlare2"
        color="white"
        onClick={onSearchOpen}
        width="full"
        {...props}
      >
        <HStack height={10} color="white" ml="3">
          <MagnifyingGlassIcon fill="white" />
          <Text fontSize="sm" fontWeight="400">
            Search the wiki
          </Text>
        </HStack>
      </Button>
      <IconButton
        display={{ base: 'inherit', sm: 'none' }}
        variant="ghost"
        onClick={onSearchOpen}
        fill="white"
        icon={<MagnifyingGlassIcon />}
        _hover={{
          bg: 'whiteAlpha.300',
        }}
        aria-label="Open Wiki search"
      />
      <Modal isOpen={isSearchOpen} onClose={onSearchClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalBody p={4}>
            <AlgoliaSearch modalHandler={onSearchToggle} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
