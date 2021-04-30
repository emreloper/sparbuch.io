import React from 'react';
import { createNumberFormat } from '../common/localization';

interface LocaizationContext {
  currencyFormat: Intl.NumberFormat;
}

// @ts-ignore
const localizationContext = React.createContext<LocaizationContext>({});

const currencyFormat = createNumberFormat();

export const useLocalization = () => React.useContext(localizationContext);

export const LocalizationProvider: React.FC = ({ children }) => {
  return (
    <localizationContext.Provider value={{ currencyFormat }}>
      {children}
    </localizationContext.Provider>
  );
};
