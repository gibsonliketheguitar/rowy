import { TransitionGroup } from "react-transition-group";

import {
  Container,
  Stack,
  Typography,
  Paper,
  List,
  Fade,
  Collapse,
} from "@mui/material";

import SlideTransition from "@src/components/Modal/SlideTransition";
import UserItem from "@src/components/Settings/UserManagement/UserItem";
import UserSkeleton from "@src/components/Settings/UserManagement/UserSkeleton";

export default function UserInvites({
  loading,
  query,
  results,
  usersState,
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
              ? `${results.length} of ${usersState.documents.length}`
              : usersState.documents.length}{" "}
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
                {results.map((user) => (
                  <Collapse key={user.id}>
                    <UserItem {...user} />
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
