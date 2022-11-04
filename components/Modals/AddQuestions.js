import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  InputAdornment,
  MenuItem,
  Slide,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import Loader from "../Loader";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddQuestion(props) {
  const { handleClose, handleSubmit } = props;
  const [loading, setLoading] = React.useState(false);
  const [questionData, setQuestionData] = useState({
    question: "",
    answerOptions: [],
    correctAnswer: "",
  });
  const [answer, setAnswer] = useState("");
  async function submit(event) {
    setLoading(true);
    await handleSubmit(event, questionData);
    setLoading(false);
  }
  return (
    <div>
      <Dialog
        open={true}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Add Question</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Box component="form" onSubmit={submit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="question"
                    value={questionData.question}
                    minRows={2}
                    multiline
                    required
                    fullWidth
                    id="question"
                    placeholder="Please enter a question"
                    autoFocus
                    onChange={(e) => {
                      setQuestionData((prev) => ({
                        ...prev,
                        question: e.target.value,
                      }));
                    }}
                  />
                </Grid>
                <Grid xs={12} className={"mt-3 mx-3"}>
                  {questionData?.answerOptions?.map((res, index) => (
                    <Chip
                      className="mx-1"
                      label={res}
                      color="warning"
                      key={index}
                    />
                  ))}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={answer}
                    fullWidth
                    name="answer"
                    id="answer"
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Enter an answer"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button
                            variant="contained"
                            color={"success"}
                            style={{ borderRadius: "30px" }}
                            disabled={!answer}
                            onClick={(e) => {
                              setQuestionData((prev) => ({
                                ...prev,
                                answerOptions: [...prev.answerOptions, answer],
                              }));
                              setAnswer("");
                            }}
                          >
                            <NoteAddIcon /> Add
                          </Button>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    style={{ marginTop: "16px" }}
                    required
                    fullWidth
                    value={questionData.correctAnswer}
                    select
                    label="Correct Answer"
                    onChange={(e) => {
                      setQuestionData((prev) => ({
                        ...prev,
                        correctAnswer: e.target.value,
                      }));
                    }}
                  >
                    {questionData.answerOptions?.length > 0 ? (
                      questionData.answerOptions?.map((option, index) => (
                        <MenuItem key={index} value={option}>
                          {option}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem>None</MenuItem>
                    )}
                  </TextField>
                </Grid>
              </Grid>

              {loading && (
                <div className="text-center">
                  <Loader />
                </div>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Add Question
              </Button>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
