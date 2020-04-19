import React, {PureComponent} from 'react';
import autoBind from 'react-autobind';
import classNames from 'classnames';
import Image from '~/js/app/components/common/Image';
import LayoutRenderer from '~/js/app/components/sections/LayoutRenderer';
import PropTypes from 'prop-types';
import './ColumnLayouts.scss';

class FourColumnLayout extends PureComponent {
  constructor (props) {
    super(props);
    autoBind(this);
  }

  componentDidMount () {
  }

  render () {

    console.log('four col layout');
    console.log(this.props);

    return (
      <div className='section'>
        <LayoutRenderer {...this.props} />
      </div>
    );
  }
}

export default FourColumnLayout;

FourColumnLayout.propTypes = {
};
