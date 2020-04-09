import * as React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import S from './styles';

interface Props {
    onPress: () => void | null;
    value: string;
    color?: string;
    icon?: String;
    activeOpacity?: number;
    iconSize?: number;
    iconIsRight?: boolean;
    outline?: boolean;
    disabled?: boolean;
    radius?: number;
    textStyle?: object;
    conatinerStyle?: object;
}

export default class ButtonComponent extends React.PureComponent<Props> {
    static defaultProps: Props = {
        activeOpacity: 0.8,
        value: 'button',
        radius: 3,
        outline: false,
        disabled: false,
        iconSize: 20,
        iconIsRight: false,
        color: '#337ab7',
        onPress: null,
    };
    constructor(props: Props) {
        super(props);
    }

    render() {
        const {
            activeOpacity,
            color,
            radius,
            conatinerStyle,
            outline,
            textStyle,
            value,
            onPress,
            icon,
            disabled,
            iconIsRight,
            iconSize,
        } = this.props;
        return (
            <TouchableOpacity
                style={[
                    S.ContainerView(color, radius),
                    icon && S.ContainerIconView(iconSize),
                    outline && S.OutlineView(color),
                    disabled && S.DisabledView(outline),
                    conatinerStyle,
                ]}
                activeOpacity={activeOpacity}
                disabled={disabled}
                onPress={onPress}>
                <Text
                    style={[
                        S.TextView,
                        outline && S.OutlineTextView(color),
                        disabled && S.DisabledTextView(outline),
                        textStyle,
                    ]}>
                    {value}
                </Text>
                {icon && <View style={S.IconView(iconIsRight, iconSize)} />}
            </TouchableOpacity>
        );
    }
}
