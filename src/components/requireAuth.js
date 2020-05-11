// HigherOrder component for Authorization

import React from "react";
const requireAuth = (WrappedComponent) => {
  return class LogInFirst extends React.Component {
    componentDidMount() {
      const { loggedInUser, history, location } = this.props;
      if (!loggedInUser.id) {
        history.push({
          pathname: "/login",
          state: { returnPath: location.pathname },
        });
      }
    }

    componentDidUpdate() {
      const { loggedInUser, history, location } = this.props;
      if (!loggedInUser.id) {
        history.push({
          pathname: "/login",
          state: { returnPath: location.pathname },
        });
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default requireAuth;
