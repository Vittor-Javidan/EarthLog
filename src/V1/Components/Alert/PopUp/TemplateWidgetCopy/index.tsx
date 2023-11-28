import React, { memo, useCallback } from 'react';

import { WidgetData } from '@V1/Types/ProjectTypes';
import ProjectService from '@V1/Services/ProjectService';
import CacheService from '@V1/Services/CacheService';
import AlertService from '@V1/Services/AlertService';
import IDService from '@V1/Services/IDService';

import { LC } from '@V1/Alert/__LC__';
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
    }, () => {
      CacheService.addToAllWidgets_Sample(widgetData);
      AlertService.runAcceptCallback();
      props.closeModal();
    }, (errorMesage) => alert(errorMesage));
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
