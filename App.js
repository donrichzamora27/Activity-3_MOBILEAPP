import React from 'react';
import { SafeAreaView, Text, StatusBar } from 'react-native';
import GroceryList from './GroceryList';
import { globalStyles } from './globalStyles';

export default function App() {
  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={globalStyles.headerTitle}>🛒 Grocery Tracker</Text>
      <Text style={globalStyles.subtitle}>
        Tap item to mark as bought • Tap delete to remove
      </Text>
      
      <GroceryList />
    </SafeAreaView>
  );
}