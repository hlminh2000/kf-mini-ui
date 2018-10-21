import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import State from "@microstates/react";
import Button from "@material-ui/core/Button";
import { gql } from "apollo-boost";
import { Query, Mutation } from "react-apollo";

import { SectionContainer } from "./components";

export default ({ onDoneClick = () => {} }) => {
  const USER_QUERY = gql`
    {
      user: self {
        _id
        egoId
        title
        firstName
        lastName
        bio
        story
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
          bio
          story
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
    bio = String;
    story = String;
  };
  const captureSnapshot = userMicrostate => ({
    _id: userMicrostate._id.state,
    egoId: userMicrostate.egoId.state,
    title: userMicrostate.title.state,
    firstName: userMicrostate.firstName.state,
    lastName: userMicrostate.lastName.state,
    bio: userMicrostate.bio.state,
    story: userMicrostate.story.state
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
                      <TextField
                        variant="outlined"
                        label="First Name"
                        disabled={userUpdateLoading}
                        placeholder="First Name"
                        value={localUsetData.firstName.state}
                        onChange={e =>
                          localUsetData.firstName.set(e.target.value)
                        }
                      />
                    </SectionContainer>
                    <SectionContainer>
                      <TextField
                        variant="outlined"
                        label="Last Name"
                        disabled={userUpdateLoading}
                        placeholder="Last Name"
                        value={localUsetData.lastName.state}
                        onChange={e =>
                          localUsetData.lastName.set(e.target.value)
                        }
                      />
                    </SectionContainer>
                    <SectionContainer>
                      <TextField
                        multiline
                        variant="filled"
                        label="Bio"
                        disabled={userUpdateLoading}
                        placeholder="Bio"
                        value={localUsetData.bio.state}
                        onChange={e => localUsetData.bio.set(e.target.value)}
                      />
                    </SectionContainer>
                    <SectionContainer>
                      <TextField
                        multiline
                        variant="filled"
                        label="Story"
                        disabled={userUpdateLoading}
                        placeholder="Story"
                        value={localUsetData.story.state}
                        onChange={e => localUsetData.story.set(e.target.value)}
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
                      <Button
                        disabled={userUpdateLoading}
                        onClick={onDoneClick}
                      >
                        Done
                      </Button>
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
