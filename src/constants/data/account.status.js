export const AccountStatus = {
  WAITING_FOR_CONFIRMATION: 'WAITING_FOR_CONFIRMATION',
  CONFIRMED: 'CONFIRMED',
  REJECTED: 'REJECTED',
  BLOCKED: 'BLOCKED',
};

export const status = {
  WAITING_FOR_CONFIRMATION: 'CONTUL AȘTEAPTĂ CONFIRMAREA',
  CONFIRMED: 'CONTUL CONFIRMAT',
  REJECTED: 'CERERE RESPINSĂ',
  BLOCKED: 'CONTUL BLOCAT',
};

export const accountStatusOptions = [
  {
    id: AccountStatus.BLOCKED,
    name: 'Blocat',
  },
  {
    id: AccountStatus.CONFIRMED,
    name: 'Confirmat',
  },
  {
    id: AccountStatus.REJECTED,
    name: 'Confirmare anulata',
  },
  {
    id: AccountStatus.WAITING_FOR_CONFIRMATION,
    name: 'Asteapta confirmare',
  },
];
