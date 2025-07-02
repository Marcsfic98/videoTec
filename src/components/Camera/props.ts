import { CameraView } from "expo-camera"

export interface CameraProps{
    cameraRef:React.RefObject<CameraView | null>
    isRecording:Boolean
    onRecording:() => void
    onStopRecording:() => void
}