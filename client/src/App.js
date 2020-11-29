import { ManageData } from "./components/ManageData";
import { useUserDataState } from "./contexts/userData";
import { MainContent } from "./components/layout/main/MainContent";
import styled from "@emotion/styled";
import { useRouteMatch } from "react-router-dom";
import { BottomContainer } from "./components/layout/bottom/BottomContainer";
import { LeftContainer } from "./components/layout/left/LeftContainer";
import { TopContainer } from "./components/layout/top/TopContainer";

const Container = styled.div``;

function App() {
  const haveUserData = useUserDataState();

  return (
    <div className="App">
      <Container>
        <ManageData>
          <TopContainer isUserAuthenticated={!!haveUserData.data} />
          <LeftContainer />
          <MainContent />
          <BottomContainer />
        </ManageData>
      </Container>
    </div>
  );
}

export default App;
