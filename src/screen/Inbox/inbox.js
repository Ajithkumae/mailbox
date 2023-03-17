import { useEffect, useState } from "react";
import "./inbox.css";
const InboxScreen = () => {

  useEffect(() => {
    fetch("https://flipkart-email-mock.vercel.app/")
    .then((response) => response.json())
    .then((data) => setmailList(data));
  }, []);
  const [mailList, setmailList] = useState([]);
  return (
    <div className="container">
      <div className="sortBtn">
        <span>Filter By </span>
        <span>Unread </span>
        <span>Read </span>
        <span>Favorite </span>
      </div>
      {mailList.list?.map((item, index) => {
        return (
          <div className="cardView" key={index}>
            <div className="profileIcon">F</div>
            <div className="mailDetails">
              <h3>From:{}</h3>
              <h3>Subject: Lorem Ipsum</h3>
              <p>ajirjk jjaj</p>
              <h3>Date</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InboxScreen;
