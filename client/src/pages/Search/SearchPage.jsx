import styled from "@emotion/styled";
import React, { useEffect } from "react";
import {
  Route,
  Switch,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { RecommendedSearch } from "./RecommendedSearch";
import { SearchResult } from "./SearchResult";

const Container = styled.div`
  margin-top: 58px;
`;

export const SearchPage = () => {
  // const clearInput = ()
  const { url } = useRouteMatch();

  useEffect(() => {}, []);
  return (
    <Container>
      <Switch>
        <Route exact path={url} component={RecommendedSearch} />
        <Route path={url + "/:query"} component={SearchResult} />
      </Switch>
    </Container>
  );
};
