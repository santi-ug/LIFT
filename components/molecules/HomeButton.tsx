import { View, StyleSheet } from "react-native"
import { Link } from "expo-router"

type HomeButtonProps = {
  text: string,
  href: string,
}

export default function HomeButton({ text, href }: HomeButtonProps) {
  return (
    <View style={[styles.button]}>
      <Link href={href} style={styles.link}>
        { text }
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '80%',
    height: 100,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 'auto',
    backgroundColor: 'black',
  },
  link: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white'
  },
})