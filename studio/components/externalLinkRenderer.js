// ExternalLinkRenderer.js
import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

export const ExternalLinkRenderer = (props) => (
  <span>
    {props.children} <FaExternalLinkAlt />
  </span>
);
