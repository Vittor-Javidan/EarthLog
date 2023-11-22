import { Paragraph, TextRun } from 'docx';

import { ConfigDTO } from '@Types/AppTypes';
import { WidgetData } from '@Types/ProjectTypes';

import { document_inputData } from '../InputsDocument';

export async function document_Widget(o: {
  config: ConfigDTO
  widgetData: WidgetData
}) {

  const { config, widgetData} = o;

  const document = [
    new Paragraph({
      children: [
        new TextRun({
          bold: true,
          color: '#000000',
          children: [ widgetData.widgetName ],
          font: 'Calibri',
          size: `${14}pt`,
        }),
      ],
    }),
  ];

  for (let i = 0; i < widgetData.inputs.length; i++) {

    const inputData = widgetData.inputs[i];
    const isLastInput = i === widgetData.inputs.length - 1;

    document.push(
      new Paragraph({ text: '' })
    );
    document.push(
      ...await document_inputData({ config, inputData })
    );
    if (isLastInput) {
      document.push(
        new Paragraph({ text: '' })
      );
    }
  }

  return document;
}
