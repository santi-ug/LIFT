import AntDesign from '@expo/vector-icons/AntDesign';
import Fontisto from '@expo/vector-icons/Fontisto';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export const LoginIcon = () => (
    <AntDesign name="login" size={24} color="black" />
)

export const UserIcon = () => (
    <FontAwesome name="user-o" size={20} color="white" />
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
