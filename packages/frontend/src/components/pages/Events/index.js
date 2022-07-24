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
  HighlightOff as DeclineIcon,
  CheckCircleOutline as AcceptIcon,
} from '@material-ui/icons';

import { actions, selectors } from 'src/store';
import { formatDate } from 'src/utils';
import { Page, PageLoader } from 'src/components/common';

const Events = ({
  hasLoaded,
  getEvents,
  events,
  acceptEvent,
  declineEvent,
}) => {
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
                <TableCell>Slika</TableCell>
                <TableCell>Ime</TableCell>
                <TableCell>Opis</TableCell>
                <TableCell>Vrijeme</TableCell>
                <TableCell>Mjesto</TableCell>
                <TableCell>Kreirano</TableCell>
                <TableCell>Stvoritelj</TableCell>
                <TableCell />
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map((row) => (
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
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.desc}</TableCell>
                  <TableCell>{formatDate(row.event_time)}</TableCell>
                  <TableCell>{row.location_name}</TableCell>
                  <TableCell>{formatDate(row.created_at)}</TableCell>
                  <TableCell>{row.creator_id}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => acceptEvent({ id: row.id })}
                    >
                      <AcceptIcon /> &nbsp; Prihvati
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => declineEvent({ id: row.id })}
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
    </Page>
  );
};

Events.propTypes = {
  hasLoaded: PropTypes.bool.isRequired,
  getEvents: PropTypes.func.isRequired,
  events: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  acceptEvent: PropTypes.func.isRequired,
  declineEvent: PropTypes.func.isRequired,
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
