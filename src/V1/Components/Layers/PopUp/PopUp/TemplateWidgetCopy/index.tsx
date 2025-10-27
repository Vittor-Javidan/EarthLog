import React, { memo, useCallback } from 'react';

import { WidgetData } from '@V1/Types/ProjectTypes';
import { IDService } from '@V1/Services_Core/IDService';
import { ProjectService } from '@V1/Services/ProjectService';
import { CacheService } from '@V1/Services/CacheService';
import { PopUpAPI } from '@V1/Layers/API/PopUp';

import { LC } from '@V1/Layers/PopUp/__LC__';
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
        PopUpAPI.runAcceptCallback();
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
