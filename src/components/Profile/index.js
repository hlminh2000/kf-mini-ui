import React from "react";
import { gql } from "apollo-boost";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import State from "@microstates/react";
import { Query } from "react-apollo";

import { ContentContainer, StyledPaper, SectionContainer } from "./components";
import ProfileEditor from "./ProfileEditor";
import Jumbotron from "./Jumbotron";

export default () => {
  const USER_QUERY = gql`
    {
      user: self {
        bio
        story
        email
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
          <State from={false}>
            {isEditing => (
              <div>
                <Jumbotron
                  user={user}
                  showEdit={!isEditing.state}
                  onEditClick={() => isEditing.toggle()}
                />
                <ContentContainer>
                  {isEditing.state ? (
                    <ProfileEditor
                      user={user}
                      onDoneClick={() => isEditing.toggle()}
                    />
                  ) : (
                    <>
                      <SectionContainer>
                        <Typography variant="subheading" component="h3">
                          {`About me`}
                        </Typography>
                        <StyledPaper elevation={1}>{user.bio}</StyledPaper>
                      </SectionContainer>
                      <SectionContainer>
                        <Typography variant="subheading" component="h3">
                          {"My Story"}
                        </Typography>
                        <StyledPaper elevation={1}>{user.story}</StyledPaper>
                      </SectionContainer>
                    </>
                  )}
                </ContentContainer>
              </div>
            )}
          </State>
        )
      }
    </Query>
  );
};
