// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// interface ToastComponentProps {
//   message: string;
//   type?: 'success' | 'error' | 'info';
// }

// const ToastComponent: React.FC<ToastComponentProps> = ({ message, type = 'info' }) => {
//   const { backgroundColor, iconName } = getToastStyle(type);

//   return (
//     <View style={[styles.toastContainer, { backgroundColor }]}>
//       <MaterialIcons name={iconName} size={22} color="#fff" style={styles.icon} />
//       <Text style={styles.toastText}>{message}</Text>
//     </View>
//   );
// };

// export default ToastComponent;

// const styles = StyleSheet.create({
//   toastContainer: {
//     position: 'absolute',
//     bottom: 60,
//     left: 20,
//     right: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 18,
//     backgroundColor: '#333',
//     borderRadius: 18,
//     zIndex: 9999,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   toastText: {
//     color: '#fff',
//     fontSize: 14.5,
//     fontWeight: '500',
//     flexShrink: 1,
//   },
//   icon: {
//     marginRight: 10,
//   },
// });

// const getToastStyle = (type: 'success' | 'error' | 'info') => {
//   switch (type) {
//     case 'success':
//       return { backgroundColor: '#38A169', iconName: 'check-circle' }; // green-600
//     case 'error':
//       return { backgroundColor: '#E53E3E', iconName: 'error-outline' }; // red-600
//     case 'info':
//     default:
//       return { backgroundColor: '#3182CE', iconName: 'info-outline' }; // blue-600
//   }
// };
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';

type ToastType = 'success' | 'error' | 'info';

interface Props {
  message: string;
  type?: ToastType;
  duration?: number;
}

const ToastComponent: React.FC<Props> = ({ message, type = 'info', duration = 2500 }) => {
  const slideAnim = useRef(new Animated.Value(100)).current; // starts off screen
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate in
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Animate out after delay
    const timeout = setTimeout(() => {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 100,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }, duration);

    return () => clearTimeout(timeout);
  }, [slideAnim, opacityAnim, duration]);

  const backgroundColor = {
    success: '#4CAF50',
    error: '#F44336',
    info: '#2196F3',
  }[type];

  return (
    <Animated.View
      style={[
        styles.toast,
        {
          backgroundColor,
          opacity: opacityAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    zIndex: 1000,
    elevation: 5,
    maxWidth: '90%',
  },
  toastText: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
  },
});

export default ToastComponent;
