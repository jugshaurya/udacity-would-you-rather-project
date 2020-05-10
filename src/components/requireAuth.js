// HigherOrder component for Authorization

import React from "react";

const requireAuth = (WrappedComponent) => {
  return class LogInFirst extends React.Component {
    componentDidMount() {
      if (!this.props.loggedInUser.id) {
        this.props.history.push("/login");
      }
    }

    componentDidUpdate() {
      if (!this.props.loggedInUser.id) {
        this.props.history.push("/login");
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};
export default requireAuth;