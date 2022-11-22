import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useState, useEffect, useContext } from "react";
import UserContext from "./UserContext";
import swal from "sweetalert";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  pt: 2,
  px: 4,
  pb: 3,
};

export default function PopupModal({
  open,
  setOpen,
  post,
  updatePost,
  createPost,
}) {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    userId: "",
    created_time: "",
  });
  const { userId, setUserId } = useContext(UserContext);

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    border: "1px solid pink",
    borderRadius: "1rem",
    background: "whitesmoke",
    justifyContent: "center",
    alignItems: "left",
    padding: "1.5rem",
  };

  const handleInputChanges = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
      userId: userId,
    });
  };

  useEffect(() => {
    setFormData({ ...post });
    console.log(formData);
  }, [post]);

  return (
    <Modal open={open}>
      <Box
        sx={{
          ...style,
          width: 300,
          height: 300,
          borderRadius: "1rem",
        }}
      >
        <form style={formStyle}>
          <div>
            <label htmlFor="title">
              <b>Title : </b>
            </label>
            <input
              onChange={(e) => {
                handleInputChanges(e);
              }}
              id="title"
              type="text"
              defaultValue={post.title}
              required
            />
          </div>
          <div>
            <label htmlFor="body">
              <b>Description : </b>
            </label>
            <textarea
              onChange={(e) => {
                handleInputChanges(e);
              }}
              defaultValue={post.body}
              id="body"
              cols="30"
              rows="10"
            ></textarea>
          </div>
        </form>
        <br />
        <Stack direction="row" spacing={6}>
          <Button
            color="success"
            variant="contained"
            sx={{ width: "6vw", height: "2vw", fontSize: "1vw" }}
            onClick={() => {
              if (formData.title.length && formData.body.length) {
                updatePost
                  ? updatePost(formData.id, formData)
                  : createPost(formData);
                setFormData((pre) => {
                  for (const key in pre) {
                    pre[key] = "";
                  }
                  return pre;
                });
                setOpen(false);
              } else {
                swal("Please fill all the credentials", " ", "error");
              }
            }}
          >
            Save
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
            }}
            color="error"
            variant="contained"
            sx={{ width: "6vw", height: "2vw", fontSize: "1vw" }}
          >
            Cancel
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
