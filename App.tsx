import { StyleSheet, Text, View } from 'react-native';
import { useState , useEffect , useRef} from 'react';

import { Camera , CameraRecordingOptions, CameraView } from "expo-camera"
import { Video } from "expo-av";
import {shareAsync} from "expo-sharing"
import * as MediaLibrary from "expo-media-library"

import { VideoPlayer } from './src/components/VideoPlayer';
import { Cam } from './src/components/Camera';

export default function App() {
  const cameraRef = useRef<CameraView>(null)
  const [isRecording , setIsRecording] = useState(false)
  const [video , setVideo] = useState<any>()

  const [hasCameraPermission , setHasCameraPermission] = useState<boolean> (false)
  const [hasMicrofonePermission , setHasMicrofonePermission] = useState <boolean>(false)
  const [hasMediaLibraryPermission , setHasMediaLibraryPermission] = useState <boolean>(false)


  useEffect(()=>{
    (async()=>{
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const microfonePermission = await Camera.requestMicrophonePermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();

      setHasCameraPermission(cameraPermission.status === "granted")
      setHasMicrofonePermission(microfonePermission.status === "granted")
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted")
    })();
  },[]);

  if( hasCameraPermission === false || hasMicrofonePermission === false){
    return <View><Text>Não tem permição</Text></View>
  }

  if(hasMediaLibraryPermission === false){
    return <Video><Text>Não tem acesso a biblioteca</Text></Video>
  }


  const recordingVideo = () => {
    setIsRecording(true);

    const options: CameraRecordingOptions = {
        maxDuration:10
    };

    if(cameraRef && cameraRef.current){
      cameraRef.current.recordAsync(options).then((recordedVideo:any) => {
        setVideo(recordedVideo);
        setIsRecording(false);
    
      });
    }
  }

  const stopRecording = () => {
    setIsRecording(false);

    if(cameraRef && cameraRef.current){
      cameraRef.current.stopRecording();
    }
  };

  if(video){

    const shareVideo = () => {
      shareAsync(video.uri).then(()=>{
        setVideo(undefined)
      })
    }

    const saveVideo = () => {
      MediaLibrary.saveToLibraryAsync(video.uri).then(()=>{
        setVideo(undefined);
      })
    }

    return( <VideoPlayer video={video} onShare={shareVideo} onSave={saveVideo} onDiscard={()=>setVideo(undefined)} />);
  }

  return (
   <Cam cameraRef={cameraRef} isRecording={isRecording} onRecording={recordingVideo} onStopRecording={stopRecording}/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
