import React, { memo } from 'react';
import { Layout } from 'chat-client/shared/components';
import View from './view';

const LoginContainer = () => <Layout content={<View />} />;

export default memo(LoginContainer);