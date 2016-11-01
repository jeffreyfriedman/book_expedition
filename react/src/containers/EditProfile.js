import React, { Component } from 'react';

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirmation: '',
      current_password: '',
      errors: '',
      updated: false
    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleEditSubmit = this.handleEditSubmit.bind(this)
  }

  handleFieldChange(e) {
    let shift = {};
    shift[e.target.name] = e.target.value;
    this.setState(shift);
  }

  handleEditSubmit(e) {
    e.preventDefault();
    this.setState({ updated: true })

    // Retrieve the current CSRF-TOKEN
    let csrfToken = $("meta[name='csrf-token']").attr('content');

    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
      jqXHR.setRequestHeader('X-CSRF-Token', csrfToken);
    });

    $.ajax({
      url: "/users",
      type: "PUT",
      data: { user: {
                username: this.state.username,
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                password: this.state.password,
                password_confirmation: this.state.password_confirmation,
                current_password: this.state.current_password
              }
            }
          })
      .done(data => {
        window.location.href = "/";
      })
      .fail(data => {
        let errors = [];
        let response = JSON.parse(data.responseText).errors;
        for (let [key, value] of Object.entries(response)) {
          errors.push(key + ": " + value + "; ");
        }
        this.setState({ errors: errors })
        this.setState({ updated: false })
        $(window).scrollTop(0);
      })
    }

  getUserInfo() {
    $.ajax({
      url: '/api/v1/users',
      contentType: 'application/json'
    })
    .done(data => {
      this.setState({
        username: data.user_info.username,
        first_name: data.user_info.first_name,
        last_name: data.user_info.last_name,
        email: data.user_info.email
      });
    });
  }

  componentDidMount() {
    this.getUserInfo();
  }

  render() {

    let errors;
    if(this.state.errors) {
      errors = <div>{this.state.errors}</div>
    } else {
      errors = <div></div>
    }
    return(
        <div className="container center-align">
          <h2>Edit User</h2>

            <div className="row">
              <div className="columns-12 flash-bar text-center">
                {errors}
              </div>
            </div>

          <form className="edit_user" onSubmit={this.handleEditSubmit}>

            <div className="field">
                <p><label htmlFor="user_first_name">First Name</label><br />
                <input type="text" value={this.state.first_name} name="first_name" onChange={this.handleFieldChange} /></p>

                <p><label htmlFor="user_last_name">Last Name</label><br />
                <input type="text" value={this.state.last_name} name="last_name" onChange={this.handleFieldChange} /></p>

                <label htmlFor="user_email">Email</label><br />
                <input type="email" value={this.state.email} name="email" onChange={this.handleFieldChange} />

                <p><label htmlFor="user_username">Username</label><br />
                <input type="text" value={this.state.username} name="username" onChange={this.handleFieldChange} /></p>
              </div>

            <div className="field">
              <label htmlFor="user_password">Enter Password</label> <i>(leave blank if you don't want to change it)</i><br />
              <input autoComplete="off" type="password" name="password" onChange={this.handleFieldChange} />
                <br />
                <em>6 characters minimum</em>
            </div>

            <div className="field">
              <label htmlFor="user_password_confirmation">Confirm Password</label><br />
              <input autoComplete="off" type="password" name="password_confirmation" onChange={this.handleFieldChange} />
            </div>

            <div className="field">
              <label htmlFor="user_current_password">Current Password</label>
                <i>(we need your current password to confirm your changes)</i><br />
              <input autoComplete="off" type="password" name="current_password" onChange={this.handleFieldChange} />
            </div>

            <div>
              <input type="submit" name="commit" value="Update" className="btn" disabled={this.state.updated} />
            </div>
          </form>
          <h3>Cancel my account</h3>

          <p>Unhappy?</p>
            <form className="button_to" method="post" action="/users">
              <input type="hidden" name="_method" value="delete" />
              <input data-confirm="Are you sure?" className="btn" type="submit" value="Cancel my account" />
              <input type="hidden" name="authenticity_token" value="QbN5wV+MXiwbjH84843fUUsabwygjHzeZ4skKncuYZf2Lj56h2xTDt//YQKmj7eyk+HC9vRDOHAtA4qj5RM6eA==" />
            </form>

      </div>
    )
  }
}
