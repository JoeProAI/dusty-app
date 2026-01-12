import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ConversionPage from './pages/ConversionPage'
import HistoryPage from './pages/HistoryPage'
import TemplatesPage from './pages/TemplatesPage'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/convert/:fileId" element={<ConversionPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/templates" element={<TemplatesPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
