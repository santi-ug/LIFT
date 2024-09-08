import { View, Text, StyleSheet } from "react-native";

export default function DividerWithText({ text }: { text: string }) {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>{text}</Text>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 27,
    marginBottom: 5,
    marginTop: 32
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'white',
  },

  text: {
    marginHorizontal: 10,
    fontSize: 15,
    color: 'white',
  },
});
