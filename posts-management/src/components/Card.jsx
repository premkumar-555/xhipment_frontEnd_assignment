import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";

const contentDiv = {
  width: "90%",
  height: "40%",
  display: "inline-block",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const theme = createTheme();

theme.typography.h5 = {
  fontSize: "1.2rem",
  "@media (max-width:800px)": {
    fontSize: "0.85rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1rem",
  },
};
theme.typography.body2 = {
  fontSize: "1.2rem",
  "@media (max-width:800px)": {
    fontSize: "0.50rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "0.75rem",
  },
};
export default function ImgMediaCard({
  open,
  setOpen,
  post,
  setInputPost,
  updatePost,
  deletePost,
}) {
  return (
    <Card
      sx={{
        maxWidth: 345,
        boxShadow:
          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
      }}
    >
      <CardContent>
        <ThemeProvider theme={theme}>
          <Typography gutterBottom variant="h5" component="div">
            {post.title}
          </Typography>
        </ThemeProvider>
        <Box
          sx={{
            width: "auto",
            height: 75,
            margin: "0",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <ThemeProvider theme={theme}>
            <Typography variant="body2" color="text.secondary">
              {post.body}
            </Typography>
          </ThemeProvider>
        </Box>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => {
            deletePost(post.id);
          }}
          size="small"
          color="error"
          variant="contained"
        >
          Delete
        </Button>
        <Button
          onClick={() => {
            setInputPost(post);
            setOpen(true);
          }}
          size="small"
          color="success"
          variant="contained"
        >
          Update
        </Button>
      </CardActions>
    </Card>
  );
}
