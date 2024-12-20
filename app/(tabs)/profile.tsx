import { CalendarIcon, CameraIcon, GalleryIcon, NewWorkoutIcon, PeopleIcon, TrashIcon, TrendLineIcon } from '../../components/atoms/icons';
import { infoUser, removeImage, updateImage } from '../../lib/api_backend';
import CustomDataTable from '../../components/molecules/CustomDataTable';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import CustomModal from '../../components/organisms/CustomModel';
import CustomButton from "../../components/atoms/CustomButton";
import ProgressBar from "../../components/atoms/ProgressBar";
import Dropdown from '../../components/molecules/Dropdown';
import * as ImageManipulator from 'expo-image-manipulator';
import { ApiResponse, UserData } from "../../types/Api";
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
// @ts-ignore
import user from "../../assets/user.png";
import { Buffer } from 'buffer';
import { useUserStore } from '../../storage/userStorage';

export default function Profile() {
    const [isSubmitting, setIsSubmitting] = useState(false);
	const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [image, setImage] = useState(user);
    const [isModalVisible, setModalVisible] = useState(false);
    const [error, setError] = useState<string | null>(null); 
    const [imageUpdated, setImageUpdated] = useState(false);

    const { userData, setUserData } = useUserStore();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await infoUser();
                if (user)
                    setUserData(user);
        
                if (user?.avatar != null) {
                    const avatarData = (user.avatar as any).data;
                    const base64 = await convertBufferArrayToBase64(avatarData);
                    setImage(base64);
                }
            } catch (err: any) {
                setError(err.message);
                console.error("Error fetching user data:", err);
            }
        };
      
        fetchUserData();
    }, [imageUpdated]);

    const convertBufferArrayToBase64 = (bufferArray: any[]): Promise<string> => {
        const buffer = Buffer.from(bufferArray);
        const base64 = buffer.toString('base64');
        return Promise.resolve(base64);
    };

    const resizeImage = async (uri: string): Promise<string | undefined> => {
        try {
            const result = await ImageManipulator.manipulateAsync(
                uri,
                [{ resize: { width: 800, height: 600 } }],
                { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
            );
            return result.uri;
        } catch (err) {
            console.error("Error resizing image:", err);
            return undefined; 
        }
    };

    const pickImage = async () => {
        setImageUpdated(false);
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
            alert("Permission to access media library is required!");
            return;
        }
    
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
        });
    
        if (!result.canceled && result.assets.length > 0) {
            const resizedUri = await resizeImage(result.assets[0].uri);

            if (resizedUri) {
                setImage(resizedUri);
                await saveImage(); 
                setImageUpdated(true);
            } else {
                alert("Error resizing image");
            }
        }
    
        setModalVisible(false);
    };
    
    const takePhoto = async () => {
        setImageUpdated(false);
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Permission to access camera is required!");
            return;
        }
    
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
        });
    
        if (!result.canceled) {
            const resizedUri = await resizeImage(result.assets[0].uri);
            console.log("hola tu", resizedUri);

            if (resizedUri) {
                setImage(resizedUri); 
                await saveImage();
                setImageUpdated(true);
            } else {
                alert("Error resizing image");
            }
        }
    
        setModalVisible(false);
    };

    const saveImage = async () => {
        if (!Image) {
            alert('Necesita subir imagen primero')
            return
        }

        try {
            await updateImage(image);
        } catch (err: any) {
            console.error("Error uploading image:", err);
        }
    }

    const RemovePhoto = async () => {
        try {
            const updatedUser = await removeImage();
            setImage(user);
            if (updatedUser)
                setUserData(updatedUser);
            setImageUpdated(true);
            setModalVisible(false);
        } catch (error) {
            console.error("Error removing photo:", error);
            alert("Error removing photo. Please try again.");
        }
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
                                <Text className="text-white font-semibold text-base capitalize pb-3 pl-4">{userData.name || 'Nombre no disponible'}</Text>
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
				<Text className="text-white font-semibold text-base mt-4 ml-4">0 hours</Text>
				<Text className="text-gray-400 font-normal text-base mt-4 ml-2">this week</Text>
				<Dropdown
					options={[
						{ label: "Option 1", value: "option1" },
						{ label: "Option 2", value: "option2" },
						{ label: "Option 3", value: "option3" }
					]}
                    otherStyles='w-5/12 ml-14'
					placeholder="Select time"
					value={selectedOption}
                    setValue={setSelectedOption}
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

            <Text className="text-gray-500 font-semibold text-base mb-2 ml-4">Dashboard</Text>

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