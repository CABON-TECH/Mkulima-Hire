import React, { createContext, useContext, useState, ReactNode } from 'react';

type TabContextType = {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  farmerActiveTab: string;
  setFarmerActiveTab: React.Dispatch<React.SetStateAction<string>>;
};

const TabContext = createContext<TabContextType | undefined>(undefined);

type ActiveTabProviderProps = {
  children: ReactNode;
};

export const ActiveTabProvider: React.FC<ActiveTabProviderProps> = ({
  children,
}) => {
  const [activeTab, setActiveTab] = useState<string>('Overview');
  const [farmerActiveTab, setFarmerActiveTab] = useState<string>('Overview');

  return (
    <TabContext.Provider
      value={{ activeTab, setActiveTab, farmerActiveTab, setFarmerActiveTab }}
    >
      {children}
    </TabContext.Provider>
  );
};

export const useTabContext = (): TabContextType => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('useTabContext must be used within a TabContextProvider');
  }
  return context;
};
