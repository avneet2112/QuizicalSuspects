import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import AddTest from "../Modals/AddTest";
import axios from "axios";
import { toast } from "react-toastify";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
const columns = [
  { id: "testName", label: "TestName", minWidth: 170 },
  { id: "subject", label: "Subject", minWidth: 100 },
  { id: "action", label: "Action", minWidth: 100 },
];
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const AdminPanel = () => {
  const [addTest, setAddTest] = useState(false);
  const [allTests, setAllTests] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleClose = () => {
    setAddTest(false);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const dataToSend = {
      testName: data.get("testName"),
      subject: data.get("subject"),
    };
    await axios
      .post("/api/test", { data: dataToSend })
      .then((res) => {
        toast(res.data.message);
        res.status == 200 && handleClose();
      })
      .catch((err) => {
        console.log("err");
      });
  };
  function getAllTest() {
    axios
      .get("/api/test")
      .then((res) => {
        setAllTests(res.data.data);
        toast(res.data.message);
      })
      .catch((err) => {
        console.log("err");
      });
  }

  useEffect(() => {
    getAllTest();
  }, []);
  return (
    <>
      {addTest && (
        <AddTest handleClose={handleClose} handleSubmit={handleSubmit} />
      )}
      <div className="text-center" style={{ marginTop: "10%" }}>
        <Button
          color="warning"
          variant="contained"
          onClick={() => setAddTest(true)}
        >
          <AddIcon /> Add New Test
        </Button>
        <>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth, fontWeight: "bold" }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {allTests
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((test) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={test.code}
                      >
                        {columns.map((column) => {
                          const value = test[column.id];
                          console.log(value);
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="p"
            count={allTests.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      </div>
    </>
  );
};

export default AdminPanel;