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
import Modal from "./Model";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  fontFamily: "sans sarif",
  border: "1px solid black",
  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
}));

export default function PostsContainer({ posts, deletePost }) {
  const [open, setOpen] = useState(false);

  return (
    <Container
      fixed
      sx={{
        position: "relative",
        top: "70px",
        border: "1px solid black",
        padding: "1rem",
      }}
    >
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
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              <Item key={ele.id} sx={{ fontSize: "1vw" }}>
                <h3>Id: {ele.id}</h3>
                <h3>title: {ele.title}</h3>
                <h3>body: {ele.body}</h3>
                <Stack direction="row" spacing={6}>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ width: "6vw", height: "2vw", fontSize: "1vw" }}
                    onClick={() => {
                      deletePost(ele.id);
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={() => {
                      setOpen(true);
                    }}
                    color="success"
                    variant="contained"
                    sx={{ width: "6vw", height: "2vw", fontSize: "1vw" }}
                  >
                    Update
                  </Button>
                  <Modal open={open} setOpen={setOpen} post={ele} />
                </Stack>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
