import { Button, MenuItem, TextField } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import styles from '../../styles/studentPanel.module.css';
import Loader from '../Loader';
import Introduction from '../Introduction';
import { Steps } from 'intro.js-react';
const StudentPanel = () => {
  const [subjectChosen, setSubjectChosen] = useState('');
  const [allTests, setAllTests] = useState([]);
  const [allSubjects, setAllSubjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  function handleBegin() {
    Swal.fire({
      icon: 'warning',
      title: 'Begin Test',
      text: 'Are you sure you want to begin test?',
      showCancelButton: 'Cancel',
      showConfirmButton: 'Begin it!',
    })
      .then((res) => {
        setLoading(true);
        const test = allTests.filter((res) => res.subject === subjectChosen)[0];
        if (res.isConfirmed) {
          router.push(`/secureWindow/${test._id}`);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  }
  function getAllTest() {
    axios
      .get('/api/test')
      .then((res) => {
        const d = res.data.data;
        setAllTests(d);
        let testArr = [];
        if (d && d.length > 0) {
          d.map((res) => testArr.push(res.subject));
        }
        setAllSubjects(testArr);
      })
      .catch((err) => {
        console.log('err');
      });
  }

  useEffect(() => {
    getAllTest();
  }, []);
  return (
    <>
      {router.query.role == 'admin' && <Introduction />}
      <div className={styles.completeScreenSize}>
        <TextField
          className='subject'
          select
          label='Teacher Name'
          value={subjectChosen}
          onChange={(e) => setSubjectChosen(e.target.value)}
          helperText='Please select your subject'
        >
          {allSubjects ? (
            allSubjects.map((option, key) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))
          ) : (
            <MenuItem value=''>--Select--</MenuItem>
          )}
        </TextField>
        <br />
        {loading && (
          <div className=' w-100 text-center '>
            <Loader />
          </div>
        )}
        <Button
          disabled={!subjectChosen}
          color='info'
          className='w-100 begin'
          variant='contained'
          onClick={handleBegin}
        >
          Begin test
        </Button>
      </div>
    </>
  );
};

export default StudentPanel;
