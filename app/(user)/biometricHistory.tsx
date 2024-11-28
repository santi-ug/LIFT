import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, View, Alert, TouchableOpacity } from "react-native";
import CustomButton from "../../components/atoms/CustomButton";
import FormField from "../../components/atoms/FormField";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { biometricHistoryScheme } from "../../schemes/biometricHistoryScheme";
import React, { useState } from "react";
import { Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { BodyIcon, CalendarIcon, EmailIcon, HeightIcon, PercentIcon, WeightIcon } from "../../components/atoms/icons";
import { registerBiometricHistory } from "../../lib/api_backend";

export default function biometricHistory() {
    const [date, setDate] = useState<Date>(new Date());
	const [showDatePicker, setShowDatePicker] = useState(false);

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
					Alert.alert("Error", error.message as string);
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
				Alert.alert("Success", "Biometric History saved successfully!");
                router.push("/profile");
			} else {
				const errorMessage = response.message || "Unknown error occurred";
      			Alert.alert("Error", errorMessage); 
			}
		} catch (error) {
			Alert.alert("Error", "An error occurred while saving the data.");
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

	// Función para validar si el texto ingresado es un número
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
				Alert.alert("Error", "Please enter a valid number.");
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
		</SafeAreaView>
	);
}
