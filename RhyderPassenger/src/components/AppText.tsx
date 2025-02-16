import React from 'react';
import {Text, TextStyle} from 'react-native';

interface AppTextProps {
  children: React.ReactNode;
  style?: TextStyle;
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  [key: string]: any;
}

const AppText: React.FC<AppTextProps> = ({
  children,
  style,
  numberOfLines,
  ellipsizeMode,
  ...rest
}) => {
  return (
    <Text
      style={style}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      {...rest}>
      {children}
    </Text>
  );
};

export default AppText;
