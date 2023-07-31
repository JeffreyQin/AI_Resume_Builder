import numpy as np;
import pytesseract;
import cv2;

def extract_text(raw_image):
    processed_image = get_grayscale(raw_image)
    processed_image = set_threshold(processed_image)
    processed_image = remove_noise(processed_image)
    text = pytesseract.image_to_string(processed_image)
    return text

def get_grayscale(image):
    return cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

def set_threshold(image):
    return cv2.threshold(image, 0, 255, cv2.THRESH_BINARY_INV | cv2.THRESH_OTSU)[1]

def remove_noise(image):
    return cv2.medianBlur(image, 5)