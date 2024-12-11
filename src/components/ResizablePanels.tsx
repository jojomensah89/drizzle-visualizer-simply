import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from 'react-resizable-panels';

interface ResizablePanelsProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

export function ResizablePanels({ left, right }: ResizablePanelsProps) {
  return (
    <PanelGroup direction="horizontal" className="h-screen">
      <Panel defaultSize={40} minSize={30}>
        {left}
      </Panel>
      <PanelResizeHandle className="resizer" />
      <Panel minSize={30}>
        {right}
      </Panel>
    </PanelGroup>
  );
}