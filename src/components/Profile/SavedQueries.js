import React from "react";
import { gql } from "apollo-boost";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import { Query } from "react-apollo";
import { StyledPaper } from "./components";

export default ({ egoId }) => {
  const QUERY = gql`
    {
      user: self {
        savedQueries {
          alias
          id
          creationDate
          content {
            longUrl
          }
        }
      }
    }
  `;
  return (
    <Query query={QUERY}>
      {({ data: { user } = {}, loading, error }) =>
        loading ? (
          <CircularProgress />
        ) : error ? (
          error.message
        ) : (
          <StyledPaper>
            {user.savedQueries.map(query => (
              <div>
                <Typography>{query.alias}</Typography>
                <Divider />
              </div>
            ))}
          </StyledPaper>
        )
      }
    </Query>
  );
};
