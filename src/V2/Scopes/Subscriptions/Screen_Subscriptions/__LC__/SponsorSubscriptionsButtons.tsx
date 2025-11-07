import { memo, useCallback, useMemo, useState } from "react";
import { Pressable, View } from "react-native";
import { ProductSubscriptionAndroid } from "react-native-iap";

import { translations } from "@V2/Translations/index";
import { ThemeService } from "@V2/Services_Core/ThemeService";
import { ConfigService } from "@V2/Services/ConfigService";
import { HapticsService } from "@V2/Services/HapticsService";

import { Icon } from "@V2/Icon/index";
import { Text } from "@V2/Text/index";
import { Button } from "@V2/Button/index";
import { SKU_IDs, SubscriptionManager } from "@SubscriptionManager";

export const SponsorSubscriptionsButton = memo((props: {
  sponsorSubscription: ProductSubscriptionAndroid[];
  onBuySubscription: (o: {
    id: SKU_IDs,
    offerToken: string
  }) => void;
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.screen.subscriptions[config.language], []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);

  const [pressed     , setPressed     ] = useState<boolean>(false);
  const [selectedTier, setSelectedTier] = useState<number>(1);

  props.sponsorSubscription[selectedTier - 1].id

  const offerDetails = props.sponsorSubscription[selectedTier - 1]
  .subscriptionOfferDetailsAndroid[0]
  const price = offerDetails
  .pricingPhases
  .pricingPhaseList[0]
  .formattedPrice

  /*
    The naming here feels a bit off, there is no "wrong" color for sponsors, but
    since we have three colors that tends to be the same, no matter the theme the user
    is currently using, we can repurpose them for the tier.
  */
  let sponsorColor
  switch (selectedTier) {
    case 1: sponsorColor = theme.wrong; break;   // Supporter
    case 2: sponsorColor = theme.warning; break; // Gold
    case 3: sponsorColor = theme.confirm; break; // Emerald
    default: sponsorColor = theme.wrong; break;  // Supporter
  }

  const onPressIn = useCallback(() => {
    setPressed(true);
    HapticsService.vibrate('success');
  }, []);

  const onPress = useCallback(() => {
    HapticsService.vibrate('success');
    const { id } = props.sponsorSubscription[selectedTier - 1];
    const { offerToken } = offerDetails;
    if (SKU_IDs.includes(id as SKU_IDs)) {
      props.onBuySubscription({ id: id as SKU_IDs, offerToken });
    }
  }, [selectedTier]);

  return SubscriptionManager.getStatus().sponsorship === 0 ? (
    <View
      style={{
        borderRadius: 10,
        backgroundColor: pressed ? sponsorColor : theme.background,
        paddingVertical: 5,
        paddingLeft: 10,
        paddingRight: 10,
        elevation: 3,
        gap: 10,
      }}
    >
      <Pressable
        onPressIn={() => onPressIn()}
        onPressOut={() => setPressed(false)}
        onPress={() => onPress()}
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
              color: pressed ? theme.background : theme.font,
              textAlign: 'left',
              flexShrink: 1,
              flexWrap: 'wrap',
            }}
          >
            {R['Sponsor the App']}
          </Text>
          <Text p
            style={{
              color: pressed ? theme.background : theme.font,
              textAlign: 'left',
              flexShrink: 1,
              flexWrap: 'wrap',
            }}
          >
            {R['${price}/month • Auto-renews monthly'](price)}
          </Text>
          <Text p
            style={{
              color: pressed ? theme.background : theme.font,
              textAlign: 'left',
              flexShrink: 1,
              flexWrap: 'wrap',
            }}
          >
            {R['A simple subscription to support the development of the app. Map access is included. After buying this, remember to cancel your map subscription if you had one!']}
          </Text>
        </View>
        <Icon
          color={pressed ? theme.background : sponsorColor}
          iconName="hand-heart"
          fontSize={50}
        />
      </Pressable>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <TierButton
          label={R['Tier 1']}
          value={selectedTier === 1}
          onChange={() => setSelectedTier(1)}
        />
        <TierButton
          label={R['Tier 2']}
          value={selectedTier === 2}
          onChange={() => setSelectedTier(2)}
        />
        <TierButton
          label={R['Tier 3']}
          value={selectedTier === 3}
          onChange={() => setSelectedTier(3)}
        />
      </View>
    </View>
  ) : (
    <SponsoredCard />
  );
});

const TierButton = memo((props: {
  label: string
  value: boolean
  onChange: () => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);

  return (
    <Pressable
      onPress={() => props.onChange()}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        paddingVertical: 5,
      }}
    >
      <Button.Bullet
        value={props.value}
        onChange={props.onChange}
        theme={{
          background: theme.background_Button,
          confirm: theme.confirm,
          font: theme.font,
        }}
      />
      <Text
        style={{
          color: theme.font,
        }}
      >
        {props.label}
      </Text>
    </Pressable>
  );
});

const SponsoredCard = memo(() => {

  const config = useMemo(() => ConfigService.config, []);
  const R      = useMemo(() => translations.screen.subscriptions[config.language], []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].component, []);

  let sponsorColor
  switch (SubscriptionManager.getStatus().sponsorship) {
    case 1: sponsorColor = theme.wrong; break;   // Supporter
    case 2: sponsorColor = theme.warning; break; // Gold
    case 3: sponsorColor = theme.confirm; break; // Emerald
    default: sponsorColor = theme.wrong; break;  // Supporter
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: theme.background,
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
          color: theme.font,
          textAlign: 'left',
          flexShrink: 1,
          flexWrap: 'wrap',
        }}
      >
        {R['You aready sponsoring the app. Thank you for your support!']}
      </Text>
      <Icon
        color={sponsorColor}
        iconName="heart"
        fontSize={50}
      />
    </View>
  )
});