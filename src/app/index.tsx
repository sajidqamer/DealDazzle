import { View, Text, ActivityIndicator, ImageBackground, StyleSheet } from 'react-native';
import React from 'react';
import Button from '../components/Button';
import { Link, Redirect } from 'expo-router';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/lib/supabase';

const index = () => {
    const { session, loading, isAdmin } = useAuth();
 
   if (loading) {
     return <ActivityIndicator />;
   }
 
   if (!session) {
     return <Redirect href={'/sign-in'} />;
   }
 
  //  if (!isAdmin) {
  //    return <Redirect href={'/(user)'} />;
  //  }
  return (
     <ImageBackground
      source={{ uri: 'https://wallpapers.com/images/hd/android-food-background-1440-x-2560-x8n0snptguuoe5ha.jpg' }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <Link href={'/(user)'} asChild>
        <Button text="User" />
      </Link>
      <Link href={'/(admin)'} asChild>
        <Button text="Admin" />
      </Link>
      <Button onPress={() => supabase.auth.signOut()} text="Sign out" />
      </View>
      </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  }
});

export default index;
