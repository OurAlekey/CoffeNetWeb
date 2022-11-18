import React, { useCallback, useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { classNames } from "primereact/utils";
import { CSSTransition } from "react-transition-group";
import { Ripple } from "primereact/ripple";
import { Badge } from "primereact/badge";

const AppSubmenu = (props) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const onMenuItemClick = (event, item, index) => {
    if (item.disabled) {
      event.preventDefault();
      return;
    }

    //execute command
    if (item.command) {
      item.command({ originalEvent: event, item: item });
      event.preventDefault();
    }

    if (item.items) {
      event.preventDefault();
    }

    if (props.root) {
      props.onRootMenuItemClick({
        originalEvent: event,
      });
    } else {
      if (props.menuMode !== "sidebar") {
        const ink = getInk(event.currentTarget);
        if (ink) {
          removeClass(ink, "p-ink-active");
        }
      }
    }

    setActiveIndex(index === activeIndex ? null : index);

    props.onMenuItemClick({
      originalEvent: event,
      item: item,
    });
  };

  const onKeyDown = (event, item, index) => {
    if (event.key === "Enter") {
      onMenuItemClick(event, item, index);
    }
  };

  const getInk = (el) => {
    for (let i = 0; i < el.children.length; i++) {
      if (
        typeof el.children[i].className === "string" &&
        el.children[i].className.indexOf("p-ink") !== -1
      ) {
        return el.children[i];
      }
    }
    return null;
  };

  const removeClass = (element, className) => {
    if (element.classList) element.classList.remove(className);
    else
      element.className = element.className.replace(
        new RegExp(
          "(^|\\b)" + className.split(" ").join("|") + "(\\b|$)",
          "gi"
        ),
        " "
      );
  };

  const isMobile = () => {
    return window.innerWidth <= 1025;
  };

  const isHorizontalOrSlim = useCallback(() => {
    return props.menuMode === "horizontal" || props.menuMode === "slim";
  }, [props.menuMode]);

  const visible = (item) => {
    return typeof item.visible === "function"
      ? item.visible()
      : item.visible !== false;
  };

  const getLink = (item, index) => {
    const menuitemIconClassName = classNames("mr-3", item.icon);
    const content = (
      <>
        <i className={menuitemIconClassName}></i>
        <span className="layout-menuitem-text">{item.label}</span>
        {item.items && (
          <i className="pi pi-fw pi-chevron-down  layout-submenu-toggler"></i>
        )}
        {item.badge && <Badge value={item.badge} style={{ height: "100%" }} />}
        <Ripple />
      </>
    );
    const commonLinkProps = {
      style: item.style,
      className: classNames(
        item.className,
        "list-group-item  navbar-brand  text-light mb-4",
        {
          "p-disabled": item.disabled,
        }
      ),
      target: item.target,
      onClick: (e) => onMenuItemClick(e, item, index),

      onKeyDown: (e) => onKeyDown(e, item, index),
    };

    if (item.to) {
      return (
        <NavLink
          to={item.to}
          exact
          activeClassName="list-group-item  navbar-brand text-light  mb-4  border-bottom-2  w-50"
          {...commonLinkProps}
        >
          {content}
        </NavLink>
      );
    } else {
      return (
        <a
          href={item.url}
          rel="noopener noreferrer"
          tabIndex={item.url ? "" : 0}
          {...commonLinkProps}
        >
          {content}
        </a>
      );
    }
  };

  const getItems = () => {
    const transitionTimeout =
      isHorizontalOrSlim() && !props.root
        ? { enter: 1000, exit: 450 }
        : isHorizontalOrSlim() && !isMobile()
        ? 0
        : { enter: 1000, exit: 450 };
    return props.items.map((item, i) => {
      if (visible(item)) {
        const menuitemClassName = classNames({
          "layout-root-menuitem": props.root,
          "active-menuitem": activeIndex === i && !item.disabled,
        });
        const link = getLink(item, i);

        return (
          <li
            key={item.label || i}
            className={menuitemClassName}
            role="menuitem"
          >
            {link}

            <CSSTransition
              classNames="p-toggleable-content"
              timeout={transitionTimeout}
              in={activeIndex === i}
              unmountOnExit
            >
              <AppSubmenu
                items={visible(item) && item.items}
                menuActive={props.menuActive}
                menuMode={props.menuMode}
                parentMenuItemActive={activeIndex === i}
                onMenuItemClick={props.onMenuItemClick}
              ></AppSubmenu>
            </CSSTransition>
          </li>
        );
      }

      return null;
    });
  };

  useEffect(() => {
    if (props.resetActiveIndex && isHorizontalOrSlim()) {
      setActiveIndex(null);
    }
  }, [props.resetActiveIndex, isHorizontalOrSlim]);

  useEffect(() => {
    if (!props.menuActive && isHorizontalOrSlim()) {
      setActiveIndex(null);
    }
  }, [props.menuActive, isHorizontalOrSlim]);

  if (!props.items) {
    return null;
  }

  const items = getItems();
  return (
    <>
      <ul className="navbar-nav ml-5 mt-4 mt-lg-0" role="menu">
        {items}
      </ul>
    </>
  );
};

const AppMenu = (props) => {
  const history = useHistory();
  return (
    <div onClick={props.onMenuClick}>
      <div className="sidebar-logo" style={{ textAlign: "center" }}>
        <div>
          <button
            className="p-link"
            style={{ width: "50%" }}
            onClick={() => history.push("/")}
          >
            <img
              style={{
                width: "100%",
                height: "100%",
              }}
              src="assets/layout/images/pages/logo.ico"
            />
          </button>
        </div>
        <h4 style={{ textAlign: "center", color: "white" }}>CoffeNeet</h4>
      </div>
      <div className="layout-menu-container">
        <AppSubmenu
          items={props.model}
          className="layout-menu"
          menuActive={props.menuActive}
          onRootMenuItemClick={props.onRootMenuItemClick}
          mobileMenuActive={props.mobileMenuActive}
          onMenuItemClick={props.onMenuItemClick}
          root
          menuMode={props.menuMode}
          parentMenuItemActive
          resetActiveIndex={props.resetActiveIndex}
        />
      </div>
    </div>
  );
};

export default AppMenu;
