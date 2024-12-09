import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { StyleSheet, View, Button } from 'react-native';
import {WIDTH} from "@/helper/dimension";

const videoSource =
   'http://192.168.0.109:3000/video/stream.m3u8';
 
export default function VideoScreen() {
   const player = useVideoPlayer(videoSource, player => {
      player.loop = true;
      player.play();
   });
   
   const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });
   
   return (
      <View style={{
         flex: 1,
         padding: 8,
         backgroundColor: "white",
         alignItems: 'center',
         justifyContent: 'center',
         paddingHorizontal: 50,
      }}>
         <VideoView style={{
            backgroundColor: "black",
            borderRadius: 16,
            width: WIDTH * 0.95,
            height: 275,
         }} player={player} allowsFullscreen allowsPictureInPicture />
         <View style={{
            padding: 8,
         }}>
            <Button
               title={isPlaying ? 'Pause' : 'Play'}
               onPress={() => {
                  if (isPlaying) {
                     player.pause();
                  } else {
                     player.play();
                  }
               }}
            />
         </View>
      </View>
   );
}