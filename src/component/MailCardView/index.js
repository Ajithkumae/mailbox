import { timeStampConverter } from "../../service/services";
import "./mailCardView.css";
const MailCardView = (props) => {
  const { mailLocalList, currentMail, fetchMailBody, onHandleMarkAsRead } =
    props;
  return (
    <div>
      {mailLocalList?.map((item, index) => {
        return (
          <div
            className="cardView"
            style={{
              borderColor: item.id === currentMail?.id ? "red" : "#cfd2dc",
              backgroundColor: item.status === "read" ? "#F2F2F2" : "#FFFFFF",
            }}
            key={index}
            onClick={() => {
              fetchMailBody(item.id);
              onHandleMarkAsRead({ id: item.id, dataList: mailLocalList });
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
              <div className="favIndcate">
                <h3>{timeStampConverter(item.date)}</h3>
                {item.favList === "favorite" && <h4>Favorite</h4>}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default MailCardView;
