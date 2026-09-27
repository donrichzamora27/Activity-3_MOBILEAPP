import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { globalStyles } from './globalStyles';

export default function GroceryList() {
  // useState hooks for managing input text and items list
  const [inputText, setInputText] = useState('');
  const [groceryItems, setGroceryItems] = useState([]);

  // Handler to add a new grocery item
  const handleAddItem = () => {
    if (inputText.trim() === '') {
      Alert.alert('Validation', 'Please enter an item name.');
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      name: inputText.trim(),
      completed: false,
    };

    setGroceryItems((prevItems) => [newItem, ...prevItems]);
    setInputText('');
  };

  // Handler to toggle completion status (mark as bought/complete)
  const handleToggleComplete = (id) => {
    setGroceryItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  // Handler to delete an item from the list
  const handleDeleteItem = (id) => {
    setGroceryItems((prevItems) =>
      prevItems.filter((item) => item.id !== id)
    );
  };

  // Render individual item row
  const renderItem = ({ item }) => (
    <View style={globalStyles.itemRow}>
      <TouchableOpacity
        style={globalStyles.itemTextContainer}
        onPress={() => handleToggleComplete(item.id)}
        activeOpacity={0.7}
      >
        <Text
          style={
            item.completed
              ? globalStyles.completedItemText
              : globalStyles.itemText
          }
        >
          {item.completed ? '✓ ' : '• '}
          {item.name}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={globalStyles.deleteButton}
        onPress={() => handleDeleteItem(item.id)}
        activeOpacity={0.7}
      >
        <Text style={globalStyles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      {/* Input section using <TextInput> and <TouchableOpacity> */}
      <View style={globalStyles.inputContainer}>
        <TextInput
          style={globalStyles.input}
          placeholder="Add grocery item (e.g., Milk, Eggs)..."
          placeholderTextColor="#a0aec0"
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={handleAddItem}
        />
        <TouchableOpacity
          style={globalStyles.addButton}
          onPress={handleAddItem}
          activeOpacity={0.8}
        >
          <Text style={globalStyles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Main List using <FlatList> */}
      <FlatList
        data={groceryItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={globalStyles.listContainer}
        ListEmptyComponent={
          <Text style={globalStyles.emptyText}>
            Your grocery list is empty. Add an item above!
          </Text>
        }
      />
    </View>
  );
}