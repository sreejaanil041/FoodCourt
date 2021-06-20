import { Content, Footer, UserHeader, Sidebar } from 'components/Layout';
import React from 'react';
import {
  MdImportantDevices,
  // MdCardGiftcard,
  MdLoyalty,
} from 'react-icons/md';
import NotificationSystem from 'react-notification-system';
import { NOTIFICATION_SYSTEM_STYLE } from 'utils/constants';

class HomeLayout extends React.Component {


  componentDidMount() {}

  render() {
    const { children } = this.props;
    return (
      <main className="cr-app bg-light">
        {/* <Sidebar /> */}
        <Content fluid onClick={this.handleContentClick}>
          <UserHeader />
          {children}
          <Footer />
        </Content>


      </main>
    );
  }
}

export default HomeLayout;
