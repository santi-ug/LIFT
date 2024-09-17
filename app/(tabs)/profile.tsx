import { NavigationContainer } from "@react-navigation/native";
import ProgressBar from "../../components/atoms/ProgressBar";
import user from "../../assets/images/user.png";
import { DataTable } from 'react-native-paper'; 
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	View,
} from "react-native";

export default function Profile() {
	return (
		<>
			<View className="flex-1 bg-background">
				<View className="relative flex-row items-center">
				
					<View className="w-24 h-24 rounded-full overflow-hidden ml-4 mt-3">
						<Image 
							source={user}
							className="w-full h-full" 
						/>
					</View>

					<View className="flex-1 pt-10"> 
						<Text className="text-white font-isemibold text-base capitalize pb-3 pl-4">Susana</Text>

						<DataTable className="w-full"> 
							<DataTable.Header className="border-y-0 h-11"> 
								<DataTable.Title>
									<Text className="text-gray-500 text-sm font-iregular capitalize">Workouts</Text>
								</DataTable.Title> 

								<DataTable.Title>
									<Text className="text-gray-500 text-sm font-iregular capitalize">Followers</Text>
								</DataTable.Title> 

								<DataTable.Title>
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

				<ProgressBar progress={24}/>
			</View>
		</>
	);
}
