import React, {PureComponent} from 'react';
import autoBind from 'react-autobind';
import classNames from 'classnames';
import Image from '~/js/app/components/common/Image';
import PropTypes from 'prop-types';
import './Hero.scss';

class Hero extends PureComponent {
  constructor (props) {
    super(props);
    autoBind(this);
  }

  componentDidMount () {
  }

  render () {
    console.log('hero');
    console.log(this.props);

    return (
      <div className='hero'>
        <div className='background'>
          <Image {...this.props.image} />
        </div>
        <div className='logo'>
          <Image {...this.props.logo} />
        </div>
      </div>
    );
  }
}

export default Hero;

Hero.propTypes = {
  image: PropTypes.any,
  logo: PropTypes.any,
};
