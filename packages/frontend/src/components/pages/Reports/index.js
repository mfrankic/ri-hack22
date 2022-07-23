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

const Reports = ({ hasLoaded, getReports, reports }) => {
  if (!hasLoaded) {
    getReports();
    return <PageLoader />;
  }

  return (
    <Page>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {Object.keys(reports[0]).map((key) => (
                <TableCell>{key}</TableCell>
              ))}
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.grid_id}</TableCell>
                <TableCell>{row.image_path}</TableCell>
                <TableCell>{row.created_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Page>
  );
};

Reports.propTypes = {
  hasLoaded: PropTypes.bool.isRequired,
  getReports: PropTypes.func.isRequired,
  reports: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = (state) => ({
  hasLoaded: selectors.reports.getHasLoaded(state),
  reports: selectors.reports.getReports(state),
});

const mapDispatchToProps = {
  ...actions.reports,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  memo
)(Reports);
