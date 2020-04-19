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
  }

  componentDidMount () {
  }

  render () {
    console.log('header');
    console.log(this.props);

    return (
      <header>
        <nav>
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
