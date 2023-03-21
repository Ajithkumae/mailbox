import React from "react";
import { storageKeys } from "../../service/constant";
import { timeStampConverter } from "../../service/services";

const MailBodyView = (props) => {
  const { currentMail, mailDetails, mailLocalList, onHandleFavList } = props;
  return (
    <React.Fragment>
      {currentMail && (
        <div className="mailBodyView">
          <div className="mailBodyContainer">
            <div className="bodyHeader">
              <div className="profileIcon bodyProfileView">
                {mailDetails?.from?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                {mailDetails?.subject}
                <div>{timeStampConverter(mailDetails?.date)}</div>
              </div>
              <h3
                className={
                  mailLocalList.find((f) => f.id === currentMail?.id)
                    ?.favList === "favorite"
                    ? "selectedFavBtn"
                    : "favBtn"
                }
                onClick={() =>
                  onHandleFavList({
                    nameString: storageKeys.favoriteList,
                    data: currentMail?.id,
                  })
                }
              >
                {`${
                  mailLocalList.find((f) => f.id === currentMail?.id)
                    ?.favList === "favorite"
                    ? "Remove from favorite"
                    : "Mark as favorite"
                }`}
              </h3>
            </div>
            <div
              className="mailBodyContentView"
              dangerouslySetInnerHTML={{ __html: currentMail?.body }}
            />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default MailBodyView;
