import axios from 'axios';

class UploadImagesService {

    async uploadToCloudinary (image) {
        const url = 'https://api.cloudinary.com/v1_1/dqpootcvr/image/upload';
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'ml_default');
    
        try {
            const response = await axios.post(url, formData);
            return response.data;
        } catch (error) {
            console.error('Error uploading image to Cloudinary:', error);
            throw error;
        }
    }// uploadToCloudinary

}

export default UploadImagesService;