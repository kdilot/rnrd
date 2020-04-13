import { StyleSheet, TextStyle } from 'react-native';

interface Styles {
    ContainerView: any;
    ContainerIconView: any;
    OutlineView: any;
    OutlineTextView: any;
    DisabledView: any;
    TextView: TextStyle;
    DisabledTextView: any;
    IconView: any;
}

export default StyleSheet.create<Styles>({
    ContainerView: (color: string, radius: number) => ({
        width: '100%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color,
        borderRadius: radius,
    }),
    ContainerIconView: (iconSize: number) => ({
        padding: iconSize / 2,
    }),
    OutlineView: (color: number) => ({
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: color,
    }),
    OutlineTextView: (color: number) => ({
        color: color,
    }),
    TextView: {
        color: 'white',
        width: '100%',
        textAlign: 'center',
    },
    IconView: (iconIsRight: boolean, iconSize: number) => ({
        position: 'absolute',
        left: !iconIsRight ? 10 : 'auto',
        right: iconIsRight ? 10 : 'auto',
        width: iconSize,
        height: iconSize,
        backgroundColor: 'red',
    }),
    DisabledView: (outline: boolean) => ({
        backgroundColor: !outline ? 'gray' : 'transparent',
        borderColor: outline ? 'gray' : 'transparent',
    }),
    DisabledTextView: (outline: boolean) => ({
        color: outline ? 'gray' : 'white',
    }),
});
