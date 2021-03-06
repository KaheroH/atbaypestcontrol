import React, {useState} from 'react'
import {Button, Text, TextInput, TouchableOpacity, useColorScheme, View} from 'react-native'
import {buttonColor, getStyle} from '../assets/Stylesheets/Styles'
import {Input} from "react-native-elements";
import {getUser} from "../assets/Data/Data";
import {loginText} from '../assets/Data/allTextLogin'
import InputBox from "../components/RenderTextBox";
import {StackActions} from "react-navigation";
import {useDispatch} from "react-redux";
import {LOG_IN, logIn} from "../redux/action";
import {getUserFromOnline} from "../assets/Data/Storage";

export default function LoginScreen ({route, navigation}: any) {
    const params = route.params;
    let goingBack = false;
    if(params != undefined){
        //I think this is the only way to make an optional screen parameter
        goingBack = params.goingBack;
    }

    const [isSubmitted, submit] = useState(false);

    const dispatch = useDispatch();

    const scheme = useColorScheme();
    let styles = getStyle(scheme);
    let User = getUser();

    let InputArray = loginText.map(function(Text, index) {
        return  <InputBox
                    key={index}
                    errorMessage={Text.getErrorMessage()}
                    type={Text.getType()}
                    placeHolder={Text.getPlaceHolder()}
                    onSubmitEditing={Text.onSubmit}
                    submitted = {isSubmitted}
                />
    })

    function onPressText () {
        User.changeUserName('')
        User.changePassword('')
        navigation.navigate('RegisterScreen', {goingBack: goingBack})
    }

    function onPressButton () {
        if (User.validatePassword() === '') {
            const onSuccess = () => {
                getUser().logIn();
                if(goingBack){
                    navigation.goBack();
                }
                dispatch(logIn());
            }
            getUserFromOnline('kobin',
                'asdfghjk',
                () => console.log('error'),
                onSuccess,
                () => console.log('incorrect username/password'));
        } else {
            submit(true);
        }
    }

    return (
        <View style={styles.loginContainer}>
            <View style={styles.loginHeadContainer}>
                <Text style={styles.loginText}>Login</Text>
                <Text style={styles.subText}>Please enter your login information</Text>
            </View>
            <View style={styles.loginHeadContainer}>
                <View style={styles.textArray}>
                    {InputArray}
                </View>
                <TouchableOpacity>
                    <Button  title={'Submit'} onPress={onPressButton} color={buttonColor}/>
                </TouchableOpacity>
                <View style={styles.wordRow}>
                    <Text style={styles.subText}>Don't have an account? </Text>
                    <Text style={styles.hyperLink} onPress={onPressText}>Register here</Text>
                </View>
            </View>
        </View>
    )
}