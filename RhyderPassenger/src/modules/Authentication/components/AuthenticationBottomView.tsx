import { StyleSheet, ViewStyle } from "react-native";
import { ShadowCard } from "../../../components";

interface AppTextProps {
  children: React.ReactNode;
  bottomViewStyle: any
}

const AuthenticationBottomView: React.FC<AppTextProps> = ({ children, bottomViewStyle }) => {
  return (
    <ShadowCard style={[styles.card, bottomViewStyle]}>
      {children}
    </ShadowCard>
  )
}

const styles = StyleSheet.create({
  card: { marginTop: 40, backgroundColor: 'white', padding: 20 }
})
export default AuthenticationBottomView;