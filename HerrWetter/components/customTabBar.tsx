import { Animated, View, Platform, useColorScheme } from "react-native";
import { PlatformPressable } from "@react-navigation/elements";
import { useLinkBuilder } from "@react-navigation/native";
import { darkThemeColors } from "@/theme/darkThemeColors";
import { lightThemeColors } from "@/theme/lightThemeColors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function MyTabBar({ state, descriptors, navigation, position }) {
  const { buildHref } = useLinkBuilder();

  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? darkThemeColors : lightThemeColors;

  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: colors.background,
        opacity: 0.9,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map((i) => (i === index ? 1 : 0.5)),
        });

        return (
          <PlatformPressable
            key={route.key}
            onPress={onPress}
            onLongPress={onLongPress}
            accessibilityRole={Platform.OS === "web" ? "link" : "button"}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            android_ripple={{ color: "transparent" }}
            style={{
              flex: 1,
              alignItems: "center",
              paddingBottom: insets.bottom + 8,
              paddingTop: 12,
            }}
            href={
              Platform.OS === "web"
                ? buildHref(route.name, route.params)
                : undefined
            }
          >
            <Animated.View style={{ opacity, alignItems: "center" }}>
              {options.tabBarIcon?.({
                color: isFocused ? colors.ui.active : colors.text,
                focused: isFocused,
              })}
              <Animated.Text
                style={{
                  color: isFocused ? colors.ui.active : colors.text,
                  fontSize: 12,
                }}
              >
                {label}
              </Animated.Text>
            </Animated.View>
          </PlatformPressable>
        );
      })}
    </View>
  );
}
