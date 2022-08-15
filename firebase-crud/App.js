
import { Modal, Pressable } from 'react-native';
import { Alert, StyleSheet, Button, TextInput, View, Text, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { doc, collection, addDoc, getDocs, deleteDoc, updateDoc, } from 'firebase/firestore'
import { async } from '@firebase/util';
export default function App() {

  const [todo, setTodo] = useState('')
  const [todoItem, setTodoItem] = useState([]);
const [updatedTodo,setUpdatedTodo] = useState(todo)
  const [ModalVisible , setModalVisible] =useState(false);

  const CloseModalScreen = ()=>{
    setModalVisible(!ModalVisible);
  }

  const todoCollectionRef = collection(db, "todoItem")


  const AddTodo = async (e) => {
    e.preventDefault(e);
    try {
      const DocRef = await addDoc(todoCollectionRef, {
        text: todo,
        timesstamp:new Date(),
      })
      console.log('TodoItem', DocRef.id);
    } catch (err) {
      console.log(err.message)
      Alert.alert(err.message)
    }
    setTodo('')

  }
  useEffect(() => {
    const getTodos = async () => {
      try{
        const data = await getDocs(todoCollectionRef);
        setTodoItem(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      }catch(err){
        console.log(err.message)
      }};
      getTodos();
  }, []);

  const deleteTodo = async (id) => {
    try{
      const del = doc(db, 'todoItem', id);
      await deleteDoc(del);
    }catch(err){
      console.log(err.message)
    }
   
  };
  const UpdateTodo= async(id)=>{
    const update = doc(db,'todoItem',id);
      try{
      
        await updateDoc(update,{
          text:updatedTodo,
          timesstamp:new Date()
        })
      }catch(err){
        console.log(err.message)
      }
      setTodo('')
  }

  

  return (
    <View style={styles.container}>
      <TextInput placeholder='enter todo' value={todo} onChangeText={(text) => setTodo(text)} />
      <Button title="Add" onPress={AddTodo} />
      {todoItem.map((todos, index) => {
        return(
          <View key={index}>
          <TouchableOpacity key={index} onLongPress={()=>setModalVisible(true)}>
            <Text>{todos.text}</Text>
          </TouchableOpacity>
          <Button title='del' onPress={()=>deleteTodo(todos.id)}/>
          <Modal
        animationType="slide"
        transparent={true}
        visible={ModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!ModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}> Edit Todo</Text>
            <TextInput placeholder='Enter Todo' value={updatedTodo} onChangeText={(text)=>setUpdatedTodo(text)} />
              <Button style={styles.textStyle} title="edit" onPress={()=>UpdateTodo(todos.id,todos.text)}/>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={CloseModalScreen}
            >
              <Text style={styles.textStyle}>close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
        </View>
        ) 
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
})