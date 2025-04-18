import Colors from '@/constants/Colors';
import { supabase } from '@/lib/supabase';
 import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
 
 const ProfileScreen = () => {
   return (
     <View style={styles.container}>
       <Text>Profile</Text>
 
       {/* <TouchableOpacity style={styles.textButton} onPress={async () => await supabase.auth.signOut()}>
         <Text>Sign Out</Text>
       </TouchableOpacity> */}
       <Button
         title="Sign out"
         onPress={async () => await supabase.auth.signOut()}
       />
     </View>
   );
 };
 
const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    flex: 1,
  },
  label: {
    color: 'gray',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#000',
    fontSize: 16,
  },
});

 export default ProfileScreen;