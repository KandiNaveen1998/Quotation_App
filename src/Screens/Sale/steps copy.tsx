import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StepsType } from './saleForm';
import { useFormContext } from 'react-hook-form';

interface Step {
    label: string;
    completed: boolean;
    cancelled?: boolean; // NEW
    displayName: string;
}

interface StepperProps {
    initialSteps: Step[];
    onStepChange: (steps: StepsType) => void;
}

const Stepper: React.FC<StepperProps> = ({ initialSteps, onStepChange }) => {
    const [steps, setSteps] = useState<Step[]>(initialSteps);
    const { control, setValue, formState: { errors }, trigger } = useFormContext();


    // const handleStepPress = (index: number) => {
    //     const updatedSteps = steps.map((step, idx) => ({
    //         ...step,
    //         completed: idx <= index,
    //     }));
    //     setSteps(updatedSteps);
    // };

    const handleStepPress = (index: number) => {
        const isLastStep = index === steps.length - 1;

        const updatedSteps = steps.map((step, idx) => {
            if (isLastStep) {
                if (idx < index) {
                    // Always complete previous steps
                    return { ...step, completed: true, cancelled: false };
                }
                if (idx === index) {
                    // Special toggle for last step
                    if (!step.completed && !step.cancelled) {
                        return { ...step, label: 'Completed', completed: true, cancelled: false };
                    } else if (step.completed && !step.cancelled) {
                        return { ...step, label: 'Cancelled', completed: false, cancelled: true };
                    } else if (!step.completed && step.cancelled) {
                        return { ...step, label: 'Completed', completed: false, cancelled: false };
                    }
                }
                return step;
            } else {
                // Normal behavior for other steps
                return {
                    ...step,
                    completed: idx <= index,
                    // cancelled: false,
                };
            }
        });
        setSteps(updatedSteps);
    };



    // useEffect(() => {
    //     if (onStepChange) {
    //         onStepChange(steps);
    //     }
    // }, [steps, onStepChange]);

    const transformSteps = (steps: any[]) => {
        const result: Record<string, { status: boolean; description: string }> = {};

        steps.forEach((step) => {
            const key = step.value;

            // if (key === 'completed') {
            if (key === 'status' && step.completed) {

                result[key] = {
                    status: step.completed, // if completed true or cancelled true
                    description: step.completed && 'Completed',
                };
            } else if (key === 'status' && step.cancelled) {

                result[key] = {
                    status: step.cancelled, // if completed true or cancelled true
                    description: step.cancelled && 'rejected',
                };
            } else {
                result[key] = {
                    status: step.completed,
                    description: '',
                };
            }
        });

        return result;
    };



    useEffect(() => {
        if (steps) {
            // console.log('result 0', steps)
            let result = transformSteps(steps);
            // console.log('result', result);
            setValue('steps', result);
        }
    }, [steps, setValue]);

    return (
        <View style={styles.container}>
            {steps.map((step, index) => (
                <View key={index} style={styles.stepContainer}>
                    <View style={styles.circleContainer}>
                        {/* Line before the circle */}
                        {/* {index !== 0 && (
                            <View
                                style={[
                                    styles.line,
                                    step.completed ? styles.completedLine : styles.incompleteLine,
                                ]}
                            />
                        )} */}
                        {index !== 0 && (
                            <View
                                style={[
                                    styles.line,
                                    steps[index].cancelled
                                        ? styles.cancelledLine
                                        : steps[index].completed
                                            ? styles.completedLine
                                            : styles.incompleteLine,
                                ]}
                            />
                        )}
                        {/* <TouchableOpacity
                            style={[
                                styles.circle,
                                step.completed ? styles.completedCircle : styles.incompleteCircle
                            ]}
                            onPress={() => handleStepPress(index)}
                            activeOpacity={0.8}
                        >
                            {step.completed && (
                                <Ionicons name="checkmark" size={18} color="white" />
                            )}
                        </TouchableOpacity> */}
                        <TouchableOpacity
                            style={[
                                styles.circle,
                                step.completed
                                    ? styles.completedCircle
                                    : step.cancelled
                                        ? styles.cancelledCircle
                                        : styles.incompleteCircle,
                            ]}
                            onPress={() => handleStepPress(index)}
                            activeOpacity={0.8}
                        >
                            {step.completed && (
                                <Ionicons name="checkmark" size={18} color="white" />
                            )}
                            {!step.completed && step.cancelled && (
                                <Ionicons name="close" size={18} color="white" />
                            )}
                        </TouchableOpacity>
                        {/* Line after the circle
                        {index !== steps.length - 1 && (
                            <View
                                style={[
                                    styles.line,
                                    step.completed ? styles.completedLine : styles.incompleteLine
                                ]}
                            />
                        )} */}
                    </View>
                    <Text style={styles.label}>{step.displayName}</Text>
                </View>
            ))}
        </View>
    );
};

const CIRCLE_SIZE = 30;
const LINE_SIZE = 10;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginVertical: 20,
        paddingHorizontal: 10,
    },
    cancelledCircle: {
        backgroundColor: '#ff4d4f', // Red color for cancelled
    },
    cancelledLine: {
        backgroundColor: '#ff4d4f', // Red color
        width: LINE_SIZE,
    },
    stepContainer: {
        flex: 1,
        alignItems: 'center',
    },
    circleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    circle: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE / 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d6e4ff',

    },
    completedCircle: {
        backgroundColor: '#0057FF',

    },
    incompleteCircle: {
        backgroundColor: '#d6e4ff',
    },
    label: {
        fontSize: 10,
        color: '#8c8c8c',
        marginTop: 8,
        textAlign: 'center',
        // width: 70,
    },
    line: {
        height: 2,
        flex: 1,
        marginLeft: 4,
        marginRight: 4,
        backgroundColor: '#d6e4ff',
        width: LINE_SIZE,
    },
    completedLine: {
        backgroundColor: '#0057FF',
        width: LINE_SIZE,

    },
    incompleteLine: {
        backgroundColor: '#d6e4ff',
        width: LINE_SIZE,

    },
});

export default Stepper;
