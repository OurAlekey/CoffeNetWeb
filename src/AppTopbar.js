import React, { useEffect, useRef, useState } from "react";
import AppMenu from "./AppMenu";

const AppTopbar = (props) => {
  return (
    <div>
      <AppMenu
        menuMode={props.menuMode}
        sidebarActive={props.sidebarActive}
        sidebarStatic={props.sidebarStatic}
        model={props.menu}
        menuActive={props.menuActive}
        onRootMenuItemClick={props.onRootMenuItemClick}
        onMobileMenuActive={props.onMobileMenuActive}
        onMenuItemClick={props.onMenuItemClick}
        onSidebarMouseOver={props.onSidebarMouseOver}
        onSidebarMouseLeave={props.onSidebarMouseLeave}
        onToggleMenu={props.onToggleMenu}
        resetActiveIndex={props.resetActiveIndex}
        onMenuClick={props.onMenuClick}
      />
    </div>
  );
};

export default AppTopbar;
