import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

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

export const AppleIcon: React.FC<{ color: string }> = ({ color }) => (
	<MaterialIcons name='apple' size={35} color={color} />
);

export const ExerciseIcon: React.FC<{ color: string }> = ({ color }) => (
	<Ionicons name='barbell-outline' size={28} color={color} />
);

export const NewWorkoutIcon: React.FC<{ color: string }> = ({ color }) => (
	<MaterialIcons name='add-circle-outline' size={24} color={color} />
);
