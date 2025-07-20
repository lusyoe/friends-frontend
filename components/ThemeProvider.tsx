'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  // 检查当前时间是否应该使用暗主题 (18:00-6:00)
  const shouldUseDarkTheme = () => {
    const now = new Date();
    const hour = now.getHours();
    return hour >= 18 || hour < 6;
  };

  // 初始化主题 - 只在页面加载时执行一次
  useEffect(() => {
    // 优先使用本地存储的主题偏好
    const savedTheme = localStorage.getItem('theme-preference') as Theme;
    
    if (savedTheme) {
      // 如果有保存的主题偏好，使用它
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      // 否则根据当前时间自动选择主题
      const newTheme = shouldUseDarkTheme() ? 'dark' : 'light';
      setTheme(newTheme);
      applyTheme(newTheme);
    }
  }, []); // 空依赖数组，只在组件挂载时执行一次

  // 应用主题到DOM
  const applyTheme = (newTheme: Theme) => {
    const html = document.documentElement;
    const root = document.documentElement;
    
    if (newTheme === 'dark') {
      // 设置CSS变量
      root.style.setProperty('--background', '#0a0a0a');
      root.style.setProperty('--foreground', '#ededed');
      root.style.setProperty('--card-bg', '#18181b');      // 新增
      root.style.setProperty('--card-border', '#3f3f46');  // 新增
      root.style.setProperty('--timeline-line', '#6b7280'); // gray-500
      root.style.setProperty('--desc-color', '#fff'); // 新增
      // 添加dark类到html元素，这样Tailwind的dark:前缀才能生效
      html.classList.add('dark');
    } else {
      // 设置CSS变量
      root.style.setProperty('--background', '#ffffff');
      root.style.setProperty('--foreground', '#171717');
      root.style.setProperty('--card-bg', '#fff');         // 新增
      root.style.setProperty('--card-border', '#e5e7eb');  // 新增
      root.style.setProperty('--timeline-line', '#e5e7eb'); // gray-200
      root.style.setProperty('--desc-color', '#374151'); // 新增
      // 移除dark类
      html.classList.remove('dark');
    }
  };

  const setThemeWithStorage = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme-preference', newTheme);
    applyTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setThemeWithStorage }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 