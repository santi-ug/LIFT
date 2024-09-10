import { Pressable, Text, StyleSheet, TextStyle} from "react-native";

type CustomButtonProps = {
	text: string;
	styleText?: TextStyle; 
  	styleButton?: TextStyle;
	customFun: () => void;
};

export default function CustomButton({ text, styleText, styleButton, customFun }: CustomButtonProps) {
	return ( 
		<Pressable onPress={customFun} style={[styles.button, styleButton]}>
			<Text style={[styles.buttonText, styleText]}>{text}</Text>
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