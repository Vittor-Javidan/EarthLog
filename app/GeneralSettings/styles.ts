import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#000"
    },

    closeLink: {
        position: 'absolute',
        right: 10,
        top: 25,
        zIndex: 10,
    },
    
    closeSvg: {
        opacity: 0.3,
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
    
    scrollView: {
        flex: 1,
        justifyContent: 'flex-end',
    },
});
