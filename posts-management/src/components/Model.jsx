import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function PopupModal({ open, setOpen, post }) {
  return (
    <Modal open={open}>
      <Box sx={{ ...style, width: 300, height: 300 }}>
        <form>
          <span>
            <label htmlFor="title">Title : </label>
            <input id="title" type="text" value={post.title} required />
          </span>
          <span>
            <label htmlFor="boy">Description</label>
            <textarea
              value={post.body}
              id="body"
              cols="30"
              rows="10"
            ></textarea>
          </span>
        </form>
        <Stack direction="row" spacing={6}>
          <Button
            color="success"
            variant="contained"
            sx={{ width: "6vw", height: "2vw", fontSize: "1vw" }}
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
