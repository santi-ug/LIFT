import { View, StyleSheet, TextStyle } from "react-native";
import { Link } from "expo-router";
import React from "react";

type LinkButtonProps = {
  text: string;
  href: string;
  styleLink?: TextStyle; 
  styleButton?: TextStyle; 
  icon?: React.ReactNode;  
}

export default function LinkButton({ text, href, styleLink, styleButton, icon }: LinkButtonProps) {
  return (
    <View style={[styles.button, styleButton]}>
      {icon && <View style={styles.iconContainer}>{icon}</View>} 
      <Link href={href} style={[styles.link, styleLink]}>
        {text}
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row',  // Alinea ícono y texto en una fila
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 'auto',
  },
  iconContainer: {
    marginRight: 8,  // Añade espacio entre el ícono y el texto
  },
  link: {
    fontWeight: 'semibold',
  },
});
