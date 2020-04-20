import React, {PureComponent} from 'react';
import autoBind from 'react-autobind';
import classNames from 'classnames';
import Image from '~/js/app/components/common/Image';
import LayoutRenderer from '~/js/app/components/sections/LayoutRenderer';
import PropTypes from 'prop-types';
import './Video.scss';

class Video extends PureComponent {
  constructor (props) {
    super(props);
    autoBind(this);
  }

  componentDidMount () {
  }

  render () {
    console.log('video module');
    console.log(this.props);

    return (
      <div className='video-module'>
        <figure>
          <div className='video-aspect-container'>
            <iframe src={'https://www.youtube.com/embed/' + this.props.youtube_video_id} frameBorder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowFullscreen={true} />
          </div>
          <figcaption>{this.props.video_byline}</figcaption>
        </figure>
      </div>
    );
  }
}

export default Video;

Video.propTypes = {
  video_byline: PropTypes.string,
  video_type: PropTypes.string,
  youtube_video_id: PropTypes.string,
};
