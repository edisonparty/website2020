import React, {PureComponent} from 'react';
import autoBind from 'react-autobind';
import classNames from 'classnames';
import Image from '~/js/app/components/common/Image';
import PropTypes from 'prop-types';
import './Footer.scss';

class Footer extends PureComponent {
  constructor (props) {
    super(props);
  }

  render () {
    console.log(this.props);

    return (
      <footer>
        <div className='section'>
          <div className='text'>
            <div className={classNames('wysiwyg-module')}
              dangerouslySetInnerHTML={{
                __html: this.props.footer_column_1}} />

            <div className={classNames('wysiwyg-module')}
              dangerouslySetInnerHTML={{
                __html: this.props.footer_column_2}} />

            <div className={classNames('wysiwyg-module')}
              dangerouslySetInnerHTML={{
                __html: this.props.footer_column_3}} />
          </div>
          <div className='logos'>
            {this.props.sponsors && this.props.sponsors.map((sponsor, i) => {
              return <a key={i} href={sponsor.sponsor_link}
                rel='noopener noreferrer' target='_blank'>
                <Image {...sponsor.sponsor_logo} />
              </a>;
            })}
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;

Footer.propTypes = {
  footer_column_1: PropTypes.string,
  footer_column_2: PropTypes.string,
  footer_column_3: PropTypes.string,
  sponsors: PropTypes.any,
};
