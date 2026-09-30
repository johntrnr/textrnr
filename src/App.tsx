import React, { useState } from 'react';
import { ViewTab } from './types';
import { PROJECTS } from './data/projectsData';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { ReferenceExhibition } from './components/ReferenceExhibition';
import { ProjectsArchive } from './components/ProjectsArchive';
import { AboutView } from './components/AboutView';
import { ToolsView } from './components/ToolsView';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { InquiryModal } from './components/InquiryModal';
import { LedgerModal } from './components/LedgerModal';
import { Footer } from './components/Footer';

export default function App() {
  const [currentTab, setCurrentTab] = useState<ViewTab>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState<boolean>(false);
  const [inquiryDefaultWork, setInquiryDefaultWork] = useState<string>('');
  const [ledgerModalOpen, setLedgerModalOpen] = useState<boolean>(false);

  const selectedProject = selectedProjectId
    ? PROJECTS.find((p) => p.id === selectedProjectId) || null
    : null;

  const handleOpenProjectDetail = (projectId: string) => {
    setSelectedProjectId(projectId);
  };

  const handleOpenInquiry = (workTitle?: string) => {
    if (workTitle) {
      setInquiryDefaultWork(workTitle.toLowerCase());
    } else {
      setInquiryDefaultWork('');
    }
    setInquiryModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col font-mono selection:bg-neutral-900 selection:text-white lowercase text-[9px]">
      {/* 3-Zone Fixed/Sticky Minimal Top Bar */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenInquiry={() => handleOpenInquiry()}
      />

      {/* Main Content Area with generous padding */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-6 sm:px-10 md:px-14 py-10 sm:py-16 md:py-20">
        {/* Tab 0: Minimal Home with Projects and Tools links & short stats */}
        {currentTab === 'home' && (
          <HomeView
            onSelectProject={handleOpenProjectDetail}
            onNavigateTab={setCurrentTab}
          />
        )}

        {/* Tab 1: The Reference Exhibition with expansive spacing */}
        {currentTab === 'exhibition' && (
          <div className="space-y-16 sm:space-y-24">
            <ReferenceExhibition
              onOpenProjectDetail={handleOpenProjectDetail}
              onOpenLedger={() => setLedgerModalOpen(true)}
            />

            {/* Quick Preview of Archive with generous padding */}
            <div className="pt-16 sm:pt-20 border-t border-neutral-200 space-y-8">
              <div className="flex items-center justify-between text-[9px] font-mono tracking-normal">
                <span className="text-neutral-900">selected system works (06)</span>
                <button
                  onClick={() => setCurrentTab('works')}
                  className="hover:text-neutral-900 transition-colors text-neutral-400"
                >
                  full archive →
                </button>
              </div>

              <ProjectsArchive onSelectProject={handleOpenProjectDetail} />
            </div>
          </div>
        )}

        {/* Tab 2: Projects Catalog & Archive */}
        {currentTab === 'works' && (
          <ProjectsArchive onSelectProject={handleOpenProjectDetail} />
        )}

        {/* Tab 3: Custom Tools */}
        {currentTab === 'tools' && (
          <ToolsView />
        )}

        {/* Tab 4: About & Artist Profile */}
        {currentTab === 'about' && (
          <AboutView onOpenInquiry={() => handleOpenInquiry()} />
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenInquiry={() => handleOpenInquiry()}
        onOpenLedger={() => setLedgerModalOpen(true)}
        onSelectTab={setCurrentTab}
      />

      {/* Project Deep Dive Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProjectId(null)}
        onInquireWork={(title) => handleOpenInquiry(title)}
      />

      {/* Acquisition & Studio Inquiry Modal */}
      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        defaultWorkTitle={inquiryDefaultWork}
      />

      {/* The Running Ledger & Provenance Modal */}
      <LedgerModal
        isOpen={ledgerModalOpen}
        onClose={() => setLedgerModalOpen(false)}
      />
    </div>
  );
}
