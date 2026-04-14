import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image, FileText, Shield, Info } from 'lucide-react';
import Navbar from '@/components/Navbar';
import FileUploader from '@/components/FileUploader';
import StatusBadge from '@/components/StatusBadge';
import { uploadXray } from '@/services/api';
import { toast } from '@/hooks/use-toast';

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

const UploadPage = () => {
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = useCallback(async (file: File) => {
    setUploading(true);
    try {
      if (USE_MOCK) {
        // Simulate upload delay then navigate with mock ID
        await new Promise((r) => setTimeout(r, 1000));
        navigate('/results/48291');
      } else {
        const response = await uploadXray(file);
        toast({ title: 'Upload successful', description: response.message });
        navigate(`/results/${response.id}`);
      }
    } catch (err) {
      console.error('Upload failed:', err);
      toast({
        title: 'Upload failed',
        description: 'Could not connect to server. Using demo mode.',
        variant: 'destructive',
      });
      // Fallback to mock result
      navigate('/results/48291');
    } finally {
      setUploading(false);
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="hub" />

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 text-primary">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
            </div>
            <span className="text-sm font-semibold text-primary">AI Diagnostic Suite</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">X-Ray Analysis Upload</h1>
          <p className="text-muted-foreground">
            Upload chest X-ray images (DICOM, JPG, PNG) for immediate AI<br />
            pneumonia screening.
          </p>
        </div>

        {/* System Status */}
        <div className="flex justify-end mb-6">
          <StatusBadge status="operational" />
        </div>

        <div className="border-t border-border mb-8" />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* Upload Zone */}
          <div className="lg:col-span-2">
            <FileUploader onFileSelect={handleFileSelect} disabled={uploading} />
            {uploading && (
              <div className="mt-4 text-center text-sm text-muted-foreground">
                Uploading and analyzing...
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Queue Status */}
            <div className="bg-card rounded-xl border border-border p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-foreground">Queue Status</h3>
                <StatusBadge status="idle" />
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Processing Capacity</span>
                <span className="font-semibold text-foreground">100%</span>
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full mb-4">
                <div className="h-full bg-primary rounded-full" style={{ width: '100%' }} />
              </div>
              <div className="flex items-start gap-2 bg-muted/50 rounded-lg p-3">
                <Info className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Ready for Analysis</p>
                  <p className="text-xs text-muted-foreground">Please ensure patient ID is anonymized before upload.</p>
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-card rounded-xl border border-border p-5">
              <h3 className="font-bold text-foreground mb-4">Requirements</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Image className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm text-foreground">Min Res: 2000×2000px</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-warning" />
                  </div>
                  <span className="text-sm text-foreground">DICOM Preferred</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="text-sm text-foreground">PII Removed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Guidelines */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">Analysis Guidelines</h2>
            <a href="#" className="text-sm text-primary hover:underline">View full documentation</a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card rounded-xl border border-border p-5">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <Image className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-1">High Resolution</h3>
              <p className="text-sm text-muted-foreground">Ensure images are sharp and well-exposed. Blurry inputs may result in false negatives.</p>
            </div>
            <div className="bg-card rounded-xl border border-border p-5">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-1">Standard Formats</h3>
              <p className="text-sm text-muted-foreground">The system is optimized for standard AP and PA chest views. Lateral views require manual review.</p>
            </div>
            <div className="bg-card rounded-xl border border-border p-5">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-1">Data Privacy</h3>
              <p className="text-sm text-muted-foreground">Uploaded files are processed in a HIPAA compliant environment and deleted after 24h.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UploadPage;
