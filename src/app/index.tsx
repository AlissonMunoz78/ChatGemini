import React from 'react';
import { ChatScreen } from './src/features/chat/presentation/screens/ChatScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <ChatScreen />
    </SafeAreaProvider>
  );
}
