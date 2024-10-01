import { CalendarIcon, CameraIcon, GalleryIcon, NewWorkoutIcon, PeopleIcon, ThreeDotsVerticarIcon, TrashIcon, TrendLineIcon, UserIcon } from '../../components/atoms/icons';
import { View, Text, Image, TouchableOpacity, Modal } from 'react-native';
import CustomButton from "../../components/atoms/CustomButton";
import ProgressBar from "../../components/atoms/ProgressBar";
import Dropdown from '../../components/atoms/Dropdown';
import { ApiResponse, UserData } from "../../types/Api";
import React, { useEffect, useState } from 'react';
import { infoUser } from '../../lib/api_backend';
import * as ImagePicker from 'expo-image-picker';
import user from "../../assets/images/user.png";
import { DataTable } from 'react-native-paper';

export default function Profile() {
    const [isSubmitting, setIsSubmitting] = useState(false);
	const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [image, setImage] = useState(user);
    const [isModalVisible, setModalVisible] = useState(false);
    const [userData, setUserData] = useState<UserData | null>(null); 
    const [error, setError] = useState<string | null>(null); 

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await infoUser();
                setUserData(user); // Guardamos los datos del usuario en el estado
            } catch (err: any) {
                setError(err.message); // Guardamos el error si ocurre
                console.error("Error fetching user data:", err);
            }
        };

        fetchUserData();
    }, []); 

    const pickImage = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access media library is required!");
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage({ uri: result.assets[0].uri });
        }

        setModalVisible(false);
    };

    const takePhoto = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Permission to access camera is required!");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled && result.assets.length > 0) {
            setImage({ uri: result.assets[0].uri });
        }

        setModalVisible(false);
    };

    const RemovePhoto = () => {
        setImage(user);
        setModalVisible(false);
    };

    const handleValueChange = (value: string) => {
        setSelectedOption(value);
    };

    const submit = () => {};

    return (
        <View className="flex-1 bg-background">
			<View className="relative flex-row items-center">
			
				<View className="w-24 h-24 rounded-full overflow-hidden ml-4 mt-0">
                    <Image
                        source={image}
                        className="w-full h-full"
                    />

                    <TouchableOpacity className='p-1 rounded-2xl bg-white absolute bottom-2 right-1'
                        onPress={() => setModalVisible(true)}
                    >
                        <CameraIcon/>
                    </TouchableOpacity>

				</View>


                <Modal
                    visible={isModalVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View className='flex-1 p-9 justify-center bg-black-50'
                    >
                        <View className='bg-white py-4 justify-center items-center rounded-2xl'>
                            <Text className='text-xl text-black font-ibold'>
                                Profile Photo
                            </Text>

                            <View className='flex flex-row justify-between w-auto my-5 mx-2'>
                                <TouchableOpacity className='flex-1 pv-10 justify-center items-center bg-gray-100 mx-2 p-2 rounded-xl'
                                    onPress={takePhoto}
                                >
                                    <View className='pt-2 items-center'>
                                        <CameraIcon/>
                                        <Text className='text-base text-black font-imedium py-2'>Camera</Text>
                                    </View>
                                </TouchableOpacity>
                                
                                <TouchableOpacity className='flex-1 pv-10 justify-center items-center bg-gray-100 mx-2 p-2 rounded-xl'
                                    onPress={pickImage}
                                >
                                    <View className='pt-2 items-center'>
                                        <GalleryIcon/>
                                        <Text className='text-base text-black font-imedium py-2'>Gallery</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity className='flex-1 pv-10 justify-center items-center bg-gray-100 mx-2 p-2 rounded-xl'
                                    onPress={RemovePhoto}
                                >
                                    <View className='pt-2 items-center'>
                                        <TrashIcon/>
                                        <Text className='text-base text-black font-imedium py-2'>Remove</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity onPress={() => setModalVisible(false)} >
                                <Text className='text-lg text-red-600 font-isemibold'>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

				<View className="flex-1 pt-9"> 
					
                    {error ? (
                            <Text className="text-red-500">{error}</Text>
                        ) : (
                            userData && (
                                <Text className="text-white font-isemibold text-base capitalize pb-3 pl-4">{userData.name || 'Nombre no disponible'}</Text>
                            )
                        )
                    }

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
