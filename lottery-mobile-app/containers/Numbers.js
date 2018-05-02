import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default ({ 
    numbers, isLoading, onNumbersPress 
}) => 
    (
        <View style={styles.container}>
        <Text style={styles.title}>Numbers</Text>
            <View style={styles.numbers}>
                <Text style={styles.text}>N1</Text>
                <Text style={styles.text}>N2</Text>
                <Text style={styles.text}>N3</Text>
                <Text style={styles.text}>N4</Text>
                <Text style={styles.text}>N5</Text>
                <Text style={styles.text}>N6</Text>                
            </View> 
            <Text style={styles.title}>Stars</Text>       
            <View style={styles.stars}>
                <Text style={styles.text}>S1</Text>
                <Text style={styles.text}>S2</Text>
            </View>
            <Button
                onPress={onNumbersPress}
                title="Generate new combination"
                color="#841584"
                accessibilityLabel="Click to generate new numbers combination."
            />
        </View>        
    );

const styles = StyleSheet.create({
    container: {     
        alignSelf: 'stretch',                        
        justifyContent: 'space-evenly',   
    },
    numbers: {                         
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-evenly',        
        alignItems: 'center',
        padding: 20 
    },
    stars: {        
        justifyContent: 'space-evenly',
        alignSelf: 'stretch',
        flexDirection: 'row',         
    },
    text: {
        borderWidth: 1, 
        borderColor: 'darkslategray', 
        borderRadius: 12, 
        padding: 15, 
        height: 100,        
        textAlign: 'center',
        textAlignVertical: "center",        
    },
    title: {
        textAlign: 'center',    
        fontSize: 30,   
         
    }
});