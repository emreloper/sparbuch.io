import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { theme } from './common/theme';
import { ScreenLoading } from './components/ScreenLoading';
import { LocalizationProvider } from './context/localization-context';

const Home = React.lazy(() => import('./screens/Home'));
const LiquidityPool = React.lazy(() => import('./screens/LiquidityPool'));

export const App = () => {
  return (
    <RecoilRoot>
      <LocalizationProvider>
        <ChakraProvider theme={theme}>
          <BrowserRouter>
            <React.Suspense fallback={<ScreenLoading />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/lp/:address/" element={<LiquidityPool />} />
              </Routes>
            </React.Suspense>
          </BrowserRouter>
        </ChakraProvider>
      </LocalizationProvider>
    </RecoilRoot>
  );
};
