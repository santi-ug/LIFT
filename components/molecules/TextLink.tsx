import { Text, TextStyle, StyleSheet } from "react-native";
import { Link } from "expo-router"; 

type TextWithLinkProps = {
    text: string;          
    linkHref: string;          
    textLink: string;           
    textStyle?: TextStyle;     
    linkStyle?: TextStyle;     
};

export default function TextLink({ text, linkHref, textLink, textStyle, linkStyle }: TextWithLinkProps) {
  return (
    <Text style={[styles.text, textStyle]}>
      {text}
      <Link href={linkHref} style={linkStyle}>{textLink}</Link>.
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: "black",
  },
});
