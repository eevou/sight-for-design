import { useCallback, useState } from 'react';
import { Upload, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) onFileSelect(file);
  }, [onFileSelect]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
  }, [onFileSelect]);

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative flex flex-col items-center justify-center py-16 px-8 border-2 border-dashed rounded-xl transition-colors cursor-pointer ${
        isDragging
          ? 'border-primary bg-primary/5'
          : 'border-border hover:border-primary/50'
      }`}
    >
      <div className="relative mb-4">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
          <Upload className="w-8 h-8 text-primary" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-primary flex items-center justify-center">
          <Plus className="w-4 h-4 text-primary-foreground" />
        </div>
      </div>
      <h3 className="text-lg font-bold text-foreground mb-2">Drag & Drop X-Ray Scans</h3>
      <p className="text-sm text-muted-foreground text-center mb-6">
        Supports DICOM, JPEG, PNG formats up to<br />50MB per file
      </p>
      <div className="flex items-center gap-4 mb-6 w-full max-w-xs">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted-foreground">OR</span>
        <div className="flex-1 h-px bg-border" />
      </div>
      <Button variant="outline" className="rounded-lg px-6" onClick={() => document.getElementById('file-input')?.click()}>
        Browse Files
      </Button>
      <input
        id="file-input"
        type="file"
        accept=".dcm,.jpg,.jpeg,.png"
        className="hidden"
        onChange={handleFileInput}
      />
    </div>
  );
};

export default FileUploader;
