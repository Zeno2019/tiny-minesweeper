import Body from '@/components/Body';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { cn } from '@/lib/utils';

export default function BaseLayout({ title, children, className }: { title: string; children?: React.ReactNode; className?: string }) {
  // const cls = cn('container', 'min-h-screen', 'bg-gray-100', className);
  const cls = cn('min-h-screen', 'bg-gray-100', className);

  return (
    <div className={cls}>
      <Header title={title} />
      <Body>{children}</Body>
      <Footer />
    </div>
  );
}
