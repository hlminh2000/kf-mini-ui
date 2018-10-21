import React from "react";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import State from "@microstates/react";
import Button from "@material-ui/core/Button";
import { gql } from "apollo-boost";
import { Query, Mutation } from "react-apollo";

import { SectionContainer, FullWidthInput } from "./components";

export default ({ onDoneClick = () => {} }) => {
  const USER_QUERY = gql`
    {
      user: self {
        _id
        egoId
        title
        firstName
        lastName
      }
    }
  `;
  const USER_UPDATE = gql`
    mutation($userInput: UpdateByIdUserModelInput!) {
      userUpdate(record: $userInput) {
        recordId
        record {
          _id
          egoId
          title
          firstName
          lastName
        }
      }
    }
  `;
  const UserType = class {
    _id = String;
    egoId = String;
    title = String;
    firstName = String;
    lastName = String;
  };
  const captureSnapshot = userMicrostate => ({
    _id: userMicrostate._id.state,
    egoId: userMicrostate.egoId.state,
    title: userMicrostate.title.state,
    firstName: userMicrostate.firstName.state,
    lastName: userMicrostate.lastName.state
  });
  return (
    <Query query={USER_QUERY}>
      {({ loading, data: { user } = {}, error }) =>
        loading ? (
          <CircularProgress />
        ) : error ? (
          error.message
        ) : (
          <Mutation mutation={USER_UPDATE}>
            {(userUpdate, { loading: userUpdateLoading }) => (
              <State type={UserType} value={user}>
                {localUsetData => (
                  <>
                    <SectionContainer>
                      <Typography variant="subheading" component="h3">
                        {`First Name`}
                      </Typography>
                      <FullWidthInput
                        disabled={userUpdateLoading}
                        placeholder="First Name"
                        value={localUsetData.firstName.state}
                        onChange={e =>
                          localUsetData.firstName.set(e.target.value)
                        }
                      />
                    </SectionContainer>
                    <SectionContainer>
                      <Typography variant="subheading" component="h3">
                        {`Last Name`}
                      </Typography>
                      <FullWidthInput
                        disabled={userUpdateLoading}
                        placeholder="Last Name"
                        value={localUsetData.lastName.state}
                        onChange={e =>
                          localUsetData.lastName.set(e.target.value)
                        }
                      />
                    </SectionContainer>
                    <SectionContainer row>
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={userUpdateLoading}
                        onClick={() =>
                          userUpdate({
                            variables: {
                              userInput: captureSnapshot(localUsetData)
                            }
                          })
                        }
                      >
                        {userUpdateLoading ? <CircularProgress /> : "Save"}
                      </Button>
                      <Button onClick={onDoneClick}>Done</Button>
                    </SectionContainer>
                  </>
                )}
              </State>
            )}
          </Mutation>
        )
      }
    </Query>
  );
};
