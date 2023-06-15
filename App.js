import { NavigationContainer } from "@react-navigation/native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useContext, useEffect, useState } from "react";
import GiftContextProvider, { GiftContext } from "./store/giftContext";

import List from "./screens/List";
import ImageList from "./screens/ImageList";
import ComposeMsg from "./screens/composeMsg";
import PreviewScreen from "./screens/previewScreen";
import Notifications from "./screens/notifications";
import Secondary from "./screens/secondary";
import VideoPlayer from "./screens/videoPlayer";

const Stack = createSharedElementStackNavigator();

export default function App() {
  useEffect(() => {
    async function prepare() {
      SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const [fontsLoaded] = useFonts({
    "monoSpace-regular": require("./assets/monospace/Nunito-VariableFont_wght.ttf"),
    "monoSpace-bold": require("./assets/fontsSpace/SpaceMono-Bold.ttf"),
    cursive: require("./assets/Cedarville_Cursive/CedarvilleCursive-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <>
      <GiftContextProvider>
        <StatusBar style="light" />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="list" component={List} />
            <Stack.Screen
              name="image"
              component={ImageList}
              options={() => ({
                // gestureEnabled: true,
                transitionSpec: {
                  open: { animation: "timing", config: { duration: 1000 } },
                  close: { animation: "timing", config: { duration: 1000 } },
                },
              })}
            />
            <Stack.Screen name="composeMsg" component={ComposeMsg} />
            <Stack.Screen
              name="previewScreen"
              component={PreviewScreen}
              options={() => ({
                // gestureEnabled: true,
                transitionSpec: {
                  open: { animation: "timing", config: { duration: 1000 } },
                  close: { animation: "timing", config: { duration: 1000 } },
                },
              })}
            />
            <Stack.Screen name="notifications" component={Notifications} />
            <Stack.Screen name="secondary" component={Secondary} />
            <Stack.Screen name="videoPlayer" component={VideoPlayer} />
          </Stack.Navigator>
        </NavigationContainer>
      </GiftContextProvider>
    </>
  );
}
