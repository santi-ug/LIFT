import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { EvilIcons, Ionicons } from "@expo/vector-icons";
import Foundation from '@expo/vector-icons/Foundation';
import AntDesign from "@expo/vector-icons/AntDesign";
import Octicons from "@expo/vector-icons/Octicons";
import Fontisto from "@expo/vector-icons/Fontisto";
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import React from "react";

export const LoginIcon: React.FC<{ color: string }> = ({ color }) => (
	<AntDesign name='login' size={24} color={color} />
);

export const UserIcon: React.FC<{ color: string }> = ({ color }) => (
	<FontAwesome name='user-o' size={20} color={color} />
);

export const EmailIcon: React.FC<{ color: string }> = ({ color }) => (
	<Fontisto name='email' size={20} color={color} />
);

export const PasswordIcon: React.FC<{ color: string }> = ({ color }) => (
	<SimpleLineIcons name='lock' size={20} color={color} />
);

export const PasswordVisibleIcon: React.FC<{ color: string }> = ({ color }) => (
	<Octicons name='eye' size={18} color={color} />
);

export const PasswordNoVisibleIcon: React.FC<{ color: string }> = ({
	color,
}) => <Octicons name='eye-closed' size={18} color={color} />;

export const AppleIcon = () => (
	<MaterialIcons name='apple' size={35} color='black' />
);

export const ExerciseIcon: React.FC<{ color: string }> = ({ color }) => (
	<Ionicons name='barbell-outline' size={28} color={color} />
);

export const NewWorkoutIcon: React.FC<{ color: string }> = ({ color }) => (
	<MaterialIcons name='add-circle-outline' size={24} color={color} />
);

export const TrendLineIcon = () => (
	<Feather name="trending-up" size={17} color="white"/>
);

export const GearIcon = () => (
	<Octicons name="gear" size={20} color="white" />
);

export const ShareIcon = () => (
	<Feather name="share" size={20} color="white" />
);

export const ArrowRightIcon = () => (
	<AntDesign name="arrowright" size={20} color="white" />
);

export const CalendarIcon = () => (
	<AntDesign name="calendar" size={20} color="white" />
);

export const PeopleIcon = () => (
	<MaterialIcons name="emoji-people" size={20} color="white" />
);

export const FilterIcon = () => (
	<Ionicons name="filter" size={20} color="#A0AEC0" />
);

export const ThreeDotsVerticarIcon = () => (
	<Entypo name="dots-three-vertical" size={20} color="#A0AEC0" />
);

export const MagnifyingGlassIcon = () => (
	<Entypo name="magnifying-glass" size={20} color="#A0AEC0" />
);

export const CameraIcon = () => (
	<Feather name="camera" size={20} color="#5F48D9" />
);

export const GalleryIcon = () => (
	<Feather name="image" size={20} color="#5F48D9" />
);

export const TrashIcon = () => (
	<FontAwesome name="trash-o" size={20} color="#5F48D9" />
);

export const LogOutIcon = () => (
	<AntDesign name="logout" size={20} color="#5F48D9" />
);

export const DeleteAccountIcon = () => (
	<AntDesign name="deleteuser" size={20} color="#5F48D9" />
);

export const EditIcon = () => (
	<AntDesign name="edit" size={20} color="#5F48D9" />
);

export const AddIcon = () => (
	<Ionicons name="add" size={20} color="white" />
);

export const ClipboardIcon = () => (
	<Foundation name="clipboard-notes" size={20} color="#A0AEC0" />
);

export const CheckIcon = () => (
	<Feather name="check" size={20} color="white" />	
);

export const CancelIcon = () => (
	<Feather name="x" size={20} color="white" />
);

export const SaveIcon = () => (
	<Feather name="save" size={21} color="white" />
);

// import SvgGoogleIcon from "../../assets/images/google.svg"; // Import your SVG as a component

// export const GoogleIcon = () => {
// 	return (
// 		<SvgGoogleIcon width={24} height={24} /> // Use the SVG component with proper width and height
// 	);
// };