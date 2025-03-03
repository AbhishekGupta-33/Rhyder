import {StyleSheet} from 'react-native';
import {ShadowCard} from '../../../components';
import useTheme from '../../../hooks/useTheme';

interface AppTextProps {
  children: React.ReactNode;
  bottomViewStyle?: any;
}

const AuthenticationBottomView: React.FC<AppTextProps> = ({
  children,
  bottomViewStyle,
}) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    card: {
      marginTop: theme.margin.margin_40,
      backgroundColor: theme.colors.white,
      padding: theme.spacing.spacing_20,
      borderTopLeftRadius: theme.radius.borderRadius_30,
      borderTopRightRadius: theme.radius.borderRadius_30,
    },
  });

  return (
    <ShadowCard style={[styles.card, bottomViewStyle]}>{children}</ShadowCard>
  );
};

export default AuthenticationBottomView;
