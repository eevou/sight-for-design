import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Printer, Share2, Search, Contrast, Pencil } from 'lucide-react';
import chestXrayImg from '@/assets/chest-xray.jpg';
import Navbar from '@/components/Navbar';
import DiagnosisCard from '@/components/DiagnosisCard';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { mockAnalysisResult } from '@/data/mockData';

const ResultsPage = () => {
  const data = mockAnalysisResult;
  const [activeView, setActiveView] = useState('original');
  const [notes, setNotes] = useState(data.physicianNotes);
  const [isEditingNotes, setIsEditingNotes] = useState(false);

  const viewModes = [
    { id: 'original', label: 'Original', icon: '🖼' },
    { id: 'heatmap', label: 'Heatmap', icon: '⊞' },
    { id: 'highcontrast', label: 'High Contrast', icon: '◐' },
    { id: 'grid', label: 'Grid', icon: '⊞' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar variant="system" />

      <main className="flex-1 max-w-6xl mx-auto px-6 py-6 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Link to="/" className="hover:text-foreground"><Home className="w-4 h-4" /></Link>
          <span>/</span>
          <Link to="/history" className="hover:text-foreground">Patients</Link>
          <span>/</span>
          <span>ID #{data.patientId}</span>
          <span>/</span>
          <span className="text-foreground font-medium">Results</span>
        </nav>

        {/* Title Row */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Analysis Results</h1>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1 bg-muted px-2 py-1 rounded text-xs font-medium">
                🖼 #{data.patientId}
              </span>
              <span>📅 {data.date}</span>
              <span>🕐 {data.time}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2 rounded-lg">
              <Printer className="w-4 h-4" />
              Print Report
            </Button>
            <Button variant="outline" className="gap-2 rounded-lg">
              <Share2 className="w-4 h-4" />
              Share
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* X-ray Viewer */}
          <div className="lg:col-span-3">
            <div className="relative bg-black rounded-xl overflow-hidden mb-4">
              <div className="absolute top-3 left-3 z-10 bg-foreground/80 text-background text-xs px-3 py-1 rounded-full flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-destructive" />
                LIVE VIEW
              </div>
              <div className="absolute top-3 right-3 z-10 flex gap-2">
                <button className="w-8 h-8 bg-foreground/30 rounded-full flex items-center justify-center text-white hover:bg-foreground/50">
                  <Search className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 bg-foreground/30 rounded-full flex items-center justify-center text-white hover:bg-foreground/50">
                  <Contrast className="w-4 h-4" />
                </button>
              </div>
              <img
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=700&fit=crop"
                alt="Chest X-ray"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute bottom-3 left-3 text-white text-xs">DICOM View</div>
              <div className="absolute bottom-3 right-3 text-white text-xs">Zoom: 100%</div>
            </div>

            {/* View Mode Tabs */}
            <div className="grid grid-cols-4 gap-2">
              {viewModes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setActiveView(mode.id)}
                  className={`flex flex-col items-center gap-1 py-3 px-2 rounded-lg border text-sm transition-colors ${
                    activeView === mode.id
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border bg-card text-muted-foreground hover:border-primary/30'
                  }`}
                >
                  <span className="text-lg">{mode.icon}</span>
                  <span className="font-medium">{mode.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Panel */}
          <div className="lg:col-span-2 space-y-6">
            <DiagnosisCard
              result={data.result}
              confidence={data.confidence}
              condition={data.condition}
              description={data.description}
              secondaryIndicators={data.secondaryIndicators}
            />

            {/* Physician Notes */}
            <div className="bg-card rounded-xl border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-foreground">Physician Notes</h3>
                <button
                  onClick={() => setIsEditingNotes(!isEditingNotes)}
                  className="text-sm text-primary flex items-center gap-1 hover:underline"
                >
                  <Pencil className="w-3 h-3" />
                  Edit
                </button>
              </div>
              {isEditingNotes ? (
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mb-2"
                  rows={4}
                />
              ) : (
                <div className="bg-muted/50 rounded-lg p-4 text-sm text-foreground mb-2">
                  {notes}
                </div>
              )}
              <p className="text-xs text-muted-foreground text-right">Last updated: 2 mins ago</p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg py-3 font-semibold">
                Confirm Diagnosis
              </Button>
              <Button variant="outline" className="rounded-lg py-3 font-semibold">
                Request Follow-up
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-8">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>PND System v2.4.0 • AI Model: ResNet-50 (Build 2023.10)</span>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-foreground">Privacy Policy</a>
            <a href="#" className="hover:text-foreground">Terms of Service</a>
            <a href="#" className="hover:text-foreground">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ResultsPage;
