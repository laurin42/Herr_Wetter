import React from "react";
import { RefreshControl, ScrollView, useColorScheme } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import CurrentWeatherCard from "@/components/currentWeatherCard";
import { darkThemeColors } from "@/theme/darkThemeColors";
import { lightThemeColors } from "@/theme/lightThemeColors";

export default function WeatherScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = React.useState(false);

  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? darkThemeColors : lightThemeColors;

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaProvider
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <SafeAreaView>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <CurrentWeatherCard />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
