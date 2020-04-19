import React, {PureComponent} from 'react';
import autoBind from 'react-autobind';
import classNames from 'classnames';
import Image from '~/js/app/components/common/Image';
import PropTypes from 'prop-types';
import './Participants.scss';

class Participants extends PureComponent {
  constructor (props) {
    super(props);
    autoBind(this);
    this.state = {
      loading: false,
      data: null,
      numVisitors: 140,
      error: false,
      serverError: false,
      success: false,
      busy: false,
    };
    this.handleRef = React.createRef();
    this.groupRef = React.createRef();
    this.countryRef = React.createRef();
    this.emailRef = React.createRef();
  }

  componentDidMount () {
    this.fetchPosts();
  }

  validateEmail (email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  }

  signup (event) {
    if (this.state.busy) {
      return;
    }

    event.preventDefault();
    console.log('signup!');

    const handle = this.handleRef.current.value;
    const email = this.emailRef.current.value;
    const country = this.countryRef.current.value;
    const group = this.groupRef.current.value;

    console.log(handle, email, country, group);

    if (!this.validateEmail(email)) {
      this.setState({error: true});
      return;
    }

    if (handle === '' || country === '' || group === '') {
      this.setState({error: true});
      return;
    }

    this.setState({busy: true});
    const apiUrl = window.ajaxUrl + '?action=signup&handle=' + handle + '&email=' + email + '&country=' + country + '&group=' + group;

    fetch(apiUrl)
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          if (result.error === 1) {
            this.setState({serverError: true, busy: false});
            return;
          }

          this.setState({success: true});
          this.fetchPosts();
        });
  }

  fetchPosts () {
    const apiUrl = window.ajaxUrl + '?action=participants';

    this.setState({loading: true});

    fetch(apiUrl)
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          this.setState(
              {
                data: result.participants,
                loading: false,
              }
          );
          console.log('fetched posts');
          console.log(result.participants);
        });
  }

  clearErrors () {
    this.setState({error: false, serverError: false});
  }

  render () {
    console.log(this.props);

    return (
      <div className={classNames('section participants',
        this.state.loading ? 'loading' : '')}>
        <div className='participants-list'>
          <div className='wysiwyg-module'>
            <h2>VISITORS</h2>
            {this.state.data &&
              <p>Currently there are {this.state.data.length} visitors registered.</p>}
          </div>
          <div className='list'>
            <div className='list-row'>
              <span>#</span><span>Handle/group</span><span>Enclave</span>
            </div>
            {this.state.data && this.state.data.map((item, key) => {
              let handleGroupStr;
              if (item.group !== '') {
                handleGroupStr = item.handle + ' / ' + item.group;
              } else {
                handleGroupStr = item.handle;
              }
              return <div key={key} className='list-row'>
                <span>{key + 1}</span><span>{handleGroupStr}
                </span><span>{item.country}</span>
              </div>;
            })}
          </div>
        </div>
        <div className='registration-info'>
          <div className={classNames('wysiwyg-module')}
            dangerouslySetInnerHTML={{
              __html: this.props.text}} />
          {this.props.allow_registration &&
            <div className='registration-form'>
              <span>Handle</span>
              <input onFocus={this.clearErrors} ref={this.handleRef} placeholder='Handle' type='text' />
              <span>Group</span>
              <input onFocus={this.clearErrors} ref={this.groupRef} placeholder='Group' type='text' />
              <span>Email</span>
              <input onFocus={this.clearErrors} ref={this.emailRef} placeholder='Email' type='text' />
              <span>Country</span>
              <input onFocus={this.clearErrors} ref={this.countryRef} placeholder='Country' type='text' />
              <a href='#' onClick={this.signup}>Register!</a>
              {this.state.error &&
                <div className='error-message'>
                  {this.props.invalid_forms_message}
                </div>
              }
              {this.state.serverError &&
                <div className='error-message'>
                  {this.props.email_in_use_message}
                </div>
              }
              {this.state.success &&
                <div className='success-message'>
                  {this.props.signup_success_message}
                </div>
              }
            </div>
          }
        </div>
      </div>
    );
  }
}

export default Participants;

Participants.propTypes = {
  allow_registration: PropTypes.bool,
  email_in_use_message: PropTypes.string,
  invalid_forms_message: PropTypes.string,
  signup_success_message: PropTypes.string,
  text: PropTypes.string,
};
