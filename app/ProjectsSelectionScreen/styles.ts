import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#000",
        
    },

    container_SettingButton: {
        position: 'absolute',
        right: 10,
        top: 25,
        zIndex: 10,
    },
    
    image_SettingButton: {
        opacity: 0.5,
        width: 50,
        height: 50,
        zIndex: 9,
    },

    screenTitle: {
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

    view_NewProjectButton: {
        paddingVertical: 35,
        backgroundColor: "#208C1E",
    },

    text_NewProjectButton: {
        textAlign: 'center',
        fontSize: 32,
        color: "#FFFFFF"
    }
})
