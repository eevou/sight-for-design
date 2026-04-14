import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Skeleton } from '@/components/ui/skeleton';
import { useAnalysisHistory } from '@/hooks/useAnalysisHistory';

const HistoryPage = () => {
  const navigate = useNavigate();
  const { data: history, loading, error } = useAnalysisHistory();

  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="history" />

      <main className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-foreground mb-6">Analysis History</h1>

        {error && (
          <div className="bg-destructive/10 text-destructive rounded-lg p-3 mb-4 text-sm">
            {error} — showing cached data
          </div>
        )}

        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Patient</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">X-ray</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Result</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <tr key={i} className="border-b border-border">
                    <td className="px-6 py-4"><Skeleton className="h-4 w-24" /></td>
                    <td className="px-6 py-4"><Skeleton className="w-14 h-14 rounded-lg" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-4 w-16" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-4 w-20" /></td>
                  </tr>
                ))
              ) : (
                history.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => navigate(`/results/${item.id}`)}
                    className="border-b border-border last:border-b-0 hover:bg-muted/50 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-foreground">{item.patient}</td>
                    <td className="px-6 py-4">
                      <img
                        src={item.xrayThumbnail}
                        alt="X-ray thumbnail"
                        className="w-14 h-14 rounded-lg object-cover border border-border"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-semibold ${
                        item.result === 'Normal' ? 'text-success' : 'text-destructive'
                      }`}>
                        {item.result}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">{item.date}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default HistoryPage;
