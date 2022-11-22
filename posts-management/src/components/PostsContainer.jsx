import Container from "@mui/material/Container";
import { useState, useEffect } from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import PopupModal from "./Model";
import Typography from "@mui/material/Typography";
import ImgMediaCard from "./Card";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  fontFamily: "sans sarif",
  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
}));

export default function PostsContainer({ posts, deletePost, updatePost }) {
  const [open, setOpen] = useState(false);
  const [inputPost, setInputPost] = useState({});

  return (
    <Container
      fixed
      sx={{
        position: "relative",
        top: "70px",
        padding: "1rem",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Posts
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {posts.map((ele, index) => (
            <Grid
              item
              xs={2}
              sm={3.5}
              md={3}
              key={index}
              sx={{
                boxSizing: "border-box",
                width: "200px",
                height: "200px",
                position: "inherit",
              }}
            >
              <ImgMediaCard
                open={open}
                setOpen={setOpen}
                post={ele}
                setInputPost={setInputPost}
                deletePost={deletePost}
                updatePost={updatePost}
              />
            </Grid>
          ))}
        </Grid>
        <PopupModal
          open={open}
          setOpen={setOpen}
          post={{ ...inputPost }}
          updatePost={updatePost}
        />
      </Box>
    </Container>
  );
}
