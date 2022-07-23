// react mui drawer component using @mui/material
import React, { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import { actions } from 'src/store';

import {
  Box,
  Drawer,
  Button,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

import {
  AccessTime as ClockIcon,
  Delete as DeleteIcon,
  DynamicFeed as FeedIcon,
  ExitToApp as LogoutIcon,
  StarBorder as StarIcon,
  WarningOutlined as WarningIcon,
  Menu as MenuIcon,
} from '@material-ui/icons';

import { paths } from 'src/constants';

import './index.css';

const DrawerComponent = ({ clearUser }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  const logout = useCallback(() => {
    localStorage.clear();
    dispatch(clearUser());
    history.push(paths.LOGIN);
  }, [clearUser, dispatch, history]);

  const list = useCallback(
    () => (
      <Box
        className="drawer-container"
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List className="drawer-list">
          <div>
            <ListItem className="list-item" key="route-management">
              <Link
                to={paths.ROUTE_MANAGEMENT}
                style={{ textDecoration: 'none', width: '100%' }}
              >
                <Button style={{ width: '100%' }}>
                  <ListItemIcon>
                    <FeedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Route Management" />
                </Button>
              </Link>
            </ListItem>

            <Divider />

            <ListItem className="list-item" key="reports" disablePadding>
              <Link
                to={paths.REPORTS}
                style={{ textDecoration: 'none', width: '100%' }}
              >
                <Button style={{ width: '100%' }}>
                  <ListItemIcon>
                    <WarningIcon />
                  </ListItemIcon>
                  <ListItemText primary="Reports" />
                </Button>
              </Link>
            </ListItem>

            <Divider />

            <ListItem className="list-item" key="events" disablePadding>
              <Link
                to={paths.EVENTS}
                style={{ textDecoration: 'none', width: '100%' }}
              >
                <Button style={{ width: '100%' }}>
                  <ListItemIcon>
                    <DeleteIcon />
                  </ListItemIcon>
                  <ListItemText primary="Events" />
                </Button>
              </Link>
            </ListItem>

            <Divider />

            <ListItem className="list-item" key="volunteers" disablePadding>
              <Link
                to={paths.VOLUNTEERS}
                style={{ textDecoration: 'none', width: '100%' }}
              >
                <Button style={{ width: '100%' }}>
                  <ListItemIcon>
                    <StarIcon />
                  </ListItemIcon>
                  <ListItemText primary="Volunteers" />
                </Button>
              </Link>
            </ListItem>

            <Divider />

            <ListItem className="list-item" key="benefits" disablePadding>
              <Link
                to={paths.BENEFITS}
                style={{ textDecoration: 'none', width: '100%' }}
              >
                <Button style={{ width: '100%' }}>
                  <ListItemIcon>
                    <ClockIcon />
                  </ListItemIcon>
                  <ListItemText primary="Benefits" />
                </Button>
              </Link>
            </ListItem>
          </div>

          <ListItem
            className="list-item"
            key="logout"
            disablePadding
            style={{ selfAlign: 'bottom' }}
          >
            <Button onClick={logout} style={{ width: '100%' }}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </Button>
          </ListItem>
        </List>
      </Box>
    ),
    [logout]
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
        <MenuIcon />
      </Button>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
};

DrawerComponent.propTypes = {
  clearUser: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  ...actions.authentication,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  memo
)(DrawerComponent);
