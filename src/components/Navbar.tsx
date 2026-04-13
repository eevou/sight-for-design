import { Link, useLocation } from 'react-router-dom';
import { Bell, Plus, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  variant?: 'hub' | 'system' | 'history';
}

const Navbar = ({ variant = 'hub' }: NavbarProps) => {
  const location = useLocation();

  const hubLinks = [
    { label: 'Dashboard', path: '#' },
    { label: 'Records', path: '/history' },
    { label: 'New Scan', path: '/' },
    { label: 'Settings', path: '#' },
  ];

  const systemLinks = [
    { label: 'Dashboard', path: '#' },
    { label: 'Patients', path: '/history' },
    { label: 'Analysis', path: '#' },
    { label: 'Settings', path: '#' },
  ];

  const links = variant === 'hub' ? hubLinks : systemLinks;

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-card border-b border-border">
      <div className="flex items-center gap-2">
        {variant === 'hub' ? (
          <>
            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-primary">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="font-bold text-lg text-foreground">PND AI Hub</span>
          </>
        ) : (
          <>
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Plus className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <span className="font-bold text-lg text-foreground">PND System</span>
              {variant === 'history' && (
                <p className="text-xs text-muted-foreground leading-none">Chest X-Ray Analysis</p>
              )}
            </div>
          </>
        )}
      </div>

      {variant !== 'history' && (
        <nav className="hidden md:flex items-center border border-border rounded-lg overflow-hidden">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? 'text-foreground bg-muted font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}

      <div className="flex items-center gap-3">
        {variant === 'hub' && (
          <button className="relative p-2 text-muted-foreground hover:text-foreground">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
          </button>
        )}
        <Link to="/">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg gap-1.5">
            <Plus className="w-4 h-4" />
            New Scan
          </Button>
        </Link>
        {variant === 'history' && (
          <Link to="/history">
            <Button variant="outline" className="rounded-lg">
              History
            </Button>
          </Link>
        )}
        <div className="w-9 h-9 rounded-full bg-muted border-2 border-border flex items-center justify-center overflow-hidden">
          <User className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
