import { ElementTypesEnum } from '@/entities/cirElement/model/ElementTypesEnum';
import { IInitialCirElementList } from '@/shared/model/types';
import { LampLayout } from "../ui/cirElementsLayout/LampLayout";
import { KeyLayout } from '../ui/cirElementsLayout/KeyLayout';
import { RelayLayout } from '../ui/cirElementsLayout/RelayLayout';

export const initialCirElementList: IInitialCirElementList = {
  [ElementTypesEnum.Ground]: {
    type: ElementTypesEnum.Ground,
    components: [
      {
        d: `
          M 0 0,
          v -40,
          m -20 40,
          h 40,
          m -7.5 5,
          h -25,
          m 7.5 5,
          h 10
      `,
      },
    ],
    name: 'Земля',

    terminals: [
      {
        id: '1',
        relatedTerminalId: null,
        x: 0,
        y: -40,
        name: 'Клемма',
      },
    ],
    hitbox: {
      x1: -20,
      x2: 20,
      y1: -40,
      y2: 11,
    },
    previewImgPath: '/images/elements/ground.png',
    physData: {},
  },
  [ElementTypesEnum.Key]: {
    type: ElementTypesEnum.Key,
    Layout: KeyLayout,
    components: [
      {
        d: `
          M 0 0,
          m -40 0,
          a 5 5 1 0 1 -10 0,
          a 5 5 1 0 1 10 0,
          l 73 -35,
          m 7 35,
          a 5 5 1 0 1 10 0,
          a 5 5 1 0 1 -10 0,
          m 10 0,
          l 20 0,
          m -120 0,
          l -20 0
        `,
      },
    ],
    name: 'Ключ',
    terminals: [
      {
        id: '1',
        relatedTerminalId: '2',

        x: -70,
        y: 0,
        name: 'Клемма 1',
        noInitialNode: true
      },
      {
        id: '2',
        relatedTerminalId: '1',
        x: 70,
        y: 0,
        name: 'Клемма 2',
        noInitialNode: true
      },
    ],
    hitbox: {
      x1: -70,
      x2: 70,
      y1: -36,
      y2: 6,
    },
    previewImgPath: '/images/elements/key.png',
    physData: {
      voltage: {
        value: 0,
        title: 'Напряжение',
      },
      current: {
        value: 0,
        title: 'Сила тока', 
      },
    },
  },
  [ElementTypesEnum.Lamp]: {
    type: ElementTypesEnum.Lamp,
    Layout:  LampLayout,
    components: [
      {
        d: `
          M 0 0,
          m -50 0,
          a 50 50 1 0 1 100 0,
          a 50 50 1 0 1 -100 0,
          m 15 35,
          l 70 -70,
          m -70 0,
          l 70 70
          m 15 -35
          l 30 0
          m -130 0
          l -30 0
        `,
      },
    ],
    name: 'Лампа',
    terminals: [
      {
        id: '1',
        relatedTerminalId: '2',
        x: -80,
        y: 0,
        name: 'Клемма 1',
      },
      {
        id: '2',
        relatedTerminalId: '1',
        x: 80,
        y: 0,
        name: 'Клемма 2',
      },
    ],
    previewImgPath: '/images/elements/lamp.png',
    physData: {
      voltage: {
        value: 0,
        title: 'Напряжение',
      },
      current: {
        value: 0,
        title: 'Сила тока',
      },
      resistance: {
        value: 5,
        title: 'Сопротивление',
        isChangeable: true,
      },
      maxVoltage: {
        value: 10,
        title: 'Максимальное напряжение',
        isChangeable: true,
      }
    },
  },
  [ElementTypesEnum.Motor]: {
    type: ElementTypesEnum.Motor,
    components: [
      {
        d: `
          M 0 0,
          m -70 0,
          a 70 70 1 0 1 140 0,
          a 70 70 1 0 1 -140 0l -40 0,
          m 180 0,
          l 40 0,
          m -110 70,
          l 0 40
        `,
      },
      {
        d: `
          M 0 0,
          m 0 -60,
          l 0 60,
          l -50 35,
          m 100 0,
          l -50 -35
        `,
      },
    ],
    name: 'Мотор',
    terminals: [
      {
        id: '1',
        relatedTerminalId: '2',
        x: -110,
        y: 0,
        name: 'Клемма 1',
      },
      {
        id: '2',
        relatedTerminalId: '1',
        x: 110,
        y: 0,
        name: 'Клемма 2',
      },
      {
        id: '3',
        relatedTerminalId: null,
        x: 0,
        y: 110,
        name: 'Клемма 3',
      },
    ],
    previewImgPath: '/images/elements/motor.png',
    physData: {},
  },
  [ElementTypesEnum.VoltageSource]: {
    type: ElementTypesEnum.VoltageSource,
    components: [
      {
        d: `
          M 0 0,
          m 5 20,
          l 0 -40,
          m 0 -50,
          l -10 0,
          m 5 -5,
          l 0 10,
          m -2 15,
          l 0 100
          m 0 -50
          l -30 0
          m 35 0
          l 30 0
        `,
      },
    ],
    name: 'Источник ЭДС',
    terminals: [
      {
        id: '1',
        relatedTerminalId: '2',
        x: -30,
        y: 0,
        name: '+',
      },
      {
        id: '2',
        relatedTerminalId: '1',
        x: 30,
        y: 0,
        name: '-',
      },
    ],
    hitbox: {
      x1: -32.5,
      x2: 32.5,
      y1: -50,
      y2: 50,
    },
    previewImgPath: '/images/elements/power.png',
    physData: {
      voltage: {
        value: 10,
        title: 'Напряжение',
        isChangeable: true,
      },
      current: {
        value: 0,
        title: 'Сила тока',
      },
      resistance: {
        value: 0,
        title: 'Сопротивление',
        isChangeable: true,
      },
    },
  },
  [ElementTypesEnum.Relay]: {
    type: ElementTypesEnum.Relay,
    Layout: RelayLayout,
    components: [
      {
        d: `
          M 0 0,
          m 0 -20,
          h -20,
          v -30,
          h -40,
          m 40 0,
          v -30,
          h 40,
          v 30,
          h 40,
          m -40 0,
          v 30,
          h-20,
          m 0 10,
          l 0 10,
          m 0 10,
          l 0 10,
          m 0 10,
          l 0 10,
          m 0 10,
          l 0 10,
          m 0 10,
          l 0 10,
          m 0 10,
          m -40 -35,
          a 5 5 1 0 1 -10 0,
          a 5 5 1 0 1 10 0,
          l 73 -35,
          m 7 35,
          a 5 5 1 0 1 10 0,
          a 5 5 1 0 1 -10 0,
          m 10 0,
          l 20 0,
          m -120 0,
          l -20 0
        `,
      },
    ],
    name: 'Реле',
    terminals: [
      {
        id: '1',
        relatedTerminalId: '2',
        x: 60,
        y: -50,
        name: 'Клемма 1',
      },
      {
        id: '2',
        relatedTerminalId: '1',
        x: -60,
        y: -50,
        name: 'Клемма 2',
      },
      {
        id: '3',
        relatedTerminalId: '4',
        x: -70,
        y: 55,
        name: 'Клемма 3',
      },
      {
        id: '4',
        relatedTerminalId: '3',
        x: 70,
        y: 55,
        name: 'Клемма 4',
      },
    ],
    hitbox: {
      x1: -60,
      x2: 60,
      y1: -80,
      y2: 80,
    },
    previewImgPath: '/images/elements/relay.png',
    physData: {
      voltage: {
        value: 0,
        title: 'Напряжение',
      },
      current: {
        value: 0,
        title: 'Сила тока',
      }
    },
  },
  [ElementTypesEnum.Resistor]: {
    type: ElementTypesEnum.Resistor,
    components: [
      {
        d: `
          M 0 0 
          m -50 0
          v -20
          h 100
          v 40
          h -100
          z
          l -20 0
          m 120 0
          l 20 0
        `,
      },
    ],
    name: 'Резистор',
    terminals: [
      {
        id: '1',
        relatedTerminalId: '2',
        x: 70,
        y: 0,
        name: 'Клемма 1',
      },
      {
        id: '2',
        relatedTerminalId: '1',
        x: -70,
        y: 0,
        name: 'Клемма 2',
      },
    ],
    previewImgPath: '/images/elements/resistor.png',
    physData: {
      voltage: {
        value: 0,
        title: 'Напряжение',
      },
      current: {
        value: 0,
        title: 'Сила тока',
      },
      resistance: {
        value: 5,
        title: 'Сопротивление',
        isChangeable: true,
      },
    },
  },
  [ElementTypesEnum.Switch]: {
    type: ElementTypesEnum.Switch,
    components: [
      {
        d: `
          M 0 0,
          m 0 20,
          h -20,
          v 30,
          h-40,
          m 40 0,
          v 30,
          h 40,
          v -30,
          h 40,
          m -40 0,
          v -30,
          h -20,
          m 0 -5,
          v -10,
          m 0 -5,
          v-10,
          m 0 -5,
          v -10,
          m 0 -5,
          v-10,
          m 0 -5,
          v -10,
          m 0 -5,
          v-10,
          m 0 -5,
          v -10,
          m 0 -5,
          v-10,
          m -60 5,
          h 120,
          v 10,
          m 0 60,
          v 10,
          h -120,
          m 0 -40,
          h 20,
          l 110 32
        `,
      },
    ],
    name: 'Реле "тройка"',
    terminals: [
      {
        id: '1',
        relatedTerminalId: null,
        x: -60,
        y: -95,
        name: 'Клемма 1',
      },
      {
        id: '2',
        relatedTerminalId: '3',
        x: -60,
        y: -55,
        name: 'Клемма 2',
      },
      {
        id: '3',
        relatedTerminalId: '2',
        x: -60,
        y: -15,
        name: 'Клемма 3',
      },
      {
        id: '4',
        relatedTerminalId: '5',
        x: -60,
        y: 50,
        name: 'Клемма 4',
      },
      {
        id: '5',
        relatedTerminalId: '4',
        x: 60,
        y: 50,
        name: 'Клемма 5',
      },
    ],
    hitbox: {
      x1: -65,
      x2: 65,
      y1: -100,
      y2: 82,
    },
    previewImgPath: '/images/elements/switch.png',
    physData: {},
  },
};
