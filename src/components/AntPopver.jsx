import { Popover } from 'antd';
import React from 'react';

function AntPopover({children}) {
    return (
        <Popover
          content={<span style={{ whiteSpace: "wrap" }}>{children}</span>}
          style={{ width: 150 }}
        >
          <div
            style={{
              width: 120,
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {children}
          </div>
        </Popover>
    );
}

export default AntPopover;