import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { mockHistory } from '@/data/mockData';

const HistoryPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="history" />

      <main className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-foreground mb-6">Analysis History</h1>

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
              {mockHistory.map((item) => (
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
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default HistoryPage;
