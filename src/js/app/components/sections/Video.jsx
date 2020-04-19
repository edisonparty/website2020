import React, {PureComponent} from 'react';
import autoBind from 'react-autobind';
import {cdnize} from '~/js/utils/cdnize';
import Image from '~/js/app/components/common/Image';
import PropTypes from 'prop-types';
import {sectionWrapper} from '~/js/app/components/common/Section';
import './Video.scss';

class Video extends PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      playing: false,
    };
    autoBind(this);
    this.ref = React.createRef();
  }

  togglePlay () {
    const videoElement = this.ref.current.querySelector('video');

    if (this.state.playing) {
      this.setState({playing: false});
      videoElement.pause();
    } else {
      this.setState({playing: true});
      videoElement.play();
    }
  }

  render () {
    const svgPlay = '/wp-content/themes/akademi/img/play-icon.svg';
    const {videoUrl, poster, needsWrapper, classNames,
      header, content} = this.props;
    const videoPosterUrl = cdnize(poster || '');

    const player =
      <div className={'video-player ' + classNames} ref={this.ref}
        onClick={this.togglePlay}>
        <video poster={videoPosterUrl}>
          <source src={videoUrl} type='video/mp4' />
        </video>
        {!this.state.playing && <div className='play-button'>
          <Image url={svgPlay} />
        </div>
        }
      </div>;

    return needsWrapper
      ? <div className='content'>
        <div className={'video-player-top ' + (header === '' ? 'hidden' : '') }>
          <h2 className='content-header'>{header}</h2>
          <div className='content-text'
            dangerouslySetInnerHTML={{__html: content}} />
        </div>
        {player}
      </div>
      : player;
  }
}

export default sectionWrapper(Video);
export const GalleryVideo = Video;

Video.propTypes = {
  classNames: PropTypes.string,
  content: PropTypes.string,
  header: PropTypes.string,
  needsWrapper: PropTypes.bool,
  poster: PropTypes.any,
  videoUrl: PropTypes.string,
};

Video.defaultProps = {
  classNames: '',
  needsWrapper: true,
  header: '',
  content: '',
};
