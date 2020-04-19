import React, {PureComponent} from 'react';
import autoBind from 'react-autobind';
import classNames from 'classnames';
import Image from '~/js/app/components/common/Image';
import LayoutRenderer from '~/js/app/components/sections/LayoutRenderer';
import PropTypes from 'prop-types';
import './ImageModule.scss';

class ImageModule extends PureComponent {
  constructor (props) {
    super(props);
    autoBind(this);
  }

  componentDidMount () {
  }

  render () {
    console.log('image module');
    console.log(this.props);

    return (
      <div className='image-module'>
        {this.props.content && <Image {...this.props.content} />}
      </div>
    );
  }
}

export default ImageModule;

ImageModule.propTypes = {
  content: PropTypes.any,
};
