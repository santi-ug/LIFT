import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import Octicons from "@expo/vector-icons/Octicons";
import Fontisto from "@expo/vector-icons/Fontisto";
import Feather from '@expo/vector-icons/Feather';
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";

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

// import SvgGoogleIcon from "../../assets/images/google.svg"; // Import your SVG as a component

// export const GoogleIcon = () => {
// 	return (
// 		<SvgGoogleIcon width={24} height={24} /> // Use the SVG component with proper width and height
// 	);
// };
