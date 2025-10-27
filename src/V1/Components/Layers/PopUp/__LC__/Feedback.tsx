import React, { memo, useMemo } from 'react';
import { ActivityIndicator, View, ScrollView } from 'react-native';

import { translations } from '@V1/Translations/index';
import { ThemeService } from '@V1/Services_Core/ThemeService';
import { ConfigService } from '@V1/Services/ConfigService';

import { Text } from '@V1/Text/index';
import { Icon } from '@V1/Icon/index';

export const Feedback = memo((props: {
  showDisplay: boolean
  feedbackMessage: string[]
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.modalPopUp, []);
  const RS     = useMemo(() => translations.component.alert.shared[config.language], []);

  const lastIndex = props.feedbackMessage.length - 1;
  const isDone = (
    props.feedbackMessage[lastIndex] === RS['Done!'] ||
    props.feedbackMessage[lastIndex] === RS['Error!']
  );

  const AllMessages = props.feedbackMessage.map((message, index) => (
    <FeedbackMessage
      key={index}
      message={message}
      isLast={index === lastIndex}
    />
  )).reverse();

  return props.showDisplay ? (
    <View
      style={{
        paddingHorizontal: 10,
        gap: 10,
        maxHeight: 200,
      }}
    >
      <Text h3
        style={{
          alignSelf: 'center',
          color: theme.font,
        }}
      >
        {isDone ? RS['Summary'] : RS['Just a moment...']}
      </Text>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 10,
        }}
      >
        {AllMessages}
      </ScrollView>
    </View>
  ) : <></>;
});

const FeedbackMessage = memo((props: {
  message: string
  isLast: boolean
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.modalPopUp, []);
  const RS     = useMemo(() => translations.component.alert.shared[config.language], []);

  const showActivityIndicator = props.isLast && (
    props.message !== RS['Done!'] && props.message !== RS['Error!']
  );

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 5,
      }}
    >
      {showActivityIndicator ? (
        <ActivityIndicator
          size="small"
          color={theme.font}
        />
      ) : (
        <View
          style={{
            height: 15,
          }}
        >
          <Icon
            iconName={props.message !== RS['Error!'] ? 'checkmark' : 'close'}
            color={props.message !== RS['Error!'] ? theme.confirm : theme.wrong}
          />
        </View>
      )}
      <Text p
        style={{
          textAlign: 'left',
          color: theme.font,
          fontSize: 10,
        }}
      >
        {props.message}
      </Text>
    </View>
  );
});
