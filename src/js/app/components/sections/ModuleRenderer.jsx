import React, {PureComponent} from 'react';
import autoBind from 'react-autobind';
import ButtonPanel from '~/js/app/components/sections/ButtonPanel';
import classNames from 'classnames';
import Image from '~/js/app/components/common/Image';
import ImageModule from '~/js/app/components/sections/ImageModule';
import PropTypes from 'prop-types';
import Video from '~/js/app/components/sections/Video';
import WysiwygModule from '~/js/app/components/sections/WysiwygModule';
import './ColumnLayouts.scss';

class ModuleRenderer extends PureComponent {
  constructor (props) {
    super(props);
    autoBind(this);
  }

  componentDidMount () {
  }

  render () {

    const layoutComponents = {
      image: ImageModule,
      wysiwyg_editor: WysiwygModule,
      button_panel: ButtonPanel,
      video: Video,
    };

    console.log('module renderer');
    console.log(this.props);

    const Component = layoutComponents[this.props.acf_fc_layout];

    return (
      <Component {...this.props} />
    );
  }
}

export default ModuleRenderer;

ModuleRenderer.propTypes = {
  acf_fc_layout: PropTypes.string,
  content: PropTypes.any,
};
