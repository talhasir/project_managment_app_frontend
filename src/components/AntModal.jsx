import React, { useState } from 'react';
import { Button, ConfigProvider, Modal, Space } from 'antd';
import { createStyles, useTheme } from 'antd-style';
import { useContext } from 'react';
import { contexts } from 'antd-theme/lib/runtime';
import Context from '../ContextProvider';

const useStyle = createStyles(({ token }) => ({
  'my-modal-mask': {
    boxShadow: `inset 0 0 15px #fff`,
  },
  'my-modal-header': {
    borderBottom: `1px dotted ${token.colorPrimary}`,
  },
  'my-modal-footer': {
    color: token.colorPrimary,
  },
}));

const AntModal = ({children, heading}) => {
  const {isModalOpen, setIsModalOpen} = useContext(Context);
  const { styles } = useStyle();
  const token = useTheme();
 
  const classNames = {
    mask: styles['my-modal-mask'],
    header: styles['my-modal-header'],
    footer: styles['my-modal-footer'],
  };
  const modalStyles = {
    header: {
      borderLeft: `5px solid ${token.colorPrimary}`,
      borderRadius: 0,
      paddingInlineStart: 5,
    },
    mask: {
      backdropFilter: 'blur(10px)',
    },
    // footer: {
    //   // marginTop: 10,
    //   borderTop: '1px solid #333',
    // },
  };
  return (
      <Modal
        title={heading}
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer={false}
        
        classNames={classNames}
        styles={modalStyles}
      >
        {children}
      </Modal>
  );
};
export default AntModal;