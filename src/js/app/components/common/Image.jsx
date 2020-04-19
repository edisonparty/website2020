import {config} from '~/js/Config';
import PropTypes from 'prop-types';
import React from 'react';
import './Image.scss';

const isProduction = process.env.NODE_ENV === 'production';

const Image = ({sizes, alt, url, className, src, title, srcSet}) => {
  if (url) {
    console.log(url);
    url = url.replace(config.api, config.staticCms);
  }
  if (src) {
    src = src.replace(config.api, config.staticCms);
  }
  if (sizes && typeof sizes === 'object') {
    sizes = Object.keys(sizes).reduce((acc, key) => {
      const val = sizes[key];
      acc[key] = typeof val === 'string'
        ? val.replace(config.api, config.staticCms)
        : val;
      return acc;
    }, {});
  }

  if (typeof sizes === 'string') {
    // This hints that this is an image that arrived here from a wysiwyg field
    // It requires some special treatment
    sizes = null;
    className = '';
  }

  if (!url) {
    url = src || '';
  }

  if (!srcSet) {
    srcSet = sizes && Object.keys(sizes).reduce((acc, key) => {
      const value = sizes[key];
      if (typeof value !== 'string') {
        return acc;
      }

      return `${acc}${
        acc.length > 0 ? ', ' : ''}${value} ${sizes[key + '-width']}w`;
    }, '');
  }

  const ending = url.substr(url.lastIndexOf('.') + 1);
  const sources = [];
  if (['jpg', 'jpeg'].indexOf(ending.toLowerCase()) !== -1) {
    if (isProduction && config.webp && srcSet) {
      sources.push(
          <source key='webp' srcSet={srcSet.replaceAll(ending, 'webp')}
            type='image/webp' />
      );
    }
  }
  const mime =
    `image/${ending.toLowerCase() === 'jpg' ? 'jpeg' : ending.toLowerCase()}`;
  sources.push(<source alt='Alt text' key='orig' srcSet={srcSet} type={mime} />);

  // if svg = no use for srcset
  if (ending.toLowerCase() === 'svg') {
    return (
      <picture className={className}>
        <img src={url} />
      </picture>
    );
  }

  return (
    <picture className={className}>
      {sources}
      <img srcSet={srcSet} src={url} />
    </picture>
  );
};

export default React.memo(Image);

Image.propTypes = {
  alt: PropTypes.any,
  className: PropTypes.any,
  sizes: PropTypes.any,
  src: PropTypes.any,
  srcSet: PropTypes.any,
  title: PropTypes.any,
  url: PropTypes.any,
};

Image.defaultProps = {
  className: '',
};
