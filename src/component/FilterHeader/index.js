import React from "react";

const FilterHeader = (props) => {
  const { onHandleFilter, filterType } = props;
  return (
    <React.Fragment>
      Filter By :
      {["All", "Unread", "Read", "Favorites"].map((item, index) => {
        return (
          <h3
            key={index}
            onClick={() => onHandleFilter(item)}
            style={{
              backgroundColor: item === filterType ? "#e1e4ea" : "transparent",
            }}
          >
            {item}
          </h3>
        );
      })}
    </React.Fragment>
  );
};

export default FilterHeader;
