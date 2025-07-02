import React from 'react';
import { View , TouchableOpacity , Text } from 'react-native';
import {CameraProps} from "./props"
import { styles } from './styles';
import { CameraView } from 'expo-camera';

export function Cam({cameraRef , isRecording , onRecording ,onStopRecording}:CameraProps) {
  return (
    <CameraView style={styles.container} ref={cameraRef}>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonRecording} onPress={isRecording ? onStopRecording : onRecording}>
                <Text style={styles.buttonText}>{isRecording? "Parar" : 'Gravar'}</Text>
            </TouchableOpacity>
        </View>
    </CameraView>
  );
}