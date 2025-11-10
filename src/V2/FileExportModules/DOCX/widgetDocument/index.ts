import { Docx } from '../Docx';

import { ConfigDTO } from '@V2/Types/AppTypes';
import { WidgetData } from '@V2/Types/ProjectTypes';

import { document_inputData } from '../InputsDocument';

export async function document_Widget(o: {
  config: ConfigDTO
  widgetData: WidgetData
}): Promise<string[]> {

  const { config, widgetData} = o;

  const document = [
    Docx.paragraph([
      Docx.text({
        text: widgetData.widgetName,
        fontSize: 14,
        color: '000000',
        bold: true,
      })
    ]),
  ];

  for (let i = 0; i < widgetData.inputs.length; i++) {

    const inputData = widgetData.inputs[i];
    const isLastInput = i === widgetData.inputs.length - 1;

    document.push(
      Docx.paragraph([]),
      ...await document_inputData({ config, inputData }),
    );

    if (isLastInput) {
      document.push(
        Docx.paragraph([])
      );
    }
  }

  return document;
}
