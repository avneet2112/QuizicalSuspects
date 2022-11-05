import { Button } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import DisplayAnswer from "../../components/DisplayAnswer";

const SecureWindow = () => {
  const router = useRouter();
  const [currentTest, setCurrentTest] = useState("");
  const [displayAnswer, setDisplayAnswer] = useState(false);
  const [result, setResult] = useState({});
  async function getParticularTest(testId) {
    if (testId) {
      await axios
        .get(`/api/question?testId=${testId}`)
        .then((res) => {
          setCurrentTest(res.data.data);
        })
        .catch((err) => console.log(err));
    }
  }
  function disableBackButton() {
    history.pushState(null, null, location.href);
    window.onpopstate = function () {
      history.go(1);
      Swal.fire({
        icon: "error",
        title: "Warning",
        text: `You can't click on the back button. Please click on the Exit button to cancel the test`,
        showConfirmButton: true,
        confirmButtonColor: "red",
        confirmButtonText: "Exit",
        showCancelButton: true,
      })
        .then((res) => {
          if (res.isConfirmed) {
            localStorage.removeItem("userDetails");
            router.push("/");
          }
        })
        .catch((err) => console.log(err));
    };
  }
  useEffect(() => {
    if (!router.isReady) return;
    getParticularTest(router.query.id);
    disableBackButton();
  }, [router?.isReady]);
  useEffect(() => {
    !localStorage.getItem("userDetails") && router.push("/");
  }, []);
  return (
    <>
      <h3 className="testheading">
        {currentTest && <> Here Is Your {currentTest.subject} Test</>}
      </h3>
      <div className="pt-3">
        {displayAnswer ? (
          <>
            {" "}
            <div className="text-center">
              <h4>Score</h4>
              <div style={{ display: "inline-block" }}>
                <CircularProgressbar
                  value={result.percentage}
                  text={`${result.percentage}%`}
                  styles={buildStyles({
                    textColor: "red",
                    pathColor: "turquoise",
                    trailColor: "gold",
                  })}
                />
              </div>
              <h3 className="result">
                {result.writeAnswers}/{result.totalQuestions}
              </h3>
              <Button variant="contained" onClick={() => router.push("/")}>
                Go to Home Page
              </Button>
            </div>
          </>
        ) : (
          <>
            {currentTest &&
              currentTest.allQuestions &&
              currentTest.allQuestions?.length > 0 && (
                <DisplayAnswer
                  testD={currentTest}
                  user="student"
                  setDisplayAnswer={setDisplayAnswer}
                  setResult={setResult}
                />
              )}
          </>
        )}
      </div>
    </>
  );
};

export default SecureWindow;
