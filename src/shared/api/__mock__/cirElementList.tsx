import { ElementsEnum } from '@/shared/model/ElementsEnum';
import { ICirElement } from '../../ui/types';

export const cirElementList: ICirElement[] = [
  {
    type: ElementsEnum.ground,
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
        type: 'terminal',
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
  },
  {
    type: ElementsEnum.key,
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
        type: 'terminal',
        x: -70,
        y: 0,
        name: 'Клемма 1',
      },
      {
        id: '2',
        type: 'terminal',
        x: 70,
        y: 0,
        name: 'Клемма 2',
      },
    ],
    hitbox: {
      x1: -70,
      x2: 70,
      y1: -36,
      y2: 6,
    },
    previewImgPath: '/images/elements/key.png',
  },
  {
    type: ElementsEnum.lamp,
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
        type: 'terminal',
        x: -80,
        y: 0,
        name: 'Клемма 1',
      },
      {
        id: '2',
        type: 'terminal',
        x: 80,
        y: 0,
        name: 'Клемма 2',
      },
    ],
    previewImgPath: '/images/elements/lamp.png',
  },
  {
    type: ElementsEnum.motor,
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
        type: 'terminal',
        x: -110,
        y: 0,
        name: 'Клемма 1',
      },
      {
        id: '2',
        type: 'terminal',
        x: 110,
        y: 0,
        name: 'Клемма 2',
      },
      {
        id: '3',
        type: 'terminal',
        x: 0,
        y: 110,
        name: 'Клемма 3',
      },
    ],
    previewImgPath: '/images/elements/motor.png',
  },
  {
    type: ElementsEnum.power,
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
    name: 'Источник энергии',
    terminals: [
      {
        id: '1',
        type: 'terminal',
        x: -30,
        y: 0,
        name: 'Клемма 1',
      },
      {
        id: '2',
        type: 'terminal',
        x: 30,
        y: 0,
        name: 'Клемма 2',
      },
    ],
    hitbox: {
      x1: -32.5,
      x2: 32.5,
      y1: -50,
      y2: 50,
    },
    previewImgPath: '/images/elements/power.png',
  },
  {
    type: ElementsEnum.relay,
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
        type: 'terminal',
        x: 60,
        y: -50,
        name: 'Клемма 1',
      },
      {
        id: '2',
        type: 'terminal',
        x: -60,
        y: -50,
        name: 'Клемма 2',
      },
      {
        id: '3',
        type: 'terminal',
        x: -70,
        y: 55,
        name: 'Клемма 3',
      },
      {
        id: '4',
        type: 'terminal',
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
  },
  {
    type: ElementsEnum.resistor,
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
        type: 'terminal',
        x: 70,
        y: 0,
        name: 'Клемма 1',
      },
      {
        id: '2',
        type: 'terminal',
        x: -70,
        y: 0,
        name: 'Клемма 2',
      },
    ],
    previewImgPath: '/images/elements/resistor.png',
  },
  {
    type: ElementsEnum.switch,
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
    name: 'Свитч',
    terminals: [
      {
        id: '1',
        type: 'terminal',
        x: -60,
        y: -95,
        name: 'Клемма 1',
      },
      {
        id: '2',
        type: 'terminal',
        x: -60,
        y: -55,
        name: 'Клемма 2',
      },
      {
        id: '3',
        type: 'terminal',
        x: -60,
        y: -15,
        name: 'Клемма 3',
      },
      {
        id: '4',
        type: 'terminal',
        x: -60,
        y: 50,
        name: 'Клемма 4',
      },
      {
        id: '5',
        type: 'terminal',
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
  },
];
