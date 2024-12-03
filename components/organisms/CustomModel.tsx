import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

type CustomModalProps = {
  isVisible: boolean; 
  onClose: () => void; 
  title: string; 
  buttons: Array<{
    text: string; 
    icon: JSX.Element; 
    onPress: () => void; 
  }>;
};

export default function CustomModal({ isVisible, onClose, title, buttons }: CustomModalProps) {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 p-9 justify-center bg-black-50">
        <View className="bg-white py-4 justify-center items-center rounded-2xl">
          <Text className="text-xl font-bold text-black">{title}</Text>

          <View className="flex flex-row justify-between w-auto my-5 mx-2">
            {buttons.map((button, index) => (
              <TouchableOpacity
                key={index}
                className="flex-1 pv-10 justify-center items-center bg-gray-100 mx-2 p-2 rounded-xl"
                onPress={button.onPress}
              >
                <View className="pt-2 items-center">
                  {button.icon}
                  <Text className="text-base text-black py-2">
                    {button.text}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity onPress={onClose}>
            <Text className="text-lg text-red-600">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
