import { CalendarIcon, NewWorkoutIcon, PeopleIcon, TrendLineIcon } from '../../components/atoms/icons';
import CustomButton from "../../components/atoms/CustomButton";
import ProgressBar from "../../components/atoms/ProgressBar";
import { View, Text, Image } from 'react-native';
import user from "../../assets/images/user.png";
import { DataTable } from 'react-native-paper';
import React, { useState } from 'react';
import Dropdown from '../../components/atoms/Dropdown';

export default function Profile() {
    const [isSubmitting, setIsSubmitting] = useState(false);
	const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleValueChange = (value: string) => {
        setSelectedOption(value);
    };

    const submit = () => {};

    return (
        <View className="flex-1 bg-background">
			<View className="relative flex-row items-center">
			
				<View className="w-24 h-24 rounded-full overflow-hidden ml-4 mt-0">
					<Image 
						source={user}
						className="w-full h-full" 
					/>
				</View>

				<View className="flex-1 pt-9"> 
					<Text className="text-white font-isemibold text-base capitalize pb-3 pl-4">Susana</Text>
				

					<DataTable className="w-full"> 
						<DataTable.Header className="border-y-0 h-11"> 
							<DataTable.Title >
								<Text className="text-gray-500 text-sm font-iregular capitalize">Workouts</Text>
							</DataTable.Title> 

							<DataTable.Title >
								<Text className="text-gray-500 text-sm font-iregular capitalize">Followers</Text>
							</DataTable.Title> 

							<DataTable.Title >
								<Text className="text-gray-500 text-sm font-iregular capitalize">Following</Text>
							</DataTable.Title> 
						</DataTable.Header>  

						<DataTable.Row className="border-y-0"> 
							<DataTable.Cell className="h-4">
								<Text className="text-white text-sm font-isemibold capitalize">223</Text>
							</DataTable.Cell> 

							<DataTable.Cell className="h-4">
								<Text className="text-white text-sm font-isemibold capitalize">2</Text>
							</DataTable.Cell> 

							<DataTable.Cell className="h-4">
								<Text className="text-white text-sm font-isemibold capitalize">2</Text>
							</DataTable.Cell> 
						</DataTable.Row> 
					</DataTable> 
                </View>
            </View>

            <ProgressBar progress={25} />
			
			<View className="flex-row">
				<Text className="text-white font-isemibold text-base mt-4 ml-4">0 hours</Text>
				<Text className="text-gray-400 font-iregular text-base mt-4 ml-2">this week</Text>
				<Dropdown
					options={[
						{ label: "Option 1", value: "option1" },
						{ label: "Option 2", value: "option2" },
						{ label: "Option 3", value: "option3" }
					]}
					placeholder="Select time"
					value={selectedOption}
				/>
			</View>

			<View className="flex-row my-5 ml-4">
                <CustomButton
                    title='Duration'
                    handlePress={submit}
                    containerStyles='w-3/12 bg-primary mr-4'
                />
                <CustomButton
                    title='Volume'
                    handlePress={submit}
                    containerStyles='w-3/12 bg-gray-700 mr-4'
                    isLoading={isSubmitting}
                />
				<CustomButton
                    title='Reps'
                    handlePress={submit}
                    containerStyles='w-3/12 bg-gray-700 mr-4'
                    isLoading={isSubmitting}
                />
			</View>

            <Text className="text-gray-500 font-isemibold text-base mb-2 ml-4">Dashboard</Text>

            <View className="flex-row flex-wrap justify-between gap-4 my-4 mx-4">
                <CustomButton
                    title='Statistics'
					icon={TrendLineIcon}
                    handlePress={submit}
                    containerStyles='w-5/12 bg-gray-700 mb-5 rounded-xl'
                    isLoading={isSubmitting}
                />
                <CustomButton
                    title='Exercises'
					icon={NewWorkoutIcon}
                    handlePress={submit}
                    containerStyles='w-5/12 bg-gray-700 mb-5 rounded-xl'
                    isLoading={isSubmitting}
					iconColor="#fff" 
                />
                <CustomButton
                    title='Measures'
					icon={PeopleIcon}
                    handlePress={submit}
                    containerStyles='w-5/12 bg-gray-700 rounded-xl'
                    isLoading={isSubmitting}
                />
                <CustomButton
                    title='Calendar'
					icon={CalendarIcon}
                    handlePress={submit}
                    containerStyles='w-5/12 bg-gray-700 rounded-xl'
                    isLoading={isSubmitting}
                />
            </View>
        </View>
    );
}
