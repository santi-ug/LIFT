import { Text, StyleSheet, Pressable, TextStyle } from "react-native";

type LinkProps = {
  text: string;
  onPress: () => void;
  style?: TextStyle; 
};

export default function Link({ text, onPress, style }: LinkProps) {
  return (
    <Pressable onPress={onPress}>
      <Text style={[styles.link, style]}>{text}</Text>  
    </Pressable>
  );
}

const styles = StyleSheet.create({
  link: {
    color: "#5F48D9",
  },
});

