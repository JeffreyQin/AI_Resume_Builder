import OCRExtract as ocr;
import cv2;
import os;

transcript = cv2.imread('./opencv/transcript.jpeg') 
result = ocr.extract_text(transcript)
print(result)
os.remove('./opencv/transcript.jpeg')