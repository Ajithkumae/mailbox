import { useEffect, useState } from "react";
import { mailBodyContent, mockMailList } from "../../service/apiConfig";
import { fetchData, timeStampConverter } from "../../service/services";
import "./inbox.css";
const InboxScreen = () => {
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
    console.table(mailList.list);
  }, []);

  const [mailList, setMailList] = useState([]);
  const [showMail, setShowMail] = useState(false);
  const [currentMail, setCurrentMail] = useState();

  let { subject, date } =
    mailList?.list?.find((el) => el.id == currentMail?.id) || {};
  return (
    <div className="container">
      <div className="headerBtn">
        Filter By :<h3>Unread </h3>
        <h3>Read </h3>
        <h3>Favorite </h3>
      </div>
      <div className={showMail && `containerView`}>
        <div>
          {mailList?.list?.map((item, index) => {
            return (
              <div
                className="cardView"
                key={index}
                onClick={() => fetchMailBody(item.id)}
              >
                <div className="profileIcon">F</div>
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
            <div className="bodyHeader">
              <div className="profileIcon bodyProfileView">F</div>
              <div>
                {subject}
                <div>{timeStampConverter(date)}</div>
              </div>
              <div>mark as fav</div>
            </div>
            <div
              className="mailBodyContentView"
              dangerouslySetInnerHTML={{ __html: currentMail?.body }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default InboxScreen;
