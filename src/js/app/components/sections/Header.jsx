import React, {PureComponent} from 'react';
import autoBind from 'react-autobind';
import classNames from 'classnames';
import Image from '~/js/app/components/common/Image';
import PropTypes from 'prop-types';
import './Header.scss';

class Header extends PureComponent {
  constructor (props) {
    super(props);
    autoBind(this);
    this.state = {
      burgerOpen: false,
    };
  }

  componentDidMount () {
  }

  openBurger (event) {
    event.preventDefault();
    this.setState({burgerOpen: !this.state.burgerOpen});
  }

  render () {
    console.log('header');
    console.log(this.props);

    return (
      <header>
        <div className={classNames('mobile-nav', this.state.burgerOpen ? 'open' : '')}>
          {this.props.site_navigation &&
          this.props.site_navigation.map((item, i) => {
            return <a key={i} href={item.link}>{item.label}</a>;
          })}
        </div>
        <nav>
          <a href='#' className='burger' onClick={this.openBurger}>☰</a>
          {this.props.site_navigation &&
          this.props.site_navigation.map((item, i) => {
            return <a key={i} href={item.link}>{item.label}</a>;
          })}
        </nav>
      </header>
    );
  }
}

export default Header;

Header.propTypes = {
  site_navigation: PropTypes.any,
};
