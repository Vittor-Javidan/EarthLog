import React, { memo, useCallback, useMemo, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';

import { ProjectDTO, ProjectSettings } from '@Types/ProjectTypes';
import CacheService from '@Services/CacheService';
import ConfigService from '@Services/ConfigService';
import HapticsService from '@Services/HapticsService';
import ThemeService from '@Services/ThemeService';

import { Text } from '@Text/index';
import { Icon } from '@Icon/index';
import { translations } from '@Translations/index';

export const ProjectsDisplay = memo((props: {
  showDisplay: boolean
  downloadedProjects: ProjectDTO[]
  onSelect: (project_id: string, selected: boolean) => void
}) => {

  const config        = useMemo(() => ConfigService.config, []);
  const R             = useMemo(() => translations.component.alert.downloadProjecs[config.language], []);
  const allProject    = useMemo(() => CacheService.allProjects, []);
  const allProjectsID = useMemo(() => allProject.map(settings => settings.id_project), []);

  const NewProjectButtons = props.downloadedProjects.filter(projects =>
    allProjectsID.includes(projects.projectSettings.id_project) === false
  ).map((projects, index) => (
    <ProjectButton
      key={projects.projectSettings.id_project + index}
      projectSettings={projects.projectSettings}
      onPress={(selected) => props.onSelect(projects.projectSettings.id_project, selected)}
    />
  ));

  return props.showDisplay ? (
    <ScrollView
      contentContainerStyle={{
        gap: 20,
      }}
    >
      {NewProjectButtons.length > 0 && (
        <View
          style={{
            paddingHorizontal: 10,
            gap: 1,
          }}
        >
          <Text h3
            style={{
              alignSelf: 'center',
              paddingBottom: 9,
            }}
          >
            {R['Projects available:']}
          </Text>
          {NewProjectButtons}
        </View>
      )}
    </ScrollView>
  ) : <></>;
});

const ProjectButton = memo((props: {
  projectSettings: ProjectSettings
  onPress: (selected: boolean) => void
}) => {

  const config = useMemo(() => ConfigService.config, []);
  const theme  = useMemo(() => ThemeService.appThemes[config.appTheme].layout.modalPopUp, []);
	const [pressed , setPressed ] = useState<boolean>(false);
  const [selected, setSelected] = useState<boolean>(false);

  const onPress = useCallback(() => {
    const newSelectedValue = !selected;
    setSelected(newSelectedValue);
    props.onPress(newSelectedValue);
    HapticsService.vibrate('success');
  }, [props.onPress]);

  const onPressIn = useCallback(() => {
    setPressed(true);
    HapticsService.vibrate('success');
  }, []);

	return (
		<Pressable
			onPressIn={() => onPressIn()}
			onPressOut={() => setPressed(false)}
			onPress={() => onPress()}
			style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
				paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        gap: 10,
				backgroundColor: pressed ? theme.background_active : theme.background_Button,
			}}
		>
      <View
        style={{
          backgroundColor: selected ? theme.confirm : theme.font_button,
          justifyContent: 'center',
          alignItems: 'center',
          height: 25,
          width: 25,
          borderRadius: 6,
        }}
      >
        {selected && (
          <Icon
            iconName="checkmark-sharp"
            color={theme.background}
          />
        )}
      </View>
      <View>
        <Text p
          style={{
            color: theme.font_button,
          }}
        >
          {props.projectSettings.name}
        </Text>
        <Text
          style={{
            color: theme.font_button,
            fontSize: 8,
          }}
        >
          {props.projectSettings.id_project}
        </Text>
      </View>

		</Pressable>
  );
});
