import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { BiMenu } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="sm:hidden">
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <BiMenu className="text-5xl text-[#1E6091]" />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Link to="/Database/no_filter/1">
          <MenuItem
            className="!transition-all !duration-150 hover:!bg-[#99D98C]/30"
            onClick={handleClose}
          >
            <span className="font-bold text-[#1E6091]">Database</span>
          </MenuItem>
        </Link>
      </Menu>
    </div>
  );
}
