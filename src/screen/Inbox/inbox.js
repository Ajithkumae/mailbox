import { useEffect, useState } from "react";
import { mailBodyContent, mockMailList } from "../../service/apiConfig";
import { storageKeys } from "../../service/constant";
import {
  fetchData,
  getLocalStorage,
  setToLocalStorage,
  timeStampConverter,
} from "../../service/services";
import "./inbox.css";
const InboxScreen = () => {
  const fetchLocalStorageList = () => {
    const listItem = getLocalStorage(storageKeys.favoriteList);
    setFavoriteList(listItem);
    console.log("listItem", listItem);
  };
  const addTolocalStorage = ({ nameString, data }) => {
    debugger;
    let prvData = getLocalStorage(nameString);
    let checkExis = prvData?.includes(data);
    !checkExis && prvData?.length >= 0
      ? prvData.push(data)
      : (prvData = [data]);

    !checkExis &&
      setToLocalStorage(
        {
          nameString: nameString,
          data: prvData,
        },
        setFavoriteList(prvData)
      );
  };
  const fetchMailData = async () => {
    const data = await fetchData(mockMailList);
    setMailList(data);
  };
  const fetchMailBody = async (id) => {
    let url = mailBodyContent + id;
    const data = await fetchData(url);
    setCurrentMail(data);
    data.body && setShowMail(true);
  };
  useEffect(() => {
    fetchMailData();
    fetchLocalStorageList();
  }, []);

  const [mailList, setMailList] = useState([]);
  const [showMail, setShowMail] = useState(false);
  const [currentMail, setCurrentMail] = useState();
  const [favoriteList, setFavoriteList] = useState();

  let { subject, date, from } =
    mailList?.list?.find((el) => el.id == currentMail?.id) || {};
  return (
    <div className="container">
      <div className="headerBtn">
        Filter By :<h3>Unread </h3>
        <h3>Read </h3>
        <h3>Favorite </h3>
      </div>
      <div className={showMail ? `containerView` : "none"}>
        <div>
          {mailList?.list?.map((item, index) => {
            return (
              <div
                className="cardView"
                key={index}
                onClick={() => fetchMailBody(item.id)}
              >
                <div className="profileIcon">
                  {item.from.name.charAt(0).toUpperCase()}
                </div>
                <div className="mailDetails">
                  <div className="formDetail">
                    <h3>
                      From:
                      <span>
                        {item.from.name.charAt(0).toUpperCase() +
                          item.from.name.slice(1)}
                      </span>
                      <span>{`<${item.from.email}>`}</span>
                    </h3>
                  </div>
                  <h3>Subject: {item.subject}</h3>
                  <h3>{item.short_description}</h3>
                  <h3>{timeStampConverter(item.date)}</h3>
                </div>
              </div>
            );
          })}
        </div>
        {currentMail && (
          <div className="mailBodyView">
            <div className="mailBodyContainer">
              <div className="bodyHeader">
                <div className="profileIcon bodyProfileView">
                  {from?.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  {subject}
                  <div>{timeStampConverter(date)}</div>
                </div>
                <h3
                  className={
                    !favoriteList?.includes(currentMail.id)
                      ? "favBtn"
                      : "selectedFavBtn"
                  }
                  onClick={() =>
                    addTolocalStorage({
                      nameString: storageKeys.favoriteList,
                      data: currentMail?.id,
                    })
                  }
                >
                  Mark as favorite
                </h3>
              </div>
              <div
                className="mailBodyContentView"
                dangerouslySetInnerHTML={{ __html: currentMail?.body }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InboxScreen;
