import { Layout, Divider } from 'antd';
import {
  SiderContainer,
  HeaderContainer,
  FooterContainer,
} from '@/src/containers/app-containers';
import React, { useState } from 'react';
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';
import styles from './styles.module.scss';

const { Header, Content } = Layout;

function AppLayout({ children }: IChilrenDashboard) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout hasSider className={styles.app_layout}>
      <SiderContainer props={{ collapsed: collapsed }}></SiderContainer>
      <Layout style={{ backgroundColor: '#f4f3ef' }}>
        <HeaderContainer>
          {React.createElement(
            collapsed ? AiFillRightCircle : AiFillLeftCircle,
            {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </HeaderContainer>
        {children}
      </Layout>
    </Layout>
  );
}

export default AppLayout;
