import React from 'react';
import {User} from 'lucide-react-native';

const UserTabIcon = ({color, size}: {color: string; size: number}) => {
  return <User color={color} size={size} />;
};

export default UserTabIcon;
