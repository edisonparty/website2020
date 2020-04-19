import React, {PureComponent} from 'react';
import autoBind from 'react-autobind';
import classNames from 'classnames';
import Image from '~/js/app/components/common/Image';
import ModuleRenderer from '~/js/app/components/sections/ModuleRenderer';
import PropTypes from 'prop-types';
import './ColumnLayouts.scss';

class LayoutRenderer extends PureComponent {
  constructor (props) {
    super(props);
    autoBind(this);
  }

  componentDidMount () {
  }

  render () {
    console.log('layout renderer');
    console.log(this.props);

    const columns = [];
    let className = '';

    switch (this.props.acf_fc_layout) {
      case 'one_column_layout':
        columns.push(this.props.column_1);
        className = 'col-1';
        break;
      case 'two_column_layout':
        console.log('i am two column layout');
        columns.push(this.props.column_1);
        columns.push(this.props.column_2);
        className = 'col-2';
        break;
      case 'three_column_layout':
        columns.push(this.props.column_1);
        columns.push(this.props.column_2);
        columns.push(this.props.column_3);
        className = 'col-3';
        break;
      case 'four_column_layout':
        columns.push(this.props.column_1);
        columns.push(this.props.column_2);
        columns.push(this.props.column_3);
        columns.push(this.props.column_4);
        className = 'col-4';
        break;
      default:
        console.log('Unknown column configuration');
        break;
    }

    console.log('my columns:');
    console.log(columns);

    return (
      <div className={classNames(className, 'column-container')}>
        {columns.map((column, i) => {
          return <div key={i} className='column'>
            {column.modules.map((module, j) => {
              return (
                <div key={j} className='module'>
                  <ModuleRenderer {...module} />
                </div>
              );
            })}
          </div>;
        })}
      </div>
    );
  }
}

export default LayoutRenderer;

LayoutRenderer.propTypes = {
  acf_fc_layout: PropTypes.string,
  column_1: PropTypes.any,
  column_2: PropTypes.any,
  column_3: PropTypes.any,
  column_4: PropTypes.any,
};
