import { IconButton, Menu, MenuItem, MenuItemProps } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import React, { MouseEvent } from "react";

/** Yes, yes, yes, this is 100% the method that I, along with Team Alpha at Blackboard, fought _against_ for months...I'm not proud of it...but this makes the most sense here */
interface IMenuItem {
  text: string;
  onClick: (event: MouseEvent<HTMLLIElement>) => void;
  closeMenuOnClick?: boolean;
  menuItemProps?: MenuItemProps;
}

interface IActionMenuProps {
  menuItems: IMenuItem[];
}

export const ActionMenu: React.FC<IActionMenuProps> = ({ menuItems }) => {
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<Element>();

  const handleClick = (event: MouseEvent<HTMLLIElement>, menuItem: IMenuItem) => {
    if (menuItem.closeMenuOnClick) {
      setMenuAnchorEl(undefined);
    }
    menuItem.onClick(event);
  };

  const handleMenuClose = (event: {}, reason: string) => {
    if (reason === "backdropClick") {
      (event as any).stopPropagation(); // Another weird typing issue with Mui
    }
    setMenuAnchorEl(undefined);
  };

  return (
    <>
      <IconButton
        onClick={(event) => {
          event.stopPropagation();
          setMenuAnchorEl(event.currentTarget);
        }}
      >
        <MoreVert />
      </IconButton>
      <Menu anchorEl={menuAnchorEl} open={!!menuAnchorEl} onClose={(event, reason) => handleMenuClose(event, reason)}>
        {menuItems.map((menuItem, idx) => (
          /*Weird typing issue. Its typesafe everywhere else...at least should be*/
          <MenuItem
            onClick={(event: MouseEvent<HTMLLIElement>) => handleClick(event, menuItem)}
            key={idx}
            {...(menuItem.menuItemProps as any)}
          >
            {menuItem.text}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
