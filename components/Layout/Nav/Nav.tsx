import {
  Flex,
  Button,
  Heading,
  Container,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Link,
  VStack,
  useDisclosure,
  IconButton,
  useBreakpointValue,
  Portal,
  FlexProps,
  Stack,
  Box,
  Text,
  ButtonGroup,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { BarsIcon } from "../../Icons/Bars";
import { CloseIcon } from "../../Icons/Close";
import { navigation } from "../../../constants/navigation";

export const Nav = (props: FlexProps) => {
  const { isOpen, onToggle } = useDisclosure({
    defaultIsOpen: false,
  });
  const isMobile = useBreakpointValue({ base: true, lg: false });

  return (
    <Flex
      alignItems='center'
      as='nav'
      bgColor='#22261F'
      position='fixed'
      h={16}
      zIndex={100}
      width='full'
      // py={4}
      px={5}
      {...props}
    >
      <Container
        px={0}
        h='full'
        // justifyContent='space-between'
        flexDirection='row'
        centerContent
        maxWidth='container.xl'
      >
        <NextLink href='/'>
          <Heading cursor='pointer' fontSize='2xl' color='white'>
            WesterosCraft
          </Heading>
        </NextLink>

        {isMobile && (
          <Popover trigger='click' isOpen={isOpen}>
            <PopoverTrigger>
              <IconButton
                colorScheme='whiteAlpha'
                variant='ghost'
                display={["inherit", null, null, "none"]}
                onClick={onToggle}
                aria-label='open menu'
                size='md'
                p={1}
                icon={
                  isOpen ? (
                    <CloseIcon fill='white' />
                  ) : (
                    <BarsIcon fill='white' />
                  )
                }
              />
            </PopoverTrigger>
            <Portal>
              <PopoverContent bgColor='#22261F'>
                <PopoverBody>
                  {navigation.map((section) => (
                    <Button variant='link' key={section?._key} color='white'>
                      {section?.title}
                    </Button>
                  ))}
                </PopoverBody>
              </PopoverContent>
            </Portal>
          </Popover>
        )}
        <Flex height='full' w='full' justify='space-between'>
          <Flex display={["none", null, null, "flex"]}>
            {navigation.map((section) =>
              section.links && section.links?.length > 0 ? (
                <Popover key={section._key} trigger='click' openDelay={0.8}>
                  <PopoverTrigger>
                    <Button ml={8} height='full' variant='link' color='white'>
                      {section?.title}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent borderRadius={0}>
                    <PopoverBody p={4}>
                      <VStack spacing={4}>
                        {section.links.map((link) =>
                          link._type === "internalLink" ? (
                            <Link
                              as={NextLink}
                              // @ts-ignore
                              href={`/${link?.link?.slug.current}`}
                              passHref
                            >
                              <Stack
                                width='full'
                                cursor='pointer'
                                direction='column'
                                align='start'
                                spacing={1}
                              >
                                <Text
                                  transition='all .3s ease'
                                  fontWeight='bold'
                                >
                                  {link.title}
                                </Text>
                                <Text fontSize='sm'>{link.description}</Text>
                              </Stack>
                            </Link>
                          ) : (
                            <Link color='white' key={link._key}>
                              {link?.title}
                            </Link>
                          )
                        )}
                      </VStack>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              ) : (
                <Button ml={8} variant='link' key={section?._key} color='white'>
                  {section?.title}
                </Button>
              )
            )}
          </Flex>
          {!isMobile && (
            <ButtonGroup alignItems='center'>
              <Button fontSize='sm' colorScheme='whiteAlpha' variant='outline'>
                Apply to Build
              </Button>
              <Button fontSize='sm'>Explore Westeros</Button>
            </ButtonGroup>
          )}
        </Flex>
      </Container>
    </Flex>
  );
};
