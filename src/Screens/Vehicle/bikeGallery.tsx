import React, { useState } from 'react';
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';
const ScreenWidth = Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/Ionicons';

// Removed as ScreenWidth is now defined directly

type ImageItem = {
  id: number;
  uri: string;
};

const images: ImageItem[] = [
  {
    id: 1,
    uri: 'https://th.bing.com/th/id/R.fa8d5b2cf304407b24a33cea96ed3151?rik=LJ6X%2bfugxro%2bzA&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fpng-hd-bike-ktm-rc-390-motorcycle-bike-png-image-1592.png&ehk=F8MLiTuJTDG3%2fftjroEPrlJUGGx7qNLAj3nGPZ51lwA%3d&risl=&pid=ImgRaw&r=0',
  },
  {
    id: 2,
    uri: 'https://www.pngmart.com/files/10/Suzuki-Bike-PNG-Transparent-Image.png',
  },
  {
    id: 3,
    uri: 'https://th.bing.com/th/id/OIP.6Wa2uTU1MW3Y1PihxFVHkQHaF2?w=230&h=182&c=7&r=0&o=5&dpr=1.2&pid=1.7',
  },
  {
    id: 4,
    uri: 'https://th.bing.com/th/id/OIP.nq3bmsZITiCqZeC93x9oUQHaFX?w=225&h=180&c=7&r=0&o=5&dpr=1.2&pid=1.7',
  },
];

const BikeGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ImageItem>(images[0]);

  return (
    <View style={styles.container}>
      {/* Main Image Display */}
      <View style={styles.mainImageWrapper}>
        <Image
          source={{ uri: selectedImage.uri }}
          style={styles.mainImage}
          resizeMode="contain"
        />
      </View>

      {/* Thumbnail Row */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.thumbnailScroll}>
        {/* Add Button */}
        <TouchableOpacity style={styles.addButton}>
          <Icon name="add" size={24} color="#888" />
        </TouchableOpacity>

        {/* Thumbnails */}
        {images.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => setSelectedImage(item)}
            style={[
              styles.thumbnailWrapper,
              item.id === selectedImage.id && styles.activeThumbnail,
            ]}
            
          >
            <Image source={{ uri: item.uri }} style={styles.thumbnailImage}
          resizeMode="contain"
            
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: ScreenWidth * 1,
  },
  mainImageWrapper: {
    height: 200,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -50,
  },
  mainImage: {
    width: ScreenWidth * 1,
    height: '100%',
  },
  thumbnailScroll: {
    flexDirection: 'row',
  },
  addButton: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: '#aaa',
    borderStyle: 'dashed',
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnailWrapper: {
    width: 60,
    height: 60,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
    marginRight: 8,
    overflow: 'hidden',
  },
  activeThumbnail: {
    borderColor: '#00aaff',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
});

export default BikeGallery;
