import React from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput } from 'react-native';

type CustomModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title?: string; 
  description?: string; 
  confirmButtonColor?: string;
  confirmButtonTextColor?: string; 
  confirmButtonText?: string; 
};

export default function NoticeModal({
  isVisible,
  onClose,
  onConfirm,
  title,
  description,
  confirmButtonColor,
  confirmButtonTextColor = '#ffffff',
  confirmButtonText,
}: CustomModalProps) {
    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View className="flex-1 p-6 justify-center items-center bg-black-50">
                <View className="bg-white w-11/12 p-5 rounded-lg shadow-md">

                    <View className="flex-row justify-between items-center">
                        <Text className="text-xl font-bold text-black">{title}</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Text className="text-xl text-gray-600">✕</Text>
                        </TouchableOpacity>
                    </View>

                    <Text className="text-sm text-gray-700 mt-4">{description}</Text>

                    <TouchableOpacity
                        onPress={onConfirm}
                        className="py-3 mt-6 rounded-md"
                        style={{ backgroundColor: confirmButtonColor }}
                    >
                        <Text
                            className="text-center text-lg font-semibold"
                            style={{ color: confirmButtonTextColor }}
                        >
                            {confirmButtonText}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}
