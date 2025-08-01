import { useState, useCallback } from 'react';

export const useScreenCapture = () => {
  const [lastScreenCapture, setLastScreenCapture] = useState<string | null>(null);
  const [screenCaptureTime, setScreenCaptureTime] = useState<number>(0);
  const [isCapturingScreen, setIsCapturingScreen] = useState(false);

  const captureScreen = useCallback(async (forceNew: boolean = false): Promise<string | null> => {
    try {
      console.log('Screen capture requested, forceNew:', forceNew);
      setIsCapturingScreen(true);
      
      const now = Date.now();
      if (!forceNew && lastScreenCapture && (now - screenCaptureTime) < 5000) {
        console.log('Using cached screen capture from', (now - screenCaptureTime) / 1000, 'seconds ago');
        setIsCapturingScreen(false);
        return lastScreenCapture;
      }

      console.log('Requesting new screen capture...');
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { mediaSource: 'screen' }
      });
      
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();
      
      return new Promise((resolve) => {
        video.onloadedmetadata = () => {
          console.log('Screen capture video loaded, dimensions:', video.videoWidth, 'x', video.videoHeight);
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(video, 0, 0);
          
          stream.getTracks().forEach(track => track.stop());
          
          const base64 = canvas.toDataURL('image/jpeg', 0.8);
          console.log('Screen capture successful, base64 length:', base64.length);
          
          setLastScreenCapture(base64);
          setScreenCaptureTime(now);
          setIsCapturingScreen(false);
          
          resolve(base64);
        };
      });
    } catch (error) {
      console.warn('Failed to capture screen:', error instanceof Error ? error.message : 'Unknown error');
      setIsCapturingScreen(false);
      
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError') {
          console.log('Screen capture permission denied - this is normal if user declined');
        } else if (error.name === 'NotSupportedError') {
          console.log('Screen capture not supported in this browser');
        }
      }
      
      return null;
    }
  }, [lastScreenCapture, screenCaptureTime]);

  return {
    lastScreenCapture,
    isCapturingScreen,
    captureScreen
  };
};
