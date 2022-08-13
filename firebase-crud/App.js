import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Button, TextInput, View, Text, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { query, collection, addDoc, deleteDoc, onSnapshot, getDocs } from 'firebase/firestore'
import { async } from '@firebase/util';
export default function App() {

  const [todo, setTodo] = useState('')
  const [todoItem, setTodoItem] = useState([])
  const todoCollectionRef = collection(db, "todoItem")


  const AddTodo = async (e) => {
    e.preventDefault();
    try {
      const DocRef = await addDoc(todoCollectionRef, {
        text: todo,
      });
      console.log('TodoItem', DocRef.id);
    } catch (err) {
      console.log(err.message)
      Alert.alert(err.message)
    }
    setTodo('')

  }
  useEffect(() => {
    const getTodos = async () => {
      const data = await getDocs(todoCollectionRef);
      setTodoItem(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))


    };

    getTodos();


  }, []);



  return (
    <View style={styles.container}>
      <TextInput placeholder='enter todo' value={todo} onChangeText={(text) => setTodo(text)} />
      <Button title="Add" onPress={AddTodo} />




      {todoItem.map((todos, index) => {
        <View>

          <TouchableOpacity key={index}>
            <Text>{todos.todo}</Text>
          </TouchableOpacity>
        </View>

      })
      }






    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
