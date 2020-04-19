import React, {PureComponent} from 'react';
import autoBind from 'react-autobind';
import classNames from 'classnames';
import Image from '~/js/app/components/common/Image';
import PropTypes from 'prop-types';
import './Timetable.scss';

class TimetableDay extends PureComponent {
  constructor (props) {
    super(props);
    autoBind(this);
  }

  componentDidMount () {
  }

  render () {
    console.log('timetable day');
    console.log(this.props);

    const data = this.props.data;

    return (
      <div className='day'>
        <div className='title'>
          {data.timetable_day_title}
        </div>
        {data.timetable_day_entry.map((row, rowKey) => {
          return <div key={rowKey} className='entry-row'>
            <div className='time'>{row.time}</div>
            <div className='text'>{row.text}</div>
          </div>;
        })}
      </div>
    );
  }
}

export default TimetableDay;

TimetableDay.propTypes = {
  data: PropTypes.any,
};
