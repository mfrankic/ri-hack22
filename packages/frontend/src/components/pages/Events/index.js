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

const Events = ({ hasLoaded, getEvents, events }) => {
  if (!hasLoaded) {
    getEvents();
    return <PageLoader />;
  }

  return (
    <Page>
      <div className="table-container">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Ime</TableCell>
                <TableCell>Vrijeme</TableCell>
                <TableCell>Mjesto</TableCell>
                <TableCell>Kreirano</TableCell>
                <TableCell>Stvoritelj</TableCell>
                <TableCell>Objavljeno</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.event_time}</TableCell>
                  <TableCell>{row.location_name}</TableCell>
                  <TableCell>{row.created_at}</TableCell>
                  <TableCell>{row.creator_id}</TableCell>
                  <TableCell>{row.published}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Page>
  );
};

Events.propTypes = {
  hasLoaded: PropTypes.bool.isRequired,
  getEvents: PropTypes.func.isRequired,
  events: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = (state) => ({
  hasLoaded: selectors.events.getHasLoaded(state),
  events: selectors.events.getEvents(state),
});

const mapDispatchToProps = {
  ...actions.events,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  memo
)(Events);
