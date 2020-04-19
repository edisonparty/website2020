import React, {PureComponent} from 'react';
import autoBind from 'react-autobind';
import classNames from 'classnames';
import Image from '~/js/app/components/common/Image';
import LayoutRenderer from '~/js/app/components/sections/LayoutRenderer';
import PropTypes from 'prop-types';
import './WysiwygModule.scss';

class WysiwygModule extends PureComponent {
  constructor (props) {
    super(props);
    autoBind(this);
  }

  componentDidMount () {
  }

  render () {
    console.log('wysiwyg module');
    console.log(this.props);

    return (
      <React.Fragment>
        {
          this.props.content &&
          <div className={classNames('wysiwyg-module', this.props.text_size)}
            dangerouslySetInnerHTML={{
              __html: this.props.content}} />
        }
      </React.Fragment>
    );
  }
}

export default WysiwygModule;

WysiwygModule.propTypes = {
  content: PropTypes.string,
  text_size: PropTypes.any,
};
