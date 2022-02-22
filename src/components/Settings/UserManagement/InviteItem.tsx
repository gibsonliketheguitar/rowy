import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Invite } from "@src/pages/Settings/UserManagement";

export default function InviteItem({ email, roles }: Invite) {
  const listItemChildren = (
    <>
      <ListItemAvatar>
        <Avatar />
      </ListItemAvatar>
      <ListItemText
        primary={email}
        sx={{
          overflowX: "hidden",
          "& > *": { userSelect: "all" },
        }}
        primaryTypographyProps={{ variant: "body1" }}
      />
    </>
  );
  return <ListItem children={listItemChildren} />;
}
