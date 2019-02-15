import React from "react";

class Sigin extends React.Component {
  constructor() {
    super();
    this.state = {
      signInLogin: "",
      signInPassword: "",
      errorMessage: "",
      hasError: false
    };
  }

  onEmailChange = event => {
    this.setState({ signInLogin: event.target.value });
  };

  onPasswordChange = event => {
    this.setState({ signInPassword: event.target.value });
  };

  onClickEvent = () => {
    fetch("http://localhost:3000/signin", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        email: this.state.signInLogin,
        password: this.state.signInPassword
      })
    })
      .then(res => {
        if (res.status === 200) {
          res.json().then(data => {
            if (data) {
              this.props.loadUser(data);
              this.props.onRouteChange("home");
            }
          });
        } else {
          res.json().then(message => {
            this.setState({ hasError: true, errorMessage: message });
          });
        }
      })
      .catch(err => {});
  };

  render() {
    const { onRouteChange } = this.props;
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  onChange={this.onEmailChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  onChange={this.onPasswordChange}
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                />
              </div>
            </fieldset>
            {this.state.hasError ? (
              <div>
                <p>{this.state.errorMessage}</p>
              </div>
            ) : (
              <div />
            )}
            <div className="">
              <input
                onClick={this.onClickEvent}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div className="lh-copy mt3">
              <p
                style={{ cursor: "pointer" }}
                onClick={() => onRouteChange("register")}
                className="f6 link dim black db"
              >
                Register
              </p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Sigin;
