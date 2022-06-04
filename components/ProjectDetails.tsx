import React from "react";
import {
  Heading,
  Flex,
  Box,
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  Thead,
  Tfoot,
  Button,
  Link,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  FlexProps,
  ButtonGroup,
} from "@chakra-ui/react";
import { isEmpty } from "lodash";
import dayjs from "dayjs";
import { ChakraNextImage } from "./ChakraNextImage";
import ImageSlider from "./ImageSlider";

export interface ProjectDetailsProps extends FlexProps {
  pageData: any;
}

export const ProjectDetails = ({ pageData, ...rest }: ProjectDetailsProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const projectDetailsMap = React.useMemo(
    () => [
      {
        label: "Region",
        accessor: pageData?.region?.name,
      },
      {
        label: "House",
        accessor: pageData?.house,
      },
      {
        label: "Status",
        accessor: pageData?.projectStatus,
      },
      {
        label: "Type",
        accessor: pageData?.type,
      },
      {
        label: "Warp",
        accessor: pageData?.warp,
      },
      {
        label: "Project Lead(s)",
        accessor: pageData?.projectLead,
      },
      {
        label: "Date Started",
        accessor: dayjs(pageData?.dateStarted).format("MMMM D, YYYY"),
      },
      {
        label: "Date Completed",
        accessor: dayjs(pageData?.dateCompleted).format("MMMM D, YYYY"),
      },
    ],
    [
      pageData?.dateCompleted,
      pageData?.dateStarted,
      pageData?.house,
      pageData?.projectLead,
      pageData?.projectStatus,
      pageData?.region?.name,
      pageData?.type,
      pageData?.warp,
    ]
  );
  return (
    <>
      <Box zIndex={50} position='relative' mt={[5, 0]} {...rest}>
        <Flex
          position='relative'
          borderWidth='.5px'
          borderStyle='solid'
          width={["100%", null, "auto"]}
        >
          <Table
            size='sm'
            variant='striped'
            colorScheme='blackAlpha'
            border='1.5px solid black'
          >
            <Thead>
              <Tr>
                <Th colSpan={2}>
                  <Heading color='text' fontSize={["xl", null, null, "2xl"]}>
                    Project Details
                  </Heading>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {!isEmpty(pageData?.additionalImages) &&
                pageData?.additionalImages && (
                  <Tr>
                    <Td textAlign='center' colSpan={2}>
                      <ChakraNextImage
                        src={
                          pageData?.additionalImages?.[1]?.url ||
                          pageData?.additionalImages?.[0]?.url
                        }
                        width={350}
                        height={197}
                        blurDataURL={
                          pageData?.additionalImages?.[0]?.metadata?.lqip
                        }
                        alt='Project status display image'
                      />
                    </Td>
                  </Tr>
                )}
              {projectDetailsMap?.map(
                (deet) =>
                  deet.accessor && (
                    <Tr key={deet.label}>
                      <Td fontSize='sm' fontWeight='bold'>
                        {deet.label}
                      </Td>
                      <Td fontSize='sm'>{deet.accessor}</Td>
                    </Tr>
                  )
              )}
            </Tbody>
            {
              <Tfoot>
                <Tr>
                  <Td py={3} colSpan={2} textAlign='center'>
                    <ButtonGroup>
                      {pageData?.application !== "" && pageData?.application && (
                        <Link
                          textDecoration='none'
                          href={pageData?.application}
                          isExternal
                          _hover={{ textDecoration: "none" }}
                        >
                          <a>
                            <Button
                              variant='primaryBlack'
                              size='xs'
                              colorScheme='gray'
                              textDecoration='none'
                            >
                              View App
                            </Button>
                          </a>
                        </Link>
                      )}
                      {pageData?.dynmapXcoord &&
                        !isEmpty(pageData?.dynmapXcoord) && (
                          <Link
                            isExternal
                            textDecoration='none'
                            href={`https://mc.westeroscraft.com/?mapname=flat&zoom=${
                              pageData?.dynmapZoom ?? "4"
                            }&x=${pageData?.dynmapXcoord ?? "0"}&z=${
                              pageData?.dynmapYcoord ?? "0"
                            }`}
                            _hover={{ textDecoration: "none" }}
                          >
                            <Button
                              variant='outline'
                              size='xs'
                              colorScheme='gray'
                              textDecoration='none'
                            >
                              View On Map
                            </Button>
                          </Link>
                        )}
                      {pageData?.additionalImages &&
                        !isEmpty(pageData?.additionalImages) && (
                          <Button
                            onClick={onOpen}
                            variant='primaryBlack'
                            size='xs'
                            colorScheme='gray'
                            textDecoration='none'
                          >
                            More Images
                          </Button>
                        )}
                    </ButtonGroup>
                  </Td>
                </Tr>
              </Tfoot>
            }
          </Table>
        </Flex>
      </Box>
      <Modal size='3xl' isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading size='1xl'>{pageData?.title}</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ImageSlider slides={pageData?.additionalImages} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
