import React from 'react';
import {View, StyleSheet} from 'react-native';
import AppText from './AppText';
import Icon from 'react-native-vector-icons/FontAwesome';

interface StepCountProps {
  steps: string[];
  currentStep: number;
}

const AppStepCount: React.FC<StepCountProps> = ({
  steps,
  currentStep,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {steps.map((step, index) => {
        const isCompleted = index <= currentStep;
        const isLastStep = index === steps.length - 1;

        return (
          <View key={index} style={styles.stepWrapper}>
            {isCompleted ? (
              <Icon name="dot-circle-o" size={25} color={'#000000'} />
            ) : (
              <Icon name="circle-o" size={25} color={'gray'} />
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
    backgroundColor: '#ccc',
    top: 11,
    left: '50%',
    zIndex: 0,
  },
  completedLine: {
    backgroundColor: '#000',
  },
  stepText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontWeight: '500',
  },
  activeText: {
    color: '#000',
    fontWeight: '500',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default AppStepCount;
