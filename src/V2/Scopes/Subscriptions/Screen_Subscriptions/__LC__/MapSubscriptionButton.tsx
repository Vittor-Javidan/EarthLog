import { memo, useCallback, useMemo, useState } from "react";
import { Pressable, View } from "react-native";
import { ProductSubscriptionAndroid, ProductSubscriptionAndroidOfferDetails } from "react-native-iap";

import { translations } from "@V2/Translations/index";
import { ThemeService } from "@V2/Services_Core/ThemeService";
import { ConfigService } from "@V2/Services/ConfigService";
import { HapticsService } from "@V2/Services/HapticsService";

import { Icon } from "@V2/Icon/index";
import { Text } from "@V2/Text/index";
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
        gap: 20,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            flex: 1,
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
            {'Map Access'}
          </Text>
          <Text p
            style={{
              color: pressed ? theme.font_active : theme.font,
              textAlign: 'left',
              flexShrink: 1,
              flexWrap: 'wrap',
            }}
          >
            {`${subscription?.displayPrice}/month • Auto-renews monthly`}
          </Text>
          <Text p
            style={{
              color: pressed ? theme.font_active : theme.font,
              textAlign: 'left',
              flexShrink: 1,
              flexWrap: 'wrap',
            }}
          >
            {'Enable the map inside the app'}
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
          {'This app does not display ads or sell essential features. However, accessing the interactive map uses paid map services. This small subscription simply covers the map usage costs, keeping the app sustainable.'}
        </Text>
        <Text p
          style={{
            color: pressed ? theme.font_active : theme.font,
            textAlign: 'left',
            flexShrink: 1,
            flexWrap: 'wrap',
          }}
        >
          {'You can still view your coordinates on Google Maps for free — each GPS entry includes an external link to open it there.'}
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
        {'Map Access Granted'}
      </Text>
    </View>
  );
});