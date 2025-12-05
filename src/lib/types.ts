import type React from 'react';
import {
  MatrixIcon,
  IccSoftIcon,
  NewtelnetIcon,
  AdacIcon,
  LvbIcon,
  PerleIcon,
  Logo,
  CcecIcon,
} from '@/components/icons';

export type Message = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export type Entity =
  | 'Matrix Telecoms'
  | 'LVB'
  | 'Perle'
  | 'ICC SOFT'
  | 'New Telnet'
  | 'ADAC'
  | 'Groupe ICC Net'
  | 'CCEC'
  | 'Unknown';

export const entities: {
  name: Entity;
  description: string;
  icon: React.ElementType;
}[] = [
  {
    name: 'Groupe ICC Net',
    description: 'Holding & Services IT',
    icon: Logo,
  },
  {
    name: 'Matrix Telecoms',
    description: 'Telecom & Connectivity',
    icon: MatrixIcon,
  },
  {
    name: 'ICC SOFT',
    description: 'Software Development',
    icon: IccSoftIcon,
  },
  {
    name: 'New Telnet',
    description: 'Internet & Telephony',
    icon: NewtelnetIcon,
  },
  {
    name: 'ADAC',
    description: 'Africa Datacenter',
    icon: AdacIcon,
  },
  {
    name: 'CCEC',
    description: 'Microfinance',
    icon: CcecIcon,
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
