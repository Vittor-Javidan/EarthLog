import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    
    background: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#000"
    },

    container_CLoseButton: {
        position: 'absolute',
        right: 10,
        top: 25,
        zIndex: 10,
    },
    
    image_CLoseButton: {
        opacity: 0.5,
        width: 50,
        height: 50,
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

    link: {
        height: 60,
        backgroundColor: "#FFFFFF",
        fontSize: 32,
        textAlign: 'center',
        textAlignVertical: 'center'
    }
});
