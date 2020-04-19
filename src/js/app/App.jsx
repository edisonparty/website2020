import React, {PureComponent} from 'react';
import autoBind from 'react-autobind';
// import classNames from 'classnames';
import {connect} from 'react-redux';
import Footer from '~/js/app/components/sections/Footer';
import FourColumnLayout from '~/js/app/components/sections/fourColumnLayout';
import Header from '~/js/app/components/sections/Header';
import Hero from '~/js/app/components/sections/Hero';
import OneColumnLayout from '~/js/app/components/sections/OneColumnLayout';
import Participants from './components/sections/Participants';
import PropTypes from 'prop-types';
import ThreeColumnLayout from '~/js/app/components/sections/threeColumnLayout';
import Timetable from './components/sections/Timetable';
import TwoColumnLayout from '~/js/app/components/sections/twoColumnLayout';
import './App.scss';

const components = {
  four_column_layout: FourColumnLayout,
  hero: Hero,
  one_column_layout: OneColumnLayout,
  participation_list: Participants,
  three_column_layout: ThreeColumnLayout,
  timetable: Timetable,
  two_column_layout: TwoColumnLayout,
};

class App extends PureComponent {
  constructor (props) {
    super(props);
    autoBind(this);
    this.state = {
    };
  }

  componentDidMount () {
  }

  renderFlexibleContent (sections, options) {
    return sections.map((section, i) => {
      if (!section.acf_fc_layout) {
        console.warn('Warning: section missing acf_fc_layout field');
        return null;
      }

      // Note that this variable name (Component) MUST start with a capital
      // letter, or React will not understand what we're trying to do when
      // we try to render it using JSX further down (the return statement)
      const Component = components[section.acf_fc_layout];
      if (!Component) {
        console.warn(
            `Warning: section specified an undefined component "${
              section.acf_fc_layout
            }"`
        );
        return null;
      }

      const props = {
        ...section,
        options: this.props.options,
      };

      return (
        <Component {...props} key={i} />
      );
    });
  }

  render () {
    const {page, options} = this.props;

    return (
      <>
        <Header {...options} />
        <main>
          {this.renderFlexibleContent(page.sections, options) }
        </main>
        <Footer {...options} />
      </>
    );
  }
}

App.propTypes = {
  options: PropTypes.object,
  page: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  page: state.page,
  options: state.options,
});

const mapDispatchToProps = () => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
