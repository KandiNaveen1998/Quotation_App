import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useError } from '../utils/hooks/errorContext';
import { useToast } from '../utils/hooks/ToastContext';

const MyComponent: React.FC = () => {
    const { error, throwError, clearError } = useError();
    const { showToast } = useToast();

    const handleClick = () => {
        try {
            // Simulate error
            throw new Error('Something went wrong!');
        } catch (err: any) {
            throwError(err.message);
        }
    };

    return (
        <View style={styles.container}>
            {error && (
                <View style={styles.errorBox}>
                    <Text style={styles.errorText}>{error.message}</Text>
                    <Button title="Clear Error" onPress={clearError} />
                </View>
            )}
            <Button title="Trigger Error" onPress={handleClick} />

            <View style={{ padding: 20 }}>
                <Button title="Show Success Toast" onPress={() => showToast('Saved successfully!', 'success')} />
                <Button title="Show Error Toast" onPress={() => showToast('Something went wrong!', 'error')} />
            </View>
        </View>
    );
};

export default MyComponent;

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    errorBox: {
        backgroundColor: '#ffdddd',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    errorText: {
        color: '#cc0000',
        marginBottom: 5,
    },
});
