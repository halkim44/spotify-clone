import styled from "@emotion/styled";
import React from "react";
import { useParams } from "react-router-dom";
import { NoMatch } from "../NoMatch";
import { Discography } from "./Discography";

const SeeAll = styled.div`
  padding: 58px 32px 32px;
`;

export const SeeAllRouteHandler = ({ id }) => {
  const dataType = useParams().dataType;

  let toRender;

  switch (dataType) {
    case "discography":
      toRender = <Discography id={id} />;
      break;
    default:
      toRender = <NoMatch />;
  }

  return <SeeAll>{toRender}</SeeAll>;
};
