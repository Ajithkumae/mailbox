import { useEffect, useState } from "react";
import FilterHeader from "../../component/FilterHeader";
import MailBodyView from "../../component/MailBodyView";
import MailCardView from "../../component/MailCardView";
import { mailBodyContent, mockMailList } from "../../service/apiConfig";
import { storageKeys } from "../../service/constant";
import {
  fetchData,
  getLocalStorage,
  onHandleLocalStorage,
  onHandleReadStatusLocalStoreage,
  handleFilter,
} from "../../service/services";
import "./inbox.css";
const InboxScreen = () => {
  const [mailList, setMailList] = useState([]);
  const [mailLocalList, setMailLocalList] = useState([]);
  const [showMail, setShowMail] = useState(false);
  const [currentMail, setCurrentMail] = useState();
  const [mailDetails, setMailDetails] = useState();
  const [filterType, setFilterType] = useState("All");

  const onHandleFavList = ({ nameString, data }) => {
    const check =
      mailLocalList.find((f) => f.id === data)?.favList === "favorite";
    const newData = [...mailLocalList];
    const id = mailLocalList.findIndex((f) => f.id === data);

    onHandleLocalStorage({ nameString: nameString, data: data });
    newData[id].favList = check ? "disFavorite" : "favorite";
    if (filterType === "Favorites") {
      let loadData = newData.filter((f) => f.favList === "favorite");
      setMailLocalList(loadData);
    } else {
      setMailLocalList(newData);
    }
  };

  const fetchMailData = async () => {
    const readListId = getLocalStorage(storageKeys.readList);
    const favoriteListId = getLocalStorage(storageKeys.favoriteList);
    const data = await fetchData(mockMailList);
    data.list?.forEach((list) => {
      if (readListId) {
        let readList = readListId.includes(list.id);
        list.status = readList ? "read" : "unRead";
        if (favoriteListId) {
          let favList = favoriteListId.includes(list.id);
          list.favList = favList ? "favorite" : "disFavorite";
        }
      } else {
        list.status = "unRead";
        list.favList = "disFavorite";
      }
    });
    setMailList(data.list);
    setMailLocalList(data.list);
  };

  const onHandleMarkAsRead = ({ id, dataList }) => {
    const newData = [...dataList];
    let index = newData.findIndex((el) => el.id === id);
    newData[index].status = "read";

    onHandleReadStatusLocalStoreage({
      nameString: storageKeys.readList,
      data: mailLocalList[index]?.id,
    });
  };

  const fetchMailBody = async (id) => {
    let url = mailBodyContent + id;
    const data = await fetchData(url);
    let { subject, date, from, favList } =
      mailLocalList?.find((el) => el.id === data?.id) || {};
    setMailDetails({
      subject: subject,
      date: date,
      from: from,
      favList: favList,
    });
    setCurrentMail(data);
    data.body && setShowMail(true);
  };

  useEffect(() => {
    fetchMailData();
  }, []);

  const onHandleFilter = (key) => {
    setFilterType(key);
    let updateData = handleFilter({ key, data: mailList });
    setMailLocalList(updateData);
  };

  return (
    <div className="container">
      <div className="headerBtn">
        <FilterHeader
          onHandleFilter={(val) => onHandleFilter(val)}
          filterType={filterType}
        />
      </div>
      <div className={showMail ? `containerView` : "marginAling"}>
        {!mailLocalList.length > 0 && (
          <div className="emptyContainer">no mail</div>
        )}
        <MailCardView
          mailLocalList={mailLocalList}
          currentMail={currentMail}
          fetchMailBody={(val) => fetchMailBody(val)}
          onHandleMarkAsRead={(val) =>
            onHandleMarkAsRead({ id: val.id, dataList: val.dataList })
          }
        />
        <MailBodyView
          currentMail={currentMail}
          mailDetails={mailDetails}
          mailLocalList={mailLocalList}
          onHandleFavList={(val) =>
            onHandleFavList({ nameString: val.nameString, data: val.data })
          }
        />
      </div>
    </div>
  );
};

export default InboxScreen;
