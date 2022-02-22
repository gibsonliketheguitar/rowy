import { TransitionGroup } from "react-transition-group";

import { Stack, Typography, Paper, List, Fade, Collapse } from "@mui/material";

import SlideTransition from "@src/components/Modal/SlideTransition";
import UserSkeleton from "@src/components/Settings/UserManagement/UserSkeleton";
import InviteItem from "@src/components/Settings/UserManagement/InviteItem";

export default function UserInvites({
  loading,
  query,
  results,
  invitesState,
}: any) {
  return (
    <>
      <SlideTransition in timeout={100}>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          alignItems="flex-end"
          sx={{ mt: 4, ml: 1, mb: 0.5, cursor: "default" }}
        >
          <Typography variant="subtitle1" component="h2">
            {!loading && query
              ? `${results.length} of ${invitesState.documents.length}`
              : invitesState.documents.length}{" "}
            Pending User Invites
          </Typography>
        </Stack>
      </SlideTransition>
      {loading || (query === "" && results.length === 0) ? (
        <Fade in timeout={1000} style={{ transitionDelay: "1s" }} unmountOnExit>
          <Paper>
            <List sx={{ py: { xs: 0, sm: 1.5 }, px: { xs: 0, sm: 1 } }}>
              <UserSkeleton />
              <UserSkeleton />
              <UserSkeleton />
            </List>
          </Paper>
        </Fade>
      ) : (
        <SlideTransition in timeout={100 + 50}>
          <Paper>
            <List sx={{ py: { xs: 0, sm: 1.5 }, px: { xs: 0, sm: 1 } }}>
              <TransitionGroup>
                {results.map((user, index) => (
                  <Collapse key={index + user.email}>
                    <InviteItem {...user} />
                  </Collapse>
                ))}
              </TransitionGroup>
            </List>
          </Paper>
        </SlideTransition>
      )}
    </>
  );
}
