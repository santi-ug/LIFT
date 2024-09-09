import { EmailIcon, PasswordIcon, PasswordVisibleIcon, PasswordNoVisibleIcon, AppleIcon } from "../atoms/icons";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet, Text, TextInput, View, TouchableOpacity} from "react-native";
import DividerWithText from "../atoms/DividerWithText";
import LinkButton from "../molecules/LinkButton";
import TextLink from "../molecules/TextLink";
import { useState } from "react";
import Link from "../atoms/Link";

export default function Login() {
	const insets = useSafeAreaInsets();

	const [user, setUser] = useState('')
	const [pass, setPass] = useState('')
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);  // Estado para controlar la visibilidad de la contraseña


	return (
		<View style={styles.container}>
			
			<Text style={styles.title}>Login</Text>

			<View style={styles.inputContainer}>
				<EmailIcon/>
				<TextInput 
					style={styles.input}
					placeholder="Email" 
					placeholderTextColor="white" 
					onChangeText={setUser}
				/>
			</View>

			<View style={styles.inputContainer}>
				<PasswordIcon/>
				<TextInput 
					style={styles.input}
					onChangeText={setPass}
					placeholder="Password" 
					placeholderTextColor="white" 
					secureTextEntry={!isPasswordVisible}
				/>

				<TouchableOpacity 
					style={styles.iconContainer}  
					onPress={() => setIsPasswordVisible(!isPasswordVisible)}
				>
					{isPasswordVisible ? <PasswordNoVisibleIcon/> : <PasswordVisibleIcon/>}
				</TouchableOpacity>
			</View>

			<Link 
				text="Forgot password?" 
				onPress={() => console.log("Link pressed")} 
				style={{ fontSize: 13, marginLeft: 230 }} 
			/>

			<LinkButton
				text="Login" 
				href="/profile"
				styleLink={{ padding: 16, color: "white", fontSize: 15, height: 55,}}
  				styleButton={{ width: '91%', borderRadius: 30, marginTop: 30, backgroundColor: "#5F48D9"}} 
			/>

			<DividerWithText text="OR" />

			<LinkButton
				text="Login with Apple ID" 
				href="/index"
				icon={<AppleIcon/>}
				styleLink={{ padding: 16, color: "black", fontSize: 15, height: 55 }}
  				styleButton={{ width: '91%', borderRadius: 30, marginTop: 30, backgroundColor: "white"}} 
			/>

			<TextLink
				text="New to Lift? " 
				linkHref="/register"
				textLink=" Register"
				textStyle={{ margin: 28, color: "white", fontSize: 15, textAlign: 'center',}}
				linkStyle={{ width: '91%', marginTop: 30, color:"#5F48D9" }} 
			/>
		</View>
	);
}

const styles = StyleSheet.create({

	title: {
		fontSize: 45,
		fontWeight: 'bold',
		color: 'white',
		marginBottom: 20,
		marginLeft: 9
	},

	container: {
		backgroundColor: "#171328",
		padding: 10,
		paddingTop: 190
	},

	text: {
		fontSize: 20,
		fontWeight: 'bold',
		paddingLeft: 20,
		color: "white", 
		backgroundColor: "#171328"
	},	  

	inputContainer: {
		flexDirection: 'row',  
		alignItems: 'center', 
		marginBottom: 20, 
		marginLeft: 20, 
		marginRight: 20,
		position: 'relative', 
	},

	iconContainer: {
		position: 'absolute',
		right: 10,
		height: '100%',
		justifyContent: 'center',
	},

	input: {
		flex: 1, 
		height: 40,
		margin: 12,
		marginLeft: 25,
		padding: 10,
		width: '70%',
		borderBottomWidth: 1,  
		borderBottomColor: 'white', 
		backgroundColor: 'transparent', 
		color: 'white'  
	},
})
