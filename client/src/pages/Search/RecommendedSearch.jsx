import React, { useEffect, useState } from "react";
import { Card } from "../../components/common/Card";
import { CardGroup } from "../../components/common/CardGroup";
import { Contents } from "../../components/layout/main/Contents";
import { useUserDataState } from "../../contexts/userData";
import { searchHistoryLocalStorageService } from "../../utils/localStorageService";

export const RecommendedSearch = () => {
  const [searchHistory, setSearchHistory] = useState(null);
  const userData = useUserDataState().data;

  useEffect(() => {
    setSearchHistory(
      searchHistoryLocalStorageService.getSearchHistory(userData.id)
    );
  }, [userData.id]);
  return (
    <div>
      {!!searchHistory && (
        <Contents>
          {console.log(searchHistory)}
          {!!searchHistory.length && (
            <CardGroup title="Recent Searches" freeHeight>
              {searchHistory.map((obj, i) => (
                <Card data={obj} type={obj.type} key={i} />
              ))}
            </CardGroup>
          )}
        </Contents>
      )}
    </div>
  );
};
