import { createContext, useContext, useState } from "react";

const TabContext = createContext();

export const ActiveTabProvider = ({ children }) => {
  // create active tab provider
  const [activeTab, setActiveTab] = useState("Overview");

  const [farmerActiveTab, setFarmerActiveTab] = useState("Overview");
  return (
    <TabContext.Provider
      value={{ activeTab, setActiveTab, farmerActiveTab, setFarmerActiveTab }}
    >
      {children}
    </TabContext.Provider>
  );
};
export const useTabContext = () => {
  const context = useContext(TabContext);
  return context;
};
