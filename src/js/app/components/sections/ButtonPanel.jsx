import React, {PureComponent} from 'react';
import autoBind from 'react-autobind';
import classNames from 'classnames';
import Image from '~/js/app/components/common/Image';
import LayoutRenderer from '~/js/app/components/sections/LayoutRenderer';
import PropTypes from 'prop-types';
import './ButtonPanel.scss';

class ButtonPanel extends PureComponent {
  constructor (props) {
    super(props);
    autoBind(this);
  }

  componentDidMount () {
  }

  render () {
    console.log('button panel');
    console.log(this.props);

    return (
      <div className='button-panel'>
        {this.props.buttons.length && this.props.buttons.map((button, key) => {
          if (button.link_type === 'internal') {
            return <a key={key} href={button.link_target}>
              <button>
                {button.button_label}
              </button>
            </a>;
          }
          return <a key={key} rel='noopener noreferrer' target='_blank' href={button.link_url}>
            <button>
              {button.button_label}
            </button>
          </a>;
        })}
      </div>
    );
  }
}

export default ButtonPanel;

ButtonPanel.propTypes = {
  buttons: PropTypes.any,
};
