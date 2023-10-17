import { WidgetData } from '@Types/ProjectTypes';
import { Paragraph, TextRun } from 'docx';
import { document_inputData } from '../InputsDocument';

export function document_Widget(widgetData: WidgetData) {

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
    const isLastInput = i === widgetData.inputs.length - 1;
    document.push(new Paragraph({ text: '' }));
    document.push(...document_inputData(widgetData.inputs[i]));
    if (isLastInput) {
      document.push(new Paragraph({ text: '' }));
    }
  }

  return document;
}
