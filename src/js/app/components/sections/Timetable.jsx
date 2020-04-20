import React, {PureComponent} from 'react';
import autoBind from 'react-autobind';
import classNames from 'classnames';
import Image from '~/js/app/components/common/Image';
import PropTypes from 'prop-types';
import TimetableDay from '~/js/app/components/sections/TimetableDay';
import './Timetable.scss';

class Timetable extends PureComponent {
  constructor (props) {
    super(props);
    autoBind(this);
  }

  componentDidMount () {
  }

  render () {
    console.log('timetable');
    console.log(this.props);

    const timetable = this.props.options.timetable_day;

    return (
      <div className='timetable section'>
        <div className='inner'>
          {timetable.map((day, key) => {
            return <TimetableDay key={key} data={day} />;
          })}
        </div>
      </div>
    );
  }
}

export default Timetable;

Timetable.propTypes = {
  options: PropTypes.any,
};
