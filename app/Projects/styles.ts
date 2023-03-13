import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#000",
        
    },

    title: {
        paddingVertical: 50,

        textAlign: "center",
        fontSize: 64,
        fontWeight: "bold",
        color: "#FFFFFF",

        textShadowColor: "#000000",
        textShadowOffset: {height: 4, width: 4},
        textShadowRadius: 10,
    },
    
    link: {
        paddingVertical: 35,
        backgroundColor: "#208C1E",

        textAlign: 'center',
        fontSize: 32,
        color: "#FFFFFF"
    },
});
