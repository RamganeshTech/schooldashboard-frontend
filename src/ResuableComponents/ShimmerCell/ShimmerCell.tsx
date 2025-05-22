// components/ShimmerCell.tsx
import React from 'react';
import { Skeleton } from '@mui/material';

type ShimmerCellProps = {
  width?: number | string;
  height?: number | string;
  variant?: 'text' | 'rectangular' | 'circular';
};

const ShimmerCell: React.FC<ShimmerCellProps> = ({
  width = '80%',
  height = 20,
  variant = 'rectangular',
}) => {
  return (
    <Skeleton
      variant={variant}
      width={width}
      height={height}
      animation="wave"
      sx={{ margin: '0 auto' , 
         '&::after': {
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
        animationDuration: '0.8s',
    },
      }}
    />
  );
};

export default ShimmerCell;
