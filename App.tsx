import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import HealthAssistantPage from './components/HealthAssistantPage';
import SkillsPage from './components/SkillsPage';
import TreeMissionPage from './components/TreeMissionPage';
import WellnessPage from './components/WellnessPage';
import EbookLibraryPage from './components/EbookLibraryPage';
import OurWorkPage from './components/OurWorkPage';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/health-assistant" element={<HealthAssistantPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/tree-mission" element={<TreeMissionPage />} />
          <Route path="/wellness" element={<WellnessPage />} />
          <Route path="/ebooks" element={<EbookLibraryPage />} />
          <Route path="/our-work" element={<OurWorkPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
