import { View, Text, TextInput, Button, FlatList, Image, StyleSheet, Pressable, Modal, Linking} from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons'; 


const DisplayModal = ({item, setShowModal}) => {
    const openWebsite = (imdbid) => {
        const url = 'https://m.imdb.com/title/'+imdbid; // Replace with the URL of the website you want to open
        Linking.openURL(url)
          .catch(error => console.error('Error opening website: ', error));
      };
      
    return (
        <Modal>
            <View style={{backgroundColor:"#0b101a", height:1000}}>
                <Image style={{height:675, width: 450}} source={{uri: item.Poster}} />
                <View style={styles.iconContainer}>
                    <AntDesign name="caretright" size={24} color="black" />
                </View>
                <Text style={{fontWeight: "bold", fontSize: 19, textAlign: "center", color:"white", marginVertical: 5,}}>{item.Title}</Text>
                <Text style={{fontSize: 18, textAlign: "center", color: "gray", marginBottom: 10,}}>{item.Type.charAt(0).toUpperCase()+item.Type.slice(1)}, {item.Year}</Text>
                <View style={{flexDirection: "row", width:400}}>
                    <View style={styles.ModalButton}>
                        <Button title="Open IMDB" onPress={()=>openWebsite(item.imdbID)} />
                    </View>
                    <View style={styles.ModalButton}>
                        <Button onPress={()=>setShowModal(false)} title= "Close"/>
                    </View>
                </View>
                    
            </View>
        </Modal>
    )
}

const Movie = ( {navigation} ) => {
    const [showModal, setShowModal] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [moviesList, setMoviesList] = useState([]);
    const [itemName, setItemName] = useState({})

    

    const handleChange = (inputText) => {
        setSearchText(inputText);
    };


    const handlePress = async () => {
        //console.log(searchText);
        let res = await fetch(
            `https://www.omdbapi.com/?apikey=e8e4bdc1&s=${searchText}`
        );
        let moviesData = await res.json();
        setMoviesList(moviesData.Search);
        console.log(moviesList)
    };
    
    const pressed = (item) => {
        setShowModal(true)
        setItemName(item)
    }

  return (
    <View style={{backgroundColor:"#0b101a"}}>
      <Text style={{color:"white"}}>Movie</Text>
      <TextInput placeholder='Search Movies' value={searchText} onChangeText={handleChange} style={styles.TextInput} />
      <View style={styles.Button}>
        <Button title='Search' onPress={handlePress} color="blue"/>
      </View>
      
      <View>
        {moviesList && (<Text style={{color:"white"}}>{moviesList?.length} Movies found. </Text>)}
        <FlatList 
            data={moviesList}
            renderItem={({item})=>{
                return(
                    <>
                    <Pressable onPress={() => pressed(item)}>
                        <View style={styles.box}>
                            <Image style={{height:420, width:300, marginHorizontal:5, marginVertical:5}} source={{ uri : item.Poster }} />
                            <Text style={{fontWeight: "bold", fontSize: 19, textAlign: "center", color:"white"}}>{item.Title}</Text>
                            <Text style={{textAlign: "center", fontStyle:"italic", color:"white", marginVertical:5}}>{item.Year}</Text>
                        </View>
                    </Pressable>
                    </>
                )
            }}
        />

        {showModal && <DisplayModal item = {itemName} setShowModal={setShowModal}/>}

        {/* {moviesList?.map((item, index)=>(
            <Text>{item.Title}</Text>
            ))} */}
      </View>
      
    </View>
  )
}

styles = StyleSheet.create({
    box:{
        flex:1,
        justifyContent: "center",
        textAlign:"center",
        borderWidth:1,
        width: 310,
        marginHorizontal: 35,
        marginVertical: 15,
        backgroundColor:"black",
        borderColor: "white",
        borderRadius:10,
        
    },
    iconContainer: {
    position: 'absolute', // Make sure the icon container is absolute
    top: 10, // Adjust the position as needed
    right: 10, // Adjust the position as needed
    zIndex: 1, // Ensure the icon is displayed above the image
  },
  TextInput:{
    color:"white",
    borderWidth:1,
    padding:5,
    borderBottomColor:"white",
    borderLeftColor: "grey",
    borderRightColor: "grey",
    width: "88%",
    marginHorizontal: 20,
    backgroundColor: "black",
    marginVertical: 5,
    borderRadius: 10,
    },
    Button:{
        backgroundColor:"black",
        width:"90%",
        marginHorizontal: 19,
        
    },
    ModalButton:{
        width:180,
        marginHorizontal: 15,
    }

})


export default Movie