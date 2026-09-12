const listeners = new Set();
let currentTab = "starters";

export const menuTabs = [
  { key: "starters", label: "Starters" },
  { key: "mainCourse", label: "Main Course" },
  { key: "desserts", label: "Desserts" },
];

export const getActiveTab = () => currentTab;

export const setActiveTab = (key) => {
  if (currentTab === key) return;
  currentTab = key;
  listeners.forEach((listener) => listener());
};

export const subscribeActiveTab = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
