import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';

import {
  CheckCircleOutline as AcceptIcon,
  Delete as DeleteIcon,
  HighlightOff as DeclineIcon,
} from '@material-ui/icons';

import { actions, selectors } from 'src/store';
import { formatDate } from 'src/utils';
import { Page, PageLoader } from 'src/components/common';

import './index.css';

const Volunteers = ({
  acceptVolunteer,
  declineVolunteer,
  getVolunteerRequests,
  getVolunteers,
  hasLoaded,
  requests,
  volunteers,
}) => {
  if (!hasLoaded) {
    getVolunteers();
    getVolunteerRequests();
    return <PageLoader />;
  }

  return (
    <Page>
      <div className="table-container">
        <h2>ZAHTJEVI</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Ime</TableCell>
                <TableCell>E-mail</TableCell>
                <TableCell />
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {requests?.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => acceptVolunteer({ id: row.id })}
                    >
                      <AcceptIcon /> &nbsp; Prihvati
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => declineVolunteer({ id: row.id })}
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

      <div className="table-container">
        <h2>VOLONTERI</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Ime</TableCell>
                <TableCell>E-mail</TableCell>
                <TableCell>Bodovi</TableCell>
                <TableCell>Uloga</TableCell>
                <TableCell>Kreirano</TableCell>
                <TableCell>Izmijenjeno</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {volunteers?.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.points}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell>{formatDate(row.created_at)}</TableCell>
                  <TableCell>{formatDate(row.updated_at)}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => {}}
                    >
                      <DeleteIcon /> &nbsp; Izbriši
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Page>
  );
};

Volunteers.propTypes = {
  hasLoaded: PropTypes.bool.isRequired,
  getVolunteers: PropTypes.func.isRequired,
  getVolunteerRequests: PropTypes.func.isRequired,
  volunteers: PropTypes.arrayOf(PropTypes.shape({})),
  requests: PropTypes.arrayOf(PropTypes.shape({})),
  acceptVolunteer: PropTypes.func.isRequired,
  declineVolunteer: PropTypes.func.isRequired,
};

Volunteers.defaultProps = {
  volunteers: [],
  requests: [],
};

const mapStateToProps = (state) => ({
  hasLoaded: selectors.volunteers.getHasLoaded(state),
  volunteers: selectors.volunteers.getVolunteers(state),
  requests: selectors.volunteers.getVolunteerRequests(state),
});

const mapDispatchToProps = {
  ...actions.volunteers,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  memo
)(Volunteers);
