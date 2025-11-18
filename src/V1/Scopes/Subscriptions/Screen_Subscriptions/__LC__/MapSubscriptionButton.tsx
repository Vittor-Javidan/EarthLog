import { memo, useCallback, useMemo, useState } from "react";
import { Pressable, View } from "react-native";
import { ProductSubscriptionAndroid, ProductSubscriptionAndroidOfferDetails } from "react-native-iap";

import { translations } from "@V1/Translations/index";
import { ThemeService } from "@V1/Services_Core/ThemeService";
import { ConfigService } from "@V1/Services/ConfigService";
import { HapticsService } from "@V1/Services/HapticsService";

import { Icon } from "@V1/Icon/index";
import { Text } from "@V1/Text/index";
import { SubscriptionManager } from "@SubscriptionManager";

export const MapSubscriptionsButton = memo((props: {
  mapSubscription: ProductSubscriptionAndroid[];
  onBuySubscription: (offerToken: string) => void;
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.screen.subscriptions[config.language], []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);

  const [subscription] = props.mapSubscription;
  const [pressed,   setPressed] = useState<boolean>(false);
  const [subscriptionStatus, _] = useState(SubscriptionManager.getStatus());

  const onPressIn = useCallback(() => {
    setPressed(true);
    HapticsService.vibrate('success');
  }, []);

  const onPress = useCallback((offerDetails: ProductSubscriptionAndroidOfferDetails) => {
    HapticsService.vibrate('success');
    props.onBuySubscription(offerDetails.offerToken);
  }, []);

  return (subscriptionStatus.isMapEnabled === false) ? (
    <Pressable
      onPressIn={() => onPressIn()}
      onPressOut={() => setPressed(false)}
      onPress={() => onPress(subscription.subscriptionOfferDetailsAndroid[0])}
      style={{
        borderRadius: 10,
        backgroundColor: pressed ? theme.wrong : theme.background,
        paddingVertical: 5,
        paddingLeft: 10,
        paddingRight: 10,
        elevation: 3,
        gap: 10,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <View>
          <Text h2
            style={{
              color: pressed ? theme.font_active : theme.font,
              textAlign: 'left',
              flexShrink: 1,
              flexWrap: 'wrap',
            }}
          >
            {R['Map Access']}
          </Text>
          <Text p
            style={{
              color: pressed ? theme.font_active : theme.font,
              textAlign: 'left',
              flexShrink: 1,
              flexWrap: 'wrap',
              fontWeight: 'bold',
            }}
          >
            {R['${price}/month'](subscription.displayPrice)}
          </Text>
          <Text p
            style={{
              color: pressed ? theme.background : theme.font,
              textAlign: 'left',
              flexShrink: 1,
              flexWrap: 'wrap',
              fontWeight: 'bold',
            }}
          >
            {R['Auto-renews monthly']}
          </Text>
        </View>
        <Icon
          color={pressed ? theme.background : theme.wrong}
          iconName="map"
          fontSize={50}
        />
      </View>
      <View
        style={{
          gap: 5,
        }}
      >
        <Text p
          style={{
            color: pressed ? theme.font_active : theme.font,
            textAlign: 'left',
            flexShrink: 1,
            flexWrap: 'wrap',
          }}
        >
          {R['Enable the map inside the app']}
        </Text>
        <Text p
          style={{
            color: pressed ? theme.font_active : theme.font,
            textAlign: 'left',
            flexShrink: 1,
            flexWrap: 'wrap',
          }}
        >
          {R['This app does not display ads or sell essential features. However, accessing the interactive map uses paid map services. This small subscription simply covers the map usage costs, keeping the app sustainable.']}
        </Text>
        <Text p
          style={{
            color: pressed ? theme.font_active : theme.font,
            textAlign: 'left',
            flexShrink: 1,
            flexWrap: 'wrap',
          }}
        >
          {R['You can still view your coordinates on Google Maps for free — each GPS entry includes a button to open it on google maps.']}
        </Text>
      </View>
    </Pressable>
  ) : (
    <View
      style={{
        borderRadius: 10,
        backgroundColor: pressed ? theme.wrong : theme.background,
        paddingVertical: 5,
        paddingLeft: 10,
        paddingRight: 10,
        elevation: 3,
        gap: 20,
        borderColor: theme.confirm,
        borderWidth: 2,
      }}
    >
      <Text h2
        style={{
          color: pressed ? theme.font_active : theme.font,
          textAlign: 'left',
          flexShrink: 1,
          flexWrap: 'wrap',
        }}
      >
        {R['Map Access Granted']}
      </Text>
    </View>
  );
});