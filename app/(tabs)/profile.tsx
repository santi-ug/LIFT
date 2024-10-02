import { CalendarIcon, CameraIcon, GalleryIcon, NewWorkoutIcon, PeopleIcon, ThreeDotsVerticarIcon, TrashIcon, TrendLineIcon, UserIcon } from '../../components/atoms/icons';
import CustomDataTable from '../../components/molecules/CustomDataTable';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import CustomModal from '../../components/organisms/CustomModel';
import CustomButton from "../../components/atoms/CustomButton";
import ProgressBar from "../../components/atoms/ProgressBar";
import Dropdown from '../../components/atoms/Dropdown';
import { ApiResponse, UserData } from "../../types/Api";
import React, { useEffect, useState } from 'react';
import { infoUser, updateImage } from '../../lib/api_backend';
import * as ImagePicker from 'expo-image-picker';
import user from "../../assets/images/user.png";
import { Buffer } from 'buffer';

export default function Profile() {
    const [isSubmitting, setIsSubmitting] = useState(false);
	const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [image, setImage] = useState(user);
    const [isModalVisible, setModalVisible] = useState(false);
    const [userData, setUserData] = useState<UserData | undefined>(); 
    const [error, setError] = useState<string | null>(null); 

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await infoUser();
                setUserData(user);
        
                if (user?.avatar != null) {
                    const avatarData = (user.avatar as any).data;
                    const base64 = await convertBufferArrayToBase64(avatarData);
                    console.log(base64);
                    setImage(base64); 
                }
            } catch (err: any) {
                setError(err.message);
                console.error("Error fetching user data:", err);
            }
        };
      
        fetchUserData();
    }, []);

    const convertBufferArrayToBase64 = (bufferArray: any[]): Promise<string> => {
        const buffer = Buffer.from(bufferArray);
        const base64 = buffer.toString('base64');
        return Promise.resolve(base64);
    };

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
            const imageUri = result.assets[0].uri;
            console.log("Image URI Profile:", imageUri);

            const imageFile = {
                uri: imageUri,
                name: result.assets[0].fileName || 'avatar.jpg',
            };

            console.log("ImageFile Profile:", imageFile);

            try {
                await updateImage(imageFile);
            } catch (err: any) {
                console.error("Error uploading image:", err);
            }
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
                    {userData?.avatar  != null? (
                            <Image
                                source={{ uri: `data:image/jpeg;base64,${image}` }} 
                                className="w-full h-full"
                            />
                        ): (
                            <Image
                                source={user} 
                                className="w-full h-full"
                            />
                        )
                    }

                    <TouchableOpacity className='p-1 rounded-2xl bg-white absolute bottom-2 right-1'
                        onPress={() => setModalVisible(true)}
                    >
                        <CameraIcon/>
                    </TouchableOpacity>

				</View>

                <CustomModal
                    isVisible={isModalVisible}
                    onClose={() => setModalVisible(false)}
                    title="Profile Photo"
                    buttons={[
                      {
                        text: 'Camera',
                        icon: <CameraIcon />,
                        onPress: takePhoto,
                      },
                      {
                        text: 'Gallery',
                        icon: <GalleryIcon />,
                        onPress: pickImage,
                      },
                      {
                        text: 'Remove',
                        icon: <TrashIcon />,
                        onPress: RemovePhoto,
                      },
                    ]}
                />

				<View className="flex-1 pt-9"> 
					
                    {error ? (
                            <Text className="text-red-500 text-base capitalize pb-3 pl-4">Cargando...</Text>
                        ) : (
                            userData && (
                                <Text className="text-white font-isemibold text-base capitalize pb-3 pl-4">{userData.name || 'Nombre no disponible'}</Text>
                            )
                        )
                    }

					<CustomDataTable
                        headers={['Workouts', 'Followers', 'Following']}
                        data={[
                            ['223', '2', '2'], 
                        ]}
                    />
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
