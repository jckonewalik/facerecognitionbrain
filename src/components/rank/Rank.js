import React from "react";
const Rank = ({ loggedUser }) => {
  return (
    <div>
      <div className="white f3">{`${
        loggedUser.name
      }, your current entry count is ...`}</div>
      <div className="white f3">{loggedUser.entries}</div>
    </div>
  );
};

export default Rank;
