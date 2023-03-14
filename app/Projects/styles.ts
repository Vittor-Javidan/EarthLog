import { StyleSheet } from 'react-native';

export const projectScreenStyles = StyleSheet.create({
    
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#000",
        
    },

    title: {
        paddingVertical: 60,
        paddingHorizontal: 20,
    
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
})

export const generalSettingsButtonStyles = StyleSheet.create({
    
    link: {
        position: 'absolute',
        right: 10,
        top: 25,
        zIndex: 10,
    },
    
    svg: {
        opacity: 0,
        width: 50,
        height: 50
    },
    
    image: {
        position: 'absolute',
        right: 10,
        top: 25,
        zIndex: 9,
        height: 50,
        width: 50,
        opacity: 0.3,
    }
})
