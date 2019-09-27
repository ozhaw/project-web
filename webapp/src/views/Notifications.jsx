/*eslint-disable*/
import React from "react";
import NotificationAlert from "react-notification-alert";

class Notifications extends React.Component {
  notificationAlert = React.createRef();

  notify(message) {
    let options = {
      place: this.props.place,
      message: (
        <div>
          <div>
              {message}
          </div>
        </div>
      ),
      type: this.props.type,
      icon: "nc-icon nc-bell-55",
      autoDismiss: 4
    };

    this.notificationAlert.current.notificationAlert(options);
  }

  render() {
    return (
        <NotificationAlert ref={this.notificationAlert} />
    );
  }
}

export default Notifications;
