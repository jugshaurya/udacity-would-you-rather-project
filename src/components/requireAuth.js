// HigherOrder component for Authorization

import React from "react";

const requireAuth = (WrappedComponent) => {
  return class LogInFirst extends React.Component {
    componentDidMount() {
      const { loggedInUser, history } = this.props;
      if (!loggedInUser.id) {
        history.push("/login");
      }
    }

    componentDidUpdate() {
      const { loggedInUser, history } = this.props;
      if (!loggedInUser.id) {
        history.push("/login");
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default requireAuth;
