export const saveImageData = (file: File, setImageData: (prev: any) => void) => {
    const src = URL.createObjectURL(file);
    const filename = file.name;
    setImageData((prev: any) => ({
        ...prev,
        imageUrl: src,
        imageName: filename,
    }));
}