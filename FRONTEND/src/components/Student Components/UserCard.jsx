import React, { useEffect, useState } from "react";
import UserService from "../../services/UserService";
import { CircularProgress, Typography, Card, CardContent } from "@mui/material";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await UserService.getCurrentUser();
        if (userData) {
          setUser(userData);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
  }, []);

  console.log(user);

  if (loading) return <CircularProgress color="inherit" />;

  return (
    <Card sx={{ bgcolor: "#25283d", borderRadius: 3, p: 3, boxShadow: "0px 0px 10px rgba(255, 152, 0, 0.4)", color: "#fff" }}>
      <CardContent>
        <Typography variant="h5" fontWeight="bold">Name: {user?.firstName}</Typography>
        <Typography variant="subtitle1" sx={{ color: "#ff9800" }}>Rank: {user?.rank}</Typography>
      </CardContent>
    </Card>
  );
};

export default UserProfile;