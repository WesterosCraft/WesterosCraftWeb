import React from "react";
import { Box } from "@chakra-ui/react";

const Dropcap = ({ children }: any) => {
  return (
    <Box
      as='span'
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        top: "0.25rem",
        float: "left",
        fontFamily: "heading",
        fontWeight: 400,
        lineHeight: 0.75,
        fontSize: "3.25rem",
        fontStyle: "normal",
        border: "2px solid brown",
        padding: "0.4em 0.45em",
        minWidth: "5.5rem",
        minHeight: "6rem",
        margin: "0 0.2em 0.075em 0",
      }}
      _before={{
        content: "''",
        borderColor: "brown",
        borderStyle: "dashed",
        position: "absolute",
        borderRightWidth: "2px",
        width: "1px",
        height: "calc(100% - 0.1em)",
        top: 0,
        right: "0.1em",
      }}
      _after={{
        content: "''",
        borderColor: "brown",
        borderStyle: "dashed",
        position: "absolute",
        width: "calc(100% - 0.1em)",
        borderBottomWidth: "2px",
        left: 0,
        bottom: "0.1em",
      }}
    >
      {children}
    </Box>
  );
};

export default Dropcap;
