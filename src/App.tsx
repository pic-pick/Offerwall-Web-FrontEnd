import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { AppShell } from './components/AppShell'
import { OfferwallPage } from './components/OfferwallPage'
import { HistoryPage } from './pages/HistoryPage'
import { MissionsPage } from './pages/MissionsPage'
import { RewardShopPage } from './pages/RewardShopPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AppShell>
              <OfferwallPage />
            </AppShell>
          }
        />
        <Route
          path="/missions"
          element={
            <AppShell>
              <MissionsPage />
            </AppShell>
          }
        />
        <Route
          path="/history"
          element={
            <AppShell>
              <HistoryPage />
            </AppShell>
          }
        />
        <Route
          path="/reward-shop"
          element={
            <AppShell>
              <RewardShopPage />
            </AppShell>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
