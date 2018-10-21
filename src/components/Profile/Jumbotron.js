import React from "react";
import Grid from "@material-ui/core/Grid";
import { gql } from "apollo-boost";
import CircularProgress from "@material-ui/core/CircularProgress";
import EditIcon from "@material-ui/icons/Edit";
import { Query } from "react-apollo";

import Avatar from "../Avatar";
import {
  JumbotronContainer,
  JumbotronInfoContent,
  JumbotronTypography
} from "./components";

export default ({ showEdit = true, onEditClick = () => {} }) => {
  const USER_QUERY = gql`
    {
      user: self {
        egoId
        title
        firstName
        lastName
      }
    }
  `;
  return (
    <Query query={USER_QUERY}>
      {({ data: { user }, loading, error }) =>
        loading ? (
          <CircularProgress />
        ) : error ? (
          error.message
        ) : (
          <JumbotronContainer container spacing={16}>
            <Grid item>
              <Avatar egoId={user.egoId} />
            </Grid>
            <JumbotronInfoContent>
              <JumbotronTypography variant="title">
                {user.firstName} {user.lastName}{" "}
                {showEdit && <EditIcon onClick={onEditClick} />}
              </JumbotronTypography>
              <JumbotronTypography variant="subheading">
                {user.title}
              </JumbotronTypography>
              <JumbotronTypography variant="subheading">
                {user.institution}
              </JumbotronTypography>
            </JumbotronInfoContent>
          </JumbotronContainer>
        )
      }
    </Query>
  );
};
