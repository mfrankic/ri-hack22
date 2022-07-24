import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { actions, selectors } from 'src/store';
import { Page, PageLoader, Table } from 'src/components/common';

const Reports = ({
  reports,
  hasLoaded,
  getReports,
  declineReport,
  acceptReport,
}) => {
  const formatDate = useCallback((date) => {
    const newDate = new Date(date).toLocaleString('hr-HR');
    return newDate;
  }, []);

  if (!hasLoaded) {
    getReports();
    return <PageLoader />;
  }

  return (
    <Page>
      <Table
        reports={reports}
        formatDate={formatDate}
        acceptReport={acceptReport}
        declineReport={declineReport}
      />
    </Page>
  );
};

Reports.propTypes = {
  hasLoaded: PropTypes.bool.isRequired,
  getReports: PropTypes.func.isRequired,
  reports: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  acceptReport: PropTypes.func.isRequired,
  declineReport: PropTypes.func.isRequired,
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
