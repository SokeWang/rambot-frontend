import { useState } from 'react';
import { Tool } from '../types';
import { INITIAL_TOOLS } from '../constants';

export const useTools = () => {
  const [tools, setTools] = useState<Tool[]>(INITIAL_TOOLS);

  const toggleTool = (toolId: string) => {
    setTools(tools.map(tool => 
      tool.id === toolId ? { ...tool, enabled: !tool.enabled } : tool
    ));
  };

  const enabledToolsCount = tools.filter(tool => tool.enabled).length;

  return {
    tools,
    toggleTool,
    enabledToolsCount
  };
};
