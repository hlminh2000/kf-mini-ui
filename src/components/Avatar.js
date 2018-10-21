import React from "react";
import { gql } from "apollo-boost";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Query } from "react-apollo";
import md5 from "md5";
import { trim } from "lodash";

const AvatarImage = withStyles({
  avatar: {
    margin: 10,
    border: `solid 2px white`
  },
  bigAvatar: {
    width: 100,
    height: 100
  }
})(({ classes, email, size = 100 }) => (
  <Avatar
    src={`https://www.gravatar.com/avatar/${md5(
      trim(email.toLowerCase())
    )}?s=${size}`}
    className={classNames(classes.avatar, classes.bigAvatar)}
  />
));

const UserAvatar = ({ egoId }) => {
  const QUERY = gql`
    query($egoId: ID!) {
      user: userByEgoId(id: $egoId) {
        email
      }
    }
  `;
  return (
    <Query query={QUERY} variables={{ egoId }}>
      {({ loading, data: { user } = {}, error }) =>
        loading ? (
          <CircularProgress />
        ) : error ? (
          error.message
        ) : (
          <AvatarImage email={user.email} />
        )
      }
    </Query>
  );
};

export default UserAvatar;
