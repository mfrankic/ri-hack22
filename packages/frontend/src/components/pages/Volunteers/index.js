import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';

import { actions, selectors } from 'src/store';
import { Page, PageLoader } from 'src/components/common';

const Volunteers = ({ hasLoaded, getVolunteers, volunteers }) => {
  if (!hasLoaded) {
    getVolunteers();
    return <PageLoader />;
  }

  return (
    <Page>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {Object.keys(volunteers[0]).map((key) => (
                <TableCell>{key}</TableCell>
              ))}
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {volunteers.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.points}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>{row.created_at}</TableCell>
                <TableCell>{row.updated_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Page>
  );
};

Volunteers.propTypes = {
  hasLoaded: PropTypes.bool.isRequired,
  getVolunteers: PropTypes.func.isRequired,
  volunteers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = (state) => ({
  hasLoaded: selectors.volunteers.getHasLoaded(state),
  volunteers: selectors.volunteers.getVolunteers(state),
});

const mapDispatchToProps = {
  ...actions.volunteers,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  memo
)(Volunteers);
