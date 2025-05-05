1. How to Navigate Between Screens
    a.From Stack Screen → Bottom Tab Screen:
        const navigation = useNavigation<NativeStackNavigationProp<any>>();
        navigation.navigate('Main'); // Navigates to bottom tabs
    b.From Bottom Tab Screen → Stack Screen:
        const navigation = useNavigation<NativeStackNavigationProp<any>>();
        navigation.navigate('Details'); // Opens stack screen
    c. From One Tab to Another:
        const navigation = useNavigation<BottomTabNavigationProp<any>>();
        navigation.navigate('ProfileTab'); // Switches tab
2. Type-Safe Navigation (Recommended)
To get proper typing:

// type RootStackParamList = {
//     Login: undefined;
//     Main: undefined;
//     Details: { id: string };
//   };
  
//   type BottomTabParamList = {
//     HomeTab: undefined;
//     ProfileTab: undefined;
//   };
  Then use it like this:
    const stackNavigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const tabNavigation = useNavigation<BottomTabNavigationProp<BottomTabParamList>>();
  
