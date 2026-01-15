import PhotoGalleryPage from '@/components/photos/PhotoGalleryPage';
import LayoutWrapper from '@/components/LayoutWrapper';

export const metadata = {
    title: 'फोटो गॅलरी | नाशिकचा खबरनामा',
    description: 'नाशिकमधील ताज्या घडामोडी, निसर्ग आणि कार्यक्रमांचे फोटो पहा.',
};

export default function PhotosPage() {
    return (
        <LayoutWrapper>
            <PhotoGalleryPage />
        </LayoutWrapper>
    );
}