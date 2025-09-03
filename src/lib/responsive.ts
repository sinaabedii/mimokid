// Responsive design utilities

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
} as const;

export const getResponsiveClasses = (config: {
  base?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  '2xl'?: string;
}): string => {
  const classes = [];
  
  if (config.base) classes.push(config.base);
  if (config.sm) classes.push(`sm:${config.sm}`);
  if (config.md) classes.push(`md:${config.md}`);
  if (config.lg) classes.push(`lg:${config.lg}`);
  if (config.xl) classes.push(`xl:${config.xl}`);
  if (config['2xl']) classes.push(`2xl:${config['2xl']}`);
  
  return classes.join(' ');
};

export const getGridClasses = (columns: {
  base?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  '2xl'?: number;
}): string => {
  const config = {
    base: columns.base ? `grid-cols-${columns.base}` : undefined,
    sm: columns.sm ? `grid-cols-${columns.sm}` : undefined,
    md: columns.md ? `grid-cols-${columns.md}` : undefined,
    lg: columns.lg ? `grid-cols-${columns.lg}` : undefined,
    xl: columns.xl ? `grid-cols-${columns.xl}` : undefined,
    '2xl': columns['2xl'] ? `grid-cols-${columns['2xl']}` : undefined
  };
  
  return getResponsiveClasses(config);
};

export const getSpacingClasses = (spacing: {
  base?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  '2xl'?: string;
}): string => {
  return getResponsiveClasses(spacing);
};

export const getTextSizeClasses = (sizes: {
  base?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  '2xl'?: string;
}): string => {
  return getResponsiveClasses(sizes);
};

export const getPaddingClasses = (padding: {
  base?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  '2xl'?: string;
}): string => {
  return getResponsiveClasses(padding);
};

export const getMarginClasses = (margin: {
  base?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  '2xl'?: string;
}): string => {
  return getResponsiveClasses(margin);
};

// Common responsive configurations
export const responsiveConfigs = {
  container: {
    base: 'px-4',
    sm: 'px-6',
    lg: 'px-8'
  },
  
  grid: {
    products: {
      base: 1,
      sm: 2,
      lg: 3,
      xl: 4
    },
    features: {
      base: 1,
      md: 2,
      lg: 3
    }
  },
  
  text: {
    title: {
      base: 'text-2xl',
      sm: 'text-3xl',
      lg: 'text-4xl'
    },
    subtitle: {
      base: 'text-lg',
      sm: 'text-xl',
      lg: 'text-2xl'
    },
    body: {
      base: 'text-sm',
      sm: 'text-base',
      lg: 'text-lg'
    }
  },
  
  spacing: {
    section: {
      base: 'py-8',
      sm: 'py-12',
      lg: 'py-16'
    },
    card: {
      base: 'p-4',
      sm: 'p-6',
      lg: 'p-8'
    }
  }
} as const;
