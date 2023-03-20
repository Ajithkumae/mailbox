import { useEffect, useState } from "react";
import { mailBodyContent, mockMailList } from "../../service/apiConfig";
import { storageKeys } from "../../service/constant";
import {
  fetchData,
  getLocalStorage,
  onHandleLocalStorage,
  timeStampConverter,
} from "../../service/services";
import "./inbox.css";
const InboxScreen = () => {
  const [mailList, setMailList] = useState([]);
  const [showMail, setShowMail] = useState(false);
  const [currentMail, setCurrentMail] = useState();
  const [favoriteList, setFavoriteList] = useState();
  const [filterType, setFilterType] = useState("Unread");
  const fetchLocalStorageList = () => {
    const listItem = getLocalStorage(storageKeys.favoriteList);
    setFavoriteList(listItem);
  };

  const onHandleFavList = ({ nameString, data }) => {
    let favState = onHandleLocalStorage({ nameString: nameString, data: data });
    setFavoriteList(favState);
  };

  const fetchMailData = async () => {
    const data = await fetchData(mockMailList);
    data.list?.forEach((list) => {
      list.status = "unRead";
    });
    setMailList(data.list);
  };

  const markAsRead = ({ id, dataList }) => {
    const newData = [...dataList];
    newData[id].status = "read";
    setMailList(newData);
  };

  const fetchMailBody = async (id) => {
    let url = mailBodyContent + id;
    const data = await fetchData(url);

    setCurrentMail(data);
    data.body && setShowMail(true);
  };

  // useEffect(() => {
  //   handleFilter();
  // }, [favoriteList]);

  useEffect(() => {
    fetchMailData();
    fetchLocalStorageList();
  }, []);

  const handleFilter = (key) => {
    // fetchMailData();
    setFilterType(key);
    switch (key) {
      case "Favorites":
        let favList = mailList?.filter((f) => favoriteList.includes(f.id));
        setMailList(favList);
        break;
      case "Unread":
        let unRead = mailList?.filter((f) => f.status == "unRead");
        setMailList(unRead);
        break;
      case "Read":
        let read = mailList?.filter((f) => f.status == "read");
        setMailList(read);
        break;
      default:
        break;
    }
  };

  let { subject, date, from } =
    mailList?.find((el) => el.id === currentMail?.id) || {};

  return (
    <div className="container">
      <div className="headerBtn">
        Filter By :
        {["Unread", "Read", "Favorites"].map((item, index) => {
          return (
            <h3
              key={index}
              onClick={() => handleFilter(item)}
              style={{
                backgroundColor:
                  item === filterType ? "#e1e4ea" : "transparent",
              }}
            >
              {item}
            </h3>
          );
        })}
      </div>
      <div className={showMail ? `containerView` : "marginAling"}>
        {!mailList.length > 0 && <div className="emptyContainer">no mail</div>}
        <div>
          {mailList?.map((item, index) => {
            return (
              <div
                className="cardView"
                style={{
                  borderColor: currentMail?.id - 1 == index ? "red" : "#cfd2dc",
                  backgroundColor:
                    item.status === "read" ? "#F2F2F2" : "#FFFFFF",
                }}
                key={index}
                onClick={() => {
                  fetchMailBody(item.id);
                  markAsRead({ id: index, dataList: mailList });
                }}
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
                    onHandleFavList({
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
