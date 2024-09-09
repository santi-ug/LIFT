import AntDesign from '@expo/vector-icons/AntDesign';
import Fontisto from '@expo/vector-icons/Fontisto';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';

export const LoginIcon = () => (
    <AntDesign name="login" size={24} color="black" />
)

export const UserIcon = () => (
    <FontAwesome name="user-o" size={20} color="white" />
)

export const UserActiveIcon = () => (
    <FontAwesome name="user-o" size={20} color="#171328" />
)

export const EmailIcon = () => (
    <Fontisto name="email" size={20} color="white" />
)

export const PasswordIcon = () => (
    <SimpleLineIcons name="lock" size={20} color="white" />
)

export const PasswordVisibleIcon = () => (
    <Octicons name="eye" size={18} color="white" />
)

export const PasswordNoVisibleIcon = () => (
    <Octicons name="eye-closed" size={18} color="white" />
)

export const AppleIcon = () => (
    <MaterialIcons name="apple" size={35} color="black" />
)

export const ExerciseIcon = () => (
    <Ionicons name="barbell-outline" size={28} color="white" />
)

export const ExerciseActiveIcon = () => (
    <Ionicons name="barbell-outline" size={28} color="#171328" />
)

export const NewWorkoutIcon = () => (
    <MaterialIcons name="add-circle-outline" size={24} color="white" />
)

export const NewWorkoutActiveIcon = () => (
    <MaterialIcons name="add-circle-outline" size={24} color="#171328" />
)