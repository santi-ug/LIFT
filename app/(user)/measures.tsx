import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { getAllBiometricHistory } from '../../lib/api_backend';
import { BiometricHistoryData } from '../../types/Api';
import NoticeModal from '../../components/organisms/NoticeModal';

export default function measures() {
    const [biometricHistory, setBiometricHistory] = useState<BiometricHistoryData[]>([]);
    const [isNoticeVisible, setNoticeVisible] = useState(false);
    const [noticeContent, setNoticeContent] = useState({
        title: "",
        description: "",
		confirmButtonText: "",
		confirmButtonColor: "",
    });
    const [isLoading, setIsLoading] = useState(true);

    const loadBiometricHistory = async () => {
        try {
            setIsLoading(true);
            const data = await getAllBiometricHistory();
            setBiometricHistory(data);

        } catch (error) {
            console.error('Error fetching biometric history:', error);
            setNoticeContent({
                title: "Error",
                description: 'An error occurred while fetching biometric history.',
                confirmButtonColor: "#dc2626",
                confirmButtonText: "Accept"
            });

            setNoticeVisible(true);
        
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadBiometricHistory();
    }, []);

    return (
        <View className="flex-1 bg-background">
            <ScrollView>
                <View className="pl-8 pt-6">
                    <Text className="text-4xl text-white font-bold mt-5">Biometric Histories</Text>

                    {isLoading ? (
                        <ActivityIndicator size="large" color="#ffffff" />
                    ) : biometricHistory.length > 0 ? (
                        biometricHistory.map((item, index) => (
                        <View key={index} className="mt-4 p-3 mr-8 border border-gray-600">
                            <Text className="text-white text-lg">Date: {item.date}</Text>
                            <Text className="text-gray-400 text-sm">Weight: {item.weight} kg</Text>
                            <Text className="text-gray-400 text-sm">Height: {item.height} cm</Text>
                            <Text className="text-gray-400 text-sm">BMI: {item.bmi}</Text>
                            <Text className="text-gray-400 text-sm">Fat Percentage: {item.fat_percentage} %</Text>
                        </View>
                        ))
                    ) : (
                        <Text className="text-gray-400 mt-4">No biometric history available.</Text>
                    )}
                </View>
            </ScrollView>

            <NoticeModal
                isVisible={isNoticeVisible}
                onClose={() => setNoticeVisible(false)}
                title={noticeContent.title}
                description={noticeContent.description}
                confirmButtonColor = {noticeContent.confirmButtonColor}
                confirmButtonText = {noticeContent.confirmButtonText}
                onConfirm={() => {
                    setNoticeVisible(false);
                }}
		    />
        </View>
    );
}