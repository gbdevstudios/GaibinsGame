import React from 'react';

type GridContainerProps = {
  children: React.ReactNode;
};

export const GridContainer: React.FC<GridContainerProps> = ({ children }) => {
  const containerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '10px',
    padding: '10px',
  };

  return <div style={containerStyle}>{children}</div>;
};



