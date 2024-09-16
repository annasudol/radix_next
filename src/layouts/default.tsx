import { Link } from '@nextui-org/link';

import { Navbar } from '@/components/navbar';
import { Provider } from 'react-redux';
import { useEffect } from 'react';
import { initializeSubscriptions, unsubscribeAll } from '../subscriptions';
import { store } from '../state/store';

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
    // useEffect(() => {
    //   initializeSubscriptions(store);
    //   return () => {
    //     unsubscribeAll();
    //   };
    // }, []);
  return (
    <Provider store={store}>
      <div className="relative flex flex-col h-screen">
        <Navbar />
        <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">{children}</main>
        <footer className="w-full flex items-center justify-center py-3">
          <Link
            isExternal
            className="flex items-center gap-1 text-current"
            href="https://www.radixdlt.com/"
            title="radixdlt.com/ homepage"
          >
            <span className="text-default-600">Powered with</span>
            <p className="text-primary">Radix</p>
          </Link>
        </footer>
      </div>
    </Provider>
  );
}
