import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { useTheme } from "@mui/material/styles";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import moment from "moment";
import Icon from "@mui/material/Icon";
import Collapse from "@mui/material/Collapse";

import tableData from "../data/data";
import { COLORS } from "../utils/colors";

const ErrorTextTypography = withStyles({
  root: {
    color: COLORS.error,
  },
})(Typography);

const SuccessTextTypography = withStyles({
  root: {
    color: COLORS.blue,
  },
})(Typography);

const NormalTextTypography = withStyles({
  root: {
    color: COLORS.black,
  },
})(Typography);

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const ExpandableTableRow = ({
  children,
  expandComponent,
  data,
  ...otherProps
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  console.log("Jaye" + JSON.stringify(data));

  return (
    <React.Fragment>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
        {...otherProps}
        hover
        style={{ cursor: "pointer" }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {children}
      </TableRow>
      {isExpanded && (
        <TableRow>
          <TableCell style={{ paddingBottom: 10, paddingTop: 10 }} colSpan={6}>
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                {/* <Typography variant="h6" gutterBottom component="div">
                History
              </Typography> */}
                <Table size="small" aria-label="collapse">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">
                        <Typography sx={{ fontWeight: "bold", m: 1 }}>
                          Status
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography sx={{ fontWeight: "bold", m: 1 }}>
                          Queued
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography sx={{ fontWeight: "bold", m: 1 }}>
                          Started
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Typography sx={{ fontWeight: "bold", m: 1 }}>
                          Ended
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography sx={{ fontWeight: "bold", m: 1 }}>
                          Duration
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow key={data.id}>
                      <TableCell align="left">
                        {data.jobStatus && data.jobStatus === "Completed" ? (
                          <SuccessTextTypography>
                            {data.jobStatus}
                          </SuccessTextTypography>
                        ) : (
                          <ErrorTextTypography>
                            {data.jobStatus}
                          </ErrorTextTypography>
                        )}
                      </TableCell>
                      <TableCell align="left">{data.queuedTime}</TableCell>
                      <TableCell align="left">{data.startTime}</TableCell>
                      <TableCell align="left">{data.endTime}</TableCell>
                      <TableCell align="right">{data.duration}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </React.Fragment>
  );
};

export default function MuiTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={5}
              count={tableData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? tableData.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : tableData
          ).map((row) => (
            <>
              <ExpandableTableRow key={row.id} data={row}>
                <TableRow key={row.id}>
                  <TableCell style={{ width: 10 }} align="left">
                    {" "}
                    {row.jobStatus && row.jobStatus === "Completed" ? (
                      <Icon color="success">check_circle</Icon>
                    ) : (
                      <Icon color="error">error</Icon>
                    )}{" "}
                  </TableCell>
                  <TableCell style={{ width: 10 }} align="left">
                    {" "}
                    {row.jobStatus && row.jobStatus === "Completed" ? (
                      <Icon sx={{ color: blue[500] }}>folder</Icon>
                    ) : (
                      <Icon color="error">folder</Icon>
                    )}{" "}
                  </TableCell>
                  <TableCell style={{ width: 200 }} align="left">
                    {row.jobStatus && row.jobStatus === "Completed" ? (
                      <SuccessTextTypography>
                        {moment(row.queuedTime).format("/YYYY-MM-D hh:mm:ss")}
                      </SuccessTextTypography>
                    ) : (
                      <ErrorTextTypography>
                        {moment(row.queuedTime).format("/YYYY-MM-D hh:mm:ss")}
                      </ErrorTextTypography>
                    )}
                  </TableCell>
                  <TableCell style={{ width: 800 }} align="right">
                    {row.owner && row.jobStatus === "Completed" ? (
                      <SuccessTextTypography>
                        {" "}
                        {row.owner}
                      </SuccessTextTypography>
                    ) : (
                      <ErrorTextTypography> {row.owner}</ErrorTextTypography>
                    )}
                  </TableCell>
                  <TableCell style={{ width: 200 }} align="right">
                    {row.owner && row.jobStatus === "Completed" ? (
                      <SuccessTextTypography display="inline">
                        {row.jobStatus}
                        <NormalTextTypography display="inline">
                          {" on "}
                        </NormalTextTypography>
                        {moment(row.endTime).format("MMM D")}
                      </SuccessTextTypography>
                    ) : (
                      <ErrorTextTypography display="inline">
                        {row.jobStatus}
                        <NormalTextTypography display="inline">
                          {" on "}
                        </NormalTextTypography>
                        {moment(row.endTime).format("MMM D")}
                      </ErrorTextTypography>
                    )}
                  </TableCell>
                </TableRow>
              </ExpandableTableRow>
            </>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
