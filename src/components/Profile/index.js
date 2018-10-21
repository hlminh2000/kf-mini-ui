import React from "react";
import { gql } from "apollo-boost";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import State from "@microstates/react";
import { Query } from "react-apollo";

import { ContentContainer, StyledPaper, SectionContainer } from "./components";
import ProfileEditor from "./ProfileEditor";
import Jumbotron from "./Jumbotron";
import SavedQueries from "./SavedQueries";

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
      {({ data: { user } = {}, loading, error }) =>
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
                          About me
                        </Typography>
                        <StyledPaper elevation={1}>
                          <pre>
                            <Typography>{user.bio}</Typography>
                          </pre>
                        </StyledPaper>
                      </SectionContainer>
                      <SectionContainer>
                        <Typography variant="subheading" component="h3">
                          My Story
                        </Typography>
                        <StyledPaper elevation={1}>
                          <pre>
                            <Typography>{user.story}</Typography>
                          </pre>
                        </StyledPaper>
                      </SectionContainer>
                      <SectionContainer>
                        <Typography variant="subheading" component="h3">
                          Saved Queries
                        </Typography>
                        <SavedQueries />
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
