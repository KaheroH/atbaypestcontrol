import * as React from 'react';
import {Card} from 'react-native-elements';
import {
    ScrollView,
    useColorScheme,
    View, Button
} from 'react-native';
import {buttonColor, getOffButtonColor, getStyle} from '../assets/Stylesheets/Styles'
import { useNavigation } from '@react-navigation/native';
import {getUser} from "../assets/Data/Data";
import {notUpdated, submit, usernameExists} from "../assets/text/text";
import Editable from "../components/Editable";
import {useState} from "react";
import {updateUsernamePasswordOnline} from "../assets/Data/Storage";
import {makeAlert} from "../components/errorMessage";

export default function EditAddresses() {
    const scheme = useColorScheme();
    let styles = getStyle(scheme);
    const navigation = useNavigation();

    const user = getUser();

    const [username, setUsername] = useState(user.getUserName());
    const [password, setPassword] = useState(user.getPassword());
    const [updating, setUpdating] = useState(false);

    let name = <Editable type={"Address"}
                         textIn={username}
                         editText={setUsername}/>;

    let passwordBox = <Editable textIn={password}
                                editText={setPassword}
                                type={"Password"}/>;

    let pressButton = () => {
        if(!updating) {
            let oldUsername = user.getUserName();
            let oldPassword = user.getPassword();
            user.changeUserName(username);
            user.changePassword(password);
            setUpdating(true);
            updateUsernamePasswordOnline(
                () => {
                    user.changeUserName(oldUsername);
                    user.changePassword(oldPassword);
                    makeAlert(notUpdated());
                    setUpdating(false);
                },
                () => {
                    setUpdating(false);
                    navigation.navigate("ProfileTabScreen", {changed: true});
                },
                () => {
                    user.changeUserName(oldUsername);
                    user.changePassword(oldPassword);
                    makeAlert(usernameExists());
                    setUpdating(false);
                }
            )
        }
    }

    let getButtonColor = () => {
        if (updating) {
            return getOffButtonColor(scheme);
        } else {
            return buttonColor
        }
    }

    let endButton =
        <View style={styles.deleteProfile}>
            <Button
                title={submit()}
                onPress={pressButton}
                color={getButtonColor()}/>
        </View>


    return (
        <ScrollView style={styles.scroll}>
            <View style={styles.container}>
                <Card containerStyle={[styles.cardContainer]}>
                    {name}
                    {passwordBox}
                    {endButton}
                </Card>
            </View>
        </ScrollView>

    )
};

