import React, { memo, useCallback } from 'react';

import { WidgetData } from '@V2/Types/ProjectTypes';
import ProjectService from '@V2/Services/ProjectService';
import CacheService from '@V2/Services/CacheService';
import AlertService from '@V2/Services/AlertService';
import IDService from '@V2/Services/IDService';

import { LC } from '@V2/Alert/__LC__';
import { FooterButtons } from './FooterButtons';

export const TemplateWidgetCopy = memo((props: {
  id_project: string
  id_sample: string
  closeModal: () => void
}) => {

  const onWidgetCopyToSample = useCallback(async (widgetData: WidgetData) => {
    IDService.changeIDsByReference_Widget(widgetData);
    await ProjectService.createWidget({
      path: 'sample widgets',
      id_project: props.id_project,
      id_sample: props.id_sample,
      widgetData: widgetData,
      sync: true,
      onSuccess: () => {
        CacheService.addToAllWidgets_Sample({ widgetData });
        AlertService.runAcceptCallback();
        props.closeModal();
      },
      onError: (errorMesage) => alert(errorMesage),
    });
  }, [props]);

  return (
    <LC.PopUp>
      <LC.TemplateWidgetCopyDisplay
        showDisplay={true}
        onWidgetTemplateCopy={(widgetData) => onWidgetCopyToSample(widgetData)}
      />
      <FooterButtons
        onCancel={() => props.closeModal()}
      />
    </LC.PopUp>
  );
});
