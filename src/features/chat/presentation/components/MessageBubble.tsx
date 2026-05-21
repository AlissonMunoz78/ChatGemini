import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Message } from '../../domain/entities/Message';
import Markdown from 'react-native-markdown-display';
import * as Speech from 'expo-speech';
import { Ionicons } from '@expo/vector-icons';

interface Props { message: Message; }

export const MessageBubble: React.FC<Props> = ({ message }) => {
  const isUser = message.role === 'user';
  
  const handleSpeak = () => {
    Speech.speak(message.content, { language: 'es' });
  };

  return (
    <View style={[styles.container, isUser ? styles.userContainer : styles.aiContainer]}>
      <View style={[styles.bubble, isUser ? styles.userBubble : styles.aiBubble]}>
        {isUser ? (
          <Text style={[styles.text, styles.userText]}>
            {message.content}
          </Text>
        ) : (
          <Markdown style={markdownStyles}>
            {message.content}
          </Markdown>
        )}
      </View>
      
      <View style={styles.footerContainer}>
        <Text style={styles.timestamp}>
          {message.timestamp.toLocaleTimeString('es-EC', {
            hour: '2-digit', minute: '2-digit',
          })}
        </Text>
        
        {!isUser && (
          <TouchableOpacity onPress={handleSpeak} style={styles.speakButton}>
            <Ionicons name="volume-medium-outline" size={14} color="#6366f1" />
            <Text style={styles.speakText}>Leer</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const markdownStyles = {
  body: { color: '#334155', fontSize: 16, lineHeight: 24 },
  code_block: { backgroundColor: '#f1f5f9', borderRadius: 8, padding: 8 },
  fence: { backgroundColor: '#f1f5f9', borderRadius: 8, padding: 8 },
};

const styles = StyleSheet.create({
  container: { marginVertical: 6, marginHorizontal: 4, maxWidth: '85%' },
  userContainer: { alignSelf: 'flex-end', alignItems: 'flex-end' },
  aiContainer:  { alignSelf: 'flex-start', alignItems: 'flex-start' },
  bubble: { 
    borderRadius: 20, 
    paddingHorizontal: 16, 
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  userBubble: { 
    backgroundColor: '#6366f1', 
    borderBottomRightRadius: 4 
  },
  aiBubble: { 
    backgroundColor: '#ffffff', 
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#f1f5f9'
  },
  text: { fontSize: 16, lineHeight: 24 },
  userText: { color: '#ffffff' },
  footerContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 12, paddingHorizontal: 4 },
  timestamp: { fontSize: 11, color: '#94a3b8', fontWeight: '500' },
  speakButton: { 
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#eef2ff',
    borderRadius: 12,
  },
  speakText: { fontSize: 11, color: '#6366f1', fontWeight: '600' }
});
