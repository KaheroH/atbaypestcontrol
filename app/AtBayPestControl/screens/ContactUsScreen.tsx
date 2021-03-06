import * as React from 'react';
import {Card, Icon} from 'react-native-elements';
import {
    ScrollView,
    useColorScheme,
    ImageBackground,
    Image,
    TouchableOpacity,
    Text,
    View, Pressable, Appearance
} from 'react-native';
import {getStyle} from '../assets/Stylesheets/Styles'
import Email from '../components/RenderEmail'
import Payment from '../components/RenderPayment'
import ShippingLocations from '../components/RenderShippingLocations';
import Separator from '../components/Separator'
import {PLAN} from "../assets/Data/Data";
import { useNavigation } from '@react-navigation/native';
import PlanTabScreen from "./PlanTabScreen";
import LoginScreen from "./LoginScreen";
import {getUser} from "../assets/Data/Data";
import {deleteProfile, noProductText, planBriefDescription, planTitle} from "../assets/text/text";
import {changePlan, LOG_OUT} from "../redux/action";
import {useDispatch} from "react-redux";
import images from "../assets/images";
import Contact from "../components/Contact";
import {contactUs, contactUsDescription} from "../assets/text/text";
import ProductItem from "../components/ProductItem";

export default function ContactUsScreen ({route, params} :any) {
    const styles = getStyle(Appearance.getColorScheme());
    return(
        <View style={styles.screen}>
            <View style={[styles.header, {flexWrap: 'wrap'}]}>
                <Text style={[styles.title, {marginBottom: 2}]}>
                    {contactUs()}
                </Text>
                <Text style={[styles.caption, {marginBottom: 0}]}>
                    {contactUsDescription()}
                </Text>
            </View>
          <ScrollView>
                <View style={styles.container}>
                    {Contact(0)}
                    {Contact(1)}
                    {Contact(2)}
                    {Contact(3)}
                    {Contact(4)}
                </View>
          </ScrollView>
        </View>
);

}
