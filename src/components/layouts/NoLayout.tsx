import React from 'react';
import { Outlet } from 'react-router-dom';

const NoLayout: React.FC = () => {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default NoLayout;
