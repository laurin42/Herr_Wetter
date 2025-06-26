import FontAwesome from "@expo/vector-icons/FontAwesome";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { MyTabBar } from "@/components/customTabBar";
import WeatherScreen from "./weather";
import SettingsScreen from "./settings";

const Tab = createMaterialTopTabNavigator();

export default function TabLayout() {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      tabBar={(props) => <MyTabBar {...props} />}
    >
      <Tab.Screen
        name="weather"
        component={WeatherScreen}
        options={{
          title: "Wetter",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="cloud" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="settings"
        component={SettingsScreen}
        options={{
          title: "Einstellungen",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="cog" color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
