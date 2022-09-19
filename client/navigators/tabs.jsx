// Implementing bottom tabs for the landing page.
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Explore from '../screens/Explore';

// example icons from a package
import { Feather, Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { COLORS } from '../constants';
import Animated from 'react-native-reanimated';

// a list of all tabs. We may add more in future.
//For the options object:  you can see a list of available options from the docs.
const tabs = [
	{
		name: 'Home',
		Component: Home,
		options: {
			tabBarIcon: ({ color, size }) => (
				<Ionicons name="ios-home" size={size} color={color} />
			),
		},
	},
	{
		name: 'Explore',
		Component: Explore,
		options: {
			tabBarIcon: ({ color, size }) => (
				<Feather name="search" size={size} color={color} />
			),
		},
	},
	{
		name: 'Menu',
		Component: Home,
		options: {
			tabBarIcon: ({ color, size }) => (
				<Feather name="menu" size={size} color={color} />
			),
		},
		listeners: ({ navigation }) => ({
			tabPress: (e) => {
				e.preventDefault();
				navigation.toggleDrawer();
			},
		}),
	},
];

const BottomTabs = createBottomTabNavigator();

const Tabs = ({ drawerAnimatedStyle }) => {
	const theme = useTheme();

	return (
		<>
			<BottomTabs.Navigator
				screenOptions={() => {
					return {
						tabBarLabelStyle: {
							fontSize: 14,
						},
						tabBarActiveTintColor:
							theme.name === 'dark' ? COLORS.white1 : COLORS.deepBlue,
						tabBarHideOnKeyboard: true,
						tabBarStyle: {
							backgroundColor:
								theme.name === 'dark' ? COLORS.darkPurple : COLORS.white1,
							height: 70,
							paddingBottom: 10,
							borderTopWidth: 0,
						},
						headerShown: false,
					};
				}}
			>
				{tabs.map(({ name, Component, options, props, listeners }) => {
					return (
						<BottomTabs.Screen
							key={name}
							name={name}
							options={options}
							listeners={listeners}
						>
							{(p) => <Component {...p} {...props} />}
						</BottomTabs.Screen>
					);
				})}
			</BottomTabs.Navigator>
		</>
	);
};

export default Tabs;
