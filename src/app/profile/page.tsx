"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Container,
} from "@mui/material";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import PeopleOutlineRoundedIcon from "@mui/icons-material/PeopleOutlineRounded";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";

const settingMenu = [
  { label: "My Profile", icon: <PersonRoundedIcon /> },
  { label: "Security", icon: <VpnKeyRoundedIcon /> },
  { label: "Users", icon: <PeopleOutlineRoundedIcon /> },
  { label: "Notifications", icon: <NotificationsNoneRoundedIcon /> },
  { label: "Logout", icon: <ExitToAppRoundedIcon sx={{ color: "red" }} /> },
];

const ProfilePage = () => {
  const userDetails: any = JSON.parse(localStorage.getItem("userData") || "{}");
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState(userDetails);
  const [selectedSetting, setSelectedSetting] = useState<number>(0);

  const handleEdit = () => setEditing(!editing);

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        backgroundColor: "white",
        borderRadius: "16px",
        color: "black",
        padding: "24px 16px",
      }}
    >
      <Box sx={{ width: 250, mr: 4 }}>
        <Typography variant="body1" fontWeight={600}>
          Account Settings
        </Typography>
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
          }}
        >
          {settingMenu.map((setting, index) => (
            <ListItem
              key={index}
              sx={{
                cursor: "pointer",
                backgroundColor: index === selectedSetting ? "#EFEFEF" : "",
                borderRadius: "24px",
                padding: "4px 16px",
                display: "flex",
                gap: 1,
              }}
              onClick={() => setSelectedSetting(index)}
            >
              {setting.icon}
              <ListItemText
                primary={setting.label}
                sx={{
                  color: index === 4 ? "red" : "black",
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Typography sx={{ fontSize: "24px", fontWeight: 600 }}>
          My Profile
        </Typography>
        <Typography sx={{ color: "#AAAAAA", fontSize: "14px" }}>
          Manage your personal information and account settings.
        </Typography>
        <Box
          sx={{
            mt: 3,
            mb: 3,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Box>
            <Typography sx={{ fontWeight: 600 }}>{user.name}</Typography>
            <Typography sx={{ color: "#AAAAAA", fontSize: "14px" }}>
              {user.role}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ color: "#AAAAAA", fontSize: "14px" }}>
                First Name
              </Typography>
              <Typography>{user.name?.split(" ")[0]}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ color: "#AAAAAA", fontSize: "14px" }}>
                Last Name
              </Typography>
              <Typography>{user.name?.split(" ")[1]}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ color: "#AAAAAA", fontSize: "14px" }}>
                Email Address
              </Typography>
              <Typography>{user.email}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ color: "#AAAAAA", fontSize: "14px" }}>
                Phone
              </Typography>
              <Typography>{user.phone}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ color: "#AAAAAA", fontSize: "14px" }}>
                Role
              </Typography>
              <Typography>{user.role}</Typography>
            </Box>
            <Button
              sx={{
                backgroundColor: "#EFEFEF",
                borderRadius: "16px",
                width: "max-content",
                padding: "8px 16px",
                color: "black",
              }}
            >
              Edit Personal Information
            </Button>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ color: "#AAAAAA", fontSize: "14px" }}>
                Country
              </Typography>
              <Typography>{user.name?.split(" ")[0]}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ color: "#AAAAAA", fontSize: "14px" }}>
                City / State
              </Typography>
              <Typography>{user.name?.split(" ")[1]}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ color: "#AAAAAA", fontSize: "14px" }}>
                Postal Code
              </Typography>
              <Typography>{user.email}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ color: "#AAAAAA", fontSize: "14px" }}>
                TAX ID
              </Typography>
              <Typography>{user.phone}</Typography>
            </Box>
            <Button
              sx={{
                backgroundColor: "#EFEFEF",
                borderRadius: "16px",
                width: "max-content",
                padding: "8px 16px",
                color: "black",
              }}
            >
              Edit Address
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ProfilePage;
