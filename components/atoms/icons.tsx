import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

export const LoginIcon = () => (
	<AntDesign name='login' size={24} color='black' />
);

export const UserIcon: React.FC<{ color: string }> = ({ color }) => (
	<FontAwesome name='user-o' size={20} color={color} />
);

export const UserActiveIcon = () => (
	<FontAwesome name='user-o' size={20} color='#5F48D9' />
);

export const EmailIcon = () => (
	<Fontisto name='email' size={20} color='white' />
);

export const PasswordIcon = () => (
	<SimpleLineIcons name='lock' size={20} color='white' />
);

export const PasswordVisibleIcon = () => (
	<Octicons name='eye' size={18} color='white' />
);

export const PasswordNoVisibleIcon = () => (
	<Octicons name='eye-closed' size={18} color='white' />
);

export const AppleIcon = () => (
	<MaterialIcons name='apple' size={35} color='black' />
);

export const ExerciseIcon: React.FC<{ color: string }> = ({ color }) => (
	<Ionicons name='barbell-outline' size={28} color={color} />
);

export const ExerciseActiveIcon = () => (
	<Ionicons name='barbell-outline' size={28} color='#5F48D9' />
);

export const NewWorkoutIcon: React.FC<{ color: string }> = ({ color }) => (
	<MaterialIcons name='add-circle-outline' size={24} color={color} />
);

export const NewWorkoutActiveIcon = () => (
	<MaterialIcons name='add-circle-outline' size={24} color='#5F48D9' />
);
