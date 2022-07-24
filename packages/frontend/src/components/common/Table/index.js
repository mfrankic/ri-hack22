import React, { memo } from 'react';
import PropTypes from 'prop-types';

import {
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Paper,
  Button,
} from '@material-ui/core';

import {
  HighlightOff as DeclineIcon,
  CheckCircleOutline as AcceptIcon,
} from '@material-ui/icons';

const TableComponent = ({
  reports,
  formatDate,
  acceptReport,
  declineReport,
}) => {
  return (
    <>
      {reports.length > 0 ? (
        <div className="table-container">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Slika</TableCell>
                  <TableCell>Vrsta problema</TableCell>
                  <TableCell>ID grida</TableCell>
                  <TableCell>Datum i vrijeme</TableCell>
                  <TableCell />
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {reports?.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <a
                        href={row.image_path}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img height="150px" src={row.image_path} alt="Slika" />
                      </a>
                    </TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>{row.grid_id}</TableCell>
                    <TableCell>{formatDate(row.created_at)}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => acceptReport({ id: row.id })}
                      >
                        <AcceptIcon /> &nbsp; Prihvati
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => declineReport({ id: row.id })}
                      >
                        <DeclineIcon /> &nbsp; Odbij
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <div>Nema prijavljenih problema.</div>
      )}
    </>
  );
};

TableComponent.propTypes = {
  reports: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  acceptReport: PropTypes.func.isRequired,
  declineReport: PropTypes.func.isRequired,
  formatDate: PropTypes.func.isRequired,
};

export default memo(TableComponent);
