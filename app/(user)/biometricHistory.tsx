import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import CustomButton from "../../components/atoms/CustomButton";
import FormField from "../../components/atoms/FormField";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { biometricHistoryScheme } from "../../schemes/biometricHistoryScheme";
import React, { useState } from "react";
import { Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { BodyIcon, CalendarIcon, HeightIcon, PercentIcon, WeightIcon } from "../../components/atoms/icons";
import { registerBiometricHistory } from "../../lib/api_backend";
import NoticeModal from "../../components/organisms/NoticeModal";

export default function biometricHistory() {
    const [date, setDate] = useState<Date>(new Date());
	const [showDatePicker, setShowDatePicker] = useState(false);
	const [isNoticeVisible, setNoticeVisible] = useState(false);
    const [noticeContent, setNoticeContent] = useState({
        title: "",
        description: "",
		confirmButtonText: "",
		confirmButtonColor: "",
    });

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(biometricHistoryScheme),
	});

	const onError = (errors: any) => {
		if (Object.keys(errors).length > 0) {
			Object.values(errors).forEach((error) => {
				if (error && typeof error === "object" && "message" in error) {
					setNoticeContent({
                        title: "Error",
                        description: error.message as string,
						confirmButtonColor: "#dc2626",
						confirmButtonText: "Accept"
                    });

                    setNoticeVisible(true);
				}
			});
		}
	};

	const onSubmit = async (data: any) => {
		const formData = { ...data, date: date.toISOString() };

		try {
			console.log("data", formData);
			const response = await registerBiometricHistory(formData)
			
			if (response.success) {
				setNoticeContent({
                    title: "Success",
                    description: "Biometric History saved successfully!",
					confirmButtonColor: "#4caf50",
					confirmButtonText: "Accept"
				});

                setNoticeVisible(true);
			} else {
				const errorMessage = response.message || "Unknown error occurred";
				setNoticeContent({
                    title: "Error",
                    description: errorMessage,
					confirmButtonColor: "#dc2626",
					confirmButtonText: "Accept"
                });

                setNoticeVisible(true);
			}
		} catch (error) {
			setNoticeContent({
                title: "Error",
                description: "An error occurred while saving the data.",
				confirmButtonColor: "#dc2626",
				confirmButtonText: "Accept"
			});

            setNoticeVisible(true);
			console.error(error);
		}
	};

	const handleDateChange = (event: any, selectedDate: Date | undefined) => {
		if (selectedDate) {
			const localDate = new Date(selectedDate.getTime() + selectedDate.getTimezoneOffset() * 60000);
			setDate(localDate); 
			setShowDatePicker(false); 
		} else {
			setShowDatePicker(false); 
		}
	};

    const handleNumericInput = (text: string, onChange: any) => {
        // Verificar si el texto es un número válido
        if (text === "") {
			onChange(""); // Permite que el campo quede vacío
		} else {
			const value = parseFloat(text);
			if (!isNaN(value) ) {
				onChange(value); // Si es un número válido, actualizar el estado
			} else if (text === "Infinit" || text === "-Infinit" || text === "-"){
				onChange("");
			}else{
				setNoticeContent({
                    title: "Error",
                    description: "Please enter a valid number.",
					confirmButtonColor: "#dc2626",
					confirmButtonText: "Accept"
				});

                setNoticeVisible(true);
			}
		}
    };

	return (
		<SafeAreaView className="bg-background h-full">
			<ScrollView>
				<View className="w-full justify-center min-h-[90vh] px-8 pb-20">
					<Text className="text-4xl text-white font-bold">
						Biometric History
					</Text>

					<Controller
						control={control}
						name="weight"
						render={({ field: { onChange, value } }) => (
							<FormField
							    icon={WeightIcon}
								title="Weight (kg)"
								placeholder="Enter weight"
								value={value?.toString() || ""}
								handleChangeText={(text) => handleNumericInput(text, onChange)}
								otherStyles="mt-7"
								keyboardType="numeric"
							/>
						)}
					/>

					<Controller
						control={control}
						name="height"
						render={({ field: { onChange, value } }) => (
							<FormField
								icon={HeightIcon}
								title="Height (cm)"
								placeholder="Enter height"
								value={value?.toString() || ""}
								handleChangeText={(text) => handleNumericInput(text, onChange)}
								otherStyles="mt-7"
								keyboardType="numeric"
							/>
						)}
					/>

					<Controller
						control={control}
						name="bmi"
						render={({ field: { onChange, value } }) => (
							<FormField
								icon={BodyIcon}
								title="BMI"
								placeholder="Enter BMI"
								value={value?.toString() || ""}
								handleChangeText={(text) => handleNumericInput(text, onChange)}
								otherStyles="mt-7"
								keyboardType="numeric"
							/>
						)}
					/>

					<Controller
						control={control}
						name="fat_percentage"
						render={({ field: { onChange, value } }) => (
							<FormField
								icon={PercentIcon}
								title="Fat Percentage (%)"
								placeholder="Enter fat percentage"
								value={value?.toString() || ""}
								handleChangeText={(text) => handleNumericInput(text, onChange)}
								otherStyles="mt-7"
								keyboardType="numeric"
							/>
						)}
					/>

                    <View className="mt-7">
						<Text className="text-white mb-2">Date</Text>

						<TouchableOpacity
							onPress={() => setShowDatePicker(true)}
							className="ml-6 mt-2 "
						>
							<View className='flex-row gap-x-5'>
								<CalendarIcon/>
								<Text className={"text-white capitalize font-normal text-sm"}>
									{date.toISOString().split("T")[0]}
								</Text>
							</View>
						</TouchableOpacity>

						{showDatePicker && (
							<DateTimePicker
								value={date}
								mode="date"
								display={Platform.OS === "ios" ? "inline" : "default"}
								onChange={handleDateChange}
								maximumDate={new Date()} 
							/>
						)}
					</View>

					<View className="my-4">
						<CustomButton
							title="Save"
							handlePress={handleSubmit(onSubmit, onError)}
							containerStyles="mt-6"
							isLoading={isSubmitting}
						/>
					</View>
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
					if (noticeContent.title === "Success") {
						router.push("/profile"); 
					}
                }}
            />

		</SafeAreaView>
	);
}
