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

type GridItemProps = {
  img: string;
  onClick: () => void;
  username: string;
};

export const Drawing: React.FC<GridItemProps> = ({ username, img, onClick }) => {
  const itemStyle: React.CSSProperties = {
    width: '100%',
    objectFit: 'cover',
  };

  return (
    <div style={{width: '100%'}} onClick={onClick}>
        <div style={{ fontWeight: 'bold', fontSize: '12px'}}>{username}</div>
        <img src={img} alt="" style={itemStyle} />
    </div>
  )
};

