import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { Surface } from "react-native-paper";

interface ShadowCardProps {
  children: React.ReactNode;
  style?: any;
}

const ShadowCard: React.FC<ShadowCardProps> = ({
  children,
  style,
}) => {
  return (
    <Surface style={[styles.card, style]}>
      {children}
    </Surface>
  );
};

const styles = StyleSheet.create({
  card: {
    elevation: 4, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});

export default ShadowCard;
