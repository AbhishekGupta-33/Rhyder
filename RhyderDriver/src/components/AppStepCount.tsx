import React from 'react';
import {View, StyleSheet} from 'react-native';
import AppText from './AppText';
import Icon from 'react-native-vector-icons/FontAwesome';
import useTheme from '../hooks/useTheme';

interface StepCountProps {
  steps: string[];
  currentStep: number;
  style: any;
}

const AppStepCount: React.FC<StepCountProps> = ({
  steps,
  currentStep,
  style,
}) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    stepWrapper: {
      alignItems: 'center',
      flexDirection: 'column',
      flex: 1,
    },
    line: {
      position: 'absolute',
      width: '100%',
      height: 2,
      backgroundColor: theme.colors.white,
      top: 11,
      left: '50%',
      zIndex: 0,
    },
    completedLine: {
      backgroundColor: theme.colors.black,
    },
    stepText: {
      fontSize: theme.fontSize.font_12,
      color: theme.colors.gray,
      textAlign: 'center',
      fontWeight: '500',
    },
    activeText: {
      color: theme.colors.black,
      fontWeight: '500',
      fontSize: theme.fontSize.font_12,
      textAlign: 'center',
    },
  });

  return (
    <View style={[styles.container, style]}>
      {steps.map((step, index) => {
        const isCompleted = index <= currentStep;
        const isLastStep = index === steps.length - 1;

        return (
          <View key={index} style={styles.stepWrapper}>
            {isCompleted ? (
              <Icon
                name="dot-circle-o"
                size={theme.fontSize.font_25}
                color={theme.colors.black}
              />
            ) : (
              <Icon
                name="circle-o"
                size={theme.fontSize.font_25}
                color={theme.colors.gray}
              />
            )}

            {!isLastStep && (
              <View
                style={[styles.line, isCompleted && styles.completedLine]}
              />
            )}

            <AppText
              style={[styles.stepText, isCompleted && styles.activeText]}>
              {step}
            </AppText>
          </View>
        );
      })}
    </View>
  );
};

export default AppStepCount;
