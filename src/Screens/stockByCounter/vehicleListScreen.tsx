import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  StatusBar,
  InteractionManager,
  RefreshControl,
} from 'react-native';
import Heading from '../../reusableComponents/Heading';
import { useNavigation, useRoute, RouteProp, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Stack/StackFiles';
import { endpoints } from '../../utils/API/endpoints';
import { useApi } from '../../utils/hooks/useApi';
import { VehicleRecord, VehicleStock, vehicleStockList } from '../../types/API/stockList';
import { EmptyComponent, FooterComponent } from '../Purchase/PurchaseList/PurchaseListContainer';
import { ListRenderItem } from 'react-native';

// You should replace this with your actual RootStackParamList type
// type RootStackParamList = {
//   VehicleListShowRoom: {
//     name?: string;
//     selectedObjectId?: string;
//   };
// };

type Vehicle = {
  id: string;
  number: string;
  model: string;
  spec: string;
  img: string;
  status: 'green' | 'red';
};

type VehicleStockListRouteProp = RouteProp<
  RootStackParamList,
  'VehicleListShowRoom'
>;

const vehicleData: Vehicle[] = [
  {
    id: '1',
    number: 'AP29AZ1001',
    model: 'Hero Pleasure Plus',
    spec: '110cc BSVI Petrol',
    img: 'https://th.bing.com/th/id/R.fa8d5b2cf304407b24a33cea96ed3151?rik=LJ6X%2bfugxro%2bzA&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fpng-hd-bike-ktm-rc-390-motorcycle-bike-png-image-1592.png&ehk=F8MLiTuJTDG3%2fftjroEPrlJUGGx7qNLAj3nGPZ51lwA%3d&risl=&pid=ImgRaw&r=0',
    status: 'green',
  },
  {
    id: '2',
    number: 'TS10EX8892',
    model: 'Honda Dio',
    spec: '110cc BSVI Petrol',
    img: 'https://th.bing.com/th/id/R.0d4d85fd554c28dff9d3ab71411383d7?rik=L0lxHFKYqtu4Hg&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fpng-hd-bike-suzuki-hayabusa-sport-motorcycle-bike-png-image-1632.png&ehk=wfkppS%2f5FiuhqVdr9GNFwW7qg6eaMG6wL0OHZCRnDww%3d&risl=&pid=ImgRaw&r=0',
    status: 'red',
  },
  {
    id: '3',
    number: 'AP29AZ1001',
    model: 'Hero Pleasure Plus',
    spec: '110cc BSVI Petrol',
    img: 'https://th.bing.com/th/id/OIP.FJ_42YJAi0TbBVbAJUUhCQHaIv?rs=1&pid=ImgDetMain',
    status: 'green',
  },
  {
    id: '4',
    number: 'TS10EX8892',
    model: 'Honda Dio',
    spec: '110cc BSVI Petrol',
    img: 'https://www.pngmart.com/files/10/Suzuki-Bike-PNG-Transparent-Image.png',
    status: 'red',
  },
  {
    id: '5',
    number: 'AP29AZ1001',
    model: 'Hero Pleasure Plus',
    spec: '110cc BSVI Petrol',
    img: 'https://th.bing.com/th/id/R.402c62e8d480c547109101205fdd007f?rik=xgs%2faJZefc7NiQ&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f2%2fSports-Bike-PNG-Picture.png&ehk=UlvulEdmKE53xWrbqyswcjuJnXnk1Pwr%2bOxwWHxQ94w%3d&risl=&pid=ImgRaw&r=0',
    status: 'green',
  },
  {
    id: '6',
    number: 'TS10EX8892',
    model: 'Honda Dio',
    spec: '110cc BSVI Petrol',
    img: 'https://th.bing.com/th/id/R.402c62e8d480c547109101205fdd007f?rik=xgs%2faJZefc7NiQ&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f2%2fSports-Bike-PNG-Picture.png&ehk=UlvulEdmKE53xWrbqyswcjuJnXnk1Pwr%2bOxwWHxQ94w%3d&risl=&pid=ImgRaw&r=0',
    status: 'red',
  },
  {
    id: '7',
    number: 'AP29AZ1001',
    model: 'Hero Pleasure Plus',
    spec: '110cc BSVI Petrol',
    img: 'https://th.bing.com/th/id/OIP.bZVEHbAAgx2rwGu4GXRiowHaE2?rs=1&pid=ImgDetMain',
    status: 'green',
  },
  {
    id: '8',
    number: 'TS10EX8892',
    model: 'Honda Dio',
    spec: '110cc BSVI Petrol',
    img: 'https://th.bing.com/th/id/OIP.tjHGx_yJmE3i_vzkYXsNhgHaGw?w=720&h=657&rs=1&pid=ImgDetMain',
    status: 'red',
  },
  {
    id: '9',
    number: 'AP29AZ1001',
    model: 'Hero Pleasure Plus',
    spec: '110cc BSVI Petrol',
    img: 'https://cdni.autocarindia.com/utils/imageresizer.ashx?n=https://cms.haymarketindia.net/model/uploads/modelimages/Royal-Enfield-Bullet-350-130120211557.png',
    status: 'green',
  },
  {
    id: '10',
    number: 'TS10EX8892',
    model: 'Honda Dio',
    spec: '110cc BSVI Petrol',
    img: 'https://www.pngplay.com/wp-content/uploads/7/Yellow-Motorcycle-Bike-PNG-HD-Quality.png',
    status: 'red',
  },
];

const VehicleListShowRoom = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute<VehicleStockListRouteProp>();

  const showroomId = route.params?.showroomId;

  const { data: stocksList, loading: stockListLoading, request: fethStockList, status: statusOfStockListAPIcall, error: errorOfStockListAPIcall } = useApi<vehicleStockList>();


  const renderItem: ListRenderItem<VehicleRecord> = ({ item, index }) => (
    <View style={styles.card}>
      <View
        style={[
          styles.statusBar,
          {
            backgroundColor:
              item.vehicle?.status?.name === 'in_stock' ? 'limegreen' : 'red',
          },
        ]}
      />
      <Image
        // source={{ uri: item.img }}
        source={{ uri: 'https://th.bing.com/th/id/R.fa8d5b2cf304407b24a33cea96ed3151?rik=LJ6X%2bfugxro%2bzA&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fpng-hd-bike-ktm-rc-390-motorcycle-bike-png-image-1592.png&ehk=F8MLiTuJTDG3%2fftjroEPrlJUGGx7qNLAj3nGPZ51lwA%3d&risl=&pid=ImgRaw&r=0' }}
        style={styles.image}
      />
      <View style={styles.textBlock}>
        <Text style={styles.bold}>{item.vehicle?.vehicleNumber}</Text>
        <Text>{`${item?.vehicle?.vehicleClass?.name || ''} ${item?.vehicle?.vehicleModel?.name || ''} ${item?.vehicle?.color?.name || ''} `}</Text>
        <Text>{`${item?.vehicle?.fuelType?.toUpperCase() || ''} ${item?.vehicle?.versionType || ''}`}</Text>
      </View>
    </View>
  );
  const [pageLoading, setPageloading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const task = InteractionManager.runAfterInteractions(() => {
        console.log('checking refresh in focusEffect');
      });

      console.log('showroomId', showroomId);
      const init = async () => {
        try {
          setPageloading(true);

          // ✅ Only if payment mode fetch is successful, call getPurchaseById

          if (showroomId) {
            await getStockByShowroom();
          }
          navigation.setParams(undefined); // Reset refresh param
        } catch (error) {
          console.error('Error in master data or purchase fetch:', error);
        } finally {
          setPageloading(false);
        }
      };

      init(); // ⬅️ Call the wrapper function

      return () => task.cancel();
    }, [showroomId])
  );
  const getStockByShowroom = async () => {
    const url = `${endpoints?.stokByShowroom}/${showroomId}`;
    console.log('url', url);
    await fethStockList({
      url,
      method: 'GET',
      timeout: 10000, // 10 seconds
    });
  };
  const [stockList, setStockList] = useState<any>([]);
  useEffect(() => {
    if (stocksList) {
      console.log('stocksList', stocksList);
      setStockList(stocksList);
    }
  }, [stocksList]);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Heading
        name="Stock By Counter"
        showBack={true}
        filter={true}
        onFilterPress={() => {
          console.log("Filter icon pressed!");
        }}
      />
      <View style={styles.docRow}>
        <Text>Celled</Text>
      </View>
      <FlatList
        data={stockList}
        keyExtractor={(item) => item?.id?.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={() => {
            setStockList([]), getStockByShowroom();
          }}
          />
        }
        onEndReachedThreshold={0.5}
        ListEmptyComponent={<EmptyComponent loading={stockListLoading} />}
        ListFooterComponent={
          <FooterComponent
            loading={stockListLoading}
            hasData={!!stocksList?.length}
          />
        }
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews
        scrollEnabled
      />
    </SafeAreaView>
  );
};
export default VehicleListShowRoom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  docRow: {
    padding: 10,
    marginHorizontal: 12,
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginBottom: 15,
    borderRadius: 5,
    elevation: 1,
    overflow: 'hidden',
  },
  statusBar: {
    width: 5,
  },
  image: {
    width: 65,
    height: 65,
    margin: 10,
    resizeMode: 'contain',
  },
  textBlock: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
    gap: 5,
  },
  bold: {
    fontWeight: '700',
    fontSize: 14,
  },
});

