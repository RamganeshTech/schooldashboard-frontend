export const downloadFileFromBlob = async (
    blob: Blob,
    filename: string
): Promise<void> => {
    console.log(blob.size);
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a); // for Safari compatibility
    a.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(a); // cleanup
};
