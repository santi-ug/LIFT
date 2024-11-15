import React from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';

interface CircleButtonProps {
  icon: React.ElementType;
  onPress: () => void;
  containerStyle?: string; 
}

const CircleButton: React.FC<CircleButtonProps> = ({
  icon: IconComponent,
  onPress,
  containerStyle,
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            className={`flex-row ${containerStyle}`}
        >
            <IconComponent />
        </TouchableOpacity>
    );
};

export default CircleButton;