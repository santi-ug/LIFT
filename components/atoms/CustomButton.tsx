import { Pressable, Text, StyleSheet } from "react-native";

type CustomButtonProps = {
	text: string;
	customFun: () => void;
};

export default function CustomButton({ text, customFun }: CustomButtonProps) {
	return ( 
		<Pressable onPress={customFun} style={styles.button}>
			<Text style={styles.buttonText}>{text}</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
	  backgroundColor: 'black',
	  padding: 10,
	  height: 50,
	  borderRadius: 5,
	  alignItems: 'center',
	  justifyContent: 'center',
	},

	buttonText: {
	  color: 'white',
	  fontWeight: 'bold',
	  fontSize: 16,  
	},
  });