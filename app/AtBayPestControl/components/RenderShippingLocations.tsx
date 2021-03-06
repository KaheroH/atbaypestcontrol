import React from 'react'
import {Text, TouchableOpacity, useColorScheme, View} from 'react-native'
import { Icon } from 'react-native-elements'
import {getStyle} from '../assets/Stylesheets/Styles'
import Address from "../assets/Classes/Address";

export default function renderItem ({address, index, onPressPlace}: renderProps) {

    const scheme = useColorScheme();
    let styles = getStyle(scheme);

    return (
        <TouchableOpacity onPress={() => onPressPlace()}>
            <View style={styles.container}>
                <View style={styles.iconRow}>
                    {index === 0 && (
                        <Icon
                            name= 'place'
                            underlayColor = 'transparent'
                            iconStyle={styles.Icon}
                            onPress={() => onPressPlace()}
                        />
                    )}
                </View>
                <View style={styles.Row}>
                    <View style={styles.column}>
                        <Text style={styles.Text}>{address.getAddress() + ', ' + address.getCity()}</Text>
                    </View>
                    <View style={styles.nameColumn}>
                        {address.getState().length !== 0 && (
                            <Text style={styles.subText}>{address.getState() + ', ' + address.getZip()}</Text>
                        )}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

interface renderProps {
    address: Address
    index: number
    onPressPlace: () => void
}