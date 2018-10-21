import React from "react";
import styled from "react-emotion";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const GradientBar = styled(`div`)`
  height: 5px;
  width: 100%;
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.palette.gradients.primary}
  );
`;

const SimpleAppBar = ({ classes }) => {
  return (
    <AppBar position="static" color="default">
      <GradientBar />
      <Toolbar>
        <Typography variant="title">Profile</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default SimpleAppBar;
