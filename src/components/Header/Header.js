/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { connect } from 'react-redux';
import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Navbar,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';
import {NavLink} from 'react-router-dom';

import Icon from '../Icon';

import photo from '../../images/photo.jpg';
import { logoutUser } from '../../actions/user';
import s from './Header.scss';

class Header extends React.Component {
  static propTypes = {
    sidebarToggle: PropTypes.func,
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    sidebarToggle: () => {},
  };

  state = { isOpen: false };
  
  toggleDropdown = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  }

  doLogout = () => {
    this.props.dispatch(logoutUser());
  }

  render() {
    const {isOpen} = this.state;
    return (
      <Navbar className={s.root}>
        <Nav>
          <NavItem
            className={cx('visible-xs', s.headerIcon)}
            href="#"
            onClick={this.props.sidebarToggle}
          >
            <i className="fa fa-bars fa-2x text-muted" />
          </NavItem>
          <NavItem>
            <InputGroup>
              <Input placeholder="Search for..." />
              <InputGroupAddon addonType="append" className="px-2">
                <i className="fa fa-search text-muted" />
              </InputGroupAddon>
            </InputGroup>
          </NavItem>
        </Nav>
        <Nav className="ml-auto">
          <Dropdown isOpen={isOpen} toggle={this.toggleDropdown}>
            <DropdownToggle nav>
              <img className={cx('rounded-circle mr-sm', s.adminPhoto)} src={photo} alt="administrator" />
              <span className="text-body">Administrator</span>
              <i className={cx('fa fa-angle-down ml-sm', s.arrow, {[s.arrowActive]: isOpen})} />
            </DropdownToggle>
            <DropdownMenu style={{width: '100%'}}>
              <DropdownItem>
                <NavLink to="/app/posts">Posts</NavLink>
              </DropdownItem>
              <DropdownItem>
                <NavLink to="/app/profile">Profile</NavLink>
              </DropdownItem>
              <DropdownItem onClick={this.doLogout}>
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <NavItem className={cx('', s.headerIcon)}>
            <Icon glyph="mail"/>
            <span>8</span>
          </NavItem>
          <NavItem className={cx('', s.headerIcon)}>
            <Icon glyph="notification"/>
            <span>13</span>
          </NavItem>
          <NavItem className={cx('', s.headerIcon)}>
            <Icon glyph="settings"/>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

function mapStateToProps(state) {
  return {
    init: state.runtime.initialNow,
  };
}
export default connect(mapStateToProps)(withStyles(s)(Header));