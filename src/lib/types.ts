import type React from 'react';
import {
  MatrixIcon,
  IccSoftIcon,
  NewtelnetIcon,
  AdacIcon,
  LvbIcon,
  PerleIcon,
} from '@/components/icons';

export type Message = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export type Entity =
  | 'Matrix'
  | 'LVB'
  | 'Perle'
  | 'ICC SOFT'
  | 'Newtelnet'
  | 'ADAC'
  | 'Unknown';

export const entities: {
  name: Entity;
  description: string;
  icon: React.ElementType;
}[] = [
  {
    name: 'Matrix',
    description: 'Telecom & Connectivity',
    icon: MatrixIcon,
  },
  {
    name: 'ICC SOFT',
    description: 'Software Development',
    icon: IccSoftIcon,
  },
  {
    name: 'Newtelnet',
    description: 'Internet & Telephony',
    icon: NewtelnetIcon,
  },
  {
    name: 'ADAC',
    description: 'Insurance Association',
    icon: AdacIcon,
  },
  {
    name: 'LVB',
    description: 'General Branch',
    icon: LvbIcon,
  },
  {
    name: 'Perle',
    description: 'General Branch',
    icon: PerleIcon,
  },
];
