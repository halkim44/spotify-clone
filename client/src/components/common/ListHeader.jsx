import styled from "@emotion/styled";

const Container = styled.div`
  display: grid;
  grid-template-columns: 24px 4fr 2fr [last] minmax(110px, 1fr);
  border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);
  padding: 6px 24px;
  grid-gap: 16px;
  > * {
    color: #b3b3b3;
  }
  > *:last-of-type {
    text-align: right;
    grid-column: last;
  }
  > *:first-of-type {
    text-align: center;
  }
`;

const Album = styled.div`
  text-align: left;
`;

const TopIndicator = styled.div`
  margin: 0;
  margin-bottom: 20px;
  padding: 0;
  height: 35px;
`;
export const ListHeader = ({ noAlbumInfo }) => {
  return (
    <>
      <TopIndicator className="sticky-sensor">
        <Container className={"sticky-list-header"}>
          <div>#</div>
          <div>TITLE</div>

          <Album>{!noAlbumInfo && "ALBUM"}</Album>
          <div>Time</div>
        </Container>
      </TopIndicator>
    </>
  );
};
