import { Tabs } from "expo-router";
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';

export default function RootLayout() {
  return (
  <Tabs screenOptions={{headerShown:false, tabBarActiveTintColor: "#1F4D3A", tabBarInactiveTintColor: "#9A9A94", 
    tabBarStyle: {
      backgroundColor: "#FFFCF8",
      borderTopColor: "#EAE4DC",
      borderTopWidth: 1,
      height: 65,
      paddingTop: 6,
      paddingBottom: 8,
    },
    tabBarLabelStyle: {
      fontFamily: "DM-Sans-Medium",
      fontSize: 11,
    },
    }}>
    <Tabs.Screen name="home" options={{title:"Home", tabBarIcon:({color})=>( <Entypo size={28} name="home" color={color} />)}} />
    <Tabs.Screen name="history" options={{title:"History", tabBarIcon:({color})=>( <Entypo size={28} name="back-in-time" color={color} />)}} />
    <Tabs.Screen name="profile" options={{title:"Profile", tabBarIcon:({color})=>( <Feather size={28} name="user" color={color} />)}} />
  </Tabs>
  )

}
