import React, { useState } from 'react';
import { View, Button, ScrollView, Image, StyleSheet } from 'react-native';
import axios from 'axios';

export default function App() {
  const [images, setImages] = useState([]);

  // Busca a imagem na API
  const fetchImages = async () => {
    try {
      const response = await axios.get('https://api.thecatapi.com/v1/images/search', {
        params: { limit: 5 }, // limita a quantidade de vezes que o botão atualiza as fotos
        headers: { 'x-api-key': 'KEY_GATO' }, //pega a informação de chave do arquivo .env
      });
      setImages(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Carregar Fotos de Gatos" onPress={fetchImages} />
      <ScrollView contentContainerStyle={styles.scrollView}>
        {images.map((img, index) => (
          <Image key={index} source={{ uri: img.url }} style={styles.image} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 40,
    backgroundColor: '#fff',
  },
  image: {
    width: '80%',
    height: 180,
    marginVertical: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
});
