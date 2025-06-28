import { createContext, useState } from 'react';

export const PodsContext = createContext<{ podName: string | null; setPodName: (podName: string | null) => void }>({
  podName: null,
  setPodName: () => {},
});

export const PodsProvider = ({ children }: { children: React.ReactNode }) => {
  const [podName, setPodName] = useState<string | null>(null);

  return <PodsContext.Provider value={{ podName, setPodName }}>{children}</PodsContext.Provider>;
};
