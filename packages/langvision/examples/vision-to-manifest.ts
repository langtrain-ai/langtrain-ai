import { imageToText } from '../src/image-to-text';

const images = ['img1.jpg', 'img2.jpg'];
const manifest = images.map(img => ({
    image: img,
    text: imageToText(img)
}));

console.log(JSON.stringify(manifest, null, 2));
