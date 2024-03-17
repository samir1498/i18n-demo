import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';

export default function App() {
  const [value, setValue] = useState<string>('**Hello world!!!**');
  return (
    <div className="container">
      <MDEditor
        value={value}
        onChange={(newValue) => setValue(newValue ?? '')}
        visibleDragbar={false}
        commandsFilter={(cmd) => {
          if (/fullscreen/.test(cmd.name ?? '')) {
            return false;
          }
          return cmd;
        }}
      />
      {/* <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }}  /> */}
    </div>
  );
}
