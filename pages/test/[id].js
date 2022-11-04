import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddQuestion from "../../components/Modals/AddQuestions";
import axios from "axios";
import { toast } from "react-toastify";
import DisplayAnswer from "../../components/DisplayAnswer";
import { useRouter } from "next/router";
const TestId = () => {
  const [questionModal, setQuestionModal] = useState(false);
  const [testD, setTestD] = useState([]);
  const router = useRouter();
  function handleClose() {
    setQuestionModal(false);
  }
  async function handleSubmit(event, qd) {
    event.preventDefault();
    await axios
      .post("/api/question", { questionId: router.query.id, data: qd })
      .then(async (res) => {
        await getParticularTest(router.query.id);
        toast(res.data.message);
        handleClose();
      })
      .catch((err) => console.log(err));
  }
  async function getParticularTest(testId) {
    if (testId) {
      await axios
        .get(`/api/question?testId=${testId}`)
        .then((res) => {
          setTestD([res.data.data]);
          toast(res.data.message);
          handleClose();
        })
        .catch((err) => console.log(err));
    }
  }
  useEffect(() => {
    if (!router.isReady) return;
    getParticularTest(router.query.id);
  }, [router?.isReady]);
  return (
    <>
      {questionModal && (
        <AddQuestion handleClose={handleClose} handleSubmit={handleSubmit} />
      )}
      <Header />
      <div className="container">
        <div className="text-center">
          <h1 style={{ marginTop: "12%" }}>
            {" "}
            {testD?.[0]?.testName ? testD?.[0]?.testName : ""}{" "}
          </h1>
          <subtitle>
            {" "}
            {testD?.[0]?.subject ? testD?.[0]?.subject : ""}{" "}
          </subtitle>
        </div>

        <div className="text-right" style={{ marginTop: "2%" }}>
          <Button
            variant={"contained"}
            color={"primary"}
            onClick={() => {
              setQuestionModal(true);
            }}
            className="mx-1"
          >
            <PostAddIcon />
            Add Question
          </Button>
          <Button
            variant={"contained"}
            color={"error"}
            onClick={() => {
              router.back();
            }}
          >
            {" "}
            <ArrowBackIcon />
            Back
          </Button>
        </div>
        {testD.length > 0 &&
        testD[0]?.allQuestions &&
        testD[0]?.allQuestions?.length > 0 ? (
          <DisplayAnswer testD={testD[0]} user="admin" />
        ) : (
          <div className="text-center mt-3 text-danger">
            --- No Question Added Yet ---
          </div>
        )}
      </div>
    </>
  );
};

export default TestId;
