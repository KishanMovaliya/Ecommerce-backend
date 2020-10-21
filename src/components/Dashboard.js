import React from "react";

import SwipeableTextMobileStepper from "./SwipeableTextMobileStepper";
import Header from "./Header";

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      
      <SwipeableTextMobileStepper />
      
    </div>
  );
}

export default Header(Dashboard);
